"""Check the publication-specific SEO and content invariants, without network calls."""
import json
import re
import subprocess
from pathlib import Path
from urllib.parse import urlparse, unquote
import xml.etree.ElementTree as ET
from bs4 import BeautifulSoup

ROOT=Path(__file__).resolve().parents[3]
SITE=ROOT/'oopbuys-store'
SOURCE=Path(__file__).resolve().parent
MANIFEST=json.loads((SOURCE/'manifest.json').read_text())
LANGS=['en','de','fr','es','it']
NS={'s':'http://www.sitemaps.org/schemas/sitemap/0.9','x':'http://www.w3.org/1999/xhtml'}
sitemap=ET.parse(SITE/'sitemap.xml').getroot()
locations=[node.find('s:loc',NS).text for node in sitemap]
assert len(locations)==len(set(locations))==132
errors=[]
counts={}

def check(condition,message):
    if not condition:errors.append(message)

for loc in locations:
    path=urlparse(loc).path
    check((SITE/(path.lstrip('/')+'index.html')).exists(),f'Sitemap target missing: {loc}')
for lang in LANGS:
    prefix='' if lang=='en' else lang+'/'
    hub=BeautifulSoup((SITE/prefix/'articles/index.html').read_text(),'html.parser')
    cards=hub.select('.article-directory-grid > article')
    check(len(cards)==18,f'{lang}: article directory count')
    check(len({a.select_one('a[href]')['href'] for a in cards})==18,f'{lang}: duplicate directory route')
    home=BeautifulSoup((SITE/prefix/'index.html').read_text(),'html.parser')
    check(len(home.select('.journal-section .article-grid > article'))==4,f'{lang}: homepage count')
    for key,data in MANIFEST.items():
        file=SITE/prefix/'articles'/data['slug']/'index.html'
        soup=BeautifulSoup(file.read_text(),'html.parser')
        canonical='https://oopbuys.store/'+prefix+'articles/'+data['slug']+'/'
        check(soup.html['lang']==lang,f'{canonical}: wrong language')
        check(soup.select_one('link[rel="canonical"]')['href']==canonical,f'{canonical}: canonical')
        check(len(soup.select('h1'))==1,f'{canonical}: h1 count')
        check('noindex' not in soup.select_one('meta[name="robots"]')['content'],f'{canonical}: noindex')
        check(len(soup.select('link[hreflang]'))==6,f'{canonical}: hreflang count')
        expected=set()
        for target in LANGS:
            expected.add('https://oopbuys.store/'+('' if target=='en' else target+'/')+'articles/'+data['slug']+'/')
        check({n['href'] for n in soup.select('link[hreflang]')}==expected,f'{canonical}: alternate routes')
        check({urlparse(n['href']).path for n in soup.select('.language-popover a')}=={urlparse(x).path for x in expected},f'{canonical}: language navigation')
        body=soup.select_one('.longform')
        check(len(body.select('section[id]'))==8,f'{canonical}: missing content section')
        check(not soup.select('[data-products]'),f'{canonical}: product placeholder')
        check(len(body.select('.editorial-product-card'))==(0 if key=='fees' else 3),f'{canonical}: product cards')
        check(not soup.select('script[src*="/_next/"]'),f'{canonical}: stale hydration')
        if lang=='en':
            words=len(body.get_text(' ',strip=True).split());counts[key]=words
            check(1200<=words<=1800,f'{canonical}: {words} English words')
        for node in sitemap:
            if node.find('s:loc',NS).text==canonical:
                check({n.attrib['href'] for n in node.findall('x:link',NS)}==expected,f'{canonical}: sitemap alternates')
        check(canonical in locations,f'{canonical}: missing sitemap entry')
        for script in soup.select('script[type="application/ld+json"]'):
            data=json.loads(script.string)
            check(not any(g.get('@type')=='FAQPage' for g in data.get('@graph',[data])),f'{canonical}: FAQ schema')

# Check links and resources in all HTML files modified by this publication.
tracked=subprocess.check_output(['git','ls-files','--modified','--others','--exclude-standard','-z'],cwd=ROOT).decode().split('\0')
checked=0
for path in tracked:
    if not path.startswith('oopbuys-store/') or not path.endswith('.html'):continue
    file=ROOT/path;soup=BeautifulSoup(file.read_text(),'html.parser');checked+=1
    for node in soup.select('a[href],img[src],link[rel="stylesheet"][href],script[src]'):
        url=node.get('href',node.get('src',''));p=urlparse(url)
        if p.scheme or p.netloc or not p.path.startswith('/'):continue
        relative=unquote(p.path.lstrip('/'))
        dest=SITE/relative
        if p.path.endswith('/'):dest=dest/'index.html'
        check(dest.exists(),f'{path}: missing local target {url}')
    for a in soup.select('a[href^="#"]'):
        if a['href']!='#':check(soup.find(id=a['href'][1:]) is not None,f'{path}: missing anchor {a["href"]}')

result={'sitemap_urls':len(locations),'new_articles':4,'language_versions':20,'articles_per_language':18,'checked_html_pages':checked,'english_word_counts':counts,'errors':errors}
print(json.dumps(result,ensure_ascii=False,indent=2))
if errors:raise SystemExit(1)
