import { access } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { products } from "../app/data.js";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const requiredFields = ["slug", "name", "catalogLabel", "listingId", "listingPath", "category", "categorySlug", "image", "query", "focus"];
const seenSlugs = new Set();
const seenListingIds = new Set();
const problems = [];

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
}

if (products.length === 0) problems.push("Product index cannot be empty");

if (problems.length) {
  console.error(`Product validation failed:\n- ${problems.join("\n- ")}`);
  process.exit(1);
}

console.log(`Product validation passed: ${products.length} unique records and local images.`);
