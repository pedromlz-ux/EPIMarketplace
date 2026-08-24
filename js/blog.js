/**
 * EPI Marketplace — Blog Integration
 *
 * Estratégia de imagens: para evitar timeout com strings base64 gigantes,
 * selecionamos apenas campos leves como image_url.
 */

const SUPABASE_URL = 'https://knmkacjuyjgxiwdjpggz.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtubWthY2p1eWpneGl3ZGpwZ2d6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQxMzU2MjcsImV4cCI6MjA5OTcxMTYyN30.G28xb7vjtkcrtWrPKWTex--yUsySxMjUZvP7Q6eEPQc';

const SLUG_IMAGE_MAP = {
  'epi-para-eletricista-equipamentos-obrigatorios-nr-10':
    'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=1200&q=80',
  'guia-pratico-como-se-proteger-no-trabalho-utilizando-epi-de-forma-eficiente':
    '/img/blog/guia-pratico-como-se-proteger-no-trabalho-utilizando-epi-de-forma-eficiente-img1.jpg',
  'ca-de-epi-como-verificar-a-validade-e-por-que-ele-e-essencial-para-a-seguranca':
    '/img/blog/ca-de-epi-como-verificar-a-validade-e-por-que-ele-e-essencial-para-a-seguranca-img1.jpg',
  'nr-10-nr-35-guia-completo-sobre-as-normas-e-epis-necessarios':
    '/img/blog/nr10-nr35-img1.jpg',
  'como-escolher-epi-guia-completo-para-seguranca-e-conformidade':
    '/img/blog/como-escolher-epi-img1.png',
};

const DEFAULT_IMG = 'https://images.unsplash.com/photo-1504307651254-35680f356f58?auto=format&fit=crop&w=800&q=80';

// _supabase initialized inside function

function getImageForPost(post) {
  if (SLUG_IMAGE_MAP[post.slug]) return SLUG_IMAGE_MAP[post.slug];
  if (post.image_url && post.image_url.trim() !== '') return post.image_url;
  return DEFAULT_IMG;
}

let allPosts = [];
let visibleCount = 3;

function renderVisiblePosts() {
  const grid = document.getElementById('blog-grid');
  const countLabel = document.querySelector('.blog-count-label');
  const loadMoreBtn = document.querySelector('.btn-ver-mais');
  
  if (!grid) return;
  grid.innerHTML = '';

  const postsToShow = allPosts.slice(0, visibleCount);

  postsToShow.forEach((post, idx) => {
    const imgUrl = getImageForPost(post);
    const imgAlt = post.image_alt || post.title || 'Artigo sobre EPI';

    const article = document.createElement('article');
    // Maintain reveal animation for newly added cards, but delay them if needed
    article.className = 'blog-card reveal visible';
    if (idx >= 3) {
      article.style.animation = `cardEnter 0.45s ease-out ${(idx - 3) * 0.1}s both`;
    } else {
      article.style.animation = 'none';
    }
    
    article.innerHTML = `
      <img src="${imgUrl}" alt="${imgAlt}" class="blog-card__img" loading="lazy">
      <div class="blog-card__body">
        <span class="blog-card__tag">${post.category || 'EPI'}</span>
        <h2 class="blog-card__title">${post.title}</h2>
        <p class="blog-card__desc">${post.summary || ''}</p>
        <a href="/blog/${post.slug}" class="blog-card__link">
          Ler artigo completo
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </a>
      </div>
    `;
    grid.appendChild(article);
  });

  if (countLabel) {
    countLabel.innerHTML = `Mostrando <strong>${postsToShow.length}</strong> de <strong>${allPosts.length}</strong> artigos`;
  }

  if (loadMoreBtn) {
    if (visibleCount >= allPosts.length) {
      loadMoreBtn.style.display = 'none';
    } else {
      loadMoreBtn.style.display = 'inline-flex';
      // Remover o alert('Mais artigos serão publicados em breve!') que estava no HTML
      loadMoreBtn.removeAttribute('onclick');
      loadMoreBtn.onclick = (e) => {
        e.preventDefault();
        visibleCount = allPosts.length;
        renderVisiblePosts();
      };
    }
  }
}

async function loadBlogPosts() {
  try {
    const _supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    const { data: posts, error } = await _supabase
      .from('blog_posts')
      .select('id,title,summary,slug,category,date,image_alt,image_url,published')
      .eq('published', true)
      .order('date', { ascending: false });

    if (error) throw error;

    if (posts && posts.length > 0) {
      allPosts = posts;
      renderVisiblePosts();
    }
  } catch (err) {
    console.warn('Blog: erro ao carregar posts do Supabase.', err.message);
  }
}

document.addEventListener('DOMContentLoaded', loadBlogPosts);
