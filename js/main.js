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
  const navbar     = document.getElementById('navbar');
  const burger     = document.getElementById('burger-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const overlay    = document.getElementById('nav-overlay');
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
    const openMenu = () => {
      burger.setAttribute('aria-expanded', 'true');
      mobileMenu.classList.add('open');
      mobileMenu.setAttribute('aria-hidden', 'false');
      burger.classList.add('is-open');
      if (overlay) { overlay.style.display = 'block'; requestAnimationFrame(() => overlay.classList.add('open')); }
      document.body.style.overflow = 'hidden'; // prevent scroll
      // Focus primeiro link
      const firstLink = mobileMenu.querySelector('a');
      if (firstLink) setTimeout(() => firstLink.focus(), 300);
    };

    const closeMenu = () => {
      burger.setAttribute('aria-expanded', 'false');
      mobileMenu.classList.remove('open');
      mobileMenu.setAttribute('aria-hidden', 'true');
      burger.classList.remove('is-open');
      if (overlay) {
        overlay.classList.remove('open');
        setTimeout(() => { overlay.style.display = 'none'; }, 300);
      }
      document.body.style.overflow = '';
    };

    burger.addEventListener('click', () => {
      const isOpen = burger.getAttribute('aria-expanded') === 'true';
      isOpen ? closeMenu() : openMenu();
    });

    // Close menu on overlay click
    if (overlay) {
      overlay.addEventListener('click', closeMenu);
    }

    // Close menu on link click
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', closeMenu);
    });

    // Close on Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileMenu.classList.contains('open')) {
        closeMenu();
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
  const lightboxTitle = document.getElementById('lightbox-title');
  const lightboxCategory = document.getElementById('lightbox-category');
  if (!lightbox || !lightboxImg) return;

  const img = element.querySelector('img');
  if (img) {
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
  }
  
  if (lightboxTitle) {
    const titleEl = element.querySelector('.product-card__name');
    lightboxTitle.textContent = titleEl ? titleEl.textContent : '';
  }
  
  if (lightboxCategory) {
    const categoryEl = element.querySelector('.product-card__category');
    lightboxCategory.textContent = categoryEl ? categoryEl.textContent : '';
  }
  
  lightbox.removeAttribute('hidden');
}

function closeLightbox(event) {
  const e = event || window.event;
  if (!e || e.target.classList.contains('lightbox') || e.target.classList.contains('lightbox__backdrop') || e.target.closest('.lightbox__close')) {
    const lightbox = document.getElementById('lightbox');
    if (lightbox) {
      lightbox.setAttribute('hidden', 'true');
    }
  }
}

// Export to global scope
window.openLightbox = openLightbox;
window.closeLightbox = closeLightbox;

