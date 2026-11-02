(() => {
  const navButton = document.querySelector('[data-menu]');
  const nav = document.querySelector('.navlinks');
  const languageButton = document.querySelector('.langBtn');
  const languageBox = document.querySelector('.lang');
  const toggle = (button, panel, open) => {
    panel?.classList.toggle('open', open);
    button?.setAttribute('aria-expanded', String(open));
  };
  navButton?.addEventListener('click', () => toggle(navButton, nav, !nav?.classList.contains('open')));
  languageButton?.addEventListener('click', () => toggle(languageButton, languageBox, !languageBox?.classList.contains('open')));
  document.addEventListener('click', event => {
    if (!languageBox?.contains(event.target)) toggle(languageButton, languageBox, false);
    if (!nav?.contains(event.target) && !navButton?.contains(event.target)) toggle(navButton, nav, false);
  });
  document.addEventListener('keydown', event => {
    if (event.key !== 'Escape') return;
    if (languageBox?.classList.contains('open')) { toggle(languageButton, languageBox, false); languageButton?.focus(); }
    if (nav?.classList.contains('open')) { toggle(navButton, nav, false); navButton?.focus(); }
  });
  const emit = (name, parameters) => {
    if (typeof window.gtag === 'function') window.gtag('event', name, {
      page_language: document.documentElement.lang,
      source_path: location.pathname,
      ...parameters
    });
  };
  document.addEventListener('click', event => {
    const link = event.target.closest('a[href]');
    if (!link) return;
    const destination = new URL(link.href, location.href);
    if (['www.cnfanshp.com', 'cnfanshp.com'].includes(destination.hostname)) {
      emit('outbound_click', {
        destination_host: destination.hostname,
        destination_path: destination.pathname,
        link_location: link.closest('header') ? 'header' : link.closest('footer') ? 'footer' : 'content',
        link_type: destination.pathname.startsWith('/AllProducts/') ? 'product' : destination.pathname === '/' ? 'catalog' : 'category',
        link_text: (link.textContent || '').trim().slice(0, 100)
      });
    } else if (link.hasAttribute('data-guide-link') && destination.origin === location.origin) {
      emit('article_open', { article_path: destination.pathname, article_title: (link.querySelector('h3')?.textContent || link.textContent || '').trim().slice(0, 100) });
    }
    if (link.closest('.langMenu, .languageLinks')) emit('language_change', { target_language: link.hreflang, destination_path: destination.pathname });
  });
  document.querySelectorAll('form[role="search"]').forEach(form => {
    form.addEventListener('submit', () => emit('site_search_submit', { search_location: location.pathname, destination_host: 'www.cnfanshp.com', search_language: document.documentElement.lang }));
  });
})();
