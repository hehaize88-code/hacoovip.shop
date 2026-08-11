"use client";

type Language = { code: string; label: string; short: string; href: string };

export default function LanguageSwitcher({ current, languages, label }: { current: string; languages: Language[]; label: string }) {
  const selected = languages.find((language) => language.code === current) ?? languages[0];

  return (
    <details className="language-switcher">
      <summary aria-label={label}><span>{selected.short}</span><b>⌄</b></summary>
      <div className="language-menu">
        {languages.map((language) => (
          <a className={language.code === current ? "active" : ""} href={language.href} hrefLang={language.code} key={language.code}>
            <span>{language.short}</span>{language.label}
          </a>
        ))}
      </div>
    </details>
  );
}
