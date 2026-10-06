// Keep the existing GA4 property. Do not transmit search terms or query strings.
export const engagementTracking = `
(function () {
  if (window.__superbuysEngagementTracking) return;
  window.__superbuysEngagementTracking = true;
  function emit(name, details) {
    if (typeof window.gtag === 'function') window.gtag('event', name, details);
  }
  document.addEventListener('click', function (event) {
    var link = event.target && event.target.closest ? event.target.closest('a[href]') : null;
    if (!link) return;
    var url = new URL(link.href, location.href);
    if (url.hostname !== 'www.cnfanshp.com' && url.hostname !== 'cnfanshp.com') return;
    var kind = /^\\/[^/]+\\/\\d+\\.html$/.test(url.pathname) ? 'product' : (url.pathname === '/AllProducts/' ? 'catalog' : 'category');
    emit('main_site_click', { link_type: kind, link_path: url.pathname, source_path: location.pathname, site_language: document.documentElement.lang });
  });
  document.addEventListener('submit', function (event) {
    var form = event.target;
    if (!form || !form.matches || !form.matches('form.search-line')) return;
    emit('catalog_search', { source_path: location.pathname, site_language: document.documentElement.lang });
  });
})();
`;
