import { cp, mkdir, rm } from "node:fs/promises";
import { resolve } from "node:path";

const projectRoot = resolve(import.meta.dirname, "..");
const clientDir = resolve(projectRoot, "dist", "client");
const serverDir = resolve(projectRoot, "dist", "server");
const pagesDir = resolve(projectRoot, "dist", "pages");
const workerDir = resolve(pagesDir, "_worker.js");

await rm(pagesDir, { recursive: true, force: true });
await mkdir(pagesDir, { recursive: true });

// Pages serves the client files and treats _worker.js as its advanced-mode
// Function. Vinext already emits a valid Module Worker plus its ESM modules;
// preserve that module layout instead of flattening or rebundling it.
await cp(clientDir, pagesDir, { recursive: true });
await mkdir(workerDir, { recursive: true });
await cp(serverDir, workerDir, { recursive: true });

// This generated Wrangler file belongs to the standalone Worker artifact. If
// left inside _worker.js, Pages follows its ../client assets path, which is not
// part of the Pages output layout.
await rm(resolve(workerDir, "wrangler.json"), { force: true });
await rm(resolve(workerDir, ".dev.vars"), { force: true });

console.log("Prepared Cloudflare Pages artifact in dist/pages.");
