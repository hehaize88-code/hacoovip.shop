import { octoberSlugs, growthArticleSlugs, novemberSlugs } from "./articleRoutes";
import type { Lang } from "./i18n";

export const articlePublished = (slug: string) => novemberSlugs.includes(slug) ? "2026-11-04" : octoberSlugs.includes(slug) ? "2026-10-07" : growthArticleSlugs.includes(slug) ? "2026-09-08" : slug === "usfans-spain-address-checklist" ? "2026-08-14" : "2026-08-13";
export const articleModified = (_slug: string, _lang: Lang) => "2026-11-04";
