import { BUILD_LANGUAGE, SITE_LANGUAGES, languageUrl } from "./routing";
import { translate } from "./i18n";

const OPEN_GRAPH_LOCALES = {
  en: "en_US",
  pl: "pl_PL",
  es: "es_ES",
  de: "de_DE",
  ro: "ro_RO",
};

const CORE_PAGE_SEO = {
  en: {
    "/": {
      title: "FindQC Pro: QC Finder & Product Search Guide (2026)",
      description: "Search 108 mapped products, learn how to find QC photos by link, image or keyword, and check warehouse evidence before shipping.",
    },
    "/products": {
      title: "Product Finder: 108 Mapped Listings",
      description: "Search 108 mapped products across nine categories, open exact source pages, and use practical QC checks before approving shipment.",
    },
    "/categories": {
      title: "QC Product Categories: Shoes, Hoodies & More",
      description: "Browse shoes, hoodies, T-shirts, jackets, pants, headwear, accessories, jerseys and electronics with category-specific QC checks.",
    },
    "/guides": {
      title: "FindQC Search: Link, Image & Keyword Guide",
      description: "Learn when to use FindQC link, image or keyword search, how to verify results, and what QC photos can and cannot prove.",
    },
    "/articles": {
      title: "QC Photo & Shopping Agent Guides",
      description: "Read fact-checked guides to FindQC search, product signals, warehouse QC photos and shopping-agent decisions before shipment.",
    },
    "/faq": {
      title: "FindQC FAQ: Search, QC Photos & Agents",
      description: "Get clear answers about FindQC search methods, QC photo sources, reviews, hauls, removed listings and shopping-agent limits.",
    },
  },
  pl: {
    "/": {
      title: "FindQC Pro: wyszukiwarka i zdjęcia QC (2026)",
      description: "Znajdź zdjęcia QC linkiem, obrazem lub słowem, przeszukaj 108 produktów i sprawdź dowody magazynowe przed wysyłką.",
    },
    "/products": {
      title: "Wyszukiwarka produktów: 108 przypisanych ofert",
      description: "Przeszukaj 108 produktów w dziewięciu kategoriach, otwieraj dokładne strony źródłowe i wykonaj kontrolę QC przed wysyłką.",
    },
    "/categories": {
      title: "Kategorie QC: buty, bluzy i więcej",
      description: "Przeglądaj buty, bluzy, koszulki, kurtki, spodnie, nakrycia głowy, akcesoria, koszulki sportowe i elektronikę z listami QC.",
    },
    "/guides": {
      title: "FindQC: wyszukiwanie linkiem, obrazem i słowem",
      description: "Sprawdź, kiedy używać wyszukiwania FindQC linkiem, obrazem lub słowem, jak weryfikować wyniki i jakie są granice zdjęć QC.",
    },
    "/articles": {
      title: "Poradniki zdjęć QC i agentów zakupowych",
      description: "Czytaj sprawdzone poradniki o wyszukiwaniu FindQC, sygnałach produktów, zdjęciach magazynowych QC i decyzjach przed wysyłką.",
    },
    "/faq": {
      title: "FindQC FAQ: wyszukiwanie, zdjęcia QC i agenci",
      description: "Poznaj odpowiedzi o metodach wyszukiwania FindQC, źródłach zdjęć QC, recenzjach, paczkach i ograniczeniach agentów zakupowych.",
    },
  },
  es: {
    "/": {
      title: "QC Finder: guía y búsqueda de productos (2026)",
      description: "Busca entre 108 productos mapeados, compara enlaces de origen exactos y usa listas prácticas de fotos QC antes de aprobar un paquete.",
    },
    "/products": {
      title: "Buscador de productos: 108 listados mapeados",
      description: "Busca 108 productos en nueve categorías, abre las páginas de origen exactas y aplica controles QC prácticos antes del envío.",
    },
    "/categories": {
      title: "Categorías QC: zapatillas, sudaderas y más",
      description: "Explora zapatillas, sudaderas, camisetas, chaquetas, pantalones, gorras, accesorios, equipaciones y electrónica con controles QC.",
    },
    "/guides": {
      title: "FindQC: guía de búsqueda por enlace, imagen y texto",
      description: "Aprende cuándo usar la búsqueda de FindQC por enlace, imagen o palabras, cómo verificar resultados y los límites de las fotos QC.",
    },
    "/articles": {
      title: "Guías de fotos QC y agentes de compra",
      description: "Consulta guías verificadas sobre búsqueda FindQC, señales de producto, fotos QC de almacén y decisiones antes del envío.",
    },
    "/faq": {
      title: "FindQC FAQ: búsqueda, fotos QC y agentes",
      description: "Resuelve dudas sobre métodos de búsqueda FindQC, fuentes de fotos QC, reseñas, paquetes y límites de los agentes de compra.",
    },
  },
  de: {
    "/": {
      title: "QC Finder: Ratgeber & Produktsuche (2026)",
      description: "Durchsuche 108 zugeordnete Produktangebote, vergleiche exakte Quelllinks und nutze praktische QC-Fotochecklisten vor der Paketfreigabe.",
    },
    "/products": {
      title: "Produktsuche: 108 zugeordnete Angebote",
      description: "Durchsuche 108 Produkte in neun Kategorien, öffne exakte Quellseiten und nutze praktische QC-Prüfungen vor dem Versand.",
    },
    "/categories": {
      title: "QC-Kategorien: Schuhe, Hoodies & mehr",
      description: "Entdecke Schuhe, Hoodies, T-Shirts, Jacken, Hosen, Kopfbedeckungen, Accessoires, Trikots und Elektronik mit passenden QC-Checks.",
    },
    "/guides": {
      title: "FindQC-Suche: Link-, Bild- & Stichwort-Ratgeber",
      description: "Erfahre, wann die FindQC-Suche per Link, Bild oder Stichwort passt, wie du Ergebnisse prüfst und welche Grenzen QC-Fotos haben.",
    },
    "/articles": {
      title: "QC-Foto- & Shopping-Agent-Ratgeber",
      description: "Lies geprüfte Ratgeber zu FindQC-Suche, Produktsignalen, Lager-QC-Fotos und Entscheidungen vor dem Versand.",
    },
    "/faq": {
      title: "FindQC FAQ: Suche, QC-Fotos & Agenten",
      description: "Klare Antworten zu FindQC-Suchmethoden, Quellen von QC-Fotos, Bewertungen, Paketen und Grenzen von Shopping-Agenten.",
    },
  },
  ro: {
    "/": {
      title: "QC Finder: ghid și căutare de produse (2026)",
      description: "Caută în 108 produse asociate, compară linkurile-sursă exacte și folosește liste practice pentru poze QC înainte de aprobarea coletului.",
    },
    "/products": {
      title: "Căutare produse: 108 listări asociate",
      description: "Caută 108 produse din nouă categorii, deschide paginile-sursă exacte și aplică verificări QC practice înainte de expediere.",
    },
    "/categories": {
      title: "Categorii QC: pantofi, hanorace și altele",
      description: "Explorează pantofi, hanorace, tricouri, jachete, pantaloni, pălării, accesorii, echipamente și electronice cu verificări QC.",
    },
    "/guides": {
      title: "FindQC: ghid de căutare după link, imagine și cuvinte",
      description: "Află când să folosești căutarea FindQC după link, imagine sau cuvinte, cum verifici rezultatele și limitele pozelor QC.",
    },
    "/articles": {
      title: "Ghiduri pentru poze QC și agenți de cumpărături",
      description: "Citește ghiduri verificate despre căutarea FindQC, semnale de produs, poze QC din depozit și decizii înainte de expediere.",
    },
    "/faq": {
      title: "FindQC FAQ: căutare, poze QC și agenți",
      description: "Găsește răspunsuri despre metodele de căutare FindQC, sursele pozelor QC, recenzii, colete și limitele agenților de cumpărături.",
    },
  },
};

