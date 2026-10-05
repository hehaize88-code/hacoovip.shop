# sugargoos.de source

This directory contains the maintainable data, editorial copy, local product
images and static-site generator for the Cloudflare Pages output in
`../sugargoos-de`.

## Current publication workflow

The checked-in `../sugargoos-de` directory is the current production output.
The July generator below contains only eight original article topics and does
not include the later published articles or all subsequent UI changes. Do not
replace production with its output.

The October editorial release preserves the complete current publication and
updates only its specified pages, navigation and sitemaps:

```bash
python -m pip install beautifulsoup4
python sugargoos-de-src/releases/2026-10-05/publish.py sugargoos-de
```

See `releases/2026-10-05/README.md` for scope and release verification.

For investigation of the original July build only, use a temporary directory:

```bash
python sugargoos-de-src/build.py /tmp/sugargoos-de-build
```

The product snapshot was checked against `cnfanshp.com` on 30 July 2026.
Reference USD values use the European Central Bank rates published on
29 July 2026 (EUR 1 = USD 1.1380 and CNY 7.7000). Prices are research
snapshots, not checkout offers.

The five existing Guides and the legal/information pages are preserved as
reviewed legacy fragments. New long-form SEO content belongs under Articles so
the two content types remain distinct.
