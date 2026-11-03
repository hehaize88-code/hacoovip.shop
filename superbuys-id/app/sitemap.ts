import type { MetadataRoute } from "next";
import { articleCatalog, articleSlugs, type ArticleLanguage } from "./article-catalog";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://superbuys.id";
  const languages: ArticleLanguage[] = ["id", "en", "de", "fr", "es", "it"];
  const pages = ["", "/hot-drops", "/categories", "/how-it-works", "/faq", "/articles", ...articleSlugs.map((slug) => `/articles/${slug}`)];
  return languages.flatMap((lang) => pages.map((page) => ({
    url: `${base}${lang === "id" ? "" : `/${lang}`}${page}/`,
    lastModified: page.startsWith("/articles/")
      ? articleCatalog[lang][page.slice("/articles/".length)].modifiedAt
      : ["", "/articles", "/faq"].includes(page) ? "2026-11-03" : "2026-10-06",
    changeFrequency: page.includes("articles/") ? "monthly" as const : "weekly" as const,
    priority: page === "" ? 1 : 0.75,
  })));
}
