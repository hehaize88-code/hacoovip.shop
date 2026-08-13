import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isArticle, isLang, isPage, SitePage, type Lang, type PageName } from "../site-page";
import { englishArticles } from "../article-content";
import { localizedArticles } from "../article-localizations";
import { indonesianArticles } from "../article-id";

type RouteProps = { params: Promise<{ path: string[] }> };
type CorePage = Exclude<PageName, "article">;

const languages: Lang[] = ["id", "en", "de", "fr", "es", "it"];
const pages = ["hot-drops", "categories", "how-it-works", "faq", "articles"] as const;
const articles = ["spreadsheet-guide", "qc-photo-checklist", "shipping-cost-guide"] as const;
const hreflang: Record<Lang, string> = { id: "id-ID", en: "en", de: "de-DE", fr: "fr-FR", es: "es-ES", it: "it-IT" };

const prefixFor = (lang: Lang) => lang === "id" ? "" : `/${lang}`;
const routeUrl = (lang: Lang, rest: string[]) => `https://superbuys.id${prefixFor(lang)}${rest.length ? `/${rest.join("/")}` : ""}/`;
const languageAlternates = (rest: string[]) => Object.fromEntries([...languages.map((lang) => [hreflang[lang], routeUrl(lang, rest)]), ["x-default", routeUrl("id", rest)]]);

export function generateStaticParams() {
  const routes: string[][] = [];
  for (const lang of languages) {
    const prefix = lang === "id" ? [] : [lang];
    if (prefix.length) routes.push(prefix);
    for (const page of pages) routes.push([...prefix, page]);
    for (const article of articles) routes.push([...prefix, "articles", article]);
  }
  return routes.map((path) => ({ path }));
}

function resolvePath(parts: string[]) {
  let lang: Lang = "id";
  let rest = parts;
  if (parts[0] && isLang(parts[0])) { lang = parts[0]; rest = parts.slice(1); }
  if (rest.length === 0) return { lang, page: "home" as PageName, rest };
  if (rest[0] === "articles" && rest[1] && isArticle(rest[1]) && rest.length === 2) return { lang, page: "article" as PageName, article: rest[1], rest };
  if (rest.length === 1 && isPage(rest[0])) return { lang, page: rest[0], rest };
  return null;
}

