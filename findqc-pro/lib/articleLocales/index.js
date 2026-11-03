import { plEditions } from "./november/pl.js";
import { deEditions } from "./november/de.js";
import { esEditions } from "./november/es.js";
import { roEditions } from "./november/ro.js";
import { plArticles, plArticleSources, plArticleUi } from "./pl.js";
import { esArticles, esArticleSources, esArticleUi } from "./es.js";
import { deArticles, deArticleSources, deArticleUi } from "./de.js";
import { roArticles, roArticleSources, roArticleUi } from "./ro.js";

export const ARTICLE_LOCALES = {
  pl: { ...plArticles, ...plEditions },
  es: { ...esArticles, ...esEditions },
  de: { ...deArticles, ...deEditions },
  ro: { ...roArticles, ...roEditions },
};

export const ARTICLE_SOURCE_LOCALES = {
  pl: plArticleSources,
  es: esArticleSources,
  de: deArticleSources,
  ro: roArticleSources,
};

export const ARTICLE_UI_LOCALES = {
  pl: plArticleUi,
  es: esArticleUi,
  de: deArticleUi,
  ro: roArticleUi,
};
