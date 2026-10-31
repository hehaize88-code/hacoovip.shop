# Manual content and browsing release — 2026-10-31

Scope: spreadsheets-superbuy.net only. English, French, German, Indonesian and Simplified Chinese have matching coverage. Existing hosting, GA4 property and publishing automation configuration are preserved.

## Content
- Three original guides in all five languages: Superbuy fees, order status and tracking, and returns after QC (15 new pages).
- Existing shipping calculator, QC, shoe and hoodie guides gain actionable examples and measurement tables. Every guide links to relevant official Superbuy help.
- Article index grows from 10 to 13 guides per language; six are linked from each homepage. Static export includes 120 pages with language alternates and canonical URLs matching the production trailing-slash convention.
- Publication dates are retained for old articles. Revised articles use 2026-10-31 as their modification date.

## Browsing and tools
- Homepage and guides link to related next steps. Six additional source-backed products expand Finds to ten cards without removing the existing four.
- Client-side category/text filters, reference-price sorting, reset and empty states operate on crawlable server-rendered cards.
- A localized parcel-weight worksheet compares actual and volumetric weight. It explicitly excludes route rounding and does not claim to quote shipping costs.
- Existing GA4 configuration is retained. New interaction events omit typed filter text and worksheet values; localized privacy text describes measurement.

## Public sources
- https://www.superbuy.com/en/page/guide/feecomposition/
- https://www.superbuy.com/en/page/guide/shoppingagent/
- https://www.superbuy.com/en/page/query/freight/
- https://www.superbuy.com/en/page/help/#search_helpId1451
- https://www.superbuy.com/en/page/about/statementagreement/
- Product records and images: https://www.cnfanshm.com/AllProducts/6071.html, 6070.html, 6007.html, 6006.html, 6009.html and 5993.html. Exact image URLs and source prices are recorded in app/site-data.ts and catalog-ui.json. These are reference snapshots, not stock or live-price guarantees.

## Verification
- Application TypeScript check (tsconfig.app-check.json).
- Production static build and seven tests covering rendered HTML, language parity, article depth, weight calculations, canonical/hreflang, internal route coverage and page counts.
- Browser checks: category filtering, no-result state, descending prices, all ten product images, two weight examples (4 kg; 2.625 kg volume / 3 kg actual) and 390 px mobile layouts without horizontal body overflow.
- Temporary mobile test fixture removed before production build.
