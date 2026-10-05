#!/usr/bin/env python3
"""Check content parity, canonical/hreflang targets and catalogue identity."""
from html.parser import HTMLParser
from collections import Counter
from pathlib import Path
import json
import re
import xml.etree.ElementTree as ET

OUT = Path('out')
SITE = 'https://allchinabuy.pro'
LOCALES = {'fr':'fr-FR','de':'de-DE','it':'it-IT','es':'es-ES'}
class Page(HTMLParser):
    def __init__(self, text):
        super().__init__(); self.tags=Counter(); self.links=[]; self.images=[]; self.external=[]; self.alternates={}; self.canonical=''; self.lang=''; self.scripts=[]; self.forms=[]; self.feed(text)
    def handle_starttag(self, tag, attrs):
        a=dict(attrs); self.tags[tag]+=1
        if tag=='html': self.lang=a.get('lang')
        if tag=='a':
            self.links.append(a.get('href',''))
            if 'cnfanshp.com' in a.get('href',''): self.external.append(a['href'])
        if tag=='img': self.images.append(a.get('src'))
        if tag=='form': self.forms.append(a.get('action'))
        if tag=='script' and a.get('src'): self.scripts.append(a['src'])
        if tag=='link' and a.get('rel')=='canonical': self.canonical=a.get('href')
        if tag=='link' and a.get('rel')=='alternate' and a.get('hreflang'): self.alternates[a['hreflang']]=a.get('href')
    handle_startendtag=handle_starttag

failures=[]
def check(condition, message):
    if not condition: failures.append(message)
paths=[p for p in OUT.rglob('index.html') if p.relative_to(OUT).parts[0] not in {*LOCALES,'404','_not-found'}]
for path in paths:
    relative=path.relative_to(OUT); route='/'+str(relative).replace('index.html','')
    source=Page(path.read_text())
    for locale in ['en', *LOCALES]:
        prefix='' if locale=='en' else '/'+locale
        target=path if locale=='en' else OUT/locale/relative
        check(target.exists(), f'{prefix}{route}: missing page')
        if not target.exists(): continue
        text=target.read_text(); page=Page(text)
        check(page.lang==LOCALES.get(locale,'en'),f'{prefix}{route}: wrong HTML language')
        check(page.canonical==SITE+prefix+route,f'{prefix}{route}: wrong canonical {page.canonical}')
        for code in ['en',*LOCALES,'x-default']:
            expected=SITE+('/'+code if code in LOCALES else '')+route
            check(page.alternates.get(code)==expected,f'{prefix}{route}: wrong {code} alternate')
        for tag in ['h1','h2','h3','p','li','article','img','form','table','details']:
            check(page.tags[tag]==source.tags[tag],f'{prefix}{route}: {tag} content count differs')
        check(page.images==source.images,f'{prefix}{route}: image identity changed')
        check(page.external==source.external,f'{prefix}{route}: main catalogue targets changed')
        check(page.forms==source.forms,f'{prefix}{route}: search destination changed')
        if locale!='en':
            check(not any(s.startswith('/_next/') for s in page.scripts),f'{prefix}{route}: English React hydration remains')
            check('/site-tools.js' in page.scripts,f'{prefix}{route}: native locale interactions missing')
        for href in page.links:
            if not href.startswith('/') or href.startswith('//'): continue
            local=href.split('#')[0].split('?')[0]
            check((OUT/local.lstrip('/')).is_file() or (OUT/local.lstrip('/')/'index.html').is_file(),f'{prefix}{route}: broken internal link {href}')
        for raw in re.findall(r'<script[^>]*type="application/ld\+json"[^>]*>(.*?)</script>',text,re.S):
            try: json.loads(raw)
            except ValueError: check(False,f'{prefix}{route}: malformed JSON-LD')
ns={'s':'http://www.sitemaps.org/schemas/sitemap/0.9'}
urls=[n.text for n in ET.parse(OUT/'sitemap.xml').findall('.//s:loc',ns)]
check(len(urls)==len(paths)*5,f'Sitemap: expected {len(paths)*5} URLs, found {len(urls)}')
check(len(urls)==len(set(urls)),'Sitemap: duplicate URLs')
for url in urls:
    check((OUT/url.removeprefix(SITE).lstrip('/')/'index.html').is_file(),f'Sitemap missing page: {url}')
if failures: raise SystemExit('\n'.join(failures[:80]))
print(f'Passed {len(paths)*5} pages: languages, full-content parity, canonicals, reciprocal alternates, sitemap, links, assets and catalogue targets.')
