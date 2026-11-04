import { articleSlugs, previousArticleSlugs, coreArticleSlugs, octoberSlugs, supportedArticleLanguages } from "./articleRoutes";
import { reviewExistingArticle } from "./novemberReview";
import { novemberArticles } from "./novemberArticles";
import { articleContent, type ArticleContent } from "./articleContent";
import { dictionaries, type Lang } from "./i18n";
import { octoberEnglishCards, octoberEnglishArticles } from "./editorialOctoberEn";
import en from "./localizedGrowth/en.json";
import fr from "./localizedGrowth/fr.json";
import de from "./localizedGrowth/de.json";
import it from "./localizedGrowth/it.json";
import pl from "./localizedGrowth/pl.json";
import pt from "./localizedGrowth/pt.json";
import zh from "./localizedGrowth/zh.json";

export type ArticleEntry = { slug: string; card: string[]; content: ArticleContent };
const supplements: Record<Lang, ArticleEntry[]> = { es: [], en, fr, de, it, pl, pt, zh };

// Stable slugs join cards and complete content; every supported language must
// publish the same collection. Missing translations fail the build visibly.
const registry = Object.fromEntries(supportedArticleLanguages.map(lang => {
  const originalSlugs = lang === "es" ? previousArticleSlugs : coreArticleSlugs;
  const entries: ArticleEntry[] = originalSlugs.map((slug, index) => ({
    slug, card: dictionaries[lang].articles[index], content: articleContent[lang][index],
  }));
  if (lang === "en") entries.push(...octoberSlugs.map((slug, index) => ({
    slug, card: octoberEnglishCards[index], content: octoberEnglishArticles[index],
  })));
  entries.push(...supplements[lang], ...novemberArticles[lang]);
  const bySlug = new Map(entries.map(entry => [entry.slug, entry]));
  if (bySlug.size !== entries.length) throw new Error(`Duplicate article in ${lang}`);
  if (entries.some(entry => !articleSlugs.includes(entry.slug))) throw new Error(`Unknown article in ${lang}`);
  const ordered = articleSlugs.map(slug => {
    const entry = bySlug.get(slug);
    if (!entry?.card[1] || !entry.content?.standfirst || !entry.content.sections.length || !entry.content.takeaway) {
      throw new Error(`Missing complete article: ${lang}/${slug}`);
    }
    const reviewed = reviewExistingArticle(entry, lang);
    const text = [reviewed.content.standfirst, ...reviewed.content.sections.flatMap(section => [section.heading, ...section.paragraphs, ...(section.bullets ?? [])]), reviewed.content.takeaway].join(" ");
    const minutes = Math.max(1, Math.ceil(lang === "zh" ? text.length / 400 : text.split(/\s+/).length / 200));
    return {...reviewed, card:[...reviewed.card.slice(0,3), `${minutes} min`]};
  });
  return [lang, ordered];
})) as Record<Lang, ArticleEntry[]>;

export const getArticles = (lang: Lang): ArticleEntry[] => registry[lang];
export const getArticle = (lang: Lang, slug: string) => registry[lang].find(article => article.slug === slug);
