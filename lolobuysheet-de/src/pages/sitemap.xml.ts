import {locales,infoPages,articleSlugs,href} from '../lib/i18n';
import {contentUpdatedAt} from '../lib/seo';
export const prerender=true;
export function GET(){
 const paths=['','spreadsheet','categories',...infoPages.filter(p=>!['privacy','image-search'].includes(p)),...articleSlugs.map(s=>`articles/${s}`)];
 const host=import.meta.env.PUBLIC_SITE_URL || 'https://lolobuysheet.de';
 const changed=(path:string)=>path===''||['spreadsheet','articles','guide','qc','shipping'].includes(path)||path.startsWith('articles/');
 const urls=locales.flatMap(lang=>paths.map(path=>`<url><loc>${host}${href(lang,path)}</loc>${changed(path)?`<lastmod>${contentUpdatedAt}</lastmod>`:''}${locales.map(other=>`<xhtml:link rel="alternate" hreflang="${other}" href="${host}${href(other,path)}"/>`).join('')}<xhtml:link rel="alternate" hreflang="x-default" href="${host}${href('de',path)}"/></url>`));
 return new Response(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">${urls.join('')}</urlset>`,{headers:{'Content-Type':'application/xml; charset=utf-8'}});
}
