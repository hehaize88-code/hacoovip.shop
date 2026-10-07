"""Validate truncation, hydration, dead routes and search metadata."""
from pathlib import Path
from urllib.parse import urlparse,unquote
from bs4 import BeautifulSoup
import json,re,xml.etree.ElementTree as ET
root=Path(__file__).resolve().parents[1]
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
for lang in ['en','de','fr','es','it','pl']:
 pre='' if lang=='en' else lang+'/'
 s=BeautifulSoup((root/(pre+'index.html')).read_text(),'html.parser')
 assert len(s.select('.articles-home .article-card'))==4,(lang,'homepage cards')
 assert len(s.select('.baggage-tag'))==7,(lang,'products')
 assert len(s.select('#faq details'))==4,(lang,'FAQ')
 hub=BeautifulSoup((root/(pre+'articles/index.html')).read_text(),'html.parser')
 assert len({a['href'] for a in hub.select('.article-card')})==len(hub.select('.article-card')),(lang,'duplicate card')
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
