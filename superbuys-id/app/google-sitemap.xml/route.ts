import sitemap from "../sitemap";

export const dynamic = "force-static";

function escapeXml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

export function GET() {
  const entries = sitemap().map((entry) => {
    const lastModified = entry.lastModified instanceof Date
      ? entry.lastModified.toISOString()
      : entry.lastModified;

    return [
      "<url>",
      `<loc>${escapeXml(entry.url)}</loc>`,
      lastModified ? `<lastmod>${escapeXml(String(lastModified))}</lastmod>` : "",
      entry.changeFrequency ? `<changefreq>${entry.changeFrequency}</changefreq>` : "",
      typeof entry.priority === "number" ? `<priority>${entry.priority}</priority>` : "",
      "</url>",
    ].filter(Boolean).join("");
  }).join("");

  const body = `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${entries}</urlset>`;

  return new Response(body, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=0, must-revalidate",
    },
  });
}
