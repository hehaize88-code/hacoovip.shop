"""Generate the existing Cloudflare Pages directory from reviewed language assets."""
from pathlib import Path
from html import escape as esc
from urllib.parse import urlparse
import json,re,xml.etree.ElementTree as ET
from bs4 import BeautifulSoup
HERE=Path(__file__).resolve().parent
ROOT=HERE.parents[2]/'hacoovip-shop'
ORIGIN='https://hacoovip.shop';DATE='2026-11-02'
LANGS={'en':'English','zh':'简体中文','es':'Español','fr':'Français','de':'Deutsch','it':'Italiano','pt':'Português','pl':'Polski','nl':'Nederlands'}
LANGTAG={k:('zh-CN' if k=='zh' else k) for k in LANGS}
NAV_LABELS={'en':('Guides','Finds','Photos','FAQ'),'zh':('指南','商品','照片检查','常见问题'),'es':('Guías','Productos','Fotos','FAQ'),'fr':('Guides','Produits','Photos','FAQ'),'de':('Ratgeber','Produkte','Fotos','FAQ'),'it':('Guide','Prodotti','Foto','FAQ'),'pt':('Guias','Produtos','Fotografias','FAQ'),'pl':('Poradniki','Produkty','Zdjęcia','FAQ'),'nl':('Gidsen','Producten','Foto’s','FAQ')}
EN=json.loads((HERE/'en.json').read_text()); PRODUCTS=json.loads((HERE/'products.json').read_text())
EXCLUDE={'how-it-works','shipping-guide','disclaimer'}
FEATURED=['hacoo-product-links-guide','hacoo-search-not-working','hacoo-app-website-guide','hacoo-spreadsheet-2026-guide','hacoo-return-refund-evidence-guide-2026','hacoo-shipping-time-tracking-guide-2026']
ARTICLE_SLUGS=FEATURED+[s for s in EN if s not in EXCLUDE and s not in FEATURED]
ALL_SLUGS=['','categories','trending','seo-articles','faq','quality-control-guide']+list(EN)

def path(lang,slug=''):
 return ('/' if lang=='en' else '/'+lang+'/')+slug

def hreflang(slug):
 return ''.join(f'<link rel="alternate" hreflang="{LANGTAG[l]}" href="{ORIGIN}{path(l,slug)}">' for l in LANGS)+f'<link rel="alternate" hreflang="x-default" href="{ORIGIN}{path("en",slug)}">'

def langlinks(lang,slug):
 return ''.join(f'<a href="{path(l,slug)}" lang="{LANGTAG[l]}" hreflang="{LANGTAG[l]}"'+(' aria-current="page"' if l==lang else '')+f'>{name}</a>' for l,name in LANGS.items())

def header(lang,slug,u):
 navu={**u,**dict(zip(['guides','trending','qc','faq'],NAV_LABELS[lang]))}
 nav=[('categories','categories'),('trending','trending'),('seo-articles','guides'),('how-it-works','how'),('quality-control-guide','qc'),('faq','faq')]
 return f'''<div class="topbar"><div class="container"><b>{esc(u['independent'])}</b></div></div><header class="header"><div class="container nav"><a class="brand" href="{path(lang)}" aria-label="Hacoo VIP — {esc(u['home'])}"><img src="/assets/img/hacoo-logo.svg" alt="Hacoo VIP" width="220" height="70"><span class="vip">VIP</span></a><button class="menu" data-menu aria-label="{esc(u['guides'])}" aria-expanded="false" aria-controls="main-nav"><span></span><span></span><span></span></button><nav class="navlinks" id="main-nav">'''+''.join(f'<a href="{path(lang,s)}"'+(' aria-current="page"' if s==slug else '')+f'>{esc(navu[k])}</a>' for s,k in nav)+f'''<a class="primary" href="https://www.cnfanshp.com/?utm_source=hacoovip.shop&amp;utm_medium=referral&amp;utm_campaign={lang}_nav">{esc(u['openCatalog'])}</a></nav><div class="lang"><button class="langBtn" aria-expanded="false" aria-controls="language-menu">{LANGS[lang]} ▾</button><nav class="langMenu" id="language-menu" aria-label="{esc(u['articleLanguages'])}">{langlinks(lang,slug)}</nav></div></div></header>'''

def footer(lang,slug,u):
 return f'''<footer class="footer"><div class="container"><p>{esc(u['independent'])}</p><div class="footLinks"><a href="{path(lang,'seo-articles')}">{esc(u['allGuides'])}</a><a href="{path(lang,'disclaimer')}">{esc(u['disclaimer'])}</a><a href="{path(lang,'faq')}">{esc(u['faq'])}</a></div><nav class="languageLinks" aria-label="{esc(u['articleLanguages'])}">{langlinks(lang,slug)}</nav></div></footer>'''

