"""Apply the November editorial update to the checked-in, static, five-language site."""
import json
import re
from copy import deepcopy
from pathlib import Path
from xml.etree import ElementTree as XML

from lxml import etree, html

HERE = Path(__file__).resolve().parent
SITE = HERE.parents[2] / 'kakobuys-shop'
ORIGIN = 'https://kakobuys.shop'
DATE = '2026-11-03'
LANGS = ('en', 'de', 'fr', 'es', 'it')
CAP = 'new-era-caps-kakobuy-sizing-qc'
SHIP = 'kakobuy-shipping-cost-estimate'
ASICS = 'asics-kakobuy-model-size-qc'
QC = 'how-to-find-kakobuy-qc-photos-before-buying'
BROKEN = 'kakobuy-product-link-not-working'
PREVIOUS_QC = 'how-to-read-kakobuy-qc-photos'
WEIDIAN = 'buy-from-weidian-with-kakobuy'
UPDATED = dict(zip(LANGS, ['Updated 3 November 2026', 'Aktualisiert am 3. November 2026', 'Mis à jour le 3 novembre 2026', 'Actualizado el 3 de noviembre de 2026', 'Aggiornato il 3 novembre 2026']))
published = dict(zip(LANGS, ['3 November 2026', '3. November 2026', '3 novembre 2026', '3 de noviembre de 2026', '3 novembre 2026']))
reference = dict(zip(LANGS, ['Reference prices', 'Richtpreise', 'Prix indicatifs', 'Precios orientativos', 'Prezzi indicativi']))
ui = json.loads((HERE / 'refresh.json').read_text())
content = {QC: json.loads((HERE / 'qc.json').read_text()), BROKEN: json.loads((HERE / 'second.json').read_text())}
touched = set()

def path(lang, route=''):
    return '/' + '/'.join(part for part in [lang if lang != 'en' else '', route.strip('/'), ''] if part) + ('/' if lang != 'en' or route else '')

def article(lang, slug):
    return path(lang, 'articles/' + slug)

def read(url):
    return html.document_fromstring((SITE / url.strip('/') / 'index.html').read_text())

def write(url, doc):
    dest = SITE / url.strip('/') / 'index.html'
    dest.parent.mkdir(exist_ok=True, parents=True)
    dest.write_text(html.tostring(doc, encoding='unicode', doctype='<!DOCTYPE html>') + '\n')
    touched.add(url)

def node(parent, tag, text=None, **attrs):
    el = etree.SubElement(parent, tag, attrib=attrs)
    el.text = text
    return el

def one(doc, xpath):
    return doc.xpath(xpath)[0]

def replace_text(el, value):
    for child in list(el):
        el.remove(child)
    el.text = value

def remove(el):
    el.getparent().remove(el)

def set_json(el, data):
    el.text = json.dumps(data, ensure_ascii=False).replace('</', '<\\/')

def metadata(doc, title, desc):
    one(doc, '//title').text = title + ' | Kakobuys.shop'
    for el in doc.xpath('//meta[@name="description" or @property="og:description" or @name="twitter:description"]'):
        el.set('content', desc)
    for el in doc.xpath('//meta[@property="og:title" or @name="twitter:title"]'):
        el.set('content', title)

def insert_panel(parent, key, heading=None, first=False):
    for old in parent.xpath('./*[@data-edit=$key]', key=key):
        remove(old)
    panel = node(parent, 'section', **{'data-edit':key, 'class':'kb-editorial-panel'})
    if first:
        parent.insert(0, panel)
    if heading:
        node(panel, 'h2', heading)
    return panel

def links(parent, lang, routes):
    ul = node(parent, 'ul', **{'class':'kb-editorial-links'})
    for url, title in routes:
        node(node(ul,'li'), 'a', title, href=url)

def style(doc):
    if not doc.xpath('//link[@href="/assets/november-guides.css"]'):
        node(one(doc,'//head'),'link',rel='stylesheet',href='/assets/november-guides.css')

def add_related(doc, lang, routes, parent):
    panel = insert_panel(parent,'related-guides',ui[lang]['relatedHeading'])
    links(panel, lang, routes)
    style(doc)

