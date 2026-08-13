import { cp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { renderToStaticMarkup } from "react-dom/server";
import Home from "../app/page";
import { ArticlePage, ArticlesPage, CategoriesPage, DiscoverPage, FaqPage, HowPage } from "../app/components/IndependentPages";
import { LanguageProvider } from "../app/components/LanguageProvider";
import { articleSlugs } from "../app/data";

const root = process.cwd();
const site = "https://usfanss.es";
const languages = ["es-ES", "en", "fr-FR", "de-DE", "it-IT", "pl-PL", "pt-PT", "zh-CN"];

type Route = {
  path: string;
  title: string;
  description: string;
  content: React.ReactNode;
};

const articleMeta = [
  ["Índice USFans 2026: cómo comprobar productos antes de comprar", "Cómo revisar fichas, variantes, fotos y detalles visibles antes de enviar un pedido internacional."],
  ["Fotos QC de USFans: guía práctica de inspección", "Un método paso a paso para comparar color, medidas, acabados y estado mediante fotografías de almacén."],
  ["Coste de envío USFans: peso real, volumen y consolidación", "Cómo planificar un paquete internacional teniendo en cuenta peso embalado, volumen, ruta y destino."],
];

const routes: Route[] = [
  { path: "/", title: "USFans España 2026 | Productos, QC y guías de envío", description: "Explora categorías, productos y guías prácticas de compra, fotografías QC y planificación de paquetes USFans.", content: <Home /> },
  { path: "/discover/", title: "Descubrir productos USFans | Selección visual 2026", description: "Consulta una selección visual de productos y abre la ficha correspondiente para comprobar variantes y detalles.", content: <DiscoverPage /> },
  { path: "/categories/", title: "Categorías USFans | Zapatillas, sudaderas, camisetas y más", description: "Explora seis categorías de productos con accesos claros a las colecciones correspondientes.", content: <CategoriesPage /> },
  { path: "/how-it-works/", title: "Cómo funciona USFans | Compra, QC y consolidación", description: "Conoce el proceso desde la búsqueda y confirmación de variantes hasta las fotos QC y el envío internacional.", content: <HowPage /> },
  { path: "/articles/", title: "Guías y artículos SEO de USFans | Compra, QC y envío", description: "Lee guías extensas sobre búsqueda de productos, fotografías QC y planificación de costes de envío.", content: <ArticlesPage /> },
  { path: "/faq/", title: "Preguntas frecuentes de USFans | Pedidos, QC y envíos", description: "Respuestas prácticas sobre fichas de producto, almacén, fotografías QC, devoluciones y paquetes internacionales.", content: <FaqPage /> },
  ...articleSlugs.map((slug, index): Route => ({
    path: `/articles/${slug}/`,
    title: articleMeta[index][0],
    description: articleMeta[index][1],
    content: <ArticlePage slug={slug} />,
  })),
];

const escape = (value: string) => value.replaceAll("&", "&amp;").replaceAll('"', "&quot;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");

const sourceCss = await readFile(join(root, "app", "globals.css"), "utf8");
await mkdir(join(root, "static-assets"), { recursive: true });
await writeFile(join(root, "static-assets", "app.css"), sourceCss.replace(/^@import\s+["']tailwindcss["'];?\s*/m, ""));

for (const route of routes) {
  const canonical = `${site}${route.path}`;
  const alternates = languages.map(lang => `<link rel="alternate" hreflang="${lang}" href="${canonical}${lang === "es-ES" ? "" : `?lang=${lang.startsWith("zh") ? "zh" : lang.slice(0, 2)}`}"/>`).join("");
  const body = renderToStaticMarkup(<LanguageProvider>{route.content}</LanguageProvider>);
  const html = `<!doctype html><html lang="es"><head><meta charset="utf-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/><title>${escape(route.title)}</title><meta name="description" content="${escape(route.description)}"/><meta name="robots" content="index,follow,max-image-preview:large"/><link rel="canonical" href="${canonical}"/>${alternates}<link rel="alternate" hreflang="x-default" href="${canonical}"/><meta property="og:title" content="${escape(route.title)}"/><meta property="og:description" content="${escape(route.description)}"/><meta property="og:url" content="${canonical}"/><meta property="og:type" content="website"/><link rel="icon" href="/favicon.svg"/><link rel="stylesheet" href="/static-assets/app.css"/></head><body style="--font-sans:Arial,sans-serif;--font-serif:Georgia,serif"><div id="root">${body}</div><script type="module" src="/static-assets/app.js"></script></body></html>`;
  const target = route.path === "/" ? join(root, "index.html") : join(root, route.path.slice(1), "index.html");
  await mkdir(dirname(target), { recursive: true });
  await writeFile(target, html);
}

const notFound = `<!doctype html><html lang="es"><head><meta charset="utf-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/><meta name="robots" content="noindex,follow"/><title>Página no encontrada | USFans España</title><link rel="stylesheet" href="/static-assets/app.css"/></head><body><main class="inner-section"><p class="section-kicker">404</p><h1>Página no encontrada</h1><p>La dirección solicitada no existe. Vuelve a la <a href="/">página principal</a>.</p></main></body></html>`;
await writeFile(join(root, "404.html"), notFound);

for (const file of ["favicon.svg", "usfans-logo.png"]) await cp(join(root, "public", file), join(root, file));

await writeFile(join(root, "robots.txt"), `User-agent: *\nAllow: /\nSitemap: ${site}/sitemap.xml\n`);
await writeFile(join(root, "sitemap.xml"), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${routes.map(route => `  <url><loc>${site}${route.path}</loc><lastmod>2026-08-13</lastmod></url>`).join("\n")}\n</urlset>\n`);
await writeFile(join(root, "_headers"), `/static-assets/*\n  Cache-Control: public, max-age=31536000, immutable\n\n/*\n  X-Content-Type-Options: nosniff\n  Referrer-Policy: strict-origin-when-cross-origin\n  X-Frame-Options: SAMEORIGIN\n`);

await rm(join(root, ".static-build"), { recursive: true, force: true });
