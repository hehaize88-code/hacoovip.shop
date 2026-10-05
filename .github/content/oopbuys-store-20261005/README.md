# OOPBUYS editorial update — 5 October 2026

This source bundle builds four complete articles in EN, DE, FR, ES and IT, improves three existing guides in all five languages, and updates the homepage, article directory, category links and sitemap. Existing slugs are retained. The article directory contains 18 articles per language; the homepage features the four additions.

## Search intent and page ownership

| Intent | Page |
| --- | --- |
| OOPBUY spreadsheet / OOPBUY finds | Existing homepage |
| How to use an OOPBUY spreadsheet | Existing spreadsheet guide |
| OOPBUY shoes spreadsheet / shoe finds | New shoes guide |
| OOPBUY hoodies spreadsheet / hoodie sizing | New hoodies guide |
| OOPBUY jackets spreadsheet / jacket fit | New jackets guide |
| OOPBUY fees / total haul cost | New cost ledger guide |
| OOPBUY shipping calculator / volumetric weight | Existing shipping guide with a worked example |
| OOPBUY size chart / clothing measurements | Existing measurement guide with a category table |

These are researched intent clusters, not claimed search-volume estimates. Public competitor category pages showed category-specific discovery intent; GSC data was too small to support a numeric click-growth forecast. Preserve the homepage's broad discovery intent and use articles for the more specific decisions.

## Evidence and scope

- Product detail links, titles, listed amounts and first images were checked on 5 October 2026 against the corresponding main catalog. `products.json` records exact destinations and source images. Product names are retained as listing identifiers, with no authenticity, batch or physical-test claims.
- USD references use the site's catalog-health rate of 6.7046 CNY/USD, published 2 October 2026. They are dated references, exclude shipping and do not claim to be checkout quotes.
- The fee ledger and dimensional-weight calculation are explicitly illustrative. No route tariff, current tax rate or discount is invented.
- Existing policy research notes retain their original dates. Updating an article does not imply that historical service prices and policies were reverified.
- All product/category/search actions continue to target the existing main catalog. This change does not alter its data or any other site in the repository.

## Rebuild

Install `beautifulsoup4` and `requests`, then run:

```sh
python .github/content/oopbuys-store-20261005/build.py
```

The checked-in translation cache and editorial overrides make the build independent of translation services. `--translate` is an explicit authoring operation for missing public-content strings. The baseline commit is fixed in the script; change it deliberately if applying this recipe to a newer export. The stylesheet and `trust-enhancements.js` changes are maintained directly in the static site.

## Measurement

The existing GA4 tag remains in place. `article_click` records homepage/directory/related navigation; `article_engagement` records 50% and 90% article scroll thresholds once per page load. New product cards also generate the existing `product_click` event. Scroll thresholds measure exposure, not proof that the text was read. No GA4 account-level settings or key-event configuration were changed.

Compare GSC impressions, clicks, CTR and position by page/query over comparable settled 28-day periods after recrawling. Separate branded queries, category queries and instructional queries, and segment Italy/mobile because they represented much of the small existing sample. In GA4, compare article entries, internal article clicks and outbound product clicks; backend availability is required to inspect results. Bing API access was unavailable during this work.
