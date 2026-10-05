"""Rebuild the October 2026 editorial update from versioned source and translations.

Requires beautifulsoup4 and requests. Translation is explicit (--translate); normal
builds use the checked-in cache and never call an external service. Baseline is the
parent export, so repeated runs produce the same output without duplicate sections.
"""
import argparse
import copy
import html
import json
import re
import subprocess
import threading
import time
from concurrent.futures import ThreadPoolExecutor
from pathlib import Path
from urllib.parse import urlparse
import xml.etree.ElementTree as ET

import requests
from bs4 import BeautifulSoup, NavigableString, Comment

SOURCE = Path(__file__).resolve().parent
ROOT = SOURCE.parents[2]
SITE = ROOT / 'oopbuys-store'
BASE = '3d226351597427578d6b4e800846ec5fad2ffa86'
ORIGIN = 'https://oopbuys.store'
DATE = '2026-10-05'
LANGS = ['en', 'de', 'fr', 'es', 'it']
MANIFEST = json.loads((SOURCE / 'manifest.json').read_text())
PRODUCTS = json.loads((SOURCE / 'products.json').read_text())
CACHE_PATH = SOURCE / 'translations.json'
CACHE = json.loads(CACHE_PATH.read_text()) if CACHE_PATH.exists() else {}
OVERRIDES = json.loads((SOURCE/'reviewed-translations.json').read_text())
MISSING = {lang: set() for lang in LANGS[1:]}
LOCK = threading.Lock()
OUTPUT = {}


def parse(value):
    return BeautifulSoup(value, 'html.parser')


def original(path):
    return subprocess.check_output(['git', 'show', f'{BASE}:oopbuys-store/{path}'], cwd=ROOT).decode()


def prefix(lang):
    return '' if lang == 'en' else '/' + lang


def path_for(slug, lang):
    return prefix(lang) + '/articles/' + slug + '/'


def tr(value, lang):
    if lang == 'en' or not re.search(r'[A-Za-z]', value):
        return value
    if value in OVERRIDES.get(lang, {}):
        return OVERRIDES[lang][value]
    if value in CACHE.get(lang, {}):
        return CACHE[lang][value]
    MISSING[lang].add(value)
    return value


def localize(value, lang):
    soup = parse(value)
    # Translate linked sentences as complete sentences so articles/prepositions
    # agree with the translated link label. Link destinations must remain exact.
    for block in soup.select('p'):
        if lang != 'en' and block.find('a'):
            raw=block.decode_contents()
            translated=parse(tr(raw,lang))
            before=[a.get('href') for a in block.select('a')]
            after=[a.get('href') for a in translated.select('a')]
            if before != after:raise ValueError(f'Translation changed link destinations: {lang}: {raw[:80]}')
            block.clear();block.append(translated);block['data-localized-block']='true'
    for node in list(soup.find_all(string=True)):
        if isinstance(node, Comment) or node.parent.name in ['script', 'style'] or node.find_parent(attrs={'translate': 'no'}) or node.find_parent(attrs={'data-localized-block':'true'}):
            continue
        text = str(node)
        stripped = text.strip()
        if stripped:
            node.replace_with(text.replace(stripped, tr(stripped, lang)))
    for node in soup.select('[alt]'):
        node['alt'] = tr(node['alt'], lang)
    for link in soup.select('a[href^="/"]'):
        link['href'] = prefix(lang) + link['href']
    for block in soup.select('[data-localized-block]'):del block['data-localized-block']
    return soup


