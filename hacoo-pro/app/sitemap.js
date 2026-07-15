import { categories, guides, products, SITE_URL } from "./data";
import { LOCALES, localizePath } from "./i18n";
export const dynamic = "force-static";

function canonicalUrl(path, locale = "en") {
  const localizedPath = localizePath(path, locale);
  return localizedPath === "/" ? `${SITE_URL}/` : `${SITE_URL}${localizedPath}/`;
}

export default function sitemap() {
  const now = new Date("2026-07-15");
  const localizedCore = ["/", "/spreadsheet", "/categories", "/guides", "/faq", "/about"].flatMap((path) =>
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
  const legal = ["/contact", "/privacy", "/terms"].map((path) => ({
    url: canonicalUrl(path),
    lastModified: now,
    changeFrequency: "yearly",
    priority: 0.4,
  }));

  const productReferences = products.map((product) => ({
    url: canonicalUrl(`/products/${product.slug}`),
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.65,
  }));

  return [...localizedCore, ...localizedCategories, ...localizedGuides, ...productReferences, ...legal];
}
