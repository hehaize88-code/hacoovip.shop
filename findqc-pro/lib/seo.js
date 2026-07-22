import { BUILD_LANGUAGE, SITE_LANGUAGES, languageUrl } from "./routing";

const OPEN_GRAPH_LOCALES = {
  en: "en_US",
  pl: "pl_PL",
  es: "es_ES",
  de: "de_DE",
  ro: "ro_RO",
};

export function localizedAlternates(pathname) {
  return {
    canonical: languageUrl(pathname, BUILD_LANGUAGE),
    languages: {
      ...Object.fromEntries(SITE_LANGUAGES.map((language) => [language, languageUrl(pathname, language)])),
      "x-default": languageUrl(pathname, "en"),
    },
  };
}

export function localizedMetadata(metadata, pathname) {
  const alternates = localizedAlternates(pathname);
  const openGraph = metadata.openGraph
    ? {
        ...metadata.openGraph,
        url: alternates.canonical,
        locale: OPEN_GRAPH_LOCALES[BUILD_LANGUAGE],
        alternateLocale: SITE_LANGUAGES
          .filter((language) => language !== BUILD_LANGUAGE)
          .map((language) => OPEN_GRAPH_LOCALES[language]),
      }
    : undefined;

  return {
    ...metadata,
    alternates,
    ...(openGraph ? { openGraph } : {}),
  };
}
