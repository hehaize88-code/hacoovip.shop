(function () {
  "use strict";

  const supportedLanguages = [
    { code: "en", label: "English" },
    { code: "fr", label: "Français" },
    { code: "de", label: "Deutsch" },
    { code: "it", label: "Italiano" },
    { code: "es", label: "Español" }
  ];

  const currentLocaleCode = (document.documentElement.lang || "en").split("-")[0].toLowerCase();
  const currentLocale = supportedLanguages.some(function (language) {
    return language.code === currentLocaleCode;
  }) ? currentLocaleCode : "en";

  function siteRootPrefix() {
    const stylesheet = document.querySelector('link[rel="stylesheet"][href$="assets/styles.css"]');
    if (!stylesheet) return "";
    const href = stylesheet.getAttribute("href") || "";
    return href.slice(0, -"assets/styles.css".length);
  }

  const rootPrefix = siteRootPrefix();

  function currentRouteFile() {
    const canonical = document.querySelector('link[rel="canonical"]');
    let path = "/";
    try {
      path = new URL(canonical ? canonical.href : window.location.href).pathname;
    } catch (error) {
      path = "/";
    }
    path = path.replace(/^\/(fr|de|it|es)(?=\/|$)/, "");
    path = path.replace(/^\/+|\/+$/g, "");
    return path ? path + "/index.html" : "index.html";
  }

  function languageDestination(code) {
    return rootPrefix + (code === "en" ? "" : code + "/") + currentRouteFile();
  }

  function addLanguageSwitcher() {
    const header = document.querySelector(".header-inner");
    const nav = document.querySelector("[data-site-nav]");
    if (!header || !nav) return;

    let wrapper = header.querySelector(".language-switcher");
    if (!wrapper) {
      wrapper = document.createElement("div");
      wrapper.className = "language-switcher";
      wrapper.innerHTML = '<span class="language-icon" aria-hidden="true">文</span>' +
        '<label class="skip-link" for="site-language">Language</label>' +
        '<select id="site-language" aria-label="Website language" data-language-switch>' +
        supportedLanguages.map(function (language) {
          return '<option value="' + language.code + '"' + (language.code === currentLocale ? " selected" : "") + '>' + language.label + '</option>';
        }).join("") +
        '</select>';
      nav.insertAdjacentElement("afterend", wrapper);
    }

    const select = wrapper.querySelector("select");
    if (!select || select.getAttribute("data-language-ready") === "true") return;
    select.value = currentLocale;
    Array.from(select.options).forEach(function (option) {
      option.setAttribute("data-href", languageDestination(option.value));
    });
    select.setAttribute("data-language-ready", "true");
    select.addEventListener("change", function () {
      const code = select.value;
      try {
        window.localStorage.setItem("hacoo-language", code);
      } catch (error) {
        // Language switching still works if storage is blocked.
      }
      const option = select.options[select.selectedIndex];
      window.location.href = option ? option.getAttribute("data-href") : languageDestination(code);
    });
  }

  addLanguageSwitcher();

  const toggle = document.querySelector("[data-menu-toggle]");
  const nav = document.querySelector("[data-site-nav]");

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      const open = nav.getAttribute("data-open") === "true";
      nav.setAttribute("data-open", String(!open));
      toggle.setAttribute("aria-expanded", String(!open));
      toggle.textContent = open ? "☰" : "×";
    });

    nav.addEventListener("click", function (event) {
      if (event.target.closest("a")) {
        nav.setAttribute("data-open", "false");
        toggle.setAttribute("aria-expanded", "false");
        toggle.textContent = "☰";
      }
    });
  }

  const finder = document.querySelector("[data-finder]");
  if (!finder) return;

  const finderText = {
    en: {
      shoeTitle: "Featured shoe", shoeDetail: "Open a selected shoe product",
      clothingTitle: "Featured hoodie", clothingDetail: "Open a selected clothing product",
      bagTitle: "Featured bag", bagDetail: "Open a selected bag product",
      accessoriesTitle: "Featured sunglasses", accessoriesDetail: "Open a selected accessories product",
      electronicsTitle: "Electronics index", electronicsDetail: "External route for electronics and small devices",
      productResult: "Product result", noMatch: "No matching route. Try shoes, clothing, bags, accessories, or electronics.",
      searching: "Searching products…", listedPrice: "Listed price: ", noInline: "No inline matches. View full search results →", openAll: "Open all results for"
    },
    fr: {
      shoeTitle: "Chaussure en vedette", shoeDetail: "Ouvrir une chaussure sélectionnée",
      clothingTitle: "Sweat à capuche en vedette", clothingDetail: "Ouvrir un vêtement sélectionné",
      bagTitle: "Sac en vedette", bagDetail: "Ouvrir un sac sélectionné",
      accessoriesTitle: "Lunettes en vedette", accessoriesDetail: "Ouvrir un accessoire sélectionné",
      electronicsTitle: "Index électronique", electronicsDetail: "Parcours externe pour appareils et accessoires électroniques",
      productResult: "Résultat produit", noMatch: "Aucun parcours correspondant. Essayez chaussures, vêtements, sacs, accessoires ou électronique.",
      searching: "Recherche de produits…", listedPrice: "Prix affiché : ", noInline: "Aucun résultat intégré. Voir tous les résultats →", openAll: "Ouvrir tous les résultats pour"
    },
    de: {
      shoeTitle: "Ausgewählter Schuh", shoeDetail: "Ein ausgewähltes Schuhprodukt öffnen",
      clothingTitle: "Ausgewählter Hoodie", clothingDetail: "Ein ausgewähltes Kleidungsstück öffnen",
      bagTitle: "Ausgewählte Tasche", bagDetail: "Ein ausgewähltes Taschenprodukt öffnen",
      accessoriesTitle: "Ausgewählte Sonnenbrille", accessoriesDetail: "Ein ausgewähltes Accessoire öffnen",
      electronicsTitle: "Elektronik-Index", electronicsDetail: "Externe Route für Elektronik und kleine Geräte",
      productResult: "Produktergebnis", noMatch: "Keine passende Route. Versuche Schuhe, Kleidung, Taschen, Accessoires oder Elektronik.",
      searching: "Produkte werden gesucht…", listedPrice: "Angezeigter Preis: ", noInline: "Keine direkten Treffer. Alle Ergebnisse ansehen →", openAll: "Alle Ergebnisse öffnen für"
    },
    it: {
      shoeTitle: "Scarpa in evidenza", shoeDetail: "Apri una scarpa selezionata",
      clothingTitle: "Felpa in evidenza", clothingDetail: "Apri un capo selezionato",
      bagTitle: "Borsa in evidenza", bagDetail: "Apri una borsa selezionata",
      accessoriesTitle: "Occhiali in evidenza", accessoriesDetail: "Apri un accessorio selezionato",
      electronicsTitle: "Indice elettronica", electronicsDetail: "Percorso esterno per elettronica e piccoli dispositivi",
      productResult: "Risultato prodotto", noMatch: "Nessun percorso corrispondente. Prova scarpe, abbigliamento, borse, accessori o elettronica.",
      searching: "Ricerca prodotti…", listedPrice: "Prezzo indicato: ", noInline: "Nessun risultato diretto. Vedi tutti i risultati →", openAll: "Apri tutti i risultati per"
    },
    es: {
      shoeTitle: "Zapatilla destacada", shoeDetail: "Abrir un producto de calzado seleccionado",
      clothingTitle: "Sudadera destacada", clothingDetail: "Abrir una prenda seleccionada",
      bagTitle: "Bolso destacado", bagDetail: "Abrir un bolso seleccionado",
      accessoriesTitle: "Gafas destacadas", accessoriesDetail: "Abrir un accesorio seleccionado",
      electronicsTitle: "Índice de electrónica", electronicsDetail: "Ruta externa para electrónica y dispositivos pequeños",
      productResult: "Resultado de producto", noMatch: "No hay una ruta coincidente. Prueba calzado, ropa, bolsos, accesorios o electrónica.",
      searching: "Buscando productos…", listedPrice: "Precio mostrado: ", noInline: "Sin resultados directos. Ver todos los resultados →", openAll: "Abrir todos los resultados para"
    }
  }[currentLocale];

  function assetUrl(path) {
    return rootPrefix + path;
  }

  const routes = [
    {
      title: finderText.shoeTitle,
      detail: finderText.shoeDetail,
      category: "shoes",
      image: assetUrl("assets/images/shoes.webp"),
      url: "https://www.cnfanshp.com/AllProducts/6035.html"
    },
    {
      title: finderText.clothingTitle,
      detail: finderText.clothingDetail,
      category: "clothing",
      image: assetUrl("assets/images/clothing.webp"),
      url: "https://www.cnfanshp.com/AllProducts/3468.html"
    },
    {
      title: finderText.bagTitle,
      detail: finderText.bagDetail,
      category: "bags",
      image: assetUrl("assets/images/bags.webp"),
      url: "https://www.cnfanshp.com/AllProducts/4558.html"
    },
    {
      title: finderText.accessoriesTitle,
      detail: finderText.accessoriesDetail,
      category: "accessories",
      image: assetUrl("assets/images/accessories.webp"),
      url: "https://www.cnfanshp.com/AllProducts/5480.html"
    },
    {
      title: finderText.electronicsTitle,
      detail: finderText.electronicsDetail,
      category: "electronics",
      image: assetUrl("assets/images/accessories.webp"),
      url: "https://www.cnfanshp.com/electronics/"
    }
  ];

  const previewNikeProducts = [
    {
      title: "Nike's new Baroque flip-flops",
      detail: finderText.productResult,
      image: assetUrl("assets/images/search-nike-1.webp"),
      url: "https://www.cnfanshp.com/AllProducts/5984.html"
    },
    {
      title: "Nike Shox R4 Air Column Sports",
      detail: finderText.productResult,
      image: assetUrl("assets/images/search-nike-2.webp"),
      url: "https://www.cnfanshp.com/AllProducts/5951.html"
    },
    {
      title: "Nike mind 01 / Nike mind 02",
      detail: finderText.productResult,
      image: assetUrl("assets/images/search-nike-3.jpg"),
      url: "https://www.cnfanshp.com/AllProducts/5930.html"
    }
  ];

  const input = finder.querySelector("[data-search-input]");
  const searchButton = finder.querySelector("[data-search-button]");
  const resultBox = finder.querySelector("[data-results]");
  const filters = Array.from(finder.querySelectorAll("[data-filter]"));
  let activeCategory = "all";
  let searchTimer = 0;
  let requestSequence = 0;

  function escapeHtml(value) {
    return String(value).replace(/[&<>"]/g, function (character) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", "\"": "&quot;" }[character];
    });
  }

  function renderRows(items) {
    resultBox.innerHTML = items.map(function (route) {
      return '<a class="result-row" href="' + escapeHtml(route.url) + '" target="_blank" rel="noopener">' +
        '<img src="' + escapeHtml(route.image) + '" alt="" width="58" height="58" loading="lazy" referrerpolicy="no-referrer">' +
        '<span class="result-copy"><strong>' + escapeHtml(route.title) + '</strong><span>' + escapeHtml(route.detail || finderText.productResult) + '</span></span>' +
        '<span class="result-arrow" aria-hidden="true">→</span>' +
        '</a>';
    }).join("");
  }

  function renderFeatured() {
    const term = input.value.trim().toLowerCase();
    const matches = routes.filter(function (route) {
      const categoryMatches = activeCategory === "all" || route.category === activeCategory;
      const termMatches = !term || (route.title + " " + route.detail + " " + route.category).toLowerCase().includes(term);
      return categoryMatches && termMatches;
    }).slice(0, 3);

    if (!matches.length) {
      resultBox.innerHTML = '<div class="result-empty">' + escapeHtml(finderText.noMatch) + '</div>';
      return;
    }

    renderRows(matches);
  }

  function mainSearchUrl(term) {
    return "https://www.cnfanshp.com/search.html?keywords=" + encodeURIComponent(term) + "&channelid=2";
  }

  function isNikeTerm(term) {
    const normalized = term.toLowerCase();
    return normalized.includes("nike") || normalized.includes("耐克");
  }

  async function searchProducts() {
    const term = input.value.trim();
    if (term.length < 2) {
      renderFeatured();
      return;
    }

    const sequence = ++requestSequence;
    resultBox.innerHTML = '<div class="result-loading">' + escapeHtml(finderText.searching) + '</div>';

    try {
      const response = await fetch(rootPrefix + "api/search.php?q=" + encodeURIComponent(term), {
        headers: { "Accept": "application/json" }
      });
      if (!response.ok) throw new Error("Search request failed");

      const payload = await response.json();
      if (sequence !== requestSequence) return;

      const items = Array.isArray(payload.items) ? payload.items.slice(0, 3).map(function (item) {
        return {
          title: item.title,
          detail: item.price ? finderText.listedPrice + item.price : finderText.productResult,
          image: item.image,
          url: item.url
        };
      }) : [];

      if (items.length) {
        renderRows(items);
        return;
      }

      resultBox.innerHTML = '<a class="result-empty result-search-link" href="' + escapeHtml(mainSearchUrl(term)) + '" target="_blank" rel="noopener">' + escapeHtml(finderText.noInline) + '</a>';
    } catch (error) {
      if (sequence !== requestSequence) return;

      if (isNikeTerm(term)) {
        renderRows(previewNikeProducts);
        return;
      }

      resultBox.innerHTML = '<a class="result-empty result-search-link" href="' + escapeHtml(mainSearchUrl(term)) + '" target="_blank" rel="noopener">' + escapeHtml(finderText.openAll) + ' “' + escapeHtml(term) + '” →</a>';
    }
  }

  filters.forEach(function (button) {
    button.addEventListener("click", function () {
      activeCategory = button.getAttribute("data-filter");
      input.value = "";
      requestSequence += 1;
      filters.forEach(function (item) {
        item.setAttribute("aria-pressed", String(item === button));
      });
      renderFeatured();
    });
  });

  searchButton.addEventListener("click", searchProducts);
  input.addEventListener("input", function () {
    window.clearTimeout(searchTimer);
    const term = input.value.trim();
    if (!term) {
      requestSequence += 1;
      renderFeatured();
      return;
    }
    searchTimer = window.setTimeout(searchProducts, 450);
  });
  input.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
      window.clearTimeout(searchTimer);
      searchProducts();
    }
  });

  renderFeatured();
})();
