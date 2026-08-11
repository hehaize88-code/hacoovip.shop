import { cp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const projectRoot = dirname(dirname(fileURLToPath(import.meta.url)));
const outputRoot = join(projectRoot, "static-export");
const workerPath = join(projectRoot, "dist/server/index.js");
const clientRoot = join(projectRoot, "dist/client");

const workerUrl = pathToFileURL(workerPath);
workerUrl.searchParams.set("static-export", String(Date.now()));
const { default: worker } = await import(workerUrl.href);

const env = {
  ASSETS: {
    fetch: async (request) => {
      const url = new URL(request.url);
      try {
        const body = await readFile(join(clientRoot, url.pathname));
        return new Response(body);
      } catch {
        return new Response("Not found", { status: 404 });
      }
    },
  },
};
const ctx = { waitUntil() {}, passThroughOnException() {} };

async function render(pathname) {
  return worker.fetch(
    new Request(`https://superbuys.pro${pathname}`, {
      headers: { accept: "text/html" },
    }),
    env,
    ctx,
  );
}

await rm(outputRoot, { recursive: true, force: true });
await mkdir(outputRoot, { recursive: true });
await cp(clientRoot, outputRoot, { recursive: true });

const sitemapResponse = await render("/sitemap.xml");
if (sitemapResponse.status !== 200) {
  throw new Error(`Could not render sitemap.xml: ${sitemapResponse.status}`);
}
const sitemap = await sitemapResponse.text();
const routes = [
  "/",
  ...Array.from(sitemap.matchAll(/<loc>https:\/\/superbuys\.pro([^<]*)<\/loc>/g),
    (match) => {
      const route = match[1] || "/";
      return route === "/" ? route : route.replace(/\/$/, "");
    }),
];

for (const pathname of new Set(routes)) {
  const response = await render(pathname);
  if (response.status !== 200) {
    throw new Error(`Could not render ${pathname}: ${response.status}`);
  }
  const target = pathname === "/"
    ? join(outputRoot, "index.html")
    : join(outputRoot, pathname.replace(/^\//, ""), "index.html");
  await mkdir(dirname(target), { recursive: true });
  await writeFile(target, await response.text());
}

for (const pathname of ["/robots.txt", "/sitemap.xml"]) {
  const response = await render(pathname);
  if (response.status !== 200) {
    throw new Error(`Could not render ${pathname}: ${response.status}`);
  }
  await writeFile(join(outputRoot, pathname.slice(1)), await response.text());
}

const notFoundResponse = await render("/this-page-does-not-exist");
if (notFoundResponse.status !== 404) {
  throw new Error(`Expected a real 404, received ${notFoundResponse.status}`);
}
await writeFile(join(outputRoot, "404.html"), await notFoundResponse.text());

console.log(`Exported ${new Set(routes).size} HTML routes to ${outputRoot}`);
