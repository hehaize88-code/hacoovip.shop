const CANONICAL_HOST = "hacoovip.shop";

function permanentRedirect(request, mutate) {
  const target = new URL(request.url);
  target.protocol = "https:";
  target.hostname = CANONICAL_HOST;
  mutate?.(target);
  return Response.redirect(target.toString(), 301);
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const hasEnglishAlias = url.pathname === "/en" || url.pathname === "/en/" || url.pathname.startsWith("/en/");
    const hasNonCanonicalOrigin = url.protocol !== "https:" || url.hostname.toLowerCase() !== CANONICAL_HOST;

    if (hasNonCanonicalOrigin || hasEnglishAlias) {
      return permanentRedirect(request, target => {
        if (url.pathname === "/en" || url.pathname === "/en/") target.pathname = "/";
        else if (url.pathname.startsWith("/en/")) target.pathname = url.pathname.slice(3) || "/";
      });
    }

    const assetResponse = await env.ASSETS.fetch(request);
    const response = new Response(assetResponse.body, assetResponse);
    response.headers.set("X-Content-Type-Options", "nosniff");
    response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
    response.headers.set("X-Frame-Options", "SAMEORIGIN");

    if ((response.headers.get("content-type") || "").includes("text/html")) {
      response.headers.set("Cache-Control", "public, max-age=300, s-maxage=3600, stale-while-revalidate=86400");
    }

    return response;
  }
};
