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

For future source changes, run `npm ci` followed by `npm run build:static`, then copy the contents of `out/` back into this directory root before committing.

## Source and output

- `app/`: editable page source
- `public/`: original public assets
- `index.html` and route folders: Cloudflare-ready static output
- `_next/`: versioned JavaScript and CSS assets

The site has no server-side database or secret environment-variable requirement.
