#!/usr/bin/env python3
"""Idempotent, scoped update of the current Git-tracked static publication.

This intentionally preserves post-July pages absent from the legacy generator.
Requires beautifulsoup4. Does not contact a remote service or publish by itself.
"""
from pathlib import Path
import argparse
import copy
import hashlib
import html
import json
import re
import xml.etree.ElementTree as ET
from urllib.parse import urlsplit, urlunsplit
from bs4 import BeautifulSoup

HERE = Path(__file__).resolve().parent
MANIFEST = json.loads((HERE / 'manifest.json').read_text())
DATE = MANIFEST['date']
BASE = 'https://sugargoos.de'
NEW = MANIFEST['articles']
NS = 'http://www.sitemaps.org/schemas/sitemap/0.9'
CHANGED = set()

def parse(text):
    return BeautifulSoup(text, 'html.parser')

def path(locale, relative=''):
    return ('/de/' if locale == 'de' else '/') + relative.strip('/') + ('/' if relative else '')

def node(markup):
    return parse(markup)

def read(root, locale, relative):
    return parse((root / path(locale, relative).lstrip('/') / 'index.html').read_text())

def put(root, locale, relative, soup):
    output = root / path(locale, relative).lstrip('/') / 'index.html'
    output.parent.mkdir(parents=True, exist_ok=True)
    for link in soup.select('a[href^="/"]'):
        parts = urlsplit(link['href'])
        if not parts.netloc and not parts.path.endswith('/') and (root / parts.path.lstrip('/') / 'index.html').is_file():
            link['href'] = urlunsplit(('', '', parts.path + '/', parts.query, parts.fragment))
    if soup.footer:
        for label in list(soup.footer.find_all(string=re.compile(r'^(Updated 30 July 2026|Aktualisiert am 30\. Juli 2026|Aktualisiert 30\. Juli 2026)$'))):
            label.replace_with('Redaktionell aktualisiert: 5. Oktober 2026' if locale == 'de' else 'Editorial update: 5 October 2026')
    text = str(soup)
    if not text.lower().startswith('<!doctype'):
        text = '<!DOCTYPE html>\n' + text
    output.write_text(text)
    CHANGED.add(path(locale, relative))

def meta(soup, name, content, attribute='name'):
    tag = soup.head.find('meta', attrs={attribute:name})
    if not tag:
        tag = soup.new_tag('meta', attrs={attribute:name})
        soup.head.append(tag)
    tag['content'] = content

def css(soup, classname='editorial-page'):
    classes = soup.body.get('class', [])
    if classname not in classes:
        soup.body['class'] = classes + [classname]
    if not soup.select_one('link[href="/editorial-20261005.css"]'):
        soup.head.append(soup.new_tag('link', rel='stylesheet', href='/editorial-20261005.css'))

def identity(soup, locale, relative, title, description):
    soup.html['lang'] = 'de-DE' if locale == 'de' else 'en'
    soup.title.string = title
    meta(soup,'description',description)
    meta(soup,'og:title',title,'property')
    meta(soup,'og:description',description,'property')
    meta(soup,'og:url',BASE+path(locale,relative),'property')
    for link in list(soup.select('link[rel="canonical"],link[hreflang]')):
        link.decompose()
    soup.head.append(soup.new_tag('link',rel='canonical',href=BASE+path(locale,relative)))
    for lang,loc in [('en','en'),('de-DE','de'),('x-default','en')]:
        soup.head.append(soup.new_tag('link',rel='alternate',hreflang=lang,href=BASE+path(loc,relative)))
    other = 'en' if locale == 'de' else 'de'
    for link in soup.select('header a[hreflang]'):
        link['href'] = path(other,relative)

def org():
    return {'@type':'Organization','name':'Sugargoos.de','url':BASE+'/', 'logo':BASE+'/images/sugargoo-logo.png'}

