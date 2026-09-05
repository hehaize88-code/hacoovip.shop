(() => {
  const MAIN_SEARCH = "https://www.cnfanshp.com/search.html";
  const track = (eventName, parameters = {}) => {
    if (typeof window.gtag === "function") {
      window.gtag("event", eventName, parameters);
    }
  };

  document.querySelectorAll("[data-main-search]").forEach((form) => {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const input = form.querySelector('input[name="q"]');
      const query = input?.value.trim();
      if (!query) {
        input?.focus();
        return;
      }
      const target = new URL(MAIN_SEARCH);
      target.searchParams.set("keywords", query);
      target.searchParams.set("channelid", "2");
      track("catalog_search_submit", {
        search_term: query,
        link_url: target.toString(),
      });
      window.open(target.toString(), "_blank", "noopener,noreferrer");
    });
  });

  const filter = document.querySelector("[data-product-filter]");
  if (filter) {
    const queryInput = filter.querySelector('input[name="filter-query"]');
    const categorySelect = filter.querySelector(
      'select[name="filter-category"]',
    );
    const count = filter.querySelector("[data-result-count]");
    const cards = Array.from(document.querySelectorAll("[data-product-card]"));
    const empty = document.querySelector("[data-empty-state]");

    const update = () => {
      const query = queryInput.value.trim().toLocaleLowerCase();
      const category = categorySelect.value;
      let visible = 0;

      cards.forEach((card) => {
        const matchesQuery =
          !query || card.dataset.searchText.toLocaleLowerCase().includes(query);
        const matchesCategory = !category || card.dataset.category === category;
        const show = matchesQuery && matchesCategory;
        card.hidden = !show;
        if (show) visible += 1;
      });

      count.textContent = String(visible);
      if (empty) empty.hidden = visible !== 0;
    };

    queryInput.addEventListener("input", update);
    categorySelect.addEventListener("change", update);
    update();
  }

  document.querySelectorAll(".mobile-menu-panel a").forEach((link) => {
    link.addEventListener("click", () => {
      const details = link.closest("details");
      if (details) details.open = false;
    });
  });

  document.addEventListener("click", (event) => {
    const link = event.target.closest("a[href]");
    if (!link) return;

    const url = new URL(link.href, window.location.href);
    const text = link.textContent.trim().replace(/\s+/g, " ").slice(0, 100);

    if (
      url.hostname === "www.cnfanshp.com" ||
      url.hostname === "cnfanshp.com"
    ) {
      track("main_catalog_click", {
        link_url: url.toString(),
        link_text: text,
        link_domain: url.hostname,
      });
      return;
    }

    if (url.origin !== window.location.origin) return;

    if (
      link.classList.contains("locale-link") ||
      link.hasAttribute("hreflang")
    ) {
      track("language_switch", {
        language: link.getAttribute("hreflang") || text,
        link_url: url.toString(),
      });
    } else if (
      url.pathname.includes("/finds/") &&
      url.pathname !== "/finds/" &&
      url.pathname !== "/de/finds/"
    ) {
      track("product_click", {
        link_url: url.toString(),
        link_text: text,
      });
    } else if (url.pathname.includes("/categories/")) {
      track("category_click", {
        link_url: url.toString(),
        link_text: text,
      });
    }
  });
})();
