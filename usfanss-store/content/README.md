# USFans Store content release — 2026-10-07

The canonical source is `2026-10/<slug>.<language>.json`. Every article has an entry for en, de, es, fr, it, pl, pt and zh-cn. `app/content-data.ts` imports them explicitly, without an English fallback. Shipping remains a separate guide.

This release adds T-shirt fit/print, jacket sizing/packing, and pants/shorts waist/rise/inseam guides, updates eleven original articles, and expands each language directory to fourteen articles. Topic selection uses public category and competitor research, not verified private GSC, Bing or GA4 metrics. No search-volume or traffic forecast is implied.

Published dates are retained; revisions are dated 2026-10-07. Worked measurements are illustrative. Unsupported current rating claims are excluded. Internal guide links preserve language and FAQ stays separate.

Twenty product destinations and corresponding lead images were individually checked in the live primary catalog on 2026-10-07. Old IDs were not carried across domains. Numeric prices are omitted because their currency semantics could not be reliably reconciled; cards lead to the current source price. Images remain on the primary catalog domain.

## Build and release

Run `npm run build:static`. It renders static output in this directory and runs `scripts/validate-static.py`. The gate checks 168 pages, fourteen articles in eight languages, paragraph/section parity, English article length, worked measurements, canonical/hreflang, local links/assets, schema dates and the catalog manifest.

Complete content is rendered in HTML. The small static client only switches language; immutable CSS/JS filenames use content hashes. Existing GA4 configuration is retained, including product, outbound, search, language and article-selection events.

Deploy only this directory through the repository's existing Cloudflare Pages project `usfanss-store`. Other sites in the shared repository are outside this release.
