"use client";

import { useLayoutEffect } from "react";
import type { Locale } from "./site-header";

const supported: Locale[] = ["en", "de", "es", "fr", "it", "pl", "pt", "zh"];
const skippedTags = new Set(["SCRIPT", "STYLE", "NOSCRIPT", "CODE", "PRE", "OPTION"]);

function currentLocale(): Locale {
  const fromUrl = new URLSearchParams(window.location.search).get("lang") as Locale | null;
  const saved = window.localStorage.getItem("hipobuy-language") as Locale | null;
  if (fromUrl && supported.includes(fromUrl)) return fromUrl;
  if (saved && supported.includes(saved)) return saved;
  return "en";
}

function shouldTranslate(value: string) {
  const text = value.trim();
  return text.length > 1 && /[A-Za-z]/.test(text);
}

type TranslatedLocale = Exclude<Locale, "en">;
type Dictionary = Record<string, string>;

async function loadDictionary(language: TranslatedLocale): Promise<Dictionary> {
  switch (language) {
    case "de": return (await import("./translations/de.json")).default;
    case "es": return (await import("./translations/es.json")).default;
    case "fr": return (await import("./translations/fr.json")).default;
    case "it": return (await import("./translations/it.json")).default;
    case "pl": return (await import("./translations/pl.json")).default;
    case "pt": return (await import("./translations/pt.json")).default;
    case "zh": return (await import("./translations/zh.json")).default;
  }
}
const uiOverrides: Record<Exclude<Locale, "en">, Record<string, string>> = {
  de: { Checked: "Geprüft", snapshot: "Momentaufnahme" },
  es: { Checked: "Comprobado", snapshot: "referencia" },
  fr: { Checked: "Vérifié", snapshot: "instantané" },
  it: { Checked: "Verificato", snapshot: "istantanea" },
  pl: { Checked: "Sprawdzono", snapshot: "migawka" },
  pt: { Checked: "Verificado", snapshot: "instantâneo" },
  zh: { Checked: "已检查", snapshot: "参考快照" },
};

export function TranslationBridge() {
  useLayoutEffect(() => {
    const language = currentLocale();
    document.documentElement.lang = language === "zh" ? "zh-CN" : language;
    if (language === "en") return;
    const translatedLanguage: TranslatedLocale = language;

    let disposed = false;
    let running = false;
    let queued = false;
    let timer = 0;
    const textState = new WeakMap<Text, string>();
    const attributeState = new WeakMap<Element, Map<string, string>>();
    let dictionary: Dictionary = {};

    function excluded(element: Element | null) {
      return !element || skippedTags.has(element.tagName) || Boolean(element.closest("[data-no-translate],.notranslate"));
    }

    function translatedValue(source: string) {
      if (uiOverrides[translatedLanguage][source]) return uiOverrides[translatedLanguage][source];
      if (dictionary[source]) return dictionary[source];
      const rowCount = source.match(/^(\d+) \/ (\d+) rows$/);
      if (rowCount && dictionary["6 / 6 rows"]) {
        return dictionary["6 / 6 rows"].replace("6 / 6", `${rowCount[1]} / ${rowCount[2]}`);
      }
      return source;
    }

    function translatePage() {
      if (running || disposed) { queued = true; return; }
      running = true;
      queued = false;

      const textEntries: { node: Text; source: string; prefix: string; suffix: string }[] = [];
      const attributeEntries: { element: Element; attribute: string; source: string }[] = [];
      const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
      let node = walker.nextNode() as Text | null;
      while (node) {
        const parent = node.parentElement;
        const raw = node.nodeValue || "";
        const source = raw.trim();
        if (!excluded(parent) && shouldTranslate(source) && textState.get(node) !== source) {
          textEntries.push({ node, source, prefix: raw.match(/^\s*/)?.[0] || "", suffix: raw.match(/\s*$/)?.[0] || "" });
        }
        node = walker.nextNode() as Text | null;
      }

      document.querySelectorAll("[placeholder],[title],[aria-label]").forEach((element) => {
        if (excluded(element)) return;
        const state = attributeState.get(element) || new Map<string, string>();
        ["placeholder", "title", "aria-label"].forEach((attribute) => {
          const source = element.getAttribute(attribute)?.trim() || "";
          if (shouldTranslate(source) && state.get(attribute) !== source) attributeEntries.push({ element, attribute, source });
        });
      });

      textEntries.forEach(({ node: textNode, source, prefix, suffix }) => {
        const value = translatedValue(source);
        textNode.nodeValue = `${prefix}${value}${suffix}`;
        textState.set(textNode, value);
      });
      attributeEntries.forEach(({ element, attribute, source }) => {
        const value = translatedValue(source);
        element.setAttribute(attribute, value);
        const state = attributeState.get(element) || new Map<string, string>();
        state.set(attribute, value);
        attributeState.set(element, state);
      });

      running = false;
      if (queued && !disposed) translatePage();
    }

    const observer = new MutationObserver(() => {
      window.clearTimeout(timer);
      timer = window.setTimeout(translatePage, 90);
    });
    loadDictionary(translatedLanguage).then((loaded) => {
      if (disposed) return;
      dictionary = loaded;
      observer.observe(document.body, { childList: true, subtree: true, characterData: true });
      translatePage();
    });

    return () => {
      disposed = true;
      observer.disconnect();
      window.clearTimeout(timer);
    };
  }, []);

  return null;
}
