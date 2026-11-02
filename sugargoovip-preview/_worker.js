import { origin, renderPage, resolvePage } from './edition.js';

const VERSION='20261102-edition-v1';

async function fetchPage(request,env,ctx,page) {
  const cacheUrl=new URL(request.url);
  cacheUrl.search='';
  cacheUrl.searchParams.set('__edition',VERSION);
  const key=new Request(cacheUrl.toString());
  const cached=await caches.default.match(key);
  if(cached)return cached;
  const response=await renderPage(page.base,page.lang,env);
  ctx.waitUntil(caches.default.put(key,response.clone()));
  return response;
}
export default {
  async fetch(request,env,ctx) {
    const url=new URL(request.url);
    const expected=new URL(origin);
    // Fold the host, protocol, language and path into a single redirect.
    const moveHost=url.hostname!==expected.hostname || url.protocol!=='https:';
    const pathOnly=url.pathname;
    url.hostname=expected.hostname;url.protocol='https:';url.port='';
    const page=resolvePage(url);
    if(moveHost || page?.redirect)return Response.redirect(page?.redirect||url.toString(),308);
    if(request.method!=='GET' && request.method!=='HEAD')return new Response(null,{status:405,headers:{allow:'GET, HEAD'}});
    if(page){
      const result=await fetchPage(request,env,ctx,page);
      return request.method==='HEAD'?new Response(null,{status:result.status,headers:result.headers}):result;
    }
    if(pathOnly.startsWith('/assets/') || pathOnly==='/robots.txt' || pathOnly==='/sitemap.txt' || /^\/sitemap(?:-[a-z]+)?\.xml$/.test(pathOnly) || pathOnly==='/favicon.ico'){
      return env.ASSETS.fetch(request);
    }
    const template=await env.ASSETS.fetch(new URL('/404',origin).toString());
    return new Response(request.method==='HEAD'?null:template.body,{status:404,headers:{'content-type':'text/html; charset=UTF-8','x-robots-tag':'noindex','cache-control':'public,max-age=60'}});
  }
};
