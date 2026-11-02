import { articles } from "./data.js";
import { comparisonArticles } from "./comparison-articles.js";
import { priorityArticles } from "./priority-articles.js";

export const releaseDate = "2026-11-02";
export const newSlugs = ["hacoo-on-pc-without-app", "hacoo-jacket-size-guide"];
export const featuredSlugs = [...newSlugs, "hacoo-product-links-not-working", "hacoo-delivery-time-uk-spain-europe"];
export const originals = [...comparisonArticles, ...priorityArticles, ...articles];
export const articleSlugs = [...featuredSlugs, ...originals.map(a => a.slug).filter(slug => !featuredSlugs.includes(slug))];
