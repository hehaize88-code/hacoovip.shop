"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export type Locale = "en" | "de" | "es" | "fr" | "it" | "pl" | "pt" | "zh";

const localeOptions: { code: Locale; label: string }[] = [
  { code: "en", label: "English" },
  { code: "de", label: "Deutsch" },
  { code: "es", label: "Español" },
  { code: "fr", label: "Français" },
  { code: "it", label: "Italiano" },
  { code: "pl", label: "Polski" },
  { code: "pt", label: "Português" },
  { code: "zh", label: "简体中文" },
];

export function useCurrentLanguage() {
  const [language, setLanguage] = useState<Locale>("en");

  useEffect(() => {
    const fromUrl = new URLSearchParams(window.location.search).get("lang") as Locale | null;
    const saved = window.localStorage.getItem("hipobuy-language") as Locale | null;
    const next = localeOptions.some((item) => item.code === fromUrl)
      ? fromUrl!
      : localeOptions.some((item) => item.code === saved)
        ? saved!
        : "en";
    const update = window.setTimeout(() => setLanguage(next), 0);
    document.documentElement.lang = next === "zh" ? "zh-CN" : next;
    return () => window.clearTimeout(update);
  }, []);

  return language;
}

export function SiteHeader({ home = false }: { home?: boolean }) {
  const language = useCurrentLanguage();

  function changeLanguage(next: Locale) {
    window.localStorage.setItem("hipobuy-language", next);
    const url = new URL(window.location.href);
    if (next === "en") url.searchParams.delete("lang");
    else url.searchParams.set("lang", next);
    window.location.assign(url.toString());
  }

  return (
    <header className={`site-header${home ? "" : " inner-header"}`}>
      <Link className="brand-logo notranslate" href="/" aria-label="Hipobuy Sheet home" data-no-translate>
        <img src="/hipobuy-logo.png" alt="Hipobuy" />
        <span>SHEET</span>
      </Link>
      <nav aria-label="Primary navigation">
        <a href="/spreadsheet/">Spreadsheet</a>
        <a href="/categories/">Categories</a>
        <a href="/qc-guide/">QC guide</a>
        <a href="/shipping/">Shipping</a>
        <a href="/faq/">FAQ</a>
        <a href="/articles/">Articles</a>
      </nav>
      <div className="header-actions">
        <label className="language-select notranslate" data-no-translate>
          <span aria-hidden="true">◎</span>
          <span className="sr-only">Language</span>
          <select value={language} onChange={(event) => changeLanguage(event.target.value as Locale)} aria-label="Language">
            {localeOptions.map((item) => <option value={item.code} key={item.code}>{item.label}</option>)}
          </select>
        </label>
        <a className="header-cta" href="https://cnfanshp.com/" target="_blank" rel="noopener noreferrer">Open full index <span>↗</span></a>
      </div>
    </header>
  );
}
