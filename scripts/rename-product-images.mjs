import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const catalogPath = path.join(projectRoot, 'serveq_products.json');
const catalogHtmlPath = path.join(projectRoot, 'produtos.html');
const dryRun = process.argv.includes('--dry-run');

function slugify(value) {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/&/g, ' e ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .replace(/-+/g, '-');
}

function skuSlug(value) {
  return String(value)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

const products = JSON.parse(fs.readFileSync(catalogPath, 'utf8'));
const renames = [];
const targets = new Set();

for (const product of products) {
  if (!product.localImage?.startsWith('img/serveq/')) continue;

  const extension = path.extname(product.localImage).toLowerCase();
  const destination = `img/serveq/${slugify(product.name)}-${skuSlug(product.sku)}${extension}`;

  if (targets.has(destination)) throw new Error(`Nome de imagem duplicado: ${destination}`);
  const sourcePath = path.join(projectRoot, product.localImage);
  const destinationPath = path.join(projectRoot, destination);
  if (!fs.existsSync(sourcePath) && !fs.existsSync(destinationPath)) {
    throw new Error(`Imagem não encontrada: ${product.localImage}`);
  }

  targets.add(destination);
  renames.push({ product, source: product.localImage, destination });
}

if (dryRun) {
  console.log(`Seriam renomeadas ${renames.length} imagens.`);
  renames.slice(0, 10).forEach(({ source, destination }) => console.log(`${source} -> ${destination}`));
  process.exit(0);
}

let html = fs.readFileSync(catalogHtmlPath, 'utf8');
for (const { product, source, destination } of renames) {
  const sourcePath = path.join(projectRoot, source);
  const destinationPath = path.join(projectRoot, destination);
  if (fs.existsSync(sourcePath)) fs.renameSync(sourcePath, destinationPath);
  product.localImage = destination;
  html = html.split(source).join(destination);
}

fs.writeFileSync(catalogPath, `${JSON.stringify(products, null, 2)}\n`, 'utf8');
fs.writeFileSync(catalogHtmlPath, html, 'utf8');
console.log(`Renomeadas ${renames.length} imagens e atualizadas as referências do catálogo.`);
