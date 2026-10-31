# Sheet Hipobuy

Multilingual editorial and spreadsheet site prepared for `sheet-hipobuy.net`.

## Included pages

- English, German, Spanish, Italian, and Polish routes
- Spreadsheet, categories, QC guide, shipping guide, FAQ, and article index
- Thirteen complete long-form articles in every language
- 30 source-backed product listings, category filters, local search, price sorting and pagination
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

## October 2026 content release

The static export contains 100 indexable routes (65 article pages) across EN/DE/ES/IT/PL. Spain shipping and Rehearsal Parcel are new in all five languages. Shipping cost, warehouse QC and review guides have additional decision examples; all article relationships stay in the selected language. Original publication dates are retained.

Product records added on 31 October were read from the public catalog at https://www.cnfanshm.com/AllProducts/list_1_2/. Prices and truncated listing names are preserved as displayed; no authenticity or inventory verification is claimed. The six earlier rows keep their August observation dates. The 24 newer rows are catalog observations, not individual purchase tests.

Content research: Hipobuy public homepage announcement (https://hipobuy.com/), European Commission customs reform (https://taxation-customs.ec.europa.eu/customs/eu-customs-reform_en), Spanish tax agency import guidance, and Correos low-value import guidance. Rehearsal fees and account-specific availability are explicitly unverified; all numerical parcel examples are hypothetical.

Run `npm run test:pages` to build and verify the production export. The existing GitHub workflow repeats route, locale, metadata, discovery-link and content-length checks before publishing generated files. Cloudflare Pages consumes the generated project root through the existing integration.

Analytics keeps the existing measurement ID. Product, category and guide events remain; directory filtering, pagination and debounced local searches now emit events. The new local-search event sends only query length and result count. Key-event configuration in GA4 is unchanged.
