(function() {
  document.querySelectorAll('.slider').forEach(initSlider);

  function initSlider(slider) {
    const track  = slider.querySelector('.track');
    const slides = Array.from(track.children);
    const prevBtn = slider.querySelector('.arrow.prev');
    const nextBtn = slider.querySelector('.arrow.next');
    const dotsBox = slider.querySelector('.indicators');

    if (!slides.length) return;

    // Mostrar controles
    prevBtn.hidden = nextBtn.hidden = dotsBox.hidden = false;

    // Generar dots
    dotsBox.innerHTML = '';
    slides.forEach((_, i) => {
      const b = document.createElement('button');
      b.type = 'button';
      b.setAttribute('aria-label', `Ir a la imagen ${i+1}`);
      b.addEventListener('click', () => {
        track.scrollTo({ left: slides[i].offsetLeft, behavior: 'smooth' });
      });
      dotsBox.appendChild(b);
    });

    let index = 0;
    const updateUI = () => {
      const left = track.scrollLeft;
      const widths = slides.map(s => s.offsetLeft);
      index = widths.reduce((best, pos, i) =>
        Math.abs(pos - left) < Math.abs(widths[best] - left) ? i : best, 0);

      dotsBox.querySelectorAll('button').forEach((b, i) => {
        b.setAttribute('aria-current', i === index ? 'true' : 'false');
      });
    };

    prevBtn.addEventListener('click', () => {
      const i = Math.max(0, index - 1);
      track.scrollTo({ left: slides[i].offsetLeft, behavior: 'smooth' });
    });
    nextBtn.addEventListener('click', () => {
      const i = Math.min(slides.length - 1, index + 1);
      track.scrollTo({ left: slides[i].offsetLeft, behavior: 'smooth' });
    });

    track.addEventListener('scroll', () => {
      clearTimeout(track._t);
      track._t = setTimeout(updateUI, 60);
    });

    // Teclado (← →) por slider
    slider.tabIndex = 0;
    slider.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') prevBtn.click();
      if (e.key === 'ArrowRight') nextBtn.click();
    });

    // Init
    updateUI();
  }
})();
