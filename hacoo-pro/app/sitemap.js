import { CATALOG_REVIEW, categories, guides, products, SITE_URL } from "./data";
import { LOCALES, localizePath } from "./i18n";
import { releaseDate, articleSlugs, originals } from "./articles/registry";
export const dynamic = "force-static";

function canonicalUrl(path, locale = "en") {
  const localizedPath = localizePath(path, locale);
  return localizedPath === "/" ? `${SITE_URL}/` : `${SITE_URL}${localizedPath}/`;
}

export default function sitemap() {
  const now = new Date(CATALOG_REVIEW.iso);
  const editorialUpdate = new Date("2026-10-04");
  const release = new Date(releaseDate);
  const localizedCore = ["/", "/spreadsheet", "/categories", "/products", "/guides", "/faq", "/about"].flatMap((path) => LOCALES.map((locale) => ({ url: canonicalUrl(path, locale), lastModified: ["/", "/spreadsheet", "/products"].includes(path) ? release : ((locale === "en" && path === "/guides") ? editorialUpdate : now), changeFrequency: path === "/" ? "weekly" : "monthly", priority: path === "/" ? 1 : 0.7 })));
  const localizedCategories = categories.flatMap((category) => LOCALES.map((locale) => ({ url: canonicalUrl(`/categories/${category.slug}`, locale), lastModified: category.slug === "jackets" ? release : (locale === "en" && ["shoes", "hoodies-sweaters"].includes(category.slug) ? editorialUpdate : now), changeFrequency: "weekly", priority: 0.8 })));
  const localizedGuides = guides.flatMap((guide) => LOCALES.map((locale) => ({ url: canonicalUrl(`/guides/${guide.slug}`, locale), lastModified: locale === "en" && ["qc-photo-checklist", "how-to-use-hacoo-spreadsheet", "size-guide"].includes(guide.slug) ? editorialUpdate : now, changeFrequency: "monthly", priority: 0.75 })));
  const productReferences = products.flatMap((product) => LOCALES.map((locale) => ({ url: canonicalUrl(`/products/${product.slug}`, locale), lastModified: now, changeFrequency: "weekly", priority: 0.65 })));
  const research = LOCALES.flatMap(locale => [
    { url: canonicalUrl("/articles", locale), lastModified: release, changeFrequency: "weekly", priority: 0.82 },
    ...articleSlugs.map(slug => {
      const original = locale === "en" && originals.find(article => article.slug === slug);
      return { url: canonicalUrl(`/articles/${slug}`, locale), lastModified: original ? new Date(original.modified) : release, changeFrequency: "monthly", priority: 0.8 };
    }),
  ]);
  const legal = ["/contact", "/privacy", "/terms"].flatMap((path) => LOCALES.map((locale) => ({ url: canonicalUrl(path, locale), lastModified: now, changeFrequency: "yearly", priority: 0.4 })));
  return [...localizedCore, ...localizedCategories, ...localizedGuides, ...productReferences, ...research, ...legal];
}
