import { octoberSlugs } from "./editorialOctober";
import { spanishOnlyArticleSlugs } from "./data";
import type { Lang } from "./i18n";
export const articlePublished = (slug: string) => octoberSlugs.includes(slug) ? "2026-10-07" : spanishOnlyArticleSlugs.includes(slug) ? "2026-09-08" : slug === "usfans-spain-address-checklist" ? "2026-08-14" : "2026-08-13";
export const articleModified = (slug: string, lang: Lang) => lang === "es" || octoberSlugs.includes(slug) ? "2026-10-07" : "2026-09-08";
