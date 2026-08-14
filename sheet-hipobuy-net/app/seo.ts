import type { Metadata } from "next";
import { articleHref, articleSlugs, copies, languages, pageHref, type ArticleSlug, type Lang, type PageKey } from "./site-data";

const origin = "https://sheet-hipobuy.net";

export function pageMetadata(lang: Lang, page: PageKey): Metadata {
  const copy = copies[lang];
  const title = page === "home" ? copy.home.title : copy.pages[page].title;
  const description = page === "home" ? copy.home.lead : copy.pages[page].intro;
  const canonical = `${origin}${pageHref(lang, page)}`;
  const alternates = Object.fromEntries(languages.map((item) => [item.code, `${origin}${pageHref(item.code, page)}`]));

  return {
    title,
    description,
    alternates: { canonical, languages: { ...alternates, "x-default": `${origin}${pageHref("en", page)}` } },
    openGraph: { type: "website", title, description, url: canonical, siteName: "Hipobuy Sheet", locale: lang },
    robots: { index: true, follow: true },
  };
}

export function articleMetadata(lang: Lang, slug: ArticleSlug): Metadata {
  const index = articleSlugs.indexOf(slug);
  const article = copies[lang].articles[index];
  const canonical = `${origin}${articleHref(lang, slug)}`;
  const alternates = Object.fromEntries(languages.map((item) => [item.code, `${origin}${articleHref(item.code, slug)}`]));

  return {
    title: article[1],
    description: article[2],
    alternates: { canonical, languages: { ...alternates, "x-default": `${origin}${articleHref("en", slug)}` } },
    openGraph: {
      type: "article",
      title: article[1],
      description: article[2],
      url: canonical,
      siteName: "Hipobuy Sheet",
      locale: lang,
    },
    robots: { index: true, follow: true },
  };
}
