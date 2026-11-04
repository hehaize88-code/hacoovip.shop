# USFanss.pl

Independent product directory and buyer guides at https://usfanss.pl/.

## Production deployment

The existing Cloudflare Pages project is `usfanss-pl`, connected to
`hehaize88-code/hacoovip.shop`, production branch `main`.

- Build command (repository root): `cd usfanss-pl && npm ci && npm run build`
- Output directory: `usfanss-pl/out`
- Watch path: `usfanss-pl/*`
- Source: `app/`, not the historical exported HTML elsewhere in this directory.
- Do not deploy through the legacy Sites/Vinext starter configuration.

Run `npm run build` followed by `node --test tests/rendered-html.test.mjs`.
The build exports static Next.js pages; postprocessing sets the correct HTML
language and generates compatible sitemap endpoints. Do not commit `out/`.

## Multilingual content

PL is served at `/`; EN, DE, FR, IT, ES and RO have language prefixes.
Every published article must have a complete native-language body, unique title,
self canonical and reciprocal alternate links. No English body fallback is used.
The November 2026 release contains 14 articles per language and 140 canonical
pages. Tests verify article parity, indexability, alternate links, assets and
internal destinations across the entire export.

- `app/content/growth.*.json`: reviews, payments, link troubleshooting and the
  expanded DE/FR/IT/ES/RO versions of five established guides.
- `app/editorial.ts`: source links, localized FAQs and decision notes.
- `app/site-data.ts`: route inventory, content composition and page metadata.
- `app/site-page.tsx`: article rendering, discovery links and related guides.

Historical route observations remain explicitly dated 15 September 2026 and
must not be presented as a current quote. Payment methods must be checked against
public official guidance and the actual transaction; BLIK is not confirmed by
the public list reviewed on 4 November 2026. No first-hand test order is claimed.

## Search and measurement

`/sitemap-index.xml` points to `/sitemap.xml`. The XML URL set, compatibility
`/sitemap-pages.xml` and `/google-sitemap.txt` are generated from one inventory.
`robots.txt` advertises the XML index. Existing submitted addresses keep working.

GA4 property tagging remains `G-HX4MTTJWZF`. Existing `click_main_site` and
`site_search` events remain intact. `guide_click` records internal article
navigation with destination path, source path, language and placement; it does
not count table-of-contents anchors as a new article visit.
