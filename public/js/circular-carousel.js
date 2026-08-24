/**
 * Circular Carousel — Vanilla JS
 * Mantém a identidade visual do site (navy, laranja, branco)
 */

const WHY_ITEMS = [
  {
    id: '1',
    tag: '01',
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`,
    title: 'Produtos Certificados',
    description: 'Todos os equipamentos seguem as normas técnicas aplicáveis e possuem certificações exigidas, garantindo mais segurança e confiabilidade para cada operação.',
  },
  {
    id: '2',
    tag: '02',
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>`,
    title: 'Fabricação Própria e Seleção de Marcas',
    description: 'Produzimos parte da nossa linha e trabalhamos com fabricantes reconhecidos, oferecendo produtos de alta qualidade para aplicações profissionais.',
  },
  {
    id: '3',
    tag: '03',
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>`,
    title: 'Especialistas em Redes Elétricas',
    description: 'Soluções desenvolvidas para trabalhos em altura, linha viva e redes elétricas de alta e baixa tensão, atendendo concessionárias, empreiteiras e indústrias.',
  },
  {
    id: '4',
    tag: '04',
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
    title: 'Atendimento Técnico Especializado',
    description: 'Nossa equipe auxilia na escolha do equipamento ideal para cada aplicação, oferecendo suporte técnico e atendimento rápido para empresas em todo o Brasil.',
  },
];

const VISIBLE_COUNT = 5;
const RADIUS_X = 210;
const RADIUS_Y = 70;

function getItemPosition(index, activeIndex, total) {
  const offset = index - activeIndex;
  const half = Math.floor(VISIBLE_COUNT / 2);
  let adjustedOffset = offset;

  if (offset > half) adjustedOffset = offset - total;
  if (offset < -half) adjustedOffset = offset + total;

  if (Math.abs(adjustedOffset) > half * 2) return null;

  const angle = (adjustedOffset / VISIBLE_COUNT) * Math.PI;
  const x = Math.sin(angle) * RADIUS_X;
  const y = -Math.cos(angle) * RADIUS_Y;

  const distance = Math.abs(adjustedOffset);
  const maxDistance = half + 1;
  const scale = Math.max(0, 1 - (distance / maxDistance) * 0.28);
  const opacity = Math.max(0.25, 1 - (distance / maxDistance) * 0.72);
  const zIndex = VISIBLE_COUNT - distance;

  return { x, y, scale, opacity, zIndex, adjustedOffset };
}

class CircularCarousel {
  constructor(container, items, options = {}) {
    this.container = container;
    this.items = items;
    this.total = items.length;
    this.activeIndex = 0;
    this.isHovered = false;
    this.autoPlayInterval = options.autoPlayInterval || 4200;
    this.timer = null;
    this.cardEls = [];

    this.build();
    this.bindEvents();
    this.startAutoplay();
  }

  build() {
    this.container.innerHTML = `
      <div class="cc-track" role="listbox" aria-label="O que nos torna referência">
        <div class="cc-center-info" aria-hidden="true">
          <span class="cc-counter-num">01</span>
          <span class="cc-counter-total">de ${String(this.total).padStart(2, '0')}</span>
        </div>
      </div>

      <div class="cc-detail-panel"></div>

      <div class="cc-controls" role="group" aria-label="Controles do carrossel">
        <button class="cc-btn cc-btn--prev" aria-label="Item anterior">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 18 9 12 15 6"/></svg>
        </button>

        <div class="cc-dots" role="tablist"></div>

        <button class="cc-btn cc-btn--next" aria-label="Próximo item">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>
        </button>
      </div>
    `;

    this.trackEl = this.container.querySelector('.cc-track');
    this.centerNum = this.container.querySelector('.cc-counter-num');
    this.detailPanel = this.container.querySelector('.cc-detail-panel');
    this.dotsEl = this.container.querySelector('.cc-dots');
    this.btnPrev = this.container.querySelector('.cc-btn--prev');
    this.btnNext = this.container.querySelector('.cc-btn--next');

    // Build cards
    this.items.forEach((item, i) => {
      const card = document.createElement('button');
      card.className = 'cc-card';
      card.setAttribute('role', 'option');
      card.setAttribute('aria-label', item.title);
      card.dataset.index = i;
      card.innerHTML = `
        <span class="cc-card__tag">${item.tag}</span>
        <div class="cc-card__icon">${item.icon}</div>
        <h3 class="cc-card__title">${item.title}</h3>
      `;
      card.addEventListener('click', () => this.goTo(i));
      this.trackEl.appendChild(card);
      this.cardEls.push(card);
    });

    // Build dots
    this.items.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.className = 'cc-dot';
      dot.setAttribute('role', 'tab');
      dot.setAttribute('aria-label', `Item ${i + 1}`);
      dot.addEventListener('click', () => this.goTo(i));
      this.dotsEl.appendChild(dot);
    });

    this.updatePositions();
    this.updateDetail();
    this.updateDots();
  }

  updatePositions() {
    this.cardEls.forEach((card, i) => {
      const pos = getItemPosition(i, this.activeIndex, this.total);
      if (!pos) {
        card.style.opacity = '0';
        card.style.pointerEvents = 'none';
        card.style.visibility = 'hidden';
        return;
      }

          card.style.visibility = 'visible';
      card.style.pointerEvents = 'auto';
      card.style.transform = `translate(calc(-50% + ${pos.x}px), calc(-50% + ${pos.y}px)) scale(${pos.scale})`;
      card.style.opacity = pos.opacity;
      card.style.zIndex = pos.zIndex + 2; // offset acima do contador
      card.classList.toggle('cc-card--active', i === this.activeIndex);
      card.setAttribute('aria-selected', i === this.activeIndex);
    });

    // Update counter
    this.centerNum.textContent = String(this.activeIndex + 1).padStart(2, '0');
  }

  updateDetail() {
    const item = this.items[this.activeIndex];

    // Fade out then in
    this.detailPanel.style.opacity = '0';
    this.detailPanel.style.transform = 'translateY(10px)';

    setTimeout(() => {
      this.detailPanel.innerHTML = `
        <div class="cc-detail__tag">${item.tag}</div>
        <h3 class="cc-detail__title">${item.title}</h3>
        <p class="cc-detail__desc">${item.description}</p>
      `;
      this.detailPanel.style.opacity = '1';
      this.detailPanel.style.transform = 'translateY(0)';
    }, 120);
  }

  updateDots() {
    this.dotsEl.querySelectorAll('.cc-dot').forEach((dot, i) => {
      dot.classList.toggle('cc-dot--active', i === this.activeIndex);
      dot.setAttribute('aria-selected', i === this.activeIndex);
    });
  }

  goTo(index) {
    this.activeIndex = ((index % this.total) + this.total) % this.total;
    this.updatePositions();
    this.updateDetail();
    this.updateDots();
  }

  next() { this.goTo(this.activeIndex + 1); }
  prev() { this.goTo(this.activeIndex - 1); }

  startAutoplay() {
    this.stopAutoplay();
    this.timer = setInterval(() => {
      if (!this.isHovered) this.next();
    }, this.autoPlayInterval);
  }

  stopAutoplay() {
    if (this.timer) clearInterval(this.timer);
  }

  bindEvents() {
    this.btnPrev.addEventListener('click', () => this.prev());
    this.btnNext.addEventListener('click', () => this.next());

    this.container.addEventListener('mouseenter', () => { this.isHovered = true; });
    this.container.addEventListener('mouseleave', () => { this.isHovered = false; });

    this.container.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') this.prev();
      if (e.key === 'ArrowRight') this.next();
    });
  }
}

// Init on DOM ready
function initCircularCarousel() {
  const mount = document.getElementById('why-carousel-mount');
  if (!mount) return;
  new CircularCarousel(mount, WHY_ITEMS);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initCircularCarousel);
} else {
  initCircularCarousel();
}
