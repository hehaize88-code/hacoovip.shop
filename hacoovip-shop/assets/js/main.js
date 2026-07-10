(() => {
  const LANGS = {
    "zh-CN": { label: "简体中文", prefix: "" },
    en: { label: "English", prefix: "en" },
    es: { label: "Español", prefix: "es" },
    fr: { label: "Français", prefix: "fr" },
    de: { label: "Deutsch", prefix: "de" },
    it: { label: "Italiano", prefix: "it" },
    pt: { label: "Português", prefix: "pt" },
    pl: { label: "Polski", prefix: "pl" },
    nl: { label: "Nederlands", prefix: "nl" }
  };

  const PREFIX_TO_LANG = Object.fromEntries(Object.entries(LANGS).filter(([, v]) => v.prefix).map(([k, v]) => [v.prefix, k]));
  const LOCALIZED_PAGES = new Set(["", "index.html", "categories.html", "trending.html", "seo-articles.html", "quality-control-guide.html", "faq.html"]);
  const ARTICLE_PAGES = new Set([
    "reverse-shopping-guide.html",
    "hacoo-spreadsheet-2026-guide.html",
    "hacoo-qc-photos-guide.html",
    "hacoo-reverse-image-search-workflow.html"
  ]);

  function getPathInfo() {
    const parts = location.pathname.replace(/^\/+|\/+$/g, "").split("/").filter(Boolean);
    const first = parts[0] || "";
    const currentLang = PREFIX_TO_LANG[first] || "zh-CN";
    const slug = currentLang === "zh-CN" ? (parts.join("/") || "") : (parts.slice(1).join("/") || "");
    return { currentLang, slug };
  }

  function buildLangUrl(targetLang) {
    const { slug } = getPathInfo();
    const cleanSlug = slug === "index.html" ? "" : slug;

    if (targetLang === "zh-CN") {
      return cleanSlug ? `/${cleanSlug}` : "/";
    }

    const prefix = LANGS[targetLang]?.prefix;
    if (!prefix) return "/";

    if (LOCALIZED_PAGES.has(cleanSlug)) {
      return cleanSlug ? `/${prefix}/${cleanSlug}` : `/${prefix}/`;
    }

    if (ARTICLE_PAGES.has(cleanSlug)) {
      return `/${prefix}/seo-articles.html`;
    }

    return `/${prefix}/`;
  }

  function setupMenu() {
    const menu = document.querySelector("[data-menu]");
    const links = document.querySelector(".navlinks");
    if (menu && links) menu.addEventListener("click", () => links.classList.toggle("open"));
  }

  function rewriteLocalizedLinks() {
    const { currentLang } = getPathInfo();
    if (currentLang === "zh-CN") return;

    const rewrites = {
      "../index.html": "./",
      "../categories.html": "categories.html",
      "../trending.html": "trending.html",
      "../seo-articles.html": "seo-articles.html",
      "../quality-control-guide.html": "quality-control-guide.html",
      "../faq.html": "faq.html",
      "../reverse-shopping-guide.html": "seo-articles.html",
      "../hacoo-spreadsheet-2026-guide.html": "seo-articles.html",
      "../hacoo-qc-photos-guide.html": "seo-articles.html",
      "../hacoo-reverse-image-search-workflow.html": "seo-articles.html"
    };

    document.querySelectorAll("a[href]").forEach((a) => {
      const href = a.getAttribute("href");
      if (rewrites[href]) a.setAttribute("href", rewrites[href]);
    });
  }

  function setupLanguageSwitcher() {
    const { currentLang } = getPathInfo();
    document.documentElement.lang = currentLang;

    const currentLabel = document.querySelector("[data-current-lang]");
    if (currentLabel) currentLabel.textContent = LANGS[currentLang]?.label || "简体中文";

    const langBox = document.querySelector(".lang");
    const langBtn = document.querySelector(".langBtn");
    if (!langBox || !langBtn) return;

    langBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      langBox.classList.toggle("open");
    });

    document.addEventListener("click", (e) => {
      if (!langBox.contains(e.target)) langBox.classList.remove("open");
    });

    document.querySelectorAll("[data-lang]").forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.lang === currentLang);
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        const nextLang = btn.dataset.lang;
        const nextUrl = buildLangUrl(nextLang);
        location.href = nextUrl;
      });
    });
  }

  function addJsonLd(obj) {
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.textContent = JSON.stringify(obj);
    document.head.appendChild(script);
  }

  function setupStructuredData() {
    const { slug } = getPathInfo();
    const cleanSlug = slug || "index.html";
    const url = location.origin + location.pathname;
    const siteName = "Hacoo VIP";

    const pageTitles = {
      "index.html": "Hacoo VIP Spreadsheet for China Shopping Finds",
      "seo-articles.html": "Hacoo VIP SEO Articles",
      "faq.html": "Hacoo VIP FAQ",
      "quality-control-guide.html": "Hacoo VIP QC Guide",
      "categories.html": "Hacoo VIP Categories",
      "trending.html": "Hacoo VIP Trending Products",
      "reverse-shopping-guide.html": "Hacoo VIP Reverse Shopping Guide 2026",
      "hacoo-spreadsheet-2026-guide.html": "Hacoo Spreadsheet 2026 Guide",
      "hacoo-qc-photos-guide.html": "Hacoo QC Photos Guide",
      "hacoo-reverse-image-search-workflow.html": "Hacoo Reverse Image Search Workflow"
    };

    const headline = document.querySelector("h1")?.textContent?.trim() || pageTitles[cleanSlug] || siteName;
    const description = document.querySelector("meta[name='description']")?.content || "Independent Hacoo VIP shopping discovery and product research guide.";

    addJsonLd({
      "@context": "https://schema.org",
      "@type": "Organization",
      "@id": "https://hacoovip.shop/#organization",
      name: "Hacoo VIP",
      url: "https://hacoovip.shop/",
      description: "Independent shopping discovery and product research guide. Not the official Hacoo app website.",
      logo: "https://hacoovip.shop/assets/img/hacoo-logo.svg"
    });

    addJsonLd({
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": "https://hacoovip.shop/#website",
      name: siteName,
      url: "https://hacoovip.shop/",
      publisher: { "@id": "https://hacoovip.shop/#organization" },
      inLanguage: document.documentElement.lang || "zh-CN"
    });

    addJsonLd({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://hacoovip.shop/" },
        { "@type": "ListItem", position: 2, name: headline, item: url }
      ]
    });

    addJsonLd({
      "@context": "https://schema.org",
      "@type": cleanSlug === "seo-articles.html" ? "CollectionPage" : "WebPage",
      "@id": `${url}#webpage`,
      url,
      name: headline,
      description,
      isPartOf: { "@id": "https://hacoovip.shop/#website" },
      publisher: { "@id": "https://hacoovip.shop/#organization" },
      inLanguage: document.documentElement.lang || "zh-CN"
    });

    if (cleanSlug === "faq.html") {
      const questions = Array.from(document.querySelectorAll(".faqCard")).slice(0, 12).map((card) => ({
        "@type": "Question",
        name: card.querySelector("h3")?.textContent?.trim() || "Question",
        acceptedAnswer: {
          "@type": "Answer",
          text: card.querySelector("p")?.textContent?.trim() || "Answer"
        }
      }));
      if (questions.length) addJsonLd({ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: questions });
    }

    if (ARTICLE_PAGES.has(cleanSlug)) {
      addJsonLd({
        "@context": "https://schema.org",
        "@type": "Article",
        headline,
        description,
        url,
        datePublished: "2026-07-10",
        dateModified: "2026-07-10",
        author: { "@type": "Organization", name: "Hacoo VIP" },
        publisher: { "@id": "https://hacoovip.shop/#organization" },
        inLanguage: document.documentElement.lang || "en"
      });
    }

    if (cleanSlug === "seo-articles.html" || document.querySelector(".articleList, .articleGrid")) {
      const items = Array.from(document.querySelectorAll(".articleCard[href]")).slice(0, 10).map((card, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: new URL(card.getAttribute("href"), location.href).href,
        name: card.querySelector("h3")?.textContent?.trim() || `Article ${index + 1}`
      }));
      if (items.length) addJsonLd({ "@context": "https://schema.org", "@type": "ItemList", itemListElement: items });
    }
  }

  document.addEventListener("DOMContentLoaded", () => {
    setupMenu();
    rewriteLocalizedLinks();
    setupLanguageSwitcher();
    setupStructuredData();
  });
})();
