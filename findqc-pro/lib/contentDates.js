import { articles } from "./articleCatalog.js";

// Update a route only when its visible, indexable content changes materially.
// Build dates, deployments, styling-only changes, and asset optimizations must
// not change these values.
const routeLastModified = Object.freeze({
  "/": "2026-11-03",
  "/products": "2026-07-22",
  "/categories": "2026-07-21",
  "/guides": "2026-11-03",
  "/guides/qc-photo-checklist": "2026-07-22",
  "/guides/how-to-buy": "2026-07-22",
  "/articles": "2026-11-03",
  "/faq": "2026-11-03",
  "/about": "2026-07-22",
  "/contact": "2026-07-22",
  "/editorial-policy": "2026-07-22",
  "/privacy": "2026-07-21",
  "/terms": "2026-07-21",
  "/categories/shoes": "2026-07-22",
  "/categories/hoodies-sweaters": "2026-10-05",
  "/categories/t-shirts": "2026-10-05",
  "/categories/jackets": "2026-07-22",
  "/categories/pants-shorts": "2026-07-22",
  "/categories/headwear": "2026-07-22",
  "/categories/accessories": "2026-07-22",
  "/categories/jersey": "2026-07-22",
  "/categories/electronics": "2026-07-22",
});

// These five articles had localized editions before the November release.
const originalTranslations = new Set([
  "before-you-buy-qc-guide", "findqc-search-methods", "findqc-product-signals",
  "what-qc-photos-can-prove", "findqc-shopping-agent-workflow",
]);

const localizedRouteLastModified = Object.freeze({
  pl: "2026-07-22",
  es: "2026-07-22",
  de: "2026-07-22",
  ro: "2026-07-22",
});

function articleDate(route) {
  const slug = route.match(/^\/articles\/([^/]+)$/)?.[1];
  if (!slug) return null;
  const article = articles.find((candidate) => candidate.slug === slug);
  return article ? (article.updatedISO || article.dateISO) : null;
}

export function getRouteLastModified(route, language = "en") {
  if (language !== "en") {
    if (route === "/" || route === "/guides" || route === "/articles" || route === "/faq"
      || route === "/categories/hoodies-sweaters" || route === "/categories/t-shirts") return "2026-11-03";
    if (route.startsWith("/articles/")) {
      const slug = route.slice("/articles/".length);
      if (!originalTranslations.has(slug)) return "2026-11-03";
    }
    const localizedDate = localizedRouteLastModified[language];
    if (!localizedDate) throw new Error(`Unknown sitemap language: ${language}`);
    return localizedDate;
  }

  const date = routeLastModified[route] || articleDate(route);
  if (!date) throw new Error(`Missing content modification date for sitemap route: ${route}`);
  return date;
}

export function articleLastModified(article) {
  return article.updatedISO || article.dateISO;
}
