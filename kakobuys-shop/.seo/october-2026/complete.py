from pathlib import Path
from bs4 import BeautifulSoup, NavigableString
from urllib.parse import urlparse
import json, re, copy, xml.etree.ElementTree as ET

ROOT=Path(__file__).resolve().parents[2]
WORK=Path(__file__).resolve().parent
ORIGIN='https://kakobuys.shop'
LANGS=['en','de','es','fr','it']
DATE='2026-10-05'
SLUGS=['new-era-caps-kakobuy-sizing-qc','asics-kakobuy-model-size-qc','oakley-kakobuy-finds-apparel-goggles','kakobuy-budget-finds-under-30']
OLD=['how-to-read-kakobuy-qc-photos','kakobuy-shipping-cost-estimate','kakobuy-shoes-spreadsheet-qc-guide']
COPY={
 'en': ['Home','Kakobuy Guides','Product research · October 2026','By Kakobuys.shop Research Desk','Published October 5, 2026','Independent listing research','Keep comparing','Match the item ID, selected size and current price before continuing.','Browse product categories →','Read the QC guide →','Plan parcel costs →','Marketplace item ID:','USD reference:','Open matching product →','Product names and source amounts checked October 5, 2026. USD references use the existing site conversion of 6.7663 source-currency units per dollar, not a live rate. Shipping and other charges are excluded. Images are source listing photos, not order QC.','Read article →','complete articles','Browse all {n} guides →','Kakobuy Finds & Guides: Products, QC and Shipping','Compare specific product listings, sizes, QC evidence and parcel costs. The full library contains {n} independent guides.','New product comparisons','Choose a product, check the fit and plan the parcel.','Use the product ID, selected option and current quote to keep your shortlist accurate.'],
 'de': ['Startseite','Kakobuy-Ratgeber','Produktrecherche · Oktober 2026','Von der Redaktion Kakobuys.shop','Veröffentlicht am 5. Oktober 2026','Unabhängige Angebotsrecherche','Weiter vergleichen','Artikelnummer, ausgewählte Größe und aktuellen Preis vor dem Fortfahren abgleichen.','Produktkategorien ansehen →','QC-Ratgeber lesen →','Paketkosten planen →','Marktplatz-Artikelnummer:','USD-Richtwert:','Passendes Produkt öffnen →','Produktnamen und Ausgangspreise am 5. Oktober 2026 geprüft. USD-Richtwerte verwenden den bisherigen Website-Faktor von 6,7663 Ausgangswährungseinheiten pro Dollar, keinen Livekurs. Versand und weitere Kosten sind nicht enthalten. Die Bilder stammen aus Angeboten, nicht aus der QC Ihrer Bestellung.','Artikel lesen →','vollständige Artikel','Alle {n} Ratgeber ansehen →','Kakobuy-Funde und Ratgeber: Produkte, QC und Versand','Konkrete Angebote, Größen, QC-Belege und Paketkosten vergleichen. Die Bibliothek enthält {n} unabhängige Ratgeber.','Neue Produktvergleiche','Produkt wählen, Passform prüfen und Paket planen.','Artikelnummer, ausgewählte Variante und aktuellen Kostenvoranschlag gemeinsam festhalten.'],
 'es': ['Inicio','Guías Kakobuy','Investigación de productos · Octubre de 2026','Por la redacción de Kakobuys.shop','Publicado el 5 de octubre de 2026','Investigación independiente de anuncios','Sigue comparando','Comprueba el identificador, la talla elegida y el precio actual antes de continuar.','Explorar categorías →','Leer la guía QC →','Planificar el envío →','Identificador del mercado:','Referencia en USD:','Abrir el producto correspondiente →','Nombres e importes de origen revisados el 5 de octubre de 2026. Las referencias USD utilizan la conversión existente de 6,7663 unidades de origen por dólar, no un cambio en tiempo real. No incluyen envío ni otros cargos. Las imágenes son del anuncio, no del QC de tu pedido.','Leer artículo →','artículos completos','Ver las {n} guías →','Productos y guías Kakobuy: selección, QC y envío','Compara anuncios concretos, tallas, pruebas QC y costes del paquete. La biblioteca contiene {n} guías independientes.','Nuevas comparaciones de productos','Elige el producto, revisa el ajuste y planifica el paquete.','Guarda juntos el identificador, la opción elegida y el presupuesto actual.'],
 'fr': ['Accueil','Guides Kakobuy','Recherche produits · Octobre 2026','Par la rédaction Kakobuys.shop','Publié le 5 octobre 2026','Recherche indépendante sur les annonces','Poursuivre la comparaison','Vérifiez l’identifiant, la taille choisie et le prix actuel avant de continuer.','Parcourir les catégories →','Lire le guide QC →','Prévoir les frais du colis →','Identifiant de la place de marché :','Référence en USD :','Ouvrir le produit correspondant →','Noms et prix sources vérifiés le 5 octobre 2026. Les références USD utilisent le taux existant du site de 6,7663 unités sources par dollar, et non un taux en direct. Le transport et les autres frais sont exclus. Les images proviennent des annonces, pas du QC de votre commande.','Lire l’article →','articles complets','Voir les {n} guides →','Trouvailles et guides Kakobuy : produits, QC et livraison','Comparez des annonces précises, les tailles, les éléments QC et les frais du colis. La bibliothèque contient {n} guides indépendants.','Nouvelles comparaisons de produits','Choisissez le produit, vérifiez la taille et préparez le colis.','Conservez ensemble l’identifiant, la variante choisie et le devis actuel.'],
 'it': ['Home','Guide Kakobuy','Ricerca prodotti · Ottobre 2026','A cura della redazione Kakobuys.shop','Pubblicato il 5 ottobre 2026','Ricerca indipendente sulle inserzioni','Continua il confronto','Verifica identificativo, taglia scelta e prezzo attuale prima di continuare.','Esplora le categorie →','Leggi la guida QC →','Pianifica i costi del pacco →','Identificativo del marketplace:','Riferimento in USD:','Apri il prodotto corrispondente →','Nomi e prezzi di origine verificati il 5 ottobre 2026. I riferimenti USD utilizzano la conversione esistente del sito di 6,7663 unità di origine per dollaro, non un cambio in tempo reale. Spedizione e altri costi sono esclusi. Le immagini provengono dalle inserzioni, non dal QC del tuo ordine.','Leggi l’articolo →','articoli completi','Vedi tutte le {n} guide →','Prodotti e guide Kakobuy: selezione, QC e spedizione','Confronta inserzioni precise, taglie, prove QC e costi del pacco. La raccolta contiene {n} guide indipendenti.','Nuovi confronti di prodotti','Scegli il prodotto, verifica la vestibilità e pianifica il pacco.','Conserva insieme identificativo, variante selezionata e preventivo attuale.']}

