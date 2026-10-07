#!/usr/bin/env python3
"""Rebuild the October articles in the verified, hydration-free static site.

The committed root documents are the production baseline. The legacy Next
source predates the repair and contains truncated files; it is not used here.
Run with Python 3 and requirements-maintenance.txt installed. No network calls.
"""
from pathlib import Path
from html import escape as esc
from urllib.parse import urlparse
import json
import re
import xml.etree.ElementTree as ET
from bs4 import BeautifulSoup

ROOT = Path(__file__).resolve().parents[1]
DATE = '2026-10-07'
DOMAIN = 'https://usfanss.uk'
LANGS = ['en', 'de', 'fr', 'es', 'it', 'pl']
NAMES = {'en':'English','de':'Deutsch','fr':'Français','es':'Español','it':'Italiano','pl':'Polski'}
COPY = {
 'en': ['Buying Guides','Product Finds','USFans Buying Guides: Shipping, QC and Orders','USFans Product Finds','USFans Product Categories','Read guide','Published','Updated','On this page','Sources checked','Related guides','Independent buying guide','English guide'],
 'de': ['Kaufratgeber','Produktfunde','USFans Kaufratgeber: Versand, QC und Bestellungen','USFans Produktfunde','USFans Produktkategorien','Ratgeber lesen','Veröffentlicht','Aktualisiert','Auf dieser Seite','Geprüfte Quellen','Weitere Ratgeber','Unabhängiger Kaufratgeber','Ratgeber auf Englisch'],
 'fr': ["Guides d’achat",'Sélection produits',"Guides USFans : livraison, QC et commandes",'Sélection de produits USFans','Catégories de produits USFans','Lire le guide','Publié','Mis à jour','Sur cette page','Sources vérifiées','Guides associés',"Guide d’achat indépendant",'Guide en anglais'],
 'es': ['Guías de compra','Productos','Guías USFans: envío, QC y pedidos','Productos USFans','Categorías de productos USFans','Leer guía','Publicado','Actualizado','En esta página','Fuentes comprobadas','Guías relacionadas','Guía de compra independiente','Guía en inglés'],
 'it': ['Guide agli acquisti','Prodotti','Guide USFans: spedizione, QC e ordini','Prodotti USFans','Categorie di prodotti USFans','Leggi la guida','Pubblicato','Aggiornato','In questa pagina','Fonti verificate','Guide correlate','Guida indipendente agli acquisti','Guida in inglese'],
 'pl': ['Poradniki zakupowe','Produkty','Poradniki USFans: wysyłka, QC i zamówienia','Produkty USFans','Kategorie produktów USFans','Czytaj poradnik','Opublikowano','Aktualizacja','Na tej stronie','Sprawdzone źródła','Powiązane poradniki','Niezależny poradnik zakupowy','Poradnik po angielsku'],
}
OLD_LABELS = {
 'SEO Articles':0,'SEO articles':0,'SEO-Ratgeber':0,'Articles SEO':0,'articles SEO':0,
 'Artículos SEO':0,'Articoli SEO':0,'Artykuły SEO':0,
 'Product Tags':1,'Produkt-Tags':1,'Étiquettes':1,'Etiquetas':1,'Etichette':1,'Etykiety':1,
}
NEW_SLUGS = ['usfans-size-guide-uk','usfans-payment-failed-uk','usfans-order-received-not-in-warehouse']

def route(slug, lang):
 return ('' if lang=='en' else '/'+lang)+'/articles/'+slug+'/'

def parse(value):
 return BeautifulSoup(value, 'html.parser')

def set_meta(soup, key, value, prop=False):
 attr = 'property' if prop else 'name'
 tag = soup.find('meta', attrs={attr:key})
 if tag is None:
  tag=soup.new_tag('meta', attrs={attr:key});soup.head.append(tag)
 tag['content']=value

def set_title(soup, title, description=None):
 soup.title.string=title
 set_meta(soup,'og:title',title,True);set_meta(soup,'twitter:title',title)
 if description:
  set_meta(soup,'description',description);set_meta(soup,'og:description',description,True);set_meta(soup,'twitter:description',description)

def main_words(data):
 text=data['intro']+' '+' '.join(x['heading']+' '+' '.join(x['paragraphs']) for x in data['sections'])
 return len(re.findall(r"\b[\w]+(?:['’-][\w]+)*\b",text))

