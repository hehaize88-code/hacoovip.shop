(() => {
  const labels = {
    en: {
      about: "About",
      trust: "Trust & policies",
      contact: "Contact",
      editorial: "Editorial policy",
      privacy: "Privacy",
      terms: "Terms",
      disclosure: "Disclosure",
      by: "Written and fact-checked by",
      method: "Research method",
      badge: "Independent guide · catalog checked daily",
      identity: "Independent OOPBUY research and product-discovery guide. Not the official OOPBUY website. Product, category and search links open cnfanshp.com in a new tab.",
      catalogTarget: "Open cnfanshp.com ↗",
      categoryLive: "Live catalog · daily check",
      findsEvidence: "Availability and source listing amounts are checked automatically. USD estimates use the ECB reference rate shown below; prices and rates can change.",
      monitor: "CATALOG MONITOR",
      linksActive: "{active}/{total} catalog paths active",
      lastRun: "Last automated check: {date} UTC",
      rateTitle: "USD ESTIMATE RATE",
      rateValue: "1 USD = CNY {rate}",
      rateSource: "ECB reference rate · {date}",
      staleTitle: "STALE-LISTING RULE",
      stalePolicy: "Hidden after 2 failed checks",
      staleDetail: "The first failure moves behind healthy listings.",
      methodLink: "How checks work →",
      checked: "LINK CHECKED",
      rechecking: "RECHECKING",
      hidden: "HIDDEN",
      approximate: "Approx.",
      unavailable: "Live status temporarily unavailable"
    },
    de: {
      about: "Über uns",
      trust: "Vertrauen & Richtlinien",
      contact: "Kontakt",
      editorial: "Redaktionsrichtlinie",
      privacy: "Datenschutz",
      terms: "Bedingungen",
      disclosure: "Offenlegung",
      by: "Verfasst und geprüft von",
      method: "Recherche-Methode",
      badge: "Unabhängiger Ratgeber · tägliche Katalogprüfung",
      identity: "Unabhängiger OOPBUY-Recherche- und Produktfinder; nicht die offizielle OOPBUY-Website. Produkt-, Kategorie- und Suchlinks öffnen cnfanshp.com in einem neuen Tab.",
      catalogTarget: "cnfanshp.com öffnen ↗",
      categoryLive: "Live-Katalog · täglich geprüft",
      findsEvidence: "Verfügbarkeit und Quellpreise werden automatisch geprüft. USD-Schätzungen nutzen den unten genannten EZB-Referenzkurs; Preise und Kurse können sich ändern.",
      monitor: "KATALOG-MONITOR",
      linksActive: "{active}/{total} Katalogpfade aktiv",
      lastRun: "Letzte automatische Prüfung: {date} UTC",
      rateTitle: "USD-SCHÄTZKURS",
      rateValue: "1 USD = CNY {rate}",
      rateSource: "EZB-Referenzkurs · {date}",
      staleTitle: "REGEL FÜR ALTE LINKS",
      stalePolicy: "Nach 2 Fehlern ausgeblendet",
      staleDetail: "Der erste Fehler verschiebt den Eintrag nach hinten.",
      methodLink: "So funktionieren die Prüfungen →",
      checked: "LINK GEPRÜFT",
      rechecking: "WIRD ERNEUT GEPRÜFT",
      hidden: "AUSGEBLENDET",
      approximate: "Ca.",
      unavailable: "Live-Status vorübergehend nicht verfügbar"
    },
    fr: {
      about: "À propos",
      trust: "Confiance et règles",
      contact: "Contact",
      editorial: "Charte éditoriale",
      privacy: "Confidentialité",
      terms: "Conditions",
      disclosure: "Divulgation",
      by: "Rédigé et vérifié par",
      method: "Méthode de recherche",
      badge: "Guide indépendant · catalogue vérifié chaque jour",
      identity: "Guide indépendant de recherche et de découverte OOPBUY, distinct du site officiel OOPBUY. Les liens produit, catégorie et recherche ouvrent cnfanshp.com dans un nouvel onglet.",
      catalogTarget: "Ouvrir cnfanshp.com ↗",
      categoryLive: "Catalogue actif · contrôle quotidien",
      findsEvidence: "La disponibilité et les montants source sont contrôlés automatiquement. Les estimations USD utilisent le taux de référence BCE affiché ci-dessous ; prix et taux peuvent changer.",
      monitor: "SUIVI DU CATALOGUE",
      linksActive: "{active}/{total} chemins du catalogue actifs",
      lastRun: "Dernier contrôle automatique : {date} UTC",
      rateTitle: "TAUX D’ESTIMATION USD",
      rateValue: "1 USD = CNY {rate}",
      rateSource: "Taux de référence BCE · {date}",
      staleTitle: "RÈGLE DES FICHES OBSOLÈTES",
      stalePolicy: "Masquée après 2 échecs",
      staleDetail: "Le premier échec déplace la fiche après les liens sains.",
      methodLink: "Fonctionnement des contrôles →",
      checked: "LIEN VÉRIFIÉ",
      rechecking: "NOUVEAU CONTRÔLE",
      hidden: "MASQUÉ",
      approximate: "Env.",
      unavailable: "Statut en direct momentanément indisponible"
    },
    es: {
      about: "Acerca de",
      trust: "Confianza y políticas",
      contact: "Contacto",
      editorial: "Política editorial",
      privacy: "Privacidad",
      terms: "Condiciones",
      disclosure: "Divulgación",
      by: "Redactado y verificado por",
      method: "Método de investigación",
      badge: "Guía independiente · catálogo revisado a diario",
      identity: "Guía independiente de investigación y descubrimiento sobre OOPBUY; no es el sitio oficial de OOPBUY. Los enlaces de productos, categorías y búsqueda abren cnfanshp.com en una pestaña nueva.",
      catalogTarget: "Abrir cnfanshp.com ↗",
      categoryLive: "Catálogo activo · revisión diaria",
      findsEvidence: "La disponibilidad y los importes de origen se revisan automáticamente. Las estimaciones en USD usan el tipo de referencia del BCE mostrado abajo; precios y tipos pueden cambiar.",
      monitor: "MONITOR DEL CATÁLOGO",
      linksActive: "{active}/{total} rutas del catálogo activas",
      lastRun: "Última revisión automática: {date} UTC",
      rateTitle: "TIPO ESTIMADO EN USD",
      rateValue: "1 USD = CNY {rate}",
      rateSource: "Tipo de referencia del BCE · {date}",
      staleTitle: "REGLA DE ENLACES OBSOLETOS",
      stalePolicy: "Oculto tras 2 fallos",
      staleDetail: "El primer fallo mueve el producto tras los enlaces sanos.",
      methodLink: "Cómo funcionan las revisiones →",
      checked: "ENLACE REVISADO",
      rechecking: "REVISANDO",
      hidden: "OCULTO",
      approximate: "Aprox.",
      unavailable: "Estado en directo temporalmente no disponible"
    },
    it: {
      about: "Chi siamo",
      trust: "Fiducia e politiche",
      contact: "Contatti",
      editorial: "Politica editoriale",
      privacy: "Privacy",
      terms: "Termini",
      disclosure: "Informativa",
      by: "Scritto e verificato da",
      method: "Metodo di ricerca",
      badge: "Guida indipendente · catalogo controllato ogni giorno",
      identity: "Guida indipendente di ricerca e scoperta su OOPBUY; non è il sito ufficiale OOPBUY. I link di prodotti, categorie e ricerca aprono cnfanshp.com in una nuova scheda.",
      catalogTarget: "Apri cnfanshp.com ↗",
      categoryLive: "Catalogo attivo · controllo quotidiano",
      findsEvidence: "Disponibilità e importi di origine vengono controllati automaticamente. Le stime USD usano il tasso di riferimento BCE mostrato sotto; prezzi e tassi possono cambiare.",
      monitor: "MONITOR DEL CATALOGO",
      linksActive: "{active}/{total} percorsi del catalogo attivi",
      lastRun: "Ultimo controllo automatico: {date} UTC",
      rateTitle: "TASSO DI STIMA USD",
      rateValue: "1 USD = CNY {rate}",
      rateSource: "Tasso di riferimento BCE · {date}",
      staleTitle: "REGOLA LINK OBSOLETI",
      stalePolicy: "Nascosto dopo 2 errori",
      staleDetail: "Il primo errore sposta l’articolo dopo i link validi.",
      methodLink: "Come funzionano i controlli →",
      checked: "LINK CONTROLLATO",
      rechecking: "NUOVO CONTROLLO",
      hidden: "NASCOSTO",
      approximate: "Circa",
      unavailable: "Stato live temporaneamente non disponibile"
    }
  };
  let catalogHealthSnapshot = null;

  function pageLanguage() {
    const first = location.pathname.split("/").filter(Boolean)[0];
    return labels[first] ? first : "en";
  }

  function makeLink(href, text, className) {
    const link = document.createElement("a");
    link.href = href;
    link.textContent = text;
    if (className) link.className = className;
    return link;
  }

  function addAboutLink(nav, label) {
    if (!nav || nav.querySelector(".trust-about-link")) return;
    nav.appendChild(makeLink("/about/", label, "trust-about-link"));
  }

  function addFooter(label) {
    const grid = document.querySelector(".footer-grid");
    if (!grid) return;
    grid.classList.add("footer-grid--trust");
    if (grid.querySelector(".footer-trust")) return;

    const block = document.createElement("div");
    block.className = "footer-trust";
    const heading = document.createElement("strong");
    heading.textContent = label.trust;
    block.append(
      heading,
      makeLink("/about/", label.about),
      makeLink("/contact/", label.contact),
      makeLink("/editorial-policy/", label.editorial),
      makeLink("/privacy-policy/", label.privacy),
      makeLink("/terms/", label.terms),
      makeLink("/affiliate-disclosure/", label.disclosure)
    );
    grid.appendChild(block);
  }

  function addArticleByline(label) {
    if (!/^\/(?:de\/|fr\/|es\/|it\/)?articles\/[^/]+\/?$/.test(location.pathname)) return;
    const hero = document.querySelector(".inner-hero > .shell");
    if (!hero || hero.querySelector(".article-byline-card")) return;

    const byline = document.createElement("div");
    byline.className = "article-byline-card";
    byline.setAttribute("data-editorial-byline", "true");
    const prefix = document.createElement("span");
    prefix.textContent = label.by;
    const author = makeLink(
      "/authors/editorial-research-desk/",
      "oopbuys.store Editorial Research Desk"
    );
    const separator = document.createElement("span");
    separator.className = "byline-separator";
    separator.textContent = "·";
    const method = makeLink("/editorial-policy/", label.method);
    byline.append(prefix, author, separator, method);
    hero.appendChild(byline);
  }

  function setText(element, value) {
    if (element && element.textContent !== value) element.textContent = value;
  }

  function interpolate(template, values) {
    return Object.entries(values).reduce(
      (text, [key, value]) => text.replaceAll(`{${key}}`, String(value)),
      template
    );
  }

  function formatUtc(value, lang, includeTime = true) {
    const locales = {
      en: "en-GB",
      de: "de-DE",
      fr: "fr-FR",
      es: "es-ES",
      it: "it-IT"
    };
    const options = includeTime
      ? {
          dateStyle: "medium",
          timeStyle: "short",
          timeZone: "UTC"
        }
      : {
          dateStyle: "medium",
          timeZone: "UTC"
        };
    try {
      return new Intl.DateTimeFormat(locales[lang], options).format(
        new Date(value)
      );
    } catch {
      return String(value);
    }
  }

  function normalizeUrl(value) {
    try {
      const url = new URL(value, location.href);
      url.hash = "";
      return url.href;
    } catch {
      return value;
    }
  }

  function ensureHomeTrustCopy(label) {
    const categories = document.querySelector(".category-grid");
    const finds = document.querySelector(".finds-section");
    if (!categories && !finds) return;

    const badge = document.querySelector(".status-badge");
    if (badge && badge.textContent.trim() !== label.badge) {
      [...badge.childNodes]
        .filter((node) => node.nodeType === Node.TEXT_NODE)
        .forEach((node) => node.remove());
      badge.appendChild(document.createTextNode(label.badge));
    }

    const note = document.querySelector(".catalog-note");
    if (note) {
      note.classList.add("catalog-note--identity");
      setText(note.querySelector("p"), label.identity);
      setText(note.querySelector("a"), label.catalogTarget);
    }

    if (categories) {
      categories
        .querySelectorAll("small")
        .forEach((small) => setText(small, label.categoryLive));
    }

    if (finds) {
      setText(
        finds.querySelector(".section-heading--split > p"),
        label.findsEvidence
      );
      setText(finds.querySelector(".currency-note"), label.findsEvidence);
    }
    setText(document.querySelector(".panel-footer strong"), "CNFANSHP.COM");
  }

  function createHealthPanel(label) {
    const insertionPoint =
      document.querySelector(".categories-section") ??
      document.querySelector(".directory-main.finds-section");
    if (!insertionPoint) return null;

    const section = document.createElement("section");
    section.className = "catalog-health-section";
    section.dataset.catalogHealth = "true";
    section.dataset.healthState = "loading";
    section.setAttribute("aria-labelledby", "catalog-health-title");
    section.innerHTML = `
      <div class="shell catalog-health-grid">
        <div class="catalog-health-card catalog-health-card--summary">
          <span id="catalog-health-title" data-health-label="monitor"></span>
          <strong data-health-summary>20/20</strong>
          <small data-health-time></small>
        </div>
        <div class="catalog-health-card">
          <span data-health-label="rate"></span>
          <strong data-health-rate></strong>
          <small data-health-rate-source></small>
        </div>
        <div class="catalog-health-card">
          <span data-health-label="stale"></span>
          <strong data-health-policy></strong>
          <small data-health-policy-detail></small>
        </div>
        <a class="catalog-health-method" href="/editorial-policy/#catalog-monitoring"></a>
      </div>`;
    insertionPoint.before(section);
    applyHealthPanelLabels(section, label);
    return section;
  }

  function applyHealthPanelLabels(section, label) {
    setText(section.querySelector('[data-health-label="monitor"]'), label.monitor);
    setText(section.querySelector('[data-health-label="rate"]'), label.rateTitle);
    setText(section.querySelector('[data-health-label="stale"]'), label.staleTitle);
    setText(section.querySelector("[data-health-policy]"), label.stalePolicy);
    setText(
      section.querySelector("[data-health-policy-detail]"),
      label.staleDetail
    );
    setText(section.querySelector(".catalog-health-method"), label.methodLink);
  }

  function ensureHealthPanel(label) {
    const insertionPoint =
      document.querySelector(".categories-section") ??
      document.querySelector(".directory-main.finds-section");
    if (!insertionPoint) return null;
    const section =
      document.querySelector(".catalog-health-section") ??
      createHealthPanel(label);
    if (section) applyHealthPanelLabels(section, label);
    return section;
  }

  function updateStructuredProductList(inactiveUrls) {
    document
      .querySelectorAll('script[type="application/ld+json"]')
      .forEach((script) => {
        try {
          const data = JSON.parse(script.textContent);
          const nodes = Array.isArray(data?.["@graph"]) ? data["@graph"] : [data];
          let changed = false;
          nodes.forEach((node) => {
            if (node?.["@type"] !== "ItemList" || !Array.isArray(node.itemListElement)) {
              return;
            }
            const filtered = node.itemListElement.filter(
              (item) => !inactiveUrls.has(normalizeUrl(item?.url))
            );
            if (filtered.length !== node.itemListElement.length) {
              node.itemListElement = filtered.map((item, index) => ({
                ...item,
                position: index + 1
              }));
              node.numberOfItems = filtered.length;
              changed = true;
            }
          });
          if (changed) script.textContent = JSON.stringify(data);
        } catch {
          // Leave unrelated structured data untouched.
        }
      });
  }

  function applyCatalogHealth(data, label, lang) {
    const section = ensureHealthPanel(label);
    if (!section) return;

    section.dataset.healthState =
      data?.summary?.inactive > 0
        ? "attention"
        : data?.summary?.warning > 0
          ? "warning"
          : "healthy";

    setText(
      section.querySelector("[data-health-summary]"),
      interpolate(label.linksActive, {
        active: data.summary.active,
        total: data.summary.totalChecks
      })
    );
    setText(
      section.querySelector("[data-health-time]"),
      interpolate(label.lastRun, {
        date: formatUtc(data.generatedAt, lang, true)
      })
    );
    setText(
      section.querySelector("[data-health-rate]"),
      interpolate(label.rateValue, {
        rate: Number(data.exchangeRate.cnyPerUsd).toFixed(4)
      })
    );
    setText(
      section.querySelector("[data-health-rate-source]"),
      interpolate(label.rateSource, {
        date: formatUtc(data.exchangeRate.sourcePublishedAt, lang, false)
      })
    );

    const productByUrl = new Map(
      (data.products ?? []).map((product) => [
        normalizeUrl(product.url),
        product
      ])
    );
    const inactiveUrls = new Set(
      (data.products ?? [])
        .filter((product) => product.state === "inactive")
        .map((product) => normalizeUrl(product.url))
    );
    const productGrid = document.querySelector(".product-grid");
    document.querySelectorAll(".product-card").forEach((card) => {
      const link = card.querySelector(".product-image[href]");
      const product = link && productByUrl.get(normalizeUrl(link.href));
      if (!product) return;

      card.dataset.catalogState = product.state;
      card.hidden = product.state === "inactive";
      card.setAttribute(
        "aria-hidden",
        product.state === "inactive" ? "true" : "false"
      );
      const chip = card.querySelector(".checked-chip");
      if (chip) {
        setText(
          chip,
          product.state === "active"
            ? label.checked
            : product.state === "warning"
              ? label.rechecking
              : label.hidden
        );
        chip.title = interpolate(label.lastRun, {
          date: formatUtc(product.checkedAt, lang, true)
        });
      }
      const price = card.querySelector(".product-meta span:last-child");
      if (price && Number.isFinite(Number(product.usdEstimate))) {
        setText(
          price,
          `${label.approximate} $${Number(product.usdEstimate).toFixed(2)}`
        );
      }
      if (product.state === "warning" && productGrid) {
        productGrid.appendChild(card);
      }
    });

    document.querySelectorAll(".panel-products a[href]").forEach((link) => {
      const product = productByUrl.get(normalizeUrl(link.href));
      if (!product) return;
      link.hidden = product.state === "inactive";
      const price = link.querySelector("em");
      if (price && Number.isFinite(Number(product.usdEstimate))) {
        setText(price, `$${Number(product.usdEstimate).toFixed(2)}`);
      }
    });

    const checkedMetric = document.querySelector(".hero-metrics strong");
    if (checkedMetric) {
      setText(checkedMetric, String(data.summary.activeProducts));
    }
    updateStructuredProductList(inactiveUrls);
  }

  function loadCatalogHealth(label, lang) {
    if (!ensureHealthPanel(label)) return;
    if (catalogHealthSnapshot) {
      applyCatalogHealth(catalogHealthSnapshot, label, lang);
      return;
    }
    if (document.documentElement.dataset.catalogHealthFetch === "started") {
      return;
    }
    document.documentElement.dataset.catalogHealthFetch = "started";

    fetch("/data/catalog-health.json", { cache: "no-store" })
      .then((response) => {
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        return response.json();
      })
      .then((data) => {
        catalogHealthSnapshot = data;
        applyCatalogHealth(data, label, lang);
      })
      .catch(() => {
        const section = ensureHealthPanel(label);
        if (!section) return;
        section.dataset.healthState = "unavailable";
        setText(section.querySelector("[data-health-summary]"), label.unavailable);
      });
  }


  const localizedShippingCards = {"de":{"count":"Vier recherchierte Langartikel zu Spreadsheet-Prüfung, QC-Entscheidungen, Versandkalkulation und gemischten Kundenerfahrungen.","html":"<article data-shipping-calculator-card=\"true\"><span class=\"article-index\">04</span><p>VERSANDKOSTEN-RECHNER · 12 MIN.</p><h3>OOPBUY Versandkosten-Rechner: Paketkosten besser schätzen</h3><span>Realistische Gewichts- und Maßangaben nutzen, abrechenbares Gewicht verstehen und Vorverpacken gezielt einsetzen.</span><a href=\"/de/articles/oopbuy-shipping-calculator-estimate/\">Ratgeber lesen <i>→</i></a></article>","href":"/de/articles/oopbuy-shipping-calculator-estimate/"},"fr":{"count":"Quatre articles approfondis sur les liens, le QC, l’estimation de livraison et les retours clients mixtes.","html":"<article data-shipping-calculator-card=\"true\"><span class=\"article-index\">04</span><p>CALCULATEUR DE LIVRAISON · 12 MIN</p><h3>Calculateur OOPBUY : mieux estimer le coût d’un colis</h3><span>Utiliser des données réalistes, comprendre le poids facturable et choisir le pré-emballage pour une raison précise.</span><a href=\"/fr/articles/oopbuy-shipping-calculator-estimate/\">Lire le guide <i>→</i></a></article>","href":"/fr/articles/oopbuy-shipping-calculator-estimate/"},"es":{"count":"Cuatro artículos extensos sobre enlaces, decisiones QC, cálculo de envío y experiencias mixtas.","html":"<article data-shipping-calculator-card=\"true\"><span class=\"article-index\">04</span><p>CALCULADORA DE ENVÍO · 12 MIN</p><h3>Calculadora OOPBUY: estima mejor el coste del paquete</h3><span>Usa entradas realistas, entiende el peso facturable y decide cuándo el embalaje de prueba mejora la estimación.</span><a href=\"/es/articles/oopbuy-shipping-calculator-estimate/\">Leer guía <i>→</i></a></article>","href":"/es/articles/oopbuy-shipping-calculator-estimate/"},"it":{"count":"Quattro articoli approfonditi su link, decisioni QC, calcolo della spedizione ed esperienze miste.","html":"<article data-shipping-calculator-card=\"true\"><span class=\"article-index\">04</span><p>CALCOLATORE SPEDIZIONE · 12 MIN</p><h3>Calcolatore OOPBUY: stimare meglio i costi del pacco</h3><span>Usa dati realistici, comprendi il peso addebitabile e scegli il pre-imballaggio quando riduce una vera incertezza.</span><a href=\"/it/articles/oopbuy-shipping-calculator-estimate/\">Leggi la guida <i>→</i></a></article>","href":"/it/articles/oopbuy-shipping-calculator-estimate/"}};

  function ensureLocalizedShippingCard(lang) {
    const data = localizedShippingCards[lang];
    if (!data) return;
    const section = document.querySelector(".journal-section");
    if (!section) return;
    const summary = section.querySelector(".section-heading--split > p");
    setText(summary, data.count);
    const grid = section.querySelector(".article-grid");
    if (grid && !grid.querySelector('a[href="' + data.href + '"]')) {
      grid.insertAdjacentHTML("beforeend", data.html);
    }
  }

  function forceStaticArticleNavigation() {
    if (document.documentElement.dataset.staticArticleNavigation === "true") return;
    document.documentElement.dataset.staticArticleNavigation = "true";
    document.addEventListener("click", (event) => {
      const link = event.target.closest && event.target.closest("a");
      if (!link || event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const url = new URL(link.href, location.href);
      if (url.origin !== location.origin) return;
      if (!/^\/(?:de\/|fr\/|es\/|it\/)?articles\/[^/]+\/$/.test(url.pathname)) return;
      event.preventDefault();
      location.assign(url.href);
    }, true);
  }

  function enhance() {
    const lang = pageLanguage();
    const label = labels[lang];
    addAboutLink(document.querySelector(".desktop-nav"), label.about);
    addAboutLink(document.querySelector(".mobile-menu nav"), label.about);
    addFooter(label);
    addArticleByline(label);
    ensureHomeTrustCopy(label);
    loadCatalogHealth(label, lang);
    ensureLocalizedShippingCard(pageLanguage());
    forceStaticArticleNavigation();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", enhance, { once: true });
  } else {
    enhance();
  }

  let enhanceScheduled = false;
  const observer = new MutationObserver(() => {
    if (enhanceScheduled) return;
    enhanceScheduled = true;
    requestAnimationFrame(() => {
      enhanceScheduled = false;
      enhance();
    });
  });
  observer.observe(document.documentElement, { childList: true, subtree: true });
})();
