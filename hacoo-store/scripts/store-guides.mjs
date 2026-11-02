import fs from "node:fs";
import path from "node:path";

const origin = "https://hacoo.store";
const catalog = "https://www.cnfanshp.com";
const revised = "2026-11-02";
const languages = ["en", "fr", "de", "es", "it"];
const groups = ["shoes", "clothing", "bags", "accessories"];
const external = ["shoes/", "hoodies-sweaters/", "t-shirts/", "jackets/", "search.html?keywords=bag&channelid=2", "accessories/"];
const routeGroups = [[0], [1, 2, 3], [4], [5]];
const examples = [
  [["New Balance 2002R",5914],["UGG PeakMod Tasman",5955]],
  [["Off White T-shirt",5934],["The North Face Jacket",5849]],
  [["Bottega Veneta · woven bag",5964],["Miu Miu Maya Bag",5725]],
  [["Oakley · goggles",5858],["Gucci · sunglasses",5940]]
];
const shoes = "hacoo-shoes-finds", clothing = "hacoo-clothing-finds", bags = "hacoo-bags-accessories", tracking = "hacoo-order-tracking";
const broken = "hacoo-links-not-working", refund = "hacoo-refund-status", coupon = "hacoo-discount-code-not-working";
const groupArticles = [shoes,clothing,bags,bags];
const featured = [shoes,broken,clothing,refund,coupon];
const sources = [
  "https://www.hacoo.app/", "https://act.hacoo.app/act/sara/helpcenter/order1",
  "https://web.hacoo.app/en-US/pages/contact-us", "https://act.hacoo.app/refund-policy",
  "https://www.hacoo.app/en-US/pages/shipping-info", "https://web.hacoo.app/pages/terms-of-service",
  "https://act.hacoo.app/about-order-review-cashback", "https://www.hacoo.app/en-US/trust-center",
  "https://www.hacoo.app/en-ES/affiliates", "https://act.hacoo.app/act/sara/helpcenter/home/qa3",
  "https://www.hacoo.app/en-US/report-violation", "https://www.hacoo.app/en-US/pages/intellectual-property"
];
const sourceIds = {
  [shoes]:[1], [clothing]:[1], [bags]:[1], [tracking]:[4,2],
  [broken]:[0,5,2], [refund]:[3,4,9,2], [coupon]:[1,6,2],
  "change-hacoo-shipping-address":[4,2], "hacoo-affiliate-program":[8,7],
  "hacoo-intellectual-property-reporting-workflow":[7,5], "hacoo-official-website-and-app-check":[0,2],
  "read-hacoo-trust-center":[7,5]
};
const esc = s => String(s).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;");
const clean = s => s.replace(/<[^>]*>/g," ").replace(/\s+/g," ").replace(/\s+([,.!?])/g,"$1").replaceAll("&amp;","&").replaceAll("&quot;",'"').trim();
const base = code => code === "en" ? "/" : `/${code}/`;
const articleUrl = (code,slug) => `${base(code)}articles/${slug}/`;
const schemaTag = obj => `<script type="application/ld+json">${JSON.stringify(obj).replaceAll("<","\\u003c")}</script>`;
const externalLink = (url,label) => `<a href="${esc(url)}" target="_blank" rel="sponsored nofollow noopener">${esc(label)} ↗</a>`;
const link = (url,label) => `<a href="${esc(url)}">${esc(label)}</a>`;
const langLinks = slug => [...languages,"x-default"].map(code => `<link rel="alternate" hreflang="${code}" href="${origin}${articleUrl(code==="x-default"?"en":code,slug)}">`).join("\n");
const assetVersion = s => s.replace(/(assets\/(?:styles\.css|site\.js))(?:\?[^"']*)?(?=["'])/g,"$1?v=20261102");
function setMeta(html,title,description,headline) {
  html=html.replace(/<title>[\s\S]*?<\/title>/,`<title>${esc(title)}</title>`)
    .replace(/(<meta (?:name="description"|property="og:description") content=")[^"]*/g, "$1"+esc(description))
    .replace(/(<meta property="og:title" content=")[^"]*/g,"$1"+esc(title))
    .replace(/<h1\b[^>]*>[\s\S]*?<\/h1>/,`<h1>${esc(headline)}</h1>`);
  return html;
}
function articleGrid(html, cards) {
  return html.replace(/<div class="article-grid">([\s\S]*?)<\/div>/, (_, prev) => {
    const evergreen=(prev.match(/<a class="article-card\b[\s\S]*?<\/a>/g)||[]).filter(a=>/href="[^"]*(?:guides\/|faq\/)/.test(a));
    if(evergreen.length!==6) throw Error("Expected six existing guide links");
    return `<div class="article-grid">${cards}${evergreen.join("\n")}</div>`;
  });
}
function collectionSchema(html,code,items) {
  return html.replace(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g,(_,json)=>{
    const data=JSON.parse(json);
    const headline=clean(html.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/)[1]);
    const description=clean(html.match(/<meta\b(?=[^>]*\bname="description")[^>]*\bcontent="([^"]*)"/)[1]);
    for(const node of data["@graph"]||[data]){
      if(["WebPage","CollectionPage","Article"].includes(node["@type"])){
        node.description=description; node.dateModified=revised;
        if(node["@type"]==="Article") node.headline=headline; else node.name=headline;
        if(items && node["@type"]==="CollectionPage")node.mainEntity={"@type":"ItemList",numberOfItems:items.length,itemListElement:items.map((a,i)=>({"@type":"ListItem",position:i+1,url:new URL(a.url,origin+base(code)+"articles/").href,name:a.title}))};
      }
    }
    return schemaTag(data);
  });
}
function card(rec,code,label,compact=false){
  const tag=compact?"h3":"h2",text=rec[code];
  const picture=rec.image ? `<img class="article-card-image" src="/assets/images/${rec.image}" alt="" width="76" height="76" loading="lazy">` : "";
  return `<a class="${compact?"latest-guide-card":"article-card"}" href="${articleUrl(code,rec.slug)}">${picture}<span class="article-tag">${esc(label.guideLabel)}</span><${tag}>${esc(text.title)}</${tag}><p>${esc(text.description)}</p><span class="article-card-link">${esc(label.nav.read)} →</span></a>`;
}
function shellPart(hub,pattern,code){
  const part=hub.match(pattern)?.[0];
  if(!part)throw Error("Missing site layout in "+code);
  return part.replace(/(href|src)="([^"#][^"]*)"/g,(all,attr,url)=>{
    const resolved=new URL(url,origin+base(code)+"articles/");
    return resolved.origin===origin?`${attr}="${resolved.pathname}${resolved.search}${resolved.hash}"`:all;
  });
}
function renderArticle(rec,code,ui,records,hub){
  const {title,description,sections}=rec[code], route=articleUrl(code,rec.slug), url=origin+route;
  const ids=sourceIds[rec.slug]||[7,5,2], slug=rec.slug;
  const related=[...new Set([...(slug===refund?[tracking,"change-hacoo-shipping-address"]:slug===coupon?[broken,refund]:slug===shoes?[clothing,broken]:slug===clothing?[shoes,broken]:slug===tracking?[refund,"change-hacoo-shipping-address"]:[broken,shoes]),tracking])].filter(s=>s!==slug);
  const target=groups[groupArticles.indexOf(slug)];
  const oldAnchors = {
    [shoes]: ["links","sizes","chart","shape","photos","shortlist","checkout"],
    [clothing]: ["links","measurements","hoodies","shirts","jackets","shortlist","checkout"]
  };
  const anchors=sections.map((section,i)=>(code==="en" && oldAnchors[slug]?.[i]) || "section-"+(i+1));
  const list=sections.map((s,i)=>`<h2 id="${anchors[i]}">${esc(s[0])}</h2>${s.slice(1).map(p=>`<p>${esc(p)}</p>`).join("\n")}`).join("\n");
  const breadcrumbs=[{name:ui.nav.home,item:origin+base(code)},{name:ui.nav.guides,item:origin+base(code)+"articles/"},{name:title,item:url}];
  const modified=revised, published=code==="en"?rec.published:revised;
  const image=rec.image?`<meta property="og:image" content="${origin}/assets/images/${esc(rec.image)}">`:"";
  const schema={"@context":"https://schema.org","@graph":[{"@type":"Article","@id":url+"#article",mainEntityOfPage:url,headline:title,description,inLanguage:code,datePublished:published,dateModified:modified,author:{"@type":"Organization",name:"Hacoo Store Guide",url:origin+base(code)+"about/"},publisher:{"@type":"Organization",name:"Hacoo Store Guide"},wordCount:sections.flat().join(" ").split(/\s+/).length},{"@type":"BreadcrumbList",itemListElement:breadcrumbs.map((b,i)=>({"@type":"ListItem",position:i+1,...b}))}]};
  if(rec.image)schema["@graph"][0].image=origin+"/assets/images/"+rec.image;
  const header=shellPart(hub,/<a class="skip-link"[\s\S]*?<\/header>/,code);
  const footer=shellPart(hub,/<footer\b[\s\S]*?<\/footer>/,code).replace(/(<div class="footer-bottom">[\s\S]*?<span>[^<]*<\/span>)<span>[^<]*<\/span>/, "$1");
  const tag=hub.match(/<script async src="https:\/\/www\.googletagmanager\.com\/gtag\/js[^"]*"><\/script>\s*<script>[\s\S]*?<\/script>/)?.[0];
  if(!tag)throw Error("Missing GA4 tag in "+code);
  const heading=`<div class="breadcrumbs">${link(base(code),ui.nav.home)}<span>/</span>${link(base(code)+"articles/",ui.nav.guides)}</div><p class="eyebrow">${esc(ui.guideLabel)}</p><h1>${esc(title)}</h1><p>${esc(description)}</p>`;
  const sourcesList=ids.map(i=>link(sources[i],ui.sources[i])).join(" · ");
  return `<!doctype html>
<html lang="${code}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title><meta name="description" content="${esc(description)}"><meta name="robots" content="index,follow,max-image-preview:large">
<link rel="canonical" href="${url}">${langLinks(slug)}
<meta property="og:type" content="article"><meta property="og:site_name" content="Hacoo Store Guide"><meta property="og:title" content="${esc(title)}"><meta property="og:description" content="${esc(description)}"><meta property="og:url" content="${url}">${image}
<link rel="stylesheet" href="/assets/styles.css?v=20261102">${schemaTag(schema)}${tag}</head><body>${header}
<main id="main"><section class="page-hero"><div class="shell hero-box">${heading}</div></section>
<div class="shell article-layout"><article class="article"><p class="editorial-byline">${link(base(code)+"about/","Hacoo Store Guide")} · ${esc(ui.nav.updated)} <time datetime="${revised}">${new Intl.DateTimeFormat(code,{dateStyle:"long",timeZone:"UTC"}).format(new Date(revised))}</time></p>
${target?`<p class="guide-entry">${link(base(code)+"finds/#"+target,ui.nav.collection+" → "+ui.categories[groups.indexOf(target)])}</p>`:""}
${list}<h2 id="sources">${esc(ui.nav.sources)}</h2><p>${sourcesList}</p>
<h2 id="related">${esc(ui.nav.related)}</h2><ul>${related.map(s=>`<li>${link(articleUrl(code,s),records.get(s)[code].title)}</li>`).join("")}</ul></article>
<aside class="sidebar"><h2>${esc(ui.nav.toc)}</h2><nav>${sections.map((s,i)=>link("#"+anchors[i],s[0])).join("")}${link("#sources",ui.nav.sources)}</nav></aside></div></main>
${footer}<script src="/assets/site.js?v=20261102" defer></script></body></html>\n`;
}

function shelves(ui,code,records){
  const getArticle=i=>records.get(groupArticles[i])[code].title;
  return groups.map((key,i)=>`<section class="find-group" id="${key}"><h2>${esc(ui.categories[i])}</h2><p>${esc(ui.checks[i])}</p>
  <p class="collection-links">${routeGroups[i].map(j=>externalLink(catalog+"/"+external[j],ui.routes[j])).join(" · ")}</p><p><strong>${esc(ui.nav.sample)}</strong> · ${examples[i].map(([name,id])=>externalLink(catalog+"/AllProducts/"+id+".html",name)).join(" · ")}</p>
  <p>${link(articleUrl(code,groupArticles[i]),getArticle(i))}</p></section>`).join("\n");
}
function spreadBlock(ui,code){
  const rows=groups.map((g,i)=>`<tr><th scope="row">${link(base(code)+"finds/#"+g,ui.categories[i])}</th><td>${routeGroups[i].map(j=>externalLink(catalog+"/"+external[j],ui.routes[j])).join(" · ")}</td><td>${esc(ui.checks[i])}</td></tr>`).join("");
  return `<div class="sheet-intro"><p>${esc(ui.sheet[2])}</p><p>${link(base(code)+"finds/",ui.sheet[6]+" →")}</p></div>
<div class="compare-wrap"><table class="compare-table sheet-table"><thead><tr><th>${esc(ui.nav.collection)}</th><th>${esc(ui.nav.catalog)}</th><th>${esc(ui.nav.checks)}</th></tr></thead><tbody>${rows}</tbody></table></div>
<h2>${esc(ui.sheet[3])}</h2><p>${esc(ui.sheet[4])}</p><p>${esc(ui.sheet[5])}</p>`;
}
const block=(name,value)=>`<!-- ${name}:start -->\n${value}\n<!-- ${name}:end -->`;
function removeBlock(s,name){return s.replace(new RegExp("<!-- "+name+":start -->[\\s\\S]*?<!-- "+name+":end -->\\s*","g"),"");}
function categoryTiles(html,code,where,ui){
  return html.replace(/<a class="category-card"[^>]*>([\s\S]*?)<\/a>/g,(a,contents)=>{
    const key=contents.match(/(?:\/|")((?:shoes|clothing|bags|accessories))\.webp/)?.[1];
    if(!key)return a;
    const dest=where==="finds"?"#"+key:base(code)+"finds/#"+key;
    return `<a class="category-card" href="${dest}" aria-label="${esc(ui.categories[groups.indexOf(key)])}">${contents}</a>`;
  });
}
function updateDate(html,code) {
  const patterns=/Last editorial review: [^<]+|Last checked: [^<]+|Révision éditoriale\s*: [^<]+|Redaktionell geprüft[^<]*|Ultima revisione[^<]*|Revisione editoriale[^<]*|Revisión editorial[^<]*|Updated October 2026|Mis à jour en octobre 2026|Aktualisiert Oktober 2026|Aggiornato ottobre 2026|Actualizado en octubre de 2026/g;
  const stamp=new Intl.DateTimeFormat(code,{dateStyle:"long",timeZone:"UTC"}).format(new Date(revised));
  return html.replace(patterns,()=>stamp);
}
export function publishGuides(root,manifest) {
  const read=file=>fs.readFileSync(path.join(root,file),"utf8");
  function save(file,html){const dest=path.join(root,file);fs.mkdirSync(path.dirname(dest),{recursive:true});fs.writeFileSync(dest,html);}
  const ui=JSON.parse(read("scripts/guide-labels.json"));
  const data=Object.fromEntries(languages.map(c=>[c,JSON.parse(read("scripts/articles/"+c+".json"))]));
  const records=new Map(manifest.map(entry=>[entry.slug,{...entry}]));
  for(const record of records.values()){
    for(const code of languages) {
      let detail=data[code][record.slug];
      if(!detail && code==="en"){
        const html=read("articles/"+record.slug+"/index.html");
        detail={title:clean(html.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/)[1]).replace(/\.$/,""),description:clean(html.match(/<meta\b(?=[^>]*\bname="description")[^>]*\bcontent="([^"]*)"/)[1])};
      }
      if(!detail?.title || !detail.description || (code!=="en" && !detail.sections?.length))throw Error("Missing article text: "+code+" / "+record.slug);
      record[code]=detail;
    }
  }
  const latest=[...records.values()].sort((a,b)=>b.published.localeCompare(a.published));
  const sitemap = new Map([...read("sitemap.xml").matchAll(/<url>\s*<loc>([^<]+)<\/loc>([\s\S]*?)<\/url>/g)].map(m=>[m[1],m[2].match(/<lastmod>([^<]+)<\/lastmod>/)?.[1]||""]));
  for(const code of languages) {
    const pre=base(code).slice(1), words=ui[code], hubPath=pre+"articles/index.html";
    const hub=read(hubPath);
    const local=base(code);
    for(const entry of records.values()){
      const slug=entry.slug, file=pre+"articles/"+slug+"/index.html";
      let html;
      if(entry[code].sections){
        html=renderArticle(entry,code,words,records,hub);
      } else {
        html=read(file).replace(/\s*<link\b(?=[^>]*\brel="alternate")(?=[^>]*\bhreflang=)[^>]*>/g,"")
          .replace(/(<link\b(?=[^>]*\brel="canonical")[^>]*>)/,"$1\n"+langLinks(slug));
      }
      if(!html.includes("data-site-nav")){
        const header=shellPart(hub,/<header\b[\s\S]*?<\/header>/,code);
        html=html.replace(/<header\b[\s\S]*?<\/header>/,header);
        if(!html.includes("assets/site.js"))html=html.replace("</body>",'<script src="/assets/site.js?v=20261102" defer></script></body>');
      }
      if(!html.includes("G-KVZZSJN8W2")) {
        const tag=hub.match(/<script async src="https:\/\/www\.googletagmanager\.com\/gtag\/js[^"]*"><\/script>\s*<script>[\s\S]*?<\/script>/)[0];
        html=html.replace("</head>",tag+"\n</head>");
      }
      html=html.replaceAll("external cnfanshp.com catalogue","external catalogue");
      save(file,assetVersion(html));sitemap.set(origin+articleUrl(code,slug),entry[code].sections?revised:entry.modified||entry.published);
    }
    let html=articleGrid(hub,latest.map(a=>card(a,code,words)).join("\n"));
    html=setMeta(html,words.hub[0],words.hub[2],words.hub[1])
      .replace(/(<h1[^>]*>[\s\S]*?<\/h1>\s*)<p>[\s\S]*?<\/p>/, "$1<p>"+esc(words.hub[2])+"</p>")
      .replace(/(<div class="section-head">[\s\S]*?<h2>)[\s\S]*?<\/h2><\/div><p>[\s\S]*?<\/p>/, "$1"+esc(words.hub[3])+"</h2></div><p>"+esc(words.hub[4])+"</p>");
    const cards=[...html.matchAll(/<a class="article-card\b[^"]*" href="([^"]+)"[^>]*>[\s\S]*?<h2>([\s\S]*?)<\/h2>/g)].map(m=>({url:m[1],title:clean(m[2])}));
    save(hubPath,assetVersion(collectionSchema(updateDate(html,code),code,cards)));sitemap.set(origin+local+"articles/",revised);
    const home=pre+"index.html";
    html=removeBlock(read(home),"latest-guides");
    const newGuides=`<section class="section latest-guides"><div class="shell"><div class="section-head"><div><p class="eyebrow">${esc(words.nav.featured)}</p><h2>${esc(words.nav.choose)}</h2></div>${link(local+"articles/",words.nav.allGuides+" →")}</div><div class="latest-guides-grid">${featured.map(k=>card(records.get(k),code,words,true)).join("\n")}</div></div></section>`;
    html=html.replace('<section class="section section-soft home-steps">',block("latest-guides",newGuides)+'\n<section class="section section-soft home-steps">');
    html=categoryTiles(html,code,"home",words);
    const actions=[["guides/how-hacoo-works/",words.actions[0]],["finds/",words.actions[1]],["guides/shipping/",words.actions[2]],["articles/"+shoes+"/",({en:"Hacoo shoes",fr:"Chaussures Hacoo",de:"Hacoo-Schuhe",es:"Calzado Hacoo",it:"Scarpe Hacoo"})[code]]];
    const homeLinks=actions.map(([p,n],i)=>`<a class="btn ${i===1?"btn-primary ":""}btn-small" href="${local+p}">${esc(n)}</a>`).join(" ");
    html=html.replace(/<div class="actions">[\s\S]*?<\/div>/,`<div class="actions">${homeLinks}</div>`);
    if(code==="es")html=setMeta(html,"Hacoo en España: cómo comprar, encontrar productos y consultar envíos","Guía de compras Hacoo en España. Encuentra calzado y ropa, distingue los enlaces del catálogo y consulta medidas, seguimiento y plazos de entrega.","Hacoo en España: productos, compras y envíos");
    if(code==="fr")html=setMeta(html,"Hacoo site en ligne : application, produits et livraison","Guide indépendant du shopping Hacoo. Retrouvez les chaussures et vêtements, comparez les pointures et consultez l’application et les délais de livraison.","Hacoo site en ligne : produits, application et livraison");
    if(code==="it")html=setMeta(html,"Hacoo sito: prodotti, app e consegna in Italia","Guida agli acquisti Hacoo: scopri scarpe e abbigliamento, confronta le misure e controlla i link all’app e i tempi di consegna.","Hacoo sito: prodotti, app e consegna");
    if(code==="es")html=html.replace(/<p class="lead">[\s\S]*?<\/p>/,'<p class="lead">Encuentra ropa y calzado, comprueba las tallas y consulta cómo comprar o seguir tu pedido en España.</p>');
    save(home,assetVersion(collectionSchema(updateDate(html,code),code)));sitemap.set(origin+local,revised);

    const finds=pre+"finds/index.html";
    html=categoryTiles(removeBlock(read(finds),"find-collections"),code,"finds",words);
    html=setMeta(html,words.finds[0],words.finds[2],words.finds[1]);
    html=html.replace(/(<h1\b[^>]*>[\s\S]*?<\/h1>\s*)<p>[\s\S]*?<\/p>/,`$1<p>${esc(words.finds[2])}</p>`);
    html=html.replace(/(<section class="category-strip"[^>]*>[\s\S]*?<\/section>)/, "$1\n"+block("find-collections",`<div class="shell find-collections">${shelves(words,code,records)}</div>`));
    save(finds,assetVersion(collectionSchema(updateDate(html,code),code)));sitemap.set(origin+local+"finds/",revised);

    const categories=pre+"categories/index.html";
    save(categories,assetVersion(collectionSchema(updateDate(categoryTiles(read(categories),code,"categories",words),code),code)));
    sitemap.set(origin+local+"categories/",revised);

    const sheet=pre+"guides/what-is-hacoo-spreadsheet/index.html";
    html=removeBlock(removeBlock(read(sheet),"spreadsheet-routes"),"sheet-directory");
    html=setMeta(html,words.sheet[0],words.sheet[2],words.sheet[1]);
    html=html.replace(/(<article class="article">)\s*/, "$1\n"+block("sheet-directory",spreadBlock(words,code))+"\n");
    save(sheet,assetVersion(collectionSchema(updateDate(html,code),code)));sitemap.set(origin+local+"guides/what-is-hacoo-spreadsheet/",revised);

    const ship=pre+"guides/shipping/index.html";
    html=removeBlock(read(ship),"parcel-navigation").replace("</article>",block("parcel-navigation",`<p>${link(articleUrl(code,tracking),records.get(tracking)[code].title)} · ${link(articleUrl(code,refund),records.get(refund)[code].title)}</p>`)+"\n</article>");
    save(ship,assetVersion(collectionSchema(html,code)));sitemap.set(origin+local+"guides/shipping/",revised);
  }
  // Give every indexable route a same-language link to the directory.
  for (const url of sitemap.keys()) {
    const file=new URL(url).pathname.slice(1)+"index.html";
    const code=file.split("/")[0];
    const lang=languages.includes(code)?code:"en";
    const text=({en:"Spreadsheet",fr:"Tableau Hacoo",de:"Spreadsheet",es:"Spreadsheet",it:"Spreadsheet"})[lang];
    const target=base(lang)+"guides/what-is-hacoo-spreadsheet/";
    let page=read(file).replace(/(<nav\b[^>]*data-site-nav[^>]*>[\s\S]*?<ul>)([\s\S]*?)(<\/ul>)/,
      (all,start,contents,end)=> start+contents.replace(/<li class="sheet-nav">[\s\S]*?<\/li>/g,"")
        .replace(/<\/li>/, '</li><li class="sheet-nav">'+link(target,text)+'</li>')+end);
    page=page.replace(/>(?:SEO Articles|Articles SEO|SEO-Artikel|Articoli SEO|Artículos SEO)</g,">"+ui[lang].nav.guides+"<");
    save(file,assetVersion(page));
  }
  const entries=[...sitemap].map(([u,d])=>`  <url><loc>${u}</loc>${d?`<lastmod>${d}</lastmod>`:""}</url>`);
  save("sitemap.xml",`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries.join("\n")}\n</urlset>\n`);
}