const pageMeta: Record<Lang, Record<CorePage, {title:string;description:string}>> = {
  id: {
    home:{title:"Superbuy Indonesia 2026: Produk, Foto QC & Panduan Pengiriman",description:"Panduan Superbuy Indonesia untuk menemukan produk aktif, memeriksa foto QC, memahami biaya, dan merencanakan pengiriman paket ke Indonesia."},
    "hot-drops":{title:"Temuan Produk Superbuy Terbaru 2026 | Superbuy Indonesia",description:"Buka temuan produk terbaru dengan nama, foto listing, harga perkiraan, dan tautan detail yang sudah dipetakan ke situs utama."},
    categories:{title:"Kategori Produk Superbuy Indonesia: Sepatu, Hoodie & Lainnya",description:"Jelajahi kategori produk aktif mulai dari sepatu, hoodie, kaos, jaket, celana, jersey, aksesori hingga elektronik."},
    "how-it-works":{title:"Cara Menggunakan Superbuy dari Indonesia: Panduan 2026",description:"Pelajari alur mencari listing, memilih opsi, pembelian agen, foto QC, penyimpanan, konsolidasi, ongkir, dan pelacakan."},
    faq:{title:"FAQ Superbuy Indonesia: QC, Penyimpanan, Ongkir & Pajak",description:"Jawaban berbasis sumber tentang foto QC, penyimpanan 90 hari, biaya pembelian, konsolidasi, pengiriman, retur, dan pajak tujuan."},
    articles:{title:"Artikel Superbuy Indonesia: QC, Spreadsheet & Ongkir 2026",description:"Panduan panjang berbahasa Indonesia untuk memakai spreadsheet, membaca foto QC, dan menghitung biaya kirim Superbuy ke Indonesia."},
  },
  en: {
    home:{title:"Superbuy Spreadsheet 2026 — Product Finds & QC Guides",description:"Independent Superbuy product discovery, verified category routes, listing photos, QC guidance and practical shipping research."},
    "hot-drops":{title:"Superbuy Finds 2026 — Latest Product Index",description:"Browse current product finds with verified destination pages, listing images and estimated prices."},
    categories:{title:"Superbuy Spreadsheet Categories — Shoes, Hoodies & More",description:"Open verified category routes for shoes, hoodies, T-shirts, jackets, pants, jerseys, accessories and electronics."},
    "how-it-works":{title:"How to Use a Superbuy Spreadsheet — 2026 Guide",description:"Follow the product, purchase, warehouse QC, storage, consolidation, parcel and tracking workflow."},
    faq:{title:"Superbuy Spreadsheet FAQ — Products, QC & Shipping",description:"Fact-checked answers about product links, QC photos, storage, purchasing, consolidation, returns and international shipping."},
    articles:{title:"Superbuy Guides — QC Photos, Shipping & Product Finds",description:"Long-form research for safer product checks, clearer shipping budgets and more deliberate parcel decisions."},
  },
  de: {
    home:{title:"Superbuy Tabelle 2026: Produkte, QC-Fotos & Versand",description:"Unabhängiger Produktindex mit geprüften Kategorien, QC-Hinweisen und praxisnahen Versandinformationen."},
    "hot-drops":{title:"Aktuelle Superbuy-Produktfunde 2026",description:"Aktuelle Produktfunde mit geprüften Zielseiten, Angebotsbildern und geschätzten Preisen."},
    categories:{title:"Superbuy-Kategorien: Schuhe, Hoodies und mehr",description:"Geprüfte Kategorien für Schuhe, Hoodies, T-Shirts, Jacken, Hosen, Trikots, Accessoires und Elektronik."},
    "how-it-works":{title:"Superbuy-Tabelle richtig nutzen: Anleitung 2026",description:"Produkt finden, Option sichern, QC prüfen, lagern, bündeln, Paket planen und verfolgen."},
    faq:{title:"Superbuy FAQ: Produkte, QC-Fotos und Versand",description:"Recherchierte Antworten zu Produktlinks, QC-Fotos, Lagerung, Gebühren, Rückgaben und Versand."},
    articles:{title:"Superbuy-Ratgeber: QC, Versand und Produktfunde",description:"Ausführliche Ratgeber für Produktprüfung, Versandbudget und Paketplanung."},
  },
  fr: {
    home:{title:"Tableur Superbuy 2026 : produits, photos QC et livraison",description:"Index indépendant avec catégories vérifiées, conseils QC et recherches pratiques sur l’expédition."},
    "hot-drops":{title:"Nouveaux produits Superbuy 2026",description:"Découvrez des produits actuels avec pages de destination vérifiées, photos d’annonce et prix estimés."},
    categories:{title:"Catégories Superbuy : chaussures, sweats et plus",description:"Ouvrez les catégories vérifiées pour chaussures, sweats, T-shirts, vestes, pantalons, maillots et accessoires."},
    "how-it-works":{title:"Comment utiliser un tableur Superbuy en 2026",description:"Suivez le parcours produit, achat, QC, stockage, consolidation, colis et suivi."},
    faq:{title:"FAQ Superbuy : produits, photos QC et expédition",description:"Réponses documentées sur les liens, photos QC, stockage, frais, retours et expédition."},
    articles:{title:"Guides Superbuy : QC, expédition et produits",description:"Guides approfondis pour vérifier les produits, budgéter l’expédition et préparer un colis."},
  },
  es: {
    home:{title:"Hoja Superbuy 2026: productos, fotos QC y envíos",description:"Índice independiente con categorías verificadas, consejos QC e investigación práctica sobre envíos."},
    "hot-drops":{title:"Nuevos productos Superbuy 2026",description:"Productos actuales con páginas de destino verificadas, fotos del anuncio y precios estimados."},
    categories:{title:"Categorías Superbuy: zapatillas, sudaderas y más",description:"Abre categorías verificadas de zapatillas, sudaderas, camisetas, chaquetas, pantalones y accesorios."},
    "how-it-works":{title:"Cómo usar una hoja Superbuy en 2026",description:"Sigue el proceso de producto, compra, QC, almacenamiento, consolidación, paquete y seguimiento."},
    faq:{title:"FAQ Superbuy: productos, fotos QC y envíos",description:"Respuestas verificadas sobre enlaces, fotos QC, almacenamiento, costes, devoluciones y envíos."},
    articles:{title:"Guías Superbuy: QC, envíos y productos",description:"Guías extensas para revisar productos, calcular envíos y preparar paquetes."},
  },
  it: {
    home:{title:"Foglio Superbuy 2026: prodotti, foto QC e spedizione",description:"Indice indipendente con categorie verificate, consigli QC e ricerca pratica sulla spedizione."},
    "hot-drops":{title:"Nuovi prodotti Superbuy 2026",description:"Prodotti attuali con pagine verificate, foto dell’inserzione e prezzi stimati."},
    categories:{title:"Categorie Superbuy: scarpe, felpe e altro",description:"Apri categorie verificate per scarpe, felpe, T-shirt, giacche, pantaloni e accessori."},
    "how-it-works":{title:"Come usare un foglio Superbuy nel 2026",description:"Segui prodotto, acquisto, QC, stoccaggio, consolidamento, pacco e tracciamento."},
    faq:{title:"FAQ Superbuy: prodotti, foto QC e spedizione",description:"Risposte verificate su link, foto QC, stoccaggio, costi, resi e spedizione."},
    articles:{title:"Guide Superbuy: QC, spedizione e prodotti",description:"Guide approfondite per controllare prodotti, stimare la spedizione e preparare pacchi."},
  },
};

export async function generateMetadata({ params }: RouteProps): Promise<Metadata> {
  const resolved = resolvePath((await params).path);
  if (!resolved) return { title: "Page not found", robots: { index: false, follow: false } };
  const canonical = routeUrl(resolved.lang, resolved.rest);
  const alternates = { canonical, languages: languageAlternates(resolved.rest) };
  if (resolved.page === "article" && "article" in resolved) {
    const slug = resolved.article;
    if (!slug) return { title: "Page not found", robots: { index: false, follow: false } };
    const article = resolved.lang === "id" ? indonesianArticles[slug] : resolved.lang === "en" ? englishArticles[slug] : localizedArticles[resolved.lang][slug];
    return { title: article.title, description: article.description, alternates, openGraph:{type:"article",url:canonical,title:article.title,description:article.description,images:["https://superbuys.id/superbuy-logo.png"],locale:hreflang[resolved.lang].replace("-","_")} };
  }
  const meta = pageMeta[resolved.lang][resolved.page as CorePage];
  return { ...meta, alternates, openGraph:{url:canonical,title:meta.title,description:meta.description,siteName:"superbuys.id",locale:hreflang[resolved.lang].replace("-","_")} };
}

export default async function DynamicPage({ params }: RouteProps) {
  const resolved = resolvePath((await params).path);
  if (!resolved) notFound();
  return <SitePage {...resolved} />;
}
