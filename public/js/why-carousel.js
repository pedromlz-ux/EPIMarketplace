/**
 * Fan Carousel — "O que nos torna referência"
 * Cards empilhados em leque, card central em destaque.
 */
(function () {
  'use strict';

  function initWhyCarousel() {
    const stage = document.getElementById('whyStage');
    const prevBtn = document.getElementById('whyPrev');
    const nextBtn = document.getElementById('whyNext');
    const dotsContainer = document.getElementById('whyDots');
    const countCurrent = document.getElementById('whyCountCurrent');

    if (!stage || !prevBtn || !nextBtn) return;

    const cards = Array.from(stage.querySelectorAll('.why-card'));
    const total = cards.length;
    let active = 0;
    let isAnimating = false;

    // ── Position map: relative index → CSS data-pos value ──────────────────
    // pos 0 = active center
    // pos 1, 2 … to the right
    // pos -1, -2 … to the left
    const posMap = {
      0: 'center',
      1: 'right-1',
      2: 'right-2',
      [-1]: 'left-1',
      [-2]: 'left-2',
    };

    function getPos(cardIndex) {
      let diff = cardIndex - active;
      // wrap around
      if (diff > total / 2)  diff -= total;
      if (diff < -total / 2) diff += total;
      return posMap[diff] ?? 'hidden';
    }

    // ── Build dots ──────────────────────────────────────────────────────────
    function buildDots() {
      dotsContainer.innerHTML = '';
      cards.forEach((_, i) => {
        const dot = document.createElement('button');
        dot.className = 'why-dot' + (i === active ? ' is-active' : '');
        dot.setAttribute('role', 'tab');
        dot.setAttribute('aria-label', `Card ${i + 1}`);
        dot.addEventListener('click', () => goTo(i));
        dotsContainer.appendChild(dot);
      });
    }

    // ── Apply positions ─────────────────────────────────────────────────────
    function applyPositions() {
      cards.forEach((card, i) => {
        card.setAttribute('data-pos', getPos(i));
      });

      // dots
      const dots = dotsContainer.querySelectorAll('.why-dot');
      dots.forEach((d, i) => d.classList.toggle('is-active', i === active));

      // counter
      countCurrent.textContent = String(active + 1).padStart(2, '0');
    }

    // ── Navigate ────────────────────────────────────────────────────────────
    function goTo(index) {
      if (isAnimating || index === active) return;
      isAnimating = true;
      active = ((index % total) + total) % total;
      applyPositions();
      setTimeout(() => { isAnimating = false; }, 550);
    }

    function next() { goTo(active + 1); }
    function prev() { goTo(active - 1); }

    // ── Events ──────────────────────────────────────────────────────────────
    nextBtn.addEventListener('click', next);
    prevBtn.addEventListener('click', prev);

    // Click on side cards to navigate
    cards.forEach((card, i) => {
      card.addEventListener('click', () => {
        if (i !== active) goTo(i);
      });
    });

    // Touch / swipe support
    let touchStartX = 0;
    stage.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
    stage.addEventListener('touchend', e => {
      const dx = e.changedTouches[0].clientX - touchStartX;
      if (Math.abs(dx) > 40) dx < 0 ? next() : prev();
    }, { passive: true });

    // Keyboard support
    document.addEventListener('keydown', e => {
      const carousel = document.querySelector('.why-carousel');
      if (!carousel) return;
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft')  prev();
    });

    // ── Init ────────────────────────────────────────────────────────────────
    buildDots();
    applyPositions();
  }

  // Run after DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initWhyCarousel);
  } else {
    initWhyCarousel();
  }
})();
