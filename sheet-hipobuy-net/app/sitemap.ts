import type { MetadataRoute } from "next";
import {
  articleHref,
  articleSlugs,
  languages,
  pageHref,
  type PageKey,
} from "./site-data";

const origin = "https://sheet-hipobuy.net";
import { articleModified } from "./growth-routing";
const lastModified = new Date("2026-10-31T00:00:00.000Z");
export const dynamic = "force-static";
const pages: PageKey[] = [
  "home",
  "spreadsheet",
  "categories",
  "qc",
  "shipping",
  "faq",
  "articles",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const pageEntries = languages.flatMap(({ code }) =>
    pages.map((page) => ({
      url: `${origin}${pageHref(code, page)}`,
      lastModified,
      alternates: { languages: Object.fromEntries([...languages.map((l) => [l.code, `${origin}${pageHref(l.code, page)}`]), ["x-default", `${origin}${pageHref("en", page)}`]]) },
      changeFrequency: page === "home" || page === "spreadsheet" ? "weekly" as const : "monthly" as const,
      priority: page === "home" ? 1 : page === "spreadsheet" || page === "articles" ? 0.9 : 0.8,
    })),
  );

  const articleEntries = languages.flatMap(({ code }) =>
    articleSlugs.map((slug) => ({
      url: `${origin}${articleHref(code, slug)}`,
      lastModified: new Date(`${articleModified(slug)}T00:00:00.000Z`),
      alternates: { languages: Object.fromEntries([...languages.map((l) => [l.code, `${origin}${articleHref(l.code, slug)}`]), ["x-default", `${origin}${articleHref("en", slug)}`]]) },
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  );

  return [...pageEntries, ...articleEntries];
}
