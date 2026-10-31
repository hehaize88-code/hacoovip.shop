import type { ArticleSlug } from "./site-data";

const revised = new Set<string>(["hipobuy-shipping-cost-guide", "hipobuy-warehouse-qc-photos", "hipobuy-review-2026", "hipobuy-shipping-to-spain", "hipobuy-rehearsal-parcel"]);
export function articleModified(slug: string) {
  return revised.has(slug) ? "2026-10-31" : "2026-10-04";
}

export function relatedArticles(slug: ArticleSlug): ArticleSlug[] {
  const shipping: ArticleSlug[] = ["hipobuy-shipping-cost-guide", "hipobuy-rehearsal-parcel", "hipobuy-shipping-to-spain", "hipobuy-actual-vs-volumetric-weight", "hipobuy-delivery-time-tracking"];
  const buying: ArticleSlug[] = ["how-to-buy-with-hipobuy", "hipobuy-warehouse-qc-photos", "hipobuy-warehouse-return-checklist", "hipobuy-shipping-cost-guide", "hipobuy-review-2026"];
  const storage: ArticleSlug[] = ["hipobuy-90-day-warehouse-storage", "hipobuy-warehouse-return-checklist", "hipobuy-warehouse-qc-photos", "hipobuy-rehearsal-parcel", "hipobuy-shipping-cost-guide"];
  const list = slug === "hipobuy-90-day-warehouse-storage" || slug === "hipobuy-warehouse-return-checklist" ? storage : ["how-to-buy-with-hipobuy", "hipobuy-warehouse-qc-photos", "hipobuy-review-2026"].includes(slug) ? buying : shipping;
  return list.filter((item) => item !== slug).slice(0, 4);
}
