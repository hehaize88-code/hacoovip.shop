/** Recognise a full marketplace URL without network requests or guessed IDs. */
export function normalizeProductLink(value) {
  try {
    const url=new URL(value.trim());
    if(!['http:','https:'].includes(url.protocol)||url.username||url.password||url.port)return null;
    const host=url.hostname.toLowerCase();
    let id,marketplace,clean;
    if(['weidian.com','www.weidian.com'].includes(host)&&url.pathname==='/item.html') {
      if(url.searchParams.getAll('itemID').length!==1)return null;
      id=url.searchParams.get('itemID');marketplace='Weidian';clean=`https://weidian.com/item.html?itemID=${id}`;
    } else if(['item.taobao.com','item.tmall.com','detail.tmall.com'].includes(host)&&url.pathname==='/item.htm') {
      if(url.searchParams.getAll('id').length!==1)return null;
      id=url.searchParams.get('id');marketplace=host.includes('tmall')?'Tmall':'Taobao';clean=`https://${marketplace==='Tmall'?'detail.tmall.com':'item.taobao.com'}/item.htm?id=${id}`;
    } else if(host==='detail.1688.com') {
      id=url.pathname.match(/^\/offer\/(\d+)\.html$/)?.[1];marketplace='1688';clean=`https://detail.1688.com/offer/${id}.html`;
    }
    return id&&/^\d{5,20}$/.test(id)?{id,marketplace,clean}:null;
  } catch {return null;}
}
