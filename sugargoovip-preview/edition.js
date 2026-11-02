import { articlePaths, publishedPaths, legacyPaths } from './edition-routes.js';

export const origin = 'https://sugargoovip.uk';
export const languages = {en:['en-GB','English'],de:['de','Deutsch'],fr:['fr','Français'],es:['es','Español'],it:['it','Italiano'],pt:['pt-BR','Português'],pl:['pl','Polski'],nl:['nl','Nederlands'],zh:['zh-Hans','简体中文']};

const published = new Set(publishedPaths);
const legacy = new Set(legacyPaths);
const catalogPath = '/products/';
const categoryPath = '/categories/';
const guidePath = '/guides/';
const faqPath = '/faq.html';
const lookup = new Map(Object.entries(articlePaths).map(([key,path]) => [path,key]));
const escape = (v='') => String(v).replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
const json = value => JSON.stringify(value).replace(/</g,'\\u003c');
const productPath = item => catalogPath+item.category+'-'+item.id+'.html';
const category = slug => categoryPath+slug+'.html';
const languagePath = (path,lang) => lang==='en' ? path : '/'+lang+path;
function destination(path,lang) {
  const [base,hash] = path.split('#');
  const url = languagePath(base,lang);
  return url+(hash?'#'+hash:'');
}
function linksFor(path) {
  return [...Object.entries(languages).map(([id,[tag]])=>[tag,origin+languagePath(path,id)]),['x-default',origin+path]];
}
export function resolvePage(url) {
  const original=url.pathname;
  const locale=original.match(/^\/(en|de|fr|es|it|pt|pl|nl|zh)(?=\/|$)/);
  let base=locale ? original.slice(locale[0].length)||'/' : original;
  base=base.replace(/\/index\.html$/,'/');
  if(!published.has(base) && published.has(base+'/'))base+='/';
  else if(!published.has(base) && published.has(base+'.html'))base+='.html';
  if(!published.has(base))return null;
  const query=url.searchParams.get('lang');
  const lang=query && Object.hasOwn(languages,query) ? query : locale?.[1]||'en';
  const canonical=languagePath(base,lang);
  if(original!==canonical || url.searchParams.has('lang')){
    url.pathname=canonical;
    url.searchParams.delete('lang');
    return {redirect:url.toString()};
  }
  return {base,lang};
}
async function asset(env,path) {
  const response=await env.ASSETS.fetch(origin+path);
  if(!response.ok)throw new Error('Missing published page data '+path);
  return response.json();
}
const box=(tag,content,cls='')=>`<${tag}${cls?' class="'+cls+'"':''}>${content}</${tag}>`;
function link(url,label,cls=''){return `<a${cls?' class="'+cls+'"':''} href="${escape(url)}">${escape(label)}</a>`;}
function card(url,title,desc){
  return `<a class="card guide-card" href="${escape(url)}"><h3>${escape(title)}</h3><p>${escape(desc)}</p></a>`;
}
function photo(p,cls='') {
  return p.image ? `<img class="${cls}" src="${escape(p.image)}" alt="${escape(p.title)}" width="560" height="560" loading="lazy">` : '';
}
function tiles(items,go,categories){
  return items.map(p=>`<a class="card product-card" href="${escape(go(productPath(p)))}">${photo(p)}<div class="product-meta"><h3>${escape(p.title)}</h3><p>${escape(categories[p.category])} · #${escape(p.id)}</p></div></a>`).join('');
}
function languageMenu(base,lang) {
  return Object.entries(languages).map(([id,[tag,name]])=>`<a lang="${tag}" hreflang="${tag}" href="${languagePath(base,id)}"${lang===id?' aria-current="page"':''}>${name}</a>`).join(' ');
}
function navAndFooter(base,lang,d,go) {
  const {ui:t,shop}=d, extra=d.extra;
  const nav=[['/',t['nav.home']],[catalogPath,t['nav.spreadsheet']],[categoryPath,t['nav.categories']],[articlePaths.qc,extra.qc],[articlePaths.shipping,extra.shipping],[guidePath,t['nav.guides']],[faqPath,t['nav.faq']]];
  const menu=languageMenu(base,lang);
  const navHtml=`<header class="site-header"><a class="site-logo" href="${go('/')}"><img src="/assets/11.png" width="480" height="148" alt="Sugargoo VIP"></a><nav class="site-nav">${nav.map(([path,label])=>link(go(path),label)).join('')}</nav><details class="locale-menu"><summary>${languages[lang][1]}</summary><div>${menu}</div></details></header>`;
  const legal=Object.entries(shop.info||{}).map(([k,[label]])=>link(go('/'+k+'.html'),label)).join(' · ');
  const foot=`<footer class="site-footer"><div><strong>${escape(t['footer.trust'])}</strong><p class="trust-links">${legal}</p></div><div><strong>${escape(t['footer.choose'])}</strong><div class="alternate-links">${menu}</div></div></footer>`;
  return [navHtml,foot];
}
function articlePage(doc,key,d,go,base,items){
  const {extra}=d, related={qc:['warehouse','links'],links:['qc','warehouse'],route:['calculator','shipping','coupon'],coupon:['shipping','route'],warehouse:['qc','links'],shipping:['route','coupon','calculator'],calculator:['route','shipping']};
  const action=key==='warehouse'?['qc','links']:key==='shipping'?['route','coupon']:key==='calculator'?['route']:null;
  const articleLink=id=>link(go(articlePaths[id]),d.cards[articlePaths[id]][0]);
  const simpleLinks=keys=>keys.map(articleLink).join(' · ');
  const targets=(related[key]||['qc','shipping']).map(k=>articlePaths[k]);
  const more=[...new Set([...targets,...(d.related[base]||[])])].filter(p=>p!==base);
  function relatedLabel(p){
    if(d.cards[p])return d.cards[p][0];
    if(p===catalogPath)return d.shop.catalogTitle;
    if(p===categoryPath)return d.shop.categoriesTitle;
    if(p.startsWith(categoryPath))return d.shop.categories[p.slice(categoryPath.length,-5)];
    return items.find(item=>productPath(item)===p)?.title;
  }
  const relatedLinks=more.filter(p=>relatedLabel(p)).map(p=>link(go(p),relatedLabel(p))).join(' · ');
  const next=action?box('div',simpleLinks(action),'next-steps'):'';
  const refs=(doc.sources||[]).map(s=>link(s.url,s.label)).join(' · ');
  const sections=doc.sections.map((s,i)=>`<section id="section-${i+1}"><h2>${escape(s.heading)}</h2>${s.paragraphs.map(p=>box('p',escape(p))).join('')}</section>`).join('');
  const tool=key==='calculator'?calculator(extra):'';
  return `<article class="article-card"><h1>${escape(doc.title)}</h1><p class="article-lead">${escape(doc.intro)}</p>${next}${tool}<div class="article-content">${sections}${refs?box('section',box('h2',escape(extra.sources))+box('p',refs)):''}</div></article><aside class="article-card next-steps">${relatedLinks} · ${link(go(guidePath),d.ui['guides.viewAll'])}</aside>`;
}
function calculator(e){
  const labels=[e.length,e.width,e.height,e.weight,e.divisor];
  const inputs=labels.map((label,i)=>`<label>${escape(label)}<input required type="number" step="any" min="0.000001" name="${['l','w','h','kg','k'][i]}" inputmode="decimal"></label>`).join('');
  return `<form class="weight-tool" data-weight-form><h2>${escape(e.tool)}</h2><p>${escape(e.toolNote)}</p><div class="weight-inputs">${inputs}</div><button class="btn" type="submit">${escape(e.calculate)}</button><output aria-live="polite" data-volume="${escape(e.volume)}" data-bill="${escape(e.bill)}"></output></form><script defer src="/assets/parcel-weight.js"></script>`;
}
function buildPage(base,d,items,doc,go) {
  const {ui:t,shop:c,extra:e,cards}=d;
  const cardsFor=paths=>paths.map(p=>card(go(p),...cards[p])).join('');
  const catTiles=()=>Object.entries(c.categories).map(([slug,label])=>link(go(category(slug)),label,'card category-card')).join('');
  const browse=()=>link(go(catalogPath),t['sheet.cta'],'btn');
  const group=(title,intro,inside)=>box('section',box('h1',escape(title))+box('p',escape(intro),'article-lead')+inside,'article-card');
  const entries=Object.keys(cards);
  const current=items.filter(p=>!p.archived);
  if(doc){
    return {title:doc.title,desc:doc.description,type:'Article',body:articlePage(doc,lookup.get(base),d,go,base,items),parent:[guidePath,t['nav.guides']]};
  }
  if(base==='/'){
    const sample=Object.keys(c.categories).map(slug=>current.find(p=>p.category===slug)).filter(Boolean);
    const feature=sample.slice(0,3).map(p=>`<a href="${go(productPath(p))}"><img src="${escape(p.image)}" alt="${escape(p.title)}" width="400" height="400"></a>`).join('');
    const search=`<form class="home-search" role="search" action="https://www.cnfanshp.com/search.html" method="get"><label class="search-label" for="product-search">${escape(t['search.label'])}</label><input id="product-search" class="home-search-input" type="search" required pattern=".*\\S.*" name="keywords" placeholder="${escape(t['search.placeholder'])}"><input type="hidden" name="channelid" value="2"><button class="btn">${escape(t['search.button'])}</button></form>`;
    const prominent=['qc','links','route','coupon'].map(k=>articlePaths[k]).concat(['/guides/sugargoo-shoes-spreadsheet-uk.html','/guides/sugargoo-hoodies-spreadsheet-uk.html']);
    const ids=['safe','order','shipping','returns'];
    const faq=[1,3,5,6].map((n,i)=>link(go(faqPath+'#'+ids[i]),t['faq.q'+n],'card')).join('');
    const body=`<section class="hero home-hero"><div class="hero-content"><h1>${escape(e.home)}</h1><p>${escape(e.homeDesc)}</p><div class="hero-actions">${browse()}${link(go(articlePaths.qc),e.qc,'btn btn-secondary')}${link(go(articlePaths.shipping),e.shipping,'btn btn-secondary')}</div>${search}</div><div class="edition-photos">${feature}</div></section><section class="panel home-sheet"><h2>${escape(c.catalogTitle)}</h2><div class="sheet-stats">${[[current.length,e.finds],[sample.length,t['section.categories']],[entries.length,t['section.guides']]].map(([n,l])=>`<div class="stat-chip"><strong>${n}</strong><span>${escape(l)}</span></div>`).join('')}</div></section><h2 id="daily-finds" class="section-title">${escape(t['section.daily'])}</h2><div class="grid home-products">${tiles(sample,go,c.categories)}</div><h2 id="categories" class="section-title">${escape(t['section.categories'])}</h2><div class="grid home-categories">${catTiles()}</div><h2 class="section-title">${escape(t['section.guides'])}</h2><div class="guide-grid">${cardsFor(prominent)}</div>${link(go(guidePath),t['guides.viewAll'],'btn btn-secondary')}<h2 class="section-title">${escape(t['section.faq'])}</h2><div class="faq-compact">${faq}</div>`;
    return {title:e.home,desc:e.homeDesc,body,type:'WebSite',schema:{potentialAction:{'@type':'SearchAction',target:{'@type':'EntryPoint',urlTemplate:'https://www.cnfanshp.com/search.html?keywords={search_term_string}&channelid=2'},'query-input':'required name=search_term_string'}}};
  }
  if(base===guidePath) {
    const featured=['qc','links','route','coupon'].map(k=>articlePaths[k]);
    const all=[...new Set([...featured,...entries])];
    return {title:e.guides,desc:e.guidesDesc,body:group(e.guides,e.guidesDesc,box('div',cardsFor(all),'guide-grid')),type:'CollectionPage'};
  }
  if(base===faqPath){
    const ids=['safe','sell','order','qc','shipping','returns','weight','before-shipping'];
    const qs=ids.map((id,i)=>({q:t['faq.q'+(i+1)],a:t['faq.a'+(i+1)],id}));
    return {title:t['faq.title'],desc:t['faq.intro'],body:group(t['faq.title'],t['faq.intro'],qs.map(x=>`<details class="card faq-item" id="${x.id}"><summary>${escape(x.q)}</summary><p>${escape(x.a)}</p></details>`).join('')),type:'FAQPage',schema:{mainEntity:qs.map(x=>({'@type':'Question',name:x.q,acceptedAnswer:{'@type':'Answer',text:x.a}}))}};
  }
  const info=c.info?.[base.slice(1,-5)];
  if(info)return {title:info[0],desc:info[1],body:group(info[0],info[1],base==='/contact.html'?link('https://blog.sugargoo.com/get-in-touch/','Sugargoo'):link(go('/'),t['back.home'])),type:'WebPage'};
  if(base===categoryPath)return {title:c.categoriesTitle,desc:c.categoriesIntro,body:group(c.categoriesTitle,c.categoriesIntro,box('div',catTiles(),'grid home-categories')),type:'CollectionPage'};
  if(base===catalogPath){
    const list=Object.entries(c.categories).map(([slug,label])=>`<section><h2>${link(go(category(slug)),label)}</h2><div class="grid home-products">${tiles(current.filter(p=>p.category===slug),go,c.categories)}</div></section>`).join('');
    return {title:c.catalogTitle,desc:c.catalogIntro,body:group(c.catalogTitle,c.catalogIntro,box('p',link(go(articlePaths.links),cards[articlePaths.links][0]))+list),type:'CollectionPage'};
  }
  if(base.startsWith(categoryPath)){
    const slug=base.slice(categoryPath.length,-5), label=c.categories[slug];
    const title=slug==='t-shirts'?c.ttitle:c.categoryTitle.replace('{category}',label);
    const desc=c.categoryIntro.replace('{category}',label);
    const selection=current.filter(p=>p.category===slug);
    const earlier=items.filter(p=>p.archived&&p.category===slug);
    const previous=earlier.length?box('h2',escape(e.older))+box('div',tiles(earlier,go,c.categories),'grid home-products'):'';
    const record=slug==='t-shirts'?box('p',escape(e.checked)+' · <time datetime="2026-11-02">2026-11-02</time>')+box('ul',selection.map(p=>box('li',link(go(productPath(p)),p.title)+' · '+escape(['5976','5953'].includes(p.id)?e.polo:e.tee))).join('')):'';
    return {title,desc,body:group(title,desc,box('div',tiles(selection,go,c.categories),'grid home-products')+record+box('p',escape(c.categoryChecks[slug]))+previous+(slug==='t-shirts'?box('p',escape(c.sizing)):'')+link(go(articlePaths.qc),cards[articlePaths.qc][0])),type:'CollectionPage',parent:[categoryPath,t['nav.categories']]};
  }
  const p=items.find(item=>productPath(item)===base);
  if(!p)return null;
  const sections=[[c.checkBefore,c.checkBeforeBody],[c.checkAfter,c.categoryChecks[p.category]+' '+c.checkAfterBody],[c.shipping,c.shippingBody]];
  const body=`<article class="article-card"><h1>${escape(p.title)}</h1><p>${escape(c.productIntro)}</p>${photo(p,'edition-product')}<p>${escape(c.numberLabel)} #${escape(p.id)} · ${link(go(category(p.category)),c.categories[p.category])}</p>${link(p.url,c.buy,'btn')}${sections.map(([h,p])=>box('h2',escape(h))+box('p',escape(p))).join('')}<p>${link(go(articlePaths.qc),cards[articlePaths.qc][0])} · ${link(go(articlePaths.shipping),cards[articlePaths.shipping][0])}</p></article>`;
  return {title:p.title+' | '+c.catalogTitle,desc:p.title+'. '+c.productIntro,body,type:'Product',schema:{name:p.title,sku:String(p.id),...(p.image?{image:origin+p.image}:{})},parent:[category(p.category),c.categories[p.category]]};
}
export async function renderPage(base,lang,env) {
  const go=path=>destination(path,lang);
  const id=lookup.get(base);
  const [d,items,docs]=await Promise.all([
    asset(env,'/assets/edition/'+lang+'/pages.json'),asset(env,'/assets/catalog/catalog.json'),
    id?asset(env,'/assets/edition/'+lang+'/'+id+'.json'):legacy.has(base)?asset(env,'/assets/edition/'+lang+'/archive.json'):null
  ]);
  const doc=id?docs:docs?.[base];
  const page=buildPage(base,d,items,doc,go);
  if(!page)throw new Error('Unrendered page '+base);
  const url=origin+go(base), tag=languages[lang][0], [header,footer]=navAndFooter(base,lang,d,go);
  const crumbs=base==='/'?[]:[['/',d.ui['nav.home']],...(page.parent?[page.parent]:[]),[base,doc?.title||page.title]];
  const graph=[{'@type':page.type,'@id':url+'#content',url,name:page.title,description:page.desc,inLanguage:tag,...(page.type==='Article'?{headline:page.title,mainEntityOfPage:url,author:{'@type':'Organization',name:'Sugargoo VIP'},...(id?{dateModified:'2026-11-02'}:{}),...(['route','coupon'].includes(id)?{datePublished:'2026-11-02'}:{})}:{}),...(page.schema||{})}];
  if(crumbs.length)graph.push({'@type':'BreadcrumbList',itemListElement:crumbs.map(([path,name],i)=>({'@type':'ListItem',position:i+1,name,item:origin+go(path)}))});
  const nav=crumbs.length?'<div class="breadcrumbs">'+crumbs.map(([path,name],i)=>i===crumbs.length-1?escape(name):link(go(path),name)).join(' / ')+'</div>':'';
  const alts=linksFor(base).map(([l,h])=>`<link rel="alternate" hreflang="${l}" href="${escape(h)}">`).join('');
  const html=`<!doctype html><html lang="${tag}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${escape(page.title)}</title><meta name="description" content="${escape(page.desc)}"><meta name="robots" content="index,follow,max-image-preview:large"><link rel="canonical" href="${escape(url)}">${alts}<meta property="og:title" content="${escape(page.title)}"><meta property="og:description" content="${escape(page.desc)}"><meta property="og:url" content="${escape(url)}"><meta property="og:type" content="${page.type==='Article'?'article':'website'}"><meta property="og:image" content="${origin}/assets/11.png"><meta name="twitter:card" content="summary"><link rel="icon" href="/assets/11.png"><link rel="stylesheet" href="/assets/site.css"><link rel="stylesheet" href="/assets/edition.css"><script async src="https://www.googletagmanager.com/gtag/js?id=G-LCE7C7PN4P"></script><script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','G-LCE7C7PN4P');</script><script type="application/ld+json">${json({'@context':'https://schema.org','@graph':graph})}</script><script defer src="/assets/site-events-20261004.js"></script></head><body>${header}<main class="wrap${base==='/'?' home-wrap':''}">${nav}${page.body}${footer}</main></body></html>`;
  return new Response(html,{headers:{'content-type':'text/html; charset=UTF-8','cache-control':'public, max-age=120, s-maxage=1800','x-content-type-options':'nosniff','referrer-policy':'strict-origin-when-cross-origin'}});
}
