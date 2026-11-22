const origin = 'https://www.cnfanshp.com';
const pageSize = 20;
const sourcePageSize = 60;
const defaultList = '/index.php?m=home&c=Lists&a=index&tid=1&sort=new&sort_asc=desc&ZXljbXM=1';

async function read(path, allowMissing=false) {
  let lastError;
  for (const host of [origin, 'https://cnfanshp.com']) {
    try {
      const response = await fetch(new URL(path, host), {
        headers: { Accept: 'text/html', 'User-Agent': 'iTaoBuySpreadsheetPreview/1.0' },
        cf: { cacheEverything: true, cacheTtlByStatus: { '200-299': 300, '400-599': 0 } },
        signal: AbortSignal.timeout(9000)
      });
      if(allowMissing && response.status===404)return '';
      if (!response.ok) throw new Error('Catalog returned ' + response.status);
      const html = await response.text();
      if (!html.includes('list-container') && !html.includes('class="product-detail"')) throw new Error('Unexpected catalog page');
      return html;
    } catch (error) { lastError = error; }
  }
  throw lastError;
}

function clean(text = '') {
  return text.replace(/<[^>]+>/g, '').replace(/&amp;/g, '&').replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'").replace(/&nbsp;/g, ' ').replace(/\s+/g,' ').trim();
}

function imageUrl(value) {
  if (!value) return '';
  try {
    const url = new URL(value, origin);
    if (!['cnfanshp.com','www.cnfanshp.com'].includes(url.hostname) || !url.pathname.startsWith('/uploads/')) return '';
    return origin + url.pathname;
  } catch { return ''; }
}

function categoriesFrom(html) {
  return [...html.matchAll(/window\.location\.href='\/([a-z0-9-]+)\/'">\s*<span class="btn-text">([^<]+)</g)].map(m => ({id:m[1], name:clean(m[2])}));
}

function parseCards(html) {
  return html.split(/<div class="product-card\b/).slice(1).map(card => ({
    id: card.match(/data-id="(\d+)"/)?.[1],
    name: clean(card.match(/class="product-name">([\s\S]*?)<\/h3>/)?.[1]),
    price: clean(card.match(/class="product-price">([^<]*)</)?.[1]),
    image: imageUrl(card.match(/data-src="([^"]+)"/)?.[1])
  })).filter(item => item.id && item.name);
}

const counts=new Map();
async function countListing(path, firstHtml, wholeCatalog) {
  const now=Date.now(), saved=counts.get(path);
  if(saved && saved.until>now)return saved.total;
  const pageData=async n=>n===1?firstHtml:await read(path+'&page='+n,true);
  const hasNext=html=>/<a\s[^>]*href=[^>]*>\s*下一页\s*<\/a>/.test(html);
  let low=1, high=wholeCatalog?101:2, tail=firstHtml;
  if(hasNext(firstHtml)){
    let probe=await pageData(high);
    while(probe && hasNext(probe)){
      low=high; high*=2; probe=await pageData(high);
    }
    if(probe && parseCards(probe).length){low=high;tail=probe;}
    else{
      while(high-low>1){
        const mid=Math.floor((high+low)/2),html=await pageData(mid);
        if(parseCards(html).length)low=mid;else high=mid;
      }
      tail=await pageData(low);
    }
  }
  const total=(low-1)*sourcePageSize+parseCards(tail).length;
  counts.set(path,{until:now+300000,total});return total;
}
export async function catalog({page=1, cat='', q=''}={}) {
  const current = Math.max(1, Math.min(25000, parseInt(page,10) || 1));
  const subpages = sourcePageSize / pageSize;
  const group = Math.ceil(current / subpages);
  const keyword = String(q||'').trim().slice(0,100);
  const category = /^[a-z][a-z0-9-]{0,48}$/.test(cat) && !['all','allproducts'].includes(cat) ? cat : '';
  let path = defaultList;
  let base = '';
  if (category || keyword) base = await read(defaultList);
  const categories = categoriesFrom(base);
  if (category && !categories.some(c => c.id===category)) throw new Error('Unknown category');
  if (keyword) {
    path = '/search.html?' + new URLSearchParams({channelid:'2',keywords:keyword,page:String(group)});
  } else if (category) {
    const categoryPage = await read('/'+category+'/');
    const tid = categoryPage.match(/c=Lists(?:&|&amp;)a=index(?:&|&amp;)tid=(\d+)/)?.[1];
    if (!tid) throw new Error('Category feed unavailable');
    path = defaultList.replace('tid=1&','tid='+tid+'&');
  }
  const listingPath=path;
  if (!keyword && group > 1) path += '&page='+group;
  const html = await read(path);
  const products = parseCards(html);
  const offset = ((current-1)%subpages)*pageSize;
  const counter=html.match(/id="search-count">\s*(\d+)/);
  const total=counter?Number(counter[1]):await countListing(listingPath,group===1?html:await read(listingPath),!category&&!keyword);
  const pages=Math.max(1,Math.ceil(total/pageSize));
  return {items:products.slice(offset,offset+pageSize),pages,total,categories:categories.length ? categories : categoriesFrom(html)};
}

