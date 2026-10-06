"""Normalize canonical, same-page language links, structured data and sitemap.

Only the kakobuys-pro directory is modified. No publishing job is enabled.
"""
from pathlib import Path
from lxml import html,etree
from urllib.parse import urlsplit
from copy import deepcopy
import json,re

ROOT=Path(__file__).resolve().parents[1]
ORIGIN='https://kakobuys.pro';DATE='2026-10-06'
LANGS=['en','de','es','fr','it','pl']
LABELS={'en':('English','🌐'),'de':('Deutsch','🇩🇪'),'es':('Español','🇪🇸'),'fr':('Français','🇫🇷'),'it':('Italiano','🇮🇹'),'pl':('Polski','🇵🇱')}
NAV={
 'en':['Product finds','QC guides','Articles','Help','About'],
 'de':['Produkte','QC-Ratgeber','Artikel','Hilfe','Über uns'],
 'es':['Productos','Guías de QC','Artículos','Ayuda','Acerca de'],
 'fr':['Produits','Guides QC','Articles','Aide','À propos'],
 'it':['Prodotti','Guide QC','Articoli','Aiuto','Chi siamo'],
 'pl':['Produkty','Poradniki QC','Artykuły','Pomoc','O nas']}
def route(path):
 rel=path.relative_to(ROOT).parts[:-1]
 return '/'+('/'.join(rel)+'/' if rel else '')
def lang_and_key(path):
 parts=path.relative_to(ROOT).parts[:-1]
 return (parts[0],'/'.join(parts[1:])) if parts and parts[0] in LANGS[1:] else ('en','/'.join(parts))
def write(p,r):p.write_text('<!DOCTYPE html>\n'+html.tostring(r,encoding='unicode',method='html'))
def set_text(el,text):
 for c in list(el):el.remove(c)
 el.text=text

