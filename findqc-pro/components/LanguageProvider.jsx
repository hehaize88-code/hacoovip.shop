"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { DEFAULT_LANGUAGE, isSupportedLanguage, translate } from "../lib/i18n";
import { languagePath } from "../lib/routing";

const STORAGE_KEY = "findqc-pro-language";
const LanguageContext = createContext(null);

export default function LanguageProvider({ children }) {
  const [language, setLanguageState] = useState(DEFAULT_LANGUAGE);

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const setLanguage = useCallback((nextLanguage) => {
    if (!isSupportedLanguage(nextLanguage)) return;
    setLanguageState(nextLanguage);
    window.localStorage.setItem(STORAGE_KEY, nextLanguage);
    if (nextLanguage !== DEFAULT_LANGUAGE) {
      const destination = languagePath(window.location.pathname, nextLanguage);
      window.location.assign(`${destination}${window.location.search}${window.location.hash}`);
    }
  }, []);

  const t = useCallback((key, values) => translate(language, key, values), [language]);
  const value = useMemo(() => ({ language, setLanguage, t }), [language, setLanguage, t]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used inside LanguageProvider");
  return context;
}
