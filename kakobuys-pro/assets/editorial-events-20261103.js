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
  const placement = link => link.closest('.parcel-jumps') ? 'quick_links' : link.closest('header') ? 'header' : link.closest('footer') ? 'footer' : 'content';
  const pageType = () => /^\/(?:de\/|es\/|fr\/|it\/|pl\/)?$/.test(location.pathname) ? 'home' : location.pathname.includes('/articles/') ? 'guide' : 'other';
  window.addEventListener('click', event => {
    const link = event.target.closest && event.target.closest('a[href]');
    if (!link) return;
    const url = new URL(link.href, location.href);
    if (/^(www\.)?cnfanshp\.com$/.test(url.hostname)) {
      send('main_catalog_click', {
        destination_path: url.pathname,
        link_location: placement(link),
        source_page_type: pageType()
      });
    } else if (url.origin === location.origin && link.closest('.language-menu')) {
      send('language_switch', { destination_language: link.hreflang || link.lang || '' });
    } else if (url.origin === location.origin && /\/articles\/[^/]+\/?$/.test(url.pathname)) {
      send('guide_click', { article_path: url.pathname, source_page_type: pageType(), link_location: placement(link) });
    } else if (url.origin === location.origin && /\/products\/[^/]+\/?$/.test(url.pathname)) {
      send('product_detail_click', { destination_path: url.pathname, source_page_type: pageType() });
    }
  }, true);
  window.addEventListener('submit', event => {
    const form = event.target;
    if (form instanceof HTMLFormElement && /^(www\.)?cnfanshp\.com$/.test(new URL(form.action).hostname)) {
      send('product_search', { search_location: 'site_search' });
    }
  }, true);
})();

