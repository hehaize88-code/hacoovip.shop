import type { MetadataRoute } from "next";
import { englishArticles } from "./concept-c/articles";

const base = "https://allchinabuy.ro";
const locales = ["", "/en", "/de", "/fr", "/es", "/it", "/pl"];
const pages = [
  "",
  "/products",
  "/categories",
  "/qc-guide",
  "/shipping-guide",
  "/articles",
  "/faq",
];
const trustPages = [
  "/methodology",
  "/about",
  "/contact",
  "/privacy",
  "/terms",
  "/affiliate-disclosure",
];

function siteUrl(locale: string, page: string) {
  if (!locale && !page) return `${base}/`;
  return `${base}${locale}${page}`;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = locales.flatMap((locale) =>
    pages.map((page) => ({
      url: siteUrl(locale, page),
      changeFrequency:
        page === "" || page === "/products"
          ? ("weekly" as const)
          : ("monthly" as const),
      priority: page === "" ? 1 : page === "/products" ? 0.9 : 0.7,
    })),
  );
  const articles = locales.flatMap((locale) =>
    englishArticles.map((article) => ({
      url: `${base}${locale}/articles/${article.slug}`,
      lastModified: new Date("2026-08-12"),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  );
  const trust = trustPages.map((page) => ({
    url: `${base}${page}`,
    lastModified: new Date("2026-08-12"),
    changeFrequency: "yearly" as const,
    priority: 0.4,
  }));
  return [...routes, ...articles, ...trust];
}
