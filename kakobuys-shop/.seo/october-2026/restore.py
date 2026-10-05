from pathlib import Path
from bs4 import BeautifulSoup
import json, re, copy, xml.etree.ElementTree as ET

ROOT=Path(__file__).resolve().parents[2];WORK=Path(__file__).resolve().parent
O='https://kakobuys.shop';DATE='2026-10-05';LANGS=['en','de','es','fr','it']
def soup(s):return BeautifulSoup(s,'html.parser')
data=json.loads((WORK/'restore-locales.json').read_text());data.update(json.loads((WORK/'restore-romance.json').read_text()))
ns='http://www.sitemaps.org/schemas/sitemap/0.9';xn='http://www.w3.org/1999/xhtml'
ET.register_namespace('',ns);ET.register_namespace('xhtml',xn)
tree=ET.parse(ROOT/'sitemap.xml');root=tree.getroot();existing={u.find('{'+ns+'}loc').text:u for u in root}
for lang,articles in data.items():
 for slug,a in articles.items():
  source=soup((ROOT/'articles'/slug/'index.html').read_text())
  s=soup((ROOT/lang/'articles/new-era-caps-kakobuy-sizing-qc/index.html').read_text())
  s.h1.string=a['title'];s.title.string=a['title']+' | Kakobuys.shop';s.select_one('.article-description').string=a['description']
  for m in s.select('meta[property="og:title"]'):m['content']=a['title']
  for m in s.select('meta[name=description],meta[property="og:description"]'):m['content']=a['description']
  for m in s.select('meta[name=keywords]'):m.decompose()
  for m in s.select('meta[property="og:image"]'):m.decompose()
  content=s.select_one('article.prose');content.clear();content.extend(list(soup(a['body']).contents))
  for link in content.select('a[href^="/"]'):link['href']='/'+lang+link['href']
  pub='2026-09-05' if 'shipping-time' in slug else '2026-09-04'
  labels={'de':f'Original: {pub} · Übersetzung: 05.10.2026','es':f'Original: {pub} · Traducción: 05/10/2026','fr':f'Original : {pub} · Traduction : 05/10/2026','it':f'Originale: {pub} · Traduzione: 05/10/2026'}
  spans=s.select('.article-byline span');spans[1].string=labels[lang]
  s.select_one('.page-hero .kicker').string={'de':'Versandplanung','es':'Planificación del envío','fr':'Planification de livraison','it':'Pianificazione della spedizione'}[lang]
  spans[2].string={'de':'Unabhängiger Ratgeber','es':'Guía independiente','fr':'Guide indépendant','it':'Guida indipendente'}[lang]
  for j in s.select('script[type="application/ld+json"]'):j.decompose()
  url=O+'/'+lang+'/articles/'+slug+'/'
  schema={'@context':'https://schema.org','@type':'Article','headline':a['title'],'description':a['description'],'mainEntityOfPage':url,'datePublished':DATE,'dateModified':DATE,'inLanguage':lang,'translationOfWork':{'@type':'Article','url':O+'/articles/'+slug+'/','datePublished':pub},'wordCount':len(content.get_text(' ',strip=True).split()),'author':{'@type':'Organization','name':'Kakobuys.shop Research Desk'}}
  j=s.new_tag('script',type='application/ld+json');j.string=json.dumps(schema,ensure_ascii=False);s.head.append(j)
  for m in s.select('meta[property="article:published_time"],meta[property="article:modified_time"]'):m['content']=DATE+'T00:00:00Z'
  for m in s.select('link[rel=canonical]'):m['href']=url
  for m in s.select('meta[property="og:url"]'):m['content']=url
  for m in s.select('link[hreflang],.language-popover a[hreflang]'):
   l=m['hreflang'];pref='' if l in ['en','x-default'] else '/'+l;route=pref+'/articles/'+slug+'/'
   m['href']=O+route if m.name=='link' else route
  p=ROOT/lang/'articles'/slug/'index.html';p.parent.mkdir(parents=True,exist_ok=True);p.write_text(str(s))
  # Add previously missing older posts to the complete localized library.
  p=ROOT/lang/'articles/index.html';idx=soup(p.read_text());grid=idx.select_one('.expanded-article-library')
  for card in list(grid.select('article')):
   if any(slug in x.get('href','') for x in card.select('a')):card.decompose()
  card=soup('<article class="expanded-article-card"><span class="card-number"></span><p class="kicker"></p><h2></h2><p class="restored-description"></p><a class="button button-dark"></a></article>').article
  card.select_one('.card-number').string=str(len(grid.select('article'))+1);card.h2.string=a['title'];card.select_one('.kicker').string=s.select_one('.page-hero .kicker').text
  card.select_one('.restored-description').string=a['description'];card.a['href']='/'+lang+'/articles/'+slug+'/'
  card.a.string={'de':'Artikel lesen →','es':'Leer artículo →','fr':'Lire l’article →','it':'Leggi l’articolo →'}[lang]
  grid.append(card);p.write_text(str(idx))
  u=existing.get(url)
  if u is None:u=ET.SubElement(root,'{'+ns+'}url');ET.SubElement(u,'{'+ns+'}loc').text=url;ET.SubElement(u,'{'+ns+'}lastmod').text=DATE;existing[url]=u
  for x in list(u.findall('{'+xn+'}link')):u.remove(x)
  for l in LANGS+['x-default']:
   pref='' if l in ['en','x-default'] else '/'+l
   ET.SubElement(u,'{'+xn+'}link',{'rel':'alternate','hreflang':l,'href':O+pref+'/articles/'+slug+'/'})
ET.indent(tree,space='  ');tree.write(ROOT/'sitemap.xml',encoding='utf-8',xml_declaration=True)
print('Restored',sum(map(len,data.values())),'localized pages')
