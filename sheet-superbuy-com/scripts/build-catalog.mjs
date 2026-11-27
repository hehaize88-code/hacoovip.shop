import fs from 'node:fs'
import {fileURLToPath} from 'node:url'
const root=new URL('../',import.meta.url)
const shared=new URL('../eastmallbuysheethub-com/',root)
const read=(file,base=shared)=>fs.readFileSync(new URL(file,base),'utf8')
function bundle(names, exports, base=shared){
 const body=names.map(n=>read(n,base).replace(/^import .*$/gm,'').replace(/^export /gm,'')).join('\n')
 return 'const {'+exports+'}=(()=>{'+body+'\nreturn {'+exports+'}})();'
}
const css=read('theme.css')+read('visual.css')+'header .brand img{width:148px;height:auto}.cardset{min-width:0}.qc{display:block;padding:.45rem}.sort{margin:.6rem 0}.search .camera{font-size:1.3rem}.actions select{max-width:9rem}.catalog-menu{display:flex;gap:1rem;flex-wrap:wrap}'
const generated=[
 'const css='+JSON.stringify(css)+';const seed='+read('rates-seed.json')+';',
 bundle(['money.mjs'],'currencies,ratesResponse,priceTag,moneyScript'),
 bundle(['locale-west.mjs'],'westCopy'),bundle(['locale-east.mjs'],'eastCopy'),
 bundle(['catalog-locales.mjs','i18n.mjs'],'languages,copy,localName,sourceQuery').replace(/EastMallBuy/gi,'Superbuy'),
 bundle(['source.mjs'],'read,parseCards,categoriesFrom,defaultList,detail'),
 bundle(['visual-data.mjs'],'imageMeta,imageNames,imageReferences,imageSignatures,pendingSellers',new URL('../fansbuysheetindex-com/',root)),
 bundle(['visual.mjs'],'visualView,visualApi'),
 read('scripts/catalog-worker.mjs',root)
].join('\n')
const out=new URL('out/',root)
fs.mkdirSync(out,{recursive:true})
fs.writeFileSync(fileURLToPath(new URL('_worker.js',out)),generated)
