(() => {
  if (typeof window.gtag !== "function") return;

  const cleanText = (value) => String(value || "").replace(/\s+/g, " ").trim().slice(0, 100);
  const placement = (element) => {
    if (element.closest("header")) return "header";
    if (element.closest("footer")) return "footer";
    if (element.closest("aside")) return "article_sidebar";
    if (element.closest(".article-grid, .expanded-article-library")) return "article_library";
    if (element.closest(".category-grid")) return "category_grid";
    if (element.closest(".kb-product-grid")) return "product_grid";
    return "page_body";
  };

  document.addEventListener("click", (event) => {
    const link = event.target.closest("a[href]");
    if (!link) return;

    const url = new URL(link.href, window.location.href);
    const params = {
      link_url: url.href,
      link_domain: url.hostname,
      link_text: cleanText(link.textContent),
      link_placement: placement(link),
      transport_type: "beacon"
    };

    if (url.origin !== window.location.origin) {
      window.gtag("event", "outbound_click", params);
    } else if (url.pathname.startsWith("/articles/")) {
      window.gtag("event", "guide_click", params);
    } else if (url.pathname.startsWith("/products/")) {
      window.gtag("event", "product_click", params);
    }
  }, { capture: true });

  document.addEventListener("submit", (event) => {
    const form = event.target;
    if (!(form instanceof HTMLFormElement)) return;
    const input = form.querySelector('input[name="keywords"], input[type="search"]');
    const searchTerm = cleanText(input && input.value);
    if (!searchTerm) return;

    window.gtag("event", "site_search_submit", {
      search_term: searchTerm,
      search_destination: form.action,
      transport_type: "beacon"
    });
  }, { capture: true });
})();
