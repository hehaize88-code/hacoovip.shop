import { access, mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";

const assets = [
  "usfans.png",
  "products/cap.webp",
  "products/crewneck.webp",
  "products/hoodie.webp",
  "products/jeans.webp",
  "products/polo.webp",
  "products/shorts.webp",
  "products/sneakers.jpg",
];

for (const asset of assets) {
  const output = join("public", asset);
  const encoded = `${output}.b64`;

  try {
    await access(encoded);
  } catch {
    continue;
  }

  const base64 = (await readFile(encoded, "utf8")).trim();
  await mkdir(dirname(output), { recursive: true });
  await writeFile(output, Buffer.from(base64, "base64"));
}
