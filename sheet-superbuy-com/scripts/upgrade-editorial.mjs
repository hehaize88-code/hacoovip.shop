import fs from 'node:fs'
import path from 'node:path'
import {parse} from 'node-html-parser'
const root=path.resolve('out')
const official='https://cdn.superbuy.com/starit-superbuy/dist/img/'
const register='https://www.superbuy.com/en/page/register/'
const labels={en:'Register',fr:'Inscription',de:'Registrieren',es:'Registrarse',it:'Registrati',id:'Daftar','zh-cn':'注册'}
function visit(dir){
 for(const entry of fs.readdirSync(dir,{withFileTypes:true})){
  const target=path.join(dir,entry.name)
  if(entry.isDirectory()){if(!entry.name.startsWith('_'))visit(target);continue}
  if(entry.name!=='index.html')continue
  const dom=parse(fs.readFileSync(target,'utf8'))
  const lang=(dom.querySelector('html')?.getAttribute('lang')||'en').toLowerCase()
  const base=lang==='en'?'/':'/'+lang+'/'
  for(const a of dom.querySelectorAll('a[href]')){
   const href=a.getAttribute('href')
   if(!/^https?:\/\/(?:www\.)?cnfanshp\.com\//i.test(href))continue
   if(a.classList.contains('nav-cta')||a.parentNode?.getAttribute?.('aria-label')==='Mobile navigation'){
    a.setAttribute('href',register);a.set_content(labels[lang]||labels.en)
   }else{
    const item=href.match(/\/AllProducts\/(\d+)\.html/i)
    a.setAttribute('href',item?base+'product/'+item[1]+'/':base+'spreadsheet/')
   }
  }
  for(const img of dom.querySelectorAll('a.brand img'))img.setAttribute('src',official+'homepage-v2/brand/logo-artwork.svg')
  for(const link of dom.querySelectorAll('link[rel]'))if(link.getAttribute('rel').split(' ').includes('icon'))link.setAttribute('href',official+'favicon/favicon.svg')
  for(const form of dom.querySelectorAll('form[role="search"]')){
   form.setAttribute('action',base+'spreadsheet/');form.removeAttribute('target')
   const input=form.querySelector('input[name="keywords"]');input?.setAttribute('name','q')
   form.querySelector('input[name="channelid"]')?.remove()
   form.insertAdjacentHTML('beforeend','<a href="'+base+'image-search/" aria-label="Image search">📷</a>')
  }
  fs.writeFileSync(target,dom.toString())
 }
}
visit(root)
const file=path.join(root,'site-interactions.js')
if(fs.existsSync(file))fs.writeFileSync(file,fs.readFileSync(file,'utf8').replace('[name="keywords"]','[name="q"]'))
const sitemap=path.join(root,'sitemap.xml')
const xml=fs.readFileSync(sitemap,'utf8'), additions=[]
const origin='https://sheet-superbuy.com'
for(const language of 'en de fr es it nl pt pl ro sv zh-cn da fi el cs hu bg sk hr ja ko vi th id'.split(' ')){
 const base=language==='en'?'/':'/'+language+'/'
 for(const suffix of ['','spreadsheet/','image-search/']){
  const loc=origin+base+suffix
  if(!xml.includes('<loc>'+loc+'</loc>'))additions.push('<url><loc>'+loc+'</loc></url>')
 }
}
fs.writeFileSync(sitemap,xml.replace('</urlset>',additions.join('')+'</urlset>'))
