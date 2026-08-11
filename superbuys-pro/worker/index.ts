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
    headers.set("Content-Security-Policy", "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self' data:; connect-src 'self'; frame-ancestors 'none'; base-uri 'self'; form-action 'self' https://www.cnfanshp.com; upgrade-insecure-requests");
    headers.set("X-Content-Type-Options", "nosniff");
    headers.set("X-Frame-Options", "DENY");
    headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
    headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=(), payment=()");

    if ((headers.get("content-type") || "").includes("text/html")) {
      const locale = url.pathname.match(/^\/(de|fr|it|nl|ms)(?:\/|$)/)?.[1] || "en";
      const html = (await response.text()).replace(/<html\s+lang=["'][^"']*["']/, `<html lang="${locale}"`);
      headers.delete("content-length");
      return new Response(html,{status:response.status,statusText:response.statusText,headers});
    }

    return new Response(response.body,{status:response.status,statusText:response.statusText,headers});
  },
};

export default worker;
