import * as cheerio from 'cheerio';

export const ORIGIN = 'https://cnfanshm.com';
export const REGISTER_URL = 'https://www.lolobuy.com/index';
export const PER_PAGE = 20;
export type Product = { id: string; title: string; image: string; cny: number | null; usd: number | null };
export type Category = { slug: string; title: string; path: string };
export class SourceError extends Error { status: number; constructor(message: string, status = 503) { super(message); this.status = status; } }

// Disposable, bounded response cache. No database, product export or image library.
const cache = new Map<string, { expires: number; text: string }>();
const pending = new Map<string, Promise<string>>();
export async function sourceText(path: string, ttl = 300_000): Promise<string> {
  const url = new URL(path, ORIGIN);
  if (url.origin !== ORIGIN) throw new SourceError('Invalid source', 400);
  const key = url.href;
  const entry = cache.get(key);
  if (entry && entry.expires > Date.now()) return entry.text;
  if (pending.has(key)) return pending.get(key)!;
  const promise = (async () => {
    const response = await fetch(key, { headers: { 'User-Agent': 'Mozilla/5.0 (compatible; LoloBuySheet/1.0)', Accept: 'text/html' }, signal: AbortSignal.timeout(12000), redirect: 'manual' });
    // Follow only redirects within the approved data source.
    if (response.status >= 300 && response.status < 400) {
      const target = new URL(response.headers.get('location') || '/', key);
      if (!['cnfanshm.com', 'www.cnfanshm.com'].includes(target.hostname) || target.protocol !== 'https:') throw new SourceError('Unexpected source redirect');
      const next = await fetch(target.href, { headers: { 'User-Agent': 'Mozilla/5.0 (compatible; LoloBuySheet/1.0)' }, signal: AbortSignal.timeout(12000), redirect: 'error' });
      if (!next.ok) throw new SourceError(`Source HTTP ${next.status}`, next.status === 404 ? 404 : 503);
      const text = await next.text();
      if (text.length > 2_000_000) throw new SourceError('Source response too large');
      return text;
    }
    if (!response.ok) throw new SourceError(`Source HTTP ${response.status}`, response.status === 404 ? 404 : 503);
    const text = await response.text();
    if (text.length > 2_000_000) throw new SourceError('Source response too large');
    if (cache.size >= 48) cache.delete(cache.keys().next().value!);
    cache.set(key, { expires: Date.now() + ttl, text });
    return text;
  })().catch(e => { throw e instanceof SourceError ? e : new SourceError('Source unavailable'); }).finally(() => pending.delete(key));
  pending.set(key, promise);
  return promise;
}
export function imageUrl(value?: string): string {
  if (!value || value.startsWith('data:')) return '';
  try { const u = new URL(value, ORIGIN); return u.protocol === 'https:' && ['cnfanshm.com', 'www.cnfanshm.com'].includes(u.hostname) && u.pathname.startsWith('/uploads/') ? u.href : ''; } catch { return ''; }
}
export function parseRate(script: string): number {
  const rate = Number(script.match(/CNY_TO_USD_RATE\s*=\s*([\d.]+)/)?.[1]);
  if (!Number.isFinite(rate) || rate <= 0) throw new SourceError('Source currency rule missing');
  return rate;
}
async function rate() { return parseRate(await sourceText('/template/moban/pc/static/js/script.js?v=2.3.0', 3_600_000)); }
function amount(s: string): number | null { const n = Number(s.replace(/[^\d.]/g, '')); return s.trim() && Number.isFinite(n) && n > 0 ? n : null; }
export function parseList(html: string, conversion: number) {
  const $ = cheerio.load(html);
  if (!$('.product-grid').length) throw new SourceError('Source catalog markup unavailable');
  const items: Product[] = [];
  $('.product-grid .product-card').each((_, node) => {
    const el = $(node);
    const id = (el.find('a.product-image').attr('href') || '').match(/\/AllProducts\/(\d+)\.html/)?.[1];
    const title = el.find('.product-name, .product-title').first().text().trim();
    const img = el.find('img').first();
    const image = imageUrl(img.attr('data-src') || img.attr('src'));
    const cny = amount(el.find('.product-price').first().text());
    if (id && title && !items.some(p => p.id === id)) items.push({ id, title, image, cny, usd: cny === null ? null : Math.round(cny / conversion * 100) / 100 });
  });
  const pagination = $('.pagination');
  const current = Number(pagination.find('.active').text().trim()) || 1;
  const pageNumbers = pagination.find('a').toArray().map(a => Number($(a).text().trim())).filter(n => Number.isInteger(n) && n > 0);
  const hasNext = pagination.find('a').toArray().some(a => $(a).text().includes('下一页') && Boolean($(a).attr('href')));
  const knownMax = Math.max(current, ...pageNumbers);
  return { items, current, hasNext, knownMax };
}
export function parseCategories(html: string): Category[] {
  const $ = cheerio.load(html); const list: Category[] = [];
  $('.filter-options .filter-btn').each((_, el) => {
    const path = ($(el).attr('onclick') || '').match(/location.href\s*=\s*['"]([^'"]+)/)?.[1];
    if (path && /^\/[a-z0-9-]+\/$/.test(path) && !list.some(c => c.path === path)) list.push({ slug: path.split('/')[1], path, title: $(el).text().trim() });
  });
  if (!list.length) throw new SourceError('Source categories unavailable');
  return list;
}
export async function getCategories() { return parseCategories(await sourceText('/AllProducts/', 3_600_000)); }
export function makeBuyUrl(id: string, sourceUrl: string): string | null {
  try {
    const source = new URL(sourceUrl);
    if (!/^\d+$/.test(id) || source.hostname !== 'weidian.com' || source.pathname !== '/item.html' || source.searchParams.get('itemID') !== id) return null;
    return `https://www.lolobuy.com/productDetail/${id}?url=${encodeURIComponent(`https://weidian.com/item.html?itemID=${id}`)}`;
  } catch { return null; }
}
export async function getCatalog(params: { q?: string; category?: string; sort?: string; page?: number } = {}) {
  const q = (params.q || '').trim().slice(0, 100);
  const category = params.category || '';
  const page = Math.max(1, Math.min(9000, Math.floor(params.page || 1)));
  const sort = ['new', 'popular', 'price-asc', 'price-desc'].includes(params.sort || '') ? params.sort! : 'new';
  const categories = await getCategories();
  const selected = categories.find(c => c.slug === category);
  if (category && !selected) throw new SourceError('Category not found', 404);
  let tid = '1';
  if (selected && !q) {
    const categoryHTML = await sourceText(selected.path, 3_600_000);
    tid = categoryHTML.match(/[?&]tid=(\d+)/)?.[1] || '';
    if (!tid) throw new SourceError('Category source ID unavailable');
  }
  const conversion = await rate();
  const buildSourceUrl = (sourcePage: number) => {
    const url = new URL(q ? '/search.html' : '/index.php', ORIGIN);
    if (q) { url.searchParams.set('keywords', q); url.searchParams.set('channelid', '2'); url.searchParams.set('method', '1'); }
    else { for (const [k, v] of Object.entries({ m: 'home', c: 'Lists', a: 'index', tid, sort: sort === 'popular' ? 'click' : sort.startsWith('price') ? 'price' : 'new', sort_asc: sort === 'price-asc' ? 'asc' : 'desc', ZXljbXM: '1' })) url.searchParams.set(k, v); }
    if (sourcePage > 1) url.searchParams.set('page', String(sourcePage));
    return url;
  };
  const firstUrl = buildSourceUrl(1);
  const first = parseList(await sourceText(firstUrl.href), conversion);
  // Discover the upstream page size instead of baking a catalog/page-size export.
  const sourceSize = first.items.length;
  if (!sourceSize) return { items: [], categories, page, hasNext: false, knownMax: 1, q, sort, category, conversion };
  const start = (page - 1) * PER_PAGE;
  const sourcePage = Math.floor(start / sourceSize) + 1;
  const offset = start % sourceSize;
  const data = sourcePage === 1 ? first : parseList(await sourceText(buildSourceUrl(sourcePage).href), conversion);
  if (data.current !== sourcePage && sourcePage > 1) throw new SourceError('Page not found', 404);
  let items = data.items.slice(offset, offset + PER_PAGE);
  // Handles an upstream page size that is not divisible by 20.
  let nextData: ReturnType<typeof parseList> | null = null;
  if (items.length < PER_PAGE && data.hasNext) {
    nextData = parseList(await sourceText(buildSourceUrl(sourcePage + 1).href), conversion);
    items = items.concat(nextData.items.slice(0, PER_PAGE - items.length));
  }
  if (!items.length && page > 1) throw new SourceError('Page not found', 404);
  const hasNext = nextData ? nextData.items.length > PER_PAGE - data.items.slice(offset).length || nextData.hasNext : offset + PER_PAGE < data.items.length || data.hasNext;
  const knownMax = data.hasNext ? Math.max(page + 1, Math.ceil(data.knownMax * sourceSize / PER_PAGE)) : Math.ceil(((sourcePage - 1) * sourceSize + data.items.length) / PER_PAGE);
  return { items, categories, page, hasNext, knownMax, q, sort, category, conversion };
}
export function parseDetail(html: string, id: string, conversion: number) {
  const $ = cheerio.load(html); const title = $('.product-detail .product-title').first().text().trim();
  if (!title) throw new SourceError('Product not found', 404);
  const images = [...new Set($('.product-gallery img').toArray().map(img => imageUrl($(img).attr('data-src') || $(img).attr('src'))).filter(Boolean))];
  const source = $('.product-detail a.weidian-btn').attr('href') || '';
  const sourceId = (() => { try { return new URL(source).searchParams.get('itemID') || ''; } catch { return ''; } })();
  const cny = amount($('.product-detail .product-price').first().text());
  return { id, title, images, sourceId, source, buyUrl: makeBuyUrl(sourceId, source), cny, usd: cny === null ? null : Math.round(cny / conversion * 100) / 100, qcImages: [] as string[] };
}
export async function getProduct(id: string) {
  if (!/^\d{1,12}$/.test(id)) throw new SourceError('Product not found', 404);
  const [html, conversion] = await Promise.all([sourceText(`/AllProducts/${id}.html`), rate()]);
  return parseDetail(html, id, conversion);
}
