import {cp,readFile,access} from 'node:fs/promises';
import {dirname,join} from 'node:path';
import {fileURLToPath} from 'node:url';
const root=dirname(dirname(fileURLToPath(import.meta.url)));
const output=join(root,'static-export');
const sitemap=await readFile(join(output,'sitemap.xml'),'utf8');
const paths=[...sitemap.matchAll(/<loc>https:\/\/superbuys\.pro([^<]*)<\/loc>/g)].map(m=>m[1]);
if(paths.length<330)throw new Error('Incomplete export; refusing to replace published pages.');
for(const path of paths)await access(join(output,path,'index.html'));
// Copy the completed export without touching source or sibling sites.
await cp(output,root,{recursive:true});
console.log(`Synced ${paths.length} routes into superbuys-pro only.`);
