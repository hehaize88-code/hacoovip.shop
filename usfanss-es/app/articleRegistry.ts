import { articleSlugs, octoberSlugs } from "./articleRoutes";
import { articleContent, type ArticleContent } from "./articleContent";
import { dictionaries, type Lang } from "./i18n";
import { octoberEnglishCards, octoberEnglishArticles } from "./editorialOctoberEn";
export type ArticleEntry = {slug:string; card:string[]; content:ArticleContent};
export const getArticles = (lang:Lang):ArticleEntry[] => {
  const existing = dictionaries[lang].articles.map((card,index)=>({slug:articleSlugs[index],card,content:articleContent[lang][index]}));
  return lang === "en" ? [...existing,...octoberSlugs.map((slug,index)=>({slug,card:octoberEnglishCards[index],content:octoberEnglishArticles[index]}))] : existing;
};
export const getArticle = (lang:Lang,slug:string) => getArticles(lang).find(article=>article.slug===slug);
