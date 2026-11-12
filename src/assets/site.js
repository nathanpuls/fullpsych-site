(() => {
  const header = document.querySelector('#site-header');
  const content = document.querySelector('#page-content');
  if (!header || !content || !window.fetch || !window.history?.pushState) return;

  const menuButton = header.querySelector('.mobile-menu-toggle');
  const nav = header.querySelector('#site-nav');
  function closeMenu() {
    menuButton?.setAttribute('aria-expanded', 'false');
    menuButton?.setAttribute('aria-label', 'Open menu');
    nav?.classList.remove('is-open');
  }
  menuButton?.addEventListener('click', () => {
    const open = menuButton.getAttribute('aria-expanded') !== 'true';
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    nav?.classList.toggle('is-open', open);
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeMenu();
  });
  document.addEventListener('click', (event) => {
    if (nav?.classList.contains('is-open') && !header.contains(event.target)) closeMenu();
    if (event.target.closest?.('#site-nav a')) closeMenu();
  });
  window.matchMedia('(min-width: 761px)').addEventListener('change', closeMenu);

  let requestId = 0;

  function markCurrent(pathname) {
    header.querySelectorAll('a[data-shell-link]').forEach((link) => {
      const current = new URL(link.href).pathname === pathname;
      link.toggleAttribute('aria-current', current);
      if (current) link.setAttribute('aria-current', 'page');
    });
  }

  async function navigate(url, fromHistory = false) {
    const ticket = ++requestId;
    let incoming;

    try {
      const response = await fetch(url.href, { headers: { Accept: 'text/html' } });
      if (!response.ok) throw new Error(`Navigation failed: ${response.status}`);
      const doc = new DOMParser().parseFromString(await response.text(), 'text/html');
      incoming = doc.querySelector('#page-content');
      if (!incoming) throw new Error('Page content was not found');
      if (ticket !== requestId) return;

      content.replaceChildren(...[...incoming.childNodes].map((node) => document.importNode(node, true)));
      document.title = doc.title;
      document.querySelector('meta[name="description"]')?.setAttribute('content', doc.querySelector('meta[name="description"]')?.content || '');
      if (!fromHistory) history.pushState({ shellNavigation: true }, '', url.href);
    } catch (error) {
      console.warn('[FullPsych navigation fallback]', error);
      location.assign(url.href);
      return;
    }

    markCurrent(url.pathname);
    window.scrollTo(0, 0);
    content.focus({ preventScroll: true });
  }

  document.addEventListener('click', (event) => {
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const link = event.target.closest?.('a[data-shell-link][href]');
    if (!link || link.target || link.hasAttribute('download')) return;
    const url = new URL(link.href, location.href);
    if (url.origin !== location.origin || url.href === location.href) return;
    event.preventDefault();
    navigate(url);
  });

  window.addEventListener('popstate', () => navigate(new URL(location.href), true));
})();
