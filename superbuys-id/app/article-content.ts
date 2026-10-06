import articles from "./content/en.json";

export type LongArticle = {
  title: string;
  description: string;
  primaryKeyword: string;
  secondaryKeywords: string[];
  publishedAt?: string;
  modifiedAt?: string;
  updatedLabel?: string;
  sections: { heading: string; paragraphs: string[]; bullets?: string[] }[];
};

export const englishArticles: Record<string, LongArticle> = articles;
