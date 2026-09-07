import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://superbuys.id";
  const languages = ["", "/en", "/de", "/fr", "/es", "/it"];
  const pages = [
    "",
    "/hot-drops",
    "/categories",
    "/how-it-works",
    "/faq",
    "/articles",
    "/articles/qc-photo-checklist",
    "/articles/shipping-cost-guide",
    "/articles/spreadsheet-guide",
  ];
  const localArticles = [
    "/articles/cara-belanja-di-superbuy",
    "/articles/pajak-bea-cukai-superbuy-indonesia",
    "/articles/superbuy-review-indonesia",
  ];
  const common = languages.flatMap((lang) =>
    pages.map((page) => ({
      url: `${base}${lang}${page}/`,
      lastModified: new Date("2026-09-07"),
      changeFrequency: page.includes("articles/")
        ? ("monthly" as const)
        : ("weekly" as const),
      priority: page === "" ? 1 : 0.75,
    })),
  );
  const local = localArticles.map((page) => ({
    url: `${base}${page}/`,
    lastModified: new Date("2026-09-07"),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));
  return [...common, ...local];
}
