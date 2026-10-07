import fs from 'node:fs';
import path from 'node:path';
import { parse } from 'node-html-parser';

const origin='https://sheet-superbuy.com';
const root=process.cwd();
const output=path.join(root,'out');
const languages=['en','fr','de','es','it','id','zh-cn'];
const langTag=(lang)=>lang==='zh-cn'?'zh-CN':lang;
const locale={en:'en_US',fr:'fr_FR',de:'de_DE',es:'es_ES',it:'it_IT',id:'id_ID','zh-cn':'zh_CN'};
const short={en:'EN',fr:'FR',de:'DE',es:'ES',it:'IT',id:'ID','zh-cn':'中文'};
const norm=s=>s.replace(/\s+/g,' ').trim();
const esc=s=>s.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
const isText=s=>/[A-Za-z]{2}/.test(s);
const urlFor=(route,lang)=>lang==='en'?route:`/${lang}${route}`;
const files=[];
function walk(dir){for(const e of fs.readdirSync(dir,{withFileTypes:true})){if(e.isDirectory()){if(e.name!=='404'&&!e.name.startsWith('_')&&!languages.slice(1).includes(e.name))walk(path.join(dir,e.name));}else if(e.name==='index.html')files.push(path.join(dir,e.name));}}
walk(output);
const pages=files.map(file=>({file,route:'/'+path.relative(output,path.dirname(file)).replaceAll(path.sep,'/')+'/'})).map(p=>({...p,route:p.route==='//'?'/':p.route}));
const strings=new Set();
const textualMeta=new Set(['description','og:title','og:description','og:image:alt','twitter:title','twitter:description']);
function textNodes(node,fn,skip=false){
 const skipHere=skip||['SCRIPT','STYLE','NOSCRIPT'].includes(node.tagName)||node.getAttribute?.('translate')==='no';
 if(node.nodeType===3&&!skipHere){const t=norm(node.textContent);if(isText(t)&&!/^<!doctype\b/i.test(t))fn(node,t);}
 for(const c of node.childNodes||[])textNodes(c,fn,skipHere);
}
function attributes(doc,fn){for(const e of doc.querySelectorAll('*')){
 for(const key of ['alt','aria-label','placeholder','title']){const value=e.getAttribute(key);if(value&&isText(value))fn(e,key,norm(value));}
 if(e.tagName==='META'&&textualMeta.has(e.getAttribute('name')||e.getAttribute('property'))){const v=e.getAttribute('content');if(v)fn(e,'content',norm(v));}
}}
function schemaStrings(value,fn,key=''){
 if(Array.isArray(value))return value.map(v=>schemaStrings(v,fn,key));
 if(value&&typeof value==='object')return Object.fromEntries(Object.entries(value).map(([k,v])=>[k,schemaStrings(v,fn,k)]));
 if(typeof value==='string'&&['name','headline','description','alternateName','text'].includes(key)&&isText(value))return fn(norm(value));
 return value;
}
for(const p of pages){
 const doc=parse(fs.readFileSync(p.file,'utf8'));
 textNodes(doc,(_,s)=>strings.add(s));attributes(doc,(_,__,s)=>strings.add(s));
 for(const node of doc.querySelectorAll('script[type="application/ld+json"]'))schemaStrings(JSON.parse(node.textContent),s=>{strings.add(s);return s;});
}
const directory=path.join(root,'content/translations');fs.mkdirSync(directory,{recursive:true});
if(process.argv.includes('--extract')){
 fs.writeFileSync(path.join(directory,'source.json'),JSON.stringify([...strings].sort(),null,2)+'\n');
 console.log(`Extracted ${strings.size} text fields from ${pages.length} English pages.`);process.exit(0);
}
const dictionaries=Object.fromEntries(languages.slice(1).map(lang=>[lang,JSON.parse(fs.readFileSync(path.join(directory,`${lang}.json`),'utf8'))]));
for(const lang of languages.slice(1)){const missing=[...strings].filter(s=>typeof dictionaries[lang][s]!=='string'||!dictionaries[lang][s].trim());if(missing.length)throw Error(`${lang}: ${missing.length} untranslated fields, beginning with ${missing.slice(0,3).join(' | ')}`);}
let total=0;
for(const p of pages){const source=fs.readFileSync(p.file,'utf8');for(const lang of languages){
 const doc=parse(source);
 const translate=s=>lang==='en'?s:dictionaries[lang][norm(s)]||s;
 // Static pages use native navigation and one small progressive-enhancement script.
 // Removing the English hydration payload prevents a translated page reverting on load.
 for(const script of doc.querySelectorAll('script')){const src=script.getAttribute('src')||'';const isAnalytics=src.startsWith('https://www.googletagmanager.com/gtag/js?')||script.textContent.startsWith('window.dataLayer=window.dataLayer||[];function gtag()');if(script.getAttribute('type')!=='application/ld+json'&&!isAnalytics)script.remove();}
 for(const node of doc.querySelectorAll('link[rel="preload"],link[rel="modulepreload"]'))if(node.getAttribute('as')==='script'||node.getAttribute('rel')==='modulepreload')node.remove();
 for(const node of doc.querySelectorAll('link[rel="alternate"][hreflang]'))node.remove();
 textNodes(doc,(node,s)=>{const before=node.rawText.match(/^\s*/)?.[0]||'';const after=node.rawText.match(/\s*$/)?.[0]||'';node.rawText=before+esc(translate(s))+after;});
 attributes(doc,(node,key,s)=>node.setAttribute(key,translate(s)));
 const canonical=origin+urlFor(p.route,lang);
 doc.querySelector('html').setAttribute('lang',langTag(lang));
 doc.querySelector('link[rel="canonical"]')?.setAttribute('href',canonical);
 doc.querySelector('meta[property="og:url"]')?.setAttribute('content',canonical);
 doc.querySelector('meta[property="og:locale"]')?.setAttribute('content',locale[lang]);
 doc.querySelector('[data-current-language]').set_content(short[lang]);
 const languageCopy={en:['Language','Same page, complete content'],fr:['Langue','Même page, contenu complet'],de:['Sprache','Gleiche Seite, vollständiger Inhalt'],es:['Idioma','Misma página, contenido completo'],it:['Lingua','Stessa pagina, contenuto completo'],id:['Bahasa','Halaman sama, konten lengkap'],'zh-cn':['语言','保留当前页面，内容完整']};
 doc.querySelector('.language-panel-head span').set_content(languageCopy[lang][0]);
 doc.querySelector('.language-panel-head small').set_content(languageCopy[lang][1]);
 for(const a of doc.querySelectorAll('a[href]')){
  const target=a.getAttribute('data-language');
  if(target){a.setAttribute('href',urlFor(p.route,target));if(target===lang)a.setAttribute('aria-current','page');continue;}
  const href=a.getAttribute('href');if(href.startsWith('/')&&!href.startsWith('//'))a.setAttribute('href',urlFor(href,lang));
 }
 const alternate=languages.map(l=>`<link rel="alternate" hreflang="${langTag(l)}" href="${origin+urlFor(p.route,l)}">`).join('')+`<link rel="alternate" hreflang="x-default" href="${origin+p.route}">`;
 doc.querySelector('head').insertAdjacentHTML('beforeend',alternate+'<meta name="site-release" content="2026-10-07-multilingual-15-guides">');
 for(const node of doc.querySelectorAll('script[type="application/ld+json"]')){
  let data=schemaStrings(JSON.parse(node.textContent),translate);
  function urls(v,key=''){if(Array.isArray(v))return v.map(x=>urls(x,key));if(v&&typeof v==='object')return Object.fromEntries(Object.entries(v).map(([k,x])=>[k,urls(x,k)]));if(key==='inLanguage')return langTag(lang);if(typeof v==='string'&&v.startsWith(origin)&&['url','@id','item'].includes(key)){const u=new URL(v);if(!/\.[a-z0-9]+$/i.test(u.pathname))return origin+urlFor(u.pathname,lang)+u.search+u.hash;}return v;}
  data=urls(data);node.set_content(JSON.stringify(data).replaceAll('<','\\u003c'));
 }
 doc.querySelector('body').insertAdjacentHTML('beforeend','<script src="/site-interactions.js" defer></script>');
 const dest=path.join(output,urlFor(p.route,lang),'index.html');fs.mkdirSync(path.dirname(dest),{recursive:true});fs.writeFileSync(dest,doc.toString());total++;
}}
const entries=[];for(const p of pages)for(const lang of languages){const alternatives=languages.map(l=>`<xhtml:link rel="alternate" hreflang="${langTag(l)}" href="${origin+urlFor(p.route,l)}"/>`).join('');entries.push(`<url><loc>${origin+urlFor(p.route,lang)}</loc><lastmod>2026-10-07</lastmod>${alternatives}<xhtml:link rel="alternate" hreflang="x-default" href="${origin+p.route}"/></url>`);}
fs.writeFileSync(path.join(output,'sitemap.xml'),`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">${entries.join('')}</urlset>`);
fs.writeFileSync(path.join(output,'_deployment.txt'),`2026-10-07-multilingual-15-guides\n${total} pages; ${languages.join(', ')}\n`);
console.log(`Published ${total} complete static pages in ${languages.length} languages.`);
