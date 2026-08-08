import core from './worker-core-uk-20260808.js';

export default {
  async fetch(request, env, ctx) {
    const pathname = new URL(request.url).pathname;
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
