
import app from "../dist/server/index.js";

const STATIC_SEO_PATHS = new Set(["/robots.txt", "/sitemap.xml"]);

export default {
  async fetch(request, env, context) {
    const { pathname } = new URL(request.url);

    if (STATIC_SEO_PATHS.has(pathname)) {
      return env.ASSETS.fetch(request);
    }

    const response = await app.fetch(request, env, context);
    const contentType = response.headers.get("content-type") || "";

    if (response.status === 200 && contentType.includes("text/html")) {
      const documentLanguage = pathname === "/fr" || pathname.startsWith("/fr/")
        ? "fr"
        : pathname === "/de" || pathname.startsWith("/de/")
          ? "de"
          : "en";
      const html = (await response.text()).replace(
        '<html lang="en">',
        `<html lang="${documentLanguage}">`,
      );
      const isNotFound = html.includes("Page not found | Superbuy Product Index")
        && html.includes('content="noindex, nofollow"');

      if (isNotFound) {
        return new Response(html, { status: 404, headers: response.headers });
      }

      return new Response(html, { status: response.status, headers: response.headers });
    }

    return response;
  },
};

