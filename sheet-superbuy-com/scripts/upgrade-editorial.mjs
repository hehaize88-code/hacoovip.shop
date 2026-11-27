import fs from 'node:fs'
import path from 'node:path'
import {parse} from 'node-html-parser'
import {copy} from '../../eastmallbuysheethub-com/i18n.mjs'
const root=path.resolve('out')
const official='https://cdn.superbuy.com/starit-superbuy/dist/img/'
const register='https://www.superbuy.com/en/page/register/'
const labels={nl:'Registreren',pt:'Cadastrar-se',pl:'Zarejestruj się',ro:'Înregistrare',sv:'Registrera dig',da:'Tilmeld dig',fi:'Rekisteröidy',el:'Εγγραφή',cs:'Registrace',hu:'Regisztráció',bg:'Регистрация',sk:'Registrácia',hr:'Registracija',ja:'新規登録',ko:'회원가입',vi:'Đăng ký',th:'สมัครสมาชิก',en:'Register',fr:'Inscription',de:'Registrieren',es:'Registrarse',it:'Registrati',id:'Daftar','zh-cn':'注册'}
function visit(dir){
 for(const entry of fs.readdirSync(dir,{withFileTypes:true})){
  const target=path.join(dir,entry.name)
  if(entry.isDirectory()){if(!entry.name.startsWith('_'))visit(target);continue}
  if(entry.name!=='index.html')continue
  const dom=parse(fs.readFileSync(target,'utf8'))
  const lang=(dom.querySelector('html')?.getAttribute('lang')||'en').toLowerCase()
  const base=lang==='en'?'/':'/'+lang+'/'
  const words=copy[lang==='zh-cn'?'zh-CN':lang]||copy.en
  const picker=dom.querySelector('.language-switcher')
  if(picker){
   picker.querySelector('summary span')?.set_content(words.language)
   picker.querySelector('.language-panel-head span')?.set_content(words.language)
   const display=new Intl.DisplayNames([lang],{type:'language'})
   for(const option of picker.querySelectorAll('a[data-language]')){
    const code=option.getAttribute('data-language')
    const name=option.querySelector('strong')
    if(!name||code===lang)continue
    const local=display.of(code),native=name.textContent
    if(local.toLocaleLowerCase(lang)!==native.toLocaleLowerCase(lang))name.set_content(local+' · '+native)
   }
  }
  for(const a of dom.querySelectorAll('a[href]')){
   const href=a.getAttribute('href')
   if(!/^https?:\/\/(?:www\.)?cnfanshp\.com\//i.test(href))continue
   if(a.classList.contains('nav-cta')||a.parentNode?.parentNode?.classList?.contains('mobile-menu')){
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
   form.insertAdjacentHTML('beforeend','<a href="'+base+'image-search/" aria-label="'+words.imgSearch+'">📷</a>')
  }
  if(path.relative(root,target)===(lang==='en'?'index.html':lang+'/index.html')){
   const sections=['.process-section','.latest-guides','.faq-preview'].map(selector=>dom.querySelector(selector)?.toString()||'').join('')
   const dest=path.join(root,'home-guides')
   fs.mkdirSync(dest,{recursive:true})
   fs.writeFileSync(path.join(dest,lang+'.json'),JSON.stringify({sections}))
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
