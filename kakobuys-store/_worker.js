const CANONICAL_ORIGIN = "https://kakobuys.store";
const LANGUAGES = ["de", "fr", "es", "it", "pl", "pt", "ro"];
const PAGE_SLUGS = [
  "categories",
  "qc-hub",
  "guides",
  "faq",
  "articles",
  "under-25",
  "qc-first",
  "new-this-week",
  "read-kakobuy-qc-photos",
  "kakobuy-spreadsheet-first-time-guide",
  "product-price-vs-parcel-cost",
];

const canonicalPaths = new Set(["/"]);
for (const slug of PAGE_SLUGS) canonicalPaths.add(`/${slug}/`);
for (const language of LANGUAGES) {
  canonicalPaths.add(`/${language}/`);
  for (const slug of PAGE_SLUGS) canonicalPaths.add(`/${language}/${slug}/`);
}

function canonicalPath(pathname) {
  if (canonicalPaths.has(pathname)) return pathname;
  const withSlash = pathname.endsWith("/") ? pathname : pathname + "/";
  return canonicalPaths.has(withSlash) ? withSlash : null;
}

class RemoveElement {
  element(element) {
    element.remove();
  }
}

class AddCanonical {
  constructor(url) {
    this.url = url;
  }

  element(element) {
    element.append(`<link rel="canonical" href="${this.url}">`, { html: true });
  }
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const pagePath = canonicalPath(url.pathname);

    if (
      url.hostname === "www.kakobuys.store" ||
      url.hostname === "kakobuys-store.pages.dev" ||
      url.hostname.endsWith(".kakobuys-store.pages.dev")
    ) {
      return Response.redirect(CANONICAL_ORIGIN + url.pathname + url.search, 301);
    }

    if (pagePath && url.pathname !== pagePath) {
      return Response.redirect(CANONICAL_ORIGIN + pagePath + url.search, 301);
    }

    if (url.pathname === "/robots.txt") {
      return new Response("User-agent: *\nAllow: /\n\nSitemap: https://kakobuys.store/sitemap.xml\n", {
        status: 200,
        headers: {
          "Content-Type": "text/plain; charset=utf-8",
          "Cache-Control": "public, max-age=3600",
          "X-Content-Type-Options": "nosniff",
        },
      });
    }

    const response = await env.ASSETS.fetch(request);
    const headers = new Headers(response.headers);
    headers.set("X-Content-Type-Options", "nosniff");

    if (response.status === 404) {
      headers.set("X-Robots-Tag", "noindex, follow");
      return new Response(response.body, { status: 404, headers });
    }

    const contentType = headers.get("content-type") || "";
    if (!pagePath || !contentType.toLowerCase().includes("text/html")) {
      return new Response(response.body, {
        status: response.status,
        statusText: response.statusText,
        headers,
      });
    }

    headers.set("Content-Type", "text/html; charset=utf-8");
    const canonicalUrl = CANONICAL_ORIGIN + pagePath;
    const htmlResponse = new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers,
    });

    return new HTMLRewriter()
      .on('meta[name="codex-preview"]', new RemoveElement())
      .on('link[rel="canonical"]', new RemoveElement())
      .on("head", new AddCanonical(canonicalUrl))
      .transform(htmlResponse);
  },
};
