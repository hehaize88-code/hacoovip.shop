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

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("es");

  useEffect(() => {
    const query = new URLSearchParams(window.location.search).get("lang") as Lang | null;
    const saved = window.localStorage.getItem("usfans-language") as Lang | null;
    const next = query && supported.has(query) ? query : saved && supported.has(saved) ? saved : "es";
    document.documentElement.lang = next === "zh" ? "zh-CN" : next;
    const timer = window.setTimeout(() => setLangState(next), 0);
    return () => window.clearTimeout(timer);
  }, []);

  const setLang = (next: Lang) => {
    setLangState(next);
    document.documentElement.lang = next === "zh" ? "zh-CN" : next;
    window.localStorage.setItem("usfans-language", next);
    const url = new URL(window.location.href);
    if (next === "es") url.searchParams.delete("lang");
    else url.searchParams.set("lang", next);
    window.history.replaceState({}, "", `${url.pathname}${url.search}${url.hash}`);
  };

  const value = useMemo<LanguageContextValue>(() => ({
    lang,
    setLang,
    d: dictionaries[lang],
    withLang: (path: string) => lang === "es" ? path : `${path}${path.includes("?") ? "&" : "?"}lang=${lang}`,
  }), [lang]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const value = useContext(LanguageContext);
  if (!value) throw new Error("useLanguage must be used inside LanguageProvider");
  return value;
}
