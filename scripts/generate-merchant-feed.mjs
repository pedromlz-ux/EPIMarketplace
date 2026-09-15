import fs from 'node:fs';
import path from 'node:path';
import {
  hasMerchantCommercialData,
  loadProducts,
  projectRoot,
  truncate,
  xmlEscape,
} from './product-data.mjs';

const publicDirectory = path.join(projectRoot, 'public', 'merchant');
const reportFile = path.join(projectRoot, 'data', 'merchant-feed-report.json');
const products = loadProducts();
const eligible = products.filter((product) => hasMerchantCommercialData(product.override));
const pending = products.filter((product) => !hasMerchantCommercialData(product.override));

function tsvCell(value = '') {
  return String(value).replace(/[\t\r\n]+/g, ' ').trim();
}

function feedTitle(product) {
  const brand = product.override.brand ? ` – ${product.override.brand}` : '';
  return truncate(`${product.name}${brand}`, 150);
}

function xmlItem(product) {
  const override = product.override;
  const identifier = override.gtin
    ? `<g:gtin>${xmlEscape(override.gtin)}</g:gtin>`
    : override.mpn
      ? `<g:mpn>${xmlEscape(override.mpn)}</g:mpn>`
      : '<g:identifier_exists>false</g:identifier_exists>';
  return `    <item>\n      <g:id>${xmlEscape(product.sku)}</g:id>\n      <g:title>${xmlEscape(feedTitle(product))}</g:title>\n      <g:description>${xmlEscape(truncate(product.description, 5000))}</g:description>\n      <g:link>${xmlEscape(product.url)}</g:link>\n      <g:image_link>${xmlEscape(`${product.url.replace(/\/produto\/.+$/, '')}/${product.localImage}`)}</g:image_link>\n      <g:availability>${xmlEscape(override.availability)}</g:availability>\n      <g:price>${Number(override.price).toFixed(2)} ${xmlEscape(product.currency)}</g:price>\n      <g:condition>${xmlEscape(override.condition)}</g:condition>\n      <g:brand>${xmlEscape(override.brand)}</g:brand>\n      ${identifier}\n    </item>`;
}

fs.mkdirSync(publicDirectory, { recursive: true });
const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<rss xmlns:g="http://base.google.com/ns/1.0" version="2.0">\n  <channel>\n    <title>EPI Marketplace</title>\n    <link>https://epimarketplace.com</link>\n    <description>Feed de produtos da EPI Marketplace</description>\n${eligible.map(xmlItem).join('\n')}\n  </channel>\n</rss>\n`;
fs.writeFileSync(path.join(publicDirectory, 'merchant-products.xml'), xml, 'utf8');

const headers = ['id', 'title', 'description', 'link', 'image_link', 'availability', 'price', 'condition', 'brand', 'gtin', 'mpn', 'identifier_exists'];
const tsv = [headers.join('\t'), ...eligible.map((product) => {
  const override = product.override;
  return [
    product.sku,
    feedTitle(product),
    truncate(product.description, 5000),
    product.url,
    `https://epimarketplace.com/${product.localImage}`,
    override.availability,
    `${Number(override.price).toFixed(2)} ${product.currency}`,
    override.condition,
    override.brand,
    override.gtin || '',
    override.mpn || '',
    override.identifierExists === false ? 'no' : 'yes',
  ].map(tsvCell).join('\t');
})].join('\n') + '\n';
fs.writeFileSync(path.join(publicDirectory, 'merchant-products.tsv'), tsv, 'utf8');

const report = {
  generatedAt: new Date().toISOString(),
  totalProducts: products.length,
  eligibleProducts: eligible.length,
  pendingProducts: pending.map((product) => ({
    sku: product.sku,
    name: product.name,
    missing: [
      ...(Number(product.override.price) > 0 ? [] : ['price']),
      ...(['in_stock', 'out_of_stock', 'preorder', 'backorder'].includes(product.override.availability) ? [] : ['availability']),
      ...(product.override.condition ? [] : ['condition']),
      ...(product.override.brand ? [] : ['brand']),
      ...(product.override.gtin || product.override.mpn || product.override.identifierExists === false ? [] : ['gtin, mpn ou identifierExists=false']),
    ],
  })),
};
fs.writeFileSync(reportFile, JSON.stringify(report, null, 2) + '\n', 'utf8');
console.log(`Feed Merchant gerado: ${eligible.length}/${products.length} produtos elegíveis. Arquivos em public/merchant/.`);
