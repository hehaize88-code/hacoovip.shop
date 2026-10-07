"""Validate truncation, hydration, dead routes and search metadata."""
from pathlib import Path
from urllib.parse import urlparse,unquote
from bs4 import BeautifulSoup
import json,re,xml.etree.ElementTree as ET
root=Path(__file__).resolve().parents[1]
languages=['en','de','fr','es','it','pl']
order=json.loads((root/'content/2026-10/article-order.json').read_text())
assert len(order)==len(set(order))==14
data={(d['slug'],d['lang']):d for p in (root/'content/2026-10').glob('*.??.json') for d in [json.loads(p.read_text())]}
for lang in languages:
 assert {slug for slug,code in data if code==lang}==set(order),(lang,'missing translations')
 for slug in order:
  source=data[(slug,'en')];translated=data[(slug,lang)]
  assert len(translated['sections'])==len(source['sections']),(lang,slug,'missing sections')
  for original,local in zip(source['sections'],translated['sections']):
   assert len(local['paragraphs'])==len(original['paragraphs']),(lang,slug,'missing paragraphs')
   assert bool(local.get('table'))==bool(original.get('table')),(lang,slug,'missing table')
   if 'table' in original:
    assert len(local['table']['headers'])==len(original['table']['headers']),(lang,slug,'table headers')
    assert list(map(len,local['table']['rows']))==list(map(len,original['table']['rows'])),(lang,slug,'table rows')
   if lang!='en':
    for a,b in zip(original['paragraphs'],local['paragraphs']):
     assert (a!=b or len(a)<30) and 0.45<len(b)/len(a)<2.4,(lang,slug,'untranslated or shortened paragraph',b[:80])
  assert translated['related']==source['related'] and translated['sources']==source['sources'],(lang,slug,'references')
  assert translated['image']==source['image'] and translated['published']==source['published'],(lang,slug,'metadata')
pages=[]
for path in root.rglob('*.html'):
 if any(x.startswith('.') or x in {'templates','node_modules','dist','content'} for x in path.relative_to(root).parts):continue
 text=path.read_text();assert text.rstrip().endswith('</html>'),path
 assert '\ufffd' not in text and 'ARTICLE_SLOT' not in text and 'SEARCH_SLOT' not in text,path
 s=BeautifulSoup(text,'html.parser');pages.append((path,s))
 assert not any('self.__next' in x.get_text() or '/_next/' in x.get('src','') for x in s.select('script')),path
 assert len(s.select('h1'))==1,(path,'H1 count')
 for script in s.select('script[type="application/ld+json"]'):json.loads(script.string or script.get_text())
 for form in s.select('form[action="https://cnfanshp.com/search.html"]'):
  assert form.get('data-track')=='main_search_submit',path
  assert form.select_one('input[name="keywords"]'),path
  assert form.select_one('input[name="channelid"][value="2"]'),path
 for a in s.select('a[href]'):
  u=urlparse(a['href'])
  if not u.path or u.scheme not in {'','https','http'}:continue
  if u.netloc and u.netloc!='usfanss.uk':continue
  file=root/unquote(u.path).lstrip('/')
  if u.path.endswith('/') or not file.suffix:file=file/'index.html'
  assert file.exists(),(path,'broken link',a['href'])
 for img in s.select('img[src^="/"]'):assert (root/img['src'].lstrip('/')).exists(),(path,img['src'])
 for alt in s.select('link[hreflang]'):
  u=urlparse(alt['href']);file=root/(u.path.lstrip('/')+'index.html')
  assert file.exists(),(path,'hreflang',alt['href'])
 for schema in s.select('script[type="application/ld+json"]'):
  obj=json.loads(schema.string or schema.get_text())
  if obj.get('@type')=='Article':
   assert obj['headline']==s.h1.get_text(),(path,'schema headline')
   assert obj.get('inLanguage',s.html['lang'])==s.html['lang'],path
for lang in languages:
 pre='' if lang=='en' else lang+'/'
 s=BeautifulSoup((root/(pre+'index.html')).read_text(),'html.parser')
 assert len(s.select('.articles-home .article-card'))==4,(lang,'homepage cards')
 assert len(s.select('.baggage-tag'))==7,(lang,'products')
 assert len(s.select('#faq details'))==4,(lang,'FAQ')
 hub=BeautifulSoup((root/(pre+'articles/index.html')).read_text(),'html.parser')
 assert len({a['href'] for a in hub.select('.article-card')})==len(hub.select('.article-card')),(lang,'duplicate card')
 expected=['/'+pre+'articles/'+slug+'/' for slug in order]
 assert [a['href'] for a in hub.select('.article-card')]==expected,(lang,'article-list parity')
 assert {p.parent.name for p in (root/pre/'articles').glob('*/index.html')}==set(order),(lang,'article-page parity')
 for a in s.select('.articles-home .article-card'):
  assert a['href'].startswith('/'+pre+'articles/'),(lang,'English fallback on homepage')
 for slug in order:
  article=BeautifulSoup((root/(pre+'articles/'+slug+'/index.html')).read_text(),'html.parser')
  assert article.html['lang']==lang and article.select_one('main')['lang']==lang,(lang,slug,'HTML language')
  assert article.h1.get_text()==data[(slug,lang)]['title'],(lang,slug,'localized title')
  expected_alternates={code:'https://usfanss.uk/'+('' if code=='en' else code+'/')+'articles/'+slug+'/' for code in languages}
  expected_alternates['x-default']=expected_alternates['en']
  assert {a['hreflang']:a['href'] for a in article.select('link[hreflang]')}==expected_alternates,(lang,slug,'hreflang parity')
  assert {a['hreflang']:a['href'] for a in article.select('.language-menu a')}=={k:v.removeprefix('https://usfanss.uk') for k,v in expected_alternates.items() if k!='x-default'},(lang,slug,'same-page language switch')
  for a in article.select('.related-guides a'):
   assert a['href'].startswith('/'+pre+'articles/'),(lang,slug,'related guide leaves locale')
urls=[e.text for e in ET.parse(root/'sitemap.xml').iter('{http://www.sitemaps.org/schemas/sitemap/0.9}loc')]
assert len(urls)==len(set(urls))
for url in urls:
 path=root/(urlparse(url).path.lstrip('/')+'index.html');assert path.exists(),url
 s=BeautifulSoup(path.read_text(),'html.parser');canonical=s.select_one('link[rel="canonical"]');assert canonical and canonical['href']==url,(url,'canonical')
for datafile in (root/'content/2026-10').glob('*.en.json'):
 d=json.loads(datafile.read_text())
 if d['new']:
  text=d['intro']+' '+' '.join(x['heading']+' '+' '.join(x['paragraphs']) for x in d['sections'])
  count=len(re.findall(r"\b[\w]+(?:['’-][\w]+)*\b",text));assert 1200<=count<=1800,(datafile,count)
print(f'Validated {len(pages)} complete documents, {len(urls)} sitemap URLs, schemas, images, forms and internal links.')
print('All six languages contain the same 14 full articles, section/paragraph/table structure and same-page language links.')
