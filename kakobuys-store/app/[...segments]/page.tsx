import { SitePage } from "../site-page";
import type { Metadata } from "next";
import { longArticles } from "../article-content";
import articleTranslations from "../article-translations.json";
import { finds } from "../finds-data";
import { notFound } from "next/navigation";

const localeCodes = ["de", "fr", "es", "it", "pl", "pt", "ro"];
const allLocaleCodes = ["en", ...localeCodes];
const localizedPageSlugs = ["categories", "qc-hub", "guides", "faq", "articles", "under-25", "qc-first", "new-this-week"];

const localeSeo: Record<string, {
  suffix: string;
  homeTitle: string;
  homeDescription: string;
  description: (page: string) => string;
  pages: Record<string, string>;
}> = {
  en: {
    suffix: "Kakobuy QC Index 2026",
    homeTitle: "Kakobuy QC Guide 2026: Photo Checks, Sizing & Returns",
    homeDescription: "Use this practical Kakobuy QC guide to check warehouse photos, measurements, stitching, color and missing evidence before choosing shipping or return.",
    description: (page) => `Explore ${page} with practical photo checks, measurement guidance and visible-evidence steps for a clearer Kakobuy warehouse decision.`,
    pages: {
      categories: "Kakobuy Product Categories and Checked QC Routes",
      "qc-hub": "Kakobuy QC Checklist: Photos, Sizing and Visible Defects",
      guides: "Kakobuy QC Guides: Inspection, Evidence and Return Decisions",
      faq: "Kakobuy QC FAQ: Photos, Returns, Shipping and Storage",
      articles: "Kakobuy QC Research: Risk, Sizing and Warehouse Decisions",
      "under-25": "Kakobuy Finds Under $25: Price and QC Checks",
      "qc-first": "QC-First Kakobuy Finds: Checks Before Shipping",
      "new-this-week": "Recently Checked Kakobuy Finds",
    },
  },
  de: {
    suffix: "Kakobuy QC-Index 2026",
    homeTitle: "Kakobuy QC Guide 2026 | Fotos, Größen und Rückgaben",
    homeDescription: "Prüfe Kakobuy-Lagerfotos, Maße, Nähte, Farben und fehlende Hinweise, bevor du Versand oder Rückgabe entscheidest.",
    description: (page) => `${page} mit praktischen Fotoprüfungen, Maßhinweisen und sichtbaren Belegen für eine klarere Lagerentscheidung.`,
    pages: {categories:"Kakobuy Produktkategorien", "qc-hub":"Kakobuy QC-Checkliste", guides:"Kakobuy QC-Ratgeber", faq:"Kakobuy QC-FAQ", articles:"Kakobuy QC-Recherche und Ratgeber", "under-25":"Kakobuy Funde unter 25 US-Dollar", "qc-first":"Kakobuy Funde mit QC-Fokus", "new-this-week":"Kürzlich geprüfte Kakobuy Funde"},
  },
  fr: {
    suffix: "Index QC Kakobuy 2026",
    homeTitle: "Guide QC Kakobuy 2026 | Photos, tailles et retours",
    homeDescription: "Vérifiez photos d’entrepôt, mesures, coutures, couleurs et preuves manquantes avant de choisir expédition ou retour.",
    description: (page) => `${page} avec contrôles photo, mesures et preuves visibles pour une décision d’entrepôt plus claire.`,
    pages: {categories:"Catégories de produits Kakobuy", "qc-hub":"Liste de contrôle QC Kakobuy", guides:"Guides QC Kakobuy", faq:"FAQ QC Kakobuy", articles:"Recherche QC et guides Kakobuy", "under-25":"Sélections Kakobuy à moins de 25 $", "qc-first":"Sélections Kakobuy axées sur le QC", "new-this-week":"Sélections Kakobuy vérifiées récemment"},
  },
  es: {
    suffix: "Índice QC de Kakobuy 2026",
    homeTitle: "Guía QC de Kakobuy 2026 | Fotos, tallas y devoluciones",
    homeDescription: "Revisa fotos de almacén, medidas, costuras, color y pruebas ausentes antes de elegir envío o devolución.",
    description: (page) => `${page} con controles fotográficos, medidas y pruebas visibles para una decisión de almacén más clara.`,
    pages: {categories:"Categorías de productos Kakobuy", "qc-hub":"Lista de control QC de Kakobuy", guides:"Guías QC de Kakobuy", faq:"Preguntas frecuentes QC de Kakobuy", articles:"Investigación QC y guías de Kakobuy", "under-25":"Hallazgos Kakobuy por menos de 25 $", "qc-first":"Hallazgos Kakobuy centrados en QC", "new-this-week":"Hallazgos Kakobuy revisados recientemente"},
  },
  it: {
    suffix: "Indice QC Kakobuy 2026",
    homeTitle: "Guida QC Kakobuy 2026 | Foto, taglie e resi",
    homeDescription: "Controlla foto di magazzino, misure, cuciture, colore e prove mancanti prima di scegliere spedizione o reso.",
    description: (page) => `${page} con controlli fotografici, misure e prove visibili per una decisione di magazzino più chiara.`,
    pages: {categories:"Categorie di prodotti Kakobuy", "qc-hub":"Checklist QC Kakobuy", guides:"Guide QC Kakobuy", faq:"FAQ QC Kakobuy", articles:"Ricerca QC e guide Kakobuy", "under-25":"Selezioni Kakobuy sotto 25 $", "qc-first":"Selezioni Kakobuy orientate al QC", "new-this-week":"Selezioni Kakobuy controllate di recente"},
  },
  pl: {
    suffix: "Indeks QC Kakobuy 2026",
    homeTitle: "Poradnik QC Kakobuy 2026 | Zdjęcia, rozmiary i zwroty",
    homeDescription: "Sprawdź zdjęcia magazynowe, wymiary, szwy, kolor i brakujące dowody przed decyzją o wysyłce lub zwrocie.",
    description: (page) => `${page} z kontrolą zdjęć, wymiarów i widocznych dowodów dla lepszej decyzji magazynowej.`,
    pages: {categories:"Kategorie produktów Kakobuy", "qc-hub":"Lista kontrolna QC Kakobuy", guides:"Poradniki QC Kakobuy", faq:"FAQ QC Kakobuy", articles:"Analizy QC i poradniki Kakobuy", "under-25":"Produkty Kakobuy poniżej 25 $", "qc-first":"Produkty Kakobuy z naciskiem na QC", "new-this-week":"Ostatnio sprawdzone produkty Kakobuy"},
  },
  pt: {
    suffix: "Índice QC Kakobuy 2026",
    homeTitle: "Guia QC Kakobuy 2026 | Fotos, tamanhos e devoluções",
    homeDescription: "Verifique fotos do armazém, medidas, costuras, cor e provas em falta antes de escolher envio ou devolução.",
    description: (page) => `${page} com verificação de fotos, medidas e provas visíveis para uma decisão de armazém mais clara.`,
    pages: {categories:"Categorias de produtos Kakobuy", "qc-hub":"Lista de verificação QC Kakobuy", guides:"Guias QC Kakobuy", faq:"FAQ QC Kakobuy", articles:"Pesquisa QC e guias Kakobuy", "under-25":"Produtos Kakobuy abaixo de 25 $", "qc-first":"Produtos Kakobuy com foco em QC", "new-this-week":"Produtos Kakobuy verificados recentemente"},
  },
  ro: {
    suffix: "Index QC Kakobuy 2026",
    homeTitle: "Ghid QC Kakobuy 2026 | Fotografii, mărimi și retururi",
    homeDescription: "Verifică fotografii din depozit, măsurători, cusături, culoare și dovezi lipsă înainte de expediere sau retur.",
    description: (page) => `${page} cu verificarea fotografiilor, măsurători și dovezi vizibile pentru o decizie mai clară în depozit.`,
    pages: {categories:"Categorii de produse Kakobuy", "qc-hub":"Listă de verificare QC Kakobuy", guides:"Ghiduri QC Kakobuy", faq:"FAQ QC Kakobuy", articles:"Cercetare QC și ghiduri Kakobuy", "under-25":"Produse Kakobuy sub 25 $", "qc-first":"Produse Kakobuy axate pe QC", "new-this-week":"Produse Kakobuy verificate recent"},
  },
};

