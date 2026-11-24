"""Rebuild visual-data.mjs from cnfanshp and listings' verified Weidian SKU photos.

Run python scripts/refresh_visual.py --cache /path/to/fingerprints (requires curl,
numpy and Pillow). The default run indexes source product photos and current seller styles.
Pass --source-only to stage a source-only build with live seller scanning.
Use --output PATH to stage a candidate before building the Worker.
The scratch cache holds image descriptors only; catalog and SKU pages are reread.
"""
import argparse
import base64
import hashlib
import html
import io
import json
import math
import os
from collections import defaultdict
from concurrent.futures import ThreadPoolExecutor
from pathlib import Path
import re
import subprocess
import tempfile
from urllib.parse import parse_qs, urljoin, urlsplit

import numpy as np
from PIL import Image, ImageOps

ORIGIN = 'https://www.cnfanshp.com'
LIST = '/index.php?m=home&c=Lists&a=index&tid=1&sort=new&sort_asc=desc&ZXljbXM=1&page='
BASIS = np.cos(np.pi*(2*np.arange(32)+1)*np.arange(8)[:, None]/64)
ATTR = re.compile(r'''\s([\w:-]+)\s*=\s*(?:"([^"]*)"|'([^']*)')''')

def attrs(tag):
    return {k.lower(): html.unescape(a or b) for k, a, b in ATTR.findall(tag)}

def get(url):
    return subprocess.check_output(['curl', '--silent', '--show-error', '--fail',
        '--location', '--proto', '=https', '--proto-redir', '=https', '--retry', '2',
        '--max-time', '30', '--max-filesize', str(20*1024*1024), url])

def source_image(raw):
    url = urlsplit(urljoin(ORIGIN, raw))
    if url.hostname in ('cnfanshp.com', 'www.cnfanshp.com') and url.path.startswith(('/uploads/', '/media/')):
        return url.path
    return None

def source_ids():
    ids, covers = set(), defaultdict(set)
    page = 0
    while True:
        page += 1
        body = get(ORIGIN+LIST+str(page)).decode()
        cards = re.split(r'<div\s+class="product-card\b', body)[1:]
        seen = set()
        for card in cards:
            item = re.search(r'data-id="(\d+)"', card)
            if not item:
                raise ValueError(f'Missing catalog ID on source page {page}')
            item = int(item[1])
            seen.add(item)
            cover_tag = re.search(r'<img\b[^>]*>',card)
            if cover_tag:
                a = attrs(cover_tag[0])
                cover = source_image(a.get('data-src') or a.get('src') or '')
                if cover:
                    covers[item].add(cover)
        if not seen-ids:
            raise ValueError(f'Empty or repeated source page {page}')
        ids.update(seen)
        if not re.search(r'>\s*下一页\s*</a>',body):
            break
    xml = get(ORIGIN+'/sitemap.xml').decode()
    if '<urlset' not in xml:
        raise ValueError('Invalid source sitemap')
    ids.update(int(x) for x in re.findall(r'<loc>https://(?:www\.)?cnfanshp\.com/AllProducts/(\d+)\.html</loc>',xml))
    return sorted(ids), covers

def source_detail(item):
    body = get(f'{ORIGIN}/AllProducts/{item}.html').decode()
    detail = re.split(r'<div\s+class="product-detail"\s*>', body, maxsplit=1)
    if len(detail) != 2:
        raise ValueError(f'Invalid product page {item}')
    section = re.split(r'<(?:section|div)\b[^>]*class="(?:related-products|product-list|related)',detail[1],maxsplit=1)[0]
    title = re.search(r'<h1\b[^>]*>(.*?)</h1>',section,re.S)
    if not title:
        raise ValueError(f'Missing title {item}')
    images = set()
    market = None
    for tag in re.findall(r'<(?:img|source|a)\b[^>]*>',section):
        values = attrs(tag)
        if tag.startswith('<a '):
            href = urlsplit(values.get('href',''))
            if href.hostname in ('www.weidian.com','weidian.com') and href.path == '/item.html':
                candidate = parse_qs(href.query).get('itemID',[''])[0]
                if candidate.isdigit():
                    if market and market != candidate:
                        raise ValueError(f'Conflicting seller IDs on {item}')
                    market = candidate
            continue
        for k in ('src', 'data-src', 'data-original', 'srcset', 'data-srcset'):
            for token in values.get(k,'').split(','):
                parts = token.split()
                url = source_image(parts[0]) if parts else None
                if url:
                    images.add(url)
    return item, html.unescape(re.sub('<[^>]+>','',title[1])).strip(), market, images

