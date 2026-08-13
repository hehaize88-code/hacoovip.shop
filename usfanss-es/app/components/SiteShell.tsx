"use client";

import { useState } from "react";
import { languageOptions, Lang } from "../i18n";
import { useLanguage } from "./LanguageProvider";

const routes = ["/discover/", "/categories/", "/how-it-works/", "/articles/", "/faq/"];

export function SiteShell({ children }: { children: React.ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const { lang, setLang, d, withLang } = useLanguage();

  return <main id="top">
    <header className="topbar">
      <a className="logo" href={withLang("/")} aria-label="USFans home">
        <img src="/usfans-logo.png" alt="USFans" />
      </a>
      <nav className={menuOpen ? "nav open" : "nav"} aria-label="Main navigation">
        {d.nav.map((label, index) => <a key={routes[index]} href={withLang(routes[index])} onClick={() => setMenuOpen(false)}>{label}</a>)}
        <label className="mobile-language">
          <span>{d.language}</span>
          <select value={lang} onChange={(event) => setLang(event.target.value as Lang)}>
            {languageOptions.map(option => <option key={option.code} value={option.code}>{option.label}</option>)}
          </select>
        </label>
      </nav>
      <div className="top-actions">
        <label className="language-select" title={d.language}>
          <span className="sr-only">{d.language}</span>
          <select value={lang} onChange={(event) => setLang(event.target.value as Lang)} aria-label={d.language}>
            {languageOptions.map(option => <option key={option.code} value={option.code}>{option.short}</option>)}
          </select>
        </label>
        <a href="https://cnfanshp.com/AllProducts/" target="_blank" rel="noreferrer">{d.explore} <i>↗</i></a>
      </div>
      <button className="menu" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu" aria-expanded={menuOpen}><span/><span/></button>
    </header>

    {children}

    <footer>
      <a className="footer-logo" href={withLang("/")}><img src="/usfans-logo.png" alt="USFans" /></a>
      <p>{d.footer}</p>
      <div><a href="#top">{d.backTop} ↑</a><a href="https://cnfanshp.com/AllProducts/" target="_blank" rel="noreferrer">{d.openCatalog} ↗</a></div>
    </footer>
  </main>;
}
