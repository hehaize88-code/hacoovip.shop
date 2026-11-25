import fs from 'node:fs';import zlib from 'node:zlib';import crypto from 'node:crypto';
const DOMAIN='https://orientdigtab.com';const locales=JSON.parse(fs.readFileSync('worker/localization.json'));const LANGS=Object.keys(locales.languages);
const gz=Buffer.concat(fs.readdirSync('worker/assets/index-parts').sort().map(f=>fs.readFileSync('worker/assets/index-parts/'+f)));const raw=zlib.gunzipSync(gz);const index=JSON.parse(raw);
fs.mkdirSync('dist/public',{recursive:true});fs.writeFileSync('dist/public/search-index.json',raw);
let page=fs.readFileSync('worker/page.html','utf8').replace('{{EXTRA_CSS}}',fs.readFileSync('worker/extra.css','utf8'));let client='const INDEX_VERSION='+JSON.stringify(crypto.createHash('sha256').update(gz).digest('hex').slice(0,12))+';const LOCALE='+JSON.stringify(locales)+';'+fs.readFileSync('worker/client.js','utf8');page=page.replace('{{CLIENT}}',client.replaceAll('</script','<\\/script'));
const constants={PAGE:page,DOMAIN,LANGS,LOGO:fs.readFileSync('worker/assets/logo.svg','utf8'),FAVICON:fs.readFileSync('worker/assets/favicon.png').toString('base64'),INDEX_REPORT:index.report};fs.writeFileSync('dist/worker.js',Object.entries(constants).map(([k,v])=>'const '+k+'='+JSON.stringify(v)+';').join('\n')+'\n'+fs.readFileSync('worker/server.mjs','utf8'));
const xml=s=>'<?xml version="1.0" encoding="UTF-8"?>\n'+s;const esc=s=>s.replaceAll('&','&amp;');const loc=(path,lang)=>DOMAIN+path+(lang==='en'?'':'?lang='+lang);
const urls=(paths,lang)=>xml('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'+paths.map(p=>'<url><loc>'+esc(loc(p,lang))+'</loc></url>').join('')+'</urlset>');
const paths=['/','/spreadsheet/','/categories/','/image-search/','/guides/','/faq/'];fs.writeFileSync('dist/public/sitemap-pages.xml',xml('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'+LANGS.flatMap(l=>paths.map(p=>'<url><loc>'+esc(loc(p,l))+'</loc></url>')).join('')+'</urlset>'));
const excluded=new Set(index.report.unavailableSourceIds);const products=index.products.filter(p=>!excluded.has(String(p[0]))).map(p=>'/product/'+p[0]);const maps=['sitemap-pages.xml'];for(const l of LANGS){const f='sitemap-products-'+l+'.xml';maps.push(f);fs.writeFileSync('dist/public/'+f,urls(products,l))}
fs.writeFileSync('dist/public/sitemap.xml',xml('<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'+maps.map(f=>'<sitemap><loc>'+DOMAIN+'/'+f+'</loc></sitemap>').join('')+'</sitemapindex>'));fs.writeFileSync('dist/public/robots.txt','User-agent: *\nAllow: /\nDisallow: /api/\nSitemap: '+DOMAIN+'/sitemap.xml\n');console.log('Built',products.length,'products;',index.images.length,'image signatures;',LANGS.length,'languages.');

import {attachEditorial} from '../../shopping-editorial/build.mjs';
attachEditorial('dist/worker.js');
