import type { MetadataRoute } from "next";
import {
  articleHref,
  articleSlugs,
  languages,
  pageHref,
  type PageKey,
} from "./site-data";

const origin = "https://sheet-hipobuy.net";
const lastModified = new Date("2026-08-14T00:00:00.000Z");
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
      changeFrequency: page === "home" || page === "spreadsheet" ? "weekly" as const : "monthly" as const,
      priority: page === "home" ? 1 : page === "spreadsheet" || page === "articles" ? 0.9 : 0.8,
    })),
  );

  const articleEntries = languages.flatMap(({ code }) =>
    articleSlugs.map((slug) => ({
      url: `${origin}${articleHref(code, slug)}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  );

  return [...pageEntries, ...articleEntries];
}
