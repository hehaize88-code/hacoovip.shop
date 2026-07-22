export const SITE_LANGUAGES = ["en", "pl", "es", "de", "ro"];

export const BUILD_LANGUAGE = SITE_LANGUAGES.includes(process.env.NEXT_PUBLIC_SITE_LANGUAGE)
  ? process.env.NEXT_PUBLIC_SITE_LANGUAGE
  : "en";

export function stripLanguagePrefix(pathname = "/") {
  const cleanPath = pathname.startsWith("/") ? pathname : `/${pathname}`;
  const match = cleanPath.match(/^\/(pl|es|de|ro)(?=\/|$)/);
  const stripped = match ? cleanPath.slice(match[0].length) : cleanPath;
  return stripped || "/";
}

export function languagePath(pathname = "/", language = BUILD_LANGUAGE) {
  const basePath = stripLanguagePrefix(pathname);
  if (language === "en") return basePath;
  return `/${language}${basePath === "/" ? "/" : basePath}`;
}

export function languageUrl(pathname = "/", language = BUILD_LANGUAGE) {
  return new URL(languagePath(pathname, language), "https://findqc.pro").toString();
}
