"""Manual editorial release. Run from this site's root; never schedules publishing.

Dependencies: lxml, Markdown. The localized documents are maintained separately.
This script deliberately touches only this site's directory.
"""
from pathlib import Path
from copy import deepcopy
from html import escape
import json, re, math
from lxml import html, etree
import markdown

ROOT = Path(__file__).resolve().parents[1]
DATE = '2026-10-06'
ORIGIN = 'https://kakobuys.pro'
NEW = {
 'kakobuy-shipping-time': {
  'title':'Kakobuy Shipping Time: From Seller Dispatch to Delivery',
  'description':'Understand Kakobuy shipping time by stage: seller dispatch, warehouse QC, parcel preparation and delivery. Track delays and plan around a real deadline.',
  'keywords':['Kakobuy shipping time','how long does Kakobuy take to ship','Kakobuy delivery time','Kakobuy warehouse processing'],
  'related':['kakobuy-shipping-cost-estimate','kakobuy-tracking-purchase-order-parcel','warehouse-storage-and-returns'],
  'group':'Shipping & costs'},
 'kakobuy-size-guide-measurements': {
  'title':'Kakobuy Size Guide: Measurements for Shoes and Clothing',
  'description':'Choose Kakobuy clothing and shoe sizes using seller charts, garment measurements and warehouse QC. Compare chest, length, waist, inseam and insole evidence.',
  'keywords':['Kakobuy size guide','Kakobuy sizing','Kakobuy shoe size chart','Kakobuy clothing measurements'],
  'related':['how-to-read-kakobuy-qc-photos','kakobuy-shoes-spreadsheet-qc-guide','kakobuy-hoodie-streetwear-qc-guide'],
  'group':'Sizing & QC'},
 'kakobuy-jackets-spreadsheet-finds-qc': {
  'title':'Kakobuy Jackets Spreadsheet: Finds, Fit and QC Checks',
  'description':'Compare Kakobuy jacket finds with linked catalog examples, layering measurements and QC checks for shells, puffers, zips and lining before parcel submission.',
  'keywords':['Kakobuy jackets spreadsheet','Kakobuy jacket finds','Kakobuy puffer jacket','Kakobuy jacket sizing'],
  'related':['kakobuy-size-guide-measurements','kakobuy-volumetric-weight-parcel-packing','kakobuy-shipping-cost-estimate'],
  'group':'Finds & ordering'},
 'kakobuy-tracksuit-finds-sizing-qc': {
  'title':'Kakobuy Tracksuit Finds: Sizes, Sets and QC Checks',
  'description':'Review Kakobuy tracksuit finds as a complete set. Check top and trouser sizes, included pieces, colour matching, waistband measurements and warehouse QC.',
  'keywords':['Kakobuy tracksuit','Kakobuy tracksuit finds','Kakobuy tracksuit spreadsheet','Kakobuy tracksuit sizing'],
  'related':['kakobuy-size-guide-measurements','kakobuy-hoodie-streetwear-qc-guide','kakobuy-parcel-consolidation-guide'],
  'group':'Finds & ordering'}
}

def parse(path): return html.parse(str(path)).getroot()
def write(path, root):
 path.parent.mkdir(parents=True, exist_ok=True)
 path.write_text('<!DOCTYPE html>\n'+html.tostring(root, encoding='unicode', method='html'), encoding='utf-8')
def set_text(el, text):
 for child in list(el): el.remove(child)
 el.text=text
def insert_fragment(el, markup):
 for n in html.fragments_fromstring(markup):
  if not isinstance(n,str): el.append(n)
def set_meta(root, title, description, url):
 set_text(root.find('head/title'),title)
 for el in root.xpath('//meta[@name="description"]|//meta[@property="og:description"]'): el.set('content',description)
 for el in root.xpath('//meta[@property="og:title"]'): el.set('content',title)
 for el in root.xpath('//meta[@property="og:url"]'): el.set('content',url)
 for el in root.xpath('//link[@rel="canonical"]'): el.set('href',url)
