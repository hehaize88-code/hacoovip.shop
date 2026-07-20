import { existsSync, readdirSync, statSync } from "node:fs";
import { extname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = fileURLToPath(new URL("..", import.meta.url));
const imageRoot = join(projectRoot, "public", "images");
const rasterExtensions = new Set([".avif", ".jpeg", ".jpg", ".png", ".webp"]);
const maxRasterBytes = 512 * 1024;
const maxRasterDirectoryBytes = 5 * 1024 * 1024;

const requiredResponsiveImages = [
  "hero-collage.webp",
  "hero-collage-560.webp",
  "neutral-sneaker.webp",
  "neutral-sneaker-640.webp",
  "charcoal-tee.webp",
  "charcoal-tee-640.webp",
  "charcoal-jacket.webp",
  "charcoal-jacket-640.webp",
  "everyday-bottoms.webp",
  "everyday-bottoms-640.webp",
  "cap-accessories.webp",
  "cap-accessories-640.webp",
  "black-crossbody.webp",
  "black-crossbody-640.webp",
  "sports-jersey.webp",
  "sports-jersey-640.webp",
  "small-electronics.webp",
  "small-electronics-640.webp",
];

function walk(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name);
    return entry.isDirectory() ? walk(path) : [path];
  });
}

const missingResponsiveImages = requiredResponsiveImages.filter(
  (name) => !existsSync(join(imageRoot, name)),
);

const rasterFiles = walk(imageRoot).filter((path) =>
  rasterExtensions.has(extname(path).toLowerCase()),
);
const rasterSizes = rasterFiles.map((path) => ({ path, size: statSync(path).size }));
const oversizedImages = rasterSizes.filter(({ size }) => size > maxRasterBytes);
const totalRasterBytes = rasterSizes.reduce((total, { size }) => total + size, 0);

if (missingResponsiveImages.length > 0) {
  throw new Error(`Missing responsive images: ${missingResponsiveImages.join(", ")}`);
}

if (oversizedImages.length > 0) {
  const list = oversizedImages
    .map(({ path, size }) => `${relative(projectRoot, path)} (${Math.ceil(size / 1024)} KiB)`)
    .join(", ");
  throw new Error(`Raster images exceed the 512 KiB budget: ${list}`);
}

if (totalRasterBytes > maxRasterDirectoryBytes) {
  throw new Error(
    `Raster image directory is ${Math.ceil(totalRasterBytes / 1024)} KiB; budget is 5120 KiB`,
  );
}

console.log(
  `Image budget passed: ${rasterFiles.length} raster files, ${Math.ceil(totalRasterBytes / 1024)} KiB total`,
);
