/* Progressive enhancement: every card and destination remains in the server HTML. */
document.querySelectorAll('[data-catalog]').forEach(function (catalog) {
  var search = catalog.querySelector('[data-catalog-search]');
  var category = catalog.querySelector('[data-catalog-category]');
  var sort = catalog.querySelector('[data-catalog-sort]');
  var grid = catalog.querySelector('.product-grid');
  var cards = Array.from(grid.querySelectorAll('[data-product-category]'));
  var count = catalog.querySelector('[data-catalog-count]');
  var empty = catalog.querySelector('[data-catalog-empty]');
  function update(announce) {
    var query = search.value.trim().toLocaleLowerCase();
    var visible = 0;
    cards.forEach(function (card) {
      var match = (!category.value || card.dataset.productCategory === category.value) && (!query || card.textContent.toLocaleLowerCase().includes(query));
      card.hidden = !match;
      if (match) visible++;
    });
    cards.slice().sort(function (a, b) {
      if (sort.value === 'low') return Number(a.dataset.priceCny) - Number(b.dataset.priceCny);
      if (sort.value === 'high') return Number(b.dataset.priceCny) - Number(a.dataset.priceCny);
      return Number(a.dataset.originalOrder) - Number(b.dataset.originalOrder);
    }).forEach(function (card) { grid.appendChild(card); });
    count.textContent = String(visible);
    empty.hidden = visible !== 0;
    if (announce && typeof window.gtag === 'function') window.gtag('event', 'catalog_filter', { category_id: category.value || 'all', sort_order: sort.value, result_count: visible });
  }
  search.addEventListener('input', function () { update(false); });
  category.addEventListener('change', function () { update(true); });
  sort.addEventListener('change', function () { update(true); });
  catalog.querySelector('[data-catalog-reset]').addEventListener('click', function () { search.value = ''; category.value = ''; sort.value = 'featured'; update(true); search.focus(); });
});
