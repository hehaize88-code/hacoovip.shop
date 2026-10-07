"""Release gate for localized HTML, metadata, navigation and content parity."""
import json,re
from pathlib import Path
from urllib.parse import urlsplit,unquote
from xml.etree import ElementTree as ET
from bs4 import BeautifulSoup
root=Path(__file__).resolve().parents[1];out=root/'out';base='https://spreadsheet-hipobuy.net';langs=['en','de','es','fr','it','pl','pt','zh']
errors=[];pages={}
def check(condition,message):
 if not condition:errors.append(message)
urls=ET.parse(out/'sitemap.xml').findall('{*}url');check(len(urls)==224,'Expected 224 URLs in sitemap')
for u in urls:
 url=u.find('{*}loc').text;route=urlsplit(url).path;f=out/route.lstrip('/')/'index.html';check(f.exists(),f'Missing {route}')
 if not f.exists():continue
 raw=f.read_text();check(raw.lower().startswith('<!doctype html>'),f'Doctype {route}')
 s=BeautifulSoup(raw,'html.parser');pages[route]=s;lang=s.body.get('data-locale');original=s.body.get('data-route')
 check(s.html.get('lang')==('zh-CN' if lang=='zh' else lang),f'HTML lang {route}')
 check(s.select_one('link[rel="canonical"]').get('href')==url,f'Canonical {route}')
 alt={x['hreflang']:x['href'] for x in s.select('link[hreflang]')};check(len(alt)==9,f'9 alternates {route}')
 for l in langs:
  expected=base+('' if l=='en' else '/'+l)+original
  check(alt.get('zh-CN' if l=='zh' else l)==expected,f'Alternate {route} {l}')
 check(alt.get('x-default')==base+original,f'x-default {route}')
 check(len(s.select('h1'))==1,f'Single H1 {route}')
 check(bool(s.title and s.title.text.strip()),f'Title {route}')
 check(bool(s.select_one('meta[name="description"]')['content']),f'Description {route}')
 check(s.select_one('meta[property="og:title"]')['content']==s.title.text,f'OG title {route}')
 check(len(s.select('script[src^="/site.js"]'))==1,f'Native script {route}')
 check(not s.select('script[src*="_next"]'),f'Unexpected hydration {route}')
 check(not any('__next_f' in x.get_text() for x in s.find_all('script')),f'Unexpected Flight script {route}')
 for anchor in s.select('.article-body>aside a[href^="#section-"]'):
  section=s.find(id=anchor['href'][1:]);heading=section.find('h2') if section else None
  check(heading is not None and anchor.text.endswith(heading.text),f'Translated contents heading {route}')
 for a in s.select('a[href]'):
  v=urlsplit(a['href'])
  if v.scheme in ['http','https'] and v.hostname!='spreadsheet-hipobuy.net':
   check(v.hostname in ['cnfanshp.com','www.cnfanshp.com'],f'Unexpected outbound {route} {a["href"]}');continue
  path=v.path
  if path.startswith('/'):
   target=out/path.lstrip('/');check(target.exists() or (target/'index.html').exists(),f'Broken link {route} {path}')
   if path.endswith('/') and a.find_parent('noscript') is None:check(lang=='en' or path.startswith('/'+lang+'/'),f'Locale lost {route} {path}')
  if v.fragment and not path:check(s.find(id=unquote(v.fragment)) is not None,f'Missing anchor {route} {v.fragment}')
 for script in s.select('script[type="application/ld+json"]'):
  data=json.loads(script.text)
  for obj in data if isinstance(data,list) else [data]:
   if obj.get('@type')=='Article':check(obj['mainEntityOfPage']==url,f'Article URL {route}');check(obj['inLanguage']==s.html['lang'],f'Article language {route}');check(obj['headline']==s.h1.text,f'Article headline {route}')
 if original=='/articles/':check(len(s.select('.article-index>a'))==15,f'Article list {route}')
 if original=='/spreadsheet/':check(len(s.select('.data-row'))==60,f'Catalogue rows {route}')
for route,s in pages.items():
 original=s.body['data-route'];en=pages[original]
 check(len(s.select('.article-copy>section'))==len(en.select('.article-copy>section')),f'Section coverage {route}')
 check(len(s.select('.article-copy p'))==len(en.select('.article-copy p')),f'Paragraph coverage {route}')
 if s.body['data-locale']!='en':
  check(s.title.text!=en.title.text,f'Untranslated title {route}')
  for p,q in zip(s.select('.article-copy section p'),en.select('.article-copy section p')):
   check(p.text!=q.text,f'Untranslated paragraph {route} {q.text[:50]}')
for a in json.loads((root/'content/new-articles.json').read_text()):
 words=len(re.findall(r'\S+',' '.join([a['title'],a['dek']]+[p for sec in a['sections'] for p in [sec['heading']]+sec['paragraphs']])));check(1200<=words<=1800,f'English editorial length {a["slug"]}: {words}')
if errors:print('\n'.join(errors));raise SystemExit(f'{len(errors)} release errors')
print(f'PASS: {len(pages)} pages; all 8 languages, reciprocal hreflang, metadata, internal links, schemas, 15 articles and 60 catalogue rows per language.')
