import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import { parse } from 'node-html-parser';
const root=path.resolve(process.argv[2]||'out');
const langs=['en','fr','de','es','it','id','zh-cn'];
const origin='https://sheet-superbuy.com';
const files=[];
function walk(dir){for(const f of fs.readdirSync(dir,{withFileTypes:true})){if(f.isDirectory()&&!['_next','_not-found','404'].includes(f.name))walk(path.join(dir,f.name));else if(f.name==='index.html')files.push(path.join(dir,f.name));}}
walk(root);
let links=0;
for(const file of files){
 const html=fs.readFileSync(file,'utf8');const doc=parse(html);
 assert(/^<!doctype html>/i.test(html),`${file}: missing HTML doctype`);
 const pathname='/'+path.relative(root,path.dirname(file)).replaceAll(path.sep,'/');const route=pathname==='/'?'/':pathname+'/';
 const lang=langs.slice(1).find(l=>route.startsWith('/'+l+'/'))||'en';const canonical=origin+route;
 assert.equal(doc.querySelector('html').getAttribute('lang'),lang==='zh-cn'?'zh-CN':lang,file);
 assert.equal(doc.querySelectorAll('h1').length,1,file);
 assert.equal(doc.querySelector('link[rel="canonical"]').getAttribute('href'),canonical,file);
 assert.equal(doc.querySelectorAll('link[rel="alternate"][hreflang]').length,8,file);
 assert(!html.includes('self.__next_f')&&!html.includes('translate.google.com'),file);
 assert(doc.querySelector('meta[name="robots"]').getAttribute('content').includes('index'),file);
 for(const n of doc.querySelectorAll('script[type="application/ld+json"]'))JSON.parse(n.textContent);
 for(const a of doc.querySelectorAll('a[href]')){
  const href=a.getAttribute('href');if(href.startsWith('/')&&!href.startsWith('//')){
   const url=new URL(href,origin);const target=path.join(root,url.pathname,url.pathname.endsWith('/')?'index.html':'');
   assert(fs.existsSync(target),`${file}: missing ${href}`);links++;
   if(!a.hasAttribute('data-language')&&lang!=='en')assert(url.pathname.startsWith(`/${lang}/`),`${file}: lost language ${href}`);
  }else if(href.startsWith('http'))assert(['cnfanshp.com','www.cnfanshp.com','sheet-superbuy.com'].includes(new URL(href).hostname),`${file}: unexpected outbound destination ${href}`);
 }
 if(route.endsWith('/articles/'))assert.equal(doc.querySelectorAll('.article-card').length,15,file);
 if(route.includes('/articles/')&&!route.endsWith('/articles/')){
   const h2=doc.querySelectorAll('.article-body h2');assert(h2.length>=5,file);
   if(lang!=='en'){
    const base=route.replace(`/${lang}/`,'/');const english=parse(fs.readFileSync(path.join(root,base,'index.html'),'utf8'));
    assert.equal(doc.querySelectorAll('.article-body section').length,english.querySelectorAll('.article-body section').length,file);
    assert.equal(doc.querySelectorAll('.article-body p').length,english.querySelectorAll('.article-body p').length,file);
    assert.notEqual(doc.querySelector('h1').textContent,english.querySelector('h1').textContent,file);
   }
 }
}
assert.equal(files.length,154);
assert.equal((fs.readFileSync(path.join(root,'sitemap.xml'),'utf8').match(/<loc>/g)||[]).length,154);
console.log(`PASS: ${files.length} pages; 15 articles × 7 languages; ${links} internal links; canonical, hreflang and paragraph parity.`);
