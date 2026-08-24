const fs = require('fs');
const path = require('path');

const productsJsonPath = '/Users/pm/Site SPIDER/epi-marketplace/serveq_products.json';
const htmlPath = '/Users/pm/Site SPIDER/epi-marketplace/produtos.html';

const products = JSON.parse(fs.readFileSync(productsJsonPath, 'utf8'));

// Helper to map color strings to Hex colors
const colorHexMap = {
  amarelo: '#FBC02D',
  azul: '#1565C0',
  vermelho: '#D32F2F',
  laranja: '#F57C00',
  preto: '#212121',
  marrom: '#5D4037',
  verde: '#388E3C',
  cinza: '#757575',
  branco: '#FFFFFF',
  natural: '#E0E0E0',
  cinza_claro: '#E0E0E0',
  vermelha: '#D32F2F',
  laranja_b2b: '#F57C00'
};

function getColorHex(colorName) {
  const norm = colorName.toLowerCase().trim();
  for (const [key, hex] of Object.entries(colorHexMap)) {
    if (norm.includes(key)) return hex;
  }
  return '#9E9E9E'; // default grey
}

// Category mappings
const categoryMap = {
  'altura': { cat: 'altura', badge: 'NR-35' },
  'bolsas-e-organizadores': { cat: 'bolsas', badge: 'Bolsas' },
  'carretilhas-roldanas': { cat: 'carretilhas', badge: 'Equipamentos' },
  'conjunto-de-aterramento': { cat: 'aterramento', badge: 'NR-10' },
  'detector-de-tensao': { cat: 'detector', badge: 'NR-10' },
  'epis': { cat: 'epi', badge: 'EPI' },
  'esticadores-esporas': { cat: 'esticadores', badge: 'Equipamentos' },
  'grampos-cabecotes': { cat: 'grampos', badge: 'NR-10' },
  'guincho-talha': { cat: 'guincho', badge: 'Equipamentos' },
  'linha-viva': { cat: 'linha-viva', badge: 'NR-10' },
  'pega-poste-movimentador-de-poste': { cat: 'pega-poste', badge: 'Equipamentos' },
  'selas-cintas-colar': { cat: 'selas', badge: 'NR-10' },
  'sinalizacao': { cat: 'sinalizacao', badge: 'Sinalização' }
};

function getProductCategoryInfo(product) {
  // Find matching category from categories array
  for (const catSlug of (product.categories || [])) {
    if (categoryMap[catSlug]) {
      return categoryMap[catSlug];
    }
  }
  return { cat: 'epi', badge: 'EPI' }; // default fallback
}

// Generate the HTML for the product cards
let productsHtml = '';

products.forEach(p => {
  const { cat, badge } = getProductCategoryInfo(p);
  const localImage = p.localImage || 'img/placeholder.png';
  const sku = p.sku || 'N/A';
  const desc = p.description ? p.description.trim() : '';
  
  // Variations html
  let swatchesHtml = '';
  if (p.variations && p.variations.length > 0) {
    swatchesHtml = `<div class="color-swatches">`;
    // Add main image as first swatch
    const mainColor = 'Padrão';
    swatchesHtml += `
      <span class="color-swatch active" 
            style="background-color: #9E9E9E;" 
            data-img-src="${localImage}" 
            title="${mainColor}"></span>`;
            
    p.variations.forEach(v => {
      if (v.localImage) {
        const hex = getColorHex(v.color);
        swatchesHtml += `
          <span class="color-swatch" 
                style="background-color: ${hex};" 
                data-img-src="${v.localImage}" 
                title="${v.color}"></span>`;
      }
    });
    swatchesHtml += `</div>`;
  }

  productsHtml += `
    <article aria-label="${p.name}" class="product-card reveal" data-category="${cat}" role="listitem">
      <div class="product-card__inner">
        <div class="product-card__front">
          <div class="product-card__image" onclick="this.closest('.product-card').classList.toggle('flipped')" tabindex="0">
            <img alt="${p.name}" height="300" loading="lazy" src="${localImage}" width="300"/>
            <div class="product-card__overlay">
              <svg class="zoom-icon" fill="none" height="24" onclick="event.stopPropagation(); openLightbox(this.closest('.product-card'))" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewbox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" x2="16.65" y1="21" y2="16.65"></line>
                <line x1="11" x2="11" y1="8" y2="14"></line>
                <line x1="8" x2="14" y1="11" y2="11"></line>
              </svg>
              <h3 class="product-card__overlay-title">${p.name}</h3>
              <span class="badge badge--navy">${badge}</span>
              ${swatchesHtml}
            </div>
          </div>
        </div>
        <div class="product-card__back">
          <div class="product-card__body">
            <div class="product-card__category">${badge}</div>
            <h3 class="product-card__name">${p.name}</h3>
            <div class="product-card__specs">
              Ref/Cód: ${sku}<br/>
              ${desc}
            </div>
            <div class="product-card__actions">
              <button class="btn btn--primary btn--sm btn-add-cart" data-product="${p.name}">Adicionar ao Carrinho</button>
            </div>
          </div>
        </div>
      </div>
    </article>
  `;
});

// Rebuild the HTML file by replacing the content inside the products-grid div
let htmlContent = fs.readFileSync(htmlPath, 'utf8');

const startTag = '<div class="products__grid" id="products-grid" role="list">';
const endTag = '</div><!-- /products-grid -->';

const startIndex = htmlContent.indexOf(startTag);
const endIndex = htmlContent.indexOf(endTag);

if (startIndex === -1 || endIndex === -1) {
  console.error('Failed to locate the products grid markers in produtos.html');
  process.exit(1);
}

const newHtmlContent = 
  htmlContent.substring(0, startIndex + startTag.length) + 
  productsHtml + 
  htmlContent.substring(endIndex);

fs.writeFileSync(htmlPath, newHtmlContent);
console.log('Successfully rebuilt produtos.html products grid!');
