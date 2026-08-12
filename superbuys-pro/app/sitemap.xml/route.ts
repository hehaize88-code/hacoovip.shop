import {products,CATALOG_UPDATED} from "../catalog";
import {trustSlugs} from "../trust";

const languages=["","de/","fr/","it/","nl/","ms/"];
const sections=["","browse/","finds/","qc-check/","answers/","articles/",...trustSlugs.map(slug=>`${slug}/`)];
const posts=["superbuy-first-order-product-link-to-warehouse","how-to-use-superbuy-spreadsheet","superbuy-qc-photos-checklist","superbuy-shipping-cost-explained"];
export async function GET(){
  const urls=[...languages.flatMap(l=>sections.map(s=>`https://superbuys.pro/${l}${s}`)),...languages.flatMap(l=>posts.map(p=>`https://superbuys.pro/${l}articles/${p}/`)),...languages.flatMap(l=>products.map(p=>`https://superbuys.pro/${l}products/${p.slug}/`))];
  const xml=`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls.map((url,i)=>`<url><loc>${url}</loc><lastmod>${url.includes("superbuy-first-order-product-link-to-warehouse")?"2026-08-12":CATALOG_UPDATED}</lastmod><changefreq>${i%12===0?"daily":"weekly"}</changefreq><priority>${i%12===0?"1.0":"0.8"}</priority></url>`).join("")}</urlset>`;
  return new Response(xml,{headers:{"content-type":"application/xml; charset=utf-8","cache-control":"public, max-age=3600"}});
}
