import { readFile } from "node:fs/promises";
import path from "node:path";

const BASE_URL = new URL(process.env.AUDIT_BASE || "https://hacoo.pro");
const AUDIT_DIR = process.env.AUDIT_DIR ? path.resolve(process.env.AUDIT_DIR) : null;
const sitemapUrl = new URL("/sitemap.xml", BASE_URL);

async function fetchChecked(url, options = {}) {
  const response = await fetch(url, {
    ...options,
    signal: AbortSignal.timeout(15000),
    headers: { "user-agent": "HacooProInternalLinkAudit/1.0", ...(options.headers || {}) },
  });
  if (!response.ok && (response.status < 300 || response.status >= 400)) {
    throw new Error(`${response.status} ${url}`);
  }
  return response;
}

async function mapLimit(items, limit, task) {
  const results = new Array(items.length);
  let cursor = 0;
  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, async () => {
    while (cursor < items.length) {
      const index = cursor++;
      results[index] = await task(items[index], index);
    }
  }));
  return results;
}

function extractAnchors(html, pageUrl) {
  const links = [];
  const pattern = /<a\b[^>]*\bhref=(['"])(.*?)\1/gi;
  for (const match of html.matchAll(pattern)) {
    const raw = match[2].replaceAll("&amp;", "&");
    if (!raw || raw.startsWith("#") || /^(mailto:|tel:|javascript:)/i.test(raw)) continue;
    try {
      const url = new URL(raw, pageUrl);
      if (url.hostname !== BASE_URL.hostname && url.hostname !== `www.${BASE_URL.hostname}`) continue;
      url.hash = "";
      links.push(url.href);
    } catch {}
  }
  return links;
}

const sitemapXml = AUDIT_DIR
  ? await readFile(path.join(AUDIT_DIR, "sitemap.xml"), "utf8")
  : await (await fetchChecked(sitemapUrl)).text();
const pageUrls = Array.from(sitemapXml.matchAll(/<loc>([^<]+)<\/loc>/g), (match) => match[1]);
if (!pageUrls.length) throw new Error(`No URLs found in ${sitemapUrl}`);

const linksByPage = new Map();
await mapLimit(pageUrls, 10, async (pageUrl) => {
  const pathname = new URL(pageUrl).pathname;
  const htmlPath = pathname === "/"
    ? path.join(AUDIT_DIR || "", "index.html")
    : path.join(AUDIT_DIR || "", pathname, "index.html");
  const html = AUDIT_DIR
    ? await readFile(htmlPath, "utf8")
    : await (await fetchChecked(pageUrl)).text();
  linksByPage.set(pageUrl, extractAnchors(html, pageUrl));
});

const sourcesByTarget = new Map();
for (const [source, targets] of linksByPage) {
  for (const target of new Set(targets)) {
    if (!sourcesByTarget.has(target)) sourcesByTarget.set(target, new Set());
    sourcesByTarget.get(target).add(source);
  }
}

const canonicalUrls = new Set(pageUrls);
function resolveCanonical(target) {
  const url = new URL(target);
  url.search = "";
  url.hash = "";
  url.hostname = BASE_URL.hostname;
  if (canonicalUrls.has(url.href)) return url.href;
  if (!url.pathname.endsWith("/")) {
    url.pathname = `${url.pathname}/`;
    if (canonicalUrls.has(url.href)) return url.href;
  }
  return null;
}

const redirects = [];
const linkErrors = [];
await mapLimit([...sourcesByTarget.keys()], 10, async (target) => {
  if (AUDIT_DIR) {
    const canonical = resolveCanonical(target);
    if (canonical && canonical !== target) {
      redirects.push({ target, status: 308, location: canonical, sources: [...sourcesByTarget.get(target)] });
    }
    return;
  }
  try {
    const response = await fetch(target, {
      method: "HEAD",
      redirect: "manual",
      signal: AbortSignal.timeout(15000),
      headers: { "user-agent": "HacooProInternalLinkAudit/1.0" },
    });
    if (response.status >= 300 && response.status < 400) {
      redirects.push({
        target,
        status: response.status,
        location: new URL(response.headers.get("location"), target).href,
        sources: [...sourcesByTarget.get(target)],
      });
    }
  } catch (error) {
    linkErrors.push({ target, error: error.name || error.message });
  }
});

const incoming = new Map(pageUrls.map((url) => [url, new Set()]));
for (const [source, targets] of linksByPage) {
  for (const target of new Set(targets)) {
    const normalized = resolveCanonical(target) || target.split("#")[0];
    if (incoming.has(normalized) && normalized !== source) incoming.get(normalized).add(source);
  }
}
const lowEntry = [...incoming]
  .filter(([url, sources]) => url !== `${BASE_URL.origin}/` && sources.size <= 2)
  .sort((a, b) => a[1].size - b[1].size || a[0].localeCompare(b[0]));

const report = {
  sitemapPages: pageUrls.length,
  distinctInternalTargets: sourcesByTarget.size,
  redirectCount: redirects.length,
  redirects: redirects.sort((a, b) => a.target.localeCompare(b.target)),
  linkErrors,
  lowEntryCount: lowEntry.length,
  lowEntry: lowEntry.map(([url, sources]) => ({ url, incomingPages: sources.size, sources: [...sources] })),
};

console.log(JSON.stringify(report, null, 2));

if (process.env.AUDIT_STRICT === "1" && (redirects.length || linkErrors.length || lowEntry.length)) {
  console.error(`Internal-link validation failed: ${redirects.length} redirects, ${linkErrors.length} request errors and ${lowEntry.length} pages with fewer than three incoming content links.`);
  process.exit(1);
}
