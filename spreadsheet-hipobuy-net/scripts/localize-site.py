"""Convert the Next static export to complete, non-hydrating localized HTML.

Source JSX remains authoritative. Run next build before this script. Translation
dictionaries are committed, so normal builds never depend on a translation API.
"""
import argparse, html, json, re, shutil
from pathlib import Path
from urllib.parse import urlsplit
from bs4 import BeautifulSoup, Comment, Doctype, NavigableString

ROOT=Path(__file__).resolve().parents[1]
OUT=ROOT/'out'
BASE='https://spreadsheet-hipobuy.net'
LANGS=['en','de','es','fr','it','pl','pt','zh']
NAMES=['English','Deutsch','Español','Français','Italiano','Polski','Português','简体中文']
SKIP={'script','style','noscript','code','pre'}
ATTRS=['placeholder','title','aria-label','alt']
META={'description','og:title','og:description','twitter:title','twitter:description','og:image:alt'}
IDENTITY={'Hipobuy','SHEET','USD','QC','EN','DE','ES','FR','IT','PL','PT','ZH','ID','kg','cm','LIVE_INDEX.csv'}

def useful(text):
    return bool(re.search('[A-Za-z]',text)) and len(text)>1 and text not in IDENTITY and not re.fullmatch(r'(?:HB-)?[\d\s.,$¥£€%+×/–:-]+',text)

def excluded(node):
    return any(p.name in SKIP or p.has_attr('data-no-translate') or 'notranslate' in p.get('class',[]) for p in node.parents if getattr(p,'name',None))

def nodes(soup):
    return [n for n in soup.find_all(string=True) if not isinstance(n,(Comment,Doctype)) and not excluded(n) and useful(str(n).strip())]

def texts(soup):
    values={str(n).strip() for n in nodes(soup)}
    for tag in soup.find_all(True):
        if tag.name in SKIP or tag.has_attr('data-no-translate'):continue
        for attr in ATTRS:
            if tag.get(attr) and useful(tag[attr]):values.add(tag[attr])
        if tag.name=='meta' and (tag.get('name') in META or tag.get('property') in META) and useful(tag.get('content','')):values.add(tag['content'])
    def collect(obj,key=''):
        if isinstance(obj,dict):
            for k,v in obj.items():collect(v,k)
        elif isinstance(obj,list):
            for v in obj:collect(v,key)
        elif isinstance(obj,str) and key in {'headline','name','description','text','caption','articleSection'} and useful(obj):values.add(obj)
    for script in soup.select('script[type="application/ld+json"]'):
        collect(json.loads(script.get_text()))
    return values

def prepare(file):
    soup=BeautifulSoup(file.read_text(),'html.parser')
    for x in soup.select('noscript .language-links'):
        x.parent.decompose()
    for x in soup.find_all('script'):
        is_analytics_init=x.get_text().lstrip().startswith('window.dataLayer=')
        if x.get('type')!='application/ld+json' and 'googletagmanager.com' not in x.get('src','') and not is_analytics_init:x.decompose()
    for x in soup.find_all('link'):
        if x.get('as')=='script' or x.get('rel')==['modulepreload']:x.decompose()
    for x in soup.find_all(string=lambda t:isinstance(t,Comment)):x.extract()
    for x in soup.select('[hidden]'):
        if not x.get_text(strip=True) and not x.find(['script','meta','link','title']):x.decompose()
    # A third-party reference remains attributed in prose; navigation only uses
    # this independent site and its owner's catalogue.
    for a in soup.select('a[href]'):
        href=a['href'];u=urlsplit(href)
        if u.scheme in ['http','https'] and u.hostname not in ['spreadsheet-hipobuy.net','cnfanshp.com','www.cnfanshp.com']:
            a.name='span';a.attrs={}
    for x in soup.select('meta[name="keywords"]'):x.decompose()
    # The search API and native filtering remain usable without React hydration.
    for el in soup.select('.product-card'):
        category=el.select_one('.product-image span')
        if category:el['data-category']=category.get_text(strip=True)
    for el in soup.select('.filter-tabs button,.product-filters button,.filter-row button'):
        el['data-filter']=el.get_text(strip=True)
    for row in soup.select('.data-row'):
        row['data-search']=row.get_text(' ',strip=True).lower()
        cells=row.find_all(recursive=False)
        if len(cells)>2:row['data-category']=cells[2].get_text(strip=True).lower()
    return soup

def locale_url(path,lang):
    if not path.startswith('/') or path.startswith('//'):return path
    if lang=='en':return path
    return '/'+lang+path

