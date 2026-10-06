// Let each Pages deployment serve its own HTML and sitemap immediately.
// Only fingerprinted build assets may keep an immutable browser cache.
export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.hostname === "www.superbuys.pro") {
      url.hostname = "superbuys.pro";
      return Response.redirect(url.toString(), 301);
    }
    const response = await env.ASSETS.fetch(request);
    const headers = new Headers(response.headers);
    const isFingerprintAsset = /^\/assets\/.+-[\w-]{8,}\.(?:css|js)$/.test(url.pathname);
    const isImage = /\.(?:webp|png|jpe?g|svg|ico)$/.test(url.pathname);
    headers.set("Cache-Control", isFingerprintAsset ? "public, max-age=31536000, immutable" : isImage ? "public, max-age=3600" : "public, max-age=0, must-revalidate");
    headers.set("CDN-Cache-Control", isFingerprintAsset ? "public, max-age=31536000, immutable" : isImage ? "public, max-age=3600" : "no-store");
    headers.set("X-Site-Release", "2026-10-06-editorial");
    return new Response(response.body, {status:response.status,statusText:response.statusText,headers});
  }
};