const PAGE_SEO_KEYS = {
  "/": { title: ["home.titleLine1", "home.titleLine2"], description: "home.intro" },
  "/products": { title: ["products.title1", "products.title2"], description: "products.intro" },
  "/categories": { title: ["categories.title1", "categories.title2"], description: "categories.intro" },
  "/guides": { title: ["guides.title1", "guides.title2"], description: "guides.intro" },
  "/guides/qc-photo-checklist": { title: ["checklist.title1", "checklist.title2"], description: "checklist.intro" },
  "/guides/how-to-buy": { title: ["howBuy.title1", "howBuy.title2"], description: "howBuy.intro" },
  "/articles": { title: ["articles.title1", "articles.title2"], description: "articles.intro" },
  "/faq": { title: ["faq.title1", "faq.title2"], description: "faq.intro" },
  "/about": { title: ["about.title1", "about.title2"], description: "about.intro" },
  "/contact": { title: ["contact.title1", "contact.title2"], description: "contact.intro" },
  "/privacy": { title: ["privacy.title"], description: "privacy.s1Text" },
  "/terms": { title: ["terms.title"], description: "terms.s1Text" },
};

function translatedSeo(metadata, pathname) {
  const coreSeo = CORE_PAGE_SEO[BUILD_LANGUAGE]?.[pathname];
  if (coreSeo) {
    const title = typeof metadata.title === "object" && metadata.title !== null
      ? { ...metadata.title, default: coreSeo.title.startsWith("FindQC Pro") ? coreSeo.title : `${coreSeo.title} | FindQC Pro` }
      : coreSeo.title;
    const openGraph = metadata.openGraph
      ? { ...metadata.openGraph, title: coreSeo.title, description: coreSeo.description }
      : undefined;
    const twitter = metadata.twitter
      ? { ...metadata.twitter, title: coreSeo.title, description: coreSeo.description }
      : undefined;
    return {
      ...metadata,
      title,
      description: coreSeo.description,
      ...(openGraph ? { openGraph } : {}),
      ...(twitter ? { twitter } : {}),
    };
  }

  let keys = PAGE_SEO_KEYS[pathname];
  const categoryMatch = pathname.match(/^\/categories\/([^/]+)$/);
  if (categoryMatch) {
    const slug = categoryMatch[1];
    const categoryName = translate(BUILD_LANGUAGE, `category.${slug}.name`);
    const categoryTitles = {
      en: `${categoryName} QC Photos & Inspection Checklist`,
      pl: `${categoryName}: zdjęcia QC i lista kontroli`,
      es: `${categoryName}: fotos QC y lista de inspección`,
      de: `${categoryName}: QC-Fotos & Prüfcheckliste`,
      ro: `${categoryName}: poze QC și listă de verificare`,
    };
    return {
      ...metadata,
      title: categoryTitles[BUILD_LANGUAGE],
      description: translate(BUILD_LANGUAGE, `category.${slug}.description`),
    };
  }

  if (!keys) return metadata;

  const translatedTitle = keys.title.map((key) => translate(BUILD_LANGUAGE, key)).join(" ");
  const title = typeof metadata.title === "object" && metadata.title !== null
    ? { ...metadata.title, default: translatedTitle }
    : translatedTitle;

  return {
    ...metadata,
    title,
    description: translate(BUILD_LANGUAGE, keys.description),
  };
}

export function localizedAlternates(pathname) {
  return {
    canonical: languageUrl(pathname, BUILD_LANGUAGE),
    languages: {
      ...Object.fromEntries(SITE_LANGUAGES.map((language) => [language, languageUrl(pathname, language)])),
      "x-default": languageUrl(pathname, "en"),
    },
  };
}

export function localizedMetadata(metadata, pathname) {
  metadata = translatedSeo(metadata, pathname);
  const alternates = localizedAlternates(pathname);
  const openGraph = metadata.openGraph
    ? {
        ...metadata.openGraph,
        url: alternates.canonical,
        locale: OPEN_GRAPH_LOCALES[BUILD_LANGUAGE],
        alternateLocale: SITE_LANGUAGES
          .filter((language) => language !== BUILD_LANGUAGE)
          .map((language) => OPEN_GRAPH_LOCALES[language]),
      }
    : undefined;

  return {
    ...metadata,
    alternates,
    ...(openGraph ? { openGraph } : {}),
  };
}