def render(lang,slug,title,desc,body,u,kind='WebPage',published=None,modified=DATE):
 url=ORIGIN+path(lang,slug)
 schema=[{'@type':'WebSite','@id':ORIGIN+'/#website','name':'Hacoo VIP','url':ORIGIN+'/'}, {'@type':'Organization','@id':ORIGIN+'/#organization','name':'Hacoo VIP','url':ORIGIN+'/'}]
 page={'@type':kind,'@id':url+'#page','url':url,'name':title,'description':desc,'inLanguage':LANGTAG[lang],'isPartOf':{'@id':ORIGIN+'/#website'}}
 if kind=='Article': page.update(headline=title,datePublished=published,dateModified=modified,mainEntityOfPage=url,author={'@id':ORIGIN+'/#organization'},publisher={'@id':ORIGIN+'/#organization'})
 schema.append(page)
 if slug:
  crumbs=[{'@type':'ListItem','position':1,'name':u['home'],'item':ORIGIN+path(lang)}]
  if kind=='Article':crumbs.append({'@type':'ListItem','position':2,'name':u['guides'],'item':ORIGIN+path(lang,'seo-articles')})
  crumbs.append({'@type':'ListItem','position':len(crumbs)+1,'name':title,'item':url})
  schema.append({'@type':'BreadcrumbList','itemListElement':crumbs})
 data=json.dumps({'@context':'https://schema.org','@graph':schema},ensure_ascii=False).replace('</','<\\/')
 html=f'''<!doctype html><html lang="{LANGTAG[lang]}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>{esc(title)}</title><meta name="description" content="{esc(desc,quote=True)}"><meta name="robots" content="index,follow"><link rel="canonical" href="{url}">{hreflang(slug)}<meta property="og:type" content="{'article' if kind=='Article' else 'website'}"><meta property="og:title" content="{esc(title,quote=True)}"><meta property="og:description" content="{esc(desc,quote=True)}"><meta property="og:url" content="{url}"><link rel="stylesheet" href="/assets/css/style.css"><link rel="stylesheet" href="/assets/css/seo-fixes.css?v=20261102"><link rel="stylesheet" href="/assets/css/support-article.css"><link rel="stylesheet" href="/assets/css/guides.css?v=20261102"><script type="application/ld+json">{data}</script><script async src="https://www.googletagmanager.com/gtag/js?id=G-1L4E2PD8XB"></script><script>window.dataLayer=window.dataLayer||[];function gtag(){{dataLayer.push(arguments);}}gtag('js',new Date());gtag('config','G-1L4E2PD8XB');</script></head><body data-page-type="{kind}" data-page-language="{LANGTAG[lang]}">{header(lang,slug,u)}<main>{body}</main>{footer(lang,slug,u)}<script src="/assets/js/main.js?v=20261102" defer></script></body></html>'''
 target=ROOT/(lang if lang!='en' else '')/(slug+'.html' if slug else 'index.html');target.parent.mkdir(parents=True,exist_ok=True);target.write_text(html)

def hero(title,lead):
 return f'<section class="pageHero container"><span class="eyebrow">Hacoo VIP</span><h1>{esc(title)}</h1><p class="lead">{esc(lead)}</p></section>'

def cards(lang,slugs,d,u):
 return '<div class="guideGrid">'+''.join(f'<a class="guideCard" data-guide-link href="{path(lang,s)}"><span class="articleDate">{esc(u["updated"])} {d[s]["modified"]}</span><h3>{esc(d[s]["title"])}</h3><p>{esc(d[s]["description"])}</p><span class="guideRead">{esc(u["read"])} →</span></a>' for s in slugs)+'</div>'

def cleanbody(body,lang):
 s=BeautifulSoup(body,'html.parser')
 for el in s.select('script,style,header,footer,nav.articleContents,.articleContents,.sources,.relatedGrid'):
  el.decompose()
 for h in s.find_all(['h2','h3']):
  if h.get_text(' ',strip=True).lower() in ['related guides','related reading','source notes','sources','reviewed sources']:
   nxt=h.find_next_sibling()
   while nxt and nxt.name not in ['h2','h3']:
    old=nxt;nxt=nxt.find_next_sibling();old.decompose()
   h.decompose()
 for a in s.find_all('a',href=True):
  h=a['href']; parsed=urlparse(h)
  if parsed.hostname=='hacoovip.shop' or (not parsed.scheme and not h.startswith('#')):
   slug=re.sub(r'^/(?:en|zh|es|fr|de|it|pt|pl|nl)/','/',parsed.path).strip('/').removesuffix('.html')
   slug=re.sub(r'^(?:\.\./|\./)+','',slug)
   if slug=='index':slug=''
   if slug in ALL_SLUGS:
    a['href']=path(lang,slug)+(('#'+parsed.fragment) if parsed.fragment else '')
    if slug in ARTICLE_SLUGS:a['data-guide-link']=''
 for i,h in enumerate(s.find_all('h2')):
  if not h.get('id'):h['id']='section-'+str(i+1)
 for table in s.find_all('table'):
  table['class']=['supportTable']
 return s

