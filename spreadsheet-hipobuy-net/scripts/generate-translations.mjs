import { mkdir, writeFile } from "node:fs/promises";

const routes = [
  "/", "/spreadsheet", "/categories", "/qc-guide", "/shipping", "/faq", "/articles",
  "/articles/how-to-buy-with-hipobuy", "/articles/hipobuy-qc-photos", "/articles/hipobuy-shipping-cost",
];
const languages = ["de", "es", "fr", "it", "pl", "pt", "zh"];
const workerUrl = new URL("../dist/server/index.js", import.meta.url);
workerUrl.searchParams.set("translations", `${process.pid}-${Date.now()}`);
const { default: worker } = await import(workerUrl.href);
const env = { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } };
const ctx = { waitUntil() {}, passThroughOnException() {} };

function decode(value) {
  return value
    .replace(/&nbsp;/g, " ").replace(/&amp;/g, "&").replace(/&quot;/g, '"')
    .replace(/&#x27;/g, "'").replace(/&#39;/g, "'").replace(/&lt;/g, "<").replace(/&gt;/g, ">")
    .replace(/&#(\d+);/g, (_, number) => String.fromCodePoint(Number(number)))
    .replace(/&#x([0-9a-f]+);/gi, (_, number) => String.fromCodePoint(Number.parseInt(number, 16)));
}

function useful(value) {
  const text = decode(value).trim();
  return text.length > 1 && /[A-Za-z]/.test(text) ? text : null;
}

function extract(html) {
  const values = new Set();
  const cleaned = html
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/<(script|style|noscript|code|pre|option)\b[^>]*>[\s\S]*?<\/\1>/gi, "")
    .replace(/<[^>]+>/g, "\n");
  for (const part of cleaned.split("\n")) {
    const value = useful(part);
    if (value) values.add(value);
  }
  for (const match of html.matchAll(/\b(?:placeholder|title|aria-label)="([^"]+)"/g)) {
    const value = useful(match[1]);
    if (value) values.add(value);
  }
  return values;
}

const strings = new Set();
for (const route of routes) {
  const response = await worker.fetch(new Request(`http://localhost${route}`, { headers: { accept: "text/html" } }), env, ctx);
  if (response.status !== 200) throw new Error(`${route} rendered ${response.status}`);
  extract(await response.text()).forEach((value) => strings.add(value));
}

async function translateText(text, language) {
  const url = new URL("https://translate.googleapis.com/translate_a/single");
  url.searchParams.set("client", "gtx");
  url.searchParams.set("sl", "en");
  url.searchParams.set("tl", language === "zh" ? "zh-CN" : language);
  url.searchParams.set("dt", "t");
  url.searchParams.set("q", text);
  for (let attempt = 0; attempt < 4; attempt += 1) {
    const response = await fetch(url, { headers: { accept: "application/json" } });
    if (response.ok) {
      const payload = await response.json();
      return payload[0].map((part) => part[0]).join("");
    }
    await new Promise((resolve) => setTimeout(resolve, 800 * (attempt + 1)));
  }
  throw new Error(`Could not translate: ${text.slice(0, 60)}`);
}

async function mapConcurrent(items, limit, callback) {
  const output = new Array(items.length);
  let cursor = 0;
  async function runner() {
    while (cursor < items.length) {
      const index = cursor++;
      output[index] = await callback(items[index]);
    }
  }
  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, runner));
  return output;
}

const sources = [...strings].sort();
const outputDirectory = new URL("../app/translations/", import.meta.url);
await mkdir(outputDirectory, { recursive: true });
for (const language of languages) {
  const values = await mapConcurrent(sources, 8, (source) => translateText(source, language));
  const translations = Object.fromEntries(sources.map((source, index) => [source, values[index]]));
  await writeFile(new URL(`${language}.json`, outputDirectory), `${JSON.stringify(translations, null, 2)}\n`, "utf8");
  process.stdout.write(`${language}: ${sources.length} strings\n`);
}
