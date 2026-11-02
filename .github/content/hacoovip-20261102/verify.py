"""Release checks for language parity, crawlable links and search metadata."""
import json,re,xml.etree.ElementTree as ET
from pathlib import Path
from urllib.parse import urlparse,unquote
from bs4 import BeautifulSoup
from build import ROOT,HERE,LANGS,LANGTAG,ALL_SLUGS,ARTICLE_SLUGS,FEATURED,ORIGIN,path
errors=[];docs={}
def check(ok,msg):
 if not ok:errors.append(msg)
for lang in LANGS:
 asset=json.loads((HERE/(lang+'.json')).read_text())
 check(set(asset)==set(json.loads((HERE/'en.json').read_text())),lang+' content parity')
 for slug in ALL_SLUGS:
  f=ROOT/(lang if lang!='en' else '')/(slug+'.html' if slug else 'index.html')
  check(f.exists(),str(f)+' missing')
  if not f.exists():continue
  soup=BeautifulSoup(f.read_text(),'html.parser');url=ORIGIN+path(lang,slug);docs[path(lang,slug)]=soup
  check(soup.html.get('lang')==LANGTAG[lang],url+' lang')
  check(len(soup.find_all('h1'))==1,url+' h1')
  can=soup.select('link[rel=canonical]');check(len(can)==1 and can[0].get('href')==url,url+' canonical')
  alt={x.get('hreflang'):x.get('href') for x in soup.select('link[hreflang]')}
  expected={LANGTAG[l]:ORIGIN+path(l,slug) for l in LANGS};expected['x-default']=ORIGIN+path('en',slug)
  check(alt==expected,url+' reciprocal hreflang')
  check(bool(soup.title and soup.title.get_text(strip=True)),url+' title')
  check(bool(soup.select_one('meta[name=description]').get('content')),url+' description')
  check(soup.select_one('meta[name=robots]')['content']=='index,follow',url+' robots')
  for sc in soup.select('script[type="application/ld+json"]'):
   try:
    graph=json.loads(sc.string)['@graph'];page=next(x for x in graph if x.get('@id')==url+'#page');check(page['inLanguage']==LANGTAG[lang],url+' schema language')
    if slug in ARTICLE_SLUGS:check(page['@type']=='Article' and page['dateModified']>=page['datePublished'],url+' Article dates')
   except Exception as e:errors.append(url+' schema '+str(e))
  if slug=='seo-articles':check(len(soup.select('main .guideCard'))==28,url+' hub count')
  if not slug:
   check(len(soup.select('main .guideCard'))==6,url+' home count')
   form=soup.select_one('form[role=search]');check(form['action']=='https://www.cnfanshp.com/search.html',url+' search destination');check(form.select_one('[name=keywords]') is not None and form.select_one('[name=channelid]')['value']=='2',url+' search parameters')
  if lang!='en':
   text=soup.main.get_text(' ',strip=True)
   check(not re.search('Read English|Read guide|Open page|Search the current|SEO Articles|Check cover image|Review details',text),url+' English fallback')
  check('cnfanshp.com' not in soup.body.get_text(' ',strip=True),url+' visible catalog hostname')
# Crawl internal HTML links and local resources; same-page anchors must exist.
for route,soup in docs.items():
 for a in soup.select('a[href]'):
  href=a['href'];p=urlparse(href)
  if p.scheme and p.netloc!=urlparse(ORIGIN).netloc:continue
  if p.scheme in ['mailto','tel']:continue
  target=p.path or route
  check(target in docs,route+' broken internal '+href)
  if p.fragment and target in docs:check(docs[target].find(id=unquote(p.fragment)) is not None,route+' missing anchor '+href)
 for el in soup.select('link[rel=stylesheet],script[src],img[src]'):
  src=el.get('href') or el.get('src');p=urlparse(src)
  if p.scheme:continue
  check((ROOT/p.path.lstrip('/')).exists(),route+' missing asset '+src)
ns={'s':'http://www.sitemaps.org/schemas/sitemap/0.9'}
urls=[x.text for x in ET.parse(ROOT/'sitemap.xml').findall('.//s:loc',ns)]
check(len(urls)==333 and len(set(urls))==333,'sitemap count/duplicates')
check(set(urls)=={ORIGIN+x for x in docs},'sitemap page coverage')
if errors:
 print('\n'.join(errors[:100]));raise SystemExit(f'{len(errors)} checks failed')
print(f'PASS: {len(docs)} pages; 28 articles × 9 languages; 333 sitemap URLs; reciprocal hreflang, canonical, metadata, schema, internal links, anchors, assets, search and home/hub counts.')
