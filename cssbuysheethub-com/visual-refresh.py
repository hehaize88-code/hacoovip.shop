"""Refresh seller gallery and SKU fingerprints from the catalog's matched Weidian IDs.

Usage: python visual-refresh.py cnfanshp-image-index.json /path/to/cache
Saves only seller image URLs and search descriptors. Resume using the same cache.
"""
import concurrent.futures as futures
import hashlib
import html
import io
import json
import os
import re
import sys
import threading
from pathlib import Path
from urllib.parse import urlparse
import httpx
import numpy as np
from PIL import Image, ImageOps

data = json.loads(Path(sys.argv[1]).read_text())
assert data['meta']['source'].rstrip('/') == 'https://cnfanshp.com'
cache = Path(sys.argv[2])
for kind in ['sellers','hashes']:
    (cache/kind).mkdir(exist_ok=True, parents=True)
http = httpx.Client(headers={'User-Agent':'Mozilla/5.0'},proxy=os.environ.get('https_proxy'),trust_env=False,timeout=12, follow_redirects=True,limits=httpx.Limits(max_connections=14,max_keepalive_connections=12))
basis = np.cos(np.pi*(2*np.arange(32)+1)*np.arange(8)[:,None]/64)

def seller(item):
    out = cache/'sellers'/item
    if out.exists(): return json.loads(out.read_text())
    r=http.get('https://weidian.com/item.html?itemID='+item)
    r.raise_for_status()
    body=r.text
    tag = re.search(r'<script\b[^>]*\bid="__rocker-render-inject__"[^>]*>',body)[0]
    model = json.loads(html.unescape(re.search('data-obj="([^"]+)',tag)[1]))['result']['default_model']
    info=model['item_info']
    assert str(info['item_id'])==item
    media={}
    def put(url,kind):
        if isinstance(url,dict):url=url.get('img') or url.get('url')
        if not isinstance(url,str):return
        p=urlparse(url)
        if p.scheme=='https' and (p.hostname=='geilicdn.com' or (p.hostname or '').endswith('.geilicdn.com')):media[url]=kind
    for u in info.get('imgs') or []:put(u,'gallery')
    opts=model.get('sku_properties') or {}
    for g in opts.get('attr_list') or []:
        for v in g.get('attr_values') or []:put(v.get('img'),'style')
    skus=opts.get('sku') or {}
    for s in (skus.values() if isinstance(skus,dict) else skus):put(s.get('img'),'style')
    out.write_text(json.dumps(media))
    return media

def bits(arr):
    return np.packbits(np.asarray(arr).flatten()).tobytes().hex()

def signature(url):
    dest=cache/'hashes'/hashlib.sha256(url.encode()).hexdigest()
    if dest.exists(): return
    r=http.get(url,params={'w':'128','h':'128'} if '?' not in url else None)
    r.raise_for_status()
    im=ImageOps.exif_transpose(Image.open(io.BytesIO(r.content))).convert('RGB')
    gray=im.convert('L');bil=Image.Resampling.BILINEAR
    coeff=(basis@np.array(gray.resize((32,32),bil),float)@basis.T).flatten()
    g=np.asarray(gray.resize((9,8),bil))
    dest.write_text(json.dumps({'url':url,'p':bits(coeff>np.median(coeff[1:])),'h':bits(g[:,1:]>g[:,:-1]),'c':np.asarray(im.resize((4,4),bil)).flatten().tolist(),'a':round(im.width/im.height,3)}))

if __name__=='__main__':
    preferred={'7755101935','7817364645','7757914530','7721490300','7765148600'}
    def order(p):
        return (p.get('id') not in preferred,-int(Path(p['path']).stem))
    ids=list(dict.fromkeys(str(p['id']) for p in sorted(data['products'],key=order) if str(p.get('id','')).isdigit()))
    scheduled=set(); errors=0
    with futures.ThreadPoolExecutor(5) as shops, futures.ThreadPoolExecutor(9) as pictures:
        # Queue a bounded number of seller reads and image downloads.
        pexec={}; sexec={}; it=iter(ids)
        while True:
            while len(sexec)<5 and len(pexec)<130:
                item=next(it,None)
                if item is None:break
                sexec[shops.submit(seller,item)]=item
            jobs=set(pexec)|set(sexec)
            if not jobs:break
            done,_=futures.wait(jobs,return_when=futures.FIRST_COMPLETED)
            for job in done:
                if job in pexec:
                    del pexec[job]
                    try:job.result()
                    except Exception:errors+=1
                else:
                    item=sexec.pop(job)
                    try: urls=job.result()
                    except Exception:errors+=1;continue
                    for url in urls:
                        if url not in scheduled:
                            scheduled.add(url);pexec[pictures.submit(signature,url)]=url
    print('Audited sellers',len(list((cache/'sellers').iterdir())),'indexed images',len(list((cache/'hashes').iterdir())),'errors',errors)
