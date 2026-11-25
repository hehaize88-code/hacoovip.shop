import fs from 'node:fs'
const read=file=>fs.readFileSync(new URL(file,import.meta.url),'utf8')
const inject=(name,value)=>'const '+name+'='+JSON.stringify(value)+';\n'
const moduleSource=file=>read(file).replace(/^import .*\n/gm,'').replace(/\bexport (?=const |let |async function |function )/g,'')
function wrap(files,bindings){
 const list=bindings.join(',')
 return 'const {'+list+'}=(()=>{\n'+files.map(moduleSource).join('\n')+'\nreturn {'+list+'};})();\n'
}
const worker=[
 inject('sitemapIds', JSON.parse(read('sitemap-ids.json'))),
 inject('brandAssets',Object.fromEntries(['logo.png','favicon.ico'].map(name=>[name,fs.readFileSync('brand/'+name).toString('base64')]))),
 inject('seed',JSON.parse(read('rates-seed.json'))),
 wrap(['money.mjs'],['currencies','ratesResponse','priceTag','moneyScript']),
 inject('css',['theme.css','product.css','visual.css'].map(read).join('\n')),
 wrap(['locale-west.mjs'],['westCopy']),
 wrap(['locale-east.mjs'],['eastCopy']),
 wrap(['catalog-locales.mjs','i18n.mjs'],['languages','copy','pageNames','localName','localOption','sourceQuery']),
 wrap(['source.mjs'],['catalog','detail','productMapIds']),
 wrap(['product.mjs'],['productView']),
 wrap(['visual-data.mjs','visual.mjs'],['visualView','visualApi']),
 moduleSource('app.mjs')
]
fs.mkdirSync('dist/server',{recursive:true})
fs.writeFileSync('dist/server/index.js',worker.join('\n'))
import {attachEditorial} from '../shopping-editorial/build.mjs';
attachEditorial('dist/server/index.js');
