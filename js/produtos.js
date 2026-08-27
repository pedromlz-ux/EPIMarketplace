/* ============================================================
   EPI MARKETPLACE — PRODUCTS PAGE JS (2-SCREEN VIEW CONTROLLER)
   Screen 1: Category Grid (#view-categories)
   Screen 2: Products List (#view-products)
============================================================ */

(function () {
  'use strict';

  // Category Metadata
  const CATEGORY_DATA = {
    'altura':       { title: 'Trabalho em Altura',      desc: 'Cintos paraquedistas, talabartes, trava-quedas e sistemas de ancoragem certificados (NR-35).' },
    'linha-viva':   { title: 'Linha Viva',              desc: 'Ferramentas isoladas 1000V, luvas de alta tensão e coberturas isolantes de segurança (NR-10).' },
    'epi':          { title: 'EPIs / Ferramentas',      desc: 'Capacetes de segurança, botinas, óculos de proteção e vestimentas profissionais.' },
    'grampos':      { title: 'Grampos / Cabeçotes',     desc: 'Grampos de linha viva, cabeçotes de manobra e conectores de alta condutibilidade.' },
    'bolsas':       { title: 'Bolsas e Organizadores',  desc: 'Bolsas de lona reforçadas, baldes de içamento e estojos organizadores de ferramentas.' },
    'carretilhas':  { title: 'Carretilhas / Roldanas',  desc: 'Carretilhas de lançamento de cabos, moitões e roldanas industriais para rede aérea.' },
    'aterramento':  { title: 'Conjunto de Aterramento', desc: 'Varas de aterramento rápido, cabos de cobre espiralados e grampos para subestações.' },
    'esticadores':  { title: 'Esticadores / Esporas',   desc: 'Esporas de aço para subida em postes e esticadores manuais de alta resistência.' },
    'selas':        { title: 'Selas / Cintas / Colar',  desc: 'Selas de ancoragem para postes, cintas de elevação de carga e colares de isolamento.' },
    'sinalizacao':  { title: 'Sinalização',             desc: 'Cones reflexivos de segurança, fitas zebradas e placas de advertência NR-10.' },
    'guincho':      { title: 'Guincho / Talha',         desc: 'Talhas manuais de alavanca/corrente e guinchos para içamento e tração de cabos.' },
    'detector':     { title: 'Detector de Tensão',      desc: 'Detectores ópticos e sonoros por aproximação para média e alta tensão com visor digital.' },
    'pega-poste':   { title: 'Pega Poste',              desc: 'Dispositivos articulados pega-poste e braçadeiras de ancoragem de alta fixação.' }
  };

  let currentCategory = null;
  let searchTerm      = '';

  function getCardNorm(card) {
    const cat = (card.dataset.category || '').toLowerCase();
    if (['linha-viva', 'aterramento', 'detector'].includes(cat)) return 'nr10';
    if (['altura'].includes(cat)) return 'nr35';
    if (['epi', 'sinalizacao'].includes(cat)) return 'nr6';
    return '';
  }

  function applyFilters() {
    const normChecks  = document.querySelectorAll('input[name="norma"]');
    const checkedNorms = Array.from(normChecks).filter(c => c.checked).map(c => c.value);
    const cards        = Array.from(document.querySelectorAll('#products-grid .product-card'));
    const activeBadge  = document.getElementById('active-cat-badge');

    let visible = 0;

    cards.forEach(card => {
      const cat   = (card.dataset.category || '').toLowerCase();
      const name  = card.querySelector('.product-card__name')?.textContent.toLowerCase() || '';
      const specs = card.querySelector('.product-card__specs')?.textContent.toLowerCase() || '';
      const norm  = getCardNorm(card);

      const catMatch  = !currentCategory || (cat === currentCategory);
      const termMatch = !searchTerm || name.includes(searchTerm) || specs.includes(searchTerm);
      const normMatch = checkedNorms.length === 0 || checkedNorms.includes(norm);

      if (catMatch && termMatch && normMatch) {
        card.style.display = 'flex';
        card.classList.add('visible');
        visible++;
      } else {
        card.style.display = 'none';
        card.classList.remove('visible');
      }
    });

    if (activeBadge) {
      activeBadge.textContent = `${visible} ${visible === 1 ? 'produto' : 'produtos'}`;
    }
  }

  // TELA 1: Mostrar Grade de Categorias
  function showCategoriesView(updateUrl = true) {
    currentCategory = null;
    searchTerm = '';
    const searchInput = document.getElementById('product-search');
    if (searchInput) searchInput.value = '';
    document.querySelectorAll('input[name="norma"]').forEach(c => { c.checked = false; });

    const viewCategories = document.getElementById('view-categories');
    const viewProducts   = document.getElementById('view-products');

    if (viewCategories) viewCategories.style.display = 'block';
    if (viewProducts)   viewProducts.style.display   = 'none';

    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (updateUrl) {
      const url = new URL(window.location.href);
      url.searchParams.delete('categoria');
      window.history.pushState({ view: 'categories' }, '', url.pathname);
    }
  }

  // TELA 2: Mostrar Produtos da Categoria
  function showProductsView(categorySlug, updateUrl = true, smoothScroll = true) {
    const slug = (categorySlug || '').toLowerCase().trim();
    if (!CATEGORY_DATA[slug]) {
      showCategoriesView(updateUrl);
      return;
    }

    currentCategory = slug;
    const info = CATEGORY_DATA[slug];

    const activeTitle = document.getElementById('active-cat-title');
    const activeSub   = document.getElementById('active-cat-subtitle');
    const viewCategories = document.getElementById('view-categories');
    const viewProducts   = document.getElementById('view-products');

    if (activeTitle) activeTitle.textContent = info.title;
    if (activeSub)   activeSub.textContent   = info.desc;

    if (viewCategories) viewCategories.style.display = 'none';
    if (viewProducts)   viewProducts.style.display   = 'block';

    applyFilters();

    if (smoothScroll) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    if (updateUrl) {
      const url = new URL(window.location.href);
      url.searchParams.set('categoria', slug);
      window.history.pushState({ view: 'products', category: slug }, '', url.toString());
    }
  }

  // Global Event Delegation for Clicks (Cat-blocks and Back button)
  document.addEventListener('click', (e) => {
    // 1. Clicar em qualquer bloco de categoria
    const catBlock = e.target.closest('.cat-block');
    if (catBlock) {
      e.preventDefault();
      const cat = catBlock.dataset.category || new URL(catBlock.href, window.location.origin).searchParams.get('categoria');
      if (cat) {
        showProductsView(cat, true, true);
      }
      return;
    }

    // 2. Clicar no botão voltar para categorias
    const backBtn = e.target.closest('#btn-back-to-categories, .btn-back-categories');
    if (backBtn) {
      e.preventDefault();
      showCategoriesView(true);
      return;
    }
  });

  // Filtros de Norma
  document.addEventListener('change', (e) => {
    if (e.target && e.target.name === 'norma') {
      applyFilters();
    }
  });

  // Busca de Produtos
  let debounceTimer;
  document.addEventListener('input', (e) => {
    if (e.target && e.target.id === 'product-search') {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        searchTerm = e.target.value.trim().toLowerCase();
        applyFilters();
      }, 200);
    }
  });

  // Histórico de navegação (botão Voltar/Avançar do navegador)
  window.addEventListener('popstate', () => {
    const params = new URLSearchParams(window.location.search);
    const cat = params.get('categoria');
    if (cat && CATEGORY_DATA[cat]) {
      showProductsView(cat, false, true);
    } else {
      showCategoriesView(false);
    }
  });

  // Inicialização no carregamento da página
  function init() {
    const params = new URLSearchParams(window.location.search);
    const cat = params.get('categoria');
    if (cat && CATEGORY_DATA[cat]) {
      showProductsView(cat, false, false);
    } else {
      showCategoriesView(false);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Export to window for debugging if needed
  window.EPI_CATEGORIES = {
    showCategoriesView,
    showProductsView
  };

})();

// Color Swatches interaction for product cards
document.querySelectorAll('.color-swatches').forEach(container => {
  container.addEventListener('click', (e) => {
    const swatch = e.target.closest('.color-swatch');
    if (!swatch) return;
    
    e.preventDefault();
    e.stopPropagation();

    const swatches = container.querySelectorAll('.color-swatch');
    swatches.forEach(s => s.classList.remove('active'));
    swatch.classList.add('active');

    const newImgSrc = swatch.dataset.imgSrc;
    if (newImgSrc) {
      const card = swatch.closest('.product-card');
      if (card) {
        const img = card.querySelector('.product-card__image img');
        if (img) {
          img.src = newImgSrc;
        }
      }
    }
  });
});
