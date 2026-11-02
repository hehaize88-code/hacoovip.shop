# Hacoo VIP multilingual content release — 2026-11-02

This source bundle builds only `hacoovip-shop/`. Other sites in the shared repository are outside its scope.

## Editorial scope

- Three new guides: product links and broken routes; search with no results; official app versus website access.
- Rewritten English spreadsheet, refund, delivery, footwear and first-order guides.
- All 28 article topics available in English, Simplified Chinese, Spanish, French, German, Italian, European Portuguese, Polish and Dutch. Localized older guides are edited editions, not English fallback pages.
- Localized homepage, article hub, categories, product research, FAQ, photo checks, shipping entry and site disclaimer.
- Existing English article URLs and historical publication dates retained. Translated editions are dated when edited; existing English substantive-edit dates are preserved except the rewritten articles.
- Links preserve the existing external catalog destination and search parameters. This catalog is explicitly distinguished from official Hacoo access.

## Evidence used for priorities

The editorial priorities cover product links, spreadsheet research, search failures, official app access, order delivery and returns. Each topic has a distinct primary intent; the release does not promise a ranking or traffic result.

Official public sources checked 2026-11-02: hacoo.app homepage, contact and trust pages; act.hacoo.app returnrefundpolicy, freeshiping and EU shipping help. Public shipping estimates differ, so articles refer readers to order-specific terms instead of manufacturing a single guarantee. New guides distinguish independent editorial troubleshooting from platform policy. The project does not claim to access an account or approve orders/refunds.

## Build and verification

Requires Python 3 and BeautifulSoup 4. From repository root:

```sh
python .github/content/hacoovip-20261102/build.py
python .github/content/hacoovip-20261102/verify.py
node --check hacoovip-shop/assets/js/main.js
```

Cloudflare Pages deploys committed static files from `hacoovip-shop` through the existing Git integration. The existing `_worker.js` owns canonical redirects. The development static server does not implement its extensionless routing; preview `.html` files and verify clean routes after production deployment.

GA4 uses the existing property tag. Existing `outbound_click`, `article_open` and `site_search_submit` event names are retained; language and destination classifications are supplied. GA4 enhanced-measurement `click` and custom `outbound_click` should not be summed as unique clicks. No analytics account settings are modified by this build.