def article(lang,slug,entry,d,u):
 s=cleanbody(entry['body'],lang)
 toc='<nav class="articleContents" aria-label="'+esc(u['contents'])+'"><strong>'+esc(u['contents'])+'</strong><ul>'+''.join(f'<li><a href="#{esc(h["id"])}">{esc(h.get_text(" ",strip=True))}</a></li>' for h in s.find_all('h2'))+'</ul></nav>'
 related=entry.get('related') or EN[slug]['related'];related=[x for x in related if x in d and x!=slug]
 source=entry.get('sources') or EN[slug].get('sources',[])
 sources=('<aside class="sources"><h2>'+esc(u['sources'])+'</h2><ul>'+''.join(f'<li><a href="{esc(x,quote=True)}">{esc(urlparse(x).hostname+urlparse(x).path)}</a></li>' for x in source)+'</ul></aside>') if source else ''
 body=f'<section class="pageHero container supportArticle"><a class="breadcrumb" href="{path(lang,"seo-articles")}">{esc(u["guides"])}</a><h1>{esc(entry["title"])}</h1><p class="lead">{esc(entry["lead"])}</p><p class="byline">Hacoo VIP · {esc(u["updated"])} <time datetime="{entry["modified"]}">{entry["modified"]}</time></p></section><section class="container supportArticle">{toc}<article>{str(s)}{sources}</article></section>'
 if related:body+='<section class="container supportArticle"><h2>'+esc(u['related'])+'</h2>'+cards(lang,related,d,u)+'</section>'
 render(lang,slug,entry['title'],entry['description'],body,u,'Article' if slug not in EXCLUDE else 'WebPage',entry['published'] if lang=='en' else DATE,entry['modified'])

def categorycards(lang,d,u):
 categories=[('shoes','shoes','hacoo-shoes-sizing-buyer-evidence-guide'),('hoodies','hoodies-sweaters','hacoo-tops-sizing-material-guide'),('jackets','jackets','hacoo-product-page-checklist'),('tshirts','t-shirts','hacoo-size-guide-measurements-fit')]
 return '<div class="categoryGrid">'+''.join(f'<div class="categoryCard"><h3>{esc(u[label])}</h3><p>{esc(d[guide]["description"])}</p><a class="btn btnDark" href="https://www.cnfanshp.com/{route}/?utm_source=hacoovip.shop&amp;utm_medium=referral&amp;utm_campaign={lang}_category">{esc(u["openCatalog"])} →</a><a class="textLink" data-guide-link href="{path(lang,guide)}">{esc(d[guide]["title"])}</a></div>' for label,route,guide in categories)+'</div>'

def products(lang,u):
 return '<div class="productResearchGrid">'+''.join(f'<a class="productResearchCard" href="{p["url"]}?utm_source=hacoovip.shop&amp;utm_medium=referral&amp;utm_campaign={lang}_product"><img src="{p["image"]}" alt="{esc(p["name"],quote=True)}" width="640" height="540" loading="lazy" decoding="async"><h3>{esc(p["name"])}</h3><span>{esc(u["openCatalog"])} →</span></a>' for p in PRODUCTS)+'</div>'

