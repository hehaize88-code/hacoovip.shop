import type { Metadata } from "next";
import { articleHref, articleSlugs, copies, languages, pageHref, type ArticleSlug, type Lang, type PageKey } from "./site-data";

const origin = "https://sheet-hipobuy.net";
const ogImage = { url: `${origin}/og-image.svg`, width: 1200, height: 630, alt: "Hipobuy Spreadsheet 2026" };

const pageSeoTitles: Record<Lang, Record<PageKey, string>> = {
  en: { home: "Hipobuy Spreadsheet 2026 | Verified Product Links", spreadsheet: "Hipobuy Spreadsheet | Searchable Product Links", categories: "Hipobuy Product Categories | Shoes, Shirts & More", qc: "Hipobuy QC Photos Guide | Warehouse Checklist", shipping: "Hipobuy Shipping Cost & Parcel Planning Guide", faq: "Hipobuy FAQ | QC, Storage, Shipping & Returns", articles: "Hipobuy Buying Guides | Spreadsheet, QC & Shipping" },
  de: { home: "Hipobuy Spreadsheet 2026 | Geprüfte Produktlinks", spreadsheet: "Hipobuy Spreadsheet | Durchsuchbare Produktlinks", categories: "Hipobuy Produktkategorien | Schuhe, Shirts & mehr", qc: "Hipobuy QC-Fotos | Warehouse-Checkliste", shipping: "Hipobuy Versandkosten & Paketplanung", faq: "Hipobuy FAQ | QC, Lagerung, Versand & Rückgabe", articles: "Hipobuy Kaufratgeber | Spreadsheet, QC & Versand" },
  es: { home: "Hipobuy Spreadsheet 2026 | Enlaces de productos verificados", spreadsheet: "Hipobuy Spreadsheet | Enlaces de productos buscables", categories: "Categorías de productos Hipobuy | Zapatillas, camisetas y más", qc: "Fotos QC de Hipobuy | Lista de revisión del almacén", shipping: "Coste de envío Hipobuy | Guía de planificación del paquete", faq: "FAQ de Hipobuy | QC, almacenamiento, envíos y devoluciones", articles: "Guías de compra Hipobuy | Spreadsheet, QC y envíos" },
  it: { home: "Lista Hipobuy 2026 | Prodotti e link verificati", spreadsheet: "Hipobuy Spreadsheet | Link prodotto ricercabili", categories: "Categorie prodotti Hipobuy | Scarpe, maglie e altro", qc: "Foto QC Hipobuy | Checklist del magazzino", shipping: "Costi spedizione Hipobuy 2026 | Peso, volume e dogana", faq: "FAQ Hipobuy | QC, deposito, spedizioni e resi", articles: "Guide all'acquisto Hipobuy | Spreadsheet, QC e spedizioni" },
  pl: { home: "Hipobuy Spreadsheet 2026 | Zweryfikowane linki produktów", spreadsheet: "Hipobuy Spreadsheet | Wyszukiwalne linki produktów", categories: "Kategorie produktów Hipobuy | Buty, koszulki i więcej", qc: "Zdjęcia QC Hipobuy | Lista kontroli magazynu", shipping: "Koszt wysyłki Hipobuy | Planowanie paczki", faq: "FAQ Hipobuy | QC, magazyn, wysyłka i zwroty", articles: "Przewodniki zakupowe Hipobuy | Spreadsheet, QC i wysyłka" },
};

export function pageMetadata(lang: Lang, page: PageKey): Metadata {
  const copy = copies[lang];
  const title = pageSeoTitles[lang][page];
  const description = page === "home" ? copy.home.lead : copy.pages[page].intro;
  const canonical = `${origin}${pageHref(lang, page)}`;
  const alternates = Object.fromEntries(languages.map((item) => [item.code, `${origin}${pageHref(item.code, page)}`]));
  const locale = lang === "de" ? "de_DE" : lang === "es" ? "es_ES" : lang === "it" ? "it_IT" : lang === "pl" ? "pl_PL" : "en_US";
  return { title, description, alternates: { canonical, languages: { ...alternates, "x-default": `${origin}${pageHref("en", page)}` } }, openGraph: { type: "website", title, description, url: canonical, siteName: "Hipobuy Sheet", locale, images: [ogImage] }, twitter: { card: "summary_large_image", title, description, images: [ogImage.url] }, robots: { index: true, follow: true } };
}

export function articleMetadata(lang: Lang, slug: ArticleSlug): Metadata {
  const index = articleSlugs.indexOf(slug);
  const article = copies[lang].articles[index];
  const canonical = `${origin}${articleHref(lang, slug)}`;
  const alternates = Object.fromEntries(languages.map((item) => [item.code, `${origin}${articleHref(item.code, slug)}`]));
  const locale = lang === "de" ? "de_DE" : lang === "es" ? "es_ES" : lang === "it" ? "it_IT" : lang === "pl" ? "pl_PL" : "en_US";
  return { title: article[1], description: article[2], alternates: { canonical, languages: { ...alternates, "x-default": `${origin}${articleHref("en", slug)}` } }, openGraph: { type: "article", title: article[1], description: article[2], url: canonical, siteName: "Hipobuy Sheet", locale, images: [ogImage] }, twitter: { card: "summary_large_image", title: article[1], description: article[2], images: [ogImage.url] }, robots: { index: true, follow: true } };
}
