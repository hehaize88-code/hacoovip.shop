const CANONICAL_HOST = "hacoo.pro";
const EDGE_TTL_SECONDS = 300;
const RETIRED_PATHS = new Set([
  "/articles/acbuy-warehouse-storage-parcel-consolidation",
  "/articles/acbuy-warehouse-storage-parcel-consolidation/",
]);

function isCacheablePage(request, url) {
  return request.method === "GET" &&
    url.hostname.toLowerCase() === CANONICAL_HOST &&
    url.search === "" &&
    !url.pathname.includes(".");
}

export async function onRequest(context) {
  const url = new URL(context.request.url);

  if (url.hostname.toLowerCase() === `www.${CANONICAL_HOST}`) {
    url.protocol = "https:";
    url.hostname = CANONICAL_HOST;
    url.port = "";
    return Response.redirect(url.toString(), 301);
  }

  if (RETIRED_PATHS.has(url.pathname)) {
    return new Response("Gone", {
      status: 410,
      headers: {
        "Cache-Control": "public, max-age=3600",
        "Content-Type": "text/plain; charset=utf-8",
        "X-Robots-Tag": "noindex, nofollow",
      },
    });
  }

  if (!isCacheablePage(context.request, url)) {
    return context.next();
  }

  const cache = caches.default;
  const cacheKey = new Request(url.toString(), context.request);
  const cachedResponse = await cache.match(cacheKey);
  if (cachedResponse) {
    return cachedResponse;
  }

  const response = await context.next();
  const contentType = response.headers.get("content-type") || "";
  if (response.status !== 200 || !contentType.includes("text/html")) {
    return response;
  }

  const headers = new Headers(response.headers);
  headers.set("Cache-Control", `public, max-age=0, s-maxage=${EDGE_TTL_SECONDS}, stale-while-revalidate=3600`);
  const cacheableResponse = new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
  context.waitUntil(cache.put(cacheKey, cacheableResponse.clone()));
  return cacheableResponse;
}
