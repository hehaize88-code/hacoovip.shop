#!/usr/bin/env python3
"""Release gate for content parity, indexability, language URLs and local links."""
import json,pathlib,re,xml.etree.ElementTree as ET
from html.parser import HTMLParser
from urllib.parse import urlparse
ROOT=pathlib.Path(__file__).resolve().parent.parent
SITE='https://usfanss.store'
LANGS=['en','de','es','fr','it','pl','pt','zh-cn']
CONTENT=ROOT/'content/2026-10'
articles=sorted(p.name[:-8] for p in CONTENT.glob('*.en.json') if p.name!='shipping.en.json')
assert len(articles)==14
for slug in articles+['shipping']:
 en=json.loads((CONTENT/f'{slug}.en.json').read_text())
 structure=[len(s['paragraphs']) for s in en['sections']]
 if slug!='shipping':
  text=' '.join([en['title'],en['description'],en['factNote']]+[s['heading']+' '+' '.join(s['paragraphs']) for s in en['sections']])
  assert 1200<=len(re.findall(r"\b[\w'-]+\b",text))<=1800,slug
 for lang in LANGS:
  a=json.loads((CONTENT/f'{slug}.{lang}.json').read_text())
  assert a['lang']==lang and a['slug']==slug
  assert [len(s['paragraphs']) for s in a['sections']]==structure,(slug,lang,'section parity')
  assert all(s['heading'].strip() and all(p.strip() for p in s['paragraphs']) for s in a['sections'])
  assert all(not s['heading'].endswith(('?','？')) for s in a['sections']),(slug,lang,'Q&A heading')
  assert a['published']<=a['modified']=='2026-10-07'
  if lang!='en':assert a['sections']!=en['sections'],(slug,lang,'English fallback')
  body=json.dumps(a,ensure_ascii=False)
  assert not re.search(r'access-date=|date=|存档日期|Internet Archive|&quot;|&amp;',body),(slug,lang,'translation artifact')
 for lang in LANGS:
  a=json.loads((CONTENT/f'{slug}.{lang}.json').read_text())
  if slug=='usfans-t-shirt-finds-sizing-print':
   assert all(n in json.dumps(a['sections'][2]) for n in ['54','70','58','68']),(slug,lang,'worked example')
  if slug=='shipping':
   assert all(n in json.dumps(a['sections'][2]) for n in ['40','30','20','24000','6000','4','3']),(slug,lang,'volume example')
class Page(HTMLParser):
 def __init__(self,text):
  super().__init__();self.links=[];self.imgs=[];self.metas={};self.ids=set();self.h1=0;self.lang='';self.assets=[];self.jsons=[];self.capture=False;self.buf='';self.feed(text)
 def handle_starttag(self,tag,attrs):
  a=dict(attrs)
  if tag=='html':self.lang=a.get('lang')
  if tag=='h1':self.h1+=1
  if 'id' in a:self.ids.add(a['id'])
  if tag=='a':self.links.append(a.get('href',''))
  if tag=='img':self.imgs.append(a.get('src',''))
  if tag=='meta':self.metas[a.get('name')]=a.get('content')
  if tag=='link':self.assets.append(a)
  if tag=='script':
   if a.get('type')=='application/ld+json':self.capture=True;self.buf=''
   if a.get('src','').startswith('/'):self.imgs.append(a['src'])
 def handle_data(self,data):
  if self.capture:self.buf+=data
 def handle_endtag(self,tag):
  if tag=='script' and self.capture:self.jsons.append(json.loads(self.buf));self.capture=False
core=['/','/categories/','/finds/','/articles/','/faq/','/qc-guide/','/shipping/']
expected=set()
for lang in LANGS:
 prefix='' if lang=='en' else '/'+lang
 for route in core+['/articles/'+s+'/' for s in articles]:
  path=prefix+route;expected.add(SITE+path);file=ROOT/path.lstrip('/')/'index.html';html=file.read_text();p=Page(html)
  assert p.lang==('zh-CN' if lang=='zh-cn' else lang),(path,'lang')
  assert p.h1==1,(path,'h1',p.h1)
  assert p.metas['description'] and 'noindex' not in p.metas['robots']
  canon=[a['href'] for a in p.assets if a.get('rel')=='canonical'];assert canon==[SITE+path],(path,canon)
  alts={a['hreflang']:a['href'] for a in p.assets if a.get('rel')=='alternate'}
  assert len(alts)==9 and alts['x-default']==SITE+route,(path,alts)
  for code in LANGS:
   assert alts['zh-CN' if code=='zh-cn' else code]==SITE+('' if code=='en' else '/'+code)+route
  for href in p.links:
   u=urlparse(href)
   if u.netloc:assert u.netloc=='www.cnfanshp.com',(path,href)
   elif u.path:
    target=ROOT/u.path.lstrip('/')
    if u.path.endswith('/'):target=target/'index.html'
    assert target.is_file(),(path,href)
    if lang!='en':assert u.path.startswith(prefix+'/'),(path,'language leak',href)
   elif u.fragment:assert u.fragment in p.ids,(path,'missing anchor',href)
  for src in p.imgs+[a['href'] for a in p.assets if a.get('rel')=='stylesheet']:
   if src.startswith('/'):assert (ROOT/src.lstrip('/')).is_file(),(path,src)
  for record in p.jsons:
   for schema in (record if isinstance(record,list) else [record]):
    if schema.get('@type')=='Article':
     slug=route.rstrip('/').split('/')[-1];a=json.loads((CONTENT/f'{slug}.{lang}.json').read_text())
     assert schema['datePublished']==a['published'] and schema['dateModified']==a['modified']
  if route=='/articles/':assert len(re.findall(r'class="article-grid"',html))==1 and all('/articles/'+s+'/' in html for s in articles)
urls={n.text for n in ET.parse(ROOT/'sitemap.xml').iter('{http://www.sitemaps.org/schemas/sitemap/0.9}loc')}
assert urls==expected,(len(urls),len(expected))
assert len(list((ROOT/'static-assets').glob('*.js')))==1
js=next((ROOT/'static-assets').glob('*.js'));assert js.stat().st_size<2048
catalog=json.loads((ROOT/'app/catalog-products.json').read_text());assert len(catalog)==20
assert len({p['href'] for p in catalog})==20 and all(p['image'].startswith('https://www.cnfanshp.com/uploads/') for p in catalog)
assert all(p['verified']=='2026-10-07' and not p['price'] for p in catalog)
print(f'PASS: {len(expected)} indexable pages, 14 articles × 8 languages, complete section parity, canonical/hreflang, local links, schema dates, worked examples, 20 product targets; client {js.stat().st_size} bytes.')
