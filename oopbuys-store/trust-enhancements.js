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
      method: "Research method"
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
      method: "Recherche-Methode"
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
      method: "Méthode de recherche"
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
      method: "Método de investigación"
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
      method: "Metodo di ricerca"
    }
  };

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


  const localizedShippingCards = {"de":{"count":"Vier recherchierte Langartikel zu Spreadsheet-Prüfung, QC-Entscheidungen, Versandkalkulation und gemischten Kundenerfahrungen.","html":"<article data-shipping-calculator-card=\"true\"><span class=\"article-index\">04</span><p>VERSANDKOSTEN-RECHNER · 12 MIN.</p><h3>OOPBUY Versandkosten-Rechner: Paketkosten besser schätzen</h3><span>Realistische Gewichts- und Maßangaben nutzen, abrechenbares Gewicht verstehen und Vorverpacken gezielt einsetzen.</span><a href=\"/de/articles/oopbuy-shipping-calculator-estimate/\">Ratgeber lesen <i>→</i></a></article>","href":"/de/articles/oopbuy-shipping-calculator-estimate/"},"fr":{"count":"Quatre articles approfondis sur les liens, le QC, l’estimation de livraison et les retours clients mixtes.","html":"<article data-shipping-calculator-card=\"true\"><span class=\"article-index\">04</span><p>CALCULATEUR DE LIVRAISON · 12 MIN</p><h3>Calculateur OOPBUY : mieux estimer le coût d’un colis</h3><span>Utiliser des données réalistes, comprendre le poids facturable et choisir le pré-emballage pour une raison précise.</span><a href=\"/fr/articles/oopbuy-shipping-calculator-estimate/\">Lire le guide <i>→</i></a></article>","href":"/fr/articles/oopbuy-shipping-calculator-estimate/"},"es":{"count":"Cuatro artículos extensos sobre enlaces, decisiones QC, cálculo de envío y experiencias mixtas.","html":"<article data-shipping-calculator-card=\"true\"><span class=\"article-index\">04</span><p>CALCULADORA DE ENVÍO · 12 MIN</p><h3>Calculadora OOPBUY: estima mejor el coste del paquete</h3><span>Usa entradas realistas, entiende el peso facturable y decide cuándo el embalaje de prueba mejora la estimación.</span><a href=\"/es/articles/oopbuy-shipping-calculator-estimate/\">Leer guía <i>→</i></a></article>","href":"/es/articles/oopbuy-shipping-calculator-estimate/"},"it":{"count":"Quattro articoli approfonditi su link, decisioni QC, calcolo della spedizione ed esperienze miste.","html":"<article data-shipping-calculator-card=\"true\"><span class=\"article-index\">04</span><p>CALCOLATORE SPEDIZIONE · 12 MIN</p><h3>Calcolatore OOPBUY: stimare meglio i costi del pacco</h3><span>Usa dati realistici, comprendi il peso addebitabile e scegli il pre-imballaggio quando riduce una vera incertezza.</span><a href=\"/it/articles/oopbuy-shipping-calculator-estimate/\">Leggi la guida <i>→</i></a></article>","href":"/it/articles/oopbuy-shipping-calculator-estimate/"}};

  function ensureLocalizedShippingCard(lang) {
    const data = localizedShippingCards[lang];
    if (!data) return;
    const section = document.querySelector(".journal-section");
    if (!section) return;
    const summary = section.querySelector(".section-heading--split > p");
    if (summary) summary.textContent = data.count;
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
    const label = labels[pageLanguage()];
    addAboutLink(document.querySelector(".desktop-nav"), label.about);
    addAboutLink(document.querySelector(".mobile-menu nav"), label.about);
    addFooter(label);
    addArticleByline(label);
    ensureLocalizedShippingCard(pageLanguage());
    forceStaticArticleNavigation();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", enhance, { once: true });
  } else {
    enhance();
  }

  const observer = new MutationObserver(enhance);
  observer.observe(document.documentElement, { childList: true, subtree: true });
  setTimeout(() => observer.disconnect(), 8000);
})();
