# Hacoo Store Guide

Static, responsive production site for `hacoo.store`.

- Open `index.html` to review the site.
- The six header destinations are standalone pages, including a dedicated SEO Articles hub.
- The homepage three-step section links to a complete shopping-checklist article instead of ending at summary cards.
- English is the default. French, German, Italian, and Spanish have complete static route sets under `/fr/`, `/de/`, `/it/`, and `/es/`.
- Every indexable route includes canonical and `hreflang` alternates, and the language selector keeps visitors on the equivalent page.
- Product buttons point to verified category URLs.
- Official Hacoo order and delivery claims link to Hacoo source pages.
- This build is independent and does not claim affiliation with Hacoo.
- Canonical URLs, `robots.txt`, a 65-URL multilingual `sitemap.xml`, FAQ schema, CollectionPage schema, and article schema are included for production integration.

## Live product search

The homepage calls `/api/search`, a same-origin Cloudflare Pages advanced-mode Worker that extracts up to six product records from the current catalog search and caches each keyword at the edge for five minutes. The Worker lives at `_worker.js`; every non-API request is passed through to the normal static asset service, and no PHP runtime is required.

The optional standalone visual preview includes three cached Nike results because a single local HTML file cannot execute the Cloudflare Function. Preview files are generated outside the public site directory so they cannot become duplicate indexable pages.

## Regenerating localized pages

Run `node scripts/build-locales.mjs` after changing localized copy or navigation. Run `node scripts/build-standalone-preview.mjs` only when a local single-file review is needed; it writes to `../hacoo-store-previews/`, outside the deployable directory.
