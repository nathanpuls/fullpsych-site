(() => {
  if (window.fullPsychMenuInitialized) return;
  window.fullPsychMenuInitialized = true;
  function setOpen(open) {
    document.querySelector('.mobile-menu-toggle')?.setAttribute('aria-expanded', String(open));
    document.querySelector('#main-navigation')?.classList.toggle('is-open', open);
  }
  document.addEventListener('click', (event) => {
    if (!(event.target instanceof Element)) return;
    const toggle = document.querySelector('.mobile-menu-toggle');
    const nav = document.querySelector('#main-navigation');
    if (toggle?.contains(event.target)) {
      setOpen(toggle.getAttribute('aria-expanded') !== 'true');
    } else if (!nav?.contains(event.target) || event.target.closest('a')) {
      setOpen(false);
    }
  });
  document.addEventListener('keydown', (event) => {
    const toggle = document.querySelector('.mobile-menu-toggle');
    if (event.key === 'Escape' && toggle?.getAttribute('aria-expanded') === 'true') {
      setOpen(false);
      toggle.focus();
    }
  });
  document.addEventListener('astro:page-load', () => setOpen(false));
  window.matchMedia('(max-width: 760px)').addEventListener('change', () => setOpen(false));
})();
