import { cp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { renderToStaticMarkup } from "react-dom/server";
import Home from "../app/page";
import { ArticlePage, ArticlesPage, CategoriesPage, DiscoverPage, FaqPage, HowPage } from "../app/components/IndependentPages";
import { LanguageProvider } from "../app/components/LanguageProvider";
import { articleSlugs } from "../app/data";
import { dictionaries, Lang } from "../app/i18n";

const root = process.cwd();
const site = "https://usfanss.es";
const checked = "2026-08-13";
const newArticleSlug = "usfans-spain-address-checklist";
const checkedFor = (route: BaseRoute) => route.slug === newArticleSlug ? "2026-08-14" : checked;
const socialImage = `${site}/product-images/product-3359.webp`;

const languageConfig: Record<Lang, { prefix: string; html: string; hreflang: string; homeTitle: string; homeDescription: string }> = {
  es: { prefix: "", html: "es", hreflang: "es-ES", homeTitle: "USFans España 2026: Productos, Fotos QC y Envíos", homeDescription: "Descubre productos, comprueba enlaces y fotos QC y consulta guías actualizadas de paquetes, IVA y envíos de USFans a España." },
  en: { prefix: "en", html: "en", hreflang: "en", homeTitle: "USFans Spain 2026: Products, QC Photos and Shipping", homeDescription: "Explore verified product links, QC photo guidance and updated information about parcels, VAT and shipping to Spain." },
  fr: { prefix: "fr", html: "fr", hreflang: "fr-FR", homeTitle: "USFans Espagne 2026 : Produits, photos QC et envoi", homeDescription: "Explorez des liens produits vérifiés, les photos QC et des guides actualisés sur les colis, la TVA et l’envoi vers l’Espagne." },
  de: { prefix: "de", html: "de", hreflang: "de-DE", homeTitle: "USFans Spanien 2026: Produkte, QC-Fotos und Versand", homeDescription: "Geprüfte Produktlinks, QC-Fotos und aktuelle Hinweise zu Paketen, Mehrwertsteuer und Versand nach Spanien." },
  it: { prefix: "it", html: "it", hreflang: "it-IT", homeTitle: "USFans Spagna 2026: Prodotti, foto QC e spedizione", homeDescription: "Esplora link prodotto verificati, foto QC e guide aggiornate su pacchi, IVA e spedizione verso la Spagna." },
  pl: { prefix: "pl", html: "pl", hreflang: "pl-PL", homeTitle: "USFans Hiszpania 2026: Produkty, zdjęcia QC i wysyłka", homeDescription: "Sprawdzone linki produktowe, zdjęcia QC oraz aktualne informacje o paczkach, VAT i wysyłce do Hiszpanii." },
  pt: { prefix: "pt", html: "pt", hreflang: "pt-PT", homeTitle: "USFans Espanha 2026: Produtos, fotos QC e envio", homeDescription: "Explore links de produtos verificados, fotos QC e guias atualizados sobre pacotes, IVA e envios para Espanha." },
  zh: { prefix: "zh-cn", html: "zh-CN", hreflang: "zh-CN", homeTitle: "USFans西班牙2026：商品、QC照片与运输指南", homeDescription: "浏览已核对商品链接、QC照片说明，以及寄往西班牙的包裹、增值税和运输更新指南。" },
};

type BaseRoute = { path: string; key: "home" | "discover" | "categories" | "how" | "articles" | "faq" | "article"; slug?: string; content: React.ReactNode };
const baseRoutes: BaseRoute[] = [
  { path: "/", key: "home", content: <Home /> },
  { path: "/discover/", key: "discover", content: <DiscoverPage /> },
  { path: "/categories/", key: "categories", content: <CategoriesPage /> },
  { path: "/how-it-works/", key: "how", content: <HowPage /> },
  { path: "/articles/", key: "articles", content: <ArticlesPage /> },
  { path: "/faq/", key: "faq", content: <FaqPage /> },
  ...articleSlugs.map(slug => ({ path: `/articles/${slug}/`, key: "article" as const, slug, content: <ArticlePage slug={slug} /> })),
];

const localizedPath = (path: string, lang: Lang) => {
  const prefix = languageConfig[lang].prefix;
  return prefix ? `/${prefix}${path}`.replace(/\/{2,}/g, "/") : path;
};

const escape = (value: string) => value.replaceAll("&", "&amp;").replaceAll('"', "&quot;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
const jsonLd = (value: unknown) => `<script type="application/ld+json">${JSON.stringify(value).replaceAll("<", "\\u003c")}</script>`;

const metadataFor = (route: BaseRoute, lang: Lang) => {
  const d = dictionaries[lang];
  if (route.key === "home") return { title: languageConfig[lang].homeTitle, description: languageConfig[lang].homeDescription };
  if (route.key === "article") {
    const index = Math.max(0, articleSlugs.indexOf(route.slug ?? ""));
    return { title: `${d.articles[index][1]} | USFans`, description: d.articles[index][2] };
  }
  const page = d.pages[route.key];
  return { title: `${page[1]} | USFans`, description: page[2] };
};

const structuredDataFor = (route: BaseRoute, lang: Lang, canonical: string, title: string, description: string) => {
  const d = dictionaries[lang];
  const entities: unknown[] = [];
  if (route.key === "home") entities.push({ "@context": "https://schema.org", "@type": "WebSite", name: "USFans España Guide", url: canonical, inLanguage: languageConfig[lang].html, description });
  if (route.key === "home") entities.push({ "@context": "https://schema.org", "@type": "Organization", name: "USFans España Guide", url: canonical, logo: `${site}/usfans-logo.png` });
  if (route.key === "faq") entities.push({ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: d.faqs.map(([name, text]) => ({ "@type": "Question", name, acceptedAnswer: { "@type": "Answer", text } })) });
  if (route.key === "article") entities.push({ "@context": "https://schema.org", "@type": "BlogPosting", headline: title.replace(" | USFans", ""), description, datePublished: checkedFor(route), dateModified: checkedFor(route), inLanguage: languageConfig[lang].html, mainEntityOfPage: canonical, image: socialImage, author: { "@type": "Organization", name: "USFans España Guide" }, publisher: { "@type": "Organization", name: "USFans España Guide", logo: { "@type": "ImageObject", url: `${site}/usfans-logo.png` } } });
  if (route.key !== "home") entities.push({ "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "USFans", item: `${site}${localizedPath("/", lang)}` }, { "@type": "ListItem", position: 2, name: title.replace(" | USFans", ""), item: canonical }] });
  return entities.map(jsonLd).join("");
};

const sourceCss = await readFile(join(root, "app", "globals.css"), "utf8");
await mkdir(join(root, "static-assets"), { recursive: true });
await writeFile(join(root, "static-assets", "app.css"), sourceCss.replace(/^@import\s+["']tailwindcss["'];?\s*/m, ""));

const sitemap: string[] = [];
for (const lang of Object.keys(languageConfig) as Lang[]) {
  for (const route of baseRoutes) {
    const path = localizedPath(route.path, lang);
    const canonical = `${site}${path}`;
    const meta = metadataFor(route, lang);
    const alternates = (Object.keys(languageConfig) as Lang[]).map(other => `<link rel="alternate" hreflang="${languageConfig[other].hreflang}" href="${site}${localizedPath(route.path, other)}"/>`).join("");
    const body = renderToStaticMarkup(<LanguageProvider initialLang={lang}>{route.content}</LanguageProvider>);
    const schema = structuredDataFor(route, lang, canonical, meta.title, meta.description);
    const ogType = route.key === "article" ? "article" : "website";
    const html = `<!doctype html><html lang="${languageConfig[lang].html}"><head><meta charset="utf-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/><title>${escape(meta.title)}</title><meta name="description" content="${escape(meta.description)}"/><meta name="robots" content="index,follow,max-image-preview:large"/><link rel="canonical" href="${canonical}"/>${alternates}<link rel="alternate" hreflang="x-default" href="${site}${route.path}"/><meta property="og:title" content="${escape(meta.title)}"/><meta property="og:description" content="${escape(meta.description)}"/><meta property="og:url" content="${canonical}"/><meta property="og:type" content="${ogType}"/><meta property="og:image" content="${socialImage}"/><meta name="twitter:card" content="summary_large_image"/><meta name="twitter:title" content="${escape(meta.title)}"/><meta name="twitter:description" content="${escape(meta.description)}"/><meta name="twitter:image" content="${socialImage}"/><link rel="icon" href="/favicon.svg"/><link rel="stylesheet" href="/static-assets/app.css"/>${schema}</head><body style="--font-sans:Arial,sans-serif;--font-serif:Georgia,serif"><div id="root">${body}</div><script type="module" src="/static-assets/app.js"></script></body></html>`;
    const target = path === "/" ? join(root, "index.html") : join(root, path.slice(1), "index.html");
    await mkdir(dirname(target), { recursive: true });
    await writeFile(target, html);
    sitemap.push(`${canonical}|${checkedFor(route)}`);
  }
}

const notFound = `<!doctype html><html lang="es"><head><meta charset="utf-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/><meta name="robots" content="noindex,follow"/><title>Página no encontrada | USFans España</title><link rel="stylesheet" href="/static-assets/app.css"/></head><body><main class="inner-section"><p class="section-kicker">404</p><h1>Página no encontrada</h1><p>La dirección solicitada no existe. Vuelve a la <a href="/">página principal</a>.</p></main></body></html>`;
await writeFile(join(root, "404.html"), notFound);

for (const file of ["favicon.svg", "usfans-logo.png"]) await cp(join(root, "public", file), join(root, file));
await rm(join(root, "product-images"), { recursive: true, force: true });
await cp(join(root, "public", "product-images"), join(root, "product-images"), { recursive: true });

await writeFile(join(root, "robots.txt"), `User-agent: *\nAllow: /\nSitemap: ${site}/sitemap.xml\n`);
await writeFile(join(root, "sitemap.xml"), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitemap.map(entry => { const [url, lastmod] = entry.split("|"); return `  <url><loc>${url}</loc><lastmod>${lastmod}</lastmod></url>`; }).join("\n")}\n</urlset>\n`);
await writeFile(join(root, "_headers"), `/static-assets/*\n  Cache-Control: public, max-age=31536000, immutable\n\n/product-images/*\n  Cache-Control: public, max-age=31536000, immutable\n\n/*\n  Cache-Control: public, max-age=300, s-maxage=86400\n  X-Content-Type-Options: nosniff\n  Referrer-Policy: strict-origin-when-cross-origin\n  X-Frame-Options: SAMEORIGIN\n`);
await writeFile(join(root, "_redirects"), `https://www.usfanss.es/* https://usfanss.es/:splat 301\n`);

await rm(join(root, ".static-build"), { recursive: true, force: true });
