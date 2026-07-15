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

  function applyFilters() {
    let visible = 0;
    cards.forEach(card => {
      const cat = (card.dataset.category || '').toLowerCase();
      const name = card.querySelector('.product-card__name')?.textContent.toLowerCase() || '';
      const specs = card.querySelector('.product-card__specs')?.textContent.toLowerCase() || '';

      const catMatch  = activeFilter === 'all' || cat === activeFilter;
      const termMatch = !searchTerm || name.includes(searchTerm) || specs.includes(searchTerm);

      if (catMatch && termMatch) {
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

  // URL param on load
  const urlParams = new URLSearchParams(window.location.search);
  const catParam  = urlParams.get('categoria');
  if (catParam) {
    activeFilter = catParam;
    sidebarCats.forEach(c => {
      c.classList.toggle('active', c.dataset.filter === catParam);
    });
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
