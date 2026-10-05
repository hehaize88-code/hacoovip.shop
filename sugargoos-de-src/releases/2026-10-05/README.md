# 5 October 2026 editorial release

This scoped release operates on the complete Git-tracked static publication in
`sugargoos-de`. It must not be run against a fresh output of the older July
generator, which omits later published material.

## Content

- Four new English and German topics: tracking not updating, missing warehouse
  QC photos, payment failure and rehearsal shipping cost.
- German translation of the previously published consolidation article, to
  complete its existing language link.
- Six existing topics in each language receive intent-focused titles,
  descriptions, actionable opening steps, a contents list and related links.
- Homepages display the four latest article summaries and practical entry
  links. The article directories retain all previous articles (19 per language).
- Canonicals, language alternates, article structured data and sitemaps are
  refreshed for the changed pages. Existing product records, price snapshot
  dates, catalog destinations and analytics configuration are preserved.

Original article copy is in `content/`. Titles, descriptions, related links and
the public source URLs used for the four new topics are in `manifest.json`.
Source names appear in the pages; source URLs are retained here for editorial
review. Examples are explicitly hypothetical. Checkout availability, fees,
carrier events and packing outcomes are not presented as universal guarantees.

## Apply and review

Run from the repository root with Python 3 and Beautiful Soup 4 installed:

```bash
python sugargoos-de-src/releases/2026-10-05/publish.py sugargoos-de
git diff --stat -- sugargoos-de sugargoos-de-src
```

The updater is repeatable. Before publishing, check all local canonical paths,
new internal links, reciprocal English/German alternates, JSON-LD validity,
mobile overflow and the preservation of the original site JavaScript and
product data. Commit only these two site directories. Publish through the
existing GitHub-connected Cloudflare Pages project and verify the production
URLs after its deployment finishes.

This release uses Google Search Console observations and public research.
No Bing Webmaster Tools or GA4 report data was available for this release.
