import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const sourcePath = path.join(root, "index.html");
const outputPath = path.join(root, "hacoo-store-visual-preview.html");
const reviewPath = path.join(root, "hacoo-store-review-v2.html");

let html = fs.readFileSync(sourcePath, "utf8");
const css = fs.readFileSync(path.join(root, "assets/styles.css"), "utf8");
let js = fs.readFileSync(path.join(root, "assets/site.js"), "utf8");

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
for (const { file, mime } of images) {
  const source = `assets/images/${file}`;
  const data = fs.readFileSync(path.join(root, source)).toString("base64");
  const uri = `data:${mime};base64,${data}`;
  html = html.replaceAll(source, uri);
  js = js.replaceAll(source, uri);
}

html = html.replace(
  '<link rel="stylesheet" href="assets/styles.css">',
  `<style>\n${css}\n</style>`
);
html = html.replace(
  '<script src="assets/site.js" defer></script>',
  `<script>\n${js}\n</script>`
);

fs.writeFileSync(outputPath, html);
fs.writeFileSync(reviewPath, html);
console.log(outputPath);
console.log(reviewPath);
