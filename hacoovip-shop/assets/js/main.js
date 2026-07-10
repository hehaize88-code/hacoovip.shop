(() => {
  const SITE = 'https://hacoovip.shop';
  const LANGS = {
    'zh-CN': { label: '简体中文', path: '/' },
    en: { label: 'English', path: '/en/' },
    es: { label: 'Español', path: '/es/' },
    fr: { label: 'Français', path: '/fr/' },
    de: { label: 'Deutsch', path: '/de/' },
    it: { label: 'Italiano', path: '/it/' },
    pt: { label: 'Português', path: '/pt/' },
    pl: { label: 'Polski', path: '/pl/' },
    nl: { label: 'Nederlands', path: '/nl/' }
  };

  const pageTitles = {
    '/': 'Hacoo VIP Spreadsheet for China Shopping Finds',
    '/en/': 'Hacoo VIP English Guide',
    '/es/': 'Guía Hacoo VIP en Español',
    '/fr/': 'Guide Hacoo VIP en Français',
    '/de/': 'Hacoo VIP Deutsch',
    '/it/': 'Guida Hacoo VIP in Italiano',
    '/pt/': 'Guia Hacoo VIP em Português',
    '/pl/': 'Hacoo VIP po Polsku',
    '/nl/': 'Hacoo VIP Nederlands',
    '/categories.html': 'Hacoo VIP Categories',
    '/trending.html': 'Hacoo VIP Trending Products',
    '/seo-articles.html': 'Hacoo VIP SEO Articles',
    '/reverse-shopping-guide.html': 'Hacoo VIP Reverse Shopping Guide',
    '/hacoo-spreadsheet-2026-guide.html': 'Hacoo Spreadsheet 2026 Guide',
    '/hacoo-qc-photos-guide.html': 'Hacoo QC Photos Guide',
    '/hacoo-reverse-image-search-workflow.html': 'Hacoo Reverse Image Search Workflow',
    '/quality-control-guide.html': 'Hacoo VIP QC Guide',
    '/faq.html': 'Hacoo VIP FAQ',
    '/how-it-works.html': 'How Hacoo VIP Works',
    '/shipping-guide.html': 'Hacoo VIP Shipping Notes',
    '/disclaimer.html': 'Hacoo VIP Disclaimer'
  };

  const articlePages = {
    '/reverse-shopping-guide.html': {
      headline: 'Hacoo VIP Reverse Shopping Guide: Product Research Before Proxy Buying',
      description: 'A practical reverse-shopping guide for product research, QC-first inspection and proxy-buying decisions.',
      datePublished: '2026-07-09',
      dateModified: '2026-07-10',
      keywords: ['Hacoo VIP', 'reverse shopping', 'proxy buying', 'QC guide', 'product research']
    },
    '/hacoo-spreadsheet-2026-guide.html': {
      headline: 'Hacoo Spreadsheet 2026 Guide: How to Use Product Lists Safely',
      description: 'A 2026 guide to using Hacoo-style spreadsheet lists as product research maps before any proxy-buying decision.',
      datePublished: '2026-07-10',
      dateModified: '2026-07-10',
      keywords: ['Hacoo spreadsheet 2026', 'shopping spreadsheet', 'product research', 'QC checklist']
    },
    '/hacoo-qc-photos-guide.html': {
      headline: 'Hacoo QC Photos Guide: How to Inspect Product Images Before Buying',
      description: 'A QC-first guide to reviewing product cover images, detail photos, materials, sizing clues and risk signals.',
      datePublished: '2026-07-10',
      dateModified: '2026-07-10',
      keywords: ['Hacoo QC photos', 'QC guide', 'product images', 'shopping research']
    },
    '/hacoo-reverse-image-search-workflow.html': {
      headline: 'Hacoo Reverse Image Search Workflow for Product Research',
      description: 'A workflow for using reverse image search to verify product covers, categories and destination pages before proxy buying.',
      datePublished: '2026-07-10',
      dateModified: '2026-07-10',
      keywords: ['Hacoo reverse image search', 'product research workflow', 'proxy buying guide']
    },
    '/quality-control-guide.html': {
      headline: 'Hacoo VIP QC Guide for Product Research',
      description: 'A quality-control guide for checking product covers, detail photos, size notes and product-page consistency.',
      datePublished: '2026-07-09',
      dateModified: '2026-07-10',
      keywords: ['Hacoo QC guide', 'quality control', 'product research', 'QC photos']
    }
  };

  function normalizePath() {
    let path = window.location.pathname || '/';
    if (path.endsWith('/index.html')) path = path.replace(/index\.html$/, '');
    if (path === '') path = '/';
    return path;
  }

  function currentLang() {
    const first = normalizePath().split('/').filter(Boolean)[0];
    return LANGS[first] ? first : 'zh-CN';
  }

  function addJsonLd(data) {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(data, null, 2);
    document.head.appendChild(script);
  }

  function pageUrl(path = normalizePath()) {
    return SITE + (path === '/' ? '/' : path);
  }

  function addGlobalSchema() {
    addJsonLd({
      '@context': 'https://schema.org',
      '@id': SITE + '/#organization',
      '@type': 'Organization',
      name: 'Hacoo VIP',
      url: SITE + '/',
      logo: SITE + '/assets/img/hacoo-logo.svg',
      description: 'Independent shopping discovery and product research guide. Not the official Hacoo app website.'
    });
    addJsonLd({
      '@context': 'https://schema.org',
      '@id': SITE + '/#website',
      '@type': 'WebSite',
      name: 'Hacoo VIP',
      url: SITE + '/',
      inLanguage: ['zh-CN', 'en', 'es', 'fr', 'de', 'it', 'pt', 'pl', 'nl'],
      publisher: { '@id': SITE + '/#organization' }
    });
  }

  function addBreadcrumbSchema() {
    const path = normalizePath();
    const title = pageTitles[path] || document.title || 'Hacoo VIP';
    const itemListElement = [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE + '/' }
    ];
    if (path !== '/') itemListElement.push({ '@type': 'ListItem', position: 2, name: title, item: pageUrl(path) });
    addJsonLd({ '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement });
  }

  function addPageSchema() {
    const path = normalizePath();
    const title = pageTitles[path] || document.title || 'Hacoo VIP';
    const data = {
      '@context': 'https://schema.org',
      '@type': path === '/seo-articles.html' ? 'CollectionPage' : 'WebPage',
      name: title,
      url: pageUrl(path),
      isPartOf: { '@id': SITE + '/#website' },
      publisher: { '@id': SITE + '/#organization' },
      inLanguage: currentLang()
    };
    if (articlePages[path]) data.description = articlePages[path].description;
    addJsonLd(data);
  }

  function addArticleSchema() {
    const path = normalizePath();
    const article = articlePages[path];
    if (!article) return;
    addJsonLd({
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: article.headline,
      description: article.description,
      mainEntityOfPage: pageUrl(path),
      url: pageUrl(path),
      datePublished: article.datePublished,
      dateModified: article.dateModified,
      author: { '@id': SITE + '/#organization' },
      publisher: { '@id': SITE + '/#organization' },
      keywords: article.keywords,
      articleSection: 'Shopping research and QC guide',
      inLanguage: 'en'
    });
  }

  function addFaqSchema() {
    if (normalizePath() !== '/faq.html') return;
    addJsonLd({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        ['Is Hacoo VIP an official Hacoo website?', 'No. Hacoo VIP is an independent shopping discovery and education site. It is not the official Hacoo app website and does not claim an official partnership.'],
        ['Does Hacoo VIP sell products?', 'No. The site provides navigation, product research, category guidance and external links only. It does not process orders, payment, warehousing or shipping.'],
        ['What do product cards open?', 'Product cards open matching product-detail pages so users can review images, titles, category fit and available details.'],
        ['What do category cards open?', 'Category cards open broader category pages such as shoes, hoodies, jackets or accessories, so users can browse multiple items.'],
        ['How do SEO article cards work?', 'Article cards are ordered by update date and link to independent guide pages such as spreadsheet research, QC photos and reverse image search workflows.'],
        ['Why should users check QC before proxy buying?', 'QC checks help users review material cues, sizing notes, stitching, color consistency and packaging details before continuing any shopping workflow.'],
        ['Does the language switcher create SEO language pages?', 'Yes. The site uses separate language directories such as /en/, /es/, /fr/, /de/, /it/, /pt/, /pl/ and /nl/.'],
        ['Where is the sitemap?', 'The sitemap is available at https://hacoovip.shop/sitemap.xml and lists the core pages and SEO article pages.'],
        ['Can users treat spreadsheet links as proof of quality?', 'No. Spreadsheet links should be treated as research leads, not proof of quality, authenticity, logistics or seller reliability.'],
        ['When should a user stop researching an item?', 'A user should stop when the image, title and destination do not match, when detail photos are missing, or when links feel misleading.']
      ].map(([name, text]) => ({ '@type': 'Question', name, acceptedAnswer: { '@type': 'Answer', text } }))
    });
  }

  function addCollectionSchema() {
    if (normalizePath() !== '/seo-articles.html') return;
    const articles = [
      ['Hacoo Spreadsheet 2026 Guide', '/hacoo-spreadsheet-2026-guide.html'],
      ['Hacoo QC Photos Guide', '/hacoo-qc-photos-guide.html'],
      ['Hacoo Reverse Image Search Workflow', '/hacoo-reverse-image-search-workflow.html'],
      ['Hacoo VIP Reverse Shopping Guide', '/reverse-shopping-guide.html']
    ];
    addJsonLd({
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: 'Hacoo VIP SEO Articles',
      itemListElement: articles.map(([name, path], index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name,
        url: pageUrl(path)
      }))
    });
  }

  function setupLanguageMenu() {
    const active = currentLang();
    document.documentElement.lang = active;
    const current = document.querySelector('[data-current-lang]');
    if (current && LANGS[active]) current.textContent = LANGS[active].label;

    const langWrap = document.querySelector('.lang');
    const langButton = document.querySelector('.langBtn');
    if (langWrap && langButton) {
      langButton.addEventListener('click', event => {
        event.stopPropagation();
        langWrap.classList.toggle('open');
      });
      document.addEventListener('click', event => {
        if (!langWrap.contains(event.target)) langWrap.classList.remove('open');
      });
      document.querySelectorAll('[data-lang]').forEach(button => {
        const code = button.dataset.lang;
        button.classList.toggle('active', code === active);
        button.addEventListener('click', event => {
          event.preventDefault();
          window.location.href = LANGS[code] ? LANGS[code].path : '/';
        });
      });
    }
  }

  function setupMobileMenu() {
    const button = document.querySelector('[data-menu]');
    const links = document.querySelector('.navlinks');
    if (button && links) button.addEventListener('click', () => links.classList.toggle('open'));
  }

  document.addEventListener('DOMContentLoaded', () => {
    setupMobileMenu();
    setupLanguageMenu();
    addGlobalSchema();
    addBreadcrumbSchema();
    addPageSchema();
    addArticleSchema();
    addFaqSchema();
    addCollectionSchema();
  });
})();