def article_title(slug, lang='en'):
 p=ROOT/('' if lang=='en' else lang)/'articles'/slug/'index.html'
 if not p.exists():p=ROOT/'articles'/slug/'index.html'
 return parse(p).xpath('//h1')[0].text_content()
def rel_links(slugs, lang='en'):
 return '<ul>'+''.join('<li><a href="/'+('' if lang=='en' else lang+'/')+'articles/'+s+'/">'+escape(article_title(s,lang))+'</a></li>' for s in slugs)+'</ul>'

def new_articles():
 template=parse(ROOT/'articles/kakobuy-coupon-codes-real-shipping-savings/index.html')
 for slug,meta in NEW.items():
  root=deepcopy(template)
  raw=(ROOT/'.seo/content-20261006'/f'{slug}.md').read_text()
  body=markdown.markdown('\n'.join(raw.splitlines()[1:]),extensions=['tables'])
  prose=html.fragment_fromstring('<article class="prose" id="article-body">'+body+'</article>')
  # Turn source references into checkable official links, without purchase CTAs.
  source=html.fragment_fromstring('<div class="source-note"><strong>Source references</strong><p><a href="https://www.kakobuy.com/tools/estimate" rel="noopener" target="_blank">Kakobuy shipping estimator</a> · <a href="https://www.kakobuy.com/service/help/question?id=1" rel="noopener" target="_blank">Kakobuy warehouse help</a>. Product examples use the dated local catalog record. Measurements and worked examples are editorial guidance.</p></div>')
  prose.append(source)
  main=root.xpath('//main')[0];main.clear()
  wc=len(re.findall(r"\b[\w'-]+\b",prose.text_content()))
  mins=math.ceil(wc/210)
  hero=f'<section class="page-hero"><div class="shell"><div class="breadcrumbs"><a href="/">Home</a> / <a href="/articles/">Articles</a></div><p class="kicker">{meta["group"]}</p><h1>{escape(meta["title"])}</h1><p>{escape(meta["description"])}</p><div class="article-byline"><span>By Kakobuys.pro Research Desk</span><span>{mins} min read</span><span data-word-count="">{wc:,} words</span><time datetime="{DATE}">6 October 2026</time></div></div></section>'
  insert_fragment(main,hero)
  section=etree.SubElement(main,'section',{'class':'section shell'});layout=etree.SubElement(section,'div',{'class':'article-layout'})
  layout.append(prose);aside=etree.SubElement(layout,'aside',{'class':'side-card'})
  insert_fragment(aside,'<p class="kicker">Continue reading</p>'+rel_links([s for s in meta['related'] if (ROOT/'articles'/s/'index.html').exists()])+'<a class="button secondary" href="/catalog/">Explore product categories</a>')
  url=ORIGIN+'/articles/'+slug+'/'
  set_meta(root,meta['title'],meta['description'],url)
  for m in root.xpath('//meta[@name="keywords"]'):m.set('content',', '.join(meta['keywords']))
  for m in root.xpath('//meta[starts-with(@property,"article:")]'):m.set('content',DATE+'T00:00:00Z')
  for e in root.xpath('//script[@type="application/ld+json"]'):e.getparent().remove(e)
  graph={'@context':'https://schema.org','@graph':[{'@type':'Article','headline':meta['title'],'description':meta['description'],'mainEntityOfPage':url,'url':url,'datePublished':DATE,'dateModified':DATE,'inLanguage':'en','wordCount':wc,'keywords':meta['keywords'],'image':[ORIGIN+'/kakobuy-logo.png'],'author':{'@type':'Organization','name':'Kakobuys.pro Research Desk'},'publisher':{'@type':'Organization','name':'Kakobuys.pro','url':ORIGIN}},{'@type':'BreadcrumbList','itemListElement':[{'@type':'ListItem','position':1,'name':'Home','item':ORIGIN+'/'},{'@type':'ListItem','position':2,'name':'Articles','item':ORIGIN+'/articles/'},{'@type':'ListItem','position':3,'name':meta['title'],'item':url}]}]}
  s=etree.SubElement(root.find('head'),'script',{'type':'application/ld+json'});s.text=json.dumps(graph,ensure_ascii=False)
  for e in root.xpath('//footer//div[@class="footer-note"]/p'):set_text(e,'Independent buying guides. Editorial review: 6 October 2026.')
  write(ROOT/'articles'/slug/'index.html',root)

