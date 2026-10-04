(() => {
  if (window.acbuyCatalogueEvents) return;
  window.acbuyCatalogueEvents = true;
  const host = 'www.cnfanshp.com';
  function send(name, params) {
    if (typeof window.gtag === 'function') window.gtag('event', name, params);
  }
  document.addEventListener('click', event => {
    const a = event.target.closest && event.target.closest('a[href]');
    if (!a) return;
    const url = new URL(a.href, location.href);
    if (url.hostname !== host) return;
    send('catalog_click', {destination_host: host, destination_path: url.pathname,
      link_type: /\/AllProducts\/\d+\.html$/.test(url.pathname) ? 'product' : 'catalogue',
      page_path: location.pathname});
  });
  document.addEventListener('submit', event => {
    const form = event.target;
    if (!(form instanceof HTMLFormElement)) return;
    const url = new URL(form.action, location.href);
    if (url.hostname === host) send('catalog_search', {destination_host: host, page_path: location.pathname});
  });
})();
