(() => {
  function setupMenu() {
    const toggle = document.querySelector('.mobile-menu-toggle');
    const nav = document.querySelector('#main-navigation');
    if (!toggle) return;
    toggle.onclick = () => {
      const open = toggle.getAttribute('aria-expanded') !== 'true';
      toggle.setAttribute('aria-expanded', String(open));
      nav?.classList.toggle('is-open', open);
    };
  }
  setupMenu();
  document.addEventListener('astro:page-load', setupMenu);
})();
