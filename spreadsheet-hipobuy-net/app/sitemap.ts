import type { MetadataRoute } from "next";
import { catalogCategories } from "./catalog-data";
export const dynamic = "force-static";
export default function sitemap():MetadataRoute.Sitemap {
  const base="https://spreadsheet-hipobuy.net";
  const routes=["/","/spreadsheet/","/categories/",...catalogCategories.map(category=>`/categories/${category.slug}/`),"/qc-guide/","/shipping/","/faq/","/articles/","/articles/how-to-buy-with-hipobuy/","/articles/hipobuy-qc-photos/","/articles/hipobuy-shipping-cost/"];
  return routes.map((route,index)=>({url:`${base}${route}`,lastModified:new Date("2026-08-24"),changeFrequency:index===0?"weekly":"monthly",priority:index===0?1:route.startsWith("/articles/")?0.7:0.8}));
}