def product_markup(category):
    category = 'hoodies-sweaters' if category == 'hoodies' else category
    cards = []
    for product in PRODUCTS:
        if product['category'] != category:
            continue
        cards.append(f'''<article class="editorial-product-card"><a href="{product['url']}" target="_blank" rel="noopener noreferrer" aria-label="{html.escape(product['name'])}"><img src="{product['image']}" alt="{html.escape(product['name'])} — catalog first image" loading="lazy" width="480" height="480"/></a><div><h3 translate="no">{html.escape(product['name'])}</h3><p class="editorial-price" translate="no">≈ US${product['sourceCny']/6.7046:.2f}</p><p>Catalog ID: <span translate="no">{product['id']}</span></p><a href="{product['url']}" target="_blank" rel="noopener noreferrer">Check listing and options <span>↗</span></a></div></article>''')
    return '<div class="editorial-product-grid">' + ''.join(cards) + '</div><p class="editorial-price-note">USD product references checked 5 October 2026, using the 2 October 2026 reference rate of 6.7046 CNY per USD. Shipping and other charges are excluded. Selected variants and checkout conversion can change the payable amount. Catalog titles identify listings; they do not establish authenticity or product performance.</p>'


def body_markup(key):
    soup = parse((SOURCE / (key + '.html')).read_text())
    for node in soup.select('[data-products]'):
        node.replace_with(parse(product_markup(key)))
    for i, section in enumerate(soup.find_all('section',recursive=False), 1):
        index = soup.new_tag('span', attrs={'class': 'longform-index'})
        index.string = f'{i:02d}'
        section.insert(0, index)
    return str(soup)


def append_style(soup):
    if not soup.select_one('link[href="/editorial-20261005.css"]'):
        soup.head.append(soup.new_tag('link', rel='stylesheet', href='/editorial-20261005.css'))
    for link in soup.select('header a[href$="/articles/"],footer a[href$="/articles/"]'):
        lang=soup.html.get('lang','en').split('-')[0]
        link.string={'en':'Buyer Guides','de':'Kaufratgeber','fr':"Guides d’achat",'es':'Guías de compra','it':"Guide all’acquisto"}.get(lang,'Buyer Guides')


def set_meta(soup, name, value, attribute='name'):
    node = soup.find('meta', attrs={attribute: name})
    if not node:
        node = soup.new_tag('meta', attrs={attribute: name})
        soup.head.append(node)
    node['content'] = value


def metadata(soup, slug, lang, title, description, published=DATE, image=None):
    url = ORIGIN + path_for(slug, lang)
    soup.title.string = title
    soup.html['lang'] = lang
    for name, value in [('description', description), ('twitter:title', title), ('twitter:description', description)]:
        set_meta(soup, name, value)
    for name, value in [('og:title', title), ('og:description', description), ('og:url', url), ('og:locale', {'en':'en_US','de':'de_DE','fr':'fr_FR','es':'es_ES','it':'it_IT'}[lang]), ('article:published_time', published), ('article:modified_time', DATE)]:
        set_meta(soup, name, value, 'property')
    for node in soup.select('meta[name="keywords"],link[rel="canonical"],link[hreflang]'):
        node.decompose()
    soup.head.append(soup.new_tag('link', rel='canonical', href=url))
    for target in LANGS + ['x-default']:
        soup.head.append(soup.new_tag('link', rel='alternate', hreflang=target, href=ORIGIN + path_for(slug, 'en' if target == 'x-default' else target)))
    if image:
        for node in soup.select('meta[property^="og:image"],meta[name^="twitter:image"]'):
            node.decompose()
        set_meta(soup, 'og:image', image, 'property')
        set_meta(soup, 'og:image:alt', title, 'property')
        set_meta(soup, 'twitter:image', image)
        set_meta(soup, 'twitter:image:alt', title)
    else:
        image = soup.find('meta', property='og:image')['content']
    for node in soup.select('script[type="application/ld+json"]'):
        node.decompose()
    organization = {'@type':'Organization','@id':ORIGIN+'/#editorial','name':'oopbuys.store Editorial Research Desk','url':ORIGIN+'/authors/editorial-research-desk/','logo':{'@type':'ImageObject','url':ORIGIN+'/oopbuy.png'}}
    graph = {'@context':'https://schema.org','@graph':[
        organization,
        {'@type':'Article','@id':url+'#article','headline':title,'description':description,'datePublished':published,'dateModified':DATE,'inLanguage':lang,'mainEntityOfPage':url,'image':image,'author':{'@id':ORIGIN+'/#editorial'},'publisher':{'@id':ORIGIN+'/#editorial'}},
        {'@type':'BreadcrumbList','itemListElement':[
            {'@type':'ListItem','position':1,'name':tr('Home',lang),'item':ORIGIN+prefix(lang)+'/'},
            {'@type':'ListItem','position':2,'name':tr('Buyer guides',lang),'item':ORIGIN+prefix(lang)+'/articles/'},
            {'@type':'ListItem','position':3,'name':title,'item':url}]}]}
    node = soup.new_tag('script', type='application/ld+json')
    node.string = json.dumps(graph, ensure_ascii=False, separators=(',',':'))
    soup.head.append(node)
    append_style(soup)


