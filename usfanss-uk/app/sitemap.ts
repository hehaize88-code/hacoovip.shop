import type { MetadataRoute } from "next";
import { localeCodes } from "./site";

export default function sitemap():MetadataRoute.Sitemap {
  const routes=["","categories","products","qc-desk","articles","help","articles/usfans-spreadsheet-guide","articles/usfans-qc-photos-guide","articles/usfans-shipping-cost-guide"];
  return localeCodes.flatMap(locale=>routes.map(route=>({url:`https://usfanss.uk${locale==="en" ? "" : `/${locale}`}${route ? `/${route}` : "/"}`,lastModified:new Date("2026-08-11"),changeFrequency:route.startsWith("articles/") ? "monthly" as const : "weekly" as const,priority:route ? .8 : 1})));
}