def localize(soup,lang,route,dictionary):
    def tr(s):return html.unescape(dictionary.get(s,s)) if lang!='en' else s
    original_title=soup.title.get_text() if soup.title else ''
    description=soup.find('meta',attrs={'name':'description'})
    original_description=description.get('content','') if description else ''
    for n in nodes(soup):
        raw=str(n);key=raw.strip();value=tr(key)
        n.replace_with(NavigableString(raw[:len(raw)-len(raw.lstrip())]+value+raw[len(raw.rstrip()):]))
    for tag in soup.find_all(True):
        if tag.name in SKIP or tag.has_attr('data-no-translate'):continue
        for attr in ATTRS:
            if tag.get(attr):tag[attr]=tr(tag[attr])
        if tag.name=='meta' and (tag.get('name') in META or tag.get('property') in META):tag['content']=tr(tag.get('content',''))
    for row in soup.select('.data-row'):
        row['data-search']+=' '+row.get_text(' ',strip=True).lower()
    # React joins the numeric prefix and heading into one text node. Rebuild
    # the contents list from the translated headings instead of translating it twice.
    for anchor in soup.select('.article-body>aside a[href^="#section-"]'):
        section=soup.find(id=anchor['href'][1:])
        heading=section.find('h2') if section else None
        if heading:
            number=anchor['href'].rsplit('-',1)[-1].zfill(2)
            anchor.string=number+' '+heading.get_text(' ',strip=True)
    if lang!='en':
        date_labels={
            'de':('VERÖFFENTLICHT','AKTUALISIERT','Quellen und redaktionelle Aktualisierung'),
            'es':('PUBLICADO','ACTUALIZADO','Fuentes y actualización editorial'),
            'fr':('PUBLIÉ','MIS À JOUR','Sources et mise à jour éditoriale'),
            'it':('PUBBLICATO','AGGIORNATO','Fonti e aggiornamento editoriale'),
            'pl':('OPUBLIKOWANO','ZAKTUALIZOWANO','Źródła i aktualizacja redakcyjna'),
            'pt':('PUBLICADO','ATUALIZADO','Fontes e atualização editorial'),
            'zh':('发布','更新','资料来源与内容更新'),
        }
        article=None
        for script in soup.select('script[type="application/ld+json"]'):
            data=json.loads(script.get_text())
            for obj in data if isinstance(data,list) else [data]:
                if obj.get('@type')=='Article':article=obj
        if article:
            published,updated,label=date_labels[lang]
            stamp=soup.select_one('.article-hero>div>small')
            if stamp:stamp.string=f'{published} {article["datePublished"]} · {updated} {article["dateModified"]}'
            sources=soup.select_one('.article-research>strong')
            if sources:sources.string=f'{label} · {article["dateModified"]}'
    for property,value in [('og:title',tr(original_title)),('og:description',tr(original_description))]:
        tag=soup.find('meta',attrs={'property':property})
        if tag:tag['content']=value
    for name,value in [('twitter:title',tr(original_title)),('twitter:description',tr(original_description))]:
        tag=soup.find('meta',attrs={'name':name})
        if tag:tag['content']=value
    canonical=BASE+locale_url(route,lang)
    soup.html['lang']='zh-CN' if lang=='zh' else lang
    soup.body['data-locale']=lang
    soup.body['data-route']=route
    for old in soup.select('link[rel="canonical"],link[hreflang],meta[property="og:url"],meta[property="og:locale"]'):old.decompose()
    soup.head.append(soup.new_tag('link',rel='canonical',href=canonical))
    for l in LANGS:
        soup.head.append(soup.new_tag('link',rel='alternate',hreflang='zh-CN' if l=='zh' else l,href=BASE+locale_url(route,l)))
    soup.head.append(soup.new_tag('link',rel='alternate',hreflang='x-default',href=BASE+route))
    soup.head.append(soup.new_tag('meta',property='og:url',content=canonical))
    soup.head.append(soup.new_tag('meta',property='og:locale',content={'en':'en_US','de':'de_DE','es':'es_ES','fr':'fr_FR','it':'it_IT','pl':'pl_PL','pt':'pt_PT','zh':'zh_CN'}[lang]))
    for a in soup.select('a[href]'):
        href=a['href']
        if href.startswith(BASE):href=href[len(BASE):] or '/'
        if href.startswith('/') and not href.startswith('//'):a['href']=locale_url(href,lang)
    select=soup.select_one('.language-select select')
    if select:
        for option in select.find_all('option'):
            option.attrs.pop('selected',None)
            if option.get('value')==lang:option['selected']=''
        # Search engines and visitors without JavaScript can follow every version.
        fallback=soup.new_tag('noscript');nav=soup.new_tag('nav',attrs={'class':'language-links','aria-label':tr('Language')})
        for l,n in zip(LANGS,NAMES):
            a=soup.new_tag('a',href=locale_url(route,l),lang='zh-CN' if l=='zh' else l);a.string=n
            if l==lang:a['aria-current']='page'
            nav.append(a)
        fallback.append(nav);select.parent.parent.append(fallback)
    text_fields={'headline','name','description','text','caption','articleSection'}
    def structured(obj,key=''):
        if isinstance(obj,list):return [structured(x,key) for x in obj]
        if isinstance(obj,dict):
            out={k:structured(v,k) for k,v in obj.items()}
            if out.get('@type') in ['Article','WebSite','CollectionPage','FAQPage']:out['inLanguage']='zh-CN' if lang=='zh' else lang
            if out.get('@type')=='Article':
                out['headline']=soup.h1.get_text(' ',strip=True) if soup.h1 else tr(original_title)
                out['description']=tr(original_description)
                if lang!='en':out.pop('wordCount',None)
            return out
        if isinstance(obj,str):
            if obj.startswith(BASE) and not re.search(r'\.(png|jpg|svg|webp)$',obj):return BASE+locale_url(obj[len(BASE):] or '/',lang)
            return tr(obj) if key in text_fields else obj
        return obj
    for script in soup.select('script[type="application/ld+json"]'):
        try:script.string=json.dumps(structured(json.loads(script.get_text())),ensure_ascii=False)
        except json.JSONDecodeError:raise RuntimeError(f'Invalid schema on {route}')
    script=soup.new_tag('script',src='/site.js?v=20261007',defer='');soup.body.append(script)
    return str(soup)

