/** Cloudflare Worker entry point for the vinext-starter template. */
import { handleImageOptimization, DEFAULT_DEVICE_SIZES, DEFAULT_IMAGE_SIZES } from "vinext/server/image-optimization";
import handler from "vinext/server/app-router-entry";

interface Env {
  ASSETS: Fetcher;
  DB: D1Database;
  IMAGES: {
    input(stream: ReadableStream): {
      transform(options: Record<string, unknown>): {
        output(options: { format: string; quality: number }): Promise<{ response(): Response }>;
      };
    };
  };
}

interface ExecutionContext {
  waitUntil(promise: Promise<unknown>): void;
  passThroughOnException(): void;
}

// Image security config. SVG sources with .svg extension auto-skip the
// optimization endpoint on the client side (served directly, no proxy).
// To route SVGs through the optimizer (with security headers), set
// dangerouslyAllowSVG: true in next.config.js and uncomment below:
// const imageConfig: ImageConfig = { dangerouslyAllowSVG: true };

const worker = {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);

    if (url.hostname === "www.superbuys.pro") {
      url.hostname = "superbuys.pro";
      return Response.redirect(url.toString(), 301);
    }

    const isPagePath = !url.pathname.endsWith("/") && !url.pathname.split("/").pop()?.includes(".") && !url.pathname.startsWith("/_");
    if (isPagePath) {
      url.pathname += "/";
      return Response.redirect(url.toString(), 308);
    }

    const shouldCache = request.method === "GET" && !url.pathname.startsWith("/cdn-cgi/") && url.pathname !== "/_vinext/image";
    const edgeCache = typeof caches !== "undefined" ? caches.default : null;
    const cacheKey = new Request(url.toString(), {method:"GET",headers:request.headers});
    if (shouldCache && edgeCache) {
      const cached = await edgeCache.match(cacheKey);
      if (cached) {
        const cachedHeaders = new Headers(cached.headers);
        cachedHeaders.set("X-Edge-Cache", "HIT");
        return new Response(cached.body,{status:cached.status,statusText:cached.statusText,headers:cachedHeaders});
      }
    }

    if (url.pathname === "/_vinext/image") {
      const allowedWidths = [...DEFAULT_DEVICE_SIZES, ...DEFAULT_IMAGE_SIZES];
      return handleImageOptimization(request, {
        fetchAsset: (path) => env.ASSETS.fetch(new Request(new URL(path, request.url))),
        transformImage: async (body, { width, format, quality }) => {
          const result = await env.IMAGES.input(body).transform(width > 0 ? { width } : {}).output({ format, quality });
          return result.response();
        },
      }, allowedWidths);
    }

    const handlerUrl = new URL(request.url);
    if (handlerUrl.pathname.length > 1 && handlerUrl.pathname.endsWith("/")) handlerUrl.pathname = handlerUrl.pathname.slice(0,-1);
    const handlerRequest = handlerUrl.toString() === request.url ? request : new Request(handlerUrl.toString(),request);
    const response = await handler.fetch(handlerRequest, env, ctx);
    const headers = new Headers(response.headers);
    headers.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains; preload");
    headers.set("Content-Security-Policy", "default-src 'self'; script-src 'self' 'unsafe-inline' https://www.googletagmanager.com; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self' data:; connect-src 'self' https://*.google-analytics.com https://*.analytics.google.com; frame-ancestors 'none'; base-uri 'self'; form-action 'self' https://www.cnfanshp.com; upgrade-insecure-requests");
    headers.set("X-Content-Type-Options", "nosniff");
    headers.set("X-Frame-Options", "DENY");
    headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
    headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=(), payment=()");

    if ((headers.get("content-type") || "").includes("text/html")) {
      if (request.method === "GET" && response.status === 200) {
        headers.set("Cache-Control", "public, max-age=0, s-maxage=86400, stale-while-revalidate=604800");
        headers.set("CDN-Cache-Control", "public, max-age=86400, stale-while-revalidate=604800");
      }
      const locale = url.pathname.match(/^\/(de|fr|it|nl|ms)(?:\/|$)/)?.[1] || "en";
      const html = (await response.text()).replace(/<html\s+lang=["'][^"']*["']/, `<html lang="${locale}"`);
      headers.delete("content-length");
      const finalResponse = new Response(html,{status:response.status,statusText:response.statusText,headers});
      if (shouldCache && edgeCache && response.status === 200) ctx.waitUntil(edgeCache.put(cacheKey,finalResponse.clone()));
      return finalResponse;
    }

    const finalResponse = new Response(response.body,{status:response.status,statusText:response.statusText,headers});
    if (shouldCache && edgeCache && response.status === 200) ctx.waitUntil(edgeCache.put(cacheKey,finalResponse.clone()));
    return finalResponse;
  },
};

export default worker;