def soup(t): return BeautifulSoup(t,'html.parser')
def pre(l): return '' if l=='en' else '/'+l
def page(l,route): return ROOT/(l if l!='en' else '')/route/'index.html'
def setmeta(s,title,desc):
 s.title.string=title
 for x in s.select('meta[property="og:title"]'): x['content']=title
 for x in s.select('meta[name=description],meta[property="og:description"]'): x['content']=desc
def jsonld(s,d):
 j=s.new_tag('script',type='application/ld+json');j.string=json.dumps(d,ensure_ascii=False);s.head.append(j)
def fix_language(s,lang,route):
 s.html['lang']=lang
 for a in s.select('.language-popover a[hreflang]'):
  l=a['hreflang'];a['href']=pre(l)+route
  a.attrs.pop('aria-current',None)
  if l==lang: a['aria-current']='page'
 for a in s.select('link[hreflang]'):a.decompose()
 for l in LANGS+['x-default']:
  a=s.new_tag('link',rel='alternate',hreflang=l,href=ORIGIN+pre('en' if l=='x-default' else l)+route);s.head.append(a)
 for a in s.select('link[rel=canonical]'):a['href']=ORIGIN+pre(lang)+route
 for a in s.select('meta[property="og:url"]'):a['content']=ORIGIN+pre(lang)+route
