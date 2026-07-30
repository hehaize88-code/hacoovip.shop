import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, "..");
const catalog = JSON.parse(fs.readFileSync(path.join(root, "assets", "product-catalog.json"), "utf8"));

const categoryOrder = [
  "shoes",
  "hoodies",
  "t-shirts",
  "jackets",
  "bags",
  "accessories",
  "pants-shorts",
  "headwear",
  "jerseys",
  "electronics"
];

const oldImages = {
  shoes: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=82",
  hoodies: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=900&q=82",
  "t-shirts": "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=82",
  jackets: "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=900&q=82",
  bags: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=900&q=82",
  accessories: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=82",
  "pants-shorts": "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=900&q=82",
  headwear: "https://images.unsplash.com/photo-1521369909029-2afed882baee?auto=format&fit=crop&w=900&q=82",
  jerseys: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&w=900&q=82",
  electronics: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=82"
};
const oldBoardImage = "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=1100&q=86";

const representatives = Object.fromEntries(categoryOrder.map((category) => {
  const product = catalog.products.find((entry) => entry.category === category);
  if (!product) throw new Error(`No representative product for ${category}`);
  return [category, product];
}));

function escapeRegex(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function escapeAttribute(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function updateImageTag(tag, product) {
  let next = tag;
  if (/\salt="[^"]*"/.test(next)) {
    next = next.replace(/\salt="[^"]*"/, ` alt="${escapeAttribute(product.name)}"`);
  } else {
    next = next.replace("<img", `<img alt="${escapeAttribute(product.name)}"`);
  }
  if (!/\swidth="/.test(next)) next = next.replace("<img", '<img width="900"');
  if (!/\sheight="/.test(next)) next = next.replace("<img", '<img height="900"');
  if (!/\sdecoding="/.test(next)) next = next.replace(/\/?>$/, ' decoding="async"$&');
  return next;
}

function patchStaticHtml(file, category = null) {
  let html = fs.readFileSync(file, "utf8");
  const boardProduct = catalog.products.find((product) => product.page === "6043");
  if (!boardProduct) throw new Error("Homepage board product 6043 is missing");
  html = html.replaceAll(oldBoardImage, boardProduct.image);
  html = html.replaceAll(oldBoardImage.replaceAll("&", "&amp;"), boardProduct.image);
  for (const slug of categoryOrder) {
    const oldUrl = oldImages[slug];
    const encodedOldUrl = oldUrl.replaceAll("&", "&amp;");
    const product = representatives[slug];
    html = html.replaceAll(oldUrl, product.image);
    html = html.replaceAll(encodedOldUrl, product.image);
    const imagePattern = new RegExp(`<img[^>]*src="${escapeRegex(product.image)}"[^>]*\\/?>`, "g");
    html = html.replace(imagePattern, (tag) => updateImageTag(tag, product));
  }
  for (const product of catalog.products) {
    const imagePattern = new RegExp(`<img[^>]*src="${escapeRegex(product.image)}"[^>]*\\/?>`, "g");
    html = html.replace(imagePattern, (tag) => updateImageTag(tag, product));
  }

  if (file.endsWith(path.join(root, "index.html")) && !html.includes('class="kb-board-product-link"')) {
    const boardPattern = new RegExp(`(<div class="board-photo">)(<img[^>]*src="${escapeRegex(boardProduct.image)}"[^>]*\\/?>)`);
    html = html.replace(boardPattern, `$1<a class="kb-board-product-link" href="/products/${boardProduct.page}/" aria-label="Representative product: ${escapeAttribute(boardProduct.name)}">$2</a>`);
  }

  if (category) {
    const product = representatives[category];
    if (!html.includes('class="kb-category-featured"')) {
      const articlePattern = new RegExp(`(<article class="prose"[^>]*>)(<img[^>]*src="${escapeRegex(product.image)}"[^>]*\\/?>)`);
      html = html.replace(articlePattern, (_match, articleOpen, image) =>
        `${articleOpen}<a class="kb-category-featured" href="/products/${product.page}/" aria-label="Representative product: ${escapeAttribute(product.name)}">${image}<span>Representative product: ${escapeAttribute(product.name)} →</span></a>`
      );
    }
  } else if (file.endsWith(path.join("catalog", "index.html"))) {
    for (const slug of categoryOrder) {
      const product = representatives[slug];
      if (html.includes(`href="/products/${product.page}/" aria-label="Representative product`)) continue;
      const tilePattern = new RegExp(`(<article class="catalog-tile">)(<img[^>]*src="${escapeRegex(product.image)}"[^>]*\\/?>)`);
      html = html.replace(tilePattern, `$1<a class="kb-catalog-image-link" href="/products/${product.page}/" aria-label="Representative product: ${escapeAttribute(product.name)}">$2</a>`);
    }
  }

  fs.writeFileSync(file, html);
}

patchStaticHtml(path.join(root, "index.html"));
patchStaticHtml(path.join(root, "catalog", "index.html"));
for (const category of categoryOrder) {
  patchStaticHtml(path.join(root, "catalog", category, "index.html"), category);
}

const bundlePath = path.join(root, "assets", "localized-pages-BHilxPNc.js");
let bundle = fs.readFileSync(bundlePath, "utf8");
const boardProduct = catalog.products.find((product) => product.page === "6043");
bundle = bundle.replaceAll(oldBoardImage, boardProduct.image);
for (const category of categoryOrder) {
  const product = representatives[category];
  bundle = bundle.replaceAll(oldImages[category], product.image);
  const dataNeedle = `image:\`${product.image}\`,search:`;
  const dataReplacement = `image:\`${product.image}\`,imageAlt:\`${product.name.replaceAll("`", "\\`")}\`,representativePage:\`${product.page}\`,search:`;
  bundle = bundle.replace(dataNeedle, dataReplacement);
}
bundle = bundle.replaceAll(
  "src:e.image,alt:``,loading:`lazy`",
  "src:e.image,alt:e.imageAlt||e.name,width:900,height:900,loading:`lazy`"
);
bundle = bundle.replace(
  "src:r.image,alt:`${r.name} ${n.category.imageAlt}`,style:{",
  "src:r.image,alt:r.imageAlt||r.name,width:900,height:900,style:{"
);
bundle = bundle.replace(
  `src:\`${boardProduct.image}\`,alt:\`\``,
  `src:\`${boardProduct.image}\`,alt:\`${boardProduct.name.replaceAll("`", "\\`")}\`,width:900,height:900`
);
fs.writeFileSync(bundlePath, bundle);

console.log(JSON.stringify({
  replacedCategories: categoryOrder.length,
  representatives: Object.fromEntries(categoryOrder.map((category) => [
    category,
    {
      page: representatives[category].page,
      name: representatives[category].name,
      image: representatives[category].image
    }
  ]))
}, null, 2));
