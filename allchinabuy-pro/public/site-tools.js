(function () {
  "use strict";
  function track(name, data) {
    if (typeof window.gtag === "function") window.gtag("event", name, data);
  }
  document.addEventListener("click", function (event) {
    var link = event.target.closest("a[href]");
    if (!link) return;
    var url = new URL(link.href, location.href);
    if (url.hostname === "www.cnfanshp.com" || url.hostname === "cnfanshp.com") {
      track("main_catalogue_click", {
        destination_type: link.closest(".product-card") ? "product" : /AllProducts\/\d+\.html/.test(url.pathname) ? "product" : "category",
        page_language: document.documentElement.lang
      });
    }
  });
  document.addEventListener("submit", function (event) {
    if (!event.target.matches(".search-form")) return;
    var input = event.target.querySelector('[name="keywords"]');
    if (!input || !input.value.trim()) { event.preventDefault(); return; }
    input.value = input.value.trim();
    track("main_catalogue_search", { page_language: document.documentElement.lang });
  });
  function localFilters() {
    if (!document.documentElement.dataset.staticLocale) return;
    document.querySelectorAll(".finds-explorer").forEach(function (explorer) {
      var category = "all";
      var input = explorer.querySelector('.finds-toolbar input[type="search"]');
      var cards = Array.from(explorer.querySelectorAll(".product-grid .product-card"));
      var count = explorer.querySelector(".result-count");
      var template = count ? count.textContent.replace(/\d+/, "{count}") : "{count}";
      function filter() {
        var needle = input ? input.value.trim().toLocaleLowerCase() : "";
        var total = 0;
        cards.forEach(function (card) {
          var haystack = (card.textContent + " " + card.dataset.searchTags).toLocaleLowerCase();
          var visible = (category === "all" || card.dataset.category === category) && (!needle || haystack.includes(needle));
          card.hidden = !visible;
          if (visible) total++;
        });
        if (count) count.textContent = template.replace("{count}", total);
      }
      explorer.querySelectorAll(".filter-pills button").forEach(function (button) {
        button.addEventListener("click", function () {
          category = button.dataset.category;
          explorer.querySelectorAll(".filter-pills button").forEach(function (item) { item.classList.toggle("is-active", item === button); });
          filter();
        });
      });
      if (input) input.addEventListener("input", filter);
    });
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", localFilters);
  else localFilters();
})();
