import en from "./editions/en.json";
import es from "./editions/es.json";
import fr from "./editions/fr.json";
import de from "./editions/de.json";
import it from "./editions/it.json";
import pt from "./editions/pt.json";
import { releaseDate, originals, articleSlugs } from "./registry.js";
export { releaseDate, articleSlugs, featuredSlugs } from "./registry.js";

const translations = { en, es, fr, de, it, pt };
const images = {
  "hacoo-on-pc-without-app": { path: "/articles/open-a-product-link.svg", width: 900, height: 450 },
  "hacoo-jacket-size-guide": { path: "/products/jacket-edit.webp", width: 750, height: 750 },
};
export function articleEdition(locale, slug) {
  if (!articleSlugs.includes(slug)) return null;
  const original = originals.find(a => a.slug === slug);
  const edition = translations[locale]?.[slug];
  if (locale !== "en" && !edition) return null;
  return {
    slug,
    title: edition?.title ?? original.title,
    description: edition?.description ?? original.excerpt,
    sections: edition?.sections,
    sources: edition?.sources,
    image: images[slug] ?? original.image,
    published: locale === "en" && original ? original.published : releaseDate,
    modified: locale === "en" && original ? original.modified : releaseDate,
  };
}