def new_article(key, lang):
    data = MANIFEST[key]
    template = 'oopbuy-shipping-calculator-estimate'
    soup = parse(original(path_for(template, lang).lstrip('/') + 'index.html'))
    title, description = tr(data['title'], lang), tr(data['description'], lang)
    image_category = 'hoodies-sweaters' if key == 'hoodies' else key
    image = next((p['image'] for p in PRODUCTS if p['category'] == image_category), ORIGIN+'/oopbuy.png')
    metadata(soup, data['slug'], lang, title, description, image=image)
    for node in soup.select('link[rel="preload"][as="image"]'):
        if node.get('href') != '/oopbuy.png':
            node.decompose()
    for a in soup.select('.language-popover a[href]'):
        a['href'] = a['href'].replace(template, data['slug'])
    hero = soup.select_one('.inner-hero')
    hero.h1.string = title
    hero.select_one('.breadcrumbs strong').string = tr(data['category'], lang)
    hero.select_one('.section-kicker').string = tr(data['category']+' · 8 min read', lang)
    hero.select_one('.shell > p:not(.section-kicker)').string = description
    hero.select_one('.article-byline-card > span').string = tr('Written and researched by', lang)
    soup.select_one('.article-date-card').clear()
    soup.select_one('.article-date-card').append(localize('<span>Published and updated</span><strong>5 October 2026</strong>',lang))
    fact = soup.select_one('.article-fact-card')
    fact.select_one('strong').string = tr('Research note', lang)
    fact.p.string = tr('Catalog links, titles and first images checked 5 October 2026. Measurement and packing advice is practical guidance; no physical product testing is claimed.' if key != 'fees' else 'The worked USD budget is illustrative. Confirm actual fees, eligible routes and payment amounts in your order before spending.', lang)
    keycard = soup.select_one('.article-key-card ul')
    keycard.clear()
    for item in data['takeaways']:
        li = soup.new_tag('li'); li.string = tr(item,lang); keycard.append(li)
    body = soup.select_one('.longform')
    body.clear()
    body.append(localize(body_markup(key),lang))
    toc = soup.new_tag('nav', attrs={'class':'article-toc','aria-label':tr('On this page',lang)})
    strong = soup.new_tag('strong'); strong.string = tr('On this page',lang); toc.append(strong)
    ul = soup.new_tag('ul')
    for sec in body.select('section[id]'):
        li = soup.new_tag('li'); a=soup.new_tag('a',href='#'+sec['id']);a.string=sec.h2.get_text();li.append(a);ul.append(li)
    toc.append(ul);soup.select_one('.article-key-card').insert_after(toc)
    related = '<section class="editorial-related"><h2>Continue your comparison</h2><ul>'
    for other in MANIFEST.values():
        if other['slug'] != data['slug']:
            related += f'<li><a href="/articles/{other["slug"]}/">{html.escape(other["title"])}</a></li>'
    related += '</ul><p><a href="/articles/">Browse all 18 buyer guides</a></p></section>'
    body.append(localize(related,lang))
    OUTPUT[path_for(data['slug'],lang).lstrip('/')+'index.html'] = str(soup)