def schema(soup, locale, relative, title, description, published, modified=DATE):
    for tag in soup.select('script[type="application/ld+json"]'):
        tag.decompose()
    data = [
        {'@context':'https://schema.org','@type':'BlogPosting','headline':title,'description':description,
         'datePublished':published,'dateModified':modified,'inLanguage':'de-DE' if locale=='de' else 'en',
         'mainEntityOfPage':BASE+path(locale,relative), 'author':org(),'publisher':org()},
        {'@context':'https://schema.org','@type':'BreadcrumbList','itemListElement':[
            {'@type':'ListItem','position':1,'name':'Startseite' if locale=='de' else 'Home','item':BASE+path(locale)},
            {'@type':'ListItem','position':2,'name':'Artikel' if locale=='de' else 'Articles','item':BASE+path(locale,'articles')},
            {'@type':'ListItem','position':3,'name':title,'item':BASE+path(locale,relative)}]}
    ]
    for entry in data:
        tag=soup.new_tag('script',type='application/ld+json')
        tag.string=json.dumps(entry,ensure_ascii=False,separators=(',',':'))
        soup.head.append(tag)

def toc(article, locale):
    for old in article.select('nav.article-toc'):
        old.decompose()
    links=[]
    headings=article.find_all('h2')
    for i,h in enumerate(headings,1):
        if h.find_parent(class_='quick-answer') or h.find_parent(class_='source-note'):
            continue
        parent=h.parent if h.parent.name=='section' else h
        if not parent.get('id'):
            parent['id']='read-'+str(i)
        links.append('<li><a href="#'+html.escape(parent['id'])+'">'+html.escape(h.get_text(' ',strip=True))+'</a></li>')
    nav=node('<nav class="article-toc" aria-label="'+('Inhalt' if locale=='de' else 'Contents')+'"><h2>'+('In diesem Artikel' if locale=='de' else 'On this page')+'</h2><ol>'+''.join(links)+'</ol></nav>').nav
    quick=article.select_one('.quick-answer')
    if quick: quick.insert_after(nav)
    else: article.insert(0,nav)

def related(locale, pairs):
    return '<section class="related-reading"><h2>'+('Passende Anleitungen' if locale=='de' else 'Related guides')+'</h2><ul>'+''.join('<li><a href="'+path(locale,p)+'">'+html.escape(t)+'</a></li>' for p,t in pairs)+'</ul></section>'

def new_page(root,locale,item,content=None,published=DATE,checked=True):
    soup=read(root,locale,'articles/sugargoo-tracking-package-status')
    info=item[locale]; relative='articles/'+item['slug']
    identity(soup,locale,relative,info['seo_title'],info['description'])
    css(soup)
    source_items=''.join('<li>'+html.escape(s[0])+'</li>' for s in item.get('sources',[]))
    source_note=('Öffentliche Quellen am 5. Oktober 2026 geprüft. Beispiele und Prüflisten sind redaktionelle Hilfen; aktuelle Gebühren, Fristen und Verfügbarkeit im eigenen Konto bestätigen.' if locale=='de' else 'Public sources reviewed 5 October 2026. Examples and checklists are editorial guidance; confirm current fees, deadlines and availability in your own account.')
    if not checked:
        source_note='Vollständige deutsche Fassung am 5. Oktober 2026 ergänzt. Inhalt entspricht dem vorhandenen englischen Artikel mit Quellenprüfung vom 2. September 2026; aktuelle Linienbedingungen weiterhin im Konto prüfen.'
    body=(HERE/'content'/f'{item["key"]}.{locale}.html').read_text() if content is None else content
    main=node('<main id="main"><section class="page-hero"><div class="shell"><nav class="breadcrumbs" aria-label="Breadcrumb"><a href="'+path(locale)+'">'+('Startseite' if locale=='de' else 'Home')+'</a> / <a href="'+path(locale,'articles')+'">'+('Artikel' if locale=='de' else 'Articles')+'</a></nav><p class="eyebrow">'+('Aktualisiert am 5. Oktober 2026' if locale=='de' else 'Updated 5 October 2026')+'</p><h1>'+html.escape(info['title'])+'</h1><p>'+html.escape(info['description'])+'</p></div></section><section class="section"><div class="shell content-grid"><article class="prose">'+body+related(locale,info['related'])+'<section class="source-note"><h2>'+('Quellen und Prüfung' if locale=='de' else 'Sources and review')+'</h2><p>'+source_note+'</p><ul>'+source_items+'</ul></section></article><aside class="sidebar-card"><h2>'+('Den nächsten Schritt planen' if locale=='de' else 'Plan your next step')+'</h2><p>'+('Passende Anleitungen lesen und ausgewählte Artikel im aktuellen Katalog prüfen.' if locale=='de' else 'Use the related guides and verify shortlisted items in the current catalog.')+'</p><a class="button button-primary" href="'+path(locale,'finds')+'">'+('Finds ansehen' if locale=='de' else 'Browse finds')+'</a><a class="button button-ghost" href="'+path(locale,'articles')+'">'+('Alle Artikel' if locale=='de' else 'All articles')+'</a></aside></div></section></main>').main
    soup.main.replace_with(main)
    toc(soup.select_one('article.prose'),locale)
    schema(soup,locale,relative,info['title'],info['description'],published)
    put(root,locale,relative,soup)

