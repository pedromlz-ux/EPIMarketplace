/* Product image exploration: decorative 3D pointer motion, not a 360° product viewer. */
(function initProductImageMotion() {
  const media = document.querySelector('[data-image-motion]');
  if (!media) return;

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const hoverCapable = window.matchMedia('(hover: hover) and (pointer: fine)');
  let frame = null;
  let nextX = 0;
  let nextY = 0;

  function reset() {
    if (frame) {
      cancelAnimationFrame(frame);
      frame = null;
    }
    nextX = 0;
    nextY = 0;
    media.style.setProperty('--image-rotate-x', '0deg');
    media.style.setProperty('--image-rotate-y', '0deg');
    media.style.setProperty('--image-scale', '1');
    media.style.setProperty('--image-translate-x', '0px');
    media.style.setProperty('--image-translate-y', '0px');
    media.style.setProperty('--image-shadow-x', '0px');
    media.style.setProperty('--image-shadow-y', '12px');
    media.style.setProperty('--image-backdrop-x', '0px');
    media.style.setProperty('--image-backdrop-y', '0px');
    media.classList.remove('is-exploring');
  }

  function updateMotion() {
    media.style.setProperty('--image-rotate-x', `${nextY * -9}deg`);
    media.style.setProperty('--image-rotate-y', `${nextX * 11}deg`);
    media.style.setProperty('--image-scale', '1.045');
    media.style.setProperty('--image-translate-x', `${nextX * 12}px`);
    media.style.setProperty('--image-translate-y', `${nextY * 10}px`);
    media.style.setProperty('--image-shadow-x', `${nextX * -14}px`);
    media.style.setProperty('--image-shadow-y', `${18 - nextY * 8}px`);
    media.style.setProperty('--image-backdrop-x', `${nextX * -8}px`);
    media.style.setProperty('--image-backdrop-y', `${nextY * -8}px`);
    media.classList.add('is-exploring');
    frame = null;
  }

  function onPointerMove(event) {
    if (reduceMotion.matches || !hoverCapable.matches) return;
    const bounds = media.getBoundingClientRect();
    nextX = ((event.clientX - bounds.left) / bounds.width - 0.5) * 2;
    nextY = ((event.clientY - bounds.top) / bounds.height - 0.5) * 2;
    if (!frame) frame = requestAnimationFrame(updateMotion);
  }

  media.addEventListener('pointermove', onPointerMove);
  media.addEventListener('pointerleave', reset);
  reduceMotion.addEventListener('change', reset);
  hoverCapable.addEventListener('change', reset);
  reset();
})();
