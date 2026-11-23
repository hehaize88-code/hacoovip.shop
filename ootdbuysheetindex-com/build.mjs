import fs from 'node:fs'
import {compileFunction} from 'node:vm'
const read=file=>fs.readFileSync(new URL(file,import.meta.url),'utf8')
const inject=(name,value)=>'const '+name+'='+JSON.stringify(value)+';\n'
const strippedSource=file=>read(file).replace(/^import .*\n/gm,'').replace(/\bexport (?=const |let |async function |function )/g,'')
// Capture browser code before Wrangler transforms Worker functions. Only
// declarations are hoisted; no Worker initialization runs during extraction.
const clientModules = {
  visualClient: 'visual.mjs',
  bindProduct: 'product.mjs',
  bindLanguagePicker: 'app.mjs',
  moneyScript: 'money.mjs'
}
const clientScripts = Object.entries(clientModules).map(([name, file]) => {
  const declarations = strippedSource(file).replace(/^export default .*$/gm, '')
  const getClient = compileFunction('return ' + name + ';\n' + declarations)
  return [name + '.toString()', JSON.stringify(getClient().toString())]
})
function moduleSource(file) {
  let source = strippedSource(file)
  for (const [expression, literal] of clientScripts) {
    source = source.replaceAll(expression, () => literal)
  }
  return source
}
function wrap(files,bindings){
 const list=bindings.join(',')
 return 'const {'+list+'}=(()=>{\n'+files.map(moduleSource).join('\n')+'\nreturn {'+list+'};})();\n'
}
const worker=[
 inject('css',['theme.css','product.css','visual.css'].map(read).join('\n')),
 inject('brandAssets',Object.fromEntries(['logo.png','favicon.ico'].map(name=>[name,fs.readFileSync('brand/'+name).toString('base64')]))),
 inject('seed',JSON.parse(read('rates-seed.json'))),
 wrap(['money.mjs'],['currencies','priceTag','moneyScript','ratesResponse']),
 wrap(['locale-west.mjs'],['westCopy']),
 wrap(['locale-east.mjs'],['eastCopy']),
 wrap(['catalog-locales.mjs','i18n.mjs'],['languages','copy','pageNames','localName','localOption','sourceQuery']),
 wrap(['source.mjs'],['catalog','detail','sellerData']),
 wrap(['product.mjs'],['productView']),
 wrap(['visual-data.mjs','visual.mjs'],['visualView','visualApi','imageNames']),
 moduleSource('app.mjs')
]
fs.mkdirSync('dist/server',{recursive:true})
fs.writeFileSync('dist/server/index.js',worker.join('\n'))