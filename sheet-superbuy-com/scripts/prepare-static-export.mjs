import fs from 'node:fs';
import path from 'node:path';
// A retained Next export cache can omit newly added dynamic article routes.
// Clear only reproducible build directories before producing the full locale set.
const root=process.cwd();
const manifest=JSON.parse(fs.readFileSync(path.join(root,'package.json'),'utf8'));
if(manifest.name!=='sheet-superbuy')throw new Error('Run from the Sheet Superbuy project root.');
for(const directory of ['.next','out'])fs.rmSync(path.join(root,directory),{recursive:true,force:true});
