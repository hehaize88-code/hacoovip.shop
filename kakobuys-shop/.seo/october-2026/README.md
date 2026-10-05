# October 2026 editorial release

Four new topics, each published in English, German, Spanish, French and Italian:

- New Era caps: specific listings, closure systems, head measurement and cap QC.
- ASICS: model and item-ID comparisons, regional sizing and pair-level QC.
- Oakley: separate apparel fit from ski-goggle condition and unverified protective specifications.
- Budget finds under a $30 reference price: distinguish item cost from incremental parcel cost.

Existing QC, footwear and shipping-cost articles receive substantive comparison sections and links to the new guides. The homepage retains four guide cards. Relevant category pages link to these guides. Article indexes retain all existing cards, and their counts reflect pages actually available in that language. Two older English-only posts do not advertise nonexistent translated URLs.

The HTML drafts and translations here were authored locally. Run `python .seo/october-2026/build.py` from the site directory, followed by `python .seo/october-2026/finalize.py`. Shared CSS additions are maintained in the checked-in assets. Python requires BeautifulSoup.

Source review on 2026-10-05:

- The exact product paths, item IDs, source amounts and first images are in `products.json`.
- New Era official sizing: https://www.neweracap.com/pages/sizing-chart
- New Era silhouettes: https://www.neweracap.com/blogs/stories/find-your-fit-which-new-era-cap-is-right-for-you
- ASICS measurement guidance: https://www.asics.com/on/demandware.static/-/Sites-asics-sg-Library/default/dwabe1d96f/how-to-measure-your-shoe-size.pdf
- Oakley Admission model-specific fit information: https://www.oakley.com/en-us/product/W0OX8056F

Manufacturer references do not authenticate marketplace listings. Reference USD amounts retain the catalog conversion convention of 6.7663 source units per dollar; this is not a current FX quote. No sample testing, customer testimonials, stock guarantee or protective certification is claimed.

Validation before publication: 20 new pages, 15 improved article pages, canonical/hreflang and Article JSON-LD checked, no broken internal links, 207 sitemap URLs. English article bodies including product cards: 1,336–1,421 words. Guide and product click tracking now recognises locale prefixes. Asset cache headers revalidate stable filenames.
