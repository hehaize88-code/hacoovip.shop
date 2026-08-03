const CANONICAL_ORIGIN = "https://kakobuys.store";
const LANGUAGE_CODES = ["en", "de", "fr", "es", "it", "pl", "pt", "ro"];
const PAGE_SLUGS = [
  "categories",
  "qc-hub",
  "guides",
  "faq",
  "articles",
  "under-25",
  "qc-first",
  "new-this-week",
  "read-kakobuy-qc-photos",
  "kakobuy-spreadsheet-first-time-guide",
  "product-price-vs-parcel-cost",
];

const SEO = {
  en: {
    suffix: "Kakobuy QC Index 2026",
    homeTitle: "Kakobuy Spreadsheet 2026 | QC Product Index & Finds",
    homeDescription: "Explore the Kakobuy spreadsheet index with current product finds, QC-focused guides and direct routes to matching catalog records.",
    description: (page) => `Explore ${page} with practical QC checks, current product routes and clear Kakobuy spreadsheet guidance for informed browsing.`,
    pages: {
      categories: "Kakobuy Product Categories",
      "qc-hub": "Kakobuy QC Hub",
      guides: "Kakobuy Shopping Guides",
      faq: "Kakobuy Spreadsheet FAQ",
      articles: "Kakobuy SEO Articles and Research",
      "under-25": "Kakobuy Finds Under $25",
      "qc-first": "QC-First Kakobuy Finds",
      "new-this-week": "New Kakobuy Finds This Week",
      "read-kakobuy-qc-photos": "How to Read Kakobuy QC Photos",
      "kakobuy-spreadsheet-first-time-guide": "First-Time Kakobuy Spreadsheet Guide",
      "product-price-vs-parcel-cost": "Product Price vs Parcel Cost",
    },
  },
  de: {
    suffix: "Kakobuy QC-Index 2026",
    homeTitle: "Kakobuy Tabelle 2026 | QC-Produktindex und Funde",
    homeDescription: "Entdecke den Kakobuy-Tabellenindex mit aktuellen Produkten, QC-orientierten Ratgebern und direkten Wegen zu passenden Katalogeinträgen.",
    description: (page) => `Entdecke ${page} mit praktischen QC-Prüfungen, aktuellen Produktwegen und klaren Kakobuy-Tabellenhinweisen für fundierte Entscheidungen.`,
    pages: {
      categories: "Kakobuy Produktkategorien",
      "qc-hub": "Kakobuy QC-Zentrale",
      guides: "Kakobuy Einkaufsratgeber",
      faq: "Kakobuy Tabellen-FAQ",
      articles: "Kakobuy SEO-Artikel und Recherchen",
      "under-25": "Kakobuy Funde unter 25 US-Dollar",
      "qc-first": "Kakobuy Funde mit QC-Fokus",
      "new-this-week": "Neue Kakobuy Funde dieser Woche",
      "read-kakobuy-qc-photos": "Kakobuy QC-Fotos richtig lesen",
      "kakobuy-spreadsheet-first-time-guide": "Kakobuy Tabellen-Leitfaden für Einsteiger",
      "product-price-vs-parcel-cost": "Produktpreis im Vergleich zu Paketkosten",
    },
  },
  fr: {
    suffix: "Index QC Kakobuy 2026",
    homeTitle: "Tableau Kakobuy 2026 | Index produits QC et sélections",
    homeDescription: "Explorez l’index du tableau Kakobuy avec des produits actuels, des guides centrés sur le QC et des liens directs vers les fiches correspondantes.",
    description: (page) => `Explorez ${page} avec des contrôles QC pratiques, des parcours produit actuels et des conseils clairs sur le tableau Kakobuy.`,
    pages: {
      categories: "Catégories de produits Kakobuy",
      "qc-hub": "Centre QC Kakobuy",
      guides: "Guides d’achat Kakobuy",
      faq: "FAQ du tableau Kakobuy",
      articles: "Articles SEO et recherches Kakobuy",
      "under-25": "Sélections Kakobuy à moins de 25 $",
      "qc-first": "Sélections Kakobuy axées sur le QC",
      "new-this-week": "Nouvelles sélections Kakobuy de la semaine",
      "read-kakobuy-qc-photos": "Comment lire les photos QC Kakobuy",
      "kakobuy-spreadsheet-first-time-guide": "Guide du tableau Kakobuy pour débutants",
      "product-price-vs-parcel-cost": "Prix du produit et coût du colis",
    },
  },
  es: {
    suffix: "Índice QC de Kakobuy 2026",
    homeTitle: "Hoja Kakobuy 2026 | Índice de productos QC y hallazgos",
    homeDescription: "Explora el índice de la hoja Kakobuy con productos actuales, guías centradas en QC y enlaces directos a los registros correspondientes.",
    description: (page) => `Explora ${page} con controles QC prácticos, rutas de producto actuales y orientación clara sobre la hoja Kakobuy.`,
    pages: {
      categories: "Categorías de productos Kakobuy",
      "qc-hub": "Centro QC de Kakobuy",
      guides: "Guías de compra Kakobuy",
      faq: "Preguntas frecuentes de la hoja Kakobuy",
      articles: "Artículos SEO e investigación de Kakobuy",
      "under-25": "Hallazgos Kakobuy por menos de 25 $",
      "qc-first": "Hallazgos Kakobuy centrados en QC",
      "new-this-week": "Nuevos hallazgos Kakobuy de esta semana",
      "read-kakobuy-qc-photos": "Cómo leer las fotos QC de Kakobuy",
      "kakobuy-spreadsheet-first-time-guide": "Guía inicial de la hoja Kakobuy",
      "product-price-vs-parcel-cost": "Precio del producto frente al coste del paquete",
    },
  },
  it: {
    suffix: "Indice QC Kakobuy 2026",
    homeTitle: "Foglio Kakobuy 2026 | Indice prodotti QC e selezioni",
    homeDescription: "Esplora l’indice del foglio Kakobuy con prodotti attuali, guide dedicate al QC e collegamenti diretti alle schede corrispondenti.",
    description: (page) => `Esplora ${page} con controlli QC pratici, percorsi prodotto aggiornati e indicazioni chiare sul foglio Kakobuy.`,
    pages: {
      categories: "Categorie di prodotti Kakobuy",
      "qc-hub": "Centro QC Kakobuy",
      guides: "Guide agli acquisti Kakobuy",
      faq: "FAQ del foglio Kakobuy",
      articles: "Articoli SEO e ricerche Kakobuy",
      "under-25": "Selezioni Kakobuy sotto i 25 $",
      "qc-first": "Selezioni Kakobuy con priorità QC",
      "new-this-week": "Nuove selezioni Kakobuy della settimana",
      "read-kakobuy-qc-photos": "Come leggere le foto QC Kakobuy",
      "kakobuy-spreadsheet-first-time-guide": "Guida iniziale al foglio Kakobuy",
      "product-price-vs-parcel-cost": "Prezzo del prodotto e costo del pacco",
    },
  },
  pl: {
    suffix: "Indeks QC Kakobuy 2026",
    homeTitle: "Arkusz Kakobuy 2026 | Indeks produktów QC i znalezisk",
    homeDescription: "Przeglądaj indeks arkusza Kakobuy z aktualnymi produktami, poradnikami QC i bezpośrednimi odnośnikami do właściwych kart katalogowych.",
    description: (page) => `Poznaj ${page}: praktyczne kontrole QC, aktualne ścieżki produktów i jasne wskazówki dotyczące arkusza Kakobuy.`,
    pages: {
      categories: "Kategorie produktów Kakobuy",
      "qc-hub": "Centrum QC Kakobuy",
      guides: "Poradniki zakupowe Kakobuy",
      faq: "FAQ arkusza Kakobuy",
      articles: "Artykuły SEO i analizy Kakobuy",
      "under-25": "Znaleziska Kakobuy poniżej 25 USD",
      "qc-first": "Znaleziska Kakobuy z kontrolą QC",
      "new-this-week": "Nowe znaleziska Kakobuy w tym tygodniu",
      "read-kakobuy-qc-photos": "Jak czytać zdjęcia QC Kakobuy",
      "kakobuy-spreadsheet-first-time-guide": "Arkusz Kakobuy — poradnik dla początkujących",
      "product-price-vs-parcel-cost": "Cena produktu a koszt przesyłki",
    },
  },
  pt: {
    suffix: "Índice QC Kakobuy 2026",
    homeTitle: "Planilha Kakobuy 2026 | Índice de produtos QC e achados",
    homeDescription: "Explore o índice da planilha Kakobuy com produtos atuais, guias focados em QC e ligações diretas para os registos correspondentes.",
    description: (page) => `Explore ${page} com verificações QC práticas, rotas atuais de produtos e orientações claras sobre a planilha Kakobuy.`,
    pages: {
      categories: "Categorias de produtos Kakobuy",
      "qc-hub": "Central QC Kakobuy",
      guides: "Guias de compras Kakobuy",
      faq: "Perguntas frequentes da planilha Kakobuy",
      articles: "Artigos SEO e pesquisas Kakobuy",
      "under-25": "Achados Kakobuy abaixo de US$ 25",
      "qc-first": "Achados Kakobuy com foco em QC",
      "new-this-week": "Novos achados Kakobuy desta semana",
      "read-kakobuy-qc-photos": "Como ler fotos QC da Kakobuy",
      "kakobuy-spreadsheet-first-time-guide": "Guia inicial da planilha Kakobuy",
      "product-price-vs-parcel-cost": "Preço do produto e custo da encomenda",
    },
  },
  ro: {
    suffix: "Index QC Kakobuy 2026",
    homeTitle: "Tabel Kakobuy 2026 | Index produse QC și selecții",
    homeDescription: "Explorează indexul tabelului Kakobuy cu produse actuale, ghiduri axate pe QC și legături directe către înregistrările corespunzătoare.",
    description: (page) => `Explorează ${page} cu verificări QC practice, rute actuale către produse și îndrumări clare despre tabelul Kakobuy.`,
    pages: {
      categories: "Categorii de produse Kakobuy",
      "qc-hub": "Centrul QC Kakobuy",
      guides: "Ghiduri de cumpărături Kakobuy",
      faq: "Întrebări frecvente despre tabelul Kakobuy",
      articles: "Articole SEO și cercetări Kakobuy",
      "under-25": "Selecții Kakobuy sub 25 USD",
      "qc-first": "Selecții Kakobuy axate pe QC",
      "new-this-week": "Selecții Kakobuy noi în această săptămână",
      "read-kakobuy-qc-photos": "Cum să citești fotografiile QC Kakobuy",
      "kakobuy-spreadsheet-first-time-guide": "Ghidul tabelului Kakobuy pentru începători",
      "product-price-vs-parcel-cost": "Prețul produsului și costul coletului",
    },
  },
};

