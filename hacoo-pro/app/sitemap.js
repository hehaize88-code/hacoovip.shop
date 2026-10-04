import { CATALOG_REVIEW, categories, guides, products, SITE_URL } from "./data";
import { LOCALES, localizePath } from "./i18n";
import { articles } from "./articles/data";
import { priorityArticles } from "./articles/priority-articles";
import { comparisonArticles } from "./articles/comparison-articles";
export const dynamic = "force-static";

function canonicalUrl(path, locale = "en") {
  const localizedPath = localizePath(path, locale);
  return localizedPath === "/" ? `${SITE_URL}/` : `${SITE_URL}${localizedPath}/`;
}

export default function sitemap() {
  const now = new Date(CATALOG_REVIEW.iso);
  const research = [...comparisonArticles, ...priorityArticles, ...articles];
  const editorialUpdate = new Date("2026-10-04");
  const latestArticleUpdate = new Date(Math.max(...research.map((article) => new Date(article.modified).getTime())));
  const localizedCore = ["/", "/spreadsheet", "/categories", "/products", "/guides", "/faq", "/about"].flatMap((path) => LOCALES.map((locale) => ({ url: canonicalUrl(path, locale), lastModified: locale === "en" && ["/", "/spreadsheet", "/guides"].includes(path) ? latestArticleUpdate : now, changeFrequency: path === "/" ? "weekly" : "monthly", priority: path === "/" ? 1 : 0.7 })));
  const localizedCategories = categories.flatMap((category) => LOCALES.map((locale) => ({ url: canonicalUrl(`/categories/${category.slug}`, locale), lastModified: locale === "en" && ["shoes", "hoodies-sweaters"].includes(category.slug) ? editorialUpdate : now, changeFrequency: "weekly", priority: 0.8 })));
  const localizedGuides = guides.flatMap((guide) => LOCALES.map((locale) => ({ url: canonicalUrl(`/guides/${guide.slug}`, locale), lastModified: locale === "en" && ["qc-photo-checklist", "how-to-use-hacoo-spreadsheet", "size-guide"].includes(guide.slug) ? editorialUpdate : now, changeFrequency: "monthly", priority: 0.75 })));
  const productReferences = products.flatMap((product) => LOCALES.map((locale) => ({ url: canonicalUrl(`/products/${product.slug}`, locale), lastModified: now, changeFrequency: "weekly", priority: 0.65 })));
  const englishResearch = [{ url: canonicalUrl("/articles"), lastModified: latestArticleUpdate, changeFrequency: "weekly", priority: 0.82 }, ...research.map((article) => ({ url: canonicalUrl(`/articles/${article.slug}`), lastModified: new Date(article.modified), changeFrequency: "monthly", priority: priorityArticles.includes(article) ? 0.84 : 0.78 }))];
  const legal = ["/contact", "/privacy", "/terms"].flatMap((path) => LOCALES.map((locale) => ({ url: canonicalUrl(path, locale), lastModified: now, changeFrequency: "yearly", priority: 0.4 })));
  return [...localizedCore, ...localizedCategories, ...localizedGuides, ...productReferences, ...englishResearch, ...legal];
}
