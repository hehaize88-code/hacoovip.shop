# usfanss.es — manual maintenance, 2026-10-07

This change is limited to this directory. Automatic article updates remain disabled for usfanss.es. The shared multi-site automation already contains an explicit permanent exclusion dated 2026-09-08; its schedule, prompt and other sites were not modified. This user-requested maintenance does not resume automatic publishing.

## Research and scope

Public keyword-intent and competitor-page research informed four Spanish articles: costs/fees, sizing, rehearsal/volumetric weight, and broken product links. These are editorial priorities, not measured rankings or keyword volumes. GSC Wizard access returned payment_required, so no private Search Console, Bing Webmaster or GA4 performance figures informed the priority order. Existing Spanish-only publication behavior is preserved; no untranslated pages are advertised as alternate languages.

## Catalog observations

On 2026-10-07, live browser checks of www.cnfanshp.com verified product IDs 3359, 3368, 3352, 3092, 2899 and 3389. Former card names/images no longer matched their destinations. The cards now match the visible destination title, main image and loaded USD price. Images use the exact observed catalog image URLs. Prices are dated observations, not live inventory guarantees. The non-www route lost its detail/search path during browser navigation; www detail routes and search with keywords plus channelid=2 worked.

## Content and measurement

Four original Spanish guides add worked examples and connect to existing articles. Eleven existing Spanish guides gain relevant next-step links; repeated section sentences were removed. Article pages include contents anchors, calculated reading time, visible revision dates and matching BlogPosting dates. Sitemap has 91 URLs. CSS/JS links are fingerprinted to avoid stale assets. GA4 G-56TMQMXE1J remains unchanged; catalog_click gains product/category/catalog context, article_click is added, and catalog_search remains.

When account reporting is available, compare 28 complete days before/after publication: non-brand query impressions/clicks/CTR by landing page and position in GSC/Bing; organic landing sessions, engagement, article_click and catalog_click in GA4. Do not infer ranking or traffic improvement from a successful deployment. Do not install another analytics tag or change other sites' schedules.

## Sources consulted

- USFans official beginner guide and help: https://www.usfans.com/beginner-guide ; https://www.usfans.com/help
- AEAT current low-value import guidance, checked 2026-10-07: https://sede.agenciatributaria.gob.es/Sede/aduanas/comercio-electronico-pipe-envios-particulares/compras-internet-envios-particulares/envios-valor-hasta-150-euros.html
- Competitor topic coverage: usfans-sheet.es; usfanssheets.pics/embalaje/rehearsal-packing-usfans; sheetusfans.lifestyle; usfansvip.shop. Competitor statements were not treated as official fees, delivery guarantees or platform policies.
- Google title-link and localized-version guidance: https://developers.google.com/search/docs/appearance/title-link ; https://developers.google.com/search/docs/specialty/international/localized-versions

## Validation

Static production build and TypeScript check for the static rendering entrypoints pass. Targeted lint has no errors (existing static img recommendations only). All 91 generated sitemap pages were checked for one H1, canonical, internal destinations, TOC anchors, valid hreflang destinations, JSON-LD and local CSS/JS assets. Home retains six products, six featured articles and twelve FAQs. Full repository TypeScript check additionally includes pre-existing worker code requiring Cloudflare worker type declarations; the static deployment does not use that code.

## Release record

Source and generated files committed in e5e10fee5ebf193f38b101f341eeeb483ae97f41. The complete tree matches the locally validated tree a8296afdd6d457cc576f4333c92ce7883eacea20. A second read of all 25 automation records confirmed unchanged prompts, schedules and enabled states, including the explicit usfanss.es exclusion. Production deployment must be verified against the live site; source submission alone does not establish publication.
