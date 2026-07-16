import { access } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { products } from "../app/data.js";
import { productResearch } from "../app/product-research.js";
import { LOCALIZED_PRODUCT_PAGE_COPY, PRODUCT_TRANSLATIONS } from "../app/product-locales.js";
import { LEGAL_COPY } from "../app/legal-copy.js";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const requiredFields = ["slug", "name", "catalogLabel", "listingId", "listingPath", "category", "categorySlug", "image", "query", "focus"];
const seenSlugs = new Set();
const seenListingIds = new Set();
const problems = [];
const researchFields = {
  seoDescription: "string",
  summary: "string",
  observed: 3,
  limits: "string",
  measurements: 4,
  qc: 4,
  workflow: 3,
  faqs: 4,
  updates: 2,
};
const localizedLocales = ["es", "fr", "de", "it", "pt"];

for (const product of products) {
  for (const field of requiredFields) {
    if (typeof product[field] !== "string" || product[field].trim() === "") problems.push(`${product.slug || "unknown"}: missing ${field}`);
  }
  if (seenSlugs.has(product.slug)) problems.push(`${product.slug}: duplicate slug`);
  if (seenListingIds.has(product.listingId)) problems.push(`${product.slug}: duplicate listing ID ${product.listingId}`);
  seenSlugs.add(product.slug);
  seenListingIds.add(product.listingId);

  const expectedPath = `/AllProducts/${product.listingId}.html`;
  if (product.listingPath !== expectedPath) problems.push(`${product.slug}: listingPath must be ${expectedPath}`);
  if (!product.image.startsWith("/products/")) problems.push(`${product.slug}: image must live under /public/products`);
  try {
    await access(path.join(projectRoot, "public", product.image.replace(/^\//, "")));
  } catch {
    problems.push(`${product.slug}: image file not found (${product.image})`);
  }

  const research = productResearch[product.slug];
  if (!research) {
    problems.push(`${product.slug}: missing product research`);
    continue;
  }
  for (const [field, requirement] of Object.entries(researchFields)) {
    if (requirement === "string" && (typeof research[field] !== "string" || research[field].trim() === "")) {
      problems.push(`${product.slug}: missing research ${field}`);
    }
    if (typeof requirement === "number" && (!Array.isArray(research[field]) || research[field].length < requirement)) {
      problems.push(`${product.slug}: research ${field} needs at least ${requirement} entries`);
    }
  }
}

if (products.length === 0) problems.push("Product index cannot be empty");
for (const slug of Object.keys(productResearch)) {
  if (!seenSlugs.has(slug)) problems.push(`${slug}: research record has no matching product`);
}

for (const locale of localizedLocales) {
  if (!LOCALIZED_PRODUCT_PAGE_COPY[locale]) problems.push(`${locale}: missing localized product page copy`);
  if (!LEGAL_COPY[locale]?.contact || !LEGAL_COPY[locale]?.privacy || !LEGAL_COPY[locale]?.terms) problems.push(`${locale}: incomplete localized trust-page copy`);
  for (const product of products) {
    const translation = PRODUCT_TRANSLATIONS[locale]?.[product.slug];
    if (!translation) {
      problems.push(`${locale}/${product.slug}: missing localized product record`);
      continue;
    }
    if (typeof translation.name !== "string" || translation.name.trim() === "") problems.push(`${locale}/${product.slug}: missing localized name`);
    if (typeof translation.summary !== "string" || translation.summary.length < 120) problems.push(`${locale}/${product.slug}: localized summary is too short`);
    if (!Array.isArray(translation.features) || translation.features.length < 3) problems.push(`${locale}/${product.slug}: needs three localized image observations`);
  }
}

if (problems.length) {
  console.error(`Product validation failed:\n- ${problems.join("\n- ")}`);
  process.exit(1);
}

console.log(`Product validation passed: ${products.length} unique records, complete English research, ${localizedLocales.length} localized product sets and trust-page copy.`);
