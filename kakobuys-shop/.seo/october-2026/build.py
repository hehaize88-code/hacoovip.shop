from pathlib import Path
from bs4 import BeautifulSoup, NavigableString
import json,re,copy,math,hashlib,threading
ROOT=Path(__file__).resolve().parents[2]
WORK=Path(__file__).resolve().parent
DATE='2026-10-05'; ORIGIN='https://kakobuys.shop'
LANGS=['en','de','es','fr','it']
PRODUCTS={x['page']:x for x in json.load(open(WORK/'products.json'))}
ARTICLES=[
('new-era','new-era-caps-kakobuy-sizing-qc','New Era Caps on Kakobuy: Finds, Sizing and QC Checks','Compare three New Era cap records, fitted and adjustable sizing, exact item IDs and the QC checks to make before shipping.',['new era cap kakobuy','new era kakobuy','kakobuy caps']),
('asics','asics-kakobuy-model-size-qc','ASICS Kakobuy Finds: Model, Size and QC Comparison','Compare ASICS listing IDs, model descriptions, size evidence and pair-level QC before choosing your next shoe find.',['asics kakobuy','kakobuy asics spreadsheet','kakobuy asics shoes']),
('oakley','oakley-kakobuy-finds-apparel-goggles','Oakley Kakobuy Finds: Apparel, Goggles and Listing Checks','Review the actual Oakley apparel and goggle records, compare fit evidence and distinguish visible condition from protective performance.',['kakobuy oakley','oakley kakobuy','kakobuy oakley finds']),
('budget','kakobuy-budget-finds-under-30','Kakobuy Budget Finds Under $30: Prices and Parcel Costs','Five checked product records below a USD reference threshold, with item IDs, practical selection criteria and separate parcel budgeting.',['kakobuy budget finds','kakobuy finds under 30','cheap kakobuy finds'])]
UI=json.loads((WORK/'ui.json').read_text())
def soup(t):return BeautifulSoup(t,'html.parser')
def trans_key(lang,t):return lang+':'+hashlib.sha256(t.encode()).hexdigest()
def translate_fragments(jobs):
 # All copy is authored locally. No external translation requests are made.
 if jobs:
  raise RuntimeError("Unexpected untranslated content")
def prefix(lang):return '' if lang=='en' else '/'+lang
def locale_links(doc,lang,slug=None):
 pre=prefix(lang)
 for a in doc.select('a[href]'):
  if a.find_parent(class_='language-menu') or a.find_parent(class_='language-popover'):continue
  h=a['href']
  if h.startswith('/') and not h.startswith('//'):
   h=re.sub(r'^/(de|es|fr|it)(?=/|$)','',h)
   a['href']=pre+h
 if slug:
  route='/articles/'+slug+'/'
  for a in doc.select('.language-popover a[hreflang]'):
   l=a['hreflang'];a['href']=prefix(l)+route;a['class']='is-active' if l==lang else ''
   a.attrs.pop('aria-current',None)
   if l==lang:a['aria-current']='page'
  for a in doc.select('link[hreflang]'):a['href']=ORIGIN+prefix(a['hreflang'] if a['hreflang']!='x-default' else 'en')+route
  for a in doc.select('link[rel=canonical]'):a['href']=ORIGIN+pre+route
  for a in doc.select('meta[property="og:url"]'):a['content']=ORIGIN+pre+route
 return doc
def card_products(body,lang):
 ui=UI[lang]
 for holder in body.select('[data-products]'):
  section=soup('<div class="review-products"></div>').div
  for pid in holder['data-products'].split(','):
   p=PRODUCTS[pid];u='https://www.cnfanshp.com/AllProducts/'+pid+'.html';im='https://www.cnfanshp.com'+p['image'];price=p['cny']/6.7663
   card=soup(f'<figure><a href="{u}" target="_blank" rel="noopener noreferrer"><img src="{im}" width="420" height="420" loading="lazy" alt="" /></a><figcaption><strong translate="no"></strong><p>{ui[11]}: <span translate="no">{p["id"]}</span></p><p>{ui[12]}: <span translate="no">${price:.2f}</span></p><a href="{u}" target="_blank" rel="noopener noreferrer">{ui[13]}</a></figcaption></figure>').figure
   card.strong.string=p['name'];card.img['alt']=p['name']+' — '+ui[14];section.append(card)
  holder.replace_with(section)
 notice=soup('<p class="review-price-note"></p>').p
 notice.string=ui[15]
 section.insert_after(notice)
 return body
