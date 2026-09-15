import fs from 'node:fs';
import path from 'node:path';
import {
  escapeHtml,
  hasDisplayCommercialData,
  loadProducts,
  productDirectory,
  projectRoot,
  siteUrl,
  truncate,
} from './product-data.mjs';

const buildDate = new Date().toISOString().slice(0, 10);
const whatsappNumber = '5511989088928';

function jsonLd(value) {
  return JSON.stringify(value).replace(/</g, '\\u003c');
}

function titleFor(product) {
  const suffix = ' | EPI Marketplace';
  return `${truncate(product.name, 60 - suffix.length)}${suffix}`;
}

function descriptionFor(product) {
  return truncate(`${product.name}: ${product.description} Solicite cotação e confirme a disponibilidade para entrega em todo o Brasil.`, 135);
}

function formatPrice(value) {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(Number(value));
}

function availabilityLabel(value) {
  return {
    in_stock: 'Em estoque',
    out_of_stock: 'Indisponível no momento',
    preorder: 'Pré-venda',
    backorder: 'Sob encomenda',
  }[value] || 'Disponibilidade a confirmar';
}

function header() {
  return `
  <a class="skip-link" href="#conteudo">Pular para o conteúdo</a>
  <nav aria-label="Navegação principal" class="scrolled" id="navbar" role="navigation">
    <div class="container"><div class="navbar__inner">
      <button aria-controls="mobile-menu" aria-expanded="false" aria-label="Abrir menu" class="navbar__burger" id="burger-btn" type="button"><span></span><span></span><span></span></button>
      <a aria-label="EPI Marketplace — Página inicial" class="navbar__logo" href="/"><span class="product-brand">EPI Marketplace</span></a>
      <div class="navbar__links" role="menubar"><a href="/produtos" role="menuitem">Produtos</a><a href="/epi-para-empresas" role="menuitem">Para empresas</a><a href="/blog" role="menuitem">Blog</a><a href="/contato" role="menuitem">Contato</a></div>
      <a aria-label="Solicitar orçamento pelo WhatsApp" class="navbar__cta" href="https://wa.me/${whatsappNumber}?text=Olá!%20Quero%20um%20orçamento%20de%20EPIs." rel="noopener noreferrer" target="_blank">Solicitar orçamento</a>
    </div><div aria-hidden="true" class="navbar__mobile" id="mobile-menu" role="menu"><a href="/produtos" role="menuitem">Produtos</a><a href="/epi-para-empresas" role="menuitem">Para empresas</a><a href="/blog" role="menuitem">Blog</a><a href="/contato" role="menuitem">Contato</a></div></div>
  </nav>
  <div aria-hidden="true" class="navbar__overlay" id="nav-overlay"></div>`;
}

function footer() {
  return `
  <footer role="contentinfo"><div class="container"><div class="footer__grid">
    <div><div class="footer__brand-name">EPI Marketplace</div><p class="footer__brand-desc">E-commerce nacional de EPIs, EPCs e equipamentos de segurança.</p><address class="footer__contact" style="font-style:normal"><a href="tel:+5511989088928">(11) 98908-8928</a><a href="mailto:contato@epimarketplace.com">contato@epimarketplace.com</a></address></div>
    <div><div class="footer__col-title">Categorias</div><nav aria-label="Categorias" class="footer__col-links"><a href="/nr-10">NR-10</a><a href="/trabalho-em-altura">Trabalho em altura</a><a href="/aterramento">Aterramento</a><a href="/linha-viva">Linha viva</a></nav></div>
    <div><div class="footer__col-title">Compras</div><nav aria-label="Canais de compra" class="footer__col-links"><a href="/epi-para-empresas">Para empresas</a><a href="/contato">Cotação por e-mail</a><a href="https://wa.me/${whatsappNumber}" rel="noopener noreferrer" target="_blank">WhatsApp</a></nav></div>
  </div><div class="footer__bottom"><p class="footer__bottom-text">© 2026 EPI Marketplace · CNPJ: 58.912.592/0001-06</p><nav aria-label="Links legais" class="footer__bottom-links"><a href="/privacidade">Privacidade</a><a href="/termos">Termos de uso</a></nav></div></div></footer>`;
}

