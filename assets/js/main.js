const navToggle = document.querySelector('.nav-toggle');
const mainNav = document.querySelector('.main-nav');
const header = document.querySelector('[data-header]');
const currentYear = document.querySelector('[data-current-year]');

if (currentYear) {
  currentYear.textContent = new Date().getFullYear();
}

if (navToggle && mainNav) {
  navToggle.addEventListener('click', () => {
    const isOpen = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!isOpen));
    mainNav.classList.toggle('is-open', !isOpen);
  });

  mainNav.addEventListener('click', (event) => {
    if (event.target instanceof HTMLAnchorElement) {
      navToggle.setAttribute('aria-expanded', 'false');
      mainNav.classList.remove('is-open');
    }
  });
}

if (header) {
  const updateHeader = () => {
    header.classList.toggle('is-scrolled', window.scrollY > 12);
  };

  updateHeader();
  window.addEventListener('scroll', updateHeader, { passive: true });
}

// Mobile gallery carousel initialization
function initGalleryCarousel() {
  const gallery = document.querySelector('.gallery');
  if (!gallery) return;
  const mobile = window.innerWidth <= 620;

  if (mobile && !gallery.classList.contains('carousel-initialized')) {
    gallery.classList.add('carousel', 'carousel-initialized');

    const items = Array.from(gallery.querySelectorAll('.gallery-item'));
    const track = document.createElement('div');
    track.className = 'carousel-track';

    items.forEach((item) => {
      item.classList.add('carousel-item');
      track.appendChild(item);
    });

    gallery.appendChild(track);

    const controls = document.createElement('div');
    controls.className = 'carousel-controls';

    const prev = document.createElement('button');
    prev.className = 'carousel-button';
    prev.setAttribute('aria-label', 'Anterior');
    prev.innerHTML = '‹';

    const next = document.createElement('button');
    next.className = 'carousel-button';
    next.setAttribute('aria-label', 'Próximo');
    next.innerHTML = '›';

    controls.appendChild(prev);
    controls.appendChild(next);
    gallery.appendChild(controls);

    const dots = document.createElement('div');
    dots.className = 'carousel-dots';
    items.forEach((_, i) => {
      const d = document.createElement('button');
      d.className = 'carousel-dot';
      d.setAttribute('aria-label', `Ir para imagem ${i + 1}`);
      if (i === 0) d.classList.add('is-active');
      dots.appendChild(d);
    });
    gallery.appendChild(dots);

    let index = 0;

    const update = () => {
      track.style.transform = `translateX(-${index * 100}%)`;
      const dotButtons = dots.querySelectorAll('.carousel-dot');
      dotButtons.forEach((d, i) => d.classList.toggle('is-active', i === index));
    };

    prev.addEventListener('click', () => {
      index = Math.max(0, index - 1);
      update();
    });

    next.addEventListener('click', () => {
      index = Math.min(items.length - 1, index + 1);
      update();
    });

    dots.addEventListener('click', (e) => {
      if (e.target && e.target.classList.contains('carousel-dot')) {
        index = Array.from(dots.children).indexOf(e.target);
        update();
      }
    });

    // touch support
    let startX = 0;
    let delta = 0;
    let dragging = false;

    track.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
      dragging = true;
      track.style.transition = 'none';
    });

    track.addEventListener('touchmove', (e) => {
      if (!dragging) return;
      delta = e.touches[0].clientX - startX;
      track.style.transform = `translateX(${ -index * 100 + (delta / gallery.clientWidth) * 100 }%)`;
    });

    track.addEventListener('touchend', () => {
      dragging = false;
      track.style.transition = '';
      if (Math.abs(delta) > 30) {
        if (delta > 0) index = Math.max(0, index - 1);
        else index = Math.min(items.length - 1, index + 1);
      }
      delta = 0;
      update();
    });

    update();
  } else if (!mobile && gallery.classList.contains('carousel-initialized')) {
    // destroy carousel and restore original structure
    const track = gallery.querySelector('.carousel-track');
    if (track) {
      while (track.firstChild) gallery.appendChild(track.firstChild);
      track.remove();
    }
    const controls = gallery.querySelector('.carousel-controls');
    if (controls) controls.remove();
    const dots = gallery.querySelector('.carousel-dots');
    if (dots) dots.remove();
    gallery.classList.remove('carousel', 'carousel-initialized');
    gallery.querySelectorAll('.gallery-item').forEach((item) => item.classList.remove('carousel-item'));
  }
}

let _resizeTimer;
window.addEventListener('resize', () => {
  clearTimeout(_resizeTimer);
  _resizeTimer = setTimeout(initGalleryCarousel, 150);
});

document.addEventListener('DOMContentLoaded', initGalleryCarousel);
