import { longArticles, type LongArticle } from "./article-content.ts";
import previousTranslations from "./article-translations.json" with { type: "json" };
import en from "./editorial/en.json" with { type: "json" };
import de from "./editorial/de.json" with { type: "json" };
import fr from "./editorial/fr.json" with { type: "json" };
import es from "./editorial/es.json" with { type: "json" };
import it from "./editorial/it.json" with { type: "json" };
import pl from "./editorial/pl.json" with { type: "json" };
import pt from "./editorial/pt.json" with { type: "json" };
import ro from "./editorial/ro.json" with { type: "json" };

export const localeCodes = ["en", "de", "fr", "es", "it", "pl", "pt", "ro"] as const;
export type Language = typeof localeCodes[number];
type Draft = { title: string; description: string; h1: string; intro: string; sections: string[][] };
const drafts: Record<Language, Record<string, Draft>> = {en, de, fr, es, it, pl, pt, ro};
export const newSlugs = Object.keys(en);
export const articleRoutes = [...longArticles.map(article => article.slug), ...newSlugs];
export const localizedRoutes = ["", "categories", "qc-hub", "guides", "faq", "articles", "under-25", "qc-first", "new-this-week", ...articleRoutes];
export const storage = "kakobuy-warehouse-storage-guide";
export const readPhotos = "read-kakobuy-qc-photos";
export const extra = "kakobuy-extra-qc-photos";
export const shoes = "kakobuy-shoe-qc-checklist";
export const missing = "kakobuy-qc-photos-not-showing";
export const mismatch = "kakobuy-wrong-size-or-item-qc";
export const release = "2026-11-03";

export function articlesFor(lang: Language): LongArticle[] {
  const existing = lang === "en" ? longArticles : previousTranslations[lang];
  return articleRoutes.map(slug => {
    const old = existing.find(article => article.slug === slug);
    if (old) return old;
    const draft = drafts[lang][slug];
    if (!draft) throw new Error(`Missing article: ${lang}/${slug}`);
    return {
      slug, title: draft.h1, seoTitle: draft.title, seoDescription: draft.description,
      intro: draft.intro, sections: draft.sections.map(([heading, ...paragraphs]) => ({heading, paragraphs})),
      quickAnswer: "", sourceNote: "", primaryKeyword: "", secondaryKeywords: [],
    };
  });
}

export function updatedInRelease(lang: Language, slug: string) {
  return [storage, readPhotos, extra, shoes, ...newSlugs].includes(slug) ||
    (lang !== "en" && !previousTranslations[lang].some(article => article.slug === slug));
}
