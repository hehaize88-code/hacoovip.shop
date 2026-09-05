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
      identity: "Independent OOPBUY research and product-discovery guide. Not the official OOPBUY website. Product, category and search actions open the main catalog in a new tab.",
      catalogTarget: "Open main catalog ↗",
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
      identity: "Unabhängiger OOPBUY-Recherche- und Produktfinder; nicht die offizielle OOPBUY-Website. Produkt-, Kategorie- und Suchaktionen öffnen den Hauptkatalog in einem neuen Tab.",
      catalogTarget: "Hauptkatalog öffnen ↗",
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
      identity: "Guide indépendant de recherche et de découverte OOPBUY, distinct du site officiel OOPBUY. Les actions produit, catégorie et recherche ouvrent le catalogue principal dans un nouvel onglet.",
      catalogTarget: "Ouvrir le catalogue principal ↗",
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
      identity: "Guía independiente de investigación y descubrimiento sobre OOPBUY; no es el sitio oficial de OOPBUY. Las acciones de productos, categorías y búsqueda abren el catálogo principal en otra pestaña.",
      catalogTarget: "Abrir catálogo principal ↗",
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
      identity: "Guida indipendente di ricerca e scoperta su OOPBUY; non è il sito ufficiale OOPBUY. Le azioni per prodotti, categorie e ricerca aprono il catalogo principale in una nuova scheda.",
      catalogTarget: "Apri il catalogo principale ↗",
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
    setText(document.querySelector(".panel-footer strong"), "MAIN CATALOG");
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
  const localizedWarehouseCards = {
    en: {
      count: "Five researched long-form guides covering source links, QC decisions, shipping estimates, customer feedback and warehouse deadlines.",
      href: "/articles/oopbuy-warehouse-storage-returns/",
      html: '<article data-warehouse-storage-card="true"><span class="article-index">05</span><p>WAREHOUSE & RETURNS · 13 MIN READ</p><h3>OOPBUY Warehouse Storage and Returns: A Deadline-Safe Guide</h3><span>Separate the 120-hour return window from 90-day storage, then plan refunds, extensions and consolidation.</span><a href="/articles/oopbuy-warehouse-storage-returns/">Read guide <i>→</i></a></article>'
    },
    de: {
      count: "Fünf recherchierte Langartikel zu Links, QC, Versandkalkulation, Kundenerfahrungen und Lagerfristen.",
      href: "/de/articles/oopbuy-warehouse-storage-returns/",
      html: '<article data-warehouse-storage-card="true"><span class="article-index">05</span><p>LAGERUNG & RÜCKGABE · 13 MIN.</p><h3>OOPBUY Lagerung und Rückgabe: Fristen sicher planen</h3><span>120 Stunden Rückgabe und 90 Tage Lagerung trennen, dann Erstattung, Verlängerung und Konsolidierung planen.</span><a href="/de/articles/oopbuy-warehouse-storage-returns/">Ratgeber lesen <i>→</i></a></article>'
    },
    fr: {
      count: "Cinq articles approfondis sur les liens, le QC, la livraison, les retours clients et les délais d’entrepôt.",
      href: "/fr/articles/oopbuy-warehouse-storage-returns/",
      html: '<article data-warehouse-storage-card="true"><span class="article-index">05</span><p>STOCKAGE ET RETOURS · 13 MIN</p><h3>Stockage et retours OOPBUY : maîtriser chaque délai</h3><span>Distinguer les 120 heures de retour des 90 jours de stockage, puis planifier remboursement et consolidation.</span><a href="/fr/articles/oopbuy-warehouse-storage-returns/">Lire le guide <i>→</i></a></article>'
    },
    es: {
      count: "Cinco artículos extensos sobre enlaces, QC, cálculo de envío, experiencias y plazos de almacén.",
      href: "/es/articles/oopbuy-warehouse-storage-returns/",
      html: '<article data-warehouse-storage-card="true"><span class="article-index">05</span><p>ALMACÉN Y DEVOLUCIONES · 13 MIN</p><h3>Almacén y devoluciones OOPBUY: controla cada plazo</h3><span>Separa las 120 horas de devolución de los 90 días de almacén y planifica reembolso y consolidación.</span><a href="/es/articles/oopbuy-warehouse-storage-returns/">Leer guía <i>→</i></a></article>'
    },
    it: {
      count: "Cinque articoli approfonditi su link, QC, spedizione, esperienze e scadenze di magazzino.",
      href: "/it/articles/oopbuy-warehouse-storage-returns/",
      html: '<article data-warehouse-storage-card="true"><span class="article-index">05</span><p>MAGAZZINO E RESI · 13 MIN</p><h3>Magazzino e resi OOPBUY: gestire bene ogni scadenza</h3><span>Separa le 120 ore per il reso dai 90 giorni di deposito e pianifica rimborso e consolidamento.</span><a href="/it/articles/oopbuy-warehouse-storage-returns/">Leggi la guida <i>→</i></a></article>'
    }
  };

  const localizedRehearsalCards = {"en":{"count":"Six researched long-form guides covering source links, QC decisions, shipping estimates, warehouse deadlines and packed-parcel choices.","href":"/articles/oopbuy-rehearsal-packaging-guide/","html":"<article data-rehearsal-packaging-card=\"true\"><span class=\"article-index\">06</span><p>REHEARSAL PACKAGING · 14 MIN READ</p><h3>OOPBUY Rehearsal Packaging: Decide When It Is Worth It</h3><span>Separate packed-weight evidence from parcel photos, then pay only when the result can change a route or packaging decision.</span><a href=\"/articles/oopbuy-rehearsal-packaging-guide/\">Read guide <i>→</i></a></article>"},"de":{"count":"Sechs recherchierte Langartikel zu Links, QC, Versandkalkulation, Lagerfristen und Entscheidungen zum gepackten Paket.","href":"/de/articles/oopbuy-rehearsal-packaging-guide/","html":"<article data-rehearsal-packaging-card=\"true\"><span class=\"article-index\">06</span><p>PROBEVERPACKUNG · 14 MIN.</p><h3>OOPBUY Probeverpackung: Wann lohnt sich der Service?</h3><span>Gepackte Gewichtsdaten von Paketfotos trennen und nur zahlen, wenn das Ergebnis Route oder Verpackung ändern kann.</span><a href=\"/de/articles/oopbuy-rehearsal-packaging-guide/\">Ratgeber lesen <i>→</i></a></article>"},"fr":{"count":"Six articles approfondis sur les liens, le QC, la livraison, les délais d’entrepôt et les choix de colis emballé.","href":"/fr/articles/oopbuy-rehearsal-packaging-guide/","html":"<article data-rehearsal-packaging-card=\"true\"><span class=\"article-index\">06</span><p>EMBALLAGE D’ESSAI · 14 MIN</p><h3>Emballage d’essai OOPBUY : quand est-il utile ?</h3><span>Distinguer mesure emballée et photos, puis payer seulement si le résultat peut modifier la ligne ou le conditionnement.</span><a href=\"/fr/articles/oopbuy-rehearsal-packaging-guide/\">Lire le guide <i>→</i></a></article>"},"es":{"count":"Seis artículos extensos sobre enlaces, QC, cálculo, plazos de almacén y decisiones sobre el paquete embalado.","href":"/es/articles/oopbuy-rehearsal-packaging-guide/","html":"<article data-rehearsal-packaging-card=\"true\"><span class=\"article-index\">06</span><p>EMBALAJE DE PRUEBA · 14 MIN</p><h3>Embalaje de prueba OOPBUY: cuándo vale la pena</h3><span>Separa los datos del peso embalado de las fotos y paga solo si el resultado puede cambiar ruta o embalaje.</span><a href=\"/es/articles/oopbuy-rehearsal-packaging-guide/\">Leer guía <i>→</i></a></article>"},"it":{"count":"Sei articoli approfonditi su link, QC, calcolo, scadenze di magazzino e scelte per il pacco imballato.","href":"/it/articles/oopbuy-rehearsal-packaging-guide/","html":"<article data-rehearsal-packaging-card=\"true\"><span class=\"article-index\">06</span><p>IMBALLAGGIO DI PROVA · 14 MIN</p><h3>Imballaggio di prova OOPBUY: quando conviene</h3><span>Distingui il peso imballato dalle foto e paga solo se il risultato può cambiare rotta o confezionamento.</span><a href=\"/it/articles/oopbuy-rehearsal-packaging-guide/\">Leggi la guida <i>→</i></a></article>"}};

  const localizedShoeQcCards = {
    en: {
      count: "Seven researched long-form guides covering source links, warehouse QC, shipping estimates, deadlines, packaging and shoe checks.",
      href: "/articles/oopbuy-shoe-qc-checklist/",
      html: '<article data-shoe-qc-card="true"><span class="article-index">07</span><p>SHOE QC CHECKLIST · 13 MIN READ</p><h3>OOPBUY Shoe QC Checklist: Check Before Shipping</h3><span>Verify the pair, size evidence, return window and box choice before international shipping.</span><a href="/articles/oopbuy-shoe-qc-checklist/">Read guide <i>→</i></a></article>'
    },
    de: {
      count: "Sieben recherchierte Langartikel zu Links, Lager-QC, Versand, Fristen, Verpackung und Schuhprüfung.",
      href: "/de/articles/oopbuy-shoe-qc-checklist/",
      html: '<article data-shoe-qc-card="true"><span class="article-index">07</span><p>SCHUH-QC-CHECKLISTE · 13 MIN.</p><h3>OOPBUY Schuh-QC-Checkliste: Vor Versand richtig prüfen</h3><span>Paar, Größenbeleg, Rückgabefrist und Kartonentscheidung vor dem internationalen Versand prüfen.</span><a href="/de/articles/oopbuy-shoe-qc-checklist/">Ratgeber lesen <i>→</i></a></article>'
    },
    fr: {
      count: "Sept guides approfondis sur les liens, le QC d’entrepôt, la livraison, les délais, l’emballage et le contrôle des chaussures.",
      href: "/fr/articles/oopbuy-shoe-qc-checklist/",
      html: '<article data-shoe-qc-card="true"><span class="article-index">07</span><p>CHECKLIST QC CHAUSSURES · 13 MIN</p><h3>Checklist QC chaussures OOPBUY avant expédition</h3><span>Contrôlez la paire, la pointure, le délai de retour et la boîte avant l’expédition internationale.</span><a href="/fr/articles/oopbuy-shoe-qc-checklist/">Lire le guide <i>→</i></a></article>'
    },
    es: {
      count: "Siete guías extensas sobre enlaces, QC de almacén, envío, plazos, embalaje y revisión de zapatillas.",
      href: "/es/articles/oopbuy-shoe-qc-checklist/",
      html: '<article data-shoe-qc-card="true"><span class="article-index">07</span><p>CHECKLIST QC ZAPATILLAS · 13 MIN</p><h3>Checklist QC de zapatillas OOPBUY antes del envío</h3><span>Comprueba el par, la talla, el plazo de devolución y la caja antes del envío internacional.</span><a href="/es/articles/oopbuy-shoe-qc-checklist/">Leer guía <i>→</i></a></article>'
    },
    it: {
      count: "Sette guide approfondite su link, QC in magazzino, spedizione, scadenze, imballaggio e controllo delle scarpe.",
      href: "/it/articles/oopbuy-shoe-qc-checklist/",
      html: '<article data-shoe-qc-card="true"><span class="article-index">07</span><p>CHECKLIST QC SCARPE · 13 MIN</p><h3>Checklist QC scarpe OOPBUY prima della spedizione</h3><span>Controlla paio, taglia, finestra di reso e scatola prima della spedizione internazionale.</span><a href="/it/articles/oopbuy-shoe-qc-checklist/">Leggi guida <i>→</i></a></article>'
    }
  };

  function ensureRehearsalCard(lang) {
    const data = localizedRehearsalCards[lang];
    if (!data) return;
    const journal = document.querySelector(".journal-section");
    if (!journal) return;
    setText(journal.querySelector(".section-heading--split > p"), data.count);
    const grid = journal.querySelector(".article-grid");
    if (grid && !grid.querySelector('a[href="' + data.href + '"]')) grid.insertAdjacentHTML("beforeend", data.html);
  }

  function ensureShoeQcCard(lang) {
    const data = localizedShoeQcCards[lang];
    if (!data) return;
    const journal = document.querySelector(".journal-section");
    if (!journal) return;
    setText(journal.querySelector(".section-heading--split > p"), data.count);
    const grid = journal.querySelector(".article-grid");
    if (grid && !grid.querySelector('a[href="' + data.href + '"]')) {
      grid.insertAdjacentHTML("beforeend", data.html);
    }
  }

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

  function ensureWarehouseCard(lang) {
    const data = localizedWarehouseCards[lang];
    if (!data) return;
    const journal = document.querySelector(".journal-section");
    if (journal) {
      setText(journal.querySelector(".section-heading--split > p"), data.count);
      const grid = journal.querySelector(".article-grid");
      if (grid && !grid.querySelector('a[href="' + data.href + '"]')) {
        grid.insertAdjacentHTML("beforeend", data.html);
      }
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

  function trackCatalogActions() {
    if (document.documentElement.dataset.catalogActionTracking === "true") return;
    document.documentElement.dataset.catalogActionTracking = "true";

    const send = (eventName, params) => {
      if (typeof window.gtag === "function") {
        window.gtag("event", eventName, params);
        return;
      }
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({ event: eventName, ...params });
    };

    document.addEventListener("click", (event) => {
      const link = event.target.closest && event.target.closest("a[href]");
      if (!link) return;

      const url = new URL(link.href, location.href);
      if (!/(^|\.)cnfanshp\.com$/i.test(url.hostname)) return;

      const common = {
        link_domain: url.hostname,
        link_url: url.href,
        link_text: (link.textContent || "").trim().slice(0, 100),
        page_path: location.pathname,
        transport_type: "beacon"
      };

      send("outbound_click", common);
      if (link.closest(".product-card")) {
        send("product_click", common);
      } else if (/\/search\.html$/i.test(url.pathname)) {
        send("search_click", {
          ...common,
          search_term: url.searchParams.get("keywords") || ""
        });
      } else if (/category|classify/i.test(url.pathname + url.search)) {
        send("category_click", common);
      } else {
        send("catalog_click", common);
      }
    }, true);

    document.addEventListener("submit", (event) => {
      const form = event.target;
      if (!(form instanceof HTMLFormElement)) return;
      const action = new URL(form.action, location.href);
      if (!/(^|\.)cnfanshp\.com$/i.test(action.hostname)) return;
      const values = new FormData(form);
      send("search_submit", {
        search_term: String(values.get("keywords") || "").slice(0, 100),
        page_path: location.pathname,
        destination_domain: action.hostname,
        transport_type: "beacon"
      });
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
    ensureWarehouseCard(pageLanguage());
    ensureRehearsalCard(pageLanguage());
    ensureShoeQcCard(pageLanguage());
    forceStaticArticleNavigation();
    trackCatalogActions();
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