function pageHtml(product) {
  const title = titleFor(product);
  const metaDescription = descriptionFor(product);
  const commercial = hasDisplayCommercialData(product.override);
  const priceBlock = commercial
    ? `<div class="product-price"><span class="product-price__value">${formatPrice(product.override.price)}</span><span class="product-price__availability">${availabilityLabel(product.override.availability)}</span></div>`
    : `<p class="product-quote-note">Preço e disponibilidade confirmados no atendimento.</p>`;
  const quoteText = encodeURIComponent(`Olá! Quero solicitar cotação para ${product.name} (ref. ${product.sku}).`);
  const catalogSource = product.catalogPages.length
    ? `<p class="product-source">Dados técnicos organizados a partir do Catálogo Serveq 2025 (página${product.catalogPages.length > 1 ? 's' : ''} ${product.catalogPages.join(', ')}) e da referência de origem. Confirme a compatibilidade antes da compra.</p>`
    : `<p class="product-source">Dados técnicos organizados a partir da referência de origem. Confirme a compatibilidade antes da compra.</p>`;

  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    sku: product.sku,
    image: `${siteUrl}/${product.localImage}`,
    url: product.url,
    category: product.categoryLabel,
  };
  if (commercial) {
    productSchema.offers = {
      '@type': 'Offer',
      url: product.url,
      priceCurrency: product.currency,
      price: Number(product.override.price).toFixed(2),
      availability: `https://schema.org/${{
        in_stock: 'InStock',
        out_of_stock: 'OutOfStock',
        preorder: 'PreOrder',
        backorder: 'BackOrder',
      }[product.override.availability]}`,
    };
  }
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Início', item: siteUrl },
      { '@type': 'ListItem', position: 2, name: 'Produtos', item: `${siteUrl}/produtos` },
      { '@type': 'ListItem', position: 3, name: product.categoryLabel, item: `${siteUrl}${product.categoryHref}` },
      { '@type': 'ListItem', position: 4, name: product.name, item: product.url },
    ],
  };

  return `<!doctype html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${escapeHtml(title)}</title>
  <meta name="description" content="${escapeHtml(metaDescription)}">
  <meta name="robots" content="index,follow,max-image-preview:large">
  <link rel="canonical" href="${product.url}">
  <meta property="og:type" content="product">
  <meta property="og:title" content="${escapeHtml(title)}">
  <meta property="og:description" content="${escapeHtml(metaDescription)}">
  <meta property="og:url" content="${product.url}">
  <meta property="og:image" content="${siteUrl}/${product.localImage}">
  <link rel="stylesheet" href="/css/tokens.css">
  <link rel="stylesheet" href="/css/global.css">
  <link rel="stylesheet" href="/css/product-page.css">
  <link rel="icon" href="/favicon.png?v=3" type="image/png">
  <script type="application/ld+json">${jsonLd(productSchema)}</script>
  <script type="application/ld+json">${jsonLd(breadcrumbSchema)}</script>
</head>
<body>
${header()}
<main id="conteudo">
  <div class="product-page container">
    <nav aria-label="Caminho de navegação" class="product-breadcrumb"><a href="/">Início</a><span aria-hidden="true">›</span><a href="/produtos">Produtos</a><span aria-hidden="true">›</span><a href="${product.categoryHref}">${escapeHtml(product.categoryLabel)}</a><span aria-hidden="true">›</span><span aria-current="page">${escapeHtml(product.name)}</span></nav>
    <section class="product-layout" aria-labelledby="product-title">
      <div class="product-media"><img src="/${product.localImage}" alt="${escapeHtml(product.name)} — referência ${escapeHtml(product.sku)}" width="900" height="900" fetchpriority="high"></div>
      <div class="product-details">
        <p class="product-category"><a href="${product.categoryHref}">${escapeHtml(product.categoryLabel)}</a></p>
        <h1 id="product-title">${escapeHtml(product.name)}</h1>
        <p class="product-reference">Referência: <strong>${escapeHtml(product.sku)}</strong></p>
        <p class="product-summary"><strong>${escapeHtml(product.name)}</strong> é uma referência do catálogo para pesquisa técnica e solicitação de cotação.</p>
        ${priceBlock}
        <div class="product-actions"><a class="btn btn--primary btn--lg" href="https://wa.me/${whatsappNumber}?text=${quoteText}" rel="noopener noreferrer" target="_blank">Solicitar cotação pelo WhatsApp</a><a class="btn btn--outline btn--lg" href="/contato?produto=${encodeURIComponent(product.sku)}">Pedir cotação por e-mail</a></div>
        <p class="product-purchase-note">A confirmação de especificação, preço, prazo e disponibilidade é feita antes do pedido.</p>
      </div>
    </section>
    <section class="product-content" aria-labelledby="technical-data-title">
      <div class="product-content__main"><h2 id="technical-data-title">Descrição e dados técnicos</h2><p>${escapeHtml(product.description)}</p>${catalogSource}</div>
      <aside class="product-aside" aria-label="Orientações de compra"><h2>Antes de comprar</h2><ul><li>Confirme a referência e a aplicação prevista.</li><li>Valide especificações técnicas com a equipe responsável.</li><li>Para EPIs sujeitos a CA, confira a correspondência do certificado com o produto ofertado.</li></ul><a href="/consultar-ca-epi">Como consultar CA de EPI</a></aside>
    </section>
    <section class="product-related" aria-labelledby="related-title"><p class="product-category">Explore a linha</p><h2 id="related-title">Outros equipamentos para ${escapeHtml(product.categoryLabel.toLowerCase())}</h2><p>Veja mais referências desta linha no catálogo completo ou navegue pela página especializada.</p><div class="product-related__actions"><a class="btn btn--outline" href="${product.categoryHref}">Ver ${escapeHtml(product.categoryLabel)}</a><a class="btn btn--outline" href="/produtos?categoria=${encodeURIComponent(product.category)}">Ver catálogo da categoria</a></div></section>
  </div>
</main>
${footer()}
<a aria-label="Abrir conversa no WhatsApp" class="whatsapp-float" href="https://wa.me/${whatsappNumber}?text=${quoteText}" rel="noopener noreferrer" target="_blank"><svg aria-hidden="true" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a9.67 9.67 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347M12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413A11.815 11.815 0 0 0 12.05 0z"></path></svg></a>
<script defer src="/js/main.js" type="module"></script>
</body>
</html>`;
}