const canonicalPaths = new Set(["/"]);
for (const slug of PAGE_SLUGS) canonicalPaths.add(`/${slug}/`);
for (const language of LANGUAGE_CODES.slice(1)) {
  canonicalPaths.add(`/${language}/`);
  for (const slug of PAGE_SLUGS) canonicalPaths.add(`/${language}/${slug}/`);
}

function canonicalPath(pathname) {
  if (canonicalPaths.has(pathname)) return pathname;
  const withSlash = pathname.endsWith("/") ? pathname : pathname + "/";
  return canonicalPaths.has(withSlash) ? withSlash : null;
}

function pageContext(pagePath) {
  const parts = pagePath.split("/").filter(Boolean);
  const language = LANGUAGE_CODES.includes(parts[0]) && parts[0] !== "en" ? parts.shift() : "en";
  return { language, slug: parts[0] || "home" };
}

function languagePath(language, slug) {
  const page = slug === "home" ? "" : `${slug}/`;
  return language === "en" ? `/${page}` : `/${language}/${page}`;
}

function pageMetadata(language, slug) {
  const translation = SEO[language];
  if (slug === "home") {
    return { title: translation.homeTitle, description: translation.homeDescription };
  }
  const page = translation.pages[slug];
  return {
    title: `${page} | ${translation.suffix}`,
    description: translation.description(page),
  };
}

