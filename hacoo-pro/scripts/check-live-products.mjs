import { products, DESTINATION } from "../app/data.js";

const timeoutMs = 20_000;
const failures = [];

function match(content, expression) {
  return content.match(expression)?.[1]?.trim() || "";
}

async function loadProductPage(url) {
  let lastError;
  for (let attempt = 1; attempt <= 2; attempt += 1) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), timeoutMs);
    try {
      const response = await fetch(url, {
        redirect: "follow",
        signal: controller.signal,
        headers: { "user-agent": "HacooPro-LinkCheck/1.0 (+https://hacoo.pro/products/)" },
      });
      return { response, html: await response.text() };
    } catch (error) {
      lastError = error;
      if (attempt === 1) console.warn(`RETRY ${url} after ${error.name === "AbortError" ? "timeout" : error.message}`);
    } finally {
      clearTimeout(timeout);
    }
  }
  throw lastError;
}

for (const product of products) {
  const url = `${DESTINATION}${product.listingPath}`;
  try {
    const { response, html } = await loadProductPage(url);
    const title = match(html, /<title>([^<]+)<\/title>/i);
    const canonical = match(html, /<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["']/i);
    const image = match(html, /<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["']/i);
    const canonicalPath = canonical ? new URL(canonical, response.url).pathname : "";
    const softError = /(?:^|\s)(?:404|not found)(?:\s|$)/i.test(title)
      || /<(?:h1|h2|main)[^>]*>[^<]*(?:页面不存在|商品不存在|已下架|not found)/i.test(html);
    const valid = response.ok && canonicalPath === product.listingPath && Boolean(title) && Boolean(image) && !softError;
    if (!valid) {
      failures.push(`${product.slug}: status=${response.status}, canonical=${canonicalPath || "missing"}, title=${title || "missing"}, image=${image ? "yes" : "no"}`);
    } else {
      console.log(`PASS ${product.listingId} ${response.status} ${title}`);
    }
  } catch (error) {
    failures.push(`${product.slug}: ${error.name === "AbortError" ? "timed out" : error.message}`);
  }
}

if (failures.length) {
  console.error(`\n${failures.length} live product check(s) failed:\n- ${failures.join("\n- ")}`);
  process.exit(1);
}

console.log(`\nLive product check passed: ${products.length}/${products.length} detail routes returned matching product pages.`);