DATA = {}
for file in sorted((ROOT/'content/2026-10').glob('*.json')):
 data=json.loads(file.read_text()); DATA[(data['slug'],data['lang'])]=data
 if data['new'] and data['lang']=='en':
  assert 1200<=main_words(data)<=1800, (file,main_words(data))

def title_for(slug,lang):
 data=DATA.get((slug,lang)) or DATA.get((slug,'en'))
 if data:return data['title']
 file=ROOT/(route(slug,lang).lstrip('/')+'index.html')
 if not file.exists():file=ROOT/(route(slug,'en').lstrip('/')+'index.html')
 return parse(file.read_text()).h1.get_text()

def body(data):
 lang=data['lang'];c=COPY[lang];slug=data['slug'];parts=[]
 for i,sec in enumerate(data['sections'],1):
  text=''.join('<p>'+esc(p)+'</p>' for p in sec['paragraphs'])
  if 'table' in sec:
   table=sec['table'];text+='<table class="guide-table"><thead><tr>'+''.join('<th scope="col">'+esc(h)+'</th>' for h in table['headers'])+'</tr></thead><tbody>'
   for row in table['rows']:
    text+='<tr>'+''.join(('<th scope="row">'+esc(v)+'</th>') if j==0 else '<td>'+esc(v)+'</td>' for j,v in enumerate(row))+'</tr>'
   text+='</tbody></table>'
  parts.append(f'<section id="section-{i}"><span>{i:02}</span><h2>{esc(sec["heading"])}</h2><div>{text}</div></section>')
 toc='<nav class="article-toc" aria-label="'+c[8]+'"><b>'+c[8]+'</b><ol>'+''.join(f'<li><a href="#section-{i}">{esc(sec["heading"])}</a></li>' for i,sec in enumerate(data['sections'],1))+'</ol></nav>'
 related=[]
 for other in dict.fromkeys(data['related']):
  target_lang=lang if (other,lang) in DATA or (ROOT/(route(other,lang).lstrip('/')+'index.html')).exists() else 'en'
  related.append(f'<p><a href="{route(other,target_lang)}" data-track="article_internal_click" data-article="{other}" data-placement="related_guides">{esc(title_for(other,target_lang))}</a></p>')
 source='<section class="article-sources"><h2>'+c[9]+' · '+DATE+'</h2>'
 for item in data['sources']:
  source+='<p><cite>'+esc(item['label'])+'</cite></p>'
 source+='</section>' if data['sources'] else '</section>'
 if not data['sources']:source=''
 disclosure=('Independent guidance; this website does not operate USFans or process your USFans orders. Service details can change. Check your current order and the official help entry before acting.' if lang=='en' else 'Guida indipendente: questo sito non gestisce USFans né elabora i tuoi ordini USFans. I servizi possono cambiare. Verifica il tuo ordine attuale e la voce ufficiale di assistenza prima di agire.')
 return f'''<article class="article-page" data-article="{slug}">
 <header class="article-hero section-wrap"><a href="{'/' if lang=='en' else '/'+lang+'/'}articles/">← {c[0]}</a><small>{c[6]} {data['published']} · {c[7]} {DATE} · {max(6,round(main_words(data)/180))} min</small><h1>{esc(data['title'])}</h1><p>{esc(data['intro'])}</p>{toc}</header>
 <div class="article-layout section-wrap"><aside><img src="{data['image']}" alt="" width="520" height="520" loading="lazy"/><span>{c[11]}</span></aside><div class="article-body">{''.join(parts)}
 <div class="article-disclaimer"><p>{disclosure}</p></div>{source}<section class="related-guides"><h2>{c[10]}</h2><div>{''.join(related)}</div></section>SEARCH_SLOT</div></div></article>'''

