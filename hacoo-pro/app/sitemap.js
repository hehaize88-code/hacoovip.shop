import { CATALOG_REVIEW, categories, guides, products, SITE_URL } from "./data";
import { LOCALES, localizePath } from "./i18n";
import { articles } from "./articles/data";
export const dynamic = "force-static";

function canonicalUrl(path, locale = "en") {
  const localizedPath = localizePath(path, locale);
  return localizedPath === "/" ? `${SITE_URL}/` : `${SITE_URL}${localizedPath}/`;
}

export default function sitemap() {
  const now = new Date(CATALOG_REVIEW.iso);
  const localizedCore = ["/", "/spreadsheet", "/categories", "/products", "/guides", "/faq", "/about"].flatMap((path) =>
    LOCALES.map((locale) => ({
      url: canonicalUrl(path, locale),
      lastModified: now,
      changeFrequency: path === "/" ? "weekly" : "monthly",
      priority: path === "/" ? 1 : 0.7,
    })),
  );
  const localizedCategories = categories.flatMap((category) =>
    LOCALES.map((locale) => ({
      url: canonicalUrl(`/categories/${category.slug}`, locale),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    })),
  );
  const localizedGuides = guides.flatMap((guide) =>
    LOCALES.map((locale) => ({
      url: canonicalUrl(`/guides/${guide.slug}`, locale),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.75,
    })),
  );
  const legal = ["/contact", "/privacy", "/terms"].flatMap((path) =>
    LOCALES.map((locale) => ({
      url: canonicalUrl(path, locale),
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.4,
    })),
  );

  const productReferences = products.flatMap((product) =>
    LOCALES.map((locale) => ({
      url: canonicalUrl(`/products/${product.slug}`, locale),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.65,
    })),
  );

  const englishResearch = [
    { url: canonicalUrl("/articles"), lastModified: now, changeFrequency: "weekly", priority: 0.75 },
    ...articles.map((article) => ({
      url: canonicalUrl(`/articles/${article.slug}`),
      lastModified: new Date(article.modified),
      changeFrequency: "monthly",
      priority: 0.78,
    })),
  ];

  return [...localizedCore, ...localizedCategories, ...localizedGuides, ...productReferences, ...englishResearch, ...legal];
}