OLD_UPDATES = {
 'oopbuy-spreadsheet-guide-2026': ('spreadsheet-update', 'How to Use an OOPBUY Spreadsheet: Step-by-Step Guide', 'Learn how to check OOPBUY spreadsheet links, choose variants, compare size charts, review QC and budget the full delivered cost before ordering.'),
 'oopbuy-shipping-calculator-estimate': ('shipping-update', 'OOPBUY Shipping Calculator: Weight, Volume & Cost', 'Estimate OOPBUY shipping using packed weight, dimensions and route rules. Follow a worked dimensional-weight example and build a complete haul budget.'),
 'oopbuy-size-chart-shoes-clothing-measurements': ('size-update', 'OOPBUY Size Chart: Shoe, Hoodie & Jacket Measurements', 'Compare OOPBUY shoe and clothing size charts with foot length, chest, sleeve and layering measurements, then request useful warehouse checks.')
}


def update_old(slug, lang):
    file = path_for(slug,lang).lstrip('/')+'index.html'
    soup = parse(original(file))
    source,title,description = OLD_UPDATES[slug]
    existing = []
    for node in soup.select('script[type="application/ld+json"]'):
        data=json.loads(node.string)
        existing += data.get('@graph',[data])
    published = next((g.get('datePublished') for g in existing if g.get('@type')=='Article'),'2026-09-05')
    metadata(soup,slug,lang,tr(title,lang),tr(description,lang),published)
    soup.select_one('h1').string = tr(title,lang)
    soup.select_one('.inner-hero .shell > p:not(.section-kicker)').string = tr(description,lang)
    body=soup.select_one('.longform')
    newsection=localize((SOURCE/(source+'.html')).read_text(),lang)
    if source=='spreadsheet-update':
        body.select('section')[0].replace_with(newsection)
    elif source=='shipping-update':
        body.select('section')[3].insert_after(newsection)
    else:
        # Preserve the dated source note, remove the redundant question/answer block.
        faq=body.select('section')[-1]
        record=faq.select_one('.source-record')
        if record:
            newsection.select_one('section').append(copy.copy(record))
        faq.replace_with(newsection)
    for i,section in enumerate(body.select(':scope > section'),1):
        if 'research-record' in section.get('class',[]):continue
        index=section.select_one('.longform-index')
        if not index:
            index=soup.new_tag('span',attrs={'class':'longform-index'});section.insert(0,index)
        index.string=f'{i:02d}'
    dates=soup.select('.article-date-card strong')
    if len(dates)>1: dates[-1].string=tr('5 October 2026',lang)
    # Dated research notes remain untouched: an editorial revision is not a new policy verification.
    OUTPUT[file]=str(soup)


def article_card(data, lang, index, home=False):
    title=html.escape(tr(data['title'],lang));description=html.escape(tr(data['description'],lang))
    url=path_for(data['slug'],lang)
    if home:
        return f'<article><span class="article-index">{index:02d}</span><p>{html.escape(tr(data["category"],lang))}</p><h3>{title}</h3><span>{description}</span><a href="{url}">{html.escape(tr("Read guide",lang))} <i>→</i></a></article>'
    bullets=''.join('<li>'+html.escape(tr(x,lang))+'</li>' for x in data['takeaways'])
    return f'<article><div class="article-card-top"><span>{index:02d}</span><em>{html.escape(tr("8 min read",lang))}</em></div><p>{html.escape(tr(data["category"],lang))}</p><h2>{title}</h2><div>{description}</div><ul>{bullets}</ul><a href="{url}">{html.escape(tr("Read guide",lang))} <span>→</span></a></article>'


