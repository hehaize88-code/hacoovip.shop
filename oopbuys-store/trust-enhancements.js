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

  function enhance() {
    const label = labels[pageLanguage()];
    addAboutLink(document.querySelector(".desktop-nav"), label.about);
    addAboutLink(document.querySelector(".mobile-menu nav"), label.about);
    addFooter(label);
    addArticleByline(label);
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
