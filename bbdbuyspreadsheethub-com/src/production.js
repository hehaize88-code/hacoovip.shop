import app from './app.js';
import rows from './catalog-index.json';
const site='https://bbdbuyspreadsheethub.com';
const locales=['en','de','fr','es','it','zh'];
const categories=['shoes','hoodies-sweaters','t-shirts','jackets','pants-shorts','headwear','accessories','short-sets','electronics','other-stuff','jersey'];
const xml=(tag,entries)=>new Response('<?xml version="1.0" encoding="UTF-8"?><'+tag+' xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'+entries.map(link=>tag==='sitemapindex'?'<sitemap><loc>'+site+link+'</loc></sitemap>':'<url><loc>'+site+link+'</loc></url>').join('')+'</'+tag+'>',{headers:{'Content-Type':'application/xml; charset=utf-8','Cache-Control':'public, max-age=3600'}});
const original = {async fetch(request){
 const url=new URL(request.url),path=url.pathname;
 if(url.hostname==='www.bbdbuyspreadsheethub.com'||url.protocol==='http:')return Response.redirect(site+path+url.search,308);
 if(path==='/')return Response.redirect(site+'/en/',308);
 if(path==='/robots.txt')return new Response('User-agent: *\nAllow: /\nDisallow: /api/\nSitemap: '+site+'/sitemap.xml\n',{headers:{'Content-Type':'text/plain; charset=utf-8'}});
 if(path==='/sitemap.xml')return xml('sitemapindex',['/sitemap-pages.xml',...locales.map(l=>'/sitemap-products-'+l+'.xml')]);
 if(path==='/sitemap-pages.xml')return xml('urlset',locales.flatMap(l=>['','catalog/','categories/','image-search/',...categories.map(c=>'catalog/'+c+'/')].map(p=>'/'+l+'/'+p)));
 const products=path.match(/^\/sitemap-products-(en|de|fr|es|it|zh)\.xml$/);
 if(products)return xml('urlset',rows.map(row=>'/'+products[1]+'/item/'+row[0]+'/'));
 return app.fetch(request);
}};

import {withEditorial} from '../../shopping-editorial/worker.mjs';
import config from '../editorial-config.json';
import content from '../editorial-content.json';
import local from '../editorial-locales.json';
export default withEditorial(original,config,content,local);
