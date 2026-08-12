import type { MetadataRoute } from "next";
import { articles, type Locale } from "../lib/content";

const BASE = "https://superbuys.store";
const locales: Locale[] = ["en", "fr", "de"];
const routes = ["", "/categories", "/guides", "/faq", "/articles"];

export default function sitemap(): MetadataRoute.Sitemap {
  const modified = new Date("2026-08-12T00:00:00Z");
  return locales.flatMap((locale) => {
    const prefix = locale === "en" ? "" : `/${locale}`;
    const staticRows: MetadataRoute.Sitemap = routes.map((route) => ({
      url: `${BASE}${prefix}${route || "/"}`,
      lastModified: modified,
      changeFrequency: route === "/articles" ? "weekly" : "monthly",
      priority: route === "" ? 1 : 0.8,
    }));
    const articleRows: MetadataRoute.Sitemap = articles[locale].map((article) => ({
      url: `${BASE}${prefix}/articles/${article.slug}`,
      lastModified: modified,
      changeFrequency: "monthly",
      priority: 0.75,
    }));
    return [...staticRows, ...articleRows];
  });
}
