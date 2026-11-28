import fs from 'node:fs'
import * as browserScripts from './browser-scripts.mjs'
import {imageReferences} from './visual-data.mjs'
const read=file=>fs.readFileSync(new URL(file,import.meta.url),'utf8')
const inject=(name,value)=>'const '+name+'='+JSON.stringify(value)+';\n'
const moduleSource=file=>read(file).replace(/^import .*\n/gm,'').replace(/\bexport (?=const |let |async function |function )/g,'')
function wrap(files,bindings){
 const list=bindings.join(',')
 return 'const {'+list+'}=(()=>{\n'+files.map(moduleSource).join('\n')+'\nreturn {'+list+'};})();\n'
}
// Preserve browser code before the Worker bundler adds runtime-only helpers.
const worker=[
 ...Object.entries(browserScripts).map(([name,fn])=>inject(name+'Source',fn.toString())),
 inject('css',['theme.css','product.css','visual.css'].map(read).join('\n')),
 inject('brandAssets',Object.fromEntries(['logo.png','favicon.png'].map(name=>[name,fs.readFileSync(new URL('./brand/'+name,import.meta.url)).toString('base64')]))),
 inject('seed',JSON.parse(read('rates-seed.json'))),
 wrap(['money.mjs'],['currencies','ratesResponse','priceTag']),
 wrap(['locale-west.mjs'],['westCopy']),
 wrap(['locale-east.mjs'],['eastCopy']),
 wrap(['catalog-locales.mjs','i18n.mjs'],['languages','copy','pageNames','localName','localOption','sourceQuery']),
 wrap(['source.mjs'],['catalog','detail']),
 wrap(['product.mjs'],['productView']),
 wrap(['visual-data.mjs','visual.mjs'],['visualView','visualApi']),
 moduleSource('app.mjs').replace('export default {fetch:render}', ''),
 inject('catalogProductIds',[...new Set(imageReferences.flatMap(row=>row.slice(1)))].sort((a,b)=>a-b)),
 read('production.mjs'),
 'export default {fetch:render}'
]
fs.mkdirSync('dist/server',{recursive:true})
fs.writeFileSync('dist/server/index.js',worker.join('\n'))
