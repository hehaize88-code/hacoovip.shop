import { cp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { renderToStaticMarkup } from "react-dom/server";
import { SiteShell, getSiteCopy, type Lang, type PageName } from "../app/site-shell";
import { articleData, faqText, type ArticleSlug } from "../app/localized-content";

const root = process.cwd();
const site = "https://usfanss.store";
const languages: Lang[] = ["en", "de", "es", "fr", "it", "pl", "pt", "zh-cn"];
const hreflang: Record<Lang,string> = {en:"en",de:"de-DE",es:"es-ES",fr:"fr-FR",it:"it-IT",pl:"pl-PL",pt:"pt-PT","zh-cn":"zh-CN"};
const htmlLang: Record<Lang,string> = {en:"en",de:"de",es:"es",fr:"fr",it:"it",pl:"pl",pt:"pt","zh-cn":"zh-CN"};

type Route = { path:string; page:PageName; article?:ArticleSlug };
const routes: Route[] = [
  {path:"/",page:"home"},{path:"/categories/",page:"categories"},{path:"/finds/",page:"finds"},{path:"/articles/",page:"articles"},{path:"/faq/",page:"faq"},{path:"/qc-guide/",page:"qc"},{path:"/shipping/",page:"shipping"},
  {path:"/articles/how-to-use-usfans/",page:"article",article:"how-to-use-usfans"},{path:"/articles/usfans-qc-photos-guide/",page:"article",article:"usfans-qc-photos-guide"},{path:"/articles/usfans-review-2026/",page:"article",article:"usfans-review-2026"},
];

const homeMeta: Record<Lang,{title:string;description:string}> = {
  en:{title:"USFans Product Finds 2026 | Shoes, Hoodies, Bags & Jerseys",description:"Explore verified product finds by category, matching product images, buying guides, QC checks and parcel-planning notes."},
  de:{title:"USFans Produktfunde 2026 | Schuhe, Hoodies, Taschen & Trikots",description:"Entdecke geprüfte Produktfunde nach Kategorie, passende Produktbilder, Kaufratgeber, QC-Prüfungen und Pakethinweise."},
  es:{title:"Productos USFans 2026 | Zapatillas, sudaderas, bolsos y camisetas",description:"Explora productos verificados por categoría, imágenes coincidentes, guías de compra, controles QC y consejos para paquetes."},
  fr:{title:"Produits USFans 2026 | Chaussures, sweats, sacs et maillots",description:"Explorez des produits vérifiés par catégorie, leurs images correspondantes, des guides d’achat, le contrôle QC et la préparation du colis."},
  it:{title:"Prodotti USFans 2026 | Scarpe, felpe, borse e maglie",description:"Esplora prodotti verificati per categoria, immagini corrispondenti, guide all’acquisto, controlli QC e note per il pacco."},
  pl:{title:"Produkty USFans 2026 | Buty, bluzy, torby i koszulki",description:"Odkrywaj sprawdzone produkty według kategorii, zgodne zdjęcia, poradniki zakupowe, kontrolę QC i planowanie paczki."},
  pt:{title:"Produtos USFans 2026 | Tênis, moletons, bolsas e camisas",description:"Explore produtos verificados por categoria, imagens correspondentes, guias de compra, inspeção QC e planejamento do pacote."},
  "zh-cn":{title:"USFans 产品精选 2026｜鞋子、连帽衫、包袋与球衣",description:"按分类查看已核验的真实商品、对应首图、购买指南、质检要点和国际包裹规划说明。"},
};

const localizedPath = (lang:Lang,path:string) => lang === "en" ? path : `/${lang}${path}`;
const absolute = (lang:Lang,path:string) => `${site}${localizedPath(lang,path)}`;
const escape = (value:string) => value.replaceAll("&","&amp;").replaceAll('"',"&quot;").replaceAll("<","&lt;").replaceAll(">","&gt;");

function metadata(route:Route,lang:Lang) {
  if (route.page === "home") return homeMeta[lang];
  if (route.page === "article" && route.article) { const article = articleData[lang][route.article]; return {title:article.title,description:article.description}; }
  const copy = getSiteCopy(lang);
  if (route.page === "categories") return {title:`${copy.categories} | USFans`,description:copy.categoriesBody};
  if (route.page === "finds") return {title:`${copy.finds} | USFans`,description:copy.findsBody};
  if (route.page === "articles") return {title:`${copy.buyingGuides} | USFans`,description:copy.articlesBody};
  if (route.page === "faq") return {title:`${faqText[lang].label} | USFans`,description:faqText[lang].body};
  if (route.page === "qc") return {title:`${copy.qc} | USFans`,description:copy.qcBody};
  return {title:`${copy.shipping} | USFans`,description:copy.shippingBody};
}

const sourceCss = await readFile(join(root,"app","globals.css"),"utf8");
await mkdir(join(root,"static-assets"),{recursive:true});
await writeFile(join(root,"static-assets","app.css"),sourceCss.replace(/^@import\s+["']tailwindcss["'];?\s*/m,""));

const sitemapUrls:string[] = [];
for (const lang of languages) {
  for (const route of routes) {
    const canonical = absolute(lang,route.path);
    const meta = metadata(route,lang);
    const alternates = languages.map(code => `<link rel="alternate" hreflang="${hreflang[code]}" href="${absolute(code,route.path)}"/>`).join("");
    const body = renderToStaticMarkup(<SiteShell page={route.page} article={route.article} initialLang={lang}/>);
    const ogType = route.page === "article" ? "article" : "website";
    const html = `<!doctype html><html lang="${htmlLang[lang]}"><head><meta charset="utf-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/><title>${escape(meta.title)}</title><meta name="description" content="${escape(meta.description)}"/><meta name="robots" content="index,follow,max-image-preview:large"/><link rel="canonical" href="${canonical}"/>${alternates}<link rel="alternate" hreflang="x-default" href="${absolute("en",route.path)}"/><meta property="og:title" content="${escape(meta.title)}"/><meta property="og:description" content="${escape(meta.description)}"/><meta property="og:url" content="${canonical}"/><meta property="og:type" content="${ogType}"/><meta property="og:image" content="${site}/products/product-3402.webp"/><meta property="og:image:width" content="750"/><meta property="og:image:height" content="750"/><meta name="twitter:card" content="summary_large_image"/><meta name="twitter:title" content="${escape(meta.title)}"/><meta name="twitter:description" content="${escape(meta.description)}"/><meta name="twitter:image" content="${site}/products/product-3402.webp"/><link rel="icon" href="/favicon.svg"/><link rel="stylesheet" href="/static-assets/app.css"/></head><body><div id="root">${body}</div><script type="module" src="/static-assets/app.js"></script></body></html>`;
    const outputPath = localizedPath(lang,route.path);
    const target = outputPath === "/" ? join(root,"index.html") : join(root,outputPath.slice(1),"index.html");
    await mkdir(dirname(target),{recursive:true});
    await writeFile(target,html);
    sitemapUrls.push(canonical);
  }
}

const notFound = `<!doctype html><html lang="en"><head><meta charset="utf-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/><meta name="robots" content="noindex,follow"/><title>Page not found | USFans Product Discovery Atlas</title><link rel="stylesheet" href="/static-assets/app.css"/></head><body><main class="inner-hero"><p class="eyebrow">404</p><h1>Page not found.</h1><p>The requested page does not exist. Return to the <a href="/">product discovery atlas</a>.</p></main></body></html>`;
await writeFile(join(root,"404.html"),notFound);
await cp(join(root,"public","products"),join(root,"products"),{recursive:true});
for (const file of ["favicon.svg","usfans-logo.png"]) await cp(join(root,"public",file),join(root,file));
await writeFile(join(root,"robots.txt"),`User-agent: *\nAllow: /\nSitemap: ${site}/sitemap.xml\n`);
await writeFile(join(root,"sitemap.xml"),`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitemapUrls.map(url=>`  <url><loc>${url}</loc><lastmod>2026-08-13</lastmod></url>`).join("\n")}\n</urlset>\n`);
await writeFile(join(root,"_headers"),`/*\n  Cache-Control: public, max-age=0, s-maxage=86400, must-revalidate\n  X-Content-Type-Options: nosniff\n  Referrer-Policy: strict-origin-when-cross-origin\n  Vary: Accept-Encoding\n\n/static-assets/*\n  Cache-Control: public, max-age=31536000, immutable\n\n/products/*\n  Cache-Control: public, max-age=31536000, immutable\n`);
await rm(join(root,".static-build"),{recursive:true,force:true});
