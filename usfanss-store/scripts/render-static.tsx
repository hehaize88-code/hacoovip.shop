import { cp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { renderToStaticMarkup } from "react-dom/server";
import { SiteShell, type PageName } from "../app/site-shell";
import type { ArticleSlug } from "../app/localized-content";

const root = process.cwd();
const site = "https://usfanss.store";
const languages = ["en", "de", "es", "fr", "it", "pl", "pt", "zh-cn"];
const routes: Array<{ path:string; page:PageName; article?:ArticleSlug; title:string; description:string }> = [
  {path:"/",page:"home",title:"USFans Product Discovery Atlas | Products, QC & Shipping",description:"Explore USFans product categories, warehouse QC guidance, shipping notes and detailed buying guides."},
  {path:"/categories/",page:"categories",title:"USFans Product Categories | Shoes, Hoodies, Bags & Jerseys",description:"Browse product categories and continue to matching products in the main collection."},
  {path:"/finds/",page:"finds",title:"USFans Product Finds | Matching Images and Product Links",description:"View selected products with matching images and direct links to the corresponding product pages."},
  {path:"/articles/",page:"articles",title:"USFans Guides & SEO Articles | Buying, QC and Reviews",description:"Read fact-based USFans guides covering buying, warehouse photos, returns, shipping and customer feedback."},
  {path:"/faq/",page:"faq",title:"USFans FAQ | Warehouse Photos, Returns and Shipping",description:"Practical answers about USFans purchasing, warehouse QC photos, returns and international parcel shipping."},
  {path:"/qc-guide/",page:"qc",title:"USFans QC Guide | Check Warehouse Photos Before Shipping",description:"Learn how to compare visible details in warehouse photos before submitting an international parcel."},
  {path:"/shipping/",page:"shipping",title:"USFans Shipping Guide | Parcel Planning and Routes",description:"Plan consolidation, packaging and international routes using the final parcel weight and restrictions."},
  {path:"/articles/how-to-use-usfans/",page:"article",article:"how-to-use-usfans",title:"How to Use USFans in 2026 | Complete Beginner Guide",description:"A practical guide to product links, warehouse arrival, QC photos, returns and parcel submission."},
  {path:"/articles/usfans-qc-photos-guide/",page:"article",article:"usfans-qc-photos-guide",title:"USFans QC Photos Guide | Inspect Warehouse Images",description:"A category-by-category method for reviewing USFans warehouse photos before international shipping."},
  {path:"/articles/usfans-review-2026/",page:"article",article:"usfans-review-2026",title:"USFans Review 2026 | Official Claims and Customer Feedback",description:"A balanced, evidence-led review of the USFans workflow, published policies and public customer feedback."},
];

const escape = (value:string) => value.replaceAll("&","&amp;").replaceAll('"',"&quot;").replaceAll("<","&lt;").replaceAll(">","&gt;");

const sourceCss = await readFile(join(root,"app","globals.css"),"utf8");
await mkdir(join(root,"static-assets"),{recursive:true});
await writeFile(join(root,"static-assets","app.css"),sourceCss.replace(/^@import\s+["']tailwindcss["'];?\s*/m,""));

for (const route of routes) {
  const canonical = `${site}${route.path}`;
  const alternates = languages.map(lang => `<link rel="alternate" hreflang="${lang}" href="${canonical}${lang === "en" ? "" : `?lang=${lang}`}"/>`).join("");
  const body = renderToStaticMarkup(<SiteShell page={route.page} article={route.article}/>);
  const html = `<!doctype html><html lang="en"><head><meta charset="utf-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/><title>${escape(route.title)}</title><meta name="description" content="${escape(route.description)}"/><meta name="robots" content="index,follow,max-image-preview:large"/><link rel="canonical" href="${canonical}"/>${alternates}<link rel="alternate" hreflang="x-default" href="${canonical}"/><meta property="og:title" content="${escape(route.title)}"/><meta property="og:description" content="${escape(route.description)}"/><meta property="og:url" content="${canonical}"/><meta property="og:type" content="website"/><link rel="icon" href="/favicon.svg"/><link rel="stylesheet" href="/static-assets/app.css"/></head><body><div id="root">${body}</div><script type="module" src="/static-assets/app.js"></script></body></html>`;
  const target = route.path === "/" ? join(root,"index.html") : join(root,route.path.slice(1),"index.html");
  await mkdir(dirname(target),{recursive:true});
  await writeFile(target,html);
}

const notFound = `<!doctype html><html lang="en"><head><meta charset="utf-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/><meta name="robots" content="noindex,follow"/><title>Page not found | USFans Product Discovery Atlas</title><link rel="stylesheet" href="/static-assets/app.css"/></head><body><main class="inner-hero"><p class="eyebrow">404</p><h1>Page not found.</h1><p>The requested page does not exist. Return to the <a href="/">product discovery atlas</a>.</p></main></body></html>`;
await writeFile(join(root,"404.html"),notFound);

await cp(join(root,"public","products"),join(root,"products"),{recursive:true});
for (const file of ["favicon.svg","usfans-logo.png"]) await cp(join(root,"public",file),join(root,file));

await writeFile(join(root,"robots.txt"),`User-agent: *\nAllow: /\nSitemap: ${site}/sitemap.xml\n`);
await writeFile(join(root,"sitemap.xml"),`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${routes.map(route=>`  <url><loc>${site}${route.path}</loc><lastmod>2026-08-13</lastmod></url>`).join("\n")}\n</urlset>\n`);
await writeFile(join(root,"_headers"),`/static-assets/*\n  Cache-Control: public, max-age=31536000, immutable\n\n/*\n  X-Content-Type-Options: nosniff\n  Referrer-Policy: strict-origin-when-cross-origin\n`);

await rm(join(root,".static-build"),{recursive:true,force:true});
