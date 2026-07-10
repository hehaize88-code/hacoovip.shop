(() => {
  const LANGS = {
    en: { label: "English", prefix: "" },
    "zh-CN": { label: "简体中文", prefix: "zh" },
    es: { label: "Español", prefix: "es" },
    fr: { label: "Français", prefix: "fr" },
    de: { label: "Deutsch", prefix: "de" },
    it: { label: "Italiano", prefix: "it" },
    pt: { label: "Português", prefix: "pt" },
    pl: { label: "Polski", prefix: "pl" },
    nl: { label: "Nederlands", prefix: "nl" }
  };

  const PREFIX_TO_LANG = {
    en: "en", zh: "zh-CN", es: "es", fr: "fr", de: "de", it: "it", pt: "pt", pl: "pl", nl: "nl"
  };

  const UI = {
    en:{ind:"Independent guide: not an official Hacoo app website; built for product research, category browsing and QC notes.",cat:"Categories",trend:"Trending",seo:"SEO Articles",how:"How It Works",qc:"QC Guide",faq:"FAQ",open:"Open Spreadsheet",catsTitle:"Popular category entrances",catsLead:"Browse product groups from the language page without returning to the home page.",trendTitle:"Trending product entries",trendLead:"Open product-detail leads and continue research from real cover images.",seoTitle:"SEO Articles",seoLead:"Read research guides about spreadsheets, QC photos, reverse image search and proxy-buying decisions.",howTitle:"How Hacoo VIP works",howLead:"A simple path from external discovery to product pages, categories, QC checks and spreadsheet research.",qcTitle:"QC Guide",qcLead:"Check product images, material cues, sizes and detail photos before taking action.",faqTitle:"FAQ",faqLead:"Short answers about how to use Hacoo VIP as an independent research guide.",read:"Open page",products:"Products",categories:"Categories",guides:"Guides",help:"Help"},
    "zh-CN":{ind:"独立指南：非 Hacoo 官方应用网站；用于产品研究、分类浏览和质检说明。",cat:"类别",trend:"热门话题",seo:"SEO文章",how:"工作原理",qc:"质检指南",faq:"FAQ",open:"打开电子表格",catsTitle:"热门类别入口",catsLead:"浏览鞋、卫衣、外套、T恤和其他产品分类，不需要返回首页。",trendTitle:"热门产品入口",trendLead:"从真实产品首图进入详情页，再继续检查图片、尺码和质检信息。",seoTitle:"SEO文章",seoLead:"阅读关于表格研究、QC照片、反向图片搜索和代理购买决策的指南。",howTitle:"Hacoo VIP 工作原理",howLead:"从外部发现页进入产品详情、类别、质检检查和表格研究的简洁路径。",qcTitle:"质检指南",qcLead:"继续任何购买路径之前，先检查图片、材质、尺码和细节。",faqTitle:"FAQ",faqLead:"关于 Hacoo VIP 独立研究指南的简短说明。",read:"打开页面",products:"产品",categories:"类别",guides:"指南",help:"帮助"},
    es:{ind:"Guía independiente: no es el sitio oficial de la app Hacoo; ayuda a investigar productos, categorías y notas QC.",cat:"Categorías",trend:"Tendencias",seo:"Artículos SEO",how:"Cómo funciona",qc:"Guía QC",faq:"FAQ",open:"Abrir hoja",catsTitle:"Entradas de categorías populares",catsLead:"Explora grupos de productos sin volver a la página principal.",trendTitle:"Productos en tendencia",trendLead:"Abre productos y continúa investigando con imágenes reales.",seoTitle:"Artículos SEO",seoLead:"Guías sobre hojas, fotos QC, búsqueda inversa y compra con proxy.",howTitle:"Cómo funciona Hacoo VIP",howLead:"Un camino simple desde el descubrimiento externo hasta páginas de producto, categorías y controles QC.",qcTitle:"Guía QC",qcLead:"Revisa imágenes, materiales, tallas y detalles antes de avanzar.",faqTitle:"FAQ",faqLead:"Respuestas sobre cómo usar Hacoo VIP como guía independiente.",read:"Abrir página",products:"Productos",categories:"Categorías",guides:"Guías",help:"Ayuda"},
    fr:{ind:"Guide indépendant : ce site n’est pas le site officiel de l’application Hacoo.",cat:"Catégories",trend:"Tendances",seo:"Articles SEO",how:"Fonctionnement",qc:"Guide QC",faq:"FAQ",open:"Ouvrir la feuille",catsTitle:"Entrées de catégories populaires",catsLead:"Parcourez les groupes de produits sans revenir à l’accueil.",trendTitle:"Produits tendance",trendLead:"Ouvrez les pistes produit et continuez la recherche avec de vraies images.",seoTitle:"Articles SEO",seoLead:"Guides sur les feuilles, photos QC, recherche inversée et achat proxy.",howTitle:"Fonctionnement de Hacoo VIP",howLead:"Un chemin simple entre découverte externe, pages produit, catégories et contrôles QC.",qcTitle:"Guide QC",qcLead:"Vérifiez images, matières, tailles et détails avant d’avancer.",faqTitle:"FAQ",faqLead:"Réponses courtes sur l’utilisation de Hacoo VIP.",read:"Ouvrir la page",products:"Produits",categories:"Catégories",guides:"Guides",help:"Aide"},
    de:{ind:"Unabhängiger Leitfaden: keine offizielle Hacoo-App-Webseite; für Produktrecherche, Kategorien und QC-Hinweise.",cat:"Kategorien",trend:"Trends",seo:"SEO-Artikel",how:"So funktioniert es",qc:"QC-Leitfaden",faq:"FAQ",open:"Tabelle öffnen",catsTitle:"Beliebte Kategorie-Einstiege",catsLead:"Durchsuche Produktgruppen, ohne zur Startseite zurückzukehren.",trendTitle:"Trend-Produktseiten",trendLead:"Öffne Produktdetails und recherchiere mit echten Produktbildern weiter.",seoTitle:"SEO-Artikel",seoLead:"Guides zu Tabellen, QC-Fotos, Rückwärtssuche und Proxy-Kaufentscheidungen.",howTitle:"So funktioniert Hacoo VIP",howLead:"Ein einfacher Weg von externer Entdeckung zu Produktseiten, Kategorien und QC-Prüfung.",qcTitle:"QC-Leitfaden",qcLead:"Prüfe Bilder, Materialien, Größen und Detailfotos vor dem nächsten Schritt.",faqTitle:"FAQ",faqLead:"Kurze Antworten zur Nutzung von Hacoo VIP als unabhängige Recherchehilfe.",read:"Seite öffnen",products:"Produkte",categories:"Kategorien",guides:"Guides",help:"Hilfe"},
    it:{ind:"Guida indipendente: non è il sito ufficiale dell’app Hacoo.",cat:"Categorie",trend:"Tendenze",seo:"Articoli SEO",how:"Come funziona",qc:"Guida QC",faq:"FAQ",open:"Apri foglio",catsTitle:"Ingressi categoria popolari",catsLead:"Sfoglia gruppi prodotto senza tornare alla home.",trendTitle:"Prodotti di tendenza",trendLead:"Apri dettagli prodotto e continua la ricerca da immagini reali.",seoTitle:"Articoli SEO",seoLead:"Guide su spreadsheet, foto QC, ricerca inversa e proxy buying.",howTitle:"Come funziona Hacoo VIP",howLead:"Un percorso semplice dalla scoperta esterna a prodotti, categorie e controlli QC.",qcTitle:"Guida QC",qcLead:"Controlla immagini, materiali, taglie e dettagli prima di procedere.",faqTitle:"FAQ",faqLead:"Risposte brevi su Hacoo VIP come guida indipendente.",read:"Apri pagina",products:"Prodotti",categories:"Categorie",guides:"Guide",help:"Aiuto"},
    pt:{ind:"Guia independente: não é o site oficial do aplicativo Hacoo.",cat:"Categorias",trend:"Tendências",seo:"Artigos SEO",how:"Como funciona",qc:"Guia QC",faq:"FAQ",open:"Abrir planilha",catsTitle:"Entradas de categorias populares",catsLead:"Navegue por grupos de produtos sem voltar à página inicial.",trendTitle:"Produtos em tendência",trendLead:"Abra detalhes de produtos e continue a pesquisa com imagens reais.",seoTitle:"Artigos SEO",seoLead:"Guias sobre planilhas, fotos QC, busca reversa e compra por proxy.",howTitle:"Como funciona o Hacoo VIP",howLead:"Um caminho simples da descoberta externa para produtos, categorias e checagens QC.",qcTitle:"Guia QC",qcLead:"Verifique imagens, materiais, medidas e detalhes antes de avançar.",faqTitle:"FAQ",faqLead:"Respostas curtas sobre como usar o Hacoo VIP.",read:"Abrir página",products:"Produtos",categories:"Categorias",guides:"Guias",help:"Ajuda"},
    pl:{ind:"Niezależny przewodnik: to nie jest oficjalna strona aplikacji Hacoo.",cat:"Kategorie",trend:"Trendy",seo:"Artykuły SEO",how:"Jak to działa",qc:"Przewodnik QC",faq:"FAQ",open:"Otwórz arkusz",catsTitle:"Popularne wejścia kategorii",catsLead:"Przeglądaj grupy produktów bez powrotu na stronę główną.",trendTitle:"Popularne produkty",trendLead:"Otwieraj szczegóły produktów i badaj realne zdjęcia.",seoTitle:"Artykuły SEO",seoLead:"Poradniki o arkuszach, zdjęciach QC, reverse image search i zakupach proxy.",howTitle:"Jak działa Hacoo VIP",howLead:"Prosta ścieżka od odkrywania do produktów, kategorii i kontroli QC.",qcTitle:"Przewodnik QC",qcLead:"Sprawdź zdjęcia, materiały, rozmiary i szczegóły przed decyzją.",faqTitle:"FAQ",faqLead:"Krótkie odpowiedzi o korzystaniu z Hacoo VIP.",read:"Otwórz stronę",products:"Produkty",categories:"Kategorie",guides:"Poradniki",help:"Pomoc"},
    nl:{ind:"Onafhankelijke gids: dit is niet de officiële Hacoo-app website.",cat:"Categorieën",trend:"Trends",seo:"SEO-artikelen",how:"Hoe het werkt",qc:"QC-gids",faq:"FAQ",open:"Spreadsheet openen",catsTitle:"Populaire categorie-ingangen",catsLead:"Bekijk productgroepen zonder terug te gaan naar de homepage.",trendTitle:"Populaire producten",trendLead:"Open productdetails en onderzoek echte coverafbeeldingen.",seoTitle:"SEO-artikelen",seoLead:"Gidsen over spreadsheets, QC-foto's, reverse image search en proxy buying.",howTitle:"Hoe Hacoo VIP werkt",howLead:"Een eenvoudig pad van externe ontdekking naar producten, categorieën en QC-checks.",qcTitle:"QC-gids",qcLead:"Controleer beelden, materialen, maten en details voordat je verdergaat.",faqTitle:"FAQ",faqLead:"Korte antwoorden over Hacoo VIP als onafhankelijke gids.",read:"Pagina openen",products:"Producten",categories:"Categorieën",guides:"Gidsen",help:"Hulp"}
  };

  const LOCALIZED_PAGES = new Set(["", "index.html", "categories.html", "trending.html", "seo-articles.html", "quality-control-guide.html", "faq.html", "how-it-works.html"]);
  const ARTICLE_PAGES = new Set(["reverse-shopping-guide.html", "hacoo-spreadsheet-2026-guide.html", "hacoo-qc-photos-guide.html", "hacoo-reverse-image-search-workflow.html"]);

  function normalizePath(){
    const parts = location.pathname.replace(/^\/+|\/+$/g, "").split("/").filter(Boolean);
    let currentLang = "en";
    let slugParts = parts;
    if (parts[0] && PREFIX_TO_LANG[parts[0]]) {
      currentLang = PREFIX_TO_LANG[parts[0]];
      slugParts = parts.slice(1);
    }
    let slug = slugParts.join("/");
    if (!slug || slug === "index.html") slug = "";
    return { currentLang, slug, isPrefixed: !!(parts[0] && PREFIX_TO_LANG[parts[0]]) };
  }

  function targetUrl(targetLang){
    const { slug } = normalizePath();
    const prefix = LANGS[targetLang]?.prefix;
    if (!LANGS[targetLang]) return "/";
    if (ARTICLE_PAGES.has(slug)) {
      return targetLang === "en" ? `/${slug}` : `/${prefix}/seo-articles.html`;
    }
    if (LOCALIZED_PAGES.has(slug)) {
      if (targetLang === "en") return slug ? `/${slug}` : "/";
      return slug ? `/${prefix}/${slug}` : `/${prefix}/`;
    }
    if (targetLang === "en") return "/";
    return `/${prefix}/`;
  }

  function getAssetBase(){ return normalizePath().isPrefixed ? "../" : ""; }

  function langMenu(currentLang){
    return `<div class="lang"><button class="langBtn" type="button">🌐 <span data-current-lang>${LANGS[currentLang]?.label || "English"}</span>⌄</button><div class="langMenu"><button data-lang="en">English</button><button data-lang="zh-CN">简体中文</button><button data-lang="es">Español</button><button data-lang="fr">Français</button><button data-lang="de">Deutsch</button><button data-lang="it">Italiano</button><button data-lang="pt">Português</button><button data-lang="pl">Polski</button><button data-lang="nl">Nederlands</button></div></div>`;
  }

  function ensureLanguageModule(){
    const { currentLang } = normalizePath();
    const nav = document.querySelector(".nav");
    if (!nav) return;
    let box = nav.querySelector(".lang");
    if (!box) {
      nav.insertAdjacentHTML("beforeend", langMenu(currentLang));
      box = nav.querySelector(".lang");
    } else {
      if (!box.querySelector(".langMenu")) box.innerHTML = langMenu(currentLang).replace(/^<div class="lang">|<\/div>$/g, "");
    }
    const label = box.querySelector("[data-current-lang]");
    if (label) label.textContent = LANGS[currentLang]?.label || "English";
    box.querySelectorAll("[data-lang]").forEach(btn => btn.classList.toggle("active", btn.dataset.lang === currentLang));
  }

  function setupLanguageSwitcher(){
    ensureLanguageModule();
    const box = document.querySelector(".lang");
    const btn = document.querySelector(".langBtn");
    if (box && btn) {
      btn.addEventListener("click", e => { e.preventDefault(); e.stopPropagation(); box.classList.toggle("open"); });
      document.addEventListener("click", e => { if (!box.contains(e.target)) box.classList.remove("open"); });
    }
    document.querySelectorAll("[data-lang]").forEach(langBtn => {
      langBtn.addEventListener("click", e => {
        e.preventDefault();
        const next = targetUrl(langBtn.dataset.lang);
        window.location.assign(next);
      });
    });
  }

  function setupMenu(){
    const menu = document.querySelector("[data-menu]");
    const links = document.querySelector(".navlinks");
    if (menu && links) menu.addEventListener("click", () => links.classList.toggle("open"));
  }

  function headerHtml(lang,d){
    const base = getAssetBase();
    return `<div class="topbar"><div class="container"><b>${d.ind}</b></div></div><header class="header"><div class="container nav"><a class="brand" href="${normalizePath().isPrefixed ? './' : 'index.html'}"><img alt="Hacoo" src="${base}assets/img/hacoo-logo.svg"><span class="vip">VIP</span></a><button class="menu" data-menu aria-label="menu"><span></span><span></span><span></span></button><nav class="navlinks"><a href="categories.html">${d.cat}</a><a href="trending.html">${d.trend}</a><a href="seo-articles.html">${d.seo}</a><a href="how-it-works.html">${d.how}</a><a href="quality-control-guide.html">${d.qc}</a><a href="faq.html">${d.faq}</a><a class="primary" href="https://www.cnfanshp.com/?utm_source=hacoovip.shop&utm_medium=referral&utm_campaign=${lang}_nav">${d.open}</a></nav>${langMenu(lang)}</div></header>`;
  }

  function cardsHtml(items,read){
    return `<div class="contentGrid">${items.map(i => `<a class="infoCard" href="${i.href}"><h3>${i.t}</h3><p>${i.p}</p><p style="margin-top:14px;font-weight:900;color:#743d1d">${read} →</p></a>`).join("")}</div>`;
  }

  function renderLocalizedPage(){
    const page = document.body.dataset.localPage;
    const lang = document.body.dataset.localLang || normalizePath().currentLang;
    if (!page || !UI[lang]) return;
    const d = UI[lang];
    document.documentElement.lang = lang === "zh-CN" ? "zh-CN" : lang;
    let title = d.catsTitle, lead = d.catsLead, body = "";
    if (page === "categories") {
      title = d.catsTitle; lead = d.catsLead;
      body = cardsHtml([
        {t:lang==="zh-CN"?"鞋":"Shoes",p:lang==="zh-CN"?"运动鞋和鞋类分类入口。":"Sneaker and footwear category entry.",href:"https://www.cnfanshp.com/shoes/?utm_source=hacoovip.shop&utm_medium=referral&utm_campaign=localized_cat_shoes"},
        {t:lang==="zh-CN"?"连帽衫":"Hoodies",p:lang==="zh-CN"?"卫衣、毛衣和层搭单品。":"Sweatshirts, hoodies and layering pieces.",href:"https://www.cnfanshp.com/hoodies-sweaters/?utm_source=hacoovip.shop&utm_medium=referral&utm_campaign=localized_cat_hoodies"},
        {t:lang==="zh-CN"?"夹克":"Jackets",p:lang==="zh-CN"?"外套和季节性单品入口。":"Outerwear and seasonal jacket finds.",href:"https://www.cnfanshp.com/jackets/?utm_source=hacoovip.shop&utm_medium=referral&utm_campaign=localized_cat_jackets"}
      ], d.read);
    }
    if (page === "trending") {
      title = d.trendTitle; lead = d.trendLead;
      body = cardsHtml([
        {t:"Running / Streetwear Sneaker",p:lang==="zh-CN"?"打开匹配的产品详情页。":"Open the matching product-detail page.",href:"https://www.cnfanshp.com/AllProducts/6045.html?utm_source=hacoovip.shop&utm_medium=referral&utm_campaign=localized_trend_shoes"},
        {t:"Sweatshirt",p:lang==="zh-CN"?"检查图片和材质线索。":"Inspect photos and material cues.",href:"https://www.cnfanshp.com/AllProducts/5974.html?utm_source=hacoovip.shop&utm_medium=referral&utm_campaign=localized_trend_sweatshirt"},
        {t:"Jacket",p:lang==="zh-CN"?"查看颜色、细节和质检说明。":"Review colors, details and QC notes.",href:"https://www.cnfanshp.com/AllProducts/5919.html?utm_source=hacoovip.shop&utm_medium=referral&utm_campaign=localized_trend_jacket"}
      ], d.read);
    }
    if (page === "seo") {
      title = d.seoTitle; lead = d.seoLead;
      body = cardsHtml([
        {t:"Hacoo Spreadsheet 2026 Guide",p:lang==="zh-CN"?"把产品表格当作研究地图。":"Use product lists as research maps.",href:"../hacoo-spreadsheet-2026-guide.html"},
        {t:"Hacoo QC Photos Guide",p:lang==="zh-CN"?"行动前先检查 QC 图片。":"Inspect photos before action.",href:"../hacoo-qc-photos-guide.html"},
        {t:"Reverse Image Search Workflow",p:lang==="zh-CN"?"验证图片线索和产品匹配。":"Verify image-led product leads.",href:"../hacoo-reverse-image-search-workflow.html"}
      ], d.read);
    }
    if (page === "how") {
      title = d.howTitle; lead = d.howLead;
      body = cardsHtml([
        {t:d.products,p:lang==="zh-CN"?"先从真实首图进入产品详情页。":"Start from real product covers and open matching details.",href:"trending.html"},
        {t:d.categories,p:lang==="zh-CN"?"再进入对应类目继续筛选。":"Then browse matching categories for broader research.",href:"categories.html"},
        {t:d.qc,p:lang==="zh-CN"?"继续前先看图片、材质和尺码。":"Check images, material cues and sizing before continuing.",href:"quality-control-guide.html"}
      ], d.read);
    }
    if (page === "qc") {
      title = d.qcTitle; lead = d.qcLead;
      body = cardsHtml([
        {t:lang==="zh-CN"?"检查首图":"Check cover image",p:lang==="zh-CN"?"确认图片、标题和目标页面匹配。":"Confirm image, title and destination match.",href:"quality-control-guide.html"},
        {t:lang==="zh-CN"?"查看细节":"Review details",p:lang==="zh-CN"?"检查材质、走线、颜色和尺码。":"Look at material, stitching, color and sizing.",href:"quality-control-guide.html"},
        {t:d.seo,p:lang==="zh-CN"?"阅读更完整的研究流程。":"Open the deeper research workflow.",href:"seo-articles.html"}
      ], d.read);
    }
    if (page === "faq") {
      title = d.faqTitle; lead = d.faqLead;
      body = cardsHtml([
        {t:lang==="zh-CN"?"这是官网吗？":"Is this official?",p:lang==="zh-CN"?"不是，这是独立指南。":"No. It is an independent guide, not official Hacoo.",href:"faq.html"},
        {t:lang==="zh-CN"?"本站销售产品吗？":"Does it sell products?",p:lang==="zh-CN"?"不销售，只提供研究入口和类目链接。":"No. It links to product research pages and categories.",href:"faq.html"},
        {t:lang==="zh-CN"?"为什么先看 QC？":"Why use QC first?",p:lang==="zh-CN"?"单独首图不足以判断产品。":"A strong cover image is not enough for a safe decision.",href:"quality-control-guide.html"}
      ], d.read);
    }
    document.body.innerHTML = `${headerHtml(lang,d)}<main><section class="pageHero container"><span class="eyebrow"><i></i><span>Hacoo VIP</span></span><h1>${title}</h1><p class="lead">${lead}</p><div class="actions"><a class="btn btnDark" href="seo-articles.html">${d.seo}</a><a class="btn btnLight" href="quality-control-guide.html">${d.qc}</a></div></section><section class="container">${body}</section></main><section class="container cta"><div><h2>${d.open}</h2><p>${lead}</p></div><div class="actions"><a class="btn btnWhite" href="https://www.cnfanshp.com/?utm_source=hacoovip.shop&utm_medium=referral&utm_campaign=${lang}_bottom">${d.open}</a><a class="btn btnOutline" href="categories.html">${d.categories}</a></div></section>`;
  }

  function addJsonLd(obj){ const s=document.createElement("script"); s.type="application/ld+json"; s.textContent=JSON.stringify(obj); document.head.appendChild(s); }

  function setupStructuredData(){
    const { slug } = normalizePath();
    const clean = slug || "index.html";
    const url = location.origin + location.pathname;
    const headline = document.querySelector("h1")?.textContent?.trim() || "Hacoo VIP";
    const description = document.querySelector("meta[name='description']")?.content || "Independent Hacoo VIP shopping discovery and product research guide.";
    addJsonLd({"@context":"https://schema.org","@type":"Organization","@id":"https://hacoovip.shop/#organization",name:"Hacoo VIP",url:"https://hacoovip.shop/",description:"Independent shopping discovery and product research guide. Not the official Hacoo app website.",logo:"https://hacoovip.shop/assets/img/hacoo-logo.svg"});
    addJsonLd({"@context":"https://schema.org","@type":"WebSite","@id":"https://hacoovip.shop/#website",name:"Hacoo VIP",url:"https://hacoovip.shop/",publisher:{"@id":"https://hacoovip.shop/#organization"},inLanguage:document.documentElement.lang||"en"});
    addJsonLd({"@context":"https://schema.org","@type":"BreadcrumbList",itemListElement:[{"@type":"ListItem",position:1,name:"Home",item:"https://hacoovip.shop/"},{"@type":"ListItem",position:2,name:headline,item:url}]});
    addJsonLd({"@context":"https://schema.org","@type":clean==="seo-articles.html"?"CollectionPage":"WebPage","@id":`${url}#webpage`,url,name:headline,description,isPartOf:{"@id":"https://hacoovip.shop/#website"},publisher:{"@id":"https://hacoovip.shop/#organization"},inLanguage:document.documentElement.lang||"en"});
    if (clean === "faq.html") {
      const qs = Array.from(document.querySelectorAll(".faqCard,.infoCard")).slice(0,12).map(card => ({"@type":"Question",name:card.querySelector("h3")?.textContent?.trim()||"Question",acceptedAnswer:{"@type":"Answer",text:card.querySelector("p")?.textContent?.trim()||"Answer"}}));
      if (qs.length) addJsonLd({"@context":"https://schema.org","@type":"FAQPage",mainEntity:qs});
    }
    if (ARTICLE_PAGES.has(clean)) addJsonLd({"@context":"https://schema.org","@type":"Article",headline,description,url,datePublished:"2026-07-10",dateModified:"2026-07-10",author:{"@type":"Organization",name:"Hacoo VIP"},publisher:{"@id":"https://hacoovip.shop/#organization"},inLanguage:document.documentElement.lang||"en"});
    const items = Array.from(document.querySelectorAll(".articleCard[href], .infoCard[href]")).slice(0,10).map((card,i) => ({"@type":"ListItem",position:i+1,url:new URL(card.getAttribute("href"),location.href).href,name:card.querySelector("h3")?.textContent?.trim()||`Item ${i+1}`}));
    if (items.length) addJsonLd({"@context":"https://schema.org","@type":"ItemList",itemListElement:items});
  }

  document.addEventListener("DOMContentLoaded", () => {
    renderLocalizedPage();
    ensureLanguageModule();
    setupMenu();
    setupLanguageSwitcher();
    setupStructuredData();
  });
})();