for (slug,lang),data in DATA.items():
 soup=parse((ROOT/f'templates/article-{lang}.html').read_text())
 canonical=DOMAIN+route(slug,lang)
 soup.html['lang']=lang;soup.select_one('main')['lang']=lang
 set_title(soup,data['title'],data['description'])
 for tag in soup.select('link[rel="canonical"],link[rel="alternate"][hreflang]'):tag.decompose()
 soup.head.append(soup.new_tag('link',rel='canonical',href=canonical))
 equivalents=[]
 for code in LANGS:
  if (slug,code) in DATA or (ROOT/(route(slug,code).lstrip('/')+'index.html')).exists():equivalents.append(code)
 for code in equivalents+['x-default']:
  soup.head.append(soup.new_tag('link',rel='alternate',hreflang=code,href=DOMAIN+route(slug,'en' if code=='x-default' else code)))
 menu=soup.select_one('.language-menu');menu.clear()
 for code in equivalents:
  a=soup.new_tag('a',href=route(slug,code),hreflang=code,attrs={'class':'active' if code==lang else ''});a.string=code.upper()+' '+NAMES[code];menu.append(a)
 set_meta(soup,'og:url',canonical,True);set_meta(soup,'og:type','article',True)
 set_meta(soup,'article:published_time',data['published'],True);set_meta(soup,'article:modified_time',DATE,True)
 template=parse((ROOT/('' if lang=='en' else lang)/'articles/usfans-spreadsheet-guide/index.html').read_text())
 form=str(template.select_one('form.boarding-pass'))
 article=parse(body(data).replace('SEARCH_SLOT',form)).article
 slot=soup.find(string=lambda text:text and 'ARTICLE_SLOT' in text);assert slot is not None;slot.replace_with(article)
 schema=[{'@context':'https://schema.org','@type':'Article','headline':data['title'],'description':data['description'],'url':canonical,'mainEntityOfPage':{'@type':'WebPage','@id':canonical},'inLanguage':lang,'datePublished':data['published'],'dateModified':DATE,'image':DOMAIN+data['image'],'author':{'@type':'Organization','name':'USFanss.uk'},'citation':[x['url'] for x in data['sources']]}, {'@context':'https://schema.org','@type':'BreadcrumbList','itemListElement':[{'@type':'ListItem','position':1,'name':'USFanss.uk','item':DOMAIN+('/' if lang=='en' else '/'+lang+'/')},{'@type':'ListItem','position':2,'name':COPY[lang][0],'item':DOMAIN+('/' if lang=='en' else '/'+lang+'/')+'articles/'},{'@type':'ListItem','position':3,'name':data['title'],'item':canonical}]}]
 for item in schema:
  tag=soup.new_tag('script',type='application/ld+json');tag.string=json.dumps(item,ensure_ascii=False).replace('<','\\u003c');soup.head.append(tag)
 dest=ROOT/(route(slug,lang).lstrip('/')+'index.html');dest.parent.mkdir(parents=True,exist_ok=True);dest.write_text(str(soup).rstrip()+'\n')

def make_card(slug,lang,placement):
 actual=lang if (slug,lang) in DATA else 'en';data=DATA[(slug,actual)];c=COPY[lang]
 language_note='' if actual==lang else ' · '+c[12]
 date_label=c[6] if data['new'] else c[7]
 return parse(f'''<a class="article-card" href="{route(slug,actual)}" data-track="article_internal_click" data-article="{slug}" data-placement="{placement}"><div class="article-image"><img src="{data['image']}" width="520" height="520" loading="lazy" alt=""/></div><small>{date_label} {DATE}{language_note}</small><h3 lang="{actual}">{esc(data['title'])}</h3><b>{c[5]} ↗</b></a>''').a

for lang in LANGS:
 pre='' if lang=='en' else lang+'/'
 for is_home in [True,False]:
  path=ROOT/(pre+('index.html' if is_home else 'articles/index.html'));soup=parse(path.read_text())
  grid=soup.select_one('.articles-home .article-grid' if is_home else '.articles-page .article-grid');assert grid is not None
  if is_home:
   grid.clear()
   for slug in NEW_SLUGS:grid.append(make_card(slug,lang,'home_article_cards'))
   # Keep a fourth localized shipping article so the strongest existing page remains prominent.
   shipping='usfans-shipping-cost-guide';actual=lang
   if (shipping,actual) not in DATA:
    original=ROOT/(pre+'articles/'+shipping+'/index.html');sp=parse(original.read_text())
    card=parse(f'<a class="article-card" href="{route(shipping,actual)}" data-track="article_internal_click" data-article="{shipping}" data-placement="home_article_cards"><div class="article-image"><img src="/products/crewneck.webp" width="520" height="520" loading="lazy" alt=""/></div><small>{COPY[lang][0]}</small><h3>{esc(sp.h1.get_text())}</h3><b>{COPY[lang][5]} ↗</b></a>').a
   else:card=make_card(shipping,lang,'home_article_cards')
   grid.append(card)
   heading=soup.select_one('.articles-home h2');heading.string=COPY[lang][0]
  else:
   for a in list(grid.select('a.article-card')):
    if a.get('data-article') in NEW_SLUGS:a.decompose()
   for slug in reversed(NEW_SLUGS):grid.insert(0,make_card(slug,lang,'article_cards'))
   soup.h1.string=COPY[lang][2];set_title(soup,COPY[lang][2])
  path.write_text(str(soup).rstrip()+'\n')

