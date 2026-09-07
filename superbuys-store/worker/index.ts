/** Cloudflare Worker entry point for the vinext-starter template. */
import { handleImageOptimization, DEFAULT_DEVICE_SIZES, DEFAULT_IMAGE_SIZES } from "vinext/server/image-optimization";
import handler from "vinext/server/app-router-entry";

const STATIC_ASSET_PATHS = new Set([
  "/favicon.svg",
  "/robots.txt",
  "/sitemap.xml",
  "/superbuy-logo.png",
]);

function isStaticAsset(pathname: string): boolean {
  return pathname.startsWith("/assets/") || STATIC_ASSET_PATHS.has(pathname);
}

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

    // Static files must bypass the app router. With trailingSlash enabled, the
    // router otherwise redirects files such as site.css to site.css/, which
    // prevents browsers from loading CSS, JavaScript, fonts, and brand assets.
    if (isStaticAsset(url.pathname)) {
      return env.ASSETS.fetch(request);
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

    const response = await handler.fetch(request, env, ctx);
    const contentType = response.headers.get("content-type") || "";

    if (response.status === 200 && contentType.includes("text/html")) {
      const documentLanguage = url.pathname === "/fr" || url.pathname.startsWith("/fr/")
        ? "fr"
        : url.pathname === "/de" || url.pathname.startsWith("/de/")
          ? "de"
          : "en";
      const html = (await response.text()).replace(
        '<html lang="en">',
        `<html lang="${documentLanguage}">`,
      );
      const isNotFound = html.includes("Page not found | Superbuy Product Index")
        && html.includes('name="robots" content="noindex, nofollow"');

      if (isNotFound) {
        return new Response(html, { status: 404, headers: response.headers });
      }

      return new Response(html, { status: response.status, headers: response.headers });
    }

    return response;
  },
};

export default worker;