LOCAL=json.loads((WORK/'local-metadata.json').read_text())
LOCAL_UPDATES=json.loads((WORK/'local-updates.json').read_text())
new_jobs=[];new_docs=[];updates=[]
base='kakobuy-shoes-spreadsheet-qc-guide'
for lang in LANGS:
 template=soup((ROOT/(prefix(lang).lstrip('/')+'/' if lang!='en' else '')/'articles'/base/'index.html').read_text())
 for short,slug,title,desc,keywords in ARTICLES:
  doc=copy.deepcopy(template)
  for x in doc.select('meta[property="og:image"]'):x.decompose()
  main=soup('<main><section class="page-hero"><div class="shell"><div class="breadcrumbs"><a href="/">Home</a> / <a href="/articles/">Kakobuy Guides</a></div><p class="kicker">Product research · October 2026</p><h1></h1><p class="article-description"></p><div class="article-byline"><span>By Kakobuys.shop Research Desk</span><span>Published October 5, 2026</span><span>Independent listing research</span></div></div></section><section class="section shell"><div class="article-layout"><article class="prose"></article><aside class="side-card"><h2>Keep comparing</h2><p>Match the item ID, selected size and current price before continuing.</p><a href="/catalog/">Browse product categories →</a><a href="/articles/how-to-read-kakobuy-qc-photos/">Read the QC guide →</a><a href="/articles/kakobuy-shipping-cost-estimate/">Plan parcel costs →</a></aside></div></section></main>').main
  main.h1.string=title;main.select_one('.article-description').string=desc
  ui=UI[lang]
  for a,t in zip(main.select('.breadcrumbs a'),ui[:2]):a.string=t
  main.select_one('.kicker').string=ui[2]
  for a,t in zip(main.select('.article-byline span'),ui[3:6]):a.string=t
  main.aside.h2.string=ui[6];main.aside.p.string=ui[7]
  for a,t in zip(main.aside.select('a'),ui[8:11]):a.string=t;a['class']='button'

  body=card_products(soup((WORK/(short+('' if lang=='en' else '-'+lang)+'.html')).read_text()),lang)
  main.select_one('article.prose').extend(list(body.contents))
  doc.main.replace_with(main)
  doc.html['lang']=lang
  for m in doc.select('meta[http-equiv="content-language"]'):m['content']=lang
  for m in doc.select('meta[name=keywords]'):m['content']=', '.join(keywords)
  for m in doc.select('meta[property="article:published_time"],meta[property="article:modified_time"]'):m['content']=DATE+'T00:00:00Z'
  locale_links(doc,lang,slug)
  
  if lang!='en':
   local=LOCAL[lang][short];main.h1.string=local[0];main.select_one('.article-description').string=local[1]
  new_docs.append((lang,slug,doc,keywords))
# Restore two complete missing translations; use existing English article body and localized shell.
for english in (ROOT/'articles').glob('*/index.html'):
 slug=english.parent.name
 if slug in [a[1] for a in ARTICLES]:continue
 for lang in LANGS[1:]:
  target=ROOT/lang/'articles'/slug/'index.html'
  if target.exists() or not (WORK/(slug+'-'+lang+'.html')).exists():continue
  doc=soup(english.read_text());loc=soup((ROOT/lang/'articles'/base/'index.html').read_text())
  doc.header.replace_with(copy.deepcopy(loc.header));doc.footer.replace_with(copy.deepcopy(loc.footer));doc.html['lang']=lang
  locale_links(doc,lang,slug)
  doc.main.replace_with(soup((WORK/(slug+'-'+lang+'.html')).read_text()).main);new_docs.append((lang,slug,doc,[]))