def public_html():
 for path in ROOT.rglob('*.html'):
  rel=path.relative_to(ROOT)
  if any(p.startswith('.') or p in {'templates','node_modules','dist','content'} for p in rel.parts):continue
  yield path

for path in public_html():
 soup=parse(path.read_text());lang=soup.html.get('lang','en');c=COPY.get(lang,COPY['en'])
 for node in list(soup.find_all(string=True)):
  if node.parent.name in {'script','style'}:continue
  key=str(node).strip()
  if key in OLD_LABELS:node.replace_with(c[OLD_LABELS[key]])
 # Update all cards pointing at an improved article, including older inbound cards.
 for a in soup.select('a.article-card[data-article]'):
  slug=a['data-article'];target=urlparse(a['href']).path
  loc=target.strip('/').split('/')[0];loc=loc if loc in LANGS else 'en'
  if (slug,loc) in DATA and a.h3:a.h3.string=DATA[(slug,loc)]['title']
 for form in soup.select('form[action="https://cnfanshp.com/search.html"]'):
  form['data-track']='main_search_submit'
  if not form.get('data-placement'):form['data-placement']='home_search' if soup.select_one('.hero') else 'catalog_search'
  field=form.select_one('[name="keywords"]')
  if field:field['maxlength']='120'
 for a in soup.select('a[href]'):
  url=urlparse(a['href'])
  if url.hostname=='cnfanshp.com' and not a.get('data-track'):
   a['data-track']='main_product_click' if '/AllProducts/' in url.path else 'main_category_click';a['data-placement']='catalog'
 # Correct the homepage heading and metadata while preserving all modules.
 rel=path.relative_to(ROOT).as_posix();core=rel.removeprefix(lang+'/') if lang!='en' else rel
 if core=='index.html' and lang=='en':
  set_title(soup,'USFans Spreadsheet UK | Product Finds, QC & Shipping','Browse USFans product finds, compare approximate USD prices and use practical guides for sizing, QC, payments and UK shipping.')
  hero=soup.select_one('.hero h1')
  if hero:hero.clear();hero.append('USFans Spreadsheet,');hero.append(soup.new_tag('br'));span=soup.new_tag('em');span.string='finds for UK buyers.';hero.append(span)
 if core in ['products/index.html','categories/index.html']:
  title=c[3] if core.startswith('products') else c[4];set_title(soup,title)
  if soup.h1:soup.h1.string=title
 if not soup.select_one('link[href="/seo-guides.css"]'):soup.head.append(soup.new_tag('link',rel='stylesheet',href='/seo-guides.css'))
 if not soup.select_one('script[src="/site-events.js"]'):soup.head.append(soup.new_tag('script',src='/site-events.js',defer=''))
 # Broken hydration was removed by the previous repair and must stay removed.
 assert not any('self.__next' in x.get_text() or '/_next/' in x.get('src','') for x in soup.select('script'))
 path.write_text(str(soup).rstrip()+'\n')

ns='http://www.sitemaps.org/schemas/sitemap/0.9';ET.register_namespace('',ns)
sm=ROOT/'sitemap.xml';tree=ET.parse(sm);root=tree.getroot()
entries={x.find('{'+ns+'}loc').text:x for x in root}
for (slug,lang),data in DATA.items():
 url=DOMAIN+route(slug,lang)
 if url not in entries:
  entry=ET.SubElement(root,'{'+ns+'}url');ET.SubElement(entry,'{'+ns+'}loc').text=url;entries[url]=entry
 entry=entries[url];modified=entry.find('{'+ns+'}lastmod')
 if modified is None:modified=ET.SubElement(entry,'{'+ns+'}lastmod')
 modified.text=DATE
tree.write(sm,encoding='unicode',xml_declaration=True)
print('Rendered',len(DATA),'article pages; new English word counts:',{s:main_words(DATA[(s,'en')]) for s in NEW_SLUGS})
print('Sitemap entries:',len(entries))
