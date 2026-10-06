# Superbuys.pro editorial release — 6 October 2026

Scope: `superbuys-pro/` only. The shared automation has an explicit permanent skip for this domain; its enabled state, schedule and other websites were preserved. Manual maintenance requested by the owner remains permitted.

## Editorial decisions

The four new English guides target distinct tasks: shoe sizing/QC, clothing fit comparisons, jersey variations/printing, and Shipping Expert packing requests. Each contains 1,200–1,800 words and has no added FAQ. Existing seven URLs and original publication dates are retained, with new decision checklists and an accurate modification date. Do not treat these topics as measured high-volume keywords: Search Console, Bing and GA4 performance data were unavailable because the connected reporting service returned an expired-subscription error.

Public competitor/category research identified these topic clusters; it did not establish search volume, ranking, CTR or conversions. No traffic uplift is claimed before measurement.

## Primary process references reviewed

- https://www.superbuy.com/en/

- https://www.superbuy.com/en/page/guide/shoppingagent/
- https://www.superbuy.com/en/page/guide/transportagent/
- https://www.superbuy.com/en/page/guide/feecomposition/
- https://www.superbuy.com/en/page/noviceguide/
- https://www.superbuy.com/en/page/query/freight/

Shipping Expert is described only as a packing/shipping assistance route linked from the official estimator. No fixed service fee, guaranteed savings or delivery date is asserted. Old fixed claims of three included free QC photos are replaced with the currently verifiable statement of free QC photos, with the included views left to the live order interface. Volumetric calculations are explicitly hypothetical and conditional on the chosen line's divisor.

## Product and measurement boundaries

All 33 source IDs, product URLs, images and outbound destinations are retained. Five vague footwear labels are replaced with visible, descriptive names without guessing an exact brand/model. Existing CNY prices retain their original 11 August 2026 date; they are not refreshed without evidence. Outdated reference prices are removed from Offer schema.

GA4 property `G-MGRK9E4V6G` is preserved. Existing outbound-click events gain source-path and product-ID context; a catalog-search submission event records the source path without the entered query. Receipt of these events still needs confirmation in the owner's GA4 account.

## Publishing

Run `npm run publish:static` to build, export and copy the completed static output into this site's tracked directory. Commit both source and generated pages; changing only source is insufficient for the existing static GitHub deployment. The script never writes sibling websites. HTML and sitemap responses revalidate; only fingerprinted assets are immutable.

After deployment, verify all four new English URLs, their language counterparts, the 11-article index, preserved old URLs and the sitemap against the actual public domain. A successful GitHub push alone is not proof of production deployment.
