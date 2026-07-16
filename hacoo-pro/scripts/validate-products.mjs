import { access } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { products } from "../app/data.js";
import { productResearch } from "../app/product-research.js";

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

if (problems.length) {
  console.error(`Product validation failed:\n- ${problems.join("\n- ")}`);
  process.exit(1);
}

console.log(`Product validation passed: ${products.length} unique records, local images and complete research modules.`);