UPDATES={
 'articles/sugargoo-tracking-package-status': {
  'en': ['Sugargoo Tracking: Find Your Number & Read Parcel Status','Find your Sugargoo tracking number, separate order and parcel statuses, and identify the correct carrier for delivery to Germany.', 'Start with your shipped parcel', ['Open the international parcel record, not the seller order.','Copy the named carrier number and any local delivery reference.','Read the last physical event before estimating the next step.'], 'tracking'],
  'de': ['Sugargoo-Sendungsverfolgung: Nummer und Paketstatus','Sugargoo-Sendungsnummer finden, Bestell- und Paketstatus unterscheiden und den richtigen Zusteller für Deutschland ermitteln.', 'Mit dem versendeten Paket beginnen',['Internationalen Paketdatensatz statt Verkäuferbestellung öffnen.','Versandnummer und vorhandene lokale Zustellreferenz speichern.','Letztes physisches Ereignis vor dem nächsten Schritt prüfen.'],'tracking']},
 'articles/sugargoo-payment-methods-germany': {
  'en':['Sugargoo Payment Methods Germany: Fees & Checkout','Compare Sugargoo payment methods shown at checkout, EUR totals, disclosed fees and refund routes for product and Germany parcel payments.','Compare the final checkout total',['Check the payment method offered for this specific transaction.','Record final currency, total and separately disclosed fees.','Keep product payment, balance top-up and parcel payment distinct.'],'payment'],
  'de':['Sugargoo-Zahlungsmethoden: Gebühren und Checkout','Aktuell angebotene Sugargoo-Zahlungsmethoden, EUR-Endbeträge, Gebühren und Erstattungswege für Waren- und Paketzahlungen vergleichen.','Den vollständigen Checkoutbetrag vergleichen',['Angebotene Zahlungsart für diesen konkreten Vorgang prüfen.','Endwährung, Gesamtbetrag und getrennte Gebühren notieren.','Warenzahlung, Aufladung und Paketzahlung unterscheiden.'],'payment']},
 'articles/sugargoo-spreadsheet-2026-complete-guide': {
  'en':['Sugargoo Spreadsheet: Check Links, Prices & Variants','Use a Sugargoo spreadsheet to verify live listings, product IDs, variants and prices, then review warehouse QC before planning shipping.','Check one spreadsheet row from start to finish',['Match the product ID and live destination to the saved row.','Select the exact size, colour and quantity before comparing prices.','Use your own warehouse photos for the keep-or-return decision.'],'qc'],
  'de':['Sugargoo Spreadsheet: Links, Preise und Varianten prüfen','Sugargoo-Spreadsheet nutzen: aktuelle Angebote, Produkt-IDs, Varianten und Preise prüfen, danach eigene Lagerfotos vor dem Versand bewerten.','Eine Spreadsheet-Zeile vollständig prüfen',['Produkt-ID und aktuelles Ziel mit dem gespeicherten Eintrag abgleichen.','Größe, Farbe und Menge vor dem Preisvergleich auswählen.','Eigene Lagerfotos für die Behalten-oder-Rückgabe-Entscheidung verwenden.'],'qc']},
 'guides/sugargoo-qc-photos-guide': {
  'en':['Sugargoo QC Photos: Read and Compare Warehouse Images','Read Sugargoo warehouse QC photos, compare the selected variant and measurements, and identify the extra evidence needed before shipping.','Review evidence attached to your own item',['Match the warehouse item to the purchased variant.','Check the label, quantity and visible condition at full image size.','Request a specific missing angle or measurement before shipping.'],'qc'],
  'de':['Sugargoo-QC-Fotos: Lagerbilder prüfen und vergleichen','Sugargoo-Lagerfotos lesen, Variante und Maße vergleichen und benötigte Zusatznachweise vor dem internationalen Versand bestimmen.','Nachweise des eigenen Artikels prüfen',['Lagerartikel der gekauften Variante zuordnen.','Etikett, Menge und sichtbaren Zustand in voller Bildgröße prüfen.','Fehlenden Winkel oder konkrete Messung vor dem Versand anfordern.'],'qc']},
 'guides/w2c-and-qc-explained': {
  'en':['Sugargoo W2C Links and QC Photos: A Practical Guide','Understand W2C product links, seller previews and warehouse QC. Follow a clear path from a live listing to your own received-item evidence.','Keep three records separate',['W2C identifies where a listing can be checked.','A seller or spreadsheet photo describes a reference listing.','Your warehouse photo set documents the item received for your order.'],'qc'],
  'de':['Sugargoo W2C und QC: Links und Lagerfotos verstehen','W2C-Produktlinks, Verkäuferbilder und Lager-QC unterscheiden: vom aktuellen Angebot zum Nachweis des eigenen Wareneingangs.','Drei Nachweise getrennt halten',['W2C benennt die Stelle zur Prüfung eines Angebots.','Verkäufer- und Spreadsheet-Bilder zeigen Referenzangebote.','Eigene Lagerfotos dokumentieren den Eingang der eigenen Bestellung.'],'qc']},
 'guides/sugargoo-spreadsheet-safety': {
  'en':['Sugargoo Spreadsheet Safety: Verify a Find Before Ordering','Check a Sugargoo spreadsheet find for matching IDs, current variants, dated prices and usable evidence before placing an order.','Use a verification checklist',['Compare saved and live product IDs.','Check the price for the selected option, not just the cheapest listing figure.','Keep listing evidence separate from warehouse inspection.'],'qc'],
  'de':['Sugargoo Spreadsheet sicher nutzen: Finds vor Kauf prüfen','Produkt-IDs, aktuelle Varianten, datierte Preise und Nachweise eines Sugargoo-Spreadsheet-Funds vor der Bestellung prüfen.','Mit einer Prüfliste arbeiten',['Gespeicherte und aktuelle Produkt-ID abgleichen.','Preis der ausgewählten Option statt des niedrigsten Angebotswerts prüfen.','Angebotsnachweise von Lagerkontrolle trennen.'],'qc']}
}

