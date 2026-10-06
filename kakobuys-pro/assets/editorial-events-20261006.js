/* First-party navigation measurements; reuse the existing GA4 configuration. */
(() => {
  const send = (name, params) => {
    if (typeof window.gtag === 'function') {
      window.gtag('event', name, {
        page_language: document.documentElement.lang || 'en',
        transport_type: 'beacon',
        ...params
      });
    }
  };
  // Capture on window so the existing static-navigation handler does not suppress these events.
  window.addEventListener('click', event => {
    const link = event.target.closest && event.target.closest('a[href]');
    if (!link) return;
    const url = new URL(link.href, location.href);
    if (/^(www\.)?cnfanshp\.com$/.test(url.hostname)) {
      send('main_catalog_click', {
        destination_path: url.pathname,
        link_location: link.closest('header') ? 'header' : link.closest('footer') ? 'footer' : 'content'
      });
    } else if (url.origin === location.origin && link.closest('.language-menu')) {
      send('language_switch', { destination_language: link.hreflang || link.lang || '' });
    } else if (url.origin === location.origin && /\/articles\/[^/]+\/?$/.test(url.pathname)) {
      send('guide_click', { article_path: url.pathname });
    }
  }, true);
  window.addEventListener('submit', event => {
    const form = event.target;
    if (form instanceof HTMLFormElement && /^(www\.)?cnfanshp\.com$/.test(new URL(form.action).hostname)) {
      send('product_search', { search_location: 'site_search' });
    }
  }, true);
})();
