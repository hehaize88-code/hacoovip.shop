import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { guides, SITE_URL } from "../app/data.js";
import { GUIDE_ARTICLE_IMAGES, ORGANIZATION_ID, ORGANIZATION_LOGO_ID, ORGANIZATION_LOGO_URL } from "../app/schema.js";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const out = path.join(root, "out");
const locales = ["en", "es", "fr", "de", "it", "pt"];
const localized = new Set(locales.filter((locale) => locale !== "en"));
const problems = [];

function htmlPathFor(url) {
  const pathname = new URL(url).pathname;
  return pathname === "/" ? path.join(out, "index.html") : path.join(out, pathname, "index.html");
}

function schemaNodes(html) {
  const nodes = [];
  for (const match of html.matchAll(/<script\s+type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    try {
      const value = JSON.parse(match[1]);
      const values = Array.isArray(value) ? value : [value];
      for (const item of values) nodes.push(...(item?.["@graph"] || [item]));
    } catch (error) {
      problems.push(`invalid JSON-LD: ${error.message}`);
    }
  }
  return nodes;
}

function isLocaleHome(url) {
  const segments = new URL(url).pathname.split("/").filter(Boolean);
  return segments.length === 0 || (segments.length === 1 && localized.has(segments[0]));
}

const sitemap = await readFile(path.join(out, "sitemap.xml"), "utf8");
const urls = Array.from(sitemap.matchAll(/<loc>([^<]+)<\/loc>/g), (match) => match[1]);
let breadcrumbPages = 0;

for (const url of urls) {
  const html = await readFile(htmlPathFor(url), "utf8");
  const nodes = schemaNodes(html);
  if (!isLocaleHome(url)) {
    const breadcrumbs = nodes.filter((node) => node?.["@type"] === "BreadcrumbList");
    if (breadcrumbs.length !== 1) problems.push(`${url}: expected one BreadcrumbList, found ${breadcrumbs.length}`);
    else {
      breadcrumbPages += 1;
      const items = breadcrumbs[0].itemListElement || [];
      if (items.length < 2) problems.push(`${url}: breadcrumb has fewer than two items`);
      items.forEach((item, index) => {
        if (item.position !== index + 1) problems.push(`${url}: breadcrumb position ${index + 1} is invalid`);
        if (!item.name || !item.item?.startsWith(`${SITE_URL}/`)) problems.push(`${url}: breadcrumb item ${index + 1} is incomplete`);
      });
      if (items.at(-1)?.item !== url) problems.push(`${url}: final breadcrumb does not match canonical URL`);
    }
  }
}

const homeHtml = await readFile(path.join(out, "index.html"), "utf8");
const homeNodes = schemaNodes(homeHtml);
const organization = homeNodes.find((node) => node?.["@id"] === ORGANIZATION_ID && node?.["@type"] === "Organization");
const logo = homeNodes.find((node) => node?.["@id"] === ORGANIZATION_LOGO_ID && node?.["@type"] === "ImageObject");
if (!organization) problems.push("homepage: missing Organization entity");
else if (organization.logo?.["@id"] !== ORGANIZATION_LOGO_ID) problems.push("homepage: Organization does not reference the fixed logo entity");
if (!logo) problems.push("homepage: missing Organization logo ImageObject");
else {
  if (logo.contentUrl !== ORGANIZATION_LOGO_URL) problems.push("homepage: incorrect Organization logo URL");
  if (Number(logo.width) < 112 || Number(logo.height) < 112) problems.push("homepage: Organization logo is smaller than 112x112");
}

const logoSvg = await readFile(path.join(root, "public", "hacoo-organization-logo.svg"), "utf8");
if (!logoSvg.includes('width="512"') || !logoSvg.includes('height="512"')) problems.push("logo asset: missing declared 512x512 dimensions");

let articlePages = 0;
for (const locale of locales) {
  for (const guide of guides) {
    const prefix = locale === "en" ? "" : `/${locale}`;
    const url = `${SITE_URL}${prefix}/guides/${guide.slug}/`;
    const html = await readFile(htmlPathFor(url), "utf8");
    const nodes = schemaNodes(html);
    const article = nodes.find((node) => node?.["@type"] === "Article");
    if (!article) {
      problems.push(`${url}: missing Article entity`);
      continue;
    }
    articlePages += 1;
    if (!article.image?.["@id"]) problems.push(`${url}: Article is missing image reference`);
    if (article.publisher?.["@id"] !== ORGANIZATION_ID) problems.push(`${url}: Article publisher is not the Organization entity`);
    const image = nodes.find((node) => node?.["@id"] === article.image?.["@id"] && node?.["@type"] === "ImageObject");
    const expected = GUIDE_ARTICLE_IMAGES[guide.slug];
    if (!image || image.contentUrl !== `${SITE_URL}${expected.path}`) problems.push(`${url}: Article image is missing or incorrect`);
    if (!html.includes(`src="${expected.path}"`)) problems.push(`${url}: Article image is not visible in page HTML`);
  }
}

if (problems.length) {
  console.error(`Structured-data validation failed:\n- ${problems.join("\n- ")}`);
  process.exit(1);
}

console.log(`Structured-data validation passed: ${breadcrumbPages} breadcrumb pages, ${articlePages} Article images and one 512x512 Organization logo entity.`);