function attrs(tag) {
  const result = {};
  for (const m of tag.matchAll(/\s([\w:-]+)\s*=\s*(?:"([^"]*)"|'([^']*)')/g)) result[m[1].toLowerCase()] = (m[2] ?? m[3]).replace(/&amp;/g,'&');
  return result;
}
function itemLink(value,id) {
  try {
    const url = new URL(value,'https://cnfanshp.com');
    const item = url.searchParams.get('itemID') || url.searchParams.get('itemId');
    return url.protocol === 'https:' && /^(?:www\.)?weidian\.com$/.test(url.hostname) && url.pathname === '/item.html' && item === id ? url.href : '';
  } catch { return ''; }
}
function sourcePhoto(value) {
  if (!value) return '';
  try {
    const url = new URL(value,'https://cnfanshp.com');
    return imageUrl(url.href);
  } catch { return ''; }
}
export function productImages(html) {
  const result = {gallery:[],details:[],qc:[],styles:[]};
  const id = html.match(/class="product-id">\s*ID:\s*(\d+)/i)?.[1];
  const body = html.split(/class=["']product-detail["']/)[1]?.split(/class=["']product-list["']/)[0] || '';
  const contexts = [];
  for (const match of body.replace(/<!--[\s\S]*?-->|<script\b[^>]*>[\s\S]*?<\/script>/gi,'').matchAll(/<(\/?)([\w-]+)\b[^>]*>/g)) {
    const [tag,closing,type] = match;
    if (closing) {
      const index = contexts.map(c=>c.type).lastIndexOf(type);
      if(index>=0) contexts.length=index;
      continue;
    }
    const a = attrs(tag), parent=contexts.at(-1) || {};
    const marker = [a.class,a.id,a['data-role']].filter(Boolean).join(' ');
    let kind = parent.kind;
    if (/\b(?:qc[-_ ]?(?:photos?|images?|gallery)|quality[-_]control)\b/i.test(marker)) kind='qc';
    else if (/\b(?:styles|variants|sku[-_](?:list|item|gallery)|style[-_](?:item|gallery))\b/i.test(marker)) kind='styles';
    else if (/\b(?:product-description|product-content|detail-images|product-details-content)\b/.test(marker)) kind='details';
    else if (/\bproduct-gallery\b/.test(marker)) kind='gallery';
    const url = itemLink(a['data-weidian-url'] || a['data-url'] || a.href,id) || parent.url;
    const sku = a['data-sku-id'] || parent.sku;
    if (type==='img' && kind) {
      const image=sourcePhoto(a['data-src'] || a['data-original'] || a.src);
      if (image && kind==='styles') {
        let deepLink=url || '';
        if (id && sku && /^[a-zA-Z0-9_-]+$/.test(sku)) {
          const link = new URL(deepLink || 'https://weidian.com/item.html?itemID='+id);
          link.searchParams.set('skuId',sku); deepLink=link.href;
        }
        if (!result.styles.some(style=>style.url===deepLink && style.image===image)) result.styles.push({image,url:deepLink,name:a.alt || ''});
      } else if (image && !result[kind].includes(image)) result[kind].push(image);
    }
    if (!/^(?:img|br|input|meta|link|hr|source|wbr|area|base|embed|param|track)$/.test(type) && !tag.endsWith('/>')) contexts.push({type,kind,url,sku});
  }
  return result;
}

function agentLinks(html, id) {
  const vendors={'cnfans.com':'CNFans','mulebuy.com':'Mulebuy','oopbuy.com':'Oopbuy','allchinabuy.com':'AllChinaBuy','kakobuy.com':'Kakobuy','acbuy.com':'ACBuy','ootdbuy.com':'OOTDbuy','hubbuycn.com':'HubBuyCN','eastmallbuy.com':'EastMallBuy','loongbuy.com':'Loongbuy','superbuy.com':'Superbuy','sugargoo.com':'Sugargoo','orientdig.com':'Orientdig','bbdbuy.com':'BBDBuy','hoobuy.com':'Hoobuy','joyagoo.com':'Joyagoo','ponybuy.com':'PonyBuy','lovegobuy.com':'Lovegobuy','panglobalbuy.com':'PanGlobalBuy','basetao.com':'Basetao'};
  const agents=[];
  for (const match of html.matchAll(/<a\b[^>]*class="platform-option"[^>]*>/g)) {
    try {
      const url=new URL(attrs(match[0]).href);
      const label=vendors[url.hostname.replace(/^www\./,'')];
      if(!label || !['https:','http:'].includes(url.protocol) || !new RegExp('(?:^|[^0-9])'+id+'(?:$|[^0-9])').test(decodeURIComponent(url.href)))continue;
      url.protocol='https:';
      agents.push({name:label,url:url.href});
    } catch { /* Malformed source URL. */ }
  }
  return agents;
}

export async function detail(id) {
  if (!/^\d{1,8}$/.test(String(id))) throw new Error('Invalid catalog ID');
  const html = await read('/AllProducts/'+id+'.html');
  const section = html.split('<div class="product-detail">')[1]?.split(/<section class="product-list"|<div class="related-products"/)[0] || '';
  const media=productImages(html);
  const images=media.gallery;
  const marketId = section.match(/href="https?:\/\/(?:www\.)?weidian\.com\/item\.html\?itemID=(\d+)/i)?.[1] || '';
  const name = clean(section.match(/class="product-title">([^<]+)</)?.[1]);
  if (!name) throw new Error('Product unavailable');
  const seller={groups:[],skus:[]};
  return {id:String(id),name,price:clean(section.match(/class="product-price">([^<]*)</)?.[1]),image:images[0]||'',images,media,seller,
    agents:marketId?agentLinks(html,marketId):[],marketplaceId:marketId,weidian:marketId ? 'https://weidian.com/item.html?itemID='+marketId : '',
    buy:marketId ? 'https://www.itaobuy.com/product-detail?url='+encodeURIComponent('https://weidian.com/item.html?itemID='+marketId) : ''};
}

export async function productMapIds(group,totalPages) {
  const pages=Array.from({length:Math.min(10,totalPages-(group-1)*10)},(_,i)=>(group-1)*10+i+1);
  const rows=await Promise.all(pages.map(async page=>parseCards(await read(defaultList+'&page='+page))));
  return [...new Set(rows.flat().map(item=>item.id))];
}
