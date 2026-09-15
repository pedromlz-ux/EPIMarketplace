/* Product image exploration: decorative pointer motion, not a 360° product viewer. */
(function initProductImageMotion() {
  const media = document.querySelector('[data-image-motion]');
  if (!media) return;

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const hoverCapable = window.matchMedia('(hover: hover) and (pointer: fine)');
  let frame = null;
  let nextX = 0;
  let nextY = 0;

  function reset() {
    nextX = 0;
    nextY = 0;
    media.style.setProperty('--image-rotate-x', '0deg');
    media.style.setProperty('--image-rotate-y', '0deg');
    media.style.setProperty('--image-scale', '1');
  }

  function updateMotion() {
    media.style.setProperty('--image-rotate-x', `${nextY * -4}deg`);
    media.style.setProperty('--image-rotate-y', `${nextX * 5}deg`);
    media.style.setProperty('--image-scale', '1.025');
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
