import { recoveredArticles } from "./recoveredArticles.js";
import { defectHistoryArticle } from "./seo60DefectHistory.js";
import { productLinkFinderArticle } from "./seoProductLinkFinder.js";

import { octoberArticles } from "./seoOctoberArticles.js";

export const articles = [
  ...recoveredArticles,
  defectHistoryArticle,
  productLinkFinderArticle,
  ...octoberArticles,
];
