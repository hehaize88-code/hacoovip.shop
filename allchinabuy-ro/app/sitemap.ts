import type { MetadataRoute } from "next";
import { englishArticles } from "./concept-c/articles";

const base = "https://allchinabuy.ro";
const locales = ["", "/de", "/fr", "/es", "/it", "/pl", "/ro"];
const pages = ["", "/products", "/categories", "/qc-guide", "/shipping-guide", "/articles", "/faq"];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date("2026-08-12");
  const routes = locales.flatMap((locale) =>
    pages.map((page) => ({
      url: `${base}${locale}${page || "/"}`,
      lastModified: now,
      changeFrequency: page === "" || page === "/products" ? "weekly" as const : "monthly" as const,
      priority: page === "" ? 1 : page === "/products" ? 0.9 : 0.7,
    })),
  );
  const articles = locales.flatMap((locale) =>
    englishArticles.map((article) => ({
      url: `${base}${locale}/articles/${article.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  );
  return [...routes, ...articles];
}
