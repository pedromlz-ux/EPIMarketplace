export function initShootingStars(containerSelector) {
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
