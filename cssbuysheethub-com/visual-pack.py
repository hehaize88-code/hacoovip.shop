"""Pack cnfanshp product-image descriptors and matched Weidian variants into an ES module.

python visual-pack.py cnfanshp-image-index.json cache-directory visual-data.mjs
Only derived comparison data, document IDs and source URLs are shipped.
"""
import base64, collections, hashlib, json, math, re, struct, sys
from pathlib import Path
source=json.loads(Path(sys.argv[1]).read_text())
assert source['meta']['source'].rstrip('/')=='https://cnfanshp.com'
cache=Path(sys.argv[2]); target=Path(sys.argv[3])
products=source['products']
ids=[int(Path(p['path']).stem) for p in products]
names={i:p['name'] for i,p in zip(ids,products)}
market=collections.defaultdict(list)
for i,p in zip(ids,products):
    if p.get('id'):market[str(p['id'])].append(i)
lookup={}
for row in source['images']:
    assert row['url'].startswith(('/uploads/','/media/'))
    lookup[row['url']]=(row,[ids[i] for i in row['products']])
origin_count=len(lookup)
extras=collections.defaultdict(set); checked={}
for seller in sorted((cache/'sellers').glob('*')):
    if seller.name in market:
        urls=json.loads(seller.read_text());checked[seller.name]=set(urls)
        for url in urls:
            extras[url].update(market[seller.name])
for url,owners in extras.items():
    file=cache/'hashes'/hashlib.sha256(url.encode()).hexdigest()
    if file.exists():
        lookup[url]=(json.loads(file.read_text()),sorted(owners))
complete={mid for mid,urls in checked.items() if all(url in lookup for url in urls)}
pending={mid:owners for mid,owners in market.items() if mid not in complete}
out=bytearray(); references=[]
for url,(row,owners) in lookup.items():
    rgb=row['c'];colors=[]
    for y in [0,2]:
        for x in [0,2]:
            for ch in range(3):colors.append(round(sum(rgb[((y+a)*4+x+b)*3+ch] for a in range(2) for b in range(2))/4))
    out.extend(bytes.fromhex(row['p']+row['h'])+bytes(colors)+struct.pack('b',max(-127,min(127,round(math.log(row['a'])*32)))))
    references.append([url,*owners])
meta=dict(sourceImages=origin_count,sourceProducts=len(set(ids)),sellerImages=len(lookup)-origin_count,sellerDiscovered=len(extras),sellerChecked=len([p for p in (cache/'sellers').glob('*') if p.name in market]),sellerTotal=len(market),sellerComplete=len(complete),searchableSourceProducts=len({ids[k] for photo in source['images'] for k in photo['products']}))
enc=lambda x:json.dumps(x,separators=(',',':'),ensure_ascii=False)
tmp=target.with_suffix('.tmp')
with tmp.open('w') as f:
    for k,v in [('imageMeta',meta),('imageNames',names),('pendingSellers',pending),('imageReferences',references),('imageSignatures',base64.b64encode(out).decode())]:
        f.write('export const '+k+'='+enc(v)+';\n')
tmp.replace(target)
print(json.dumps(meta))
