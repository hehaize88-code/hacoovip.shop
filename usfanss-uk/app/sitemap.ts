import type { MetadataRoute } from "next";
import { articleMeta, articleSupportsLocale, localeCodes } from "./site";

export const dynamic = "force-static";

export default function sitemap():MetadataRoute.Sitemap {
  const coreRoutes=["","categories","products","qc-desk","articles","help"];
  return localeCodes.flatMap(locale=>{
    const articleRoutes=articleMeta.filter(article=>articleSupportsLocale(article,locale)).map(article=>`articles/${article.slug}`);
    return [...coreRoutes,...articleRoutes].map(route=>{
      const article=route.startsWith("articles/") ? articleMeta.find(item=>`articles/${item.slug}`===route) : undefined;
      const lastModified=article && "published" in article ? article.published : article?.slug==="usfans-first-order-link-to-warehouse" ? "2026-08-14" : "2026-08-12";
      return {url:`https://usfanss.uk${locale==="en" ? "" : `/${locale}`}${route ? `/${route}/` : "/"}`,lastModified:new Date(lastModified),changeFrequency:route.startsWith("articles/") ? "monthly" as const : "weekly" as const,priority:route ? .8 : 1};
    });
  });
}
