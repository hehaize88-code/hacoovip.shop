export const ARTICLE_LANGUAGE_OVERRIDES = Object.freeze({
  "findqc-discord-bot-guide": ["en"],
});

export function routeIsAvailableInLanguage(pathname, language) {
  const slug = pathname.match(/\/articles\/([^/?#]+)/)?.[1];
  if (!slug) return true;
  const availableLanguages = ARTICLE_LANGUAGE_OVERRIDES[slug];
  return !availableLanguages || availableLanguages.includes(language);
}