def update_existing(root,locale,relative,info):
    soup=read(root,locale,relative)
    title,description,heading,steps,target=info
    identity(soup,locale,relative,title,description)
    css(soup)
    soup.main.h1.string=title
    article=soup.select_one('article.prose') or soup.select_one('.article-body')
    assert article is not None,relative
    for old in article.select('[data-release="20261005"]'):
        old.decompose()
    extra=next(a for a in NEW if a['key']==target)
    block='<section class="quick-answer" data-release="20261005"><h2>'+html.escape(heading)+'</h2><ol>'+''.join('<li>'+html.escape(s)+'</li>' for s in steps)+'</ol><p><a href="'+path(locale,'articles/'+extra['slug'])+'">'+html.escape(extra[locale]['title'])+'</a></p></section>'
    article.insert(0,node(block).section)
    note='Practical steps and related reading updated 5 October 2026. Original source-review dates remain identified below.' if locale=='en' else 'Praxisschritte und weiterführende Inhalte am 5. Oktober 2026 aktualisiert. Ursprüngliche Quellenprüfungen bleiben unten datiert.'
    article.insert(0,node('<p class="editorial-update" data-release="20261005">'+note+'</p>').p)
    toc(article,locale)
    for tag in soup.select('script[type="application/ld+json"]'):
        try: data=json.loads(tag.string or tag.get_text())
        except ValueError: continue
        def revise(d):
            if isinstance(d,list):
                for x in d: revise(x)
            elif isinstance(d,dict):
                if d.get('@type') in ['Article','BlogPosting','NewsArticle']:
                    d.update(headline=title,description=description,dateModified=DATE)
                    d['publisher']=org()
                for value in list(d.values()):
                    if isinstance(value,(list,dict)):revise(value)
        revise(data);tag.string=json.dumps(data,ensure_ascii=False,separators=(',',':'))
    put(root,locale,relative,soup)