UPDATES={
 'warehouse-storage-and-returns':('Keep a dated warehouse record','Record the date the item was marked in storage, the account deadline, the current return eligibility and the next action. The normal 100-day storage reference does not extend a seller return window. Check the live account before waiting for another item.', ['kakobuy-shipping-time','kakobuy-parcel-consolidation-guide','how-to-read-kakobuy-qc-photos']),
 'kakobuy-shipping-cost-estimate':('Estimate cost and timing separately','Save the destination, item category, packed weight, dimensions and route alongside each estimate. Add seller delivery, optional services and payment costs only where they apply. A cheaper route does not establish an earlier arrival; compare its stated transit conditions with the unfinished seller and warehouse stages.', ['kakobuy-shipping-time','kakobuy-volumetric-weight-parcel-packing','kakobuy-coupon-codes-real-shipping-savings']),
 'how-to-read-kakobuy-qc-photos':('Make the size check measurable','A label identifies the marked size; it does not establish fit. Compare the seller chart with a garment or pair that already fits, then ask for the specific warehouse measurement that could change your decision. Preserve the measurement method and units alongside the photograph.', ['kakobuy-size-guide-measurements','kakobuy-jackets-spreadsheet-finds-qc','kakobuy-tracksuit-finds-sizing-qc']),
 'kakobuy-shoes-spreadsheet-qc-guide':('Resolve fit before parcel submission','Compare the selected size system, seller chart and available internal-length evidence. Foot length, insole length and outsole length describe different measurements. Record which one you have, compare it with a comfortable reference pair and leave uncertain fit unresolved until the needed evidence is available.', ['kakobuy-size-guide-measurements','how-to-read-kakobuy-qc-photos','kakobuy-shipping-time']),
 'kakobuy-hoodie-streetwear-qc-guide':('Check the whole outfit consistently','For a hoodie bought with matching trousers, confirm whether both pieces are included and whether their sizes can be selected separately. Compare chest, length, waist and inseam against garments that fit. A shared size label does not guarantee a comfortable complete set.', ['kakobuy-tracksuit-finds-sizing-qc','kakobuy-size-guide-measurements','kakobuy-jackets-spreadsheet-finds-qc']),
 'kakobuy-tracking-purchase-order-parcel':('Attach each reference to its stage','Keep seller shipment, warehouse order and international parcel references in separate fields. Start a delay inquiry with the last confirmed event and its date. A generated label alone does not establish carrier acceptance or the beginning of an international transit estimate.', ['kakobuy-shipping-time','warehouse-storage-and-returns','kakobuy-shipping-cost-estimate'])}

def improve_existing():
 for slug,(heading,copy,links) in UPDATES.items():
  p=ROOT/'articles'/slug/'index.html';root=parse(p);article=root.xpath('//article[contains(@class,"prose")]')[0]
  for old in article.xpath('./section[@data-editorial="20261006"]'):article.remove(old)
  section=html.fragment_fromstring('<section class="editorial-update" data-editorial="20261006"><h2>'+heading+'</h2><p>'+copy+'</p><p class="review-date">Editorial update: 6 October 2026.</p>'+rel_links(links)+'</section>')
  article.insert(0,section)
  for script in root.xpath('//script[@type="application/ld+json"]'):
   try:
    data=json.loads(script.text)
    def update(x):
     if isinstance(x,dict):
      if x.get('@type') in ['Article','BlogPosting']:x['dateModified']=DATE;x['wordCount']=len(re.findall(r"\b[\w'-]+\b",article.text_content()))
      for v in x.values():update(v)
     elif isinstance(x,list):
      for v in x:update(v)
    update(data);script.text=json.dumps(data,ensure_ascii=False)
   except (ValueError,TypeError):pass
  for m in root.xpath('//meta[@property="article:modified_time"]'):m.set('content',DATE+'T00:00:00Z')
  write(p,root)

