# Hacoo Store Guide inspection build

Static, responsive inspection build for `hacoo.store`.

- Open `index.html` to review the site.
- The five header destinations are standalone pages; Categories no longer uses a homepage anchor.
- English is the default. French, German, Italian, and Spanish have complete static route sets under `/fr/`, `/de/`, `/it/`, and `/es/`.
- Every indexable route includes canonical and `hreflang` alternates, and the language selector keeps visitors on the equivalent page.
- Product buttons point to verified category URLs.
- Official Hacoo order and delivery claims link to Hacoo source pages.
- This build is independent and does not claim affiliation with Hacoo.
- Canonical URLs, `robots.txt`, `sitemap.xml`, FAQ schema, and article schema are included for production integration.

## Live product search

The homepage calls `api/search.php`, a same-origin search bridge that extracts up to six product records from the current catalog search and caches each keyword for five minutes. It requires PHP 7.4+, the DOM extension, and either cURL or `allow_url_fopen`.

The standalone visual preview includes three cached Nike results because PHP cannot execute inside a single HTML file. When hosted with PHP support, other keywords use the live bridge automatically.

## Regenerating localized pages

Run `node scripts/build-locales.mjs` after changing localized copy or navigation, then run `node scripts/build-standalone-preview.mjs` to refresh the single-file inspection homepage.