function updateCatalogCards(products) {
  const file = path.join(projectRoot, 'produtos.html');
  const productsBySku = new Map(products.map((product) => [String(product.sku).toUpperCase(), product]));
  const original = fs.readFileSync(file, 'utf8');
  let updatedCount = 0;
  const updated = original.replace(/<article\b[\s\S]*?<\/article>/g, (card) => {
    if (card.includes('product-card__details')) return card;
    const sku = card.match(/Ref\/Cód:\s*([^<\n]+)/i)?.[1]?.trim().toUpperCase();
    const product = productsBySku.get(sku);
    if (!product) return card;
    updatedCount += 1;
    return card.replace(
      '<div class="product-card__actions">',
      `<div class="product-card__actions"><a class="btn btn--outline btn--sm product-card__details" href="${product.path}">Ver detalhes</a>`,
    );
  });
  if (updatedCount) fs.writeFileSync(file, updated, 'utf8');
  return updatedCount;
}

function updateSitemaps(products) {
  const entries = products.map((product) => `  <url>\n    <loc>${product.url}</loc>\n    <lastmod>${buildDate}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.65</priority>\n  </url>`).join('\n');
  const block = `\n  <!-- Páginas individuais de produto: gerado automaticamente -->\n${entries}\n`;
  for (const relativePath of ['sitemap.xml', 'public/sitemap.xml']) {
    const file = path.join(projectRoot, relativePath);
    let content = fs.readFileSync(file, 'utf8');
    content = content.replace(/\n\s*<!-- Páginas individuais de produto: gerado automaticamente -->[\s\S]*?(?=<\/urlset>)/, '\n');
    content = content.replace('</urlset>', `${block}</urlset>`);
    fs.writeFileSync(file, content, 'utf8');
  }
}

fs.rmSync(productDirectory, { recursive: true, force: true });
fs.mkdirSync(productDirectory, { recursive: true });
const products = loadProducts();
for (const product of products) {
  fs.writeFileSync(path.join(productDirectory, `${product.slug}.html`), pageHtml(product), 'utf8');
}
const linkedCards = updateCatalogCards(products);
updateSitemaps(products);
console.log(`Geradas ${products.length} páginas de produto; ${linkedCards} cards passaram a apontar para suas fichas.`);
