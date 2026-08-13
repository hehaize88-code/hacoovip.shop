"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { dictionaries, Lang } from "../i18n";

type LanguageContextValue = {
  lang: Lang;
  setLang: (lang: Lang) => void;
  d: (typeof dictionaries)[Lang];
  withLang: (path: string) => string;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);
const supported = new Set<Lang>(["es", "en", "fr", "de", "it", "pl", "pt", "zh"]);

const pathLanguage = (pathname: string): Lang | null => {
  const prefix = pathname.split("/").filter(Boolean)[0];
  if (prefix === "zh-cn") return "zh";
  return prefix && supported.has(prefix as Lang) && prefix !== "es" ? prefix as Lang : null;
};

const localizePath = (path: string, lang: Lang) => {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  if (lang === "es") return normalized;
  return `/${lang === "zh" ? "zh-cn" : lang}${normalized}`.replace(/\/{2,}/g, "/");
};

export function LanguageProvider({ children, initialLang = "es" }: { children: React.ReactNode; initialLang?: Lang }) {
  const [lang, setLangState] = useState<Lang>(initialLang);

  useEffect(() => {
    const query = new URLSearchParams(window.location.search).get("lang") as Lang | null;
    const pathLang = pathLanguage(window.location.pathname);
    const next = pathLang ?? (query && supported.has(query) ? query : initialLang);
    document.documentElement.lang = next === "zh" ? "zh-CN" : next;
    if (query && supported.has(query)) {
      const basePath = window.location.pathname.replace(/^\/(en|fr|de|it|pl|pt|zh-cn)(?=\/|$)/, "") || "/";
      window.location.replace(localizePath(basePath, query));
      return;
    }
    const timer = window.setTimeout(() => setLangState(next), 0);
    return () => window.clearTimeout(timer);
  }, [initialLang]);

  const setLang = (next: Lang) => {
    setLangState(next);
    window.localStorage.setItem("usfans-language", next);
    const basePath = window.location.pathname.replace(/^\/(en|fr|de|it|pl|pt|zh-cn)(?=\/|$)/, "") || "/";
    window.location.assign(`${localizePath(basePath, next)}${window.location.hash}`);
  };

  const value = useMemo<LanguageContextValue>(() => ({
    lang,
    setLang,
    d: dictionaries[lang],
    withLang: (path: string) => localizePath(path, lang),
  }), [lang]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const value = useContext(LanguageContext);
  if (!value) throw new Error("useLanguage must be used inside LanguageProvider");
  return value;
}
