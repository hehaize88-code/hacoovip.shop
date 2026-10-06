# Manual SEO and editorial release — 2026-10-06

Scope: superbuys.store only; repository path superbuys-store/. Main product/search/category destination remains https://www.cnfanshp.com. Other website directories must not change in this release.

## Automation state

The user requested this manual release and reaffirmed that automatic article updates must stop for this site only. Existing shared task 6a6b6ea9479c81918d0530e21c327ad5 already has a highest-priority permanent exclusion for superbuys.store effective 2026-09-07. Its schedule and all other sites remain unchanged. No task was globally disabled, and no article automation was resumed. The existing C03 completion record and C04 next-topic cursor are preserved; this manual release does not advance the automatic track. The new domestic-tracking guide covers a topic that was formerly queued, so any future explicitly authorized resumption must reconcile that published URL before creating duplicates.

## Evidence boundary

GSC Wizard calls for Google Search Console, Bing sites and GA4 properties returned payment_required. No private query, impression, CTR, position, traffic or conversion report was available. This release uses public search-result and competitor-page research, first-party guidance, and direct site inspection. Keyword priorities are qualitative search-intent judgments, not measured volume or traffic forecasts. Existing GA4 property G-1QS8EWYKPX is preserved; new event delivery must later be confirmed in authorized GA4 Realtime/DebugView.

## Search intent and published URLs

| Primary intent | Supporting phrases | Article slug |
| --- | --- | --- |
| Superbuy domestic tracking | seller dispatch, delivered but not in warehouse, domestic vs international tracking | superbuy-domestic-tracking-guide |
| Superbuy returns and refunds | cancel order, return evidence, refund components, return shipping | superbuy-returns-refunds-guide |
| Superbuy fees | total cost, service fees, shipping deposit, payment reconciliation | superbuy-fees-total-cost-guide |
| Superbuy warehouse storage | free storage, 90 days, maximum storage, extension | superbuy-warehouse-storage-guide |

Existing seven guides keep their URLs and original publication dates. Their titles, summaries and practical sections are improved. The four new guides are published in English, French and German. Localized versions are editorial adaptations with the same principal facts and practical steps, not padded word-for-word copies. Existing shorter French/German guides gain additional substantive sections while preserving their established copy. All reviewed articles use dateModified 2026-10-06; the four new articles use that datePublished.

## Public sources reviewed

- Superbuy Shopping Agent: https://www.superbuy.com/en/page/guide/shoppingagent/
- Superbuy Fee Structure: https://www.superbuy.com/en/page/guide/feecomposition/
- Superbuy Help Center: https://www.superbuy.com/en/page/help/
- Superbuy shipping calculator: https://www.superbuy.com/en/page/query/freight/
- Superbuy Parcel Forwarding: https://www.superbuy.com/en/page/newguide/transportagent/
- Competing discovery/catalog surfaces: https://superbuy.net/ and https://superbuyfind.org/
- Google title guidance: https://developers.google.com/search/docs/appearance/title-link
- Google localized-version guidance: https://developers.google.com/search/docs/specialty/international/localized-versions
- GA4 enhanced measurement: https://support.google.com/analytics/answer/9216061

The official storage baseline reviewed is 90 free days, then CN¥0.1 per item per day, and a standard 180-day maximum; extension does not reset free storage. Articles require readers to confirm their current account conditions. USD examples are explicitly hypothetical. We do not reproduce ambiguous fee-page examples or assume one special purchasing fee applies universally. Fixed warehouse-photo count and fixed destination-coverage claims were removed from active pages where unsupported by the reviewed material.

## Technical changes

- Localized homepage titles, descriptions, self-canonical and reciprocal EN/FR/DE/x-default alternates.
- Clear spreadsheet/finds homepage heading and a compact four-article entry; complete 11-article index.
- Topic-related links for all guides, preserved old URLs, article/breadcrumb schema and correct publication/modification separation.
- Comparison tables in each new guide, mobile overflow handling, localized navigation labels and corrected article numbering.
- 48-URL sitemap with all 33 article-language URLs and reviewed modification dates.
- Existing GA4 retained. main_site_click records link_type, link_path, source_path and site_language; catalog_search records source_path and site_language. Custom events do not transmit search terms or URL query strings. These events are not automatically configured as GA4 key events.

This private note must not be rendered, linked, exported into the public site, or included in sitemap/robots.

## Pre-deployment validation

Production build and Pages Worker packaging pass. Nine regression tests pass, including all 33 article-language routes, localized home canonical/hreflang, original publication dates, comparison tables, sitemap inventory, 404 behavior and analytics event classification/query exclusion. The standalone TypeScript invocation reports only existing missing Cloudflare ambient types (cloudflare:workers, Fetcher and D1Database); this project does not include the generated runtime declarations. Production bundling and the actual built Worker render tests succeed.
