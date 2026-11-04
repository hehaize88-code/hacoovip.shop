# usfanss.es — manual multilingual maintenance, 2026-11-04

This user-requested change is limited to usfanss-es/. Scheduled article publishing remains disabled. No other domain, shared automation or analytics property is changed.

## Result

All eight languages (Spanish root, English, French, German, Italian, Polish, Portuguese and Simplified Chinese) now have the same 18 article slugs. Three new guides cover payments, balance/refunds and coupons: 24 new localized pages. The existing 15 guides remain at their established URLs.

Homepage, category and purchase-process copy now states the USFans/Spain purpose in every language. Category checks, a topic-based article directory, direct QC/shipping navigation, contextual related articles and earlier catalogue/category actions improve the path between product discovery and guidance. FAQs increase from 12 to 21 in every language. Reading times are computed from each localized body.

Five existing guides receive substantive additions in all languages: how USFans works, shipping costs, total fees, Canary Islands and Spanish Line Packet. Shipping titles/descriptions now identify the topic in every language. Official AEAT and European Commission sources were rechecked: the November handling-fee update is explained in the shipping guide and linked from the related budget/route guides. Product snapshots retain their actual October verification date.

## Evidence and boundaries

Priority order combines the user's first-party GSC/Bing/GA4 review with public competitor topic coverage and official documentation. Private performance figures are not published in this repository. The work targets category/purchase-guide relevance, article discovery and useful paths to the catalogue. It makes no claim of measured post-release traffic or indexing gains.

New guides distinguish item payment from international shipping, balance credit from withdrawal, and a promotion's advertised value from an actual checkout deduction. No active coupon, universal refund deadline or unsupported flat commission is invented. All monetary examples in new guides are explicitly hypothetical. Translations are editorial drafts, not a claim of native-speaker proofreading.

Sources checked:
- https://usfans.com/beginner-guide
- https://usfans.com/help/category/all
- https://www.usfans.com/help/HCON_STATIC_053
- https://www.usfans.com/about?key=2
- https://sede.agenciatributaria.gob.es/Sede/aduanas/comercio-electronico-pipe-envios-particulares/compras-internet-envios-particulares/envios-valor-hasta-150-euros.html
- https://taxation-customs.ec.europa.eu/customs/eu-customs-reform_en

## Validation and release

Static build and scoped TypeScript checks pass. Verification covers 144 complete article pages, 1,152 same-article language switches and 192 sitemap routes: one H1, self-canonical, eight language alternates plus x-default, valid JSON-LD, internal destinations/anchors, fingerprinted CSS/JS and a single existing GA4 configuration per page. Each locale has 21 FAQ entries and all new articles linked from its homepage.

Desktop and 390-pixel iframe viewport checks covered the Spanish homepage/article, mobile navigation and an actual Spanish-to-English article switch. The sampled mobile document widths match their viewport widths. Full physical-device testing was not performed.

The static builder retains earlier fingerprinted CSS/JS assets for cached older HTML. Production publication is verified separately after GitHub submission; a local build alone is not proof of deployment.
