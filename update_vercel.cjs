const fs = require('fs');
const file = '/Users/pm/Site SPIDER/epi-marketplace/vercel.json';
let config = JSON.parse(fs.readFileSync(file, 'utf8'));

if (!config.rewrites) {
  config.rewrites = [];
}

const hasBlogRewrite = config.rewrites.some(r => r.source === '/blog/:slug');
if (!hasBlogRewrite) {
  config.rewrites.unshift({
    source: "/blog/:slug",
    destination: "/artigo.html?slug=:slug"
  });
  fs.writeFileSync(file, JSON.stringify(config, null, 2));
  console.log('Added /blog/:slug rewrite');
} else {
  console.log('Rewrite already exists');
}
