import type { Locale, ArticleSlug, LocalArticle } from "../site-data";
import size_pl from "./size.pl.json";
import size_en from "./size.en.json";
import size_de from "./size.de.json";
import size_fr from "./size.fr.json";
import size_it from "./size.it.json";
import size_es from "./size.es.json";
import size_ro from "./size.ro.json";
import returns_pl from "./returns.pl.json";
import returns_en from "./returns.en.json";
import returns_de from "./returns.de.json";
import returns_fr from "./returns.fr.json";
import returns_it from "./returns.it.json";
import returns_es from "./returns.es.json";
import returns_ro from "./returns.ro.json";
import hoodies_pl from "./hoodies.pl.json";
import hoodies_en from "./hoodies.en.json";
import hoodies_de from "./hoodies.de.json";
import hoodies_fr from "./hoodies.fr.json";
import hoodies_it from "./hoodies.it.json";
import hoodies_es from "./hoodies.es.json";
import hoodies_ro from "./hoodies.ro.json";
import shoes_pl from "./shoes.pl.json";
import shoes_en from "./shoes.en.json";
import shoes_de from "./shoes.de.json";
import shoes_fr from "./shoes.fr.json";
import shoes_it from "./shoes.it.json";
import shoes_es from "./shoes.es.json";
import shoes_ro from "./shoes.ro.json";
import checklist_pl from "./checklist.pl.json";
import qc_pl from "./qc.pl.json";
import cost_pl from "./cost.pl.json";
import shipping_pl from "./shipping.pl.json";
import tracking_pl from "./tracking.pl.json";
export const newArticles = {
pl: {"usfans-sizing-poland": size_pl, "usfans-returns-before-shipping-poland": returns_pl, "usfans-hoodies-poland-selection": hoodies_pl, "usfans-shoes-poland-shoebox": shoes_pl},
en: {"usfans-sizing-poland": size_en, "usfans-returns-before-shipping-poland": returns_en, "usfans-hoodies-poland-selection": hoodies_en, "usfans-shoes-poland-shoebox": shoes_en},
de: {"usfans-sizing-poland": size_de, "usfans-returns-before-shipping-poland": returns_de, "usfans-hoodies-poland-selection": hoodies_de, "usfans-shoes-poland-shoebox": shoes_de},
fr: {"usfans-sizing-poland": size_fr, "usfans-returns-before-shipping-poland": returns_fr, "usfans-hoodies-poland-selection": hoodies_fr, "usfans-shoes-poland-shoebox": shoes_fr},
it: {"usfans-sizing-poland": size_it, "usfans-returns-before-shipping-poland": returns_it, "usfans-hoodies-poland-selection": hoodies_it, "usfans-shoes-poland-shoebox": shoes_it},
es: {"usfans-sizing-poland": size_es, "usfans-returns-before-shipping-poland": returns_es, "usfans-hoodies-poland-selection": hoodies_es, "usfans-shoes-poland-shoebox": shoes_es},
ro: {"usfans-sizing-poland": size_ro, "usfans-returns-before-shipping-poland": returns_ro, "usfans-hoodies-poland-selection": hoodies_ro, "usfans-shoes-poland-shoebox": shoes_ro},
} as unknown as Record<Locale, Partial<Record<ArticleSlug, LocalArticle>>>;
export const refreshedArticles = {pl: {"first-time-spreadsheet-checklist": checklist_pl, "read-usfans-qc-photos": qc_pl, "product-price-vs-parcel-cost": cost_pl, "usfans-shipping-to-poland": shipping_pl, "usfans-tracking-guide": tracking_pl}, en: {}, de: {}, fr: {}, it: {}, es: {}, ro: {}} as unknown as Record<Locale, Partial<Record<ArticleSlug, LocalArticle>>>;
