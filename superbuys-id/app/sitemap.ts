import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://superbuys.id";
  const languages = ["", "/de", "/fr", "/es", "/it"];
  const pages = ["", "/hot-drops", "/categories", "/how-it-works", "/faq", "/articles", "/articles/qc-photo-checklist", "/articles/shipping-cost-guide", "/articles/spreadsheet-guide"];
  return languages.flatMap((lang) => pages.map((page) => ({ url: `${base}${lang}${page}/`, lastModified: new Date("2026-08-12"), changeFrequency: page.includes("articles/") ? "monthly" as const : "weekly" as const, priority: page === "" ? 1 : .75 })));
}
