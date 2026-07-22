# FindQC Pro

Independent product-discovery and QC education website for `findqc.pro`.

Catalog status: 108 reviewed product routes across 9 categories, last reviewed July 22, 2026.

Brand clarity: a translated first-screen notice identifies this as an independent research guide and curated catalog, not the official FindQC search tool.

Search status: keyword searches first open the mapped FindQC Pro results page. Browser titles and descriptions follow the query in all five languages before exact product links open the source catalog.

Image status: responsive AVIF/WebP variants, intrinsic dimensions, LCP-only preload, below-fold lazy loading and long-lived hashed asset caching are generated during each production build.

Sitemap status: every indexable URL uses an explicit content modification date; production build time is never used as `lastmod`.

Editorial trust status: localized author responsibility, source hierarchy, verification, update history and correction guidance are part of the production build.

## Local development

```bash
npm ci
npm run dev
```

## Production build

```bash
npm ci
npm run build
```

The multilingual static build is written to `out/`. Cloudflare Pages uses:

- Production branch: `main`
- Root directory: `findqc-pro`
- Build command: `npm ci && npm run build`
- Build output directory: `out`
- Deploy command: none

The canonical public domain remains `https://findqc.pro`. The build preserves the permanent `www.findqc.pro` to `findqc.pro` redirect, including paths and query parameters.

Deployment status: truthful per-page sitemap dates were prepared for production on July 22, 2026.
