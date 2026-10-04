(() => {
  if (window.__sugargooSiteEvents) return;
  window.__sugargooSiteEvents = true;
  // Reuse the site's existing GA4 tag and its consent state.
  function send(name, params) {
    if (typeof window.gtag !== 'function') return;
    window.gtag('event', name, {
      ...params,
      page_path: location.pathname,
      transport_type: 'beacon'
    });
  }
  document.addEventListener('submit', event => {
    const form = event.target;
    if (!(form instanceof HTMLFormElement) || !form.matches('.home-search') || !form.checkValidity()) return;
    const term = new FormData(form).get('keywords');
    if (typeof term !== 'string' || !term.trim()) return;
    // Count search use without sending user-entered text or personal details.
    send('main_site_search', { search_origin: 'homepage', query_length: term.trim().length });
  });
  document.addEventListener('click', event => {
    const anchor = event.target.closest && event.target.closest('a[href]');
    if (!anchor) return;
    let url;
    try { url = new URL(anchor.href, location.href); } catch (_) { return; }
    if (url.hostname !== 'www.cnfanshp.com' && url.hostname !== 'cnfanshp.com') return;
    send('main_site_click', {
      destination_path: url.pathname,
      link_type: /^\/AllProducts\/\d+\.html$/i.test(url.pathname) ? 'product' : 'catalogue'
    });
  });
})();
