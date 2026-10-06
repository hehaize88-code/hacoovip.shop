import type { MetadataRoute } from "next";
import { articleSlugs } from "./article-catalog";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://superbuys.id";
  const languages = ["", "/en", "/de", "/fr", "/es", "/it"];
  const pages = ["", "/hot-drops", "/categories", "/how-it-works", "/faq", "/articles", ...articleSlugs.map((slug) => `/articles/${slug}`)];
  return languages.flatMap((lang) => pages.map((page) => ({
    url: `${base}${lang}${page}/`,
    lastModified: new Date("2026-10-06"),
    changeFrequency: page.includes("articles/") ? "monthly" as const : "weekly" as const,
    priority: page === "" ? 1 : 0.75,
  })));
}