def enrich(lang, slug, title, desc, new=False):
    url = article(lang,slug)
    template = article(lang,CAP) if new else url
    doc = read(template)
    style(doc)
    metadata(doc, title, desc)
    one(doc,'//h1').text = title
    one(doc,'//main//h1/following-sibling::p[1]').text = desc
    byline = one(doc,'//*[@class="article-byline"]')
    body = one(doc,'//article[contains(concat(" ",@class," ")," prose ")]')
    c = ui[lang]
    if new:
        entry = content[slug][lang]
        # Retarget the local article shell, including every language switch.
        for el in doc.xpath('//*[@href or @content]'):
            for attr in ['href','content']:
                val=el.get(attr,'')
                if '/articles/' + CAP + '/' in val:
                    el.set(attr, val.replace('/articles/'+CAP+'/', '/articles/'+slug+'/'))
        for el in doc.xpath('//meta[@name="keywords"]|//meta[@property="og:image"]'):
            remove(el)
        for el in doc.xpath('//meta[@property="article:published_time"]'):
            el.set('content', DATE+'T00:00:00Z')
        one(doc,'//main//p[@class="kicker"]').text = c['articlesLabel']
        for el in list(byline)[1:]:
            remove(el)
        node(byline, 'time', published[lang], datetime=DATE)
        replace_text(body,None)
        for section in entry['sections']:
            node(body,'h2',section['h'])
            for paragraph in section['p']:
                p=node(body,'p',paragraph)
                if slug==QC and 'KakoFind QC Finder' in paragraph and not body.xpath('.//a[contains(@href,"kakofind.net")]'):
                    before,after=paragraph.split('KakoFind QC Finder',1)
                    p.text=before
                    node(p,'a','KakoFind QC Finder',href=content[slug]['sources'][0]['url']).tail=after
                if slug==BROKEN and '/products/6045/' in paragraph:
                    before,after=paragraph.split('/products/6045/',1)
                    p.text=before
                    local_product=path(lang,'products/6045')
                    node(p,'a',local_product,href=local_product).tail=after
        node(body,'h2',c['sourcesLabel'])
        sources=node(body,'ul')
        for src in content[slug]['sources']:
            href=src['url']
            label=src['label']
            if href.startswith(ORIGIN+'/'):
                from urllib.parse import urlsplit
                href=path(lang,urlsplit(href).path)
                local=SITE / href.strip('/') / 'index.html'
                if local.exists():
                    label=one(read(href),'//h1').text_content().strip()
            node(node(sources,'li'),'a',label,href=href)
        sidebar=one(doc,'//aside');replace_text(sidebar,None)
        node(sidebar,'h2',c['relatedHeading'])
        routes = [(article(lang,PREVIOUS_QC),one(read(article(lang,PREVIOUS_QC)),'//h1').text_content()),(article(lang,ASICS),c['asicsLabel'])] if slug==QC else [(article(lang,WEIDIAN),one(read(article(lang,WEIDIAN)),'//h1').text_content()),(path(lang,'products/6045'), 'Shoes · ID 7721490300' if lang=='en' else 'ID 7721490300')]
        links(sidebar,lang,routes+[(path(lang,'articles'),c['articlesLabel'])])
    else:
        for old in byline.xpath('.//*[@class="nov-date" or @class="october-date"]'):
            remove(old)
        node(byline,'time',UPDATED[lang],datetime=DATE,**{'class':'nov-date'})
        panel=insert_panel(body,'answer',c['capHeading' if slug==CAP else 'shippingHeading'],first=True)
        if slug==CAP:
            node(panel,'p',c['capIntro'])
            wrapper=node(panel,'div',**{'class':'kb-table-wrap'})
            table=node(wrapper,'table'); header=node(node(table,'thead'),'tr')
            for label in c['capHeaders']:node(header,'th',label,scope='col')
            tbody=node(table,'tbody')
            for row in c['capRows']:
                tr=node(tbody,'tr')
                node(node(tr,'th',scope='row'),'a',row[0],href='#item-'+row[0])
                for value in row[1:]:node(tr,'td',value)
            for fig in body.xpath('.//figure'):
                ids=fig.xpath('.//figcaption/p[1]/span/text()')
                if ids:fig.set('id','item-'+ids[0])
            node(panel,'p',c['capAfter'])
            node(panel,'a',c['sizeChartLabel'],href=ui['sizeChartUrl'])
        else:
            node(panel,'p',c['shippingIntro'])
            node(panel,'a',c['estimatorLabel'],href=ui['estimatorUrl'])
            ol=node(panel,'ol')
            for step in c['shippingSteps']:node(ol,'li',step)
            node(panel,'p',c['shippingExample'])
    for el in doc.xpath('//meta[@property="article:modified_time"]'):
        el.set('content',DATE+'T00:00:00Z')
    for el in doc.xpath('//script[@type="application/ld+json"]'):
        obj=json.loads(el.text)
        if obj.get('@type')=='Article':
            obj.update(headline=title,description=desc,dateModified=DATE,wordCount=len(' '.join(body.itertext()).split()))
            if new:
                obj.update(datePublished=DATE,mainEntityOfPage=ORIGIN+url)
                obj.pop('image',None)
        if obj.get('@type')=='BreadcrumbList':
            obj['itemListElement'][-1].update(name=title,item=ORIGIN+url)
        set_json(el,obj)
    write(url,doc)