function escapeHtml(value) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function seoMarkup({ language, slug, canonicalUrl, title, description }) {
  const safeTitle = escapeHtml(title);
  const safeDescription = escapeHtml(description);
  const alternates = LANGUAGE_CODES.map((alternateLanguage) =>
    `<link rel="alternate" hreflang="${alternateLanguage}" href="${CANONICAL_ORIGIN}${languagePath(alternateLanguage, slug)}">`,
  ).join("");
  const locale = language === "en" ? "en_US" : `${language}_${language.toUpperCase()}`;
  return (
    `<title>${safeTitle}</title>` +
    `<meta name="description" content="${safeDescription}">` +
    `<link rel="canonical" href="${canonicalUrl}">` +
    alternates +
    `<link rel="alternate" hreflang="x-default" href="${CANONICAL_ORIGIN}${languagePath("en", slug)}">` +
    `<meta property="og:type" content="website">` +
    `<meta property="og:site_name" content="Kakobuy QC Index">` +
    `<meta property="og:locale" content="${locale}">` +
    `<meta property="og:title" content="${safeTitle}">` +
    `<meta property="og:description" content="${safeDescription}">` +
    `<meta property="og:url" content="${canonicalUrl}">`
  );
}

class RemoveElement {
  element(element) {
    element.remove();
  }
}

