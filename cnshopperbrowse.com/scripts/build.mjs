import fs from 'node:fs';
import {gunzipSync,gzipSync} from 'node:zlib';
const packed=fs.readdirSync('catalog').filter(n=>n.endsWith('.gz.b64')).sort().map(n=>fs.readFileSync('catalog/'+n,'utf8')).join('');
const data=gunzipSync(Buffer.from(packed,'base64')).toString();
const {SOURCE_INDEX,FEATURES,INDEX_META}=await import('data:text/javascript;base64,'+Buffer.from(data).toString('base64'));
fs.rmSync('dist',{recursive:true,force:true});fs.mkdirSync('dist/data',{recursive:true});
fs.writeFileSync('dist/data/image-index.json',JSON.stringify({meta:INDEX_META,products:SOURCE_INDEX.map(p=>({path:p.path,id:p.id,name:p.name,img:p.img,price:p.price,currency:p.currency,category:p.category})),images:FEATURES}));
let code=fs.readFileSync('worker/index.js','utf8').replace("import { PAGE } from './page.js';",'const PAGE = '+JSON.stringify(fs.readFileSync('worker/page.html','utf8'))+';');
code=code.replace("import { SOURCE_INDEX, FEATURES, INDEX_META } from './data.js';",'const SOURCE_INDEX='+JSON.stringify(SOURCE_INDEX)+';const INDEX_META='+JSON.stringify(INDEX_META)+';');
code=code.replace("import { variants, allowedImage, agentLinks } from './commerce.js';",fs.readFileSync('worker/commerce.js','utf8').replaceAll('export async function ','async function ').replaceAll('export function ','function '));
fs.writeFileSync('dist/_worker.js',code);
fs.writeFileSync('dist/_routes.json',JSON.stringify({version:1,include:['/*'],exclude:['/data/*']}));
fs.writeFileSync('dist/index.html','<!DOCTYPE html><title>CNShopper</title>');
console.log(JSON.stringify({products:SOURCE_INDEX.length,images:FEATURES.length,workerGzipBytes:gzipSync(code).length}));

import {attachEditorial} from '../../shopping-editorial/build.mjs';
attachEditorial('dist/_worker.js');