def card(slug,lang='en'):
 p=ROOT/('' if lang=='en' else lang)/'articles'/slug/'index.html';r=parse(p)
 title=r.xpath('//h1')[0].text_content();metas=r.xpath('//meta[@name="description"]');description=metas[0].get('content') if metas else ''
 url='/'+('' if lang=='en' else lang+'/')+'articles/'+slug+'/'
 return '<article class="article-card compact-card"><h3><a href="'+url+'">'+escape(title)+'</a></h3><p>'+escape(description)+'</p></article>'

def home():
 p=ROOT/'index.html';r=parse(p);main=r.xpath('//main')[0]
 ledger=r.xpath('//section[contains(@class,"evidence-ledger")]')[0];main.remove(ledger);main.insert(1,ledger)
 set_text(r.xpath('//h1')[0],'Kakobuy Spreadsheets, Finds & Buying Guides')
 lede=r.xpath('//section[contains(@class,"editorial-hero")]//p[contains(@class,"lede")]')
 if lede:set_text(lede[0],'Explore product links, compare sizes and review warehouse QC. Plan shipping with practical guides before you submit a parcel.')
 set_meta(r,'Kakobuy Spreadsheet & Finds | Shoes, Clothing and QC Guides','Browse Kakobuy spreadsheet categories and product links. Compare shoes, jackets and clothing, then check sizing, QC, shipping costs and delivery stages.',ORIGIN+'/')
 for x in ledger.xpath('.//h2'):set_text(x,'Product links to start your search')
 for x in ledger.xpath('.//div[contains(@class,"split-heading")]/p'):set_text(x,'Open the matching product page to confirm its current options, availability and price.')
 archive=r.xpath('//section[contains(@class,"research-archive")]')[0]
 set_text(archive.xpath('.//h2')[0],'New guides for fit, finds and delivery')
 grid=archive.xpath('.//div[@class="article-grid"]')[0];grid.clear();grid.set('class','article-grid refresh-grid')
 for slug in NEW:insert_fragment(grid,card(slug))
 write(p,r)

