const MAIN_ORIGIN = "https://www.cnfanshp.com";
const SEARCH_TTL_SECONDS = 300;

function jsonResponse(status, payload, extraHeaders = {}) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": status === 200
        ? `public, max-age=60, s-maxage=${SEARCH_TTL_SECONDS}, stale-while-revalidate=600`
        : "no-store",
      "X-Robots-Tag": "noindex, nofollow",
      "X-Content-Type-Options": "nosniff",
      ...extraHeaders
    }
  });
}

function decodeEntities(value) {
  const named = { amp: "&", quot: '"', apos: "'", lt: "<", gt: ">", nbsp: " " };
  return String(value || "").replace(/&(#x?[0-9a-f]+|[a-z]+);/gi, (match, entity) => {
    if (entity[0] === "#") {
      const hexadecimal = entity[1]?.toLowerCase() === "x";
      const codePoint = Number.parseInt(entity.slice(hexadecimal ? 2 : 1), hexadecimal ? 16 : 10);
      return Number.isInteger(codePoint) && codePoint >= 0 && codePoint <= 0x10ffff
        ? String.fromCodePoint(codePoint)
        : match;
    }
    return named[entity.toLowerCase()] ?? match;
  });
}

function plainText(value) {
  return decodeEntities(String(value || "").replace(/<[^>]+>/g, " "))
    .replace(/\s+/g, " ")
    .trim();
}

function allowedMainUrl(value, requiredPrefix) {
  try {
    const url = new URL(value, MAIN_ORIGIN);
    if (url.origin !== MAIN_ORIGIN || !url.pathname.startsWith(requiredPrefix)) return "";
    return url.href;
  } catch (error) {
    return "";
  }
}

export function parseProducts(html, limit = 6) {
  const fragments = String(html || "").split(/<div\s+class="[^"]*\bproduct-card\b[^"]*"/i).slice(1);
  const items = [];

  for (const fragment of fragments) {
    if (items.length >= limit) break;

    const linkPath = fragment.match(/<a\s+href="([^"]+)"\s+class="[^"]*\bproduct-image\b/i)?.[1] || "";
    const imagePath = fragment.match(/<img\b[^>]*\bdata-src="([^"]+)"/i)?.[1]
      || fragment.match(/<img\b[^>]*\bsrc="([^"]+)"/i)?.[1]
      || "";
    const title = plainText(fragment.match(/<h3\s+class="[^"]*\bproduct-name\b[^"]*">([\s\S]*?)<\/h3>/i)?.[1]);
    const price = plainText(fragment.match(/<div\s+class="[^"]*\bproduct-price\b[^"]*">([\s\S]*?)<\/div>/i)?.[1]);
    const url = allowedMainUrl(linkPath, "/AllProducts/");
    const image = allowedMainUrl(imagePath, "/uploads/");

    if (!title || !url || !image) continue;
    items.push({ title, url, image, price });
  }

  return items;
}

async function upstreamSearch(query) {
  const sourceUrl = `${MAIN_ORIGIN}/search.html?keywords=${encodeURIComponent(query)}&channelid=2`;
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 12000);

  try {
    const response = await fetch(sourceUrl, {
      redirect: "follow",
      signal: controller.signal,
      headers: {
        "Accept": "text/html,application/xhtml+xml",
        "User-Agent": "HacooStoreSearch/2.0"
      }
    });
    if (!response.ok) throw new Error(`Upstream returned ${response.status}`);
    return await response.text();
  } finally {
    clearTimeout(timeout);
  }
}

async function handleSearch(request, context) {
  if (request.method !== "GET") return jsonResponse(405, { error: "Method not allowed" }, { Allow: "GET" });

  const requestUrl = new URL(request.url);
  const query = (requestUrl.searchParams.get("q") || "").trim();
  if (query.length < 2 || query.length > 80) {
    return jsonResponse(400, { error: "Enter between 2 and 80 characters" });
  }

  const edgeCache = typeof caches !== "undefined" ? caches.default : null;
  const cacheKey = new Request(requestUrl.toString(), { method: "GET" });
  if (edgeCache) {
    const cached = await edgeCache.match(cacheKey);
    if (cached) {
      const headers = new Headers(cached.headers);
      headers.set("X-Search-Cache", "HIT");
      return new Response(cached.body, { status: cached.status, headers });
    }
  }

  try {
    const html = await upstreamSearch(query);
    const response = jsonResponse(200, { query, items: parseProducts(html) }, { "X-Search-Cache": "MISS" });
    if (edgeCache) context.waitUntil(edgeCache.put(cacheKey, response.clone()));
    return response;
  } catch (error) {
    return jsonResponse(502, { error: "Product search is temporarily unavailable" });
  }
}

export default {
  async fetch(request, env, context) {
    const pathname = new URL(request.url).pathname.replace(/\/+$/, "") || "/";
    if (pathname === "/api/search") return handleSearch(request, context);
    return env.ASSETS.fetch(request);
  }
};