def update_discovery(lang):
    path=prefix(lang).lstrip('/')
    path=path+'/' if path else ''
    soup=parse(original(path+'index.html'))
    section=soup.select_one('.journal-section')
    section['data-editorial-version']='20261005'
    section.select_one('.section-heading--split > p').string=tr('Four new guides for shoes, hoodies, jackets and total haul cost. Explore all 18 articles in the complete buyer-guide directory.',lang)
    grid=section.select_one('.article-grid');grid.clear();grid['class']=['article-grid','editorial-home-grid']
    for i,data in enumerate(MANIFEST.values(),1):grid.append(parse(article_card(data,lang,i,True)))
    cta=soup.new_tag('p',attrs={'class':'editorial-directory-link'});a=soup.new_tag('a',href=prefix(lang)+'/articles/',attrs={'class':'button button--dark'});a.string=tr('Browse all 18 buyer guides',lang)+' →';cta.append(a);grid.insert_after(cta)
    append_style(soup);OUTPUT[path+'index.html']=str(soup)
    soup=parse(original(path+'articles/index.html'))
    soup.h1.string=tr('18 OOPBUY guides for finds, fit, QC and shipping.',lang)
    soup.select_one('.inner-hero .shell > p:not(.section-kicker)').string=tr('Choose a category guide to compare products, or follow the measurement, QC and cost guides before ordering. New articles include practical examples and clearly dated product references.',lang)
    soup.title.string=tr('18 OOPBUY Guides: Shoes, Hoodies, Jackets & Haul Costs',lang)
    set_meta(soup,'description',tr('Explore 18 OOPBUY guides covering shoe, hoodie and jacket finds, size charts, QC photos, shipping estimates and total haul costs.',lang))
    for name,value in [('og:title',soup.title.string),('og:description',soup.find('meta',attrs={'name':'description'})['content'])]:set_meta(soup,name,value,'property')
    set_meta(soup,'twitter:title',soup.title.string)
    set_meta(soup,'twitter:description',soup.find('meta',attrs={'name':'description'})['content'])
    grid=soup.select_one('.article-directory-grid')
    cards=[copy.copy(a) for a in grid.select(':scope > article')]
    grid.clear()
    for i,data in enumerate(MANIFEST.values(),1):grid.append(parse(article_card(data,lang,i)))
    for i,card in enumerate(cards,5):
        top=card.select_one('.article-card-top')
        if not top:
            for old_index in card.select('.article-index'):old_index.decompose()
            top=soup.new_tag('div',attrs={'class':'article-card-top'})
            number=soup.new_tag('span');top.append(number);card.insert(0,top)
        top.select_one('span').string=f'{i:02d}'
        if not card.h2 and card.h3:card.h3.name='h2'
        for old_desc in card.find_all('span',recursive=False):old_desc.name='div'
        for slug,(_,title,desc) in OLD_UPDATES.items():
            if card.select_one(f'a[href$="/{slug}/"]'):
                card.h2.string=tr(title,lang)
                for d in card.find_all('div',recursive=False):
                    if 'article-card-top' not in d.get('class',[]):d.string=tr(desc,lang)
        grid.append(card)
    collection={'@context':'https://schema.org','@type':'CollectionPage','url':ORIGIN+prefix(lang)+'/articles/','name':soup.title.string,'inLanguage':lang,'mainEntity':{'@type':'ItemList','numberOfItems':18,'itemListElement':[
        {'@type':'ListItem','position':i,'name':card.h2.get_text(' ',strip=True),'url':ORIGIN+card.select_one('a[href]')['href']}
        for i,card in enumerate(grid.select(':scope > article'),1)]}}
    schema=soup.new_tag('script',type='application/ld+json');schema.string=json.dumps(collection,ensure_ascii=False,separators=(',',':'));soup.head.append(schema)
    append_style(soup);OUTPUT[path+'articles/index.html']=str(soup)
    soup=parse(original(path+'categories/index.html'))
    content='<section class="editorial-category-guides"><h2>Compare fit and costs before choosing a product</h2><p>Use these category guides to build a shortlist, check the selected option and plan warehouse measurements. Product cards link to matching detail pages.</p><ul>'
    for data in MANIFEST.values():content+=f'<li><a href="/articles/{data["slug"]}/">{html.escape(data["title"])}</a></li>'
    content+='</ul></section>'
    soup.select_one('main > .shell').append(localize(content,lang));append_style(soup);OUTPUT[path+'categories/index.html']=str(soup)


