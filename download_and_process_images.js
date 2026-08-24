const fs = require('fs');
const path = require('path');
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const products = JSON.parse(fs.readFileSync('/Users/pm/Site SPIDER/epi-marketplace/serveq_products.json', 'utf8'));
const outputDir = '/Users/pm/Site SPIDER/epi-marketplace/img/serveq';
fs.mkdirSync(outputDir, { recursive: true });

async function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function getSlug(url) {
  const parts = url.replace(/\/$/, '').split('/');
  return parts[parts.length - 1];
}

async function downloadFile(url, destPath) {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const buffer = Buffer.from(await res.arrayBuffer());
    fs.writeFileSync(destPath, buffer);
    return true;
  } catch (e) {
    console.error(`Failed to download ${url} to ${destPath}:`, e.message);
    return false;
  }
}

async function main() {
  console.log(`Starting downloads for ${products.length} products...`);
  
  // Collect all unique download tasks
  const downloads = [];
  
  products.forEach((p, idx) => {
    const slug = getSlug(p.url);
    const sku = p.sku ? String(p.sku).replace(/[\/\s]/g, '_') : `no_sku_${slug}`;
    
    // Main image
    if (p.image) {
      const ext = path.extname(p.image.split('?')[0]) || '.jpg';
      const destName = `${sku}${ext}`;
      const destPath = path.join(outputDir, destName);
      
      // Update main image reference in the JSON memory
      p.localImage = `img/serveq/${destName}`;
      
      downloads.push({
        url: p.image,
        destPath: destPath,
        label: `${p.name} (Main)`
      });
    }
    
    // Variation images
    if (p.variations && p.variations.length > 0) {
      p.variations.forEach((v, vIdx) => {
        if (v.image) {
          const colorName = v.color ? v.color.replace(/[\/\s]/g, '_') : `v_${vIdx}`;
          const ext = path.extname(v.image.split('?')[0]) || '.jpg';
          const destName = `${sku}-${colorName}${ext}`;
          const destPath = path.join(outputDir, destName);
          
          v.localImage = `img/serveq/${destName}`;
          
          downloads.push({
            url: v.image,
            destPath: destPath,
            label: `${p.name} (${v.color})`
          });
        }
      });
    }
  });
  
  // Execute downloads in parallel batches
  const limit = 10;
  for (let i = 0; i < downloads.length; i += limit) {
    const chunk = downloads.slice(i, i + limit);
    console.log(`Downloading batch ${i / limit + 1}/${Math.ceil(downloads.length / limit)}...`);
    
    const promises = chunk.map(async (item) => {
      const success = await downloadFile(item.url, item.destPath);
      if (success) {
        console.log(`Downloaded: ${item.label}`);
      }
    });
    
    await Promise.all(promises);
    await delay(300);
  }
  
  // Write back the updated JSON with localImage references
  fs.writeFileSync('/Users/pm/Site SPIDER/epi-marketplace/serveq_products.json', JSON.stringify(products, null, 2));
  console.log('Finished downloads. Updated serveq_products.json with local image paths.');
}

main().catch(console.error);
