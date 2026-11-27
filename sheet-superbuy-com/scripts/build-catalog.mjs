import fs from 'node:fs'
import {gunzipSync} from 'node:zlib'
import {fileURLToPath} from 'node:url'
const root=new URL('../',import.meta.url)
const shared=new URL('../eastmallbuysheethub-com/',root)
const read=(file,base=shared)=>fs.readFileSync(new URL(file,base),'utf8')
function bundle(names, exports, base=shared){
 const body=names.map(n=>read(n,base).replace(/^import .*$/gm,'').replace(/^export /gm,'')).join('\n')
 return 'const {'+exports+'}=(()=>{'+body+'\nreturn {'+exports+'}})();'
}
const css=read('theme.css')+read('visual.css')+'.wrap .process-section,.wrap .latest-guides,.wrap .faq-preview{margin:3rem auto;max-width:70rem}.article-grid,.process-list{display:grid;grid-template-columns:repeat(auto-fit,minmax(230px,1fr));gap:1rem}.article-card,.process-list article,.faq-list details{background:white;border:1px solid #dedfd6;padding:1rem;border-radius:10px}.article-card h2{font-size:1.15rem}.faq-list summary{cursor:pointer;font-weight:600}.faq-list summary span{float:right}.process-list article>span,.plain.eyebrow{display:none}.article-card a,.process-intro a{color:#20477c;text-decoration:underline}header .brand img{width:148px;height:auto}.cardset{min-width:0}.qc{display:block;padding:.45rem}.sort{margin:.6rem 0}.search .camera{font-size:1.3rem}.actions select{max-width:9rem}.catalog-menu{display:flex;gap:1rem;flex-wrap:wrap}'
// Resolve market IDs from the same source catalog used by the live feed.
const packs=new URL('../cnshopperbrowse.com/catalog/',root)
const archive=fs.readdirSync(packs).filter(n=>n.endsWith('.gz.b64')).sort().map(n=>read(n,packs)).join('')
const source=gunzipSync(Buffer.from(archive,'base64')).toString('base64')
const {SOURCE_INDEX}=await import('data:text/javascript;base64,'+source)
const records=SOURCE_INDEX.map(p=>[p.path.match(/(\d+)\.html$/)[1],p.id,p.name,p.price,p.img])
const generated=[
 'const records='+JSON.stringify(records)+';',
 'const css='+JSON.stringify(css)+';const seed='+read('rates-seed.json')+';',
 bundle(['money.mjs'],'currencies,ratesResponse,priceTag,moneyScript'),
 bundle(['locale-west.mjs'],'westCopy'),bundle(['locale-east.mjs'],'eastCopy'),
 bundle(['catalog-locales.mjs','i18n.mjs'],'languages,copy,localName,sourceQuery').replace(/EastMallBuy/gi,'Superbuy'),
 bundle(['source.mjs'],'read,parseCards,categoriesFrom,defaultList,detail'),
 bundle(['visual-data.mjs'],'imageMeta,imageNames,imageReferences,imageSignatures,pendingSellers',new URL('../fansbuysheetindex-com/',root)),
 bundle(['visual.mjs'],'visualView,visualApi'),
 read('scripts/catalog-worker.mjs',root)
].join('\n')
 // Capture browser functions before the deployment bundler instruments Worker functions.
 .replace('visualClient.toString()',()=>JSON.stringify(read('visual.mjs').split('function visualClient(){')[1].split('\nconst scanLabels=')[0].replace(/^/,'function visualClient(){').trim()))
 .replace('moneyScript.toString()',()=>JSON.stringify(read('money.mjs').slice(read('money.mjs').indexOf('function moneyScript(){')).trim()))
const out=new URL('out/',root)
fs.mkdirSync(out,{recursive:true})
fs.writeFileSync(fileURLToPath(new URL('_worker.js',out)),generated)