def shared(s):
 if not s.select_one('link[href="/assets/october-guides.css"]'):
  x=s.new_tag('link',rel='stylesheet',href='/assets/october-guides.css');s.head.append(x)
 if not s.select_one('script[src^="/assets/analytics.js"]'):
  x=s.new_tag('script',src='/assets/analytics.js',defer=True);s.body.append(x)

changed=[]
# Restore same-page alternates now that the formerly missing translations exist.
for slug in ['kakobuy-holiday-shopping-timeline-stop-adding-items','kakobuy-shipping-time-how-long-does-delivery-take']:
 p=page('en','articles/'+slug);s=soup(p.read_text());fix_language(s,'en','/articles/'+slug+'/');p.write_text(str(s));changed.append(p)
for lang in LANGS:
 c=COPY[lang]
 for slug in SLUGS:
  p=page(lang,'articles/'+slug);s=soup(p.read_text());main=s.main
  mapping=dict(zip(COPY['en'][:15],c[:15]))
  for node in list(main.find_all(string=True)):
   t=str(node).strip()
   if t in mapping: node.replace_with(mapping[t])
  for j in s.select('script[type="application/ld+json"]'):
   d=json.loads(j.string)
   if d.get('@type')=='Article':
    d['wordCount']=len(s.select_one('article.prose').get_text(' ',strip=True).split())
    d['image']=s.select_one('.review-products img')['src']
    j.string=json.dumps(d,ensure_ascii=False)
  shared(s);fix_language(s,lang,'/articles/'+slug+'/');p.write_text(str(s));changed.append(p)
 for slug in OLD:
  p=page(lang,'articles/'+slug);s=soup(p.read_text());shared(s);fix_language(s,lang,'/articles/'+slug+'/');p.write_text(str(s));changed.append(p)

 for route in ['articles','']:
  p=page(lang,route);s=soup(p.read_text());home=route==''
  listing=s.select_one('.article-grid' if home else '.expanded-article-library')
  if home: listing.clear()
  else:
   for a in list(listing.select('article')):
    if any(slug in str(a) for slug in SLUGS):a.decompose()
  cards=[]
  for i,slug in enumerate(SLUGS):
   a=soup(page(lang,'articles/'+slug).read_text());title=a.h1.get_text(' ',strip=True);desc=a.select_one('meta[name=description]')['content']
   card=soup('<article class="october-card"><a class="october-card-image"><img width="420" height="420" loading="lazy"/></a><div class="october-card-copy"><p class="kicker"></p><h2></h2><p class="october-description"></p><a class="text-link"></a></div></article>').article
   card.select_one('.kicker').string=c[20]
   h=card.h2
   if home:h.name='h3'
   h.string=title;card.select_one('.october-description').string=desc
   img=a.select_one('.review-products img');card.img['src']=img['src'];card.img['alt']=img['alt']
   for link in card.select('a'):link['href']=pre(lang)+'/articles/'+slug+'/'
   card.select_one('.text-link').string=c[15];cards.append(card)
  for card in reversed(cards):listing.insert(0,card)
  n=len(list(page(lang,'articles').parent.glob('*/index.html')))
  if home:
   heading=s.select_one('.wash-section .section-heading')
   heading.h2.string=c[21];heading.select_one('.text-link').string=c[17].format(n=n)
   hero=s.select_one('.hero h1')
   # Preserve the homepage's established spreadsheet intent and product modules.
   if lang=='en':setmeta(s,'Kakobuy Spreadsheet 2026: Finds, Sizes & QC Guides','Browse Kakobuy product finds with item IDs, USD reference prices and size checks. Compare New Era, ASICS, Oakley and budget picks before shipping.')
  else:
   s.h1.string=c[18];setmeta(s,c[18]+' | Kakobuys.shop',c[19].format(n=n))
   s.select_one('.page-hero .shell > p:last-child').string=c[19].format(n=n)
   s.select_one('.article-library-summary h2').string=str(n)+' '+c[16]
   s.select_one('.article-library-summary > p').string=c[22]
   for x in s.select('script[data-october-list]'):x.decompose()
   items=[]
   for card in listing.select('article'):
    a=card.select_one('a[href]');h=card.select_one('h2,h3')
    if a and h:items.append({'@type':'ListItem','position':len(items)+1,'url':ORIGIN+a['href'],'name':h.get_text(' ',strip=True)})
   for x in s.select('script[type="application/ld+json"]'):
    try:
     if json.loads(x.string).get('@type') in ['ItemList','CollectionPage']:x.decompose()
    except Exception:pass
   jsonld(s,{'@context':'https://schema.org','@type':'CollectionPage','name':c[18],'url':ORIGIN+pre(lang)+'/articles/','inLanguage':lang,'mainEntity':{'@type':'ItemList','numberOfItems':len(items),'itemListElement':items}})
  shared(s);fix_language(s,lang,'/'+route+'/' if route else '/');p.write_text(str(s));changed.append(p)

