import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
export const siteUrl = 'https://epimarketplace.com';
export const productDirectory = path.join(projectRoot, 'produto');

export const categories = {
  altura: { label: 'Trabalho em altura', href: '/trabalho-em-altura' },
  bolsas: { label: 'Bolsas e organizadores', href: '/produtos?categoria=bolsas' },
  carretilhas: { label: 'Carretilhas e roldanas', href: '/produtos?categoria=carretilhas' },
  aterramento: { label: 'Aterramento temporário', href: '/aterramento' },
  epi: { label: 'EPIs e ferramentas', href: '/produtos?categoria=epi' },
  detector: { label: 'Detector de tensão', href: '/detector-de-tensao' },
  esticadores: { label: 'Esticadores e esporas', href: '/produtos?categoria=esticadores' },
  grampos: { label: 'Grampos e cabeçotes', href: '/produtos?categoria=grampos' },
  guincho: { label: 'Guinchos e talhas', href: '/produtos?categoria=guincho' },
  'linha-viva': { label: 'Linha viva', href: '/linha-viva' },
  'pega-poste': { label: 'Pega-poste', href: '/produtos?categoria=pega-poste' },
  selas: { label: 'Selas, cintas e colares', href: '/produtos?categoria=selas' },
  sinalizacao: { label: 'Sinalização', href: '/produtos?categoria=sinalizacao' },
};

export function normalizeSku(value = '') {
  return String(value).toUpperCase().replace(/[^A-Z0-9]+/g, '');
}

export function slugify(value = '') {
  return String(value)
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

export function productSlug(product) {
  return `${slugify(product.name)}-${slugify(product.sku)}`;
}

export function productPath(product) {
  return `/produto/${productSlug(product)}`;
}

export function productUrl(product) {
  return `${siteUrl}${productPath(product)}`;
}

function textOnly(value = '') {
  return String(value)
    .replace(/<[^>]*>/g, ' ')
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&#39;/g, "'")
    .replace(/&quot;/gi, '"')
    .replace(/\s+/g, ' ')
    .trim();
}

function readJson(relativePath, fallback) {
  const filePath = path.join(projectRoot, relativePath);
  if (!fs.existsSync(filePath)) return fallback;
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

function parseCatalogCards() {
  const html = fs.readFileSync(path.join(projectRoot, 'produtos.html'), 'utf8');
  const cards = [...html.matchAll(/<article\b[\s\S]*?<\/article>/g)].map((match) => match[0]);

  return cards.map((card) => {
    const sku = textOnly(card.match(/Ref\/Cód:\s*([^<\n]+)/i)?.[1]);
    const name = textOnly(card.match(/product-card__name">\s*([^<]+)/i)?.[1]);
    const category = card.match(/data-category="([^"]+)"/i)?.[1] || '';
    const image = card.match(/<img[^>]*\ssrc="([^"]+)"/i)?.[1] || '';
    const specifications = textOnly(card.match(/product-card__specs">([\s\S]*?)<\/div>/i)?.[1])
      .replace(/^Ref\/Cód:\s*[^\s]+(?:\s*\/\s*[^\s]+)*\s*/i, '')
      .replace(/^Descrição\s*/i, '')
      .trim();

    return { sku, name, category, image, specifications };
  }).filter((card) => card.sku && card.name);
}

function findCatalogPages(sku, catalogPages) {
  const skuTokens = String(sku)
    .split(/[\/,]/)
    .map(normalizeSku)
    .filter(Boolean);

  return catalogPages
    .filter((page) => {
      const normalizedPage = normalizeSku(page.text);
      return skuTokens.some((token) => normalizedPage.includes(token));
    })
    .map((page) => page.number);
}

function buildCatalogExcerpt(sku, catalogPages) {
  const skuTokens = String(sku)
    .split(/[\/,]/)
    .map((token) => String(token).replace(/\s+/g, ''))
    .filter(Boolean);

  for (const page of catalogPages) {
    const index = skuTokens
      .map((token) => page.text.replace(/\s+/g, '').toUpperCase().indexOf(token.toUpperCase()))
      .find((position) => position >= 0);
    if (index === undefined) continue;
    return page.text.slice(Math.max(0, index - 100), index + 800).replace(/\s+/g, ' ').trim();
  }
  return '';
}

function getOverrides() {
  const raw = readJson('data/merchant-overrides.json', { currency: 'BRL', products: {} });
  return {
    currency: raw.currency || 'BRL',
    products: raw.products || {},
  };
}

export function isValidAvailability(value) {
  return ['in_stock', 'out_of_stock', 'preorder', 'backorder'].includes(value);
}

export function hasDisplayCommercialData(override = {}) {
  return Number(override.price) > 0 && isValidAvailability(override.availability);
}

export function hasMerchantCommercialData(override = {}) {
  const identifierProvided = Boolean(override.gtin || override.mpn || override.identifierExists === false);
  return hasDisplayCommercialData(override)
    && ['new', 'used', 'refurbished'].includes(override.condition)
    && Boolean(override.brand)
    && identifierProvided;
}

export function loadProducts() {
  const sourceProducts = readJson('serveq_products.json', []);
  const cards = parseCatalogCards();
  const cardsBySku = new Map(cards.map((card) => [normalizeSku(card.sku), card]));
  const catalog = readJson('data/serveq-catalog-pages.json', { pages: [] });
  const overrides = getOverrides();

  const products = sourceProducts.map((source) => {
    const card = cardsBySku.get(normalizeSku(source.sku));
    const category = card?.category || 'epi';
    const override = overrides.products[String(source.sku)] || {};
    const description = textOnly(source.description) || card?.specifications || 'Consulte a ficha técnica e confirme a aplicação desta referência no atendimento.';
    const product = {
      name: textOnly(source.name || card?.name),
      sku: String(source.sku),
      description,
      localImage: (source.localImage || card?.image || '').replace(/^\//, ''),
      sourceUrl: source.url,
      category,
      categoryLabel: categories[category]?.label || 'Equipamentos de segurança',
      categoryHref: categories[category]?.href || '/produtos',
      catalogPages: findCatalogPages(source.sku, catalog.pages || []),
      catalogExcerpt: buildCatalogExcerpt(source.sku, catalog.pages || []),
      override,
      currency: overrides.currency,
    };

    return {
      ...product,
      slug: productSlug(product),
      path: productPath(product),
      url: productUrl(product),
    };
  });

  if (products.length !== cards.length) {
    throw new Error(`Inconsistência entre a base (${products.length}) e os cards do catálogo (${cards.length}).`);
  }

  return products;
}

export function escapeHtml(value = '') {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export function xmlEscape(value = '') {
  return escapeHtml(value);
}

export function truncate(value, length) {
  const text = String(value).replace(/\s+/g, ' ').trim();
  if (text.length <= length) return text;
  return `${text.slice(0, Math.max(0, length - 1)).trimEnd()}…`;
}
