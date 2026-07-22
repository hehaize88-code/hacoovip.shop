# FindQC Pro

Independent product-discovery and QC education website for `findqc.pro`.

Catalog status: 108 reviewed product routes across 9 categories, last reviewed July 22, 2026.

Brand clarity: a translated first-screen notice identifies this as an independent research guide and curated catalog, not the official FindQC search tool.

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

The Vinext build is written to `dist/`. Cloudflare settings should use this
folder as the project root:

- Root directory: `findqc-pro`
- Node.js: `22.13.0` or newer
- Build command: `npm ci && npm run build`
- Worker deployment command: `npx wrangler deploy`

The canonical public domain remains `https://findqc.pro`; connecting that
domain is intentionally handled separately from this source deployment.

Deployment status: the GitHub-to-Cloudflare production connection was
re-established on July 22, 2026, and this commit triggers a fresh production build.
