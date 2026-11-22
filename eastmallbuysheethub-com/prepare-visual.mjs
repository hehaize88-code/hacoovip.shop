import fs from 'node:fs'
import {imageNames,imageReferences,imageSignatures} from './catalog-fingerprints.mjs'
const raw=Buffer.from(imageSignatures,'base64')
const photos=[], signatures=[]
for(const [i,ref] of imageReferences.entries()){
 if(!/^\/(uploads|media)\//.test(ref[0]))continue
 photos.push(ref)
 signatures.push(raw.subarray(i*29,i*29+29))
}
const sourceProducts=Object.keys(imageNames).length
const searchableSourceProducts=new Set(photos.flatMap(row=>row.slice(1))).size
const data={imageMeta:{sourceImages:photos.length,sourceProducts,searchableSourceProducts,sellerImages:0},imageNames,pendingSellers:{},imageReferences:photos,imageSignatures:Buffer.concat(signatures).toString('base64')}
fs.writeFileSync('visual-data.mjs',Object.entries(data).map(([k,v])=>'export const '+k+'='+JSON.stringify(v)+';\n').join(''))
