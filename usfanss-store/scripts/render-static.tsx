import seoCopy from "../app/seo-release.json";
import { cp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { createHash } from "node:crypto";
import { dirname, join } from "node:path";
import { renderToStaticMarkup } from "react-dom/server";
import { SiteShell, getSiteCopy, type Lang, type PageName } from "../app/site-shell";
import { articleData, articleSlugsForLanguage, shippingData, faqText, type ArticleSlug } from "../app/localized-content";

const root = process.cwd();
const site = "https://usfanss.store";
const languages: Lang[] = ["en", "de", "es", "fr", "it", "pl", "pt", "zh-cn"];
const hreflang: Record<Lang,string> = {en:"en",de:"de",es:"es",fr:"fr",it:"it",pl:"pl",pt:"pt","zh-cn":"zh-CN"};
const htmlLang: Record<Lang,string> = {en:"en",de:"de",es:"es",fr:"fr",it:"it",pl:"pl",pt:"pt","zh-cn":"zh-CN"};

type Route = { path:string; page:PageName; article?:ArticleSlug };
const coreRoutes: Route[] = [
  {path:"/",page:"home"},{path:"/categories/",page:"categories"},{path:"/finds/",page:"finds"},{path:"/articles/",page:"articles"},{path:"/faq/",page:"faq"},{path:"/qc-guide/",page:"qc"},{path:"/shipping/",page:"shipping"},
];

const homeMeta = Object.fromEntries(languages.map(lang=>[lang,{title:seoCopy[lang].homeTitle,description:seoCopy[lang].homeDesc}])) as Record<Lang,{title:string;description:string}>;

const localizedPath = (lang:Lang,path:string) => lang === "en" ? path : `/${lang}${path}`;
const absolute = (lang:Lang,path:string) => `${site}${localizedPath(lang,path)}`;
const escape = (value:string) => value.replaceAll("&","&amp;").replaceAll('"',"&quot;").replaceAll("<","&lt;").replaceAll(">","&gt;");
const googleTag = `
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-BCNPML3ZE2"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-BCNPML3ZE2');
  document.addEventListener('click', function(event) {
    var link = event.target.closest && event.target.closest('a[href^="https://www.cnfanshp.com/"]');
    var articleLink = event.target.closest && event.target.closest('a[href*="/articles/"]');
    if (articleLink && new URL(articleLink.href).origin === location.origin) {
      gtag('event', 'article_select', { link_url: articleLink.href, page_path: location.pathname, language: document.documentElement.lang });
    }
    if (!link) return;
    var isProduct = /\/AllProducts\/\d+\.html/.test(link.href);
    gtag('event', isProduct ? 'product_click' : 'main_site_click', {
      link_url: link.href,
      link_text: (link.textContent || '').trim().slice(0, 100),
      page_path: location.pathname,
      language: document.documentElement.lang
    });
  }, true);
  document.addEventListener('submit', function(event) {
    if (event.target && event.target.matches('.search-box')) gtag('event', 'search_submit', { page_path: location.pathname, language: document.documentElement.lang });
  }, true);
  document.addEventListener('change', function(event) {
    if (event.target && event.target.matches('.language select')) gtag('event', 'language_switch', { language: event.target.value, page_path: location.pathname });
  }, true);
</script>`;

function metadata(route:Route,lang:Lang) {
  if (route.page === "home") return homeMeta[lang];
  if (route.page === "article" && route.article) { const article = articleData[lang][route.article]!; return {title:article.title,description:article.description}; }
  const copy = getSiteCopy(lang);
  if (route.page === "categories") return {title:`${copy.categories} | USFans`,description:copy.categoriesBody};
  if (route.page === "finds") return {title:seoCopy[lang].findsTitle,description:seoCopy[lang].findsDesc};
  if (route.page === "articles") return {title:seoCopy[lang].articlesTitle,description:seoCopy[lang].articlesDesc};
  if (route.page === "faq") return {title:seoCopy[lang].faqTitle,description:seoCopy[lang].faqDesc};
  if (route.page === "qc") return {title:seoCopy[lang].qcTitle,description:seoCopy[lang].qcDesc};
  return {title:shippingData[lang].title,description:shippingData[lang].description};
}

const sourceCss = await readFile(join(root,"app","globals.css"),"utf8");
await mkdir(join(root,"static-assets"),{recursive:true});
await writeFile(join(root,"static-assets","app.css"),sourceCss.replace(/^@import\s+["']tailwindcss["'];?\s*/m,""));

const hash = (data:Buffer|string) => createHash("sha256").update(data).digest("hex").slice(0,12);
const cssBytes = await readFile(join(root,"static-assets/app.css"));
const jsBytes = await readFile(join(root,"static-assets/app.js"));
const cssAsset = `app.${hash(cssBytes)}.css`, jsAsset = `app.${hash(jsBytes)}.js`;
await writeFile(join(root,"static-assets",cssAsset),cssBytes);
await writeFile(join(root,"static-assets",jsAsset),jsBytes);
await rm(join(root,"static-assets/app.css"));
await rm(join(root,"static-assets/app.js"));
const sitemapUrls:Array<{url:string;modified:string}> = [];
for (const lang of languages) {
  const routes: Route[] = [...coreRoutes, ...articleSlugsForLanguage(lang).map(article => ({path:`/articles/${article}/`,page:"article" as const,article}))];
  for (const route of routes) {
    const canonical = absolute(lang,route.path);
    const meta = metadata(route,lang);
    const alternateLanguages = route.page === "article" && route.article ? languages.filter(code => articleSlugsForLanguage(code).includes(route.article!)) : languages;
    const alternates = alternateLanguages.map(code => `<link rel="alternate" hreflang="${hreflang[code]}" href="${absolute(code,route.path)}"/>`).join("");
    const body = renderToStaticMarkup(<SiteShell page={route.page} article={route.article} initialLang={lang}/>);
    const ogImage = route.article && ["usfans-tracking-not-updating","usfans-fees-explained","usfans-returns-refunds"].includes(route.article) ? `${site}/usfans-logo.png` : `${site}/products/product-3402.webp`;
    const ogType = route.page === "article" ? "article" : "website";
    const localizedTypography = lang === "zh-cn" ? `<style>.atlas-copy .hero-slogan{font-size:clamp(42px,6.3vw,84px);line-height:1.12;letter-spacing:-.035em}.inner-hero h1,.article-hero h1{line-height:1.15;letter-spacing:-.035em}</style>` : "";
    const html = `<!doctype html><html lang="${htmlLang[lang]}"><head>${googleTag}<meta charset="utf-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/><title>${escape(meta.title)}</title><meta name="description" content="${escape(meta.description)}"/><meta name="robots" content="index,follow,max-image-preview:large"/><link rel="canonical" href="${canonical}"/>${alternates}<link rel="alternate" hreflang="x-default" href="${absolute("en",route.path)}"/><meta property="og:title" content="${escape(meta.title)}"/><meta property="og:description" content="${escape(meta.description)}"/><meta property="og:url" content="${canonical}"/><meta property="og:type" content="${ogType}"/><meta property="og:image" content="${ogImage}"/><meta name="twitter:card" content="summary_large_image"/><meta name="twitter:title" content="${escape(meta.title)}"/><meta name="twitter:description" content="${escape(meta.description)}"/><meta name="twitter:image" content="${ogImage}"/><link rel="icon" href="/favicon.svg"/><link rel="stylesheet" href="/static-assets/${cssAsset}"/>${localizedTypography}</head><body><div id="root">${body}</div><script type="module" src="/static-assets/${jsAsset}"></script></body></html>`;
    const outputPath = localizedPath(lang,route.path);
    const target = outputPath === "/" ? join(root,"index.html") : join(root,outputPath.slice(1),"index.html");
    await mkdir(dirname(target),{recursive:true});
    await writeFile(target,html);
    sitemapUrls.push({url:canonical,modified:route.article?articleData[lang][route.article].modified:"2026-11-04"});
  }
}

const notFound = `<!doctype html><html lang="en"><head>${googleTag}<meta charset="utf-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/><meta name="robots" content="noindex,follow"/><title>Page not found | USFans Product Discovery Atlas</title><link rel="stylesheet" href="/static-assets/${cssAsset}"/></head><body><main class="inner-hero"><p class="eyebrow">404</p><h1>Page not found.</h1><p>The requested page does not exist. Return to the <a href="/">product discovery atlas</a>.</p></main></body></html>`;
await writeFile(join(root,"404.html"),notFound);
await cp(join(root,"public","products"),join(root,"products"),{recursive:true});
for (const file of ["favicon.svg","usfans-logo.png"]) await cp(join(root,"public",file),join(root,file));
await writeFile(join(root,"robots.txt"),`User-agent: *\nAllow: /\nSitemap: ${site}/sitemap.xml\n`);
await writeFile(join(root,"sitemap.xml"),`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitemapUrls.map(entry=>`  <url><loc>${entry.url}</loc><lastmod>${entry.modified}</lastmod></url>`).join("\n")}\n</urlset>\n`);
await writeFile(join(root,"_redirects"),`http://usfanss.store/* https://usfanss.store/:splat 301\nhttp://www.usfanss.store/* https://usfanss.store/:splat 301\nhttps://www.usfanss.store/* https://usfanss.store/:splat 301\n`);
await writeFile(join(root,"_headers"),`/*\n  Cache-Control: public, max-age=0, s-maxage=300, must-revalidate\n  X-Content-Type-Options: nosniff\n  Referrer-Policy: strict-origin-when-cross-origin\n  Vary: Accept-Encoding\n\n/static-assets/*\n  Cache-Control: public, max-age=31536000, immutable\n\n/products/*\n  Cache-Control: public, max-age=31536000, immutable\n`);
await rm(join(root,".static-build"),{recursive:true,force:true});
