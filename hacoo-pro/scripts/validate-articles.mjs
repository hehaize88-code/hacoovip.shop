import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { articles } from "../app/articles/data.js";
import { SITE_URL } from "../app/data.js";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const out = path.join(root, "out");
const problems = [];

function decode(text) {
  return text
    .replaceAll("&amp;", "&")
    .replaceAll("&quot;", '"')
    .replaceAll("&#x27;", "'")
    .replaceAll("&#39;", "'")
    .replaceAll("&nbsp;", " ")
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">");
}

function visibleWords(html) {
  const text = decode(html
    .replace(/<script\b[\s\S]*?<\/script>/gi, " ")
    .replace(/<style\b[\s\S]*?<\/style>/gi, " ")
    .replace(/<svg\b[\s\S]*?<\/svg>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " "));
  return text.match(/\b[A-Za-z0-9]+(?:[’'-][A-Za-z0-9]+)*\b/g) || [];
}

const hub = await readFile(path.join(out, "articles", "index.html"), "utf8");

for (const article of articles) {
  const file = path.join(out, "articles", article.slug, "index.html");
  const html = await readFile(file, "utf8");
  const match = html.match(/<article\b[^>]*data-longform-article[^>]*>([\s\S]*?)<\/article>/i);
  if (!match) {
    problems.push(`${article.slug}: missing long-form article marker`);
    continue;
  }
  const count = visibleWords(match[1]).length;
  if (count < 1200 || count > 1800) problems.push(`${article.slug}: ${count} visible English words; expected 1200-1800`);
  const canonical = `${SITE_URL}/articles/${article.slug}/`;
  if (!html.includes(`href="${canonical}"`)) problems.push(`${article.slug}: canonical URL missing`);
  if (!html.includes(`property="og:image" content="${SITE_URL}${article.image.path}"`)) problems.push(`${article.slug}: Open Graph image missing`);
  if (!html.includes(`src="${article.image.path}"`)) problems.push(`${article.slug}: visible article image missing`);
  if (!html.includes("Last checked") || !html.includes(article.checkedLabel)) problems.push(`${article.slug}: visible last-checked date missing`);
  if ((html.match(/class="source-link"/g) || []).length < 5) problems.push(`${article.slug}: fewer than five visible source links`);
  if (!hub.includes(`/articles/${article.slug}/`)) problems.push(`${article.slug}: article hub link missing`);
  console.log(`${article.slug}: ${count} visible English words`);
}

if (problems.length) {
  console.error(`Article validation failed:\n- ${problems.join("\n- ")}`);
  process.exit(1);
}

console.log(`Article validation passed for ${articles.length} research article${articles.length === 1 ? "" : "s"}.`);
