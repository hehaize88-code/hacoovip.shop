# usfanss.es — manual maintenance, 2026-10-07

This change is limited to this directory. Automatic article updates remain disabled for usfanss.es. The shared multi-site automation already contains an explicit permanent exclusion dated 2026-09-08; its schedule, prompt and other sites were not modified. This user-requested maintenance does not resume automatic publishing.

## Research and scope

Public keyword-intent and competitor-page research informed four Spanish articles: costs/fees, sizing, rehearsal/volumetric weight, and broken product links. These are editorial priorities, not measured rankings or keyword volumes. GSC Wizard access returned payment_required, so no private Search Console, Bing Webmaster or GA4 performance figures informed the priority order. The multilingual follow-up below now supplies every article in all eight languages; alternates only point to complete generated pages.

## Catalog observations

On 2026-10-07, live browser checks of www.cnfanshp.com verified product IDs 3359, 3368, 3352, 3092, 2899 and 3389. Former card names/images no longer matched their destinations. The cards now match the visible destination title, main image and loaded USD price. Images use the exact observed catalog image URLs. Prices are dated observations, not live inventory guarantees. The non-www route lost its detail/search path during browser navigation; www detail routes and search with keywords plus channelid=2 worked.

## Content and measurement

Four original Spanish guides add worked examples and connect to existing articles. Eleven existing Spanish guides gain relevant next-step links; repeated section sentences were removed. Article pages include contents anchors, calculated reading time, visible revision dates and matching BlogPosting dates. The initial Spanish export had 91 sitemap URLs; the multilingual follow-up now has 168. CSS/JS links are fingerprinted to avoid stale assets. GA4 G-56TMQMXE1J remains unchanged; catalog_click gains product/category/catalog context, article_click is added, and catalog_search remains.

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

## English article correction

The user's screenshot showed /en/articles/ with four guides. Four complete English versions of the new October guides were added after that report. Article lookup now uses explicit slugs and locale availability, rather than assuming every language has identical array positions. The English hub has eight articles, the Spanish hub has fifteen, and both homepages feature six. New guide language switching preserves the article between English and Spanish; hreflang only lists existing translations. The static sitemap contains 95 pages. CI verifies all four new articles in both languages and requires at least eight English hub links. Desktop article cards have reduced empty space.


## Complete multilingual collection — 2026-10-07

The language-count defect came from two places: only four core articles existed in most dictionaries, and route availability deliberately restricted the seven growth articles to Spanish and the four October articles to Spanish/English. The registry now joins complete cards and bodies by stable slug, publishes the same ordered set of 15 articles for all eight languages, and fails a build on a missing or duplicate article. Existing core translations and the four authored English October guides are retained.

Added 73 previously missing language variants: seven English guides and eleven each in French, German, Italian, Polish, Portuguese and Simplified Chinese. English and Chinese copy was rewritten and reviewed directly. The other five locales use locally generated translation drafts with reviewed titles, descriptions, terminology, source links and numerical examples; this is not a claim of native-speaker proofreading. All content is committed static data: no browser translation dependency or automatic generation service was added. The calculation examples remain hypothetical; the Italian budget and parcel-volume translation errors were corrected before publication.

Every article has an independent localized URL, canonical, eight language alternates plus the Spanish x-default, localized metadata, related links and a complete body. Original publication dates remain; translated growth articles carry the 2026-10-07 modification date. Language changes retain the stable article slug and the section fragment.

The dedicated publish workflow now runs scripts/verify-article-locales.mjs against generated HTML. The check compares every hub with the Spanish collection, verifies article files/canonicals/sitemap/alternate destinations/internal links, and executes the actual browser bundle for every article-language switch. Local verification passed: eight hubs with 15 articles each, 120 complete article pages, 960 same-article switches and 168 sitemap URLs. The static TypeScript entrypoint check also passed.

Only usfanss-es/ and its dedicated GitHub publish workflow are included. The shared multi-site automatic article task remains unchanged with its pre-existing permanent exclusion for usfanss.es. GitHub build success alone is not evidence that the Cloudflare production site has refreshed; production requires a separate visible check.