function routeContext(segments: string[]) {
  const language = localeCodes.includes(segments[0]) ? segments[0] : "en";
  const routeSegments = language === "en" ? segments : segments.slice(1);
  return { language, route: routeSegments[0] || "", routeSegments };
}

function languagePath(language: string, route = "") {
  const page = route ? `${route}/` : "";
  return language === "en" ? `/${page}` : `/${language}/${page}`;
}

export async function generateMetadata({ params }: { params: Promise<{ segments?: string[] }> }): Promise<Metadata> {
  const { segments = [] } = await params;
  const { language, route, routeSegments } = routeContext(segments);
  const articleIndex = longArticles.findIndex(item => item.slug === route);
  const article = articleIndex < 0 || (language !== "en" && articleIndex >= 3) ? undefined : language === "en"
    ? longArticles[articleIndex]
    : articleTranslations[language as keyof typeof articleTranslations][articleIndex];
  const find = language === "en" ? finds.find(item => item.slug === route) : undefined;
  if (find) return {
    title: `${find.name} | Kakobuy Finds Record`,
    description: `Independent details for ${find.name}, including category, reference price, destination record and the last-checked date.`,
    alternates: { canonical: `/${find.slug}/` },
    openGraph: { title: `${find.name} | Kakobuy Finds Record`, description: `Independent checked details for ${find.name}.`, type: "website" }
  };
  if (language === "en" && route === "finds") return {
    title: "Kakobuy Finds: 30 Checked Product Records (2026)",
    description: "Browse 30 Kakobuy finds with independent detail pages, product images, USD reference prices, destination records and last-checked dates.",
    alternates: { canonical: "/finds/" }
  };
  if (article) {
    const canonicalPath = language === "en" ? `/${article.slug}/` : `/${language}/${article.slug}/`;
    const isReturns = language === "en" && article.slug === "kakobuy-returns-after-sales-checklist";
    const isStitching = language === "en" && article.slug === "kakobuy-stitching-finish-qc-checklist";
    const isAlignment = language === "en" && article.slug === "kakobuy-alignment-symmetry-print-placement-qc";
    const canonical = isAlignment ? "https://kakobuys.store/kakobuy-alignment-symmetry-print-placement-qc/" : isStitching ? "https://kakobuys.store/kakobuy-stitching-finish-qc-checklist/" : isReturns ? "https://kakobuys.store/kakobuy-returns-after-sales-checklist/" : canonicalPath;
    return {
      title: article.seoTitle,
      description: article.seoDescription,
      robots: isReturns || isStitching || isAlignment ? { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large" } } : undefined,
      alternates: {
        canonical,
        languages: articleIndex < 3 ? {
          en: `/${article.slug}/`,
          de: `/de/${article.slug}/`,
          fr: `/fr/${article.slug}/`,
          es: `/es/${article.slug}/`,
          it: `/it/${article.slug}/`,
          pl: `/pl/${article.slug}/`,
          pt: `/pt/${article.slug}/`,
          ro: `/ro/${article.slug}/`,
          "x-default": `/${article.slug}/`
        } : { en: canonical, "x-default": canonical }
      },
      openGraph: { title: article.seoTitle, description: article.seoDescription, type: "article", url: isReturns || isStitching || isAlignment ? canonical : undefined, images: isReturns || isStitching || isAlignment ? ["https://kakobuys.store/brand/kakobuy.png"] : undefined }
    };
  }

  if (routeSegments.length > 1 || (route && !localizedPageSlugs.includes(route))) return {};
  const seo = localeSeo[language];
  const pageTitle = route ? seo.pages[route] : seo.homeTitle;
  const title = route ? `${pageTitle} | ${seo.suffix}` : seo.homeTitle;
  const description = route ? seo.description(pageTitle) : seo.homeDescription;
  const canonical = languagePath(language, route);
  const languages = Object.fromEntries(allLocaleCodes.map(code => [code, languagePath(code, route)]));
  return {
    title,
    description,
    alternates: { canonical, languages: { ...languages, "x-default": languagePath("en", route) } },
    openGraph: { title, description, type: "website", url: canonical },
  };
}

export default async function RoutedPage({ params }: { params: Promise<{ segments: string[] }> }) {
  const { segments = [] } = await params;
  const { language, route, routeSegments } = routeContext(segments);
  const localizedArticle = longArticles.slice(0, 3).some(item => item.slug === route);
  const englishOnlyRoute = language === "en" && (
    route === "finds" ||
    finds.some(item => item.slug === route) ||
    longArticles.some(item => item.slug === route)
  );
  const localizedRoute = localizedPageSlugs.includes(route) || localizedArticle;
  const localizedHome = language !== "en" && routeSegments.length === 0;

  if (!localizedHome && (routeSegments.length !== 1 || (!localizedRoute && !englishOnlyRoute))) notFound();
  return <SitePage segments={segments} />;
}
