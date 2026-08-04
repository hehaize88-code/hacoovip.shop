export const ARTICLE_LANGUAGE_OVERRIDES = Object.freeze({
  "findqc-discord-bot-guide": ["en"],
  "findqc-qc-measurements-size-guide": ["en"],
  "findqc-product-safety-check": ["en"],
  "findqc-shoes-qc-checklist": ["en"],
});

export function routeIsAvailableInLanguage(pathname, language) {
  const slug = pathname.match(/\/articles\/([^/?#]+)/)?.[1];
  if (!slug) return true;
  const availableLanguages = ARTICLE_LANGUAGE_OVERRIDES[slug];
  return !availableLanguages || availableLanguages.includes(language);
}
