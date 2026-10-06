/* Keep executable JavaScript out of server-rendered HTML text nodes. */
(function () {
  if (window.kakobuysAnalyticsReady) return;
  window.kakobuysAnalyticsReady = true;
  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };
  window.gtag('js', new Date());
  window.gtag('config', 'G-L9YML1CM7K');
  var loader = document.createElement('script');
  loader.async = true;
  loader.src = 'https://www.googletagmanager.com/gtag/js?id=G-L9YML1CM7K';
  document.head.appendChild(loader);

  document.addEventListener('click', function (event) {
    var element = event.target instanceof Element ? event.target : null;
    var link = element && element.closest('a');
    if (!link) return;
    try {
      var url = new URL(link.href, location.href);
      if (url.hostname === 'www.cnfanshp.com' || url.hostname === 'cnfanshp.com') {
        window.gtag('event', 'outbound_catalog_click', {
          link_url: url.href,
          link_text: (link.textContent || '').trim().slice(0, 100),
          page_path: location.pathname,
          transport_type: 'beacon'
        });
      }
    } catch (_) { /* Ignore invalid links without interrupting navigation. */ }
  }, true);

  document.addEventListener('submit', function (event) {
    var form = event.target;
    if (!(form instanceof HTMLFormElement) || !form.matches('form.search')) return;
    var input = form.querySelector('input[name="keywords"]');
    window.gtag('event', 'catalog_search', {
      search_term: input ? input.value.trim().slice(0, 100) : '',
      page_path: location.pathname,
      transport_type: 'beacon'
    });
  }, true);
})();