def seller_images(item):
    raw = get('https://weidian.com/item.html?itemID='+item).decode()
    tag = re.search(r'<script\b[^>]*\bid="__rocker-render-inject__"[^>]*>',raw)
    if not tag:
        raise ValueError(f'Seller data unavailable for {item}')
    model = json.loads(attrs(tag[0])['data-obj'])['result']['default_model']
    if str(model['item_info']['item_id']) != item:
        raise ValueError(f'Seller ID mismatch for {item}')
    props = model.get('sku_properties') or {}
    skus = props.get('sku') or {}
    values = [v for group in props.get('attr_list') or [] for v in group.get('attr_values') or []]
    values += list(skus.values()) if isinstance(skus,dict) else skus
    photos = set()
    for value in values:
        image = value.get('img')
        if isinstance(image,dict):
            image = image.get('url') or image.get('img')
        if isinstance(image,str):
            url = urlsplit(image)
            if url.scheme == 'https' and (url.hostname or '').endswith('.geilicdn.com'):
                photos.add(image)
    return item, photos

def signature(args):
    value, cache = args
    key = cache/hashlib.sha256(value.encode()).hexdigest()
    if key.is_file() and key.stat().st_size == 29:
        return key.read_bytes()
    with Image.open(io.BytesIO(get(urljoin(ORIGIN,value)))) as raw:
        img = ImageOps.exif_transpose(raw).convert('RGBA')
        bg = Image.new('RGB',img.size,'white')
        bg.paste(img,mask=img.getchannel('A'))
    gray = bg.convert('L')
    def scale(pixels,size):
        return np.asarray(pixels.resize(size,Image.Resampling.BILINEAR))
    dct = (BASIS@scale(gray,(32,32))@BASIS.T).flatten()
    grad = scale(gray,(9,8))
    color = scale(bg,(4,4)).reshape(2,2,2,2,3).mean(axis=(1,3)).round().astype(np.uint8)
    shape = round(math.log(bg.width/bg.height)*32)
    result = (np.packbits(dct>np.median(dct[1:])).tobytes() +
              np.packbits(grad[:,1:]>grad[:,:-1]).tobytes() + color.tobytes() +
              bytes([max(-127,min(127,shape)) & 255]))
    with tempfile.NamedTemporaryFile(dir=cache,delete=False) as tmp:
        tmp.write(result)
    os.replace(tmp.name,key)
    return result

def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--cache',type=Path,required=True)
    parser.add_argument('--source-only',action='store_true')
    parser.add_argument('--output',type=Path,default=Path(__file__).resolve().parents[1]/'visual-data.mjs')
    args = parser.parse_args()
    args.cache.mkdir(parents=True,exist_ok=True)
    names, source, sellers, extra = {}, defaultdict(set), defaultdict(set), defaultdict(set)
    ids, covers = source_ids()
    with ThreadPoolExecutor(max_workers=4) as pool:
        for item, name, market, images in pool.map(source_detail,ids):
            names[item] = name
            for url in images | covers[item]:
                source[url].add(item)
            if market:
                sellers[market].add(item)
        if not args.source_only:
            for market, urls in pool.map(seller_images,sellers):
                for url in urls:
                    extra[url].update(sellers[market])
        images = {**source, **extra}
        if not images or not names:
            raise ValueError('No searchable catalog found')
        data = b''.join(pool.map(signature,((url,args.cache) for url in images)))
    pending = {} if not args.source_only else {mid:sorted(items) for mid,items in sellers.items()}
    count = len(sellers) if not args.source_only else 0
    meta = dict(sourceProducts=len(names),sourceImages=len(source),
        searchableSourceProducts=len(set().union(*source.values())),
        sellerImages=len(extra),sellerDiscovered=len(extra),sellerTotal=len(sellers),
        sellerChecked=count,sellerComplete=count)
    out = dict(imageMeta=meta,imageNames=names,pendingSellers=pending,
        imageReferences=[[url,*sorted(ids)] for url,ids in images.items()],
        imageSignatures=base64.b64encode(data).decode())
    with tempfile.NamedTemporaryFile(mode='w',dir=args.output.parent,delete=False,encoding='utf-8') as tmp:
        for name,value in out.items():
            tmp.write(f'export const {name}='+json.dumps(value,ensure_ascii=False,separators=(',',':'))+';\n')
    os.replace(tmp.name,args.output)
    print(meta)

if __name__ == '__main__':
    main()
