/* ============================================================
   EPI MARKETPLACE — MAIN.JS
   UI/UX PRO MAX: Meaningful interactivity layer
   - Intersection Observer reveals (spatial continuity)
   - Navbar: glassy scroll state + aria-expanded
   - Mobile menu: accessible toggle
   - Filter system: homepage product grid
   - FAQ: enhanced <details> state
   - Stat counter animation
   ============================================================ */

'use strict';

/* ============================================================
   1. NAVBAR — scroll state + mobile menu
============================================================ */
(function initNavbar() {
  const navbar   = document.getElementById('navbar');
  const burger   = document.getElementById('burger-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  if (!navbar) return;

  // Scroll: glassmorphism state
  const onScroll = () => {
    const scrolled = window.scrollY > 60;
    navbar.classList.toggle('scrolled', scrolled);
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // init state

  // Mobile menu toggle
  if (burger && mobileMenu) {
    burger.addEventListener('click', () => {
      const isOpen = burger.getAttribute('aria-expanded') === 'true';
      burger.setAttribute('aria-expanded', String(!isOpen));
      mobileMenu.classList.toggle('open', !isOpen);
      mobileMenu.setAttribute('aria-hidden', String(isOpen));

      // Animate burger → X
      burger.classList.toggle('is-open', !isOpen);
    });

    // Close menu on link click
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        burger.setAttribute('aria-expanded', 'false');
        mobileMenu.classList.remove('open');
        mobileMenu.setAttribute('aria-hidden', 'true');
        burger.classList.remove('is-open');
      });
    });

    // Close on Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileMenu.classList.contains('open')) {
        burger.click();
        burger.focus();
      }
    });
  }
})();

/* ============================================================
   2. REVEAL ANIMATIONS — IntersectionObserver
   Spatial continuity: elements reveal in reading order
============================================================ */
(function initReveal() {
  const reveals = document.querySelectorAll('.reveal');
  if (!reveals.length) return;

  // Respect prefers-reduced-motion
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) {
    reveals.forEach(el => el.classList.add('visible'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  reveals.forEach(el => observer.observe(el));
})();

/* ============================================================
   3. HOMEPAGE PRODUCT FILTER
   Filter cards by data-category without page reload
============================================================ */
(function initProductFilter() {
  const grid    = document.getElementById('products-grid');
  const filters = document.querySelectorAll('.filter-btn');
  if (!grid || !filters.length) return;

  filters.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.filter;

      // Update active state + ARIA
      filters.forEach(f => {
        f.classList.remove('active');
        f.removeAttribute('aria-pressed');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-pressed', 'true');

      // Filter cards
      const cards = grid.querySelectorAll('.product-card');
      let visibleCount = 0;

      cards.forEach(card => {
        const cat  = card.dataset.category || '';
        const show = target === 'all' || cat === target;

        card.style.transition = 'opacity 200ms ease-out, transform 200ms ease-out';

        if (show) {
          card.style.display   = '';
          card.style.opacity   = '0';
          card.style.transform = 'translateY(12px)';
          requestAnimationFrame(() => {
            card.style.opacity   = '1';
            card.style.transform = 'translateY(0)';
          });
          visibleCount++;
        } else {
          card.style.opacity   = '0';
          card.style.transform = 'translateY(8px)';
          setTimeout(() => { card.style.display = 'none'; }, 180);
        }
      });

      // Announce to screen reader
      const announcer = document.getElementById('filter-announcer');
      if (announcer) {
        announcer.textContent = `${visibleCount} produto${visibleCount !== 1 ? 's' : ''} encontrado${visibleCount !== 1 ? 's' : ''}.`;
      }
    });
  });

  // Create screen reader live region
  const announcer = document.createElement('div');
  announcer.id = 'filter-announcer';
  announcer.setAttribute('aria-live', 'polite');
  announcer.setAttribute('aria-atomic', 'true');
  announcer.className = 'sr-only';
  document.body.appendChild(announcer);
})();

/* ============================================================
   4. HERO STAT COUNTER ANIMATION
   Counts up on first view — creates delight + trust
============================================================ */
(function initCounters() {
  const stats = document.querySelectorAll('.hero__stat-num');
  if (!stats.length) return;

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const animateCount = (el) => {
    const rawText = el.textContent.trim();
    const numMatch = rawText.match(/(\d+)/);
    if (!numMatch) return;

    const target = parseInt(numMatch[1], 10);
    const prefix = rawText.slice(0, numMatch.index);
    const suffix = rawText.slice(numMatch.index + numMatch[0].length);

    if (prefersReduced) return;

    let start   = null;
    const dur   = 1200;

    const step = (ts) => {
      if (!start) start = ts;
      const prog   = Math.min((ts - start) / dur, 1);
      const eased  = 1 - Math.pow(1 - prog, 3); // ease-out-cubic
      const current = Math.round(eased * target);
      el.textContent = prefix + current + suffix;
      if (prog < 1) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCount(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  stats.forEach(el => observer.observe(el));
})();

/* ============================================================
   5. SMOOTH ANCHOR SCROLL
   Accounts for fixed navbar height
============================================================ */
(function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const id = link.getAttribute('href').slice(1);
      const target = document.getElementById(id);
      if (!target) return;
      e.preventDefault();

      const navH = document.getElementById('navbar')?.offsetHeight ?? 72;
      const y    = target.getBoundingClientRect().top + window.scrollY - navH - 16;

      window.scrollTo({ top: y, behavior: 'smooth' });

      // Update URL without jumping
      history.pushState(null, '', '#' + id);
    });
  });
})();

