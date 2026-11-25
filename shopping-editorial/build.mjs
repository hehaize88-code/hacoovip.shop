import fs from 'node:fs';
import path from 'node:path';
import {createHash} from 'node:crypto';
export function attachEditorial(worker,root='.'){
 const read=(file)=>fs.readFileSync(path.join(root,file),'utf8');
 const source=fs.readFileSync(worker,'utf8');
 const engine=fs.readFileSync(new URL('./worker.mjs',import.meta.url),'utf8').replace('export function withEditorial','function withEditorial');
 const config=JSON.parse(read('editorial-config.json'));
 const content=read('editorial-content.json');
 const locales=read('editorial-locales.json');
 config.revision=createHash('sha256').update(content).digest('hex').slice(0,16);
 if(!/export default\s*\{/.test(source))throw Error('Cannot locate the original Worker entry point');
 const combined=source.replace(/export default\s*\{/,'const originalEditorialSite = {')+
 '\nexport default (()=>{\n'+engine+'\nreturn withEditorial(originalEditorialSite,'+JSON.stringify(config)+','+content+','+locales+');})();\n';
 fs.writeFileSync(worker,combined);
}
