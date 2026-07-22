import { articles, categories } from "../lib/data";
import { articleLastModified, getRouteLastModified } from "../lib/contentDates";

export const dynamic = "force-static";

export default function sitemap() {
  const base = "https://findqc.pro";
  const staticRoutes = ["", "/products", "/categories", "/guides", "/guides/qc-photo-checklist", "/guides/how-to-buy", "/articles", "/faq", "/about", "/contact", "/privacy", "/terms"];
  return [
    ...staticRoutes.map((route) => ({
      url: `${base}${route}`,
      lastModified: getRouteLastModified(route || "/"),
      changeFrequency: route === "" ? "weekly" : "monthly",
      priority: route === "" ? 1 : 0.7,
    })),
    ...categories.map((category) => ({
      url: `${base}/categories/${category.slug}`,
      lastModified: getRouteLastModified(`/categories/${category.slug}`),
      changeFrequency: "weekly",
      priority: 0.75,
    })),
    ...articles.map((article) => ({
      url: `${base}/articles/${article.slug}`,
      lastModified: articleLastModified(article),
      changeFrequency: "monthly",
      priority: 0.7,
    })),
  ];
}