def main():
 paths=[p for p in ROOT.rglob('index.html') if '.seo' not in p.parts and 'products' not in p.parts]
 template=html.parse(str(ROOT/'index.html'))
 equivalent={}
 for p in paths:
  lang,key=lang_and_key(p);equivalent.setdefault(key,{})[lang]=route(p)
 # Preserve accurate historical sitemap dates for untouched pages.
 old={}
 if (ROOT/'sitemap.xml').exists():
  tree=etree.parse(str(ROOT/'sitemap.xml'))
  for u in tree.getroot():
   loc=u.find('{*}loc');dt=u.find('{*}lastmod')
   if loc is not None:old[loc.text]=dt.text if dt is not None else '2026-07-30'
 records=[]
 for p in paths:
  r=html.parse(str(p)).getroot();head=r.find('head');lang,key=lang_and_key(p);url=ORIGIN+route(p)
  r.set('lang',lang)
  for e in r.xpath('//link[@rel="canonical"]|//link[@rel="alternate" and @hreflang]'):e.getparent().remove(e)
  etree.SubElement(head,'link',{'rel':'canonical','href':url})
  variants=equivalent[key]
  rows=r.xpath('//header//div[contains(concat(" ",@class," ")," nav-row ")]')
  if rows:
   row=rows[0]
   if not r.xpath('//details[contains(@class,"language-menu")]'):
    row.append(deepcopy(template.xpath('//details[contains(@class,"language-menu")]')[0]))
   if not r.xpath('//details[contains(@class,"mobile-menu")]'):
    row.append(deepcopy(template.xpath('//details[contains(@class,"mobile-menu")]')[0]))
  for l,href in variants.items():etree.SubElement(head,'link',{'rel':'alternate','hreflang':l,'href':ORIGIN+href})
  if 'en' in variants:etree.SubElement(head,'link',{'rel':'alternate','hreflang':'x-default','href':ORIGIN+variants['en']})
  for e in r.xpath('//meta[@property="og:url"]'):e.set('content',url)
  for menu in r.xpath('//details[contains(@class,"language-menu")]'):
   summary=menu.find('summary');set_text(summary,'◎ '+lang.upper()+' ⌄')
   for child in list(menu):
    if child is not summary:menu.remove(child)
   box=etree.SubElement(menu,'div',{'class':'language-popover','role':'menu','aria-label':'Language'})
   for l in LANGS:
    if l not in variants:continue
    a=etree.SubElement(box,'a',{'href':variants[l],'lang':l,'hreflang':l,'role':'menuitem'})
    if l==lang:a.set('class','is-active');a.set('aria-current','page')
    etree.SubElement(a,'span',{'aria-hidden':'true'}).text=LABELS[l][1]
    etree.SubElement(a,'span').text=LABELS[l][0];etree.SubElement(a,'small').text=l.upper()
  for nav in r.xpath('//header//nav'):
   for a in nav.xpath('./a[@href]'):
    keyname=a.get('href').strip('/').split('/')[-1]
    if keyname in ['catalog','guides','articles','faq','about']:
     set_text(a,NAV[lang][['catalog','guides','articles','faq','about'].index(keyname)])
     a.set('href','/'+('' if lang=='en' else lang+'/')+keyname+'/')
  if 'products' not in key.split('/'):
   if not r.xpath('//link[@href="/assets/editorial-20261006.css"]'):etree.SubElement(head,'link',{'rel':'stylesheet','href':'/assets/editorial-20261006.css'})
   if not r.xpath('//script[@src="/assets/editorial-events-20261006.js"]'):etree.SubElement(r.find('body'),'script',{'src':'/assets/editorial-events-20261006.js','defer':''})
  # Refresh page-level schema from the visible page, without changing publication dates.
  h1=r.xpath('//h1');title=h1[0].text_content() if h1 else ''
  metas=r.xpath('//meta[@name="description"]');desc=metas[0].get('content','') if metas else ''
  if key=='articles':set_text(head.find('title'),title)
  for script in r.xpath('//script[@type="application/ld+json"]'):
   try:
    data=json.loads(script.text)
    def visit(x):
     if isinstance(x,dict):
      typ=x.get('@type')
      if typ=='Organization' and 'Kakobuys.pro' in x.get('name',''):
       x.setdefault('url',ORIGIN)
       x.setdefault('logo',{'@type':'ImageObject','url':ORIGIN+'/kakobuy-logo.png'})
      if typ in ['Article','BlogPosting']:
       x.update(headline=title,description=desc,url=url,mainEntityOfPage=url,inLanguage=lang)
       if r.xpath('//section[@data-editorial="20261006"]'):x['dateModified']=DATE
      if typ=='BreadcrumbList' and key.startswith('articles/'):
       prefix='/' if lang=='en' else '/'+lang+'/'
       x['itemListElement']=[{'@type':'ListItem','position':1,'name':'Kakobuys.pro','item':ORIGIN+prefix},{'@type':'ListItem','position':2,'name':NAV[lang][2],'item':ORIGIN+prefix+'articles/'},{'@type':'ListItem','position':3,'name':title,'item':url}]
      if typ in ['CollectionPage','WebPage']:x.update(name=title,description=desc,url=url,inLanguage=lang)
      for v in x.values():visit(v)
     elif isinstance(x,list):
      for v in x:visit(v)
    visit(data)
    if key=='articles':
     pages=sorted((p.parent).glob('*/index.html'))
     data={'@context':'https://schema.org','@type':'CollectionPage','name':title,'description':desc,'url':url,'inLanguage':lang,'mainEntity':{'@type':'ItemList','itemListElement':[{'@type':'ListItem','position':i+1,'url':ORIGIN+route(a),'name':html.parse(str(a)).xpath('//h1')[0].text_content()} for i,a in enumerate(pages)]}}
    script.text=json.dumps(data,ensure_ascii=False)
   except (ValueError,TypeError):pass
  # Normalize internal links to static routes and avoid locale links to nonexistent pages.
  for a in r.xpath('//a[@href]'):
   href=a.get('href');u=urlsplit(href)
   if not u.netloc and href.startswith('/'):
    target=ROOT/u.path.strip('/')
    if target.is_dir() and (target/'index.html').exists():a.set('href',u.path.rstrip('/')+'/'+('?' +u.query if u.query else '')+('#'+u.fragment if u.fragment else ''))
  write(p,r)
  robots=r.xpath('//meta[@name="robots"]')
  if 'products' not in key.split('/') and not any('noindex' in m.get('content','') for m in robots):
   changed=(key in ['','articles'] or key.split('/')[-1] in ['kakobuy-shipping-time','kakobuy-size-guide-measurements','kakobuy-jackets-spreadsheet-finds-qc','kakobuy-tracksuit-finds-sizing-qc','warehouse-storage-and-returns','kakobuy-shipping-cost-estimate','how-to-read-kakobuy-qc-photos','kakobuy-shoes-spreadsheet-qc-guide','kakobuy-hoodie-streetwear-qc-guide','kakobuy-tracking-purchase-order-parcel'])
   records.append((url,DATE if changed else old.get(url,'2026-07-30'),variants))
 ns='http://www.sitemaps.org/schemas/sitemap/0.9';xh='http://www.w3.org/1999/xhtml'
 sitemap=etree.Element('{'+ns+'}urlset',nsmap={None:ns,'xhtml':xh})
 for url,date,variants in sorted(records):
  u=etree.SubElement(sitemap,'{'+ns+'}url');etree.SubElement(u,'{'+ns+'}loc').text=url;etree.SubElement(u,'{'+ns+'}lastmod').text=date
  for lang,href in variants.items():etree.SubElement(u,'{'+xh+'}link',{'rel':'alternate','hreflang':lang,'href':ORIGIN+href})
  if 'en' in variants:etree.SubElement(u,'{'+xh+'}link',{'rel':'alternate','hreflang':'x-default','href':ORIGIN+variants['en']})
 (ROOT/'sitemap.xml').write_bytes(etree.tostring(sitemap,xml_declaration=True,encoding='UTF-8',pretty_print=True))
 print('Finalized',len(paths),'HTML pages;',len(records),'indexable sitemap URLs.')

if __name__=='__main__':main()
