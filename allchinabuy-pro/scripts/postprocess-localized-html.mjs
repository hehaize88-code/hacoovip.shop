import { readFileSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";

const outDir = resolve(process.cwd(), "out");
const localeLanguages = {
  fr: "fr-FR",
  de: "de-DE",
  it: "it-IT",
  es: "es-ES",
};

for (const [locale, language] of Object.entries(localeLanguages)) {
  const path = join(outDir, locale, "index.html");
  const html = readFileSync(path, "utf8");
  const current = html.match(/<html\s+lang="([^"]+)"/i)?.[1];
  if (current !== "en") {
    throw new Error(`${locale}: expected the Next.js export to use the root language en, found ${current ?? "none"}`);
  }
  const localized = html.replace('<html lang="en">', `<html lang="${language}">`);
  if (localized === html) throw new Error(`${locale}: failed to localize the html lang attribute`);
  writeFileSync(path, localized);
}

console.log(`Localized html lang attributes for ${Object.keys(localeLanguages).length} pages.`);
