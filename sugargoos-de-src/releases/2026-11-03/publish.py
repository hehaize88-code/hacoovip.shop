"""Apply the November edit to the complete static site tracked in Git."""
import argparse
import json
import runpy
from pathlib import Path
from urllib.parse import urlsplit

HERE = Path(__file__).resolve().parent
# Keep using the publication's existing URL, metadata, card and sitemap formats.
shared = runpy.run_path(str(HERE.parent / '2026-10-05' / 'publish.py'))
read, parse, path = (shared[k] for k in ('read', 'parse', 'path'))
identity, meta, toc = (shared[k] for k in ('identity', 'meta', 'toc'))
pages = json.loads((HERE / 'manifest.json').read_text())
DATE = '2026-11-03'
NEW = ('bag', 'links')
category_map = {'hoodies-sweaters': 'sweatshirts'}
base = 'https://sugargoos.de'


def save(root, loc, route, soup):
    footer = soup.select_one('.footer-bottom span:last-child')
    if footer:
        footer.string = 'Redaktionell aktualisiert am 3. November 2026' if loc == 'de' else 'Editorial update: 3 November 2026'
    for script in soup.select('script[src^="/site.js"]'):
        script['src'] = '/site.js?v=20261103'
    shared['put'](root, loc, route, soup)


def body_text(key, loc):
    return (HERE / 'content' / f'{key}.{loc}.html').read_text()


def edit_article(root, loc, key):
    item = pages[key]
    route = item['path']
    title, desc = item[loc]
    is_new = key in NEW
    template = 'articles/sugargoo-tracking-not-updating' if is_new else route
    soup = read(root, loc, template)
    identity(soup, loc, route, title, desc)
    soup.h1.string = title
    soup.h1.find_next_sibling('p').string = desc
    article = soup.select_one('article.prose, .article-body')
    if is_new:
        article.clear()
        body = parse(body_text(key, loc))
        for elem in list(body.contents):
            article.append(elem.extract())
        targets = ('qc','w2c') if key == 'bag' else ('w2c','qc')
        related = [(pages[k]['path'], pages[k][loc][0]) for k in targets]
        article.append(parse(shared['related'](loc, related)).section)
        for table in article.find_all('table'):
            if 'table-wrap' not in table.parent.get('class',[]):
                table.wrap(soup.new_tag('div', attrs={'class':'table-wrap'}))
        toc(article, loc)
        # Place the opening answer before the contents.
        lead = article.find('p', recursive=False)
        article.select_one('nav.article-toc').insert_before(lead.extract())
        soup.select_one('.page-hero .eyebrow').string = 'Veröffentlicht am 3. November 2026' if loc == 'de' else 'Published 3 November 2026'
        shared['schema'](soup,loc,route,title,desc,DATE,DATE)
    else:
        for node in article.select('.quick-answer, .editorial-update'):
            node.decompose()
        # Put the answer immediately after the description, also above the legacy sidebar on mobile.
        for old in soup.select('[data-entry-guide]'):
            old.decompose()
        quick = parse(body_text(key, loc)).section
        quick['data-entry-guide'] = key
        soup.h1.find_next_sibling('p').insert_after(quick)
        if soup.select_one('aside.article-toc') and article.select_one('nav.article-toc'):
            article.select_one('nav.article-toc').decompose()
    for tag in soup.select('script[type="application/ld+json"]'):
        data = json.loads(tag.string)
        if data.get('@type') in ('Article','BlogPosting'):
            data.update(headline=title,description=desc,dateModified=DATE,mainEntityOfPage=base+path(loc,route))
            data['wordCount'] = len((article.get_text(' ',strip=True)+' '+('' if is_new else quick.get_text(' ',strip=True))).split())
        if data.get('@type')=='BreadcrumbList':
            data['itemListElement'][-1]['name']=title
        tag.string=json.dumps(data, ensure_ascii=False, separators=(',',':'))
    last_crumb = soup.select_one('.breadcrumbs em')
    if last_crumb is None and key == 'tracking':
        last_crumb = soup.select_one('.breadcrumbs > span:last-child')
    if last_crumb:
        last_crumb.string = title
    save(root,loc,route,soup)


def update_cards(root, loc, route):
    soup = read(root,loc,route)
    if route in ('','articles'):
        grid=soup.select('.article-grid')[-1]
        for key in reversed(NEW):
            item=pages[key]
            href=path(loc,item['path'])
            existing=grid.find('a',href=href)
            if existing:
                existing.find_parent('article').decompose()
            title, desc=item[loc]
            card=shared['card'](loc, {'slug':item['path'].split('/')[-1],loc:{'title':title,'description':desc}})
            card['data-release']='20261103'
            grid.insert(0,card)
    by_url={path(loc,item['path']):item[loc] for item in pages.values()}
    for card in soup.select('.article-card'):
        a=card.find('a',href=True)
        if a and a['href'] in by_url:
            card.h3.string,card.p.string=by_url[a['href']]
    if not route:
        soup.select('.stat')[2].strong.string=str(len(list((root/path(loc,'articles').strip('/')).glob('*/index.html'))))
        for a in soup.select('.category-card a[href]'):
            slug=urlsplit(a['href']).path.strip('/').split('/')[-1]
            target=path(loc,'categories/'+category_map.get(slug,slug))
            assert (root/target.strip('/')/'index.html').exists(),target
            a['href']=target
            for attr in ('rel','target'):
                a.attrs.pop(attr,None)
        soup.select_one('.finder-card > p').string = (
            'Die Suche öffnet den Katalog in einem neuen Tab. Prüfe dort Variante und Preis.'
            if loc == 'de' else 'Search opens the catalog in a new tab. Check the selected variant and price there.'
        )
        intro = soup.select_one('.product-grid')
        if intro:
            summary = intro.find_previous(class_='section-heading')
            if summary and summary.h2:
                summary.h2.find_next_sibling('p').string = ('Durchsuche 64 Produkte aus acht Kategorien. Jede Karte führt zu Bildern, Artikelnummer und Preisstand.'
                    if loc == 'de' else 'Browse 64 products across eight categories. Each card leads to its images, catalogue ID and dated price.')
    if route=='articles':
        desc=('21 Sugargoo-Artikel zu Tracking, Taschen-QC, Produktlinks und Versand nach Deutschland.' if loc=='de' else '21 practical Sugargoo articles on parcel tracking, bag QC, broken product links and shipping to Germany.')
        meta(soup,'description',desc)
        meta(soup,'og:description',desc,'property')
    save(root,loc,route,soup)


def run(root):
    for loc in ('en','de'):
        for key in pages:
            edit_article(root,loc,key)
        for route in ('','articles','guides'):
            update_cards(root,loc,route)
    # sitemap dates for untouched pages are retained by the original release helper.
    shared['sitemaps'].__globals__['DATE'] = DATE
    shared['sitemaps'](root)


if __name__=='__main__':
    p=argparse.ArgumentParser()
    p.add_argument('site',type=Path)
    run(p.parse_args().site.resolve())
