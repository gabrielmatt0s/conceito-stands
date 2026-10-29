/* KX3: duas fotos no mesmo card apenas no desktop. */
(function () {
  var first = document.getElementById('portfolio-kx3-eletrolar');
  var second = document.getElementById('portfolio-kx3-eletrolar-2');
  if (!first || !second) return;
  var frame = first.querySelector('.portfolio__frame');
  var original = frame.querySelector('img');
  var track = document.createElement('div');
  track.className = 'portfolio__slides';
  track.tabIndex = 0;
  track.setAttribute('role', 'region');
  track.setAttribute('aria-label', 'Fotos da KX3 Acessórios');
  var other = second.querySelector('img').cloneNode(true);
  [original, other].forEach(function (img) { img.draggable = false; });
  var controls = document.createElement('div');
  controls.className = 'portfolio__slide-controls';
  controls.innerHTML = '<button type="button" aria-label="Foto anterior da KX3"></button><span aria-live="polite" aria-atomic="true">1 / 2</span><button type="button" aria-label="Próxima foto da KX3"></button>';
  var count = controls.querySelector('span');
  var mq = window.matchMedia('(min-width: 48rem)');
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  function current() { return Math.round(track.scrollLeft / (track.clientWidth || 1)); }
  function go(index) { track.scrollTo({left: ((index + 2) % 2) * track.clientWidth, behavior: reduced.matches ? 'instant' : 'smooth'}); }
  controls.children[0].addEventListener('click', function () { go(current() - 1); });
  controls.children[2].addEventListener('click', function () { go(current() + 1); });
  track.addEventListener('scroll', function () { count.textContent = (current() + 1) + ' / 2'; }, {passive:true});
  track.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') { e.preventDefault(); go(current() + (e.key === 'ArrowLeft' ? -1 : 1)); }
  });
  var start = null;
  track.addEventListener('pointerdown', function (e) {
    if (e.pointerType !== 'mouse' || e.button !== 0) return;
    start = e.clientX; track.setPointerCapture(e.pointerId);
  });
  track.addEventListener('pointerup', function (e) {
    if (start === null) return;
    var delta = e.clientX - start; start = null;
    if (Math.abs(delta) > 40) go(current() + (delta < 0 ? 1 : -1));
  });
  track.addEventListener('pointercancel', function () { start = null; });
  function sync() {
    if (mq.matches) {
      track.append(original, other); frame.append(track); frame.append(controls);
      second.classList.add('portfolio__item--grouped');
      track.scrollLeft = 0; count.textContent = '1 / 2';
    } else {
      frame.append(original); track.remove(); controls.remove();
      second.classList.remove('portfolio__item--grouped');
    }
  }
  mq.addEventListener('change', sync); sync();
  new ResizeObserver(function () { if (mq.matches) { track.scrollLeft = 0; count.textContent = '1 / 2'; } }).observe(frame);
})();

/* A altura de cada card vem da foto original, sem molduras ou recortes. */
(function () {
  var grid = document.querySelector('.portfolio__grid');
  if (!grid) return;
  var cards = Array.from(grid.querySelectorAll('.portfolio__item'));
  var mq = window.matchMedia('(min-width: 48rem)');
  var pending = false;
  function layout() {
    pending = false;
    if (!mq.matches) {
      grid.classList.remove('portfolio__grid--masonry');
      cards.forEach(function (card) { card.style.gridColumn = ''; card.style.gridRow = ''; });
      return;
    }
    grid.classList.add('portfolio__grid--masonry');
    var heights = [0, 0];
    cards.slice().sort(function (a, b) { return Number(getComputedStyle(a).order) - Number(getComputedStyle(b).order); }).forEach(function (card) {
      if (getComputedStyle(card).display === 'none') return;
      var column = heights[0] <= heights[1] ? 0 : 1;
      card.style.gridColumn = String(column + 1);
      var frame = card.querySelector('.portfolio__frame');
      var caption = card.querySelector('.portfolio__caption');
      var height = Math.ceil(frame.getBoundingClientRect().height + caption.getBoundingClientRect().height + 12 + 32);
      card.style.gridRow = (heights[column] + 1) + ' / span ' + Math.max(1, height);
      heights[column] += height;
    });
  }
  function schedule() { if (!pending) { pending = true; requestAnimationFrame(layout); } }
  grid.querySelectorAll('img').forEach(function (img) { img.addEventListener('load', schedule); });
  var observer = new ResizeObserver(schedule);
  observer.observe(grid);
  cards.forEach(function (card) { observer.observe(card.querySelector('.portfolio__frame')); observer.observe(card.querySelector('.portfolio__caption')); });
  mq.addEventListener('change', schedule);
  document.fonts.ready.then(schedule);
  schedule();
})();
