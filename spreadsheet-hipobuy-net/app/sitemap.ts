import type { MetadataRoute } from "next";
import { catalogCategories } from "./catalog-data";
import { priorityArticles } from "./articles/priority-article-data";
export const dynamic = "force-static";
export default function sitemap():MetadataRoute.Sitemap {
  const base="https://spreadsheet-hipobuy.net";
  const routes=["/","/spreadsheet/","/categories/",...catalogCategories.map(category=>`/categories/${category.slug}/`),"/qc-guide/","/shipping/","/faq/","/articles/","/articles/how-to-buy-with-hipobuy/","/articles/hipobuy-qc-photos/","/articles/hipobuy-shipping-cost/",...priorityArticles.map(article=>`/articles/${article.slug}/`)];
  return routes.map((route,index)=>({url:`${base}${route}`,lastModified:new Date("2026-09-09"),changeFrequency:index===0?"weekly":"monthly",priority:index===0?1:route==="/shipping/"?0.9:route.startsWith("/articles/")?0.8:0.8}));
}
