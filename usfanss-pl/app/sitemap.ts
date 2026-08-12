import type { MetadataRoute } from "next";
import { articleSlugs, locales, routeFor } from "./site-data";

const base = "https://usfanss.pl";
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["home", "finds", "categories", "guides", "articles", "faq"] as const;
  return [
    ...locales.flatMap((locale) => pages.map((page) => ({
      url: `${base}${routeFor(locale.code, page)}`,
      changeFrequency: page === "home" ? "weekly" as const : "monthly" as const,
      priority: page === "home" ? 1 : .8,
    }))),
    ...articleSlugs.map((article) => ({
      url: `${base}${routeFor("en", "article", article)}`,
      changeFrequency: "monthly" as const,
      priority: .7,
    })),
  ];
}
