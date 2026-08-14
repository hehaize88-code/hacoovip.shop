import type { MetadataRoute } from "next";
import { localeCodes } from "./site";

export const dynamic = "force-static";

export default function sitemap():MetadataRoute.Sitemap {
  const routes=["","categories","products","qc-desk","articles","help","articles/usfans-first-order-link-to-warehouse","articles/usfans-spreadsheet-guide","articles/usfans-qc-photos-guide","articles/usfans-shipping-cost-guide"];
  return localeCodes.flatMap(locale=>routes.map(route=>({url:`https://usfanss.uk${locale==="en" ? "" : `/${locale}`}${route ? `/${route}${route==="articles/usfans-first-order-link-to-warehouse" ? "" : "/"}` : "/"}`,lastModified:new Date(route==="articles/usfans-first-order-link-to-warehouse" ? "2026-08-14" : "2026-08-12"),changeFrequency:route.startsWith("articles/") ? "monthly" as const : "weekly" as const,priority:route ? .8 : 1})));
}