def directory(lang='en'):
 prefix=ROOT/('' if lang=='en' else lang)
 p=prefix/'articles/index.html';r=parse(p);main=r.xpath('//main')[0]
 main.clear()
 # English version; local text is translated after the document is built.
 title='Kakobuy Guides: Shipping, Sizing, QC and Product Finds'
 desc='Choose a guide for your next decision: discover products, check the fit, review warehouse photos or prepare an international parcel.'
 insert_fragment(main,'<section class="page-hero articles-hero"><div class="shell"><div class="breadcrumbs"><a href="/">Home</a> / Articles</div><p class="kicker">26 practical buying guides</p><h1>'+title+'</h1><p>'+desc+'</p><nav class="topic-jump" aria-label="Article topics"><a href="#latest">New guides</a><a href="#shipping">Shipping &amp; costs</a><a href="#sizing">Sizing &amp; QC</a><a href="#ordering">Finds &amp; ordering</a></nav></div></section>')
 groups={'latest':('New guides',list(NEW)), 'shipping':('Shipping & costs',[]),'sizing':('Sizing & QC',[]),'ordering':('Finds & ordering',[])}
 slugs=[x.name for x in (ROOT/'articles').iterdir() if x.is_dir() and (x/'index.html').exists() and x.name not in NEW]
 for s in slugs:
  group='sizing' if any(k in s for k in ['qc','shoes','hoodie']) else 'shipping' if any(k in s for k in ['shipping','warehouse','cost','fees','currency','tracking','weight','parcel','customs','restricted','coupon']) else 'ordering'
  groups[group][1].append(s)
 for anchor,(heading,slugs) in groups.items():
  insert_fragment(main,'<section class="section shell article-topic" id="'+anchor+'"><div class="section-heading"><h2>'+heading+'</h2></div><div class="article-grid refresh-grid">'+''.join(card(s) for s in slugs)+'</div></section>')
 set_meta(r,title+' | Kakobuys.pro',desc,ORIGIN+'/articles/')
 for script in r.xpath('//script[@type="application/ld+json"]'):script.getparent().remove(script)
 s=etree.SubElement(r.find('head'),'script',{'type':'application/ld+json'});s.text=json.dumps({'@context':'https://schema.org','@type':'CollectionPage','name':title,'url':ORIGIN+'/articles/','inLanguage':'en','hasPart':[{'@type':'Article','url':ORIGIN+'/articles/'+slug+'/','name':article_title(slug)} for slug in list(NEW)+slugs]},ensure_ascii=False)
 write(p,r)

def finish_en():
 # Plain navigation names and one additional cached stylesheet; preserve tracking and commerce URLs.
 for p in ROOT.rglob('index.html'):
  if any(x in p.parts for x in ['.seo','products']):continue
  r=parse(p)
  if not r.xpath('//link[@href="/assets/editorial-20261006.css"]'):etree.SubElement(r.find('head'),'link',{'rel':'stylesheet','href':'/assets/editorial-20261006.css'})
  if r.get('lang','en')=='en':
   labels={'catalog':'Product finds','guides':'QC guides','articles':'Articles','faq':'Help','about':'About'}
   for a in r.xpath('//nav[contains(@class,"desktop-nav")]/a'):
    key=a.get('href','').strip('/')
    if key in labels:set_text(a,labels[key]);a.set('href','/'+key+'/')
   for a in r.xpath('//footer//a'):
    if a.get('href','').strip('/')=='articles':set_text(a,'Articles')
  for table in r.xpath('//article//table[not(parent::div[contains(@class,"table")])]'):
   parent=table.getparent();index=parent.index(table);parent.remove(table);wrap=etree.Element('div',{'class':'content-table-wrap','tabindex':'0','role':'region','aria-label':'Comparison table'});wrap.append(table);parent.insert(index,wrap)
  write(p,r)

if __name__=='__main__':
 new_articles();improve_existing();home();directory();finish_en()
 path=ROOT/'.seo/topic-map.json';data=json.loads(path.read_text());data['lastReviewed']=DATE
 data['automaticPublishing']={'enabled':False,'scope':'kakobuys.pro only','reason':'Manual editorial maintenance; preserve the existing automation exclusion.'}
 for slug,m in NEW.items():
  url=ORIGIN+'/articles/'+slug+'/'
  data['entries']=[x for x in data['entries'] if x['url'].rstrip('/')!=url.rstrip('/')]
  data['entries'].append({'url':url,'primaryQuery':m['keywords'][0],'relatedTerms':m['keywords'][1:],'intent':m['group'],'angle':m['description'],'evidence':'Original editorial guidance; dated catalog examples where explicitly identified','internalLinkRole':'Linked from home, directory and related existing guides'})
 path.write_text(json.dumps(data,ensure_ascii=False,indent=2)+'\n')
 (ROOT/'_deployment.txt').write_text('Cloudflare Pages deployment trigger.\nStatic entry: index.html\nRelease: 2026-10-06 manual SEO, navigation and four original guides\nAutomatic article publishing: disabled for kakobuys.pro only.\n')
 print('English editorial release built.')
