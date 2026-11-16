const cached=new Map();
const entity=s=>String(s).replace(/&#(\d+);/g,(_,n)=>String.fromCharCode(Number(n))).replace(/&#x([\da-f]+);/gi,(_,n)=>String.fromCharCode(parseInt(n,16))).replace(/&quot;/g,'"').replace(/&amp;/g,'&').replace(/&lt;/g,'<').replace(/&gt;/g,'>');
export async function variants(id){
 if(!/^\d+$/.test(id))return {available:false,groups:[],skus:[]};
 const saved=cached.get(id);if(saved&&Date.now()-saved.at<1200000)return saved.data;
 const r=await fetch('https://weidian.com/item.html?itemID='+id,{signal:AbortSignal.timeout(18000),redirect:'follow'});
 if(!r.ok)throw Error('Seller unavailable');const html=await r.text();
 const blob=html.match(/id="__rocker-render-inject__"[^>]*data-obj="([^"]+)"/)?.[1];if(!blob)throw Error('Seller data unavailable');
 const model=JSON.parse(entity(blob))?.result?.default_model;const item=model?.item_info;
 if(String(item?.item_id)!==String(id))throw Error('Seller product mismatch');
 const props=model.sku_properties||{};
 const groups=(props.attr_list||[]).map(g=>({name:g.attr_title,values:(g.attr_values||[]).map(v=>({id:String(v.attr_id),name:String(v.attr_value),image:allowedImage(v.img)?v.img:null}))}));
 const skus=Object.values(props.sku||{}).map(s=>({id:String(s.id),attrs:String(s.attr_ids||'').split('-'),name:s.title,price:Number(s.price),stock:Number(s.stock),image:allowedImage(s.img)?s.img:null}));
 const data={available:!item.flag?.is_status_deleted&&!item.flag?.is_status_off_shelve,groups,skus,sellerImages:(item.imgs||[]).filter(allowedImage),id:String(id),updatedAt:new Date().toISOString()};
 cached.set(id,{at:Date.now(),data});if(cached.size>24)cached.delete(cached.keys().next().value);return data;
}
export function allowedImage(u){try{const x=new URL(u);return x.protocol==='https:'&&(x.hostname==='si.geilicdn.com'||x.hostname==='img.geilicdn.com');}catch{return false}}
export function agentLinks(id){
 if(!/^\d+$/.test(id||''))return [];
 const original='https://weidian.com/item.html?itemID='+id,encoded=encodeURIComponent(original);
 return [
 ['CNShopper','https://cnshopper.com/goods/detail?keyword='+id+'&platform=weidian'],
 ['Oopbuy','https://oopbuy.com/goods/details?id='+id+'&channel=weidian'],
 ['Kakobuy','https://www.kakobuy.com/item/details?url='+encoded],
 ['Hipobuy','https://hipobuy.com/product/weidian/'+id],
 ['USFans','https://www.usfans.com/product/3/'+id],
 ['Litbuy','https://litbuy.com/product/2/'+id],
 ['Superbuy','https://www.superbuy.com/en/page/buy/?url='+encoded],
 ['Lovegobuy','https://www.lovegobuy.com/product?id='+id+'&shop_type=weidian'],
 ['Sugargoo','https://www.sugargoo.com/products?productLink='+encoded],
 ['CSSBuy','https://www.cssbuy.com/shop/goodsDetail?type=micro&id='+id],
 ['HubBuy','https://hubbuy.com/product/2/'+id]
 ].map(([name,url])=>({name,url}));
}