/* ============================================================
   6. HERO BG HEX ANIMATION — CSS variables approach
   Creates living, breathing background without canvas overhead
============================================================ */
(function initHeroBg() {
  const orb1 = document.querySelector('.hero__gradient-orb--1');
  const orb2 = document.querySelector('.hero__gradient-orb--2');
  if (!orb1 || !orb2) return;

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) return;

  let t = 0;
  const animate = () => {
    t += 0.003;
    const x1 = 50 + Math.sin(t * 0.7) * 15;
    const y1 = 35 + Math.cos(t * 0.5) * 12;
    const x2 = 80 + Math.cos(t * 0.4) * 12;
    const y2 = 65 + Math.sin(t * 0.6) * 10;

    orb1.style.left = x1 + '%';
    orb1.style.top  = y1 + '%';
    orb2.style.left = x2 + '%';
    orb2.style.top  = y2 + '%';

    requestAnimationFrame(animate);
  };

  // Only animate when hero is in view
  const hero = document.querySelector('.hero');
  if (!hero) return;

  const io = new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting) {
      requestAnimationFrame(animate);
    }
  }, { threshold: 0 });

  io.observe(hero);
})();

/* ============================================================
   7. TRUST BAR IN-VIEW TRIGGER
============================================================ */
(function initTrustBar() {
  const bar = document.querySelector('.trust-bar');
  if (!bar) return;

  const items = bar.querySelectorAll('.trust-bar__item');
  items.forEach((item, i) => {
    item.style.setProperty('--i', String(i + 1));
  });

  const io = new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting) {
      bar.classList.add('in-view');
      io.unobserve(bar);
    }
  }, { threshold: 0.3 });

  io.observe(bar);
})();

/* ============================================================
   8. EXTERNAL LINK ATTRIBUTION — analytics hook
   Fires console event (replace with GA/GTM later)
============================================================ */
(function initLinkTracking() {
  document.addEventListener('click', (e) => {
    const link = e.target.closest('a[href]');
    if (!link) return;

    const href = link.getAttribute('href');
    if (!href) return;

    // Track external links
    if (href.startsWith('http') && !href.includes('epimarketplace.com')) {
      const label = link.id || link.textContent.trim().slice(0, 40);
      // Replace with: gtag('event', 'click', { ...})
      console.debug('[EPI] external link:', label, href);
    }

    // Track WhatsApp clicks
    if (href.startsWith('https://wa.me')) {
      console.debug('[EPI] whatsapp click', link.id || '');
    }
  });
})();

/* ============================================================
   7. ANIMATED HERO (Word Loop)
============================================================ */
(function initAnimatedHero() {
  const words = document.querySelectorAll('.hero-animated__word');
  if (!words.length) return;

  let currentIndex = 0;
  const intervalTime = 2500;

  setInterval(() => {
    const prevIndex = currentIndex;
    currentIndex = (currentIndex + 1) % words.length;

    const prevWord = words[prevIndex];
    const nextWord = words[currentIndex];

    prevWord.classList.remove('active');
    prevWord.classList.add('exit');

    setTimeout(() => {
      prevWord.classList.remove('exit');
    }, 600);

    nextWord.classList.add('active');
  }, intervalTime);
})();

/* ============================================================
   8. TYPEWRITER EFFECT (CTA)
============================================================ */
(function initTypewriterEffect() {
  const container = document.getElementById('typewriter-text');
  if (!container) return;

  const text = container.getAttribute('data-text') || "Seu próximo EPI com qualidade de fábrica está aqui.";
  container.innerHTML = ''; 

  let i = 0;
  const speed = 60; 

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        observer.unobserve(container);
        typeWriter();
      }
    });
  }, { threshold: 0.5 });

  observer.observe(container);

  function typeWriter() {
    if (i < text.length) {
      container.innerHTML += text.charAt(i);
      i++;
      setTimeout(typeWriter, speed);
    } else {
      container.classList.add('finished');
    }
  }
})();

/* ============================================================
   LIGHTBOX MODAL
============================================================ */
function openLightbox(element) {
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  if (!lightbox || !lightboxImg) return;

  const img = element.querySelector('img');
  if (img) {
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
  }
  lightbox.removeAttribute('hidden');
}

function closeLightbox(event) {
  if (event.target.classList.contains('lightbox') || event.target.classList.contains('lightbox__close')) {
    const lightbox = document.getElementById('lightbox');
    if (lightbox) {
      lightbox.setAttribute('hidden', 'true');
    }
  }
}

// Export to global scope
window.openLightbox = openLightbox;
window.closeLightbox = closeLightbox;
