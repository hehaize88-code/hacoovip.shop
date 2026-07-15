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

## Project structure

- `app/` — routes, localized content, SEO metadata and styles
- `components/` — shared navigation, cards, search and structured data
- `public/` — logo and product imagery
- `vite.config.js` — Vinext and Cloudflare build configuration
- `wrangler.jsonc` — Cloudflare Worker and asset configuration