def card(locale,item):
    i=item[locale]
    return node('<article class="article-card" data-release="20261005"><span class="tag">'+('Praktische Anleitung' if locale=='de' else 'Practical guide')+'</span><h3>'+html.escape(i['title'])+'</h3><p>'+html.escape(i['description'])+'</p><a href="'+path(locale,'articles/'+item['slug'])+'">'+('Artikel lesen' if locale=='de' else 'Read article')+'</a></article>').article

def indexes(root,locale,consolidation):
    for relative in ['','articles']:
        soup=read(root,locale,relative)
        css(soup,'home-editorial' if not relative else 'editorial-page')
        grids=soup.select('.article-grid');assert grids
        grid=grids[-1]
        for old in grid.select('[data-release="20261005"]'):
            old.decompose()
        if not relative:
            grid.clear()
            for item in NEW:grid.append(card(locale,item))
            stat=soup.select('.stat')
            if len(stat)>2:
                stat[2].strong.string='19'
                stat[2].span.string='Artikel und 5 Anleitungen' if locale=='de' else 'articles plus 5 guides'
            hero=soup.select_one('.hero-copy')
            if not hero.select_one('.intent-links'):
                choices=[('articles/sugargoo-tracking-package-status','Sendungsverfolgung' if locale=='de' else 'Track a parcel'),('guides/sugargoo-qc-photos-guide','QC-Fotos' if locale=='de' else 'Check QC photos'),('articles/sugargoo-payment-methods-germany','Zahlungsmethoden' if locale=='de' else 'Compare payments'),('articles/sugargoo-shipping-calculator-germany-eu','Versandkosten' if locale=='de' else 'Estimate shipping')]
                hero.append(node('<nav class="intent-links" aria-label="'+('Schnelleinstieg' if locale=='de' else 'Quick guides')+'">'+''.join('<a href="'+path(locale,p)+'">'+t+'</a>' for p,t in choices)+'</nav>').nav)
        else:
            for item in reversed(NEW):grid.insert(0,card(locale,item))
            if locale=='de' and not grid.select_one('a[href="'+path(locale,'articles/'+consolidation['slug'])+'"]'):
                grid.append(card(locale,consolidation))
        # Keep cards aligned with the corrected page titles and descriptions.
        for existing in grid.select('.article-card'):
            a=existing.find('a',href=True)
            if not a:continue
            rel=a['href'].removeprefix('/de/').strip('/') if locale=='de' else a['href'].strip('/')
            if rel in UPDATES:
                title,desc,*_=UPDATES[rel][locale]
                existing.h3.string=title
                if existing.p:existing.p.string=desc
        for text in list(soup.find_all(string=re.compile(r'^SEO[ -](research|Recherche)$'))):
            text.replace_with('Praktische Anleitung' if locale=='de' else 'Practical guide')
        if relative:
            meta(soup,'description','19 practical Sugargoo articles on tracking, QC, payments and Germany shipping, with separate step-by-step guides.' if locale=='en' else '19 praktische Sugargoo-Artikel zu Tracking, QC, Zahlungen und Versand nach Deutschland sowie separate Schritt-für-Schritt-Anleitungen.')
        put(root,locale,relative,soup)