def main():
    ap=argparse.ArgumentParser();ap.add_argument('--extract',action='store_true');args=ap.parse_args()
    files=sorted(x for x in OUT.rglob('index.html') if x.relative_to(OUT).parts[0] not in LANGS[1:]+['404','_not-found'])
    required=set()
    for file in files:required.update(texts(prepare(file)))
    (ROOT/'content/translation-keys.json').write_text(json.dumps(sorted(required),ensure_ascii=False,indent=2)+'\n')
    if args.extract:print(f'{len(files)} English pages; {len(required)} translatable strings');return
    dictionaries={l:json.loads((ROOT/f'app/translations/{l}.json').read_text()) for l in LANGS[1:]}
    overrides=json.loads((ROOT/'content/translation-overrides.json').read_text()) if (ROOT/'content/translation-overrides.json').exists() else {}
    for lang,d in dictionaries.items():
        d.update(overrides.get(lang,{}))
        missing=required-d.keys()
        if missing:raise RuntimeError(f'{lang}: {len(missing)} missing translations: {list(missing)[:3]}')
    routes=[]
    for file in files:
        rel=file.relative_to(OUT);route='/' if str(rel)=='index.html' else '/'+str(rel.parent)+'/'
        routes.append(route)
        source=prepare(file)
        for lang in LANGS:
            target=OUT/((lang+'/') if lang!='en' else '')/rel
            target.parent.mkdir(parents=True,exist_ok=True)
            target.write_text(localize(BeautifulSoup(str(source),'html.parser'),lang,route,dictionaries.get(lang,{})))
    from xml.etree.ElementTree import Element,SubElement,tostring,register_namespace
    ns='http://www.sitemaps.org/schemas/sitemap/0.9';xn='http://www.w3.org/1999/xhtml'
    register_namespace('',ns);register_namespace('xhtml',xn);root=Element('{'+ns+'}urlset')
    for route in routes:
        for lang in LANGS:
            u=SubElement(root,'{'+ns+'}url');SubElement(u,'{'+ns+'}loc').text=BASE+locale_url(route,lang);SubElement(u,'{'+ns+'}lastmod').text='2026-10-07'
            for alternate in LANGS+['x-default']:
                SubElement(u,'{'+xn+'}link',{'rel':'alternate','hreflang':'zh-CN' if alternate=='zh' else alternate,'href':BASE+locale_url(route,'en' if alternate=='x-default' else alternate)})
    (OUT/'sitemap.xml').write_bytes(tostring(root,encoding='utf-8',xml_declaration=True))
    shutil.copyfile(ROOT/'public/site.js',OUT/'site.js')
    print(f'Published export: {len(routes)} routes × {len(LANGS)} languages = {len(routes)*len(LANGS)} pages')

if __name__=='__main__':main()