// Pseudo-3D Tilt effect on Lightbox Image
(function initLightboxTilt() {
  const lightbox = document.getElementById('lightbox');
  const img = document.getElementById('lightbox-img');
  if (!lightbox || !img) return;

  lightbox.addEventListener('mousemove', (e) => {
    if (lightbox.hasAttribute('hidden')) return;
    
    const rect = img.getBoundingClientRect();
    const x = e.clientX - rect.left - (rect.width / 2);
    const y = e.clientY - rect.top - (rect.height / 2);
    
    // Normalize values between -1 and 1
    const normX = x / (rect.width / 2);
    const normY = y / (rect.height / 2);
    
    const maxTilt = 15; // Max degree tilt
    const tiltX = -normY * maxTilt;
    const tiltY = normX * maxTilt;
    
    img.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale(1.02)`;
    img.style.transition = 'transform 0.1s ease-out';
  });

  lightbox.addEventListener('mouseleave', () => {
    img.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
    img.style.transition = 'transform 0.5s ease-out';
  });
})();


/* ============================================================
   8. FOOTER SCROLL REVEAL (Intersection Observer)
============================================================ */
(function initFooterReveal() {
  const footerColumns = document.querySelectorAll('.footer__grid > div');
  if (footerColumns.length === 0) return;

  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1 // triggers when 10% of the element is visible
  };

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        obs.unobserve(entry.target); // Only animate once (viewport={{ once: true }})
      }
    });
  }, observerOptions);

  footerColumns.forEach(col => {
    observer.observe(col);
  });
})();
function initShootingStars(containerSelector) {
  const container = document.querySelector(containerSelector);
  if (!container) return;

  // Set container styles
  container.style.position = 'relative';
  container.style.overflow = 'hidden';
  
  // Ensure children are above the stars
  Array.from(container.children).forEach(child => {
    if (child.style) {
      child.style.position = 'relative';
      child.style.zIndex = '10';
    }
  });

  // Create a wrapper for the effect
  const wrapper = document.createElement('div');
  wrapper.className = 'shooting-stars-wrapper';
  wrapper.setAttribute('aria-hidden', 'true');
  Object.assign(wrapper.style, {
    position: 'absolute',
    inset: '0',
    zIndex: '0',
    pointerEvents: 'none'
  });

  // 1. Grid Background
  const grid = document.createElement('div');
  Object.assign(grid.style, {
    position: 'absolute',
    inset: '0',
    opacity: '0.15',
    backgroundImage: `
      linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px),
      linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)
    `,
    backgroundSize: '44px 44px',
    zIndex: '-3'
  });
  wrapper.appendChild(grid);

  // Math helper
  function seeded(index, salt) {
    const value = Math.sin(index * 91.73 + salt * 37.11) * 10000;
    return value - Math.floor(value);
  }

  // 2. Static Stars
  const starCount = 12; // fewer stars for subtlety
  for (let i = 0; i < starCount; i++) {
    const star = document.createElement('span');
    const size = 1 + seeded(i, 3) * 1.5; // slightly smaller
    const opacity = 0.08 + seeded(i, 4) * 0.2; // much lower opacity
    
    Object.assign(star.style, {
      position: 'absolute',
      left: `${seeded(i, 1) * 100}%`,
      top: `${seeded(i, 2) * 100}%`,
      width: `${size}px`,
      height: `${size}px`,
      backgroundColor: '#fff',
      borderRadius: '50%',
      boxShadow: '0 0 8px rgba(255,255,255,0.3)',
      opacity: '0',
      animation: `starPulse ${(2.4 + seeded(i, 6) * 3.2) * 2}s ease-in-out infinite` // 2x slower
    });
    star.style.animationDelay = `${seeded(i, 5) * 4}s`;
    
    // Using CSS custom properties to pass dynamic values to keyframes
    star.style.setProperty('--star-op', opacity);
    wrapper.appendChild(star);
  }

  // 3. Shooting Stars
  const shootingStarCount = 2; // only 2 lines at a time
  const horizontalLines = [1, 2, 3, 4];
  const verticalLines = [1, 2, 3, 4, 5, 6, 7];

  for (let i = 0; i < shootingStarCount; i++) {
    const axis = i % 3 === 1 ? 'vertical' : 'horizontal';
    const direction = i % 2 === 0 ? 1 : -1;
    const lanes = axis === 'horizontal' ? horizontalLines : verticalLines;
    const line = lanes[i % lanes.length];
    
    const start = direction === 1 ? '-20%' : '120%';
    const end = direction === 1 ? '120%' : '-20%';
    const length = 60 + seeded(i, 15) * 80; // shorter trails
    const duration = (2.5 + seeded(i, 17) * 2) * 2; // much slower (4-9 seconds)
    const delay = seeded(i, 16) * 10 + i * 2; // more spacing between shoots
    
    const runner = document.createElement('span');
    const isHorizontal = axis === 'horizontal';
    const linePosition = `calc(44px * ${line})`;
    const gradientDirection = isHorizontal ? (direction === 1 ? '90deg' : '270deg') : (direction === 1 ? '180deg' : '0deg');
    
    Object.assign(runner.style, {
      position: 'absolute',
      borderRadius: '50%',
      // softer gradient
      background: `linear-gradient(${gradientDirection}, transparent 0%, rgba(255,255,255,0.05) 18%, rgba(255,255,255,0.4) 52%, rgba(255,255,255,0.5) 58%, transparent 100%)`,
      boxShadow: '0 0 12px rgba(255,255,255,0.15)',
      left: isHorizontal ? start : linePosition,
      top: isHorizontal ? linePosition : start,
      width: isHorizontal ? `${length}px` : '1px',
      height: isHorizontal ? '1px' : `${length}px`,
      opacity: '0',
      transform: isHorizontal ? 'scaleY(1) scaleX(0.35)' : 'scaleX(1) scaleY(0.35)',
      animation: `shoot_${axis} ${duration}s ease-out infinite`
    });
    
    runner.style.animationDelay = `${delay}s`;
    // Pass properties
    runner.style.setProperty('--shoot-start', start);
    runner.style.setProperty('--shoot-end', end);
    
    wrapper.appendChild(runner);
  }

  container.appendChild(wrapper);

  // Add styles for keyframes once
  if (!document.getElementById('shooting-stars-styles')) {
    const style = document.createElement('style');
    style.id = 'shooting-stars-styles';
    style.textContent = `
      @keyframes starPulse {
        0%, 100% { opacity: calc(var(--star-op) * 0.5); transform: scale(0.85); }
        50% { opacity: var(--star-op); transform: scale(1.16); }
      }
      @keyframes shoot_horizontal {
        0% { left: var(--shoot-start); opacity: 0; transform: scaleX(0.35); }
        15% { opacity: 1; transform: scaleX(1); }
        50% { opacity: 1; transform: scaleX(1.08); }
        100% { left: var(--shoot-end); opacity: 0; transform: scaleX(0.8); }
      }
      @keyframes shoot_vertical {
        0% { top: var(--shoot-start); opacity: 0; transform: scaleY(0.35); }
        15% { opacity: 1; transform: scaleY(1); }
        50% { opacity: 1; transform: scaleY(1.08); }
        100% { top: var(--shoot-end); opacity: 0; transform: scaleY(0.8); }
      }
    `;
    document.head.appendChild(style);
  }
}

initShootingStars('.ml-cta-box');
