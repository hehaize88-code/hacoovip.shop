# AllChinaBuy Pro

Independent China shopping directory and editorial research site for
`allchinabuy.pro`.

## Included

- responsive landing page and product discovery directory
- category routes into the corresponding main-site categories
- exact product routes into their matching main-site detail pages
- product detail pages, buying guides, FAQ and policy pages
- English, French, German, Italian and Spanish versions of every content route
- sitemap, robots, manifest and structured data

## Development

Requires Node.js 22 or newer.

```bash
npm ci
npm run dev
```

Production validation:

```bash
npm run check
npm run build:pages
```

The production website is available at <https://allchinabuy.pro>.

## Static production translations

The GitHub `publish-allchinabuy-pages.yml` workflow builds and validates the Next.js
static export, then publishes the generated files into this project directory.
The Pages deployment consumes those committed files. Only `allchinabuy-pro` is
changed by this workflow.

`postprocess:locales` expands each English route into French, German, Italian and
Spanish using the committed dictionaries in `lib/translations/`. Builds make no
translation API requests. After editing source text, build the English export and
run `python3 scripts/localize-export.py --extract` to identify the exact text keys.
Add or review the four local dictionary entries before rebuilding; missing entries
fail the build. Keep product names, IDs, URLs, amounts and editorial dates intact.

Localized HTML uses native navigation, forms and `/site-tools.js` filters. English
React hydration is removed from localized pages so it cannot revert their text.
Language links retain the current route; navigation stays in the selected language.
The validation gate checks paragraph and heading parity, reciprocal hreflang,
canonical URLs, local links, product targets, images and all sitemap entries.

GA4 retains property `G-4S8LT5M79M`. Catalogue exits emit `main_catalogue_click`
with `destination_type` and `page_language`; searches emit `main_catalogue_search`
without sending the query text. These events require the existing GA tag to load.
Account-side reporting, consent settings and key-event configuration are separate.
