const SITEMAP_TEXT = "https://sugargoos.de/\nhttps://sugargoos.de/de/\nhttps://sugargoos.de/finds/\nhttps://sugargoos.de/de/finds/\nhttps://sugargoos.de/categories/\nhttps://sugargoos.de/de/categories/\nhttps://sugargoos.de/guides/\nhttps://sugargoos.de/de/guides/\nhttps://sugargoos.de/faq/\nhttps://sugargoos.de/de/faq/\nhttps://sugargoos.de/about/\nhttps://sugargoos.de/de/about/\nhttps://sugargoos.de/contact/\nhttps://sugargoos.de/de/contact/\nhttps://sugargoos.de/privacy/\nhttps://sugargoos.de/de/privacy/\nhttps://sugargoos.de/terms/\nhttps://sugargoos.de/de/terms/\nhttps://sugargoos.de/finds/low-top-everyday-shoes/\nhttps://sugargoos.de/de/finds/low-top-everyday-shoes/\nhttps://sugargoos.de/finds/loose-fit-crewneck/\nhttps://sugargoos.de/de/finds/loose-fit-crewneck/\nhttps://sugargoos.de/finds/pique-short-sleeve-top/\nhttps://sugargoos.de/de/finds/pique-short-sleeve-top/\nhttps://sugargoos.de/finds/embroidered-zip-jacket/\nhttps://sugargoos.de/de/finds/embroidered-zip-jacket/\nhttps://sugargoos.de/finds/drawstring-trousers/\nhttps://sugargoos.de/de/finds/drawstring-trousers/\nhttps://sugargoos.de/finds/embroidered-cap/\nhttps://sugargoos.de/de/finds/embroidered-cap/\nhttps://sugargoos.de/finds/multi-style-watch-record/\nhttps://sugargoos.de/de/finds/multi-style-watch-record/\nhttps://sugargoos.de/finds/magnetic-desk-accessory/\nhttps://sugargoos.de/de/finds/magnetic-desk-accessory/\nhttps://sugargoos.de/categories/shoes/\nhttps://sugargoos.de/de/categories/shoes/\nhttps://sugargoos.de/categories/sweatshirts/\nhttps://sugargoos.de/de/categories/sweatshirts/\nhttps://sugargoos.de/categories/t-shirts/\nhttps://sugargoos.de/de/categories/t-shirts/\nhttps://sugargoos.de/categories/jackets/\nhttps://sugargoos.de/de/categories/jackets/\nhttps://sugargoos.de/categories/pants-shorts/\nhttps://sugargoos.de/de/categories/pants-shorts/\nhttps://sugargoos.de/categories/headwear/\nhttps://sugargoos.de/de/categories/headwear/\nhttps://sugargoos.de/categories/accessories/\nhttps://sugargoos.de/de/categories/accessories/\nhttps://sugargoos.de/categories/electronics/\nhttps://sugargoos.de/de/categories/electronics/\nhttps://sugargoos.de/guides/how-to-buy-with-sugargoo/\nhttps://sugargoos.de/de/guides/how-to-buy-with-sugargoo/\nhttps://sugargoos.de/guides/sugargoo-spreadsheet-safety/\nhttps://sugargoos.de/de/guides/sugargoo-spreadsheet-safety/\nhttps://sugargoos.de/guides/sugargoo-qc-photos-guide/\nhttps://sugargoos.de/de/guides/sugargoo-qc-photos-guide/\nhttps://sugargoos.de/guides/shipping-from-china-to-germany/\nhttps://sugargoos.de/de/guides/shipping-from-china-to-germany/\nhttps://sugargoos.de/guides/w2c-and-qc-explained/\nhttps://sugargoos.de/de/guides/w2c-and-qc-explained/\n";

async function assetResponse(request, env, assetPath, contentType) {
  const assetUrl = new URL(request.url);
  assetUrl.pathname = assetPath;
  assetUrl.search = "";
  const assetRequest = new Request(assetUrl, request);
  const response = await env.ASSETS.fetch(assetRequest);
  if (!response.ok) return response;

  const headers = new Headers(response.headers);
  headers.set("Content-Type", contentType);
  headers.set("Cache-Control", "public, max-age=300, s-maxage=300, must-revalidate");
  headers.set("X-Content-Type-Options", "nosniff");
  headers.set("Access-Control-Allow-Origin", "*");
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers
  });
}

function textResponse(request, body) {
  const headers = new Headers({
    "Content-Type": "text/plain; charset=UTF-8",
    "Cache-Control": "public, max-age=300, s-maxage=300, must-revalidate",
    "X-Content-Type-Options": "nosniff",
    "Access-Control-Allow-Origin": "*"
  });
  return new Response(request.method === "HEAD" ? null : body, { status: 200, headers });
}

export default {
  async fetch(request, env) {
    if (request.method !== "GET" && request.method !== "HEAD") {
      return new Response("Method Not Allowed", {
        status: 405,
        headers: { Allow: "GET, HEAD", "Content-Type": "text/plain; charset=UTF-8" }
      });
    }

    const pathname = new URL(request.url).pathname;
    if (pathname === "/sitemap.xml" || pathname === "/sitemap-main.xml") {
      return assetResponse(request, env, "/sitemap.xml", "application/xml; charset=UTF-8");
    }
    if (pathname === "/robots.txt") {
      return assetResponse(request, env, "/robots.txt", "text/plain; charset=UTF-8");
    }
    if (pathname === "/sitemap.txt") {
      return textResponse(request, SITEMAP_TEXT);
    }

    return env.ASSETS.fetch(request);
  }
};
