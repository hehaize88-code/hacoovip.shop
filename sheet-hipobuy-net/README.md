# Sheet Hipobuy

Multilingual editorial and spreadsheet site prepared for `sheet-hipobuy.net`.

## Included pages

- English, German, Spanish, Italian, and Polish routes
- Spreadsheet, categories, QC guide, shipping guide, FAQ, and article index
- Seven complete long-form articles in every language
- Static metadata, canonical URLs, alternate-language URLs, and structured data
- A single approved outbound destination for conversion links

## Commands

- `npm ci` installs the locked dependencies
- `npm run dev` starts the Vinext development server
- `npm test` builds the Vinext artifact and verifies all localized articles
- `npm run lint` checks the source
- `npm run build:pages` creates a Next.js static export in `out/`
- `npm run export:pages-root` creates the static export and copies it to this directory for the repository's Pages workflow

## Publishing state

Production indexing is enabled. The canonical public origin is `https://sheet-hipobuy.net`, with localized canonicals and hreflang alternates generated for every route.
