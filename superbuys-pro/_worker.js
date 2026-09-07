export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    if (url.hostname === "www.superbuys.pro") {
      url.hostname = "superbuys.pro";
      return Response.redirect(url.toString(), 301);
    }
    const shouldCache = request.method === "GET" && !url.pathname.startsWith("/cdn-cgi/");
    const edgeCache = typeof caches !== "undefined" ? caches.default : null;
    const cacheKey = new Request(url.toString(), {method:"GET",headers:request.headers});
    if (shouldCache && edgeCache) {
      const cached = await edgeCache.match(cacheKey);
      if (cached) {
        const headers = new Headers(cached.headers);
        headers.set("X-Edge-Cache", "HIT");
        return new Response(cached.body,{status:cached.status,statusText:cached.statusText,headers});
      }
    }
    const response = await env.ASSETS.fetch(request);
    if (!shouldCache || response.status !== 200) return response;
    const headers = new Headers(response.headers);
    const isHtml = (headers.get("content-type") || "").includes("text/html");
    headers.set("Cache-Control", isHtml ? "public, max-age=0, s-maxage=86400, stale-while-revalidate=604800" : "public, max-age=31536000, immutable");
    headers.set("X-Edge-Cache", "MISS");
    const cacheable = new Response(response.body,{status:response.status,statusText:response.statusText,headers});
    if (edgeCache) ctx.waitUntil(edgeCache.put(cacheKey,cacheable.clone()));
    return cacheable;
  }
};
