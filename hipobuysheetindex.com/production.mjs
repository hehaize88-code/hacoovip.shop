const canonicalHost = 'hipobuysheetindex.com'
const productionOrigin = 'https://' + canonicalHost
const analyticsId = 'G-E4YJLLCSBB'
const verificationFile = 'googledec2538cb510c9a8.html'
const bingVerification = '5C3F81E3632C3A1AB9E5CF1F80D171BD'
const primaryPages = ['', 'spreadsheet/', 'categories/', 'image-search/', 'faq/']
function xmlDocument(root, entries) {
  const body = '<?xml version="1.0" encoding="UTF-8"?><' + root + ' xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' + entries.join('') + '</' + root + '>'
  return new Response(body,{headers:{'content-type':'application/xml; charset=utf-8','cache-control':'public, max-age=900'}})
}
const previewHandler = render
render = async function serveSite(request) {
  const url = new URL(request.url)
  if (![canonicalHost, 'www.' + canonicalHost].includes(url.hostname)) return previewHandler(request)
  if (url.protocol !== 'https:' || url.hostname !== canonicalHost) return Response.redirect(productionOrigin + url.pathname + url.search, 308)
  const path = url.pathname
  if (path === '/' + verificationFile) return new Response('google-site-verification: ' + verificationFile, {headers:{'content-type':'text/plain'}})
  if (path === '/BingSiteAuth.xml') return new Response('<?xml version="1.0"?><users><user>'+bingVerification+'</user></users>',{headers:{'content-type':'application/xml'}})
  if (path === '/robots.txt') return new Response('User-agent: *\nAllow: /\nDisallow: /visual-api/\nSitemap: ' + productionOrigin + '/sitemap.xml\n',{headers:{'content-type':'text/plain; charset=utf-8'}})
  if (path === '/sitemap.xml') return xmlDocument('sitemapindex',Object.keys(languages).map(lang=>'<sitemap><loc>'+productionOrigin+'/sitemap-'+lang+'.xml</loc></sitemap>'))
  const languageMap = path.match(/^\/sitemap-([\w-]+)\.xml$/)
  if (languageMap && Object.hasOwn(languages,languageMap[1])) {
    const base = productionOrigin + '/' + languageMap[1] + '/'
    const paths = primaryPages.concat(catalogProductIds.map(id=>'product/'+id+'/'))
    return xmlDocument('urlset',paths.map(p=>'<url><loc>'+base+p+'</loc></url>'))
  }
  const page = await previewHandler(request)
  if (!(page.headers.get('content-type') || '').includes('text/html')) return page
  const headers = new Headers(page.headers)
  if(page.ok && !url.search)headers.delete('x-robots-tag')
  const tag = '<meta name="msvalidate.01" content="'+bingVerification+'"><script async src="https://www.googletagmanager.com/gtag/js?id='+analyticsId+'"></script><script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag("js",new Date());gtag("config","'+analyticsId+'");</script>'
  return new Response((await page.text()).replace('<meta charset="utf-8">','<meta charset="utf-8">'+tag),{status:page.status,headers})
}