class RemovePreviewHydrationData {
  constructor() {
    this.buffer = "";
  }

  text(textChunk) {
    this.buffer += textChunk.text;
    if (!textChunk.lastInTextNode) {
      textChunk.remove();
      return;
    }
    const previewRecord = /,\[\\"\$\\",\\"meta\\",\\"\d+\\",\{\\"name\\":\\"codex-preview\\",\\"content\\":\\"development\\"\}\]/g;
    textChunk.replace(this.buffer.replace(previewRecord, ""));
    this.buffer = "";
  }
}

class PromoteFirstHeading {
  constructor() {
    this.promoted = false;
  }

  element(element) {
    if (this.promoted) return;
    element.tagName = "h1";
    this.promoted = true;
  }
}

class SetDocumentLanguage {
  constructor(language) {
    this.language = language;
  }
  element(element) {
    element.setAttribute("lang", this.language);
  }
}

class AddSeoHead {
  constructor(markup) {
    this.markup = markup;
  }

  element(element) {
    element.append(this.markup, { html: true });
  }
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const pagePath = canonicalPath(url.pathname);

    if (
      url.hostname === "www.kakobuys.store" ||
      url.hostname === "kakobuys-store.pages.dev" ||
      url.hostname.endsWith(".kakobuys-store.pages.dev")
    ) {
      return Response.redirect(CANONICAL_ORIGIN + url.pathname + url.search, 301);
    }

    if (pagePath && url.pathname !== pagePath) {
      return Response.redirect(CANONICAL_ORIGIN + pagePath + url.search, 301);
    }

    if (url.pathname === "/robots.txt") {
      return new Response("User-agent: *\nAllow: /\n\nSitemap: https://kakobuys.store/sitemap.xml\n", {
        status: 200,
        headers: {
          "Content-Type": "text/plain; charset=utf-8",
          "Cache-Control": "public, max-age=3600",
          "X-Content-Type-Options": "nosniff",
        },
      });
    }

    const response = await env.ASSETS.fetch(request);
    const headers = new Headers(response.headers);
    headers.set("X-Content-Type-Options", "nosniff");

    if (response.status === 404) {
      headers.set("X-Robots-Tag", "noindex, follow");
      return new Response(response.body, { status: 404, headers });
    }

    const contentType = headers.get("content-type") || "";
    if (!pagePath || !contentType.toLowerCase().includes("text/html")) {
      return new Response(response.body, {
        status: response.status,
        statusText: response.statusText,
        headers,
      });
    }

    headers.set("Content-Type", "text/html; charset=utf-8");
    const { language, slug } = pageContext(pagePath);
    const canonicalUrl = CANONICAL_ORIGIN + pagePath;
    const metadata = pageMetadata(language, slug);
    const htmlResponse = new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers,
    });
    const seoHead = new AddSeoHead(seoMarkup({ language, slug, canonicalUrl, ...metadata }));

    const rewriter = new HTMLRewriter()
      .on("html", new SetDocumentLanguage(language))
      .on('meta[name="codex-preview"]', new RemoveElement())
      .on("title", new RemoveElement())
      .on('meta[name="description"]', new RemoveElement())
      .on('link[rel="canonical"]', new RemoveElement())
      .on('link[rel="alternate"][hreflang]', new RemoveElement())
      .on('meta[property="og:type"]', new RemoveElement())
      .on('meta[property="og:site_name"]', new RemoveElement())
      .on('meta[property="og:locale"]', new RemoveElement())
      .on('meta[property="og:title"]', new RemoveElement())
      .on('meta[property="og:description"]', new RemoveElement())
      .on('meta[property="og:url"]', new RemoveElement())
      .on("script", new RemovePreviewHydrationData())
      .on("head", seoHead);
    if (slug === "categories") {
      rewriter.on("h2", new PromoteFirstHeading());
    }
    return rewriter.transform(htmlResponse);
  },
};
