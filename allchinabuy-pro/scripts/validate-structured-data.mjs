import { readFileSync, readdirSync } from "node:fs";
import { join, resolve } from "node:path";

const findsDir = resolve(process.cwd(), "out", "finds");
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

const pages = readdirSync(findsDir, { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .map((entry) => ({
    slug: entry.name,
    path: join(findsDir, entry.name, "index.html"),
  }));

for (const page of pages) {
  const html = readFileSync(page.path, "utf8");
  const scripts = [...html.matchAll(/<script\s+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)];
  const roots = [];

  for (const script of scripts) {
    try {
      roots.push(JSON.parse(script[1]));
    } catch (error) {
      failures.push(`/finds/${page.slug}/: invalid JSON-LD (${error.message})`);
    }
  }

  const objects = roots.flatMap((root) => schemaObjects(root));
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

if (failures.length > 0) {
  console.error(`Structured data validation failed:\n- ${[...new Set(failures)].join("\n- ")}`);
  process.exit(1);
}

console.log(`ItemPage and BreadcrumbList structured data passed for ${pages.length} find detail pages.`);