# Add direct, localized routes from the QC/guide hub to the newly reviewed examples.
for lang in LANGS:
 p=page(lang,'guides');s=soup(p.read_text());c=COPY[lang]
 for x in s.select('.october-guide-links'):x.decompose()
 section=soup('<section class="october-guide-links"><h2></h2><p></p><ul></ul></section>').section
 section.h2.string=c[20];section.p.string=c[22]
 for slug in SLUGS:
  a=soup(page(lang,'articles/'+slug).read_text());li=s.new_tag('li');link=s.new_tag('a',href=pre(lang)+'/articles/'+slug+'/');link.string=a.h1.get_text(' ',strip=True);li.append(link);section.ul.append(li)
 target=s.select_one('article.prose') or s.main;target.insert(0,section)
 shared(s);fix_language(s,lang,'/guides/');p.write_text(str(s));changed.append(p)

# Preserve historic lastmod dates; use today's date only for changed/new pages.
ns='http://www.sitemaps.org/schemas/sitemap/0.9';xn='http://www.w3.org/1999/xhtml'
ET.register_namespace('',ns);ET.register_namespace('xhtml',xn)
tree=ET.parse(ROOT/'sitemap.xml');root=tree.getroot()
existing={u.find('{'+ns+'}loc').text:u for u in root}
for p in changed:
 path='/'+str(p.relative_to(ROOT)).removesuffix('index.html')
 url=ORIGIN+path
 u=existing.get(url)
 if u is None:u=ET.SubElement(root,'{'+ns+'}url');ET.SubElement(u,'{'+ns+'}loc').text=url;existing[url]=u
 lm=u.find('{'+ns+'}lastmod')
 if lm is None:lm=ET.SubElement(u,'{'+ns+'}lastmod')
 lm.text=DATE
 for a in list(u.findall('{'+xn+'}link')):u.remove(a)
 route=re.sub(r'^/(de|es|fr|it)(?=/|$)','',path)
 for l in LANGS+['x-default']:
  ET.SubElement(u,'{'+xn+'}link',{'rel':'alternate','hreflang':l,'href':ORIGIN+pre('en' if l=='x-default' else l)+route})
ET.indent(tree,space='  ');tree.write(ROOT/'sitemap.xml',encoding='utf-8',xml_declaration=True)
topic=json.loads((ROOT/'.seo/topic-map.json').read_text());topic['lastReviewed']=DATE
topic['entries']=[e for e in topic['entries'] if not any(slug in e['url'] for slug in SLUGS)]
for slug,query in zip(SLUGS,['new era cap kakobuy','asics kakobuy','kakobuy oakley','kakobuy budget finds']):
 topic['entries'].append({'url':ORIGIN+'/articles/'+slug+'/','primaryQuery':query,'intent':'specific product comparison','evidence':'Product record IDs and source photographs checked 2026-10-05; manufacturer measurement guidance; no purchase or wear testing','internalLinkRole':'connects category discovery with QC and parcel decisions'})
(ROOT/'.seo/topic-map.json').write_text(json.dumps(topic,ensure_ascii=False,indent=2)+'\n')
print('Finalized',len(changed),'pages;',len(existing),'sitemap URLs')
