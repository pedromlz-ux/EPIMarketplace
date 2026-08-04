import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const cwd = path.join(__dirname, '..');

const SUPABASE_URL = 'https://knmkacjuyjgxiwdjpggz.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtubWthY2p1eWpneGl3ZGpwZ2d6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQxMzU2MjcsImV4cCI6MjA5OTcxMTYyN30.G28xb7vjtkcrtWrPKWTex--yUsySxMjUZvP7Q6eEPQc';

const SLUG_IMAGE_MAP = {
  'guia-pratico-como-se-proteger-no-trabalho-utilizando-epi-de-forma-eficiente': '/img/blog/guia-pratico-como-se-proteger-no-trabalho-utilizando-epi-de-forma-eficiente-img1.jpg',
  'ca-de-epi-como-verificar-a-validade-e-por-que-ele-e-essencial-para-a-seguranca': '/img/blog/ca-de-epi-como-verificar-a-validade-e-por-que-ele-e-essencial-para-a-seguranca-img1.jpg',
  'nr-10-nr-35-guia-completo-sobre-as-normas-e-epis-necessarios': '/img/blog/nr10-nr35-img1.jpg',
};

async function buildBlog() {
  console.log('🚀 Iniciando Static Site Generation (SSG) para o Blog...');
  
  // 1. Fetch data
  const res = await fetch(`${SUPABASE_URL}/rest/v1/blog_posts?select=*&published=eq.true`, {
    headers: {
      'apikey': SUPABASE_ANON_KEY,
      'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
    }
  });

  if (!res.ok) {
    throw new Error(`Erro ao buscar posts: ${res.statusText}`);
  }

  const posts = await res.json();
  console.log(`Encontrados ${posts.length} posts.`);

  // 2. Read template
  const templatePath = path.resolve(cwd, 'dist/artigo.html');
  if (!fs.existsSync(templatePath)) {
    console.error('Template dist/artigo.html não encontrado! Rode o vite build primeiro.');
    process.exit(1);
  }
  const templateHtml = fs.readFileSync(templatePath, 'utf8');

  // 3. Process each post
  for (const post of posts) {
    const slug = post.slug;
    console.log(`- Gerando estático para: ${slug}`);

    const imgUrl = SLUG_IMAGE_MAP[slug] || post.image_url || 'https://images.unsplash.com/photo-1504307651254-35680f356f58?auto=format&fit=crop&w=800&q=80';
    const postDate = new Date(post.date).toLocaleDateString('pt-BR');
    
    // Replace SEO Meta Tags
    let html = templateHtml;
    html = html.replace('<title>Artigo — EPI Marketplace</title>', `<title>${post.title} | Blog EPI Marketplace</title>`);
    html = html.replace('<meta name="description" content="Carregando artigo técnico...">', `<meta name="description" content="${post.summary || post.title}">`);
    
    // Open Graph
    html = html.replace('<meta property="og:title" content="Artigo — EPI Marketplace">', `<meta property="og:title" content="${post.title}">`);
    html = html.replace('<meta property="og:description" content="Carregando artigo...">', `<meta property="og:description" content="${post.summary || post.title}">`);
    html = html.replace('<meta property="og:url" content="https://epimarketplace.com/blog">', `<meta property="og:url" content="https://epimarketplace.com/blog/${slug}">`);

    // Schema JSON-LD Article
    const articleSchema = {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": post.title,
      "image": [ `https://epimarketplace.com${imgUrl}` ],
      "datePublished": post.date,
      "author": {
        "@type": "Person",
        "name": post.author || "Especialista em EPIs"
      },
      "publisher": {
        "@type": "Organization",
        "name": "EPI Marketplace",
        "logo": {
          "@type": "ImageObject",
          "url": "https://epimarketplace.com/img/logo.png"
        }
      }
    };

    html = html.replace('</head>', `
      <script type="application/ld+json">
        ${JSON.stringify(articleSchema, null, 2)}
      </script>
    </head>`);

    // Replace actual content. We use a simple regex to replace everything inside the <main> block 
    // or just the #article-view inner.
    const contentHtml = `
      <header class="article-header" style="margin-bottom: var(--space-8);">
        <div style="display:flex; gap: var(--space-4); align-items:center; margin-bottom: var(--space-4); flex-wrap: wrap;">
          <span class="badge badge--navy">${post.category || 'Geral'}</span>
          <span style="color: var(--clr-text-dim); font-size: 0.9em; display: inline-flex; align-items: center; gap: 4px;">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            Por <strong style="color: var(--clr-navy);">${post.author || 'Especialista em EPIs'}</strong>
          </span>
          <span style="color: var(--clr-text-dim); font-size: 0.9em; display: inline-flex; align-items: center; gap: 4px;">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
            ${postDate}
          </span>
          <span style="color: var(--clr-text-dim); font-size: 0.9em; display: inline-flex; align-items: center; gap: 4px;">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            ${post.readtime || '5 min'}
          </span>
        </div>
        <h1 class="article-title" style="font-family: var(--font-display); font-size: clamp(2rem, 4vw, 3.5rem); font-weight: 800; line-height: 1.1; margin-bottom: var(--space-6); color: var(--clr-navy);">
          ${post.title}
        </h1>
        <img src="${imgUrl}" alt="${post.image_alt || post.title}" style="width: 100%; height: auto; max-height: 500px; object-fit: cover; border-radius: var(--radius-lg);" />
      </header>
      <div class="article-body">
        ${post.content || ''}
      </div>
    `;

    // Remove the loading screen and replace with actual content
    html = html.replace('<div id="loading" style="display:flex;', '<div id="loading" style="display:none;');
    html = html.replace('<div id="article-view" style="display:none;">', '<div id="article-view" style="display:block;">');
    
    // Inject content exactly into the structure, avoiding complex regex matching of the inner divs by replacing a known block
    html = html.replace(/(<div id="article-view"[^>]*>)([\s\S]*?)(<section class="article-share")/, `$1${contentHtml}$3`);

    // Create directory
    const dirPath = path.resolve(cwd, `dist/blog/${slug}`);
    fs.mkdirSync(dirPath, { recursive: true });
    
    // Write file
    fs.writeFileSync(path.join(dirPath, 'index.html'), html);
  }

  console.log('✅ SSG concluído com sucesso!');
}

buildBlog().catch(err => {
  console.error('Erro no SSG:', err);
  process.exit(1);
});
