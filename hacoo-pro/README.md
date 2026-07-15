# Hacoo Pro

Independent Hacoo discovery guide with category routes, current CNFansHP product links, practical shopping guides, direct product search and six localized editions.

## Local development

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
npm run start
```

The application uses Next.js-compatible Vinext output for Cloudflare deployment. Runtime and Sites metadata are stored in `wrangler.jsonc` and `.openai/hosting.json`.

## Cloudflare Pages

This monorepo project has a dedicated static export for Cloudflare Pages:

```bash
npm run build:pages
```

Use these Pages build settings:

- Root directory: `hacoo-pro`
- Build command: `npm run build:pages`
- Build output directory: `out`

The default `npm run build` remains the Vinext/Worker build used by Worker-compatible hosting.

## Project structure

- `app/` — routes, localized content, SEO metadata and styles
- `components/` — shared navigation, cards, search and structured data
- `public/` — logo and product imagery
- `vite.config.js` — Vinext and Cloudflare build configuration
- `wrangler.jsonc` — Cloudflare Worker and asset configuration
