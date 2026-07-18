import type { MetadataRoute } from "next";
import { categories, guides, products, SITE_URL } from "@/lib/content";
import { supportedLocales } from "@/lib/locales";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date("2026-07-17T00:00:00.000Z");
  const staticRoutes = [
    "",
    "/finds",
    "/guides",
    "/reviews",
    "/faq",
    "/about",
    "/contact",
    "/disclaimer",
    "/privacy",
    "/terms",
    "/allchinabuy-spreadsheet",
  ];

  return [
    ...staticRoutes.map((route, index) => ({
      url: route ? `${SITE_URL}${route}/` : `${SITE_URL}/`,
      lastModified,
      changeFrequency: index === 0 ? "weekly" as const : "monthly" as const,
      priority: index === 0 ? 1 : route === "/finds" || route === "/guides" ? 0.9 : 0.6,
    })),
    ...categories.map((category) => ({
      url: `${SITE_URL}/collections/${category.slug}/`,
      lastModified,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
    ...products.map((product) => ({
      url: `${SITE_URL}/finds/${product.slug}/`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...guides.map((guide) => ({
      url: `${SITE_URL}/guides/${guide.slug}/`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...supportedLocales.map((locale) => ({
      url: `${SITE_URL}/${locale}/`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.6,
      alternates: {
        languages: {
          en: `${SITE_URL}/`,
          fr: `${SITE_URL}/fr/`,
          de: `${SITE_URL}/de/`,
          it: `${SITE_URL}/it/`,
          es: `${SITE_URL}/es/`,
        },
      },
    })),
  ];
}