def sitemap():
    ns='http://www.sitemaps.org/schemas/sitemap/0.9';xh='http://www.w3.org/1999/xhtml'
    ET.register_namespace('',ns);ET.register_namespace('xhtml',xh)
    root=ET.fromstring(original('sitemap.xml'))
    for node in root.findall('{'+ns+'}url'):
        loc=node.find('{'+ns+'}loc').text
        file=urlparse(loc).path.lstrip('/')+'index.html'
        if file in OUTPUT:
            last=node.find('{'+ns+'}lastmod')
            if last is None:last=ET.SubElement(node,'{'+ns+'}lastmod')
            last.text=DATE
    for data in MANIFEST.values():
        for lang in LANGS:
            node=ET.SubElement(root,'{'+ns+'}url')
            ET.SubElement(node,'{'+ns+'}loc').text=ORIGIN+path_for(data['slug'],lang)
            for target in LANGS+['x-default']:
                ET.SubElement(node,'{'+xh+'}link',{'rel':'alternate','hreflang':target,'href':ORIGIN+path_for(data['slug'],'en' if target=='x-default' else target)})
            ET.SubElement(node,'{'+ns+'}lastmod').text=DATE
    ET.indent(root)
    OUTPUT['sitemap.xml']='<?xml version="1.0" encoding="UTF-8"?>\n'+ET.tostring(root,encoding='unicode')+'\n'


def render(write=False):
    OUTPUT.clear()
    for lang in LANGS:
        for key in MANIFEST:new_article(key,lang)
        for slug in OLD_UPDATES:update_old(slug,lang)
        update_discovery(lang)
    sitemap()
    if write:
        unresolved={lang:len(values) for lang,values in MISSING.items() if values}
        if unresolved:raise RuntimeError(f'Missing translations: {unresolved}')
        for path,value in OUTPUT.items():
            dest=SITE/path;dest.parent.mkdir(parents=True,exist_ok=True);dest.write_text(value)
        print(f'Wrote {len(OUTPUT)} pages and sitemap',flush=True)


def request_translation(text, lang):
    for attempt in range(5):
        try:
            response=requests.get('https://translate.googleapis.com/translate_a/single',params={'client':'gtx','sl':'en','tl':lang,'dt':'t','q':text},timeout=45)
            response.raise_for_status()
            return ''.join(row[0] or '' for row in response.json()[0])
        except Exception:
            if attempt==4:raise
            time.sleep(min(2**attempt,8))


def translate_language(lang):
    pending=sorted(MISSING[lang]);batches=[];batch=[];size=0
    for value in pending:
        if size+len(value)>3600 and batch:batches.append(batch);batch=[];size=0
        batch.append(value);size+=len(value)+10
    if batch:batches.append(batch)
    for index,batch in enumerate(batches,1):
        joined='\n\n§§§\n\n'.join(batch)
        result=request_translation(joined,lang)
        parts=re.split(r'\s*§\s*§\s*§\s*',result)
        if len(parts)!=len(batch):parts=[request_translation(value,lang) for value in batch]
        with LOCK:
            CACHE.setdefault(lang,{}).update({key:value.strip() for key,value in zip(batch,parts)})
            CACHE_PATH.write_text(json.dumps(CACHE,ensure_ascii=False,indent=2)+'\n')
        print(f'{lang}: translation batch {index}/{len(batches)}',flush=True)


if __name__=='__main__':
    parser=argparse.ArgumentParser();parser.add_argument('--translate',action='store_true');args=parser.parse_args()
    render()
    print('Missing translation strings:',{lang:len(values) for lang,values in MISSING.items()},flush=True)
    if args.translate:
        with ThreadPoolExecutor(max_workers=4) as pool:list(pool.map(translate_language,LANGS[1:]))
        for values in MISSING.values():values.clear()
    render(write=True)
