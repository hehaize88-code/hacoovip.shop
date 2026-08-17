import type { Metadata } from "next";
import { articleHref, articleSlugs, copies, languages, pageHref, type ArticleSlug, type Lang, type PageKey } from "./site-data";

const origin = "https://sheet-hipobuy.net";
const ogImage = { url: `${origin}/og-image.svg`, width: 1200, height: 630, alt: "Hipobuy Spreadsheet 2026" };

const pageSeoTitles: Record<PageKey, string> = {
  home: "Hipobuy Spreadsheet 2026 | Verified Product Links",
  spreadsheet: "Hipobuy Spreadsheet | Searchable Product Links",
  categories: "Hipobuy Product Categories | Shoes, Shirts & More",
  qc: "Hipobuy QC Photos Guide | Warehouse Checklist",
  shipping: "Hipobuy Shipping Cost & Parcel Planning Guide",
  faq: "Hipobuy FAQ | QC, Storage, Shipping & Returns",
  articles: "Hipobuy Buying Guides | Spreadsheet, QC & Shipping",
};

export function pageMetadata(lang: Lang, page: PageKey): Metadata {
  const copy = copies[lang];
  const title = pageSeoTitles[page];
  const description = page === "home" ? copy.home.lead : copy.pages[page].intro;
  const canonical = `${origin}${pageHref(lang, page)}`;
  const alternates = Object.fromEntries(languages.map((item) => [item.code, `${origin}${pageHref(item.code, page)}`]));
  const locale = lang === "de" ? "de_DE" : lang === "es" ? "es_ES" : lang === "it" ? "it_IT" : lang === "pl" ? "pl_PL" : "en_US";

  return {
    title,
    description,
    alternates: { canonical, languages: { ...alternates, "x-default": `${origin}${pageHref("en", page)}` } },
    openGraph: { type: "website", title, description, url: canonical, siteName: "Hipobuy Sheet", locale, images: [ogImage] },
    twitter: { card: "summary_large_image", title, description, images: [ogImage.url] },
    robots: { index: true, follow: true },
  };
}

export function articleMetadata(lang: Lang, slug: ArticleSlug): Metadata {
  const index = articleSlugs.indexOf(slug);
  const article = copies[lang].articles[index];
  const canonical = `${origin}${articleHref(lang, slug)}`;
  const alternates = Object.fromEntries(languages.map((item) => [item.code, `${origin}${articleHref(item.code, slug)}`]));
  const locale = lang === "de" ? "de_DE" : lang === "es" ? "es_ES" : lang === "it" ? "it_IT" : lang === "pl" ? "pl_PL" : "en_US";

  return {
    title: article[1],
    description: article[2],
    alternates: { canonical, languages: { ...alternates, "x-default": `${origin}${articleHref("en", slug)}` } },
    openGraph: { type: "article", title: article[1], description: article[2], url: canonical, siteName: "Hipobuy Sheet", locale, images: [ogImage] },
    twitter: { card: "summary_large_image", title: article[1], description: article[2], images: [ogImage.url] },
    robots: { index: true, follow: true },
  };
}
