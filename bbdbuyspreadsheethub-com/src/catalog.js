import rows from './catalog-index.json';
import { localizedTitle, sourceSearchTerm } from './localization.js';

const categories=['AllProducts','shoes','hoodies-sweaters','t-shirts','jackets','pants-shorts','headwear','accessories','short-sets','electronics','other-stuff','jersey'];
const normalize=value=>String(value).normalize('NFKD').replace(/\p{M}/gu,'').toLowerCase().trim();
const records=rows.map(([id,seller,title,path,price,mask,page])=>({
  id,seller,title,image:path?new URL(path,'https://cnfanshp.com').href:'',price,mask,page
}));
const groups=new Map(categories.map((name,i)=>[name,i?records.filter(p=>(p.mask & (1 << (i-1)))!==0):records]));
export const totalProducts=records.length;
export function categoryCount(category){return groups.get(category)?.length||0}
const translations={
  en:['products','Page','Go','Browse all products'],
  zh:['件商品','页码','跳转','浏览全部商品'],
  de:['Produkte','Seite','Los','Alle Produkte ansehen'],
  fr:['produits','Page','Afficher','Voir tous les produits'],
  es:['productos','Página','Ir','Ver todos los productos'],
  it:['prodotti','Pagina','Vai','Vedi tutti i prodotti']
};
export function catalogText(local){return translations[local]}
export function listProducts(category,query,local,labels) {
  const group=groups.get(category)||[];
  if(!query) return group;
  const words=normalize(query).split(/\s+/);
  const aliases=normalize(sourceSearchTerm(query,local,labels)).split(/\s+/);
  return group.filter(product=>{
    if(query===product.id||query===product.seller)return true;
    const source=normalize(product.title);
    if(aliases.every(w=>source.includes(w)))return true;
    const name=source+' '+normalize(localizedTitle(product.title,local));
    return words.every(w=>name.includes(w));
  });
}
export function catalogPager({base,cat,q,page,pages,local,previous,next,escape}){
  if(pages<=1)return '';
  const [_,label,go]=catalogText(local),path=base+'catalog/'+(cat==='AllProducts'?'':cat+'/');
  function href(n){
    const params=new URLSearchParams();
    if(q)params.set('q',q);
    if(n!==1)params.set('p',n);
    return escape(path+(params.size?'?'+params:''));
  }
  const numbers=[...new Set([1,page-1,page,page+1,pages].filter(n=>n>=1&&n<=pages))].sort((a,b)=>a-b);
  const links=numbers.map((n,i)=>(i&&numbers[i-1]<n-1?'<span aria-hidden="true">…</span>':'')+'<a class="chip '+(n===page?'active':'')+'" '+(n===page?'aria-current="page"':'')+' href="'+href(n)+'">'+n+'</a>').join('');
  return '<nav class="nav catalog-pages">'+(page>1?'<a rel="prev" href="'+href(page-1)+'">'+previous+'</a>':'')+links+(page<pages?'<a rel="next" href="'+href(page+1)+'">'+next+'</a>':'')+'<form action="'+path+'">'+(q?'<input type="hidden" name="q" value="'+escape(q)+'">':'')+'<label>'+label+' <input name="p" type="number" min="1" max="'+pages+'" value="'+page+'" required></label><button>'+go+'</button></form></nav>';
}

function liveCards(html){
  const found=new Map();
  for(const block of html.split(/class="product-card\b/).slice(1)){
    const id=block.match(/href="\/AllProducts\/(\d+)\.html"/)?.[1];
    const title=block.match(/class="product-name">\s*([^<]+)/)?.[1]?.trim();
    if(!id||!title)continue;
    const path=block.match(/data-src="(\/uploads\/[^"]+)"/)?.[1];
    found.set(id,{id,title,price:block.match(/class="product-price">\s*([\d.]+)/)?.[1]||'',image:path?'https://cnfanshp.com'+path:''});
  }
  return found;
}

export async function currentProducts(category,query,local,labels,read){
  const saved=listProducts(category,query,local,labels);
  let current;
  try{current=liveCards(await read('/'+category+'/'));}catch{return saved}
  const known=new Set(groups.get(category).map(p=>p.id));
  const extras=[...current.values()].filter(p=>!known.has(p.id)&&(!query||[p.title,localizedTitle(p.title,local),p.id].some(v=>normalize(v).includes(normalize(query)))));
  return [...extras,...saved.map(p=>current.has(p.id)?{...p,...current.get(p.id),live:true}:p)];
}

export async function readDisplayCards(items,read){
  const requests=new Map();
  async function get(path){
    if(!requests.has(path))requests.set(path,read(path));
    return requests.get(path);
  }
  return Promise.all(items.map(async item=>{
    if(item.live||item.page===undefined)return item;
    try{
      if(item.page){
        const html=await get(item.page===1?'/AllProducts/':'/AllProducts/list_1_'+item.page+'/');
        const fresh=liveCards(html).get(item.id);
        if(fresh)return {...item,...fresh};
      }
      const detail=await get('/AllProducts/'+item.id+'.html');
      const title=detail.match(/class="product-title">\s*([^<]+)/)?.[1];
      if(!title)return item;
      const path=detail.match(/property="og:image" content="(\/uploads\/[^"]+)"/)?.[1];
      return {...item,title,price:detail.match(/class="product-price">\s*([\d.]+)/)?.[1]||'',image:path?'https://cnfanshp.com'+path:''};
    }catch{return item}
  }));
}
