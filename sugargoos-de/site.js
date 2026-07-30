(() => {
  const MAIN_SEARCH = "https://www.cnfanshp.com/search.html";

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
      window.open(target.toString(), "_blank", "noopener,noreferrer");
    });
  });

  const filter = document.querySelector("[data-product-filter]");
  if (filter) {
    const queryInput = filter.querySelector('input[name="filter-query"]');
    const categorySelect = filter.querySelector('select[name="filter-category"]');
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
        const matchesCategory =
          !category || card.dataset.category === category;
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
})();
