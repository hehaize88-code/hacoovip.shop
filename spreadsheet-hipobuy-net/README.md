# Spreadsheet Hipobuy

Independent Hipobuy product-discovery, QC and shipping guide prepared for `spreadsheet-hipobuy.net`.

## Cloudflare Pages deployment

Use these settings when connecting `hehaize88-code/hacoovip.shop`:

- Production branch: `main`
- Root directory: `spreadsheet-hipobuy-net`
- Framework preset: `None`
- Build command: leave empty
- Build output directory: `/`

The repository directory already contains the exported static site at its root, including `index.html`, route folders, `_next` assets, `robots.txt`, `sitemap.xml`, `_headers`, and a real `404.html`. Cloudflare therefore does not need to compile Next.js during deployment.

For future source changes, run `npm ci`, `python -m pip install -r scripts/requirements-localization.txt`, `npm run build:static`, and `npm run export:publish` before committing. The build generates and verifies 28 routes in all eight languages (224 pages). The publish command copies only this site's validated export into its existing deployment directory.

Translations live in `app/translations/` with reviewed corrections in `content/translation-overrides.json`. All eight language versions include the same 15 articles. Language switches preserve the current page, and legacy `?lang=` links redirect to the corresponding localized path. Production uses static HTML and `public/site.js` for navigation, filters, the parcel planner and analytics events; React hydration is intentionally removed from the exported pages.

Run `tests/localized-static.mjs` with a local server serving `out/` on port 8765 to check language switching, filters, the planner, analytics event classification and mobile overflow. It uses Playwright Chromium; set `CHROME_EXECUTABLE` to use an installed compatible Chromium executable.

## Source and output

- `app/`: editable page source
- `public/`: original public assets
- `index.html` and route folders: Cloudflare-ready static output
- `_next/`: versioned JavaScript and CSS assets

The site has no server-side database or secret environment-variable requirement.
