import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const outputPath = path.join(root, "hacoo-store-visual-preview.html");
const reviewPath = path.join(root, "hacoo-store-review-v2.html");
const articlesReviewPath = path.join(root, "hacoo-store-articles-review.html");
const checklistReviewPath = path.join(root, "hacoo-store-checklist-review.html");
const css = fs.readFileSync(path.join(root, "assets/styles.css"), "utf8");
const jsSource = fs.readFileSync(path.join(root, "assets/site.js"), "utf8");

const images = [
  { file: "shoes.webp", mime: "image/webp" },
  { file: "clothing.webp", mime: "image/webp" },
  { file: "bags.webp", mime: "image/webp" },
  { file: "accessories.webp", mime: "image/webp" },
  { file: "hacoo-logo.png", mime: "image/png" },
  { file: "search-nike-1.webp", mime: "image/webp" },
  { file: "search-nike-2.webp", mime: "image/webp" },
  { file: "search-nike-3.jpg", mime: "image/jpeg" }
];
const imageUris = new Map(images.map(({ file, mime }) => {
  const data = fs.readFileSync(path.join(root, "assets/images", file)).toString("base64");
  return [file, `data:${mime};base64,${data}`];
}));

function inlinePage(sourceFile, rewriteLinks = (value) => value) {
  let html = fs.readFileSync(path.join(root, sourceFile), "utf8");
  let js = jsSource;

  for (const [file, uri] of imageUris) {
    const escapedFile = file.replaceAll(".", "\\.");
    html = html.replace(new RegExp(`(?:\\.\\.\\/)*assets\\/images\\/${escapedFile}`, "g"), uri);
    js = js.replaceAll(`assets/images/${file}`, uri);
  }

  html = html.replace(
    /<link rel="stylesheet" href="(?:\.\.\/)*assets\/styles\.css">/,
    `<style>\n${css}\n</style>`
  );
  html = html.replace(
    /<script src="(?:\.\.\/)*assets\/site\.js" defer><\/script>/,
    `<script>\n${js}\n</script>`
  );
  return rewriteLinks(html);
}

const homeHtml = inlinePage("index.html", (html) => html
  .replaceAll('href="index.html"', 'href="hacoo-store-review-v2.html"')
  .replaceAll('href="articles/index.html"', 'href="hacoo-store-articles-review.html"')
  .replaceAll('href="guides/hacoo-shopping-checklist/index.html"', 'href="hacoo-store-checklist-review.html"'));

const articlesHtml = inlinePage("articles/index.html", (html) => html
  .replace('href="index.html" aria-current="page"', 'href="hacoo-store-articles-review.html" aria-current="page"')
  .replaceAll('href="../', 'href="')
  .replaceAll('href="articles/index.html"', 'href="hacoo-store-articles-review.html"')
  .replaceAll('href="index.html"', 'href="hacoo-store-review-v2.html"')
  .replaceAll('href="guides/hacoo-shopping-checklist/index.html"', 'href="hacoo-store-checklist-review.html"'));

const checklistHtml = inlinePage("guides/hacoo-shopping-checklist/index.html", (html) => html
  .replaceAll('href="../../', 'href="')
  .replaceAll('href="../', 'href="guides/')
  .replaceAll('href="index.html"', 'href="hacoo-store-review-v2.html"')
  .replaceAll('href="articles/index.html"', 'href="hacoo-store-articles-review.html"'));

fs.writeFileSync(outputPath, homeHtml);
fs.writeFileSync(reviewPath, homeHtml);
fs.writeFileSync(articlesReviewPath, articlesHtml);
fs.writeFileSync(checklistReviewPath, checklistHtml);
console.log(outputPath);
console.log(reviewPath);
console.log(articlesReviewPath);
console.log(checklistReviewPath);
