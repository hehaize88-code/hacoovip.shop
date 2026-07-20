"use client";

import { GlobeIcon } from "./Icons";
import { LANGUAGE_OPTIONS } from "../lib/i18n";
import { useLanguage } from "./LanguageProvider";

export default function LanguageSwitcher({ mobile = false }) {
  const { language, setLanguage, t } = useLanguage();

  return (
    <label className={`language-switcher ${mobile ? "mobile" : ""}`}>
      <GlobeIcon size={16} />
      <span className="sr-only">{t("language.label")}</span>
      <select
        value={language}
        onChange={(event) => setLanguage(event.target.value)}
        aria-label={t("language.label")}
      >
        {LANGUAGE_OPTIONS.map((option) => (
          <option value={option.code} key={option.code}>{option.label}</option>
        ))}
      </select>
      <span className="language-chevron" aria-hidden="true" />
    </label>
  );
}
