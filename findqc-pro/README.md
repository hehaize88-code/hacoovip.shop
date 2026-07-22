# FindQC Pro

Independent product-discovery and QC education website for `findqc.pro`.

Catalog status: 108 reviewed product routes across 9 categories, last reviewed July 22, 2026.

Brand clarity: a translated first-screen notice identifies this as an independent research guide and curated catalog, not the official FindQC search tool.

Search status: keyword searches first open the mapped FindQC Pro results page. Browser titles and descriptions follow the query in all five languages before exact product links open the source catalog.

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

Deployment status: search-result titles and the mapped search flow were prepared for production on July 22, 2026.
