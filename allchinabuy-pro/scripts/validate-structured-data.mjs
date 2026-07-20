import { readFileSync, readdirSync } from "node:fs";
import { join, resolve } from "node:path";

const findsDir = resolve(process.cwd(), "out", "finds");
const faqPath = resolve(process.cwd(), "out", "faq", "index.html");
const siteUrl = "https://allchinabuy.pro";
const failures = [];
const forbiddenProperties = new Set(["offers", "review", "aggregateRating"]);

function schemaObjects(value, result = []) {
  if (Array.isArray(value)) {
    for (const item of value) schemaObjects(item, result);
    return result;
  }

  if (value && typeof value === "object") {
    result.push(value);
    for (const item of Object.values(value)) schemaObjects(item, result);
  }

  return result;
}

function hasType(value, type) {
  const types = Array.isArray(value?.["@type"]) ? value["@type"] : [value?.["@type"]];
  return types.includes(type);
}

function parseSchemaObjects(html, route) {
  const scripts = [...html.matchAll(/<script\s+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)];
  const roots = [];

  for (const script of scripts) {
    try {
      roots.push(JSON.parse(script[1]));
    } catch (error) {
      failures.push(`${route}: invalid JSON-LD (${error.message})`);
    }
  }

  return roots.flatMap((root) => schemaObjects(root));
}

const pages = readdirSync(findsDir, { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .map((entry) => ({
    slug: entry.name,
    path: join(findsDir, entry.name, "index.html"),
  }));

for (const page of pages) {
  const html = readFileSync(page.path, "utf8");
  const objects = parseSchemaObjects(html, `/finds/${page.slug}/`);
  const itemPage = objects.find((value) => hasType(value, "ItemPage"));
  const breadcrumb = objects.find((value) => hasType(value, "BreadcrumbList"));
  const pageUrl = `${siteUrl}/finds/${page.slug}`;
  const breadcrumbId = `${pageUrl}#breadcrumb`;

  if (!itemPage) {
    failures.push(`/finds/${page.slug}/: missing ItemPage structured data`);
  } else {
    if (itemPage.url !== pageUrl) failures.push(`/finds/${page.slug}/: ItemPage URL does not match the page`);
    if (itemPage["@id"] !== `${pageUrl}#webpage`) failures.push(`/finds/${page.slug}/: ItemPage @id is incorrect`);
    if (itemPage.breadcrumb?.["@id"] !== breadcrumbId) failures.push(`/finds/${page.slug}/: ItemPage breadcrumb reference is incorrect`);
    if (!itemPage.primaryImageOfPage?.url?.startsWith(`${siteUrl}/images/`)) {
      failures.push(`/finds/${page.slug}/: ItemPage is missing an absolute primary image URL`);
    }
  }

  if (!breadcrumb) {
    failures.push(`/finds/${page.slug}/: missing BreadcrumbList structured data`);
  } else {
    if (breadcrumb["@id"] !== breadcrumbId) failures.push(`/finds/${page.slug}/: BreadcrumbList @id is incorrect`);
    const items = breadcrumb.itemListElement;
    if (!Array.isArray(items) || items.length !== 3) {
      failures.push(`/finds/${page.slug}/: breadcrumb must contain Home, Finds and the current page`);
    } else {
      const positions = items.map((item) => item.position).join(",");
      if (positions !== "1,2,3") failures.push(`/finds/${page.slug}/: breadcrumb positions are not sequential`);
      if (items[2]?.item !== pageUrl) failures.push(`/finds/${page.slug}/: final breadcrumb URL does not match the page`);
    }
  }

  for (const value of objects) {
    if (hasType(value, "Product")) failures.push(`/finds/${page.slug}/: unsupported Product schema remains`);
    for (const property of forbiddenProperties) {
      if (Object.hasOwn(value, property)) failures.push(`/finds/${page.slug}/: unsupported ${property} property remains`);
    }
  }
}

if (pages.length !== 12) {
  failures.push(`Expected 12 find detail pages, audited ${pages.length}`);
}

const faqHtml = readFileSync(faqPath, "utf8");
const faqObjects = parseSchemaObjects(faqHtml, "/faq/");
const faqWebPage = faqObjects.find((value) => hasType(value, "WebPage"));
const visibleQuestions = [...faqHtml.matchAll(/<details\s+id="[^"]+"/gi)].length;
const visibleAnswers = [...faqHtml.matchAll(/class="faq-accordion__answer"/gi)].length;

if (!faqWebPage) {
  failures.push("/faq/: missing WebPage structured data");
} else {
  if (faqWebPage.url !== `${siteUrl}/faq`) failures.push("/faq/: WebPage URL is incorrect");
  if (faqWebPage["@id"] !== `${siteUrl}/faq#webpage`) failures.push("/faq/: WebPage @id is incorrect");
}

for (const value of faqObjects) {
  for (const retiredType of ["FAQPage", "Question", "Answer"]) {
    if (hasType(value, retiredType)) failures.push(`/faq/: retired ${retiredType} rich-result schema remains`);
  }
}

if (visibleQuestions !== 30 || visibleAnswers !== 30) {
  failures.push(`/faq/: expected 30 visible questions and answers, found ${visibleQuestions} questions and ${visibleAnswers} answers`);
}

if (failures.length > 0) {
  console.error(`Structured data validation failed:\n- ${[...new Set(failures)].join("\n- ")}`);
  process.exit(1);
}

console.log(
  `Structured data passed for ${pages.length} find detail pages; FAQ WebPage and 30 visible answers passed.`,
);
