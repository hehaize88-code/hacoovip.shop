from pathlib import Path
from bs4 import BeautifulSoup as B
import json,re,copy,xml.etree.ElementTree as ET
ROOT=Path(__file__).resolve().parents[2]; W=Path(__file__).resolve().parent
UI=json.loads((W/'ui.json').read_text()); PRODUCTS={p['page']:p for p in json.loads((W/'products.json').read_text())}
SLUGS=['new-era-caps-kakobuy-sizing-qc','asics-kakobuy-model-size-qc','oakley-kakobuy-finds-apparel-goggles','kakobuy-budget-finds-under-30']
PIDS=['4975','5932','5891','5945']; ORIGIN='https://kakobuys.shop';DATE='2026-10-05'
changed=set()
def soup(t):return B(t,'html.parser')
def save(p,d):p.write_text(str(d));changed.add('/'+str(p.relative_to(ROOT)).removesuffix('index.html'))
def meta(d,title,description):
 d.title.string=title
 for m in d.select('meta[name=description],meta[property="og:description"]'):m['content']=description
 for m in d.select('meta[property="og:title"]'):m['content']=title
labels={'en':['Kakobuy Finds: Caps, ASICS, Oakley, Shipping & QC','Explore product comparisons, sizing checks, QC photos and parcel budgets. Choose a guide for the next step of your purchase.'], 'de':['Kakobuy-Ratgeber: Caps, ASICS, Oakley, Versand und QC','Produktvergleiche, Größen, QC-Fotos und Paketbudgets: Finde den Ratgeber für deinen nächsten Kaufschritt.'],'es':['Guías Kakobuy: gorras, ASICS, Oakley, envío y QC','Compara productos, tallas, fotos QC y presupuesto del paquete. Elige una guía para tu siguiente paso.'],'fr':['Guides Kakobuy : casquettes, ASICS, Oakley, livraison et QC','Comparez produits, tailles, photos QC et budget du colis. Choisissez un guide pour la prochaine étape.'],'it':['Guide Kakobuy: cappellini, ASICS, Oakley, spedizione e QC','Confronta prodotti, taglie, foto QC e budget del pacco. Scegli la guida per il prossimo passo.']}
for lang,ui in UI.items():
 pre='' if lang=='en' else '/'+lang;lr=ROOT/pre.lstrip('/')
 # Keep every pre-existing article card and put new comparisons first.
 p=lr/'articles/index.html';d=soup(p.read_text());grid=d.select_one('.expanded-article-library')
 for a in list(grid.select('article')):
  if any(x in str(a) for x in SLUGS):a.decompose()
 newcards=[];homecards=[]
 for i,slug in enumerate(SLUGS):
  art=soup((lr/'articles'/slug/'index.html').read_text());title=art.h1.text;desc=art.select_one('meta[name=description]')['content'];href=pre+'/articles/'+slug+'/'
  card=soup('<article class="expanded-article-card"><span class="card-number"></span><p class="kicker"></p><h2></h2><p class="card-description"></p><div class="article-meta"><span></span></div><a class="button button-dark"></a></article>').article
  card.select_one('.kicker').string=ui[5];card.h2.string=title;card.select_one('.card-description').string=desc;card.select_one('.article-meta span').string=ui[4];card.a['href']=href;card.a.string=ui[16];newcards.append(card)
  hc=soup('<article class="article-card"><a class="guide-cover"><img width="180" height="180" loading="lazy"/></a><div><p class="kicker"></p><h3></h3><p class="guide-description"></p><a class="guide-link"></a></div></article>').article
  hc.select_one('.guide-cover')['href']=href;hc.img['src']='https://www.cnfanshp.com'+PRODUCTS[PIDS[i]]['image'];hc.img['alt']=PRODUCTS[PIDS[i]]['name'];hc.h3.string=title;hc.select_one('.kicker').string=ui[5];hc.select_one('.guide-description').string=desc;hc.select_one('.guide-link')['href']=href;hc.select_one('.guide-link').string=ui[16];homecards.append(hc)
 for card in reversed(newcards):grid.insert(0,card)
 cards=grid.select('article');count=len(cards)
 for i,c in enumerate(cards):
  n=c.select_one('.card-number')
  if n:n.string=f'{i+1:02}'
 d.h1.string=labels[lang][0];d.select_one('.page-hero .shell > p:not(.kicker)').string=labels[lang][1]
 summary=d.select_one('.article-library-summary');summary.h2.string=f'{count} '+ui[21];summary.select_one('p:not(.kicker)').string=ui[20]
 meta(d,labels[lang][0]+' | Kakobuys.shop',labels[lang][1])
 save(p,d)
 # Replace only the homepage guide section, keeping its placement and four cards.
 p=lr/'index.html';d=soup(p.read_text());g=d.select_one('.article-grid');g.clear()
 for c in homecards:g.append(c)
 section=g.find_parent('section');section.h2.string=ui[19];a=section.select_one('.section-heading > a');a.string=ui[18]
 note=soup('<p class="guide-next-links"></p>').p
 for slug in ['how-to-read-kakobuy-qc-photos','kakobuy-shipping-cost-estimate','kakobuy-shoes-spreadsheet-qc-guide']:
  ar=soup((lr/'articles'/slug/'index.html').read_text());a=d.new_tag('a',href=pre+'/articles/'+slug+'/');a.string=ar.h1.text;note.append(a)
 g.insert_after(note);save(p,d)
 # Link relevant category pages to the new, intent-specific guides.
 for cat,indices in [('shoes',[1]),('headwear',[0,3]),('accessories',[2,3]),('hoodies',[2])]:
  p=lr/'catalog'/cat/'index.html'
  if not p.exists():continue
  d=soup(p.read_text())
  for x in d.select('.october-category-guides'):x.decompose()
  block=soup('<section class="section shell october-category-guides"><h2></h2><p></p></section>').section;block.h2.string=ui[19]
  for i in indices:
   art=soup((lr/'articles'/SLUGS[i]/'index.html').read_text());a=d.new_tag('a',href=pre+'/articles/'+SLUGS[i]+'/');a.string=art.h1.text;block.p.append(a);block.p.append(d.new_tag('br'))
  d.main.append(block);save(p,d)