def library(lang, c):
    url=path(lang,'articles'); doc=read(url)
    listing=one(doc,'//*[@class="expanded-article-library"]')
    for el in listing.xpath('./article[@data-november]'):remove(el)
    for slug in (BROKEN,QC):
        entry=content[slug][lang]; card=html.Element('article',{'class':'expanded-article-card','data-november':slug})
        node(card,'p',published[lang],**{'class':'kicker'})
        node(node(card,'h2'),'a',entry['title'],href=article(lang,slug))
        node(card,'p',entry['description'])
        listing.insert(0,card)
    for card in listing.xpath('./article'):
        href=one(card,'.//a').get('href')
        if href in (article(lang,CAP),article(lang,SHIP)):
            key='cap' if href==article(lang,CAP) else 'shipping'
            one(card,'.//h2').text=c[key+'Title']
            ps=card.xpath('.//p[not(@class="kicker")]')
            if ps:ps[0].text=c[key+'Description']
        nums=card.xpath('.//*[@class="card-number"]')
        if nums:nums[0].text=f"{listing.index(card)+1:02}"
    items=[{'@type':'ListItem','position':i,'url':ORIGIN+one(card,'.//a').get('href'),'name':one(card,'.//h2').text_content()} for i,card in enumerate(listing.xpath('./article'),1)]
    n=len(items)
    heading=one(doc,'//*[@class="article-library-summary"]//h2')
    heading.text=re.sub(r'\d+',str(n),heading.text,count=1)
    one(doc,'//main//h1/following-sibling::p[1]').text=c['articleHubIntro']
    metadata(doc,one(doc,'//h1').text_content(),c['articleHubIntro'])
    for el in doc.xpath('//script[@type="application/ld+json"]'):
        data=json.loads(el.text)
        if data.get('@type')=='CollectionPage':
            data['mainEntity'].update(numberOfItems=n,itemListElement=items);set_json(el,data)
    write(url,doc)
    return n

def homepage(lang,c,n):
    url=path(lang);doc=read(url)
    metadata(doc,c['homeTitle'],c['homeDescription'])
    replace_text(one(doc,'//h1'),c['homeHeading'])
    one(doc,'//*[@class="hero-lede"]').text=c['homeIntro']
    links_to_hub=doc.xpath('//main//a[@href=$url]',url=path(lang,'articles'))
    for el in links_to_hub:
        if el.text:el.text=re.sub(r'\b25\b',str(n),el.text)
    hero=one(doc,'//*[@class="hero-copy"]')
    for el in hero.xpath('./*[@data-edit="finds"]'):remove(el)
    box=node(hero,'div',**{'data-edit':'finds','class':'kb-hero-picks'})
    hero.insert(hero.index(one(hero,'./form'))+1,box)
    for slug,label in [(ASICS,c['asicsLabel']),(CAP,c['newEraLabel'])]:
        f=one(read(article(lang,slug)),'//figure')
        image=one(f,'.//img')
        item=one(f,'.//figcaption/p/span').text
        price=one(f,'.//figcaption/p[2]/span').text
        a=node(box,'a',href=article(lang,slug)+'#item-'+item)
        node(a,'img',src=image.get('src'),alt='',width='48',height='48',decoding='async')
        t=node(a,'span');node(t,'strong',label)
        node(t,'small',reference[lang]+' · '+price+' · ID '+item)
    for card in doc.xpath('//article[contains(@class,"october-card")][.//a[@href=$u]]',u=article(lang,CAP)):
        one(card,'.//h3').text=c['capTitle']
        one(card,'.//*[@class="october-description"]').text=c['capDescription']
    panel=insert_panel(one(doc,'//section[contains(@class,"wash-section")]//div[contains(@class,"article-grid")]/..'),'discovery',c['relatedHeading'])
    links(panel,lang,[(article(lang,QC),c['qcLabel']),(article(lang,BROKEN),content[BROKEN][lang]['title']),(article(lang,SHIP),c['shippingLabel'])])
    style(doc);write(url,doc)

