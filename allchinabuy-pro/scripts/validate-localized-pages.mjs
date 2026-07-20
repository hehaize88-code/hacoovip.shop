import { readFileSync } from "node:fs";
import { join, resolve } from "node:path";

const outDir = resolve(process.cwd(), "out");
const siteUrl = "https://allchinabuy.pro";
const failures = [];
const pages = {
  fr: {
    language: "fr-FR",
    expected: ["Aller au contenu", "Annuaire indépendant pour acheter en Chine", "Parcourez des catégories de produits claires.", "Toutes les sélections", "Confidentialité"],
  },
  de: {
    language: "de-DE",
    expected: ["Zum Inhalt springen", "Unabhängiges Verzeichnis für China-Einkäufe", "Klare Produktkategorien durchsuchen.", "Alle Funde", "Datenschutz"],
  },
  it: {
    language: "it-IT",
    expected: ["Vai al contenuto", "Directory indipendente per acquisti dalla Cina", "Esplora categorie di prodotti chiare.", "Tutti i prodotti", "Contatti"],
  },
  es: {
    language: "es-ES",
    expected: ["Saltar al contenido", "Directorio independiente de compras en China", "Explora categorías de productos claras.", "Todos los hallazgos", "Privacidad"],
  },
};

const forbiddenEnglish = [
  "Skip to content",
  "Independent China shopping directory",
  "Primary navigation",
  "Choose language",
  "Open menu",
  "Search products",
  "Browse clear product routes.",
  "Clearer product discovery, link routes and practical research notes for international shoppers.",
  "All finds",
  "Spreadsheet alternative",
  "Review method",
  "Independent directory. No products are sold or shipped here.",
];

function withoutScripts(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ");
}

for (const [locale, page] of Object.entries(pages)) {
  const html = readFileSync(join(outDir, locale, "index.html"), "utf8");
  const rendered = withoutScripts(html);
  const lang = html.match(/<html\s+lang="([^"]+)"/i)?.[1];
  if (lang !== page.language) failures.push(`/${locale}/: html lang is ${lang ?? "missing"}, expected ${page.language}`);
  if (!html.includes(`<link rel="canonical" href="${siteUrl}/${locale}/"`)) {
    failures.push(`/${locale}/: missing self-referencing canonical URL`);
  }
  for (const alternate of ["en", "fr", "de", "it", "es", "x-default"]) {
    if (!html.includes(`hrefLang="${alternate}"`) && !html.includes(`hreflang="${alternate}"`)) {
      failures.push(`/${locale}/: missing ${alternate} language alternate`);
    }
  }
  for (const phrase of page.expected) {
    if (!rendered.includes(phrase)) failures.push(`/${locale}/: missing translated text “${phrase}”`);
  }
  for (const phrase of forbiddenEnglish) {
    if (rendered.includes(phrase)) failures.push(`/${locale}/: untranslated text remains: “${phrase}”`);
  }
}

if (failures.length > 0) {
  console.error(`Localized page validation failed:\n- ${failures.join("\n- ")}`);
  process.exit(1);
}

console.log(`Localized content, html lang and language alternates passed for ${Object.keys(pages).length} pages.`);
