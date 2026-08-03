import { readFile, writeFile } from "node:fs/promises";

const sourcePath = new URL("../app/article-content.ts", import.meta.url);
const outputPath = new URL("../app/article-translations.json", import.meta.url);
const source = await readFile(sourcePath, "utf8");
const match = source.match(/export const longArticles: LongArticle\[\] = (\[[\s\S]*\n\]);\s*$/);
if (!match) throw new Error("Could not locate longArticles in article-content.ts");

const englishArticles = Function(`"use strict"; return (${match[1]});`)();
const targets = ["de", "fr", "es", "it", "pl", "pt", "ro"];
const MAX_BATCH_CHARS = 4500;
const CONCURRENCY = 1;

function flattenStrings(value, path = [], entries = []) {
  if (typeof value === "string") {
    entries.push({ path, value });
    return entries;
  }
  if (Array.isArray(value)) value.forEach((item, index) => flattenStrings(item, [...path, index], entries));
  else if (value && typeof value === "object") {
    for (const [key, item] of Object.entries(value)) {
      if (key !== "slug") flattenStrings(item, [...path, key], entries);
    }
  }
  return entries;
}

function setAtPath(root, path, value) {
  let cursor = root;
  for (let index = 0; index < path.length - 1; index += 1) cursor = cursor[path[index]];
  cursor[path.at(-1)] = value;
}

function makeBatches(entries) {
  const batches = [];
  let current = [];
  let size = 0;
  for (const entry of entries) {
    const nextSize = entry.value.length + 14;
    if (current.length && size + nextSize > MAX_BATCH_CHARS) {
      batches.push(current);
      current = [];
      size = 0;
    }
    current.push(entry);
    size += nextSize;
  }
  if (current.length) batches.push(current);
  return batches;
}

const pause = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function translateBatch(target, batch, attempt = 1) {
  const separators = batch.slice(0, -1).map((_, index) => `⟦${index}⟧`);
  const query = batch.map((entry, index) => `${entry.value}${index < separators.length ? `\n${separators[index]}\n` : ""}`).join("");
  try {
    const graphQuery = "query Translate($source:String,$target:String,$query:String!){translation(source:$source,target:$target,query:$query){target{text}}}";
    const response = await fetch("https://lingva.ml/api/graphql", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ query: graphQuery, variables: { source: "en", target, query } }),
      signal: AbortSignal.timeout(45000),
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data = await response.json();
    const translation = data?.data?.translation?.target?.text;
    if (typeof translation !== "string") throw new Error(`Translation missing from response: ${JSON.stringify(data).slice(0, 200)}`);
    const markerPattern = /\n?⟦\d+⟧\n?/g;
    const translated = translation.split(markerPattern).map((text) => text.trim());
    if (translated.length !== batch.length || translated.some((text) => !text)) {
      throw new Error(`Expected ${batch.length} translated fields, received ${translated.length}`);
    }
    return translated;
  } catch (error) {
    if (attempt >= 8) throw error;
    const wait = String(error).includes("HTTP 429") ? 20000 * attempt : 2500 * attempt;
    process.stdout.write(`${target}: retry ${attempt} after ${String(error)}\n`);
    await pause(wait);
    return translateBatch(target, batch, attempt + 1);
  }
}

async function mapConcurrent(items, limit, worker) {
  const results = new Array(items.length);
  let next = 0;
  async function run() {
    while (next < items.length) {
      const index = next++;
      results[index] = await worker(items[index], index);
    }
  }
  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, run));
  return results;
}

const entries = flattenStrings(englishArticles);
const translatedByLanguage = {};
for (const target of targets) {
  const translatedArticles = structuredClone(englishArticles);
  const batches = makeBatches(entries);
  process.stdout.write(`${target}: translating ${entries.length} fields in ${batches.length} batches\n`);
  const translatedBatches = await mapConcurrent(batches, CONCURRENCY, async (batch, index) => {
    const values = await translateBatch(target, batch);
    process.stdout.write(`${target}: ${index + 1}/${batches.length}\n`);
    await pause(1200);
    return values;
  });
  let offset = 0;
  for (const values of translatedBatches) {
    values.forEach((value, index) => setAtPath(translatedArticles, entries[offset + index].path, value));
    offset += values.length;
  }
  translatedByLanguage[target] = translatedArticles;
  await writeFile(outputPath, `${JSON.stringify(translatedByLanguage, null, 2)}\n`, "utf8");
}

await writeFile(outputPath, `${JSON.stringify(translatedByLanguage, null, 2)}\n`, "utf8");
process.stdout.write(`wrote ${outputPath.pathname}\n`);
