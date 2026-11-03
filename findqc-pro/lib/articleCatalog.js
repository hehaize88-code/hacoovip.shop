import { recoveredArticles } from "./recoveredArticles.js";
import { defectHistoryArticle } from "./seo60DefectHistory.js";
import { productLinkFinderArticle } from "./seoProductLinkFinder.js";
import { octoberArticles } from "./seoOctoberArticles.js";
import { novemberArticles } from "./novemberArticles.js";
import { SITE_LANGUAGES } from "./routing.js";

export const articles = [
  ...novemberArticles,
  ...recoveredArticles,
  defectHistoryArticle,
  productLinkFinderArticle,
  ...octoberArticles,
].map(article => ({ ...article, languages: SITE_LANGUAGES }));
