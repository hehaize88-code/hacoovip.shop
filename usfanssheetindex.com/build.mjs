import fs from 'node:fs'
import * as browserScripts from './browser-scripts.mjs'
const read=file=>fs.readFileSync(new URL(file,import.meta.url),'utf8')
const inject=(name,value)=>'const '+name+'='+JSON.stringify(value)+';\n'
const moduleSource=file=>read(file).replace(/^import .*\n/gm,'').replace(/\bexport (?=const |let |async function |function )/g,'')
function wrap(files,bindings){
 const list=bindings.join(',')
 return 'const {'+list+'}=(()=>{\n'+files.map(moduleSource).join('\n')+'\nreturn {'+list+'};})();\n'
}
// Capture client code before the hosting bundler transforms the Worker.
const worker=[
 ...Object.entries(browserScripts).map(([name,fn])=>inject(name+'Source',fn.toString())),
 inject('css',['theme.css','product.css','visual.css'].map(read).join('\n')),
 inject('seed',JSON.parse(read('rates-seed.json'))),
 wrap(['money.mjs'],['currencies','ratesResponse','priceTag']),
 inject('favicon',fs.readFileSync('brand/favicon.png').toString('base64')),
 inject('brandLogo',fs.readFileSync('brand/logo.webp').toString('base64')),
 wrap(['locale-west.mjs'],['westCopy']),
 wrap(['locale-east.mjs'],['eastCopy']),
 wrap(['catalog-locales.mjs','i18n.mjs'],['languages','copy','pageNames','localName','localOption','sourceQuery']),
 wrap(['source.mjs'],['catalog','detail']),
 wrap(['product.mjs'],['productView']),
 wrap(['visual-data.mjs','visual.mjs'],['visualView','visualApi','imageNames']),
 moduleSource('app.mjs')
]
fs.mkdirSync('dist/server',{recursive:true})
fs.writeFileSync('dist/server/index.js',worker.join('\n'))
