import core from './worker-core-uk-20260808.js';

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const pathname = url.pathname;
    const lang = url.searchParams.get('lang');

    if ((pathname === '/' || pathname === '/index.html') && (!lang || lang === 'en')) {
      const assetUrl = new URL(request.url);
      assetUrl.pathname = '/index.html';
      assetUrl.search = '';
      return env.ASSETS.fetch(new Request(assetUrl.toString(), request));
    }

    if (pathname === '/robots.txt' || pathname === '/sitemap-index.xml') {
      return env.ASSETS.fetch(request);
    }

    if (
      pathname.startsWith('/assets/') ||
      pathname.startsWith('/tools/') ||
      /\.(?:css|js|json|png|jpe?g|webp|gif|svg|ico|woff2?|ttf|map)$/i.test(pathname)
    ) {
      return env.ASSETS.fetch(request);
    }

    return core.fetch(request, env, ctx);
  }
};
