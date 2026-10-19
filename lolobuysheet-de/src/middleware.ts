import { defineMiddleware } from 'astro:middleware';
export const onRequest = defineMiddleware(async (_, next) => {
  const response = await next();
  if (import.meta.env.PUBLIC_SITE_PREVIEW === 'true') {
    response.headers.set('X-Robots-Tag', 'noindex, nofollow, noarchive');
  }
  return response;
});