def update_sitemap():
    ns='http://www.sitemaps.org/schemas/sitemap/0.9'; xn='http://www.w3.org/1999/xhtml'
    XML.register_namespace('',ns);XML.register_namespace('xhtml',xn)
    tree=XML.parse(SITE/'sitemap.xml'); root=tree.getroot()
    loc='{'+ns+'}loc';lm='{'+ns+'}lastmod'
    entries={u.findtext(loc):u for u in root}
    for url in sorted(touched):
        key=ORIGIN+url
        if key not in entries:
            # Preserve the established sitemap policy for product-detail pages.
            if '/products/' in url:continue
            entry=XML.SubElement(root,'{'+ns+'}url')
            XML.SubElement(entry,loc).text=key
            XML.SubElement(entry,lm)
            route=re.sub('^/(de|es|fr|it)/','/',url)
            for lang in (*LANGS,'x-default'):
                XML.SubElement(entry,'{'+xn+'}link',rel='alternate',hreflang=lang,href=ORIGIN+path('en' if lang=='x-default' else lang,route))
            entries[key]=entry
        entries[key].find(lm).text=DATE
    XML.indent(tree,space='  ');tree.write(SITE/'sitemap.xml',encoding='utf-8',xml_declaration=True)

for lang in LANGS:
    c=ui[lang]
    for slug in (QC,BROKEN):
        d=content[slug][lang];enrich(lang,slug,d['title'],d['description'],new=True)
    for slug,key in [(CAP,'cap'),(SHIP,'shipping')]:
        enrich(lang,slug,c[key+'Title'],c[key+'Description'])
    u=article(lang,ASICS);doc=read(u)
    for f in doc.xpath('//figure'):
        ids=f.xpath('.//figcaption/p[1]/span/text()')
        if ids:f.set('id','item-'+ids[0])
    add_related(doc,lang,[(article(lang,QC),c['qcLabel'])],one(doc,'//article[@class="prose"]'));write(u,doc)
    n=library(lang,c);homepage(lang,c,n)
    for route, targets in [
        ('guides', [QC,BROKEN]),('articles/'+PREVIOUS_QC,[QC]),('articles/'+WEIDIAN,[BROKEN]),
        ('articles/buy-from-1688-with-kakobuy',[BROKEN]),('catalog/headwear',[CAP,QC]),
        ('products/5971',[CAP,QC]),('products/6045',[QC,BROKEN])
    ]:
        url=path(lang,route);doc=read(url)
        parent=one(doc,'//article[contains(@class,"kb-detail-copy")]' if route.startswith('products/') else '//article[@class="prose" or starts-with(@class,"prose ")]')
        if route=='catalog/headwear':
            intro=one(doc,'//main//h1/following-sibling::p[1]');replace_text(intro,c['headwearIntro'])
        names={QC:c['qcLabel'],BROKEN:content[BROKEN][lang]['title'],CAP:c['newEraLabel']}
        add_related(doc,lang,[(article(lang,s),names[s]) for s in targets],parent)
        write(url,doc)
update_sitemap()
topic_map=SITE/'.seo/topic-map.json'
mapping=json.loads(topic_map.read_text());mapping['lastReviewed']=DATE
for slug,key in [(QC,'find Kakobuy QC photos before buying'),(BROKEN,'Kakobuy product link not working')]:
    url=ORIGIN+article('en',slug)
    mapping['entries']=[x for x in mapping['entries'] if x['url']!=url]
    mapping['entries'].append({'url':url,'primaryQuery':key,'intent':content[slug]['en']['description']})
topic_map.write_text(json.dumps(mapping,indent=2,ensure_ascii=False)+'\n')
print(f'Updated {len(touched)} pages in {len(LANGS)} languages')
