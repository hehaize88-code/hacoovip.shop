"use client";

import { useEffect, useRef, useState } from "react";

type GoogleTranslateWindow = Window & {
  google?: {
    translate?: {
      TranslateElement?: {
        new (
        options: {
          pageLanguage: string;
          includedLanguages: string;
          autoDisplay: boolean;
          layout?: unknown;
        },
        elementId: string,
        ): void;
        InlineLayout?: { SIMPLE?: unknown };
      };
    };
  };
  googleTranslateElementInit?: () => void;
};

const languages = [
  { code: "en", short: "EN", label: "English", markets: "US · UK · CA · AU" },
  { code: "fr", short: "FR", label: "Français", markets: "France · Canada" },
  { code: "de", short: "DE", label: "Deutsch", markets: "Germany · Austria" },
  { code: "id", short: "ID", label: "Bahasa Indonesia", markets: "Indonesia" },
  { code: "zh-CN", short: "中文", label: "简体中文", markets: "Official source UI" },
] as const;

function languageFromCookie() {
  if (typeof document === "undefined") return "en";
  const value = document.cookie
    .split("; ")
    .find((entry) => entry.startsWith("googtrans="))
    ?.split("=")[1];
  const code = value?.split("/").filter(Boolean).at(-1);
  return languages.some((language) => language.code === code) ? code! : "en";
}

export function LanguageSwitcher() {
  const [current, setCurrent] = useState("en");
  const detailsRef = useRef<HTMLDetailsElement>(null);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => setCurrent(languageFromCookie()));

    const translateWindow = window as GoogleTranslateWindow;
    const initialise = () => {
      const GoogleTranslateElement = translateWindow.google?.translate?.TranslateElement;
      const host = document.getElementById("google_translate_element");
      if (!GoogleTranslateElement || !host || host.childElementCount) return;

      new GoogleTranslateElement(
        {
          pageLanguage: "en",
          includedLanguages: languages.map((language) => language.code).join(","),
          autoDisplay: false,
        },
        "google_translate_element",
      );
    };

    translateWindow.googleTranslateElementInit = initialise;
    if (translateWindow.google?.translate?.TranslateElement) {
      initialise();
      return () => window.cancelAnimationFrame(frame);
    }

    if (!document.getElementById("google-translate-script")) {
      const script = document.createElement("script");
      script.id = "google-translate-script";
      script.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      document.head.appendChild(script);
    }

    return () => window.cancelAnimationFrame(frame);
  }, []);

  const applyLanguage = (code: string) => {
    setCurrent(code);
    document.documentElement.setAttribute("lang", code);

    const combo = document.querySelector<HTMLSelectElement>(".goog-te-combo");
    if (combo) {
      combo.value = code;
      combo.dispatchEvent(new Event("change", { bubbles: true }));
    } else {
      const value = code === "en" ? "/en/en" : `/en/${code}`;
      // Google Translate reads this first-party preference on the next page load.
      // eslint-disable-next-line react-hooks/immutability
      document.cookie = `googtrans=${value};path=/;max-age=31536000;SameSite=Lax`;
      window.location.reload();
    }

    detailsRef.current?.removeAttribute("open");
  };

  const active = languages.find((language) => language.code === current) ?? languages[0];

  return (
    <details className="language-switcher notranslate" ref={detailsRef} translate="no">
      <summary aria-label="Choose language">
        <span>LANG</span>
        <strong>{active.short}</strong>
        <i aria-hidden="true">⌄</i>
      </summary>
      <div className="language-panel">
        <div className="language-panel-head">
          <span>Audience languages</span>
          <small>Current page stays open</small>
        </div>
        <div className="language-options" aria-label="Available languages">
          {languages.map((language) => (
            <button
              type="button"
              className={language.code === current ? "is-active" : ""}
              aria-pressed={language.code === current}
              onClick={() => applyLanguage(language.code)}
              key={language.code}
            >
              <span>{language.short}</span>
              <strong>{language.label}</strong>
              <small>{language.markets}</small>
            </button>
          ))}
        </div>
        <div id="google_translate_element" aria-hidden="true" />
        <p>Full-page translation · powered by Google</p>
      </div>
    </details>
  );
}
