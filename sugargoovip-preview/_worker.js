import core from './worker-core-uk-20260808.js';

const CANONICAL_HOST = 'sugargoovip.uk';
const CACHE_VERSION = '20260904-3';
const CLIENT_LANGS = new Set(['es','fr','de','it','pt','pl','nl','zh']);

function canonicalRoutePath(pathname) {
  if (pathname === '/index.html') return '/';
  if (pathname === '/guides/index.html') return '/guides/';
  if (pathname === '/products/index.html') return '/products/';
  return pathname;
}

function htmlAssetPath(pathname) {
  if (pathname === '/' || pathname === '/index.html') return '/';
  if (pathname.endsWith('/')) return pathname;
  if (pathname.endsWith('.html')) return pathname.slice(0, -5);
  return null;
}

async function staticHtmlResponse(request, env, pathname, lang) {
  const assetPath = htmlAssetPath(pathname);
  if (!assetPath) return null;
  const assetUrl = new URL(request.url);
  assetUrl.hostname = CANONICAL_HOST;
  assetUrl.protocol = 'https:';
  assetUrl.pathname = assetPath;
  assetUrl.search = '';
  const response = await env.ASSETS.fetch(new Request(assetUrl.toString(), request));
  if (!response.ok) return null;
  if (!CLIENT_LANGS.has(lang)) return response;

  let html = await response.text();
  const robotsTag = /<meta\b(?=[^>]*\bname=["']robots["'])[^>]*>/i;
  if (robotsTag.test(html)) {
    html = html.replace(robotsTag, '<meta name="robots" content="noindex,follow,max-image-preview:large">');
  } else {
    html = html.replace(/<\/head>/i, '<meta name="robots" content="noindex,follow,max-image-preview:large"></head>');
  }
  return new Response(html, {
    status: 200,
    headers: {
      'content-type': 'text/html; charset=UTF-8',
      'cache-control': 'private, no-cache',
      'x-content-type-options': 'nosniff'
    }
  });
}

async function edgeCachedHtml(request, ctx, createResponse) {
  const url = new URL(request.url);
  if (request.method !== 'GET' || url.search) return createResponse();

  const cacheUrl = new URL(url);
  cacheUrl.searchParams.set('__edge', CACHE_VERSION);
  const cacheKey = new Request(cacheUrl.toString(), { method: 'GET' });
  const cached = await caches.default.match(cacheKey);
  if (cached) {
    const headers = new Headers(cached.headers);
    headers.set('x-sugargoo-edge-cache', 'HIT');
    return new Response(cached.body, { status: cached.status, headers });
  }

  const response = await createResponse();
  if (!response) return response;
  const contentType = response.headers.get('content-type') || '';
  if (response.status !== 200 || !contentType.includes('text/html')) return response;

  const headers = new Headers(response.headers);
  headers.set('cache-control', 'public, max-age=300, s-maxage=86400, stale-while-revalidate=604800');
  headers.set('x-sugargoo-edge-cache', 'MISS');
  const cacheable = new Response(response.body, { status: response.status, headers });
  const storedHeaders = new Headers(headers);
  storedHeaders.set('x-sugargoo-edge-cache', 'READY');
  const stored = new Response(cacheable.clone().body, { status: cacheable.status, headers: storedHeaders });
  ctx.waitUntil(caches.default.put(cacheKey, stored));
  return cacheable;
}

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const host = url.hostname.toLowerCase();

    if (host === 'www.sugargoovip.uk' || host.endsWith('.pages.dev') || url.protocol !== 'https:') {
      url.protocol = 'https:';
      url.hostname = CANONICAL_HOST;
      url.port = '';
      return Response.redirect(url.toString(), 301);
    }

    const pathname = url.pathname;
    const queryLang = (url.searchParams.get('lang') || '').toLowerCase();
    const cleanPath = canonicalRoutePath(pathname);

    if (cleanPath !== pathname) {
      url.pathname = cleanPath;
      return Response.redirect(url.toString(), 301);
    }

    // English query variants consolidate to the clean canonical URL.
    if (queryLang === 'en') {
      url.pathname = cleanPath;
      url.searchParams.delete('lang');
      return Response.redirect(url.toString(), 301);
    }
    // Old locale folders are one-way aliases. They land on the same-page
    // client translation state and can no longer redirect back into a loop.
    const legacyLocale = pathname.match(/^\/(es|fr|de|it|pt|pl|nl|zh)(\/.*)?$/);
    if (legacyLocale) {
      url.pathname = canonicalRoutePath(legacyLocale[2] || '/');
      url.searchParams.set('lang', legacyLocale[1]);
      return Response.redirect(url.toString(), 301);
    }

    if (pathname === '/robots.txt' || pathname === '/sitemap.xml' || pathname === '/sitemap.txt' || pathname === '/sitemap-index.xml') {
      return env.ASSETS.fetch(request);
    }

    if (
      pathname.startsWith('/assets/') ||
      pathname.startsWith('/tools/') ||
      /\.(?:css|js|json|png|jpe?g|webp|gif|svg|ico|woff2?|ttf|map)$/i.test(pathname)
    ) {
      return env.ASSETS.fetch(request);
    }

    // Extensionless content stays with the canonical router so it can 301 to .html.
    if (!pathname.endsWith('/') && !pathname.includes('.')) {
      return core.fetch(request, env, ctx);
    }

    // Generate this landing page from the current catalogue so its search
    // metadata and visible count cannot drift apart.
    if (pathname === '/products/') {
      return edgeCachedHtml(request, ctx, () => core.fetch(request, env, ctx));
    }

    // The generated static catalogue, categories and articles are the source of truth.
    const lang = url.searchParams.get('lang') || 'en';
    const staticResponse = await edgeCachedHtml(request, ctx, () => staticHtmlResponse(request, env, pathname, lang));
    if (staticResponse) return staticResponse;

    return edgeCachedHtml(request, ctx, () => core.fetch(request, env, ctx));
  }
};
