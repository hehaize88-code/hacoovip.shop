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
    let canonicalPath = url.pathname.replace(/^\/en(?=\/|$)/, "") || "/";
    canonicalPath = canonicalPath.replace(/\/index(?:\.html)?$/, "/").replace(/\.html$/, "");
    if (/^\/(zh|es|fr|de|it|pt|pl|nl)$/.test(canonicalPath)) canonicalPath += "/";
    const hasNonCanonicalOrigin = url.protocol !== "https:" || url.hostname.toLowerCase() !== CANONICAL_HOST;

    if (hasNonCanonicalOrigin || canonicalPath !== url.pathname) {
      return permanentRedirect(request, target => { target.pathname = canonicalPath; });
    }

    const assetResponse = await env.ASSETS.fetch(request);
    const response = new Response(assetResponse.body, assetResponse);
    response.headers.set("X-Content-Type-Options", "nosniff");
    response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
    response.headers.set("X-Frame-Options", "SAMEORIGIN");

    if ((response.headers.get("content-type") || "").includes("text/html")) {
      response.headers.set("Cache-Control", "public, max-age=0, must-revalidate");
    }

    return response;
  }
};
