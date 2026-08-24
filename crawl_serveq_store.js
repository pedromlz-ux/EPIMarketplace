const fs = require('fs');
const path = require('path');
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const categories = [
  'altura',
  'bolsas-e-organizadores',
  'carretilhas-roldanas',
  'conjunto-de-aterramento',
  'detector-de-tensao',
  'epis',
  'esticadores-esporas',
  'grampos-cabecotes',
  'guincho-talha',
  'linha-viva',
  'pega-poste-movimentador-de-poste',
  'selas-cintas-colar',
  'sinalizacao'
];

async function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function fetchWithRetry(url, retries = 3) {
  for (let i = 0; i < retries; i++) {
    try {
      const res = await fetch(url);
      if (res.status === 404) return null;
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.text();
    } catch (e) {
      console.warn(`[Retry ${i + 1}/${retries}] Failed to fetch ${url}: ${e.message}`);
      if (i === retries - 1) throw e;
      await delay(1000 * (i + 1));
    }
  }
}

async function getProductLinks() {
  const productLinks = new Set();
  
  for (const cat of categories) {
    let page = 1;
    while (true) {
      const url = `https://serveq.com.br/categoria-produto/${cat}/page/${page}/`;
      console.log(`Scanning Category: ${cat} | Page: ${page}`);
      try {
        const html = await fetchWithRetry(url);
        if (!html) {
          // 404 means no more pages
          break;
        }
        
        // Find links like /produto/some-slug/
        const regex = /href="(https:\/\/serveq\.com\.br\/produto\/[^"/]+\/)"/g;
        let match;
        let count = 0;
        while ((match = regex.exec(html)) !== null) {
          productLinks.add(match[1]);
          count++;
        }
        
        console.log(`Found ${count} products on page ${page}`);
        if (count === 0) {
          // If a page has 0 products, we can stop paginating
          break;
        }
        
        page++;
        await delay(500); // polite delay
      } catch (e) {
        console.error(`Error scanning ${url}: ${e.message}`);
        break;
      }
    }
  }
  
  return Array.from(productLinks);
}

function parseProductDetails(html, url) {
  let productData = null;
  
  // Try to find Product schema in application/ld+json
  const scriptRegex = /<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g;
  let match;
  while ((match = scriptRegex.exec(html)) !== null) {
    try {
      const json = JSON.parse(match[1]);
      
      // Yoast / WooCommerce standard schema is often nested in @graph
      if (json['@graph'] && Array.isArray(json['@graph'])) {
        const prod = json['@graph'].find(item => item['@type'] === 'Product');
        if (prod) {
          productData = prod;
          break;
        }
      }
      
      // Sometimes it is direct Product type
      if (json['@type'] === 'Product') {
        productData = json;
        break;
      }
      
      // Alternative formats (array of schemas)
      if (Array.isArray(json)) {
        const prod = json.find(item => item['@type'] === 'Product');
        if (prod) {
          productData = prod;
          break;
        }
      }
    } catch (e) {
      // Ignore parse errors for other scripts
    }
  }
  
  if (!productData) {
    // Fallback regex parsing if JSON-LD is missing
    const skuM = html.match(/class="sku">([^<]+)</);
    const titleM = html.match(/<h1[^>]*class="[^"]*product_title[^"]*"[^>]*>([^<]+)</);
    const imgM = html.match(/class="[^"]*wp-post-image[^"]*"[^>]*src="([^"]+)"/);
    
    if (skuM || titleM) {
      productData = {
        name: titleM ? titleM[1].trim() : '',
        sku: skuM ? skuM[1].trim() : '',
        image: imgM ? imgM[1] : '',
        description: ''
      };
    } else {
      return null;
    }
  }
  
  // Clean description HTML
  let description = productData.description || '';
  // Try to extract rich description from description tab if short desc is empty/short
  const descTabMatch = html.match(/<div[^>]*id="tab-description"[^>]*>([\s\S]*?)<\/div>/);
  if (descTabMatch) {
    // Strip tags roughly
    description = descTabMatch[1]
      .replace(/<[^>]+>/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  } else {
    // Try short description
    const shortDescMatch = html.match(/<div[^>]*class="woocommerce-product-details__short-description"[^>]*>([\s\S]*?)<\/div>/);
    if (shortDescMatch) {
      description = shortDescMatch[1]
        .replace(/<[^>]+>/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();
    }
  }
  
  // Try to find variations (colors)
  const variations = [];
  const variationsFormMatch = html.match(/data-product_variations="([^"]+)"/);
  if (variationsFormMatch) {
    try {
      // Unescape HTML entities in data attribute
      const decodedJson = variationsFormMatch[1]
        .replace(/&quot;/g, '"')
        .replace(/&amp;/g, '&')
        .replace(/&#039;/g, "'")
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>');
      const variationsData = JSON.parse(decodedJson);
      
      variationsData.forEach(v => {
        // Extract attributes (e.g. attribute_pa_cor)
        const attrs = v.attributes || {};
        const colorAttr = Object.keys(attrs).find(k => k.includes('cor') || k.includes('color'));
        const colorName = colorAttr ? attrs[colorAttr] : '';
        
        if (v.image && v.image.src) {
          variations.push({
            color: colorName,
            sku: v.sku || '',
            image: v.image.src
          });
        }
      });
    } catch (e) {
      console.warn(`Failed to parse variations for ${url}:`, e.message);
    }
  }

  // Extract categories from breadcrumbs or class names
  const categoryLinks = [];
  const catRegex = /href="https:\/\/serveq\.com\.br\/categoria-produto\/([^"/]+)\/"/g;
  let catMatch;
  while ((catMatch = catRegex.exec(html)) !== null) {
    categoryLinks.push(catMatch[1]);
  }
  
  return {
    name: productData.name,
    sku: productData.sku || '',
    description: description,
    image: Array.isArray(productData.image) ? productData.image[0] : (productData.image?.url || productData.image || ''),
    url: url,
    categories: Array.from(new Set(categoryLinks)),
    variations: variations
  };
}

async function scrapeProducts(links) {
  const products = [];
  console.log(`Scraping details for ${links.length} products...`);
  
  // Set concurrency limit to avoid overwhelming the site
  const limit = 5;
  for (let i = 0; i < links.length; i += limit) {
    const chunk = links.slice(i, i + limit);
    const promises = chunk.map(async (link) => {
      try {
        const html = await fetchWithRetry(link);
        if (!html) return;
        const details = parseProductDetails(html, link);
        if (details) {
          products.push(details);
          console.log(`Scraped: ${details.name} (SKU: ${details.sku})`);
        }
      } catch (e) {
        console.error(`Failed to scrape ${link}: ${e.message}`);
      }
    });
    
    await Promise.all(promises);
    await delay(300); // polite pause between batches
  }
  
  return products;
}

async function main() {
  const links = await getProductLinks();
  console.log(`Found ${links.length} unique product links.`);
  
  const products = await scrapeProducts(links);
  
  const outputPath = '/Users/pm/Site SPIDER/epi-marketplace/serveq_products.json';
  fs.writeFileSync(outputPath, JSON.stringify(products, null, 2));
  console.log(`Saved ${products.length} products to ${outputPath}`);
}

main().catch(console.error);
