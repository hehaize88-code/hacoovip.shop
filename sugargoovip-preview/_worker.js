import core from './worker-core-uk-20260808.js';

const CANONICAL_HOST = 'sugargoovip.uk';
const CLIENT_LANGS = new Set(['es','fr','de','it','pt','pl','nl','zh']);

function htmlAssetPath(pathname) {
  if (pathname === '/' || pathname === '/index.html') return '/index.html';
  if (pathname.endsWith('/')) return pathname + 'index.html';
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
  if (/<meta[^>]+name=["']robots["'][^>]*>/i.test(html)) {
    html = html.replace(/<meta[^>]+name=["']robots["'][^>]*>/i, '<meta name="robots" content="noindex,follow,max-image-preview:large">');
  } else {
    html = html.replace(/<\/head>/i, '<meta name="robots" content="noindex,follow,max-image-preview:large"></head>');
  }
  return new Response(html, {
    status: 200,
    headers: {
      'content-type': 'text/html; charset=UTF-8',
      'cache-control': 'public, max-age=0, must-revalidate',
      'x-content-type-options': 'nosniff'
    }
  });
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
    const legacyLocale = pathname.match(/^\/(de|fr|es|pl)(\/.*)?$/);
    if (legacyLocale) return core.fetch(request, env, ctx);

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

    // The generated static catalogue, categories and articles are the source of truth.
    const lang = url.searchParams.get('lang') || 'en';
    const staticResponse = await staticHtmlResponse(request, env, pathname, lang);
    if (staticResponse) return staticResponse;

    return core.fetch(request, env, ctx);
  }
};