# Add substantive improvements to three existing articles, preserving their original content.
for slug,html in json.loads((WORK/'old-improvements.json').read_text()).items():
 for lang in LANGS:
  p=ROOT/(lang if lang!='en' else '')/'articles'/slug/'index.html';doc=soup(p.read_text());frag=soup(html if lang=='en' else LOCAL_UPDATES[lang][slug])
  old=doc.select_one('.october-update')
  if old:old.decompose()
  updates.append((lang,p,doc,frag))
translate_fragments(new_jobs)
for lang,slug,doc,keywords in new_docs:
 title=doc.h1.get_text(' ',strip=True);description=doc.select_one('.article-description')
 if description is None:description=doc.select_one('.page-hero .shell > p:not(.kicker)')
 desc=description.get_text(' ',strip=True) if description else title
 doc.title.string=title+' | Kakobuys.shop'
 for m in doc.select('meta[property="og:title"]'):m['content']=title
 for m in doc.select('meta[name=description],meta[property="og:description"]'):m['content']=desc
 for j in doc.select('script[type="application/ld+json"]'):j.decompose()
 url=ORIGIN+prefix(lang)+'/articles/'+slug+'/'
 original=ROOT/'articles'/slug/'index.html';published=DATE
 if original.exists():
  o=soup(original.read_text()).select_one('meta[property="article:published_time"]')
  if o:published=o['content'][:10]
 data={'@context':'https://schema.org','@type':'Article','headline':title,'description':desc,'mainEntityOfPage':url,'datePublished':published,'dateModified':DATE,'inLanguage':lang,'wordCount':len(doc.select_one('article.prose').get_text(' ',strip=True).split()),'author':{'@type':'Organization','name':'Kakobuys.shop Research Desk'},'publisher':{'@type':'Organization','name':'Kakobuys.shop'}}
 j=doc.new_tag('script',type='application/ld+json');j.string=json.dumps(data,ensure_ascii=False);doc.head.append(j)
 j=doc.new_tag('script',type='application/ld+json');j.string=json.dumps({'@context':'https://schema.org','@type':'BreadcrumbList','itemListElement':[{'@type':'ListItem','position':1,'name':'Kakobuys.shop','item':ORIGIN+prefix(lang)+'/'},{'@type':'ListItem','position':2,'name':UI[lang][1],'item':ORIGIN+prefix(lang)+'/articles/'},{'@type':'ListItem','position':3,'name':title,'item':url}]},ensure_ascii=False);doc.head.append(j)
 locale_links(doc,lang,slug)
 target=ROOT/(lang if lang!='en' else '')/'articles'/slug/'index.html';target.parent.mkdir(parents=True,exist_ok=True);target.write_text(str(doc))
for lang,p,doc,frag in updates:
 doc.select_one('article.prose').insert(0,frag)
 byline=doc.select_one('.article-byline')
 if byline:
  note=doc.new_tag('span',attrs={'class':'october-date'});note.string=UI[lang][17]
  for old in byline.select('.october-date'):old.decompose()
  byline.append(note)
  for span in list(byline.select('span')):
   if re.search(r'\d[\d,. ]*\s*(words|Wörter|palabras|mots|parole)',span.get_text()):span.decompose()
 locale_links(doc,lang)
 for m in doc.select('meta[property="article:modified_time"]'):m['content']=DATE+'T00:00:00Z'
 for j in doc.select('script[type="application/ld+json"]'):
  try:
   d=json.loads(j.string)
   if d.get('@type')=='Article':d['dateModified']=DATE;d['wordCount']=len(doc.select_one('article.prose').get_text(' ',strip=True).split());j.string=json.dumps(d,ensure_ascii=False)
  except Exception:pass
 p.write_text(str(doc))
print('New and restored article pages:',len(new_docs),'Improved articles:',len(updates),flush=True)