def build(lang):
 d=json.loads((HERE/(lang+'.json')).read_text());u=json.loads((HERE/(lang+'-ui.json')).read_text())
 assert set(d)==set(EN),(lang,'missing articles')
 for slug,v in d.items():article(lang,slug,v,d,u)
 hubtitle=u['guides'] if 'Hacoo' in u['guides'] else 'Hacoo · '+u['guides']
 body=hero(hubtitle,u['guideLead'])+'<section class="container">'+cards(lang,ARTICLE_SLUGS,d,u)+'</section>'
 render(lang,'seo-articles',hubtitle+' | Hacoo VIP',u['guideLead'],body,u,'CollectionPage')
 body=hero(u['categories'],u['categoryLead'])+'<section class="container">'+categorycards(lang,d,u)+'</section>'
 render(lang,'categories',u['categories']+' | Hacoo VIP',u['categoryLead'],body,u,'CollectionPage')
 body=hero(u['trending'],u['productLead'])+'<section class="container">'+products(lang,u)+cards(lang,['hacoo-product-links-guide','hacoo-product-page-checklist'],d,u)+'</section>'
 render(lang,'trending',u['trending']+' | Hacoo VIP',u['productLead'],body,u,'CollectionPage')
 body=hero(u['faq'],u['independent'])+'<section class="container supportArticle"><article class="faqList">'+''.join(f'<details><summary>{esc(u["faq"+x+"Q"])}</summary><p>{esc(u["faq"+x+"A"])}</p></details>' for x in ['Official','Sell','Search','Order'])+f'<p><a href="https://www.hacoo.app/">Hacoo</a> · <a href="{path(lang,"hacoo-app-website-guide")}">{esc(d["hacoo-app-website-guide"]["title"])}</a></p></article></section>'
 render(lang,'faq',u['faq']+' | Hacoo VIP',u['independent'],body,u)
 body=hero(u['qc'],u['qcCoverText'])+'<section class="container supportArticle"><article>'+''.join('<h2>'+esc(u['qc'+x+'Title'])+'</h2><p>'+esc(u['qc'+x+'Text'])+'</p>' for x in ['Cover','Detail','Size'])+'</article>'+cards(lang,['hacoo-qc-photos-guide','hacoo-size-guide-measurements-fit','hacoo-reviews-evidence-checklist'],d,u)+'</section>'
 render(lang,'quality-control-guide',u['qc']+' | Hacoo VIP',u['qcDetailText'],body,u)
 form=f'<form class="catalogSearch" action="https://www.cnfanshp.com/search.html" method="get" role="search"><label for="catalog-search">{esc(u["searchLabel"])}</label><div><input id="catalog-search" type="search" name="keywords" placeholder="{esc(u["searchPlaceholder"],quote=True)}" autocomplete="off" required><input type="hidden" name="channelid" value="2"><button type="submit">{esc(u["searchButton"])}</button></div><p>{esc(u["faqSearchA"])}</p></form>'
 body=f'<section class="hero"><div class="container heroGrid"><div><span class="eyebrow">Hacoo VIP · {esc(u["guides"])}</span><h1>{esc(u["homeHeading"])}</h1><p class="lead">{esc(u["homeLead"])}</p><div class="actions"><a class="btn btnDark" href="{path(lang,"seo-articles")}">{esc(u["allGuides"])}</a><a class="btn btnLight" href="{path(lang,"categories")}">{esc(u["browse"])}</a></div></div><aside class="discoveryPanel">{form}<a class="featuredProduct" href="{PRODUCTS[0]["url"]}?utm_source=hacoovip.shop&amp;utm_medium=referral&amp;utm_campaign={lang}_hero_product"><img src="{PRODUCTS[0]["image"]}" width="640" height="540" alt="{esc(PRODUCTS[0]["name"],quote=True)}"><span>{esc(PRODUCTS[0]["name"])}</span><b>{esc(u["openCatalog"])} →</b></a></aside></div></section>'
 body+='<section class="container"><div class="sectionHead"><div><h2>'+esc(u['featuredHeading'])+'</h2><p>'+esc(u['guideLead'])+'</p></div><a class="textLink" href="'+path(lang,'seo-articles')+'">'+esc(u['allGuides'])+' →</a></div>'+cards(lang,FEATURED,d,u)+'</section>'
 body+='<section class="container"><div class="sectionHead"><div><h2>'+esc(u['categories'])+'</h2><p>'+esc(u['categoryLead'])+'</p></div></div>'+categorycards(lang,d,u)+'</section>'
 render(lang,'',u['homeTitle'],u['homeLead'],body,u)

if __name__=='__main__':
 import argparse
 parser=argparse.ArgumentParser();parser.add_argument('--lang',choices=LANGS);a=parser.parse_args()
 for l in ([a.lang] if a.lang else LANGS):build(l)
 if not a.lang:
  ns='http://www.sitemaps.org/schemas/sitemap/0.9';ET.register_namespace('',ns);xml=ET.Element('{'+ns+'}urlset')
  for l in LANGS:
   d=json.loads((HERE/(l+'.json')).read_text())
   for slug in ALL_SLUGS:
    item=ET.SubElement(xml,'{'+ns+'}url');ET.SubElement(item,'{'+ns+'}loc').text=ORIGIN+path(l,slug);ET.SubElement(item,'{'+ns+'}lastmod').text=d.get(slug,{}).get('modified',DATE)
  ET.ElementTree(xml).write(ROOT/'sitemap.xml',encoding='UTF-8',xml_declaration=True)
 print('Built',a.lang or ','.join(LANGS),'pages',len(ALL_SLUGS)*(1 if a.lang else len(LANGS)))
