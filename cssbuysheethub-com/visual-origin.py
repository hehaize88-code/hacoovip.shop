"""Rebuild cnfanshp visual descriptors. Usage: python visual-origin.py OUTPUT.json CACHE_DIR

Requires httpx, Pillow and numpy. Only publish a successful complete output.
The cache contains image descriptors. Product pages are reread on every run.
"""
from collections import defaultdict
from concurrent.futures import ThreadPoolExecutor
from hashlib import sha256
from html import unescape
from io import BytesIO
import json
import os
from pathlib import Path
import re
import sys
import time
from urllib.parse import urljoin, urlsplit
import httpx
import numpy as np
from PIL import Image, ImageOps

ORIGIN = 'https://www.cnfanshp.com'
LIST = '/index.php?m=home&c=Lists&a=index&tid=1&sort=new&sort_asc=desc&ZXljbXM=1&page='
BASIS = np.cos(np.pi*(2*np.arange(32)+1)*np.arange(8)[:,None]/64)
client = httpx.Client(proxy=os.environ.get('https_proxy') or os.environ.get('HTTPS_PROXY'),trust_env=False,timeout=25, follow_redirects=True, headers={'User-Agent':'CSSBuyCatalog/1.0'})
def get(path):
    for retry in range(3):
        response=client.get(ORIGIN+path)
        if response.status_code not in (429,502,503,504) or retry==2:
            response.raise_for_status()
            return response
        time.sleep(min(60,max(2**retry,int(response.headers.get('Retry-After','0')) if response.headers.get('Retry-After','0').isdigit() else 1)))
def paths():
    found=set()
    page=1
    while True:
        body=get(LIST+str(page)).text
        ids=set(re.findall(r'data-id="(\d+)"',body))
        if not ids or not (ids-found):
            raise ValueError(f'Empty or repeated source page {page}')
        found.update(ids)
        if not re.search(r'<a href="[^"]+"[^>]*>下一页</a>',body):
            break
        page+=1
    return sorted(found,key=int,reverse=True)
def item(item_id):
    path='/AllProducts/'+item_id+'.html'
    html=get(path).text
    section=html.split('<div class="product-detail">',1)[1]
    section=re.split(r'<(?:section|div)\b[^>]*class="(?:related-products|product-list|related)',section)[0]
    title=re.search(r'<h1[^>]*>(.*?)</h1>',section,re.S)
    if not title: raise ValueError('Product title missing on '+path)
    market=re.search(r'weidian\.com/item\.html\?itemID=(\d+)',section)
    photos=set()
    for tag in re.findall(r'<(?:img|source)\b[^>]*>',section):
        for src in re.findall(r'(?:src|data-src|data-original|srcset)="([^"]+)"',tag):
            for candidate in src.split(','):
                value=candidate.strip().split()
                if not value: continue
                u=urlsplit(urljoin(ORIGIN,unescape(value[0])))
                if u.hostname in ('www.cnfanshp.com','cnfanshp.com') and u.path.startswith(('/media/','/uploads/')):
                    photos.add(u.path)
    return {'path':path,'name':unescape(re.sub('<[^>]+>','',title[1])).strip(),'id':market[1] if market else ''},sorted(photos)
def fingerprint(url,cache):
    file=cache/sha256(url.encode()).hexdigest()
    if file.exists(): return json.loads(file.read_text())
    with Image.open(BytesIO(get(url).content)) as raw:
        im=ImageOps.exif_transpose(raw).convert('RGB')
    gray=im.convert('L')
    def resized(image,size):
        return np.array(image.resize(size,Image.Resampling.BILINEAR))
    coeff=(BASIS@resized(gray,(32,32)).astype(float)@BASIS.T).flatten()
    diff=resized(gray,(9,8))
    result={'url':url,'p':np.packbits(coeff>np.median(coeff[1:])).tobytes().hex(),'h':np.packbits(diff[:,1:]>diff[:,:-1]).tobytes().hex(),'a':im.width/im.height,'c':resized(im,(4,4)).flatten().tolist()}
    tmp=file.with_suffix('.tmp')
    tmp.write_text(json.dumps(result))
    tmp.replace(file)
    return result
def main():
    output=Path(sys.argv[1]);cache=Path(sys.argv[2])/'origin-signatures';cache.mkdir(parents=True,exist_ok=True)
    ids=paths();products=[];owners=defaultdict(list)
    with ThreadPoolExecutor(4) as pool:
        for n,(record,photos) in enumerate(pool.map(item,ids)):
            products.append(record)
            for url in photos:owners[url].append(n)
        images=[dict(row,products=owners[row['url']]) for row in pool.map(lambda url:fingerprint(url,cache),owners)]
    payload={'meta':{'source':'https://cnfanshp.com','sourceProducts':len(products),'sourceImages':len(images)},'products':products,'images':images}
    tmp=output.with_suffix('.tmp')
    tmp.write_text(json.dumps(payload,separators=(',',':'),ensure_ascii=False))
    tmp.replace(output)
    print(payload['meta'])
if __name__=='__main__':
    main()
