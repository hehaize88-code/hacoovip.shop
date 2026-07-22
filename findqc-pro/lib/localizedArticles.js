import { articles as englishArticles } from "./articles.js";
import { ARTICLE_LOCALES, ARTICLE_SOURCE_LOCALES, ARTICLE_UI_LOCALES } from "./articleLocales/index.js";

const ENGLISH_UI = {
  journalMetadataTitle: "FindQC Guides: Search, QC Photos & Shopping Agents",
  journalMetadataDescription: "Fact-checked guides to FindQC search, product signals, QC photo review and the shopping-agent workflow.",
  journalSchemaName: "FindQC Pro research journal",
  journalCount: "05 in-depth guides",
  journalNote: "Every article is checked against current primary sources and, where relevant, independent public-safety references. Images are clearly marked editorial examples rather than warehouse QC evidence.",
  editorialDesk: "FindQC Pro Editorial Desk",
  factChecked: "Fact-checked",
  heroCaption: "Editorial product image used to illustrate the inspection subject. It is not presented as a FindQC warehouse QC record.",
  contents: "In this article",
  researchNotes: "Research notes",
  officialSources: "Sources checked",
  sourceIntro: "This independent editorial guide's source set was last reviewed on 22 July 2026. Features, policies and safety notices can change, so verify current details at the linked source.",
  independentNote: "FindQC Pro is an independent discovery and education site. It is not FindQC and does not claim to operate FindQC's service.",
  continueResearch: "Continue the research",
  relatedNotes: "Related field notes",
  allArticles: "All journal articles",
  readArticle: "Read article",
  home: "Home",
  journal: "Journal",
};

export function getArticleUi(language = "en") {
  return language === "en" ? ENGLISH_UI : { ...ENGLISH_UI, ...ARTICLE_UI_LOCALES[language] };
}

function localizeSources(sources, language) {
  if (language === "en") return sources;
  const translations = ARTICLE_SOURCE_LOCALES[language] || {};
  return sources.map((source) => ({ ...source, ...(translations[source.href] || {}) }));
}

function localizeArticle(article, language) {
  if (!article || language === "en") return article;
  const translated = ARTICLE_LOCALES[language]?.[article.slug];
  if (!translated) return article;
  return {
    ...article,
    ...translated,
    slug: article.slug,
    heroImage: article.heroImage,
    dateISO: article.dateISO,
    related: article.related,
    sources: localizeSources(article.sources, language),
    cta: { ...article.cta, ...translated.cta, href: article.cta.href, external: article.cta.external },
  };
}

export function getLocalizedArticles(language = "en") {
  return englishArticles.map((article) => localizeArticle(article, language));
}

export function getLocalizedArticle(slug, language = "en") {
  return localizeArticle(englishArticles.find((article) => article.slug === slug), language);
}
