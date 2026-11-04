# USFans Store content release — 2026-11-04

Canonical content lives in `2026-10/` (existing guides) and `2026-11/` (new guides). All seventeen articles have explicit en, de, es, fr, it, pl, pt and zh-cn records. Shipping is a separate guide; no English fallback is used.

This release adds tracking troubleshooting, complete-cost planning, and returns/refunds in all eight languages. Each new English article contains 1,200–1,800 words. Every translation preserves the eight sections, two paragraphs per section, worked examples, caveats and actions. New process guides do not show unrelated product photos.

Existing reviews replace unsupported customer anecdotes with a reproducible evidence standard. Shoe guides add an illustrative insole measurement comparison. Core article descriptions are revised in every language. All articles include official source links and topic-aware internal navigation. Existing publication dates are retained; substantive revision dates are November 4, 2026.

Home, finds, guide index, QC and FAQ metadata now describe their actual task. The Italian homepage addresses shoes and sizing. FAQ contains twenty localized questions. Homepage and core pages link directly to the new guides and the established spreadsheet, beginner, QC and product articles.

Catalog destinations are retained; generic source names are displayed as localized category plus catalog ID, without invented brands or model claims. Existing GA4 product/outbound/search/article events are retained, with language added where missing. No GA4 account settings or key-event definitions are changed by this release.

## Build and release

Run `npm run build:static`. It builds complete HTML in this directory and validates 192 pages, 17 articles in 8 languages, content structure parity, English length, 20 FAQs, canonical/hreflang, links/assets, schema dates and worked examples. CSS and JS use content-hashed filenames; the language-switching client is 223 bytes.

A focused type check for the published static entry points is:

```
./node_modules/.bin/tsc --noEmit --strict --skipLibCheck --resolveJsonModule --esModuleInterop --moduleResolution bundler --module esnext --target es2021 --jsx react-jsx app/site-shell.tsx app/localized-content.ts scripts/render-static.tsx app/static-client.tsx
```

The repository-wide type check also includes unused legacy article modules and Worker bindings with pre-existing errors. They are not part of the production static renderer.

Deploy only this directory through the existing Cloudflare Pages project `usfanss-store`. The site-specific publishing workflow validates generated output before producing its release commit; bot commits are excluded from its publish job to prevent loops. Do not deploy other sites in this shared repository.