# Common small fixes: localised analytics, stable asset version, honest generic product names.
for p in ROOT.rglob('*.html'):
 if '.seo' in p.parts:continue
 s=p.read_text();initial=s
 lang=(p.relative_to(ROOT).parts[0] if p.relative_to(ROOT).parts[0] in UI else 'en');ui=UI[lang]
 s=re.sub(r'<script[^>]*src="/assets/analytics\.js(?:\?[^" ]*)?"[^>]*>\s*</script>','',s)
 if 'G-PDS13PB9CC' in s:s=s.replace('</body>','<script defer src="/assets/analytics.js?v=20261005"></script></body>')
 s=re.sub(r'(/assets/(?:index-mobile-v2|content-library)\.css)(?:\?[^" ]*)?',r'\1?v=20261005',s)
 s=s.replace('>SEO Articles<','>'+ui[1]+'<')
 # Only names whose generic source identity has actually been verified.
 shoe={'en':'Shoes','de':'Schuhe','es':'Calzado','fr':'Chaussures','it':'Scarpe'}[lang]
 for source,item in [('shoes-60','7721490300'),('shoes-59','7718490449')]:
  s=s.replace('>'+source+'<','>'+shoe+' — '+item+'<')
 if s!=initial:p.write_text(s)
# Avoid advertising nonexistent translated URLs for two older English-only posts.
for slug in ['kakobuy-holiday-shopping-timeline-stop-adding-items','kakobuy-shipping-time-how-long-does-delivery-take']:
 p=ROOT/'articles'/slug/'index.html';d=soup(p.read_text())
 for link in list(d.select('link[hreflang]')):
  target=ROOT/link['href'].replace(ORIGIN,'').lstrip('/')/'index.html'
  if not target.exists():link.decompose()
 for a in d.select('.language-popover a[hreflang]'):
  if a.get('hreflang')!='en':a['href']='/'+a['hreflang']+'/articles/'
 save(p,d)
# Sitemap: retain the established set of indexed routes and add the twenty new pages.
ns='http://www.sitemaps.org/schemas/sitemap/0.9';xh='http://www.w3.org/1999/xhtml';ET.register_namespace('',ns);ET.register_namespace('xhtml',xh)
p=ROOT/'sitemap.xml';tree=ET.parse(p);root=tree.getroot();entries={u.find('{'+ns+'}loc').text:u for u in root}
for lang in UI:
 pre='' if lang=='en' else '/'+lang
 for slug in SLUGS:
  url=ORIGIN+pre+'/articles/'+slug+'/'
  if url not in entries:
   u=ET.SubElement(root,'{'+ns+'}url');ET.SubElement(u,'{'+ns+'}loc').text=url;entries[url]=u
   for l in list(UI)+['x-default']:
    pref='' if l in ['en','x-default'] else '/'+l
    ET.SubElement(u,'{'+xh+'}link',{'rel':'alternate','hreflang':l,'href':ORIGIN+pref+'/articles/'+slug+'/'})
  changed.add(pre+'/articles/'+slug+'/')
 for slug in json.loads((W/'old-improvements.json').read_text()):changed.add(pre+'/articles/'+slug+'/')
for url,u in entries.items():
 if url.replace(ORIGIN,'') in changed:
  lm=u.find('{'+ns+'}lastmod')
  if lm is None:lm=ET.SubElement(u,'{'+ns+'}lastmod')
  lm.text=DATE
 for l in list(u.findall('{'+xh+'}link')):
  if not (ROOT/l.get('href').replace(ORIGIN,'').lstrip('/')/'index.html').exists():u.remove(l)
ET.indent(tree,space='  ');tree.write(p,encoding='utf-8',xml_declaration=True)
print('Article counts:',{l:len(list((ROOT/(l if l!='en' else '')/'articles').glob('*/index.html'))) for l in UI})
print('Sitemap URLs:',len(entries))
