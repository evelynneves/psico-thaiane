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