def sitemaps(root):
    canonical=[]
    for f in sorted(root.rglob('index.html')):
        soup=parse(f.read_text()); link=soup.select_one('link[rel="canonical"]')
        robots=soup.find('meta',attrs={'name':'robots'})
        if link and (not robots or 'noindex' not in robots.get('content','')):
            canonical.append(link['href'])
    old_dates={}
    for url in ET.parse(root/'sitemap-main.xml').getroot().findall('{'+NS+'}url'):
        old_dates[url.findtext('{'+NS+'}loc')]=url.findtext('{'+NS+'}lastmod')
    ET.register_namespace('',NS)
    doc=ET.Element('{'+NS+'}urlset')
    for url in sorted(set(canonical)):
        u=ET.SubElement(doc,'{'+NS+'}url');ET.SubElement(u,'{'+NS+'}loc').text=url
        ET.SubElement(u,'{'+NS+'}lastmod').text=DATE if url.removeprefix(BASE) in CHANGED else old_dates.get(url,'2026-07-30')
    content=ET.tostring(doc,encoding='unicode',xml_declaration=True)+'\n'
    for name in ['sitemap.xml','sitemap-main.xml','sitemap-pages.xml']:(root/name).write_text(content)
    (root/'sitemap.txt').write_text('\n'.join(sorted(set(canonical)))+'\n')
    index=ET.parse(root/'sitemap-index.xml')
    for el in index.getroot().iter('{'+NS+'}lastmod'):el.text=DATE
    index.write(root/'sitemap-index.xml',encoding='utf-8',xml_declaration=True)

def run(root):
    assert (root/'articles/sugargoo-dhl-germany-tracking-handover/index.html').exists(), 'Use current complete static output; the July legacy build is incomplete.'
    (root/'editorial-20261005.css').write_text((HERE/'editorial.css').read_text())
    for item in NEW:
        for locale in ['en','de']:new_page(root,locale,item)
    consolidation={'key':'consolidation','slug':'sugargoo-consolidate-split-parcels-germany-eu','de':{
        'title':'Sugargoo-Konsolidierung für Deutschland: Pakete zusammenlegen oder aufteilen',
        'seo_title':'Sugargoo-Konsolidierung: Pakete zusammenlegen oder teilen',
        'description':'Paketgruppen für Deutschland und die EU anhand von Linienzulässigkeit, Außenmaßen, Abrechnungsgewicht und Schutzbedarf vergleichen.',
        'related':[['articles/sugargoo-shipping-calculator-germany-eu','Versandkosten schätzen'],['articles/sugargoo-volumetric-weight-explained','Volumengewicht prüfen'],['articles/sugargoo-rehearsal-shipping-cost','Rehearsal und Endkosten vergleichen']]},
        'sources':[['Sugargoo — Öffentliche Kauf-, Konsolidierungs- und Versandrechnerhinweise','']]}
    new_page(root,'de',consolidation,published=DATE,checked=False)
    for relative,info in UPDATES.items():
        for locale in ['en','de']:update_existing(root,locale,relative,info[locale])
    for locale in ['en','de']:indexes(root,locale,consolidation)
    # Repair the existing English page's formerly missing language counterpart.
    soup=read(root,'en','articles/'+consolidation['slug'])
    identity(soup,'en','articles/'+consolidation['slug'],soup.title.get_text(),soup.find('meta',attrs={'name':'description'})['content'])
    put(root,'en','articles/'+consolidation['slug'],soup)
    sitemaps(root)
    print(json.dumps({'changed_canonical_pages':len(CHANGED),'new_topics':len(NEW),'articles_en':len(list((root/'articles').glob('*/index.html'))),'articles_de':len(list((root/'de/articles').glob('*/index.html')))},indent=2))

if __name__=='__main__':
    parser=argparse.ArgumentParser();parser.add_argument('site',type=Path)
    args=parser.parse_args();run(args.site.resolve())
