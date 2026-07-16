/* ============================================================
   EPI MARKETPLACE — PRODUCTS PAGE JS
   Sidebar category filter + search
============================================================ */

(function () {
  'use strict';

  const grid   = document.getElementById('products-grid');
  const cards  = grid ? Array.from(grid.querySelectorAll('.product-card')) : [];
  const counter = document.getElementById('count-display');
  const searchInput = document.getElementById('product-search');
  const sidebarCats = document.querySelectorAll('.sidebar-cat[data-filter]');

  let activeFilter = 'all';
  let searchTerm   = '';

  function updateSidebarCounts() {
    const counts = { all: cards.length };
    
    cards.forEach(card => {
      const cat = (card.dataset.category || '').toLowerCase();
      if (cat) {
        counts[cat] = (counts[cat] || 0) + 1;
      }
    });

    sidebarCats.forEach(cat => {
      const filter = cat.dataset.filter;
      const span = cat.querySelector('span');
      if (span) {
        span.textContent = counts[filter] || 0;
      }
    });
  }

  updateSidebarCounts();

  const normChecks = document.querySelectorAll('input[name="norma"]');

  function getCardNorm(card) {
    const cat = (card.dataset.category || '').toLowerCase();
    if (['linha-viva', 'aterramento', 'detector'].includes(cat)) return 'nr10';
    if (['altura'].includes(cat)) return 'nr35';
    if (['epi', 'sinalizacao'].includes(cat)) return 'nr6';
    return '';
  }

  function applyFilters() {
    let visible = 0;
    const checkedNorms = Array.from(normChecks).filter(c => c.checked).map(c => c.value);

    cards.forEach(card => {
      const cat = (card.dataset.category || '').toLowerCase();
      const name = card.querySelector('.product-card__name')?.textContent.toLowerCase() || '';
      const specs = card.querySelector('.product-card__specs')?.textContent.toLowerCase() || '';
      const norm = getCardNorm(card);

      const catMatch  = activeFilter === 'all' || cat === activeFilter;
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

    if (counter) counter.textContent = visible;
  }

  // Sidebar category clicks
  sidebarCats.forEach(cat => {
    cat.addEventListener('click', (e) => {
      e.preventDefault();
      activeFilter = cat.dataset.filter;

      sidebarCats.forEach(c => c.classList.remove('active'));
      cat.classList.add('active');

      applyFilters();
    });
  });

  // Norm checkbox change
  normChecks.forEach(check => {
    check.addEventListener('change', () => {
      applyFilters();
    });
  });

  // URL params on load
  const urlParams = new URLSearchParams(window.location.search);
  const catParam  = urlParams.get('categoria');
  if (catParam) {
    activeFilter = catParam;
    sidebarCats.forEach(c => {
      c.classList.toggle('active', c.dataset.filter === catParam);
    });
  }

  const normaParam = urlParams.get('norma');
  if (normaParam) {
    const targetCheck = document.getElementById(`check-${normaParam}`);
    if (targetCheck) {
      targetCheck.checked = true;
    }
  }

  // Search
  if (searchInput) {
    let debounceTimer;
    searchInput.addEventListener('input', () => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        searchTerm = searchInput.value.trim().toLowerCase();
        applyFilters();
      }, 300);
    });
  }

  applyFilters();
})();
