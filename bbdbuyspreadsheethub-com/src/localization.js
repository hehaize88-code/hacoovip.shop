// Source titles combine seller brand/model text with product types, colors and option counts.
// Match whole phrases, protecting model names before translating generic words.
const titleLocales = ['en', 'de', 'fr', 'es', 'it', 'zh'];
const terms = `
closed-toe roman sandals|Closed-toe Roman sandals|Geschlossene Römersandalen|Spartiates à bout fermé|Sandalias romanas de punta cerrada|Sandali alla romana a punta chiusa|包头罗马凉鞋
distressed paint-splatter jeans|Distressed paint-splatter jeans|Jeans in Used-Optik mit Farbspritzern|Jean usé à éclaboussures de peinture|Vaqueros desgastados con salpicaduras de pintura|Jeans effetto vissuto con schizzi di vernice|做旧泼墨牛仔裤
lace-up breathable high-top sneakers|Breathable lace-up high-top sneakers|Atmungsaktive High-Top-Sneaker mit Schnürung|Baskets montantes respirantes à lacets|Zapatillas altas transpirables con cordones|Sneaker alte traspiranti con lacci|透气系带高帮运动鞋
high-top sneakers|High-top sneakers|High-Top-Sneaker|Baskets montantes|Zapatillas altas|Sneaker alte|高帮运动鞋
low-top sneakers|Low-top sneakers|Low-Top-Sneaker|Baskets basses|Zapatillas bajas|Sneaker basse|低帮运动鞋
high-top|high-top|hoch geschnitten|montant|de caña alta|a collo alto|高帮
low-top|low-top|niedrig geschnitten|bas|de caña baja|a collo basso|低帮
lace-up|lace-up|mit Schnürung|à lacets|con cordones|con lacci|系带
breathable|breathable|atmungsaktiv|respirant|transpirable|traspirante|透气
colorful|multicolored|mehrfarbig|multicolore|multicolor|multicolore|多彩
lambswool|lambswool|Lammwolle|laine d’agneau|lana de cordero|lana d’agnello|羊羔毛
gradient|gradient|Farbverlauf|dégradé|degradado|sfumato|渐变
fabric|fabric|Stoff|tissu|tejido|tessuto|织物
non-slip|non-slip|rutschfest|antidérapant|antideslizante|antiscivolo|防滑
wear-resistant|wear-resistant|abriebfest|résistant à l’usure|resistente al desgaste|resistente all’usura|耐磨
glossy finish|glossy finish|Glanzfinish|finition brillante|acabado brillante|finitura lucida|亮面
athletic shoes|Athletic shoes|Sportschuhe|Chaussures de sport|Calzado deportivo|Scarpe sportive|运动鞋
embroidered|embroidered|bestickt|brodé|bordado|ricamato|刺绣
platform beach sandals|Platform beach sandals|Plateau-Strandsandalen|Sandales de plage à plateforme|Sandalias de playa con plataforma|Sandali da spiaggia con plateau|厚底沙滩凉鞋
studded|studded|mit Nieten|clouté|con tachuelas|con borchie|铆钉装饰
warm coat|Warm coat|Warmer Mantel|Manteau chaud|Abrigo cálido|Cappotto caldo|保暖外套
pants/shorts|Pants & shorts|Hosen und Shorts|Pantalons et shorts|Pantalones y shorts|Pantaloni e shorts|裤装与短裤
hoodies/sweaters|Hoodies & sweaters|Hoodies und Pullover|Sweats à capuche et pulls|Sudaderas y jerséis|Felpe e maglioni|连帽衫与毛衣
short sets,short set|Short set|Sommer-Set|Ensemble court|Conjunto corto|Completo corto|短装套装
other stuff|Other items|Sonstiges|Autres articles|Otros artículos|Altri articoli|其他商品
headwear|Headwear|Kopfbedeckung|Couvre-chef|Gorro o sombrero|Copricapo|帽饰
accessories|Accessories|Accessoires|Accessoires|Accesorios|Accessori|配饰
electronics|Electronics|Elektronik|Électronique|Electrónica|Elettronica|电子产品
quilted jacket|Quilted jacket|Steppjacke|Veste matelassée|Chaqueta acolchada|Giacca trapuntata|绗缝夹克
puffer jacket,down jacket,down jackets,down coat|Down jacket|Daunenjacke|Doudoune|Plumífero|Piumino|羽绒服
windbreaker,windbreakers|Windbreaker|Windjacke|Coupe-vent|Cortavientos|Giacca a vento|防风夹克
knitted hat,beanie,beanies|Beanie|Strickmütze|Bonnet|Gorro de punto|Berretto in maglia|针织帽
bucket hat|Bucket hat|Fischerhut|Bob|Sombrero de pescador|Cappello da pescatore|渔夫帽
baseball cap|Baseball cap|Baseballkappe|Casquette de baseball|Gorra de béisbol|Cappellino da baseball|棒球帽
long sleeved shirt,long-sleeved shirt,long sleeve shirt|Long-sleeved shirt|Langarmhemd|Chemise à manches longues|Camisa de manga larga|Camicia a maniche lunghe|长袖衬衫
short sleeved shirt,short sleeve shirt|Short-sleeved shirt|Kurzarmhemd|Chemise à manches courtes|Camisa de manga corta|Camicia a maniche corte|短袖衬衫
longsleeves,longsleeve,long-sleeve t-shirt,long sleeve t-shirt,long-sleeved t-shirt|Long-sleeved T-shirt|Langarmshirt|T-shirt à manches longues|Camiseta de manga larga|Maglietta a maniche lunghe|长袖T恤
hoodies,hoodie,hooded sweatshirt,hoodi|Hoodie|Kapuzenpullover|Sweat à capuche|Sudadera con capucha|Felpa con cappuccio|连帽衫
sweatshirts,sweatshirt,sweatsirt,sudadera,sudaderas|Sweatshirt|Sweatshirt|Sweat|Sudadera|Felpa|卫衣
sweaters,sweater,pullover,jumper|Sweater|Pullover|Pull|Jersey|Maglione|毛衣
t-shirts,t-shirt,t shirts,t shirt,tshirts,tshirt,t-sirt,t-shir,tees,tee,camiseta,camisetas|T-shirt|T-Shirt|T-shirt|Camiseta|Maglietta|T恤
denim jacket|Denim jacket|Jeansjacke|Veste en jean|Chaqueta vaquera|Giacca di jeans|牛仔夹克
jackets,jacket,cazadora,cazadoras,chaqueta|Jacket|Jacke|Veste|Chaqueta|Giacca|夹克
cardigans,cardigan|Cardigan|Strickjacke|Gilet en maille|Cárdigan|Cardigan|针织开衫
coats,coat|Coat|Mantel|Manteau|Abrigo|Cappotto|大衣
vests,vest,chaleco|Vest|Weste|Gilet|Chaleco|Gilet|背心
shirts,shirt,camisa|Shirt|Hemd|Chemise|Camisa|Camicia|衬衫
polo shirt,polo shirts,polo|Polo shirt|Poloshirt|Polo|Polo|Polo|Polo衫
football jerseys,football jersey,soccer jersey|Football jersey|Fußballtrikot|Maillot de football|Camiseta de fútbol|Maglia da calcio|足球球衣
jerseys,jersey|Jersey|Trikot|Maillot|Camiseta deportiva|Maglia sportiva|球衣
trousers,pants,pantalones|Pants|Hose|Pantalon|Pantalón|Pantaloni|长裤
sweatpants,joggers|Sweatpants|Jogginghose|Pantalon de jogging|Pantalón de chándal|Pantaloni da tuta|运动裤
cargo pants,cargo trousers|Cargo pants|Cargohose|Pantalon cargo|Pantalón cargo|Pantaloni cargo|工装裤
shorts|Shorts|Shorts|Short|Pantalón corto|Shorts|短裤
jeans,jean|Jeans|Jeans|Jean|Vaqueros|Jeans|牛仔裤
tracksuits,tracksuit|Tracksuit|Trainingsanzug|Survêtement|Chándal|Tuta sportiva|运动套装
suits,suit,sets,set|Set|Set|Ensemble|Conjunto|Completo|套装
underwear|Underwear|Unterwäsche|Sous-vêtements|Ropa interior|Intimo|内衣
briefs,boxers,boxer|Underpants|Unterhose|Slip|Calzoncillos|Mutande|内裤
tights,leggings|Leggings|Leggings|Legging|Mallas|Leggings|紧身裤
bikini,bikinis|Bikini|Bikini|Bikini|Bikini|Bikini|比基尼
dress,dresses|Dress|Kleid|Robe|Vestido|Abito|连衣裙
shoes,shoe,zapatos|Shoes|Schuhe|Chaussures|Zapatos|Scarpe|鞋款
sneakers,sneaker,trainers,zapatillas|Sneakers|Sneaker|Baskets|Zapatillas|Sneaker|运动鞋
slides,slide,slippers,slipper|Slippers|Pantoletten|Mules|Chanclas|Ciabatte|拖鞋
sandals,sandal|Sandals|Sandalen|Sandales|Sandalias|Sandali|凉鞋
boots,boot|Boots|Stiefel|Bottes|Botas|Stivali|靴子
loafers,loafer|Loafers|Slipper|Mocassins|Mocasines|Mocassini|乐福鞋
socks,sock|Socks|Socken|Chaussettes|Calcetines|Calze|袜子
phone case,phone cases,mobile phone case|Phone case|Handyhülle|Coque de téléphone|Funda de móvil|Custodia per telefono|手机壳
shoulder bag,crossbody bag,messenger bag|Shoulder bag|Umhängetasche|Sac à bandoulière|Bandolera|Borsa a tracolla|斜挎包
tote bag,shopping bag|Tote bag|Tragetasche|Cabas|Bolso tote|Borsa shopper|托特包
bags,bag,bolso,bolsos|Bag|Tasche|Sac|Bolso|Borsa|包
handbags,handbag,purse|Handbag|Handtasche|Sac à main|Bolso de mano|Borsa a mano|手提包
backpack,backpacks|Backpack|Rucksack|Sac à dos|Mochila|Zaino|双肩包
wallets,wallet,walle,cartera|Wallet|Geldbörse|Portefeuille|Cartera|Portafoglio|钱包
card holder,cardholder|Card holder|Kartenetui|Porte-cartes|Tarjetero|Portacarte|卡包
belts,belt,cinturón|Belt|Gürtel|Ceinture|Cinturón|Cintura|腰带
bracelets,bracelet,bangle,brazalete|Bracelet|Armband|Bracelet|Pulsera|Bracciale|手链
necklaces,necklace|Necklace|Halskette|Collier|Collar|Collana|项链
earrings,earring|Earrings|Ohrringe|Boucles d’oreilles|Pendientes|Orecchini|耳环
rings,ring|Ring|Ring|Bague|Anillo|Anello|戒指
watches,watch,reloj|Watch|Armbanduhr|Montre|Reloj|Orologio|腕表
scarves,scarf|Scarf|Schal|Écharpe|Bufanda|Sciarpa|围巾
hats,hat|Hat|Hut|Chapeau|Sombrero|Cappello|帽子
caps,cap,gorra|Cap|Kappe|Casquette|Gorra|Cappellino|棒球帽
sunglasses,sunglass|Sunglasses|Sonnenbrille|Lunettes de soleil|Gafas de sol|Occhiali da sole|太阳镜
glasses,eyeglasses|Glasses|Brille|Lunettes|Gafas|Occhiali|眼镜
jewelry,jewellery|Jewelry|Schmuck|Bijoux|Joyas|Gioielli|珠宝
perfumes,perfume,fragrance|Perfume|Parfüm|Parfum|Perfume|Profumo|香水
gloves,glove|Gloves|Handschuhe|Gants|Guantes|Guanti|手套
keychain,keyring|Key ring|Schlüsselanhänger|Porte-clés|Llavero|Portachiavi|钥匙扣
earbuds,earphones,headphones|Headphones|Kopfhörer|Écouteurs|Auriculares|Cuffie|耳机
hairdryer,hair dryer|Hair dryer|Haartrockner|Sèche-cheveux|Secador|Asciugacapelli|吹风机
speakers,speaker|Speaker|Lautsprecher|Enceinte|Altavoz|Altoparlante|扬声器
umbrella|Umbrella|Regenschirm|Parapluie|Paraguas|Ombrello|雨伞
plush|Plush toy|Plüschtier|Peluche|Peluche|Peluche|毛绒玩具
mechanical watch|Mechanical watch|Mechanische Uhr|Montre mécanique|Reloj mecánico|Orologio meccanico|机械表
styles,style,estilos|styles|Varianten|variantes|variantes|varianti|款式
colors,colours,color,colour,colores|colors|Farben|coloris|colores|colori|配色
high quality,top quality,best quality|high quality|hochwertig|haute qualité|alta calidad|alta qualità|高品质
high version|high version|höhere Ausführung|version supérieure|versión superior|versione superiore|高配版
collection|collection|Kollektion|collection|colección|collezione|系列
series|series|Serie|série|serie|serie|系列
version|version|Ausführung|version|versión|versione|版本
women’s,women's,womens,women,woman,ladies|women’s|Damen|femme|mujer|donna|女款
men’s,men's,mens,men,man|men’s|Herren|homme|hombre|uomo|男款
children,kids|kids|Kinder|enfant|infantil|bambini|儿童
zip up,zip-up|zip-up|mit Reißverschluss|zippé|con cremallera|con zip|拉链款
long-sleeved,long sleeved,long sleeve,long sleeves|long sleeves|Langarm|manches longues|manga larga|maniche lunghe|长袖
short-sleeved,short sleeved,short sleeve,short sleeves|short sleeves|Kurzarm|manches courtes|manga corta|maniche corte|短袖
limited edition|limited edition|Sonderedition|édition limitée|edición limitada|edizione limitata|限量版
cotton|cotton|Baumwolle|coton|algodón|cotone|棉
leather|leather|Leder|cuir|piel|pelle|皮革
canvas|canvas|Canvas|toile|lona|tela|帆布
denim|denim|Denim|denim|tejido vaquero|denim|牛仔布
knitted,knit|knit|Strick|maille|punto|maglia|针织
embroidered|embroidered|bestickt|brodé|bordado|ricamato|刺绣
graphic print,printed|printed|bedruckt|imprimé|estampado|stampato|印花
quilted|quilted|gesteppt|matelassé|acolchado|trapuntato|绗缝
distressed|distressed|Used-Look|effet usé|efecto desgastado|effetto usurato|做旧
slim fit|slim fit|schmale Passform|coupe ajustée|corte ajustado|vestibilità aderente|修身
wide leg|wide leg|weites Bein|jambes larges|pernera ancha|gamba larga|阔腿
wireless|wireless|kabellos|sans fil|inalámbrico|senza fili|无线
black|black|Schwarz|noir|negro|nero|黑色
white|white|Weiß|blanc|blanco|bianco|白色
blue|blue|Blau|bleu|azul|blu|蓝色
green|green|Grün|vert|verde|verde|绿色
red|red|Rot|rouge|rojo|rosso|红色
pink|pink|Rosa|rose|rosa|rosa|粉色
grey,gray|grey|Grau|gris|gris|grigio|灰色
brown|brown|Braun|marron|marrón|marrone|棕色
gold|gold|Gold|or|dorado|oro|金色
silver|silver|Silber|argent|plateado|argento|银色
iphone case|iPhone case|iPhone-Hülle|Coque pour iPhone|Funda para iPhone|Custodia per iPhone|iPhone 手机壳
flip-flops,flip flops|Flip-flops|Zehentrenner|Tongs|Chanclas|Infradito|人字拖
clogs|Clogs|Clogs|Sabots|Zuecos|Zoccoli|包头拖鞋
mules|Mules|Pantoletten|Mules|Mules|Sabot|穆勒鞋
high heel,high heels|High heels|Pumps|Talons hauts|Zapatos de tacón|Tacchi alti|高跟鞋
ski goggles|Ski goggles|Skibrille|Masque de ski|Gafas de esquí|Maschera da sci|滑雪镜
waist pack,belt bag|Waist pack|Gürteltasche|Sac banane|Riñonera|Marsupio|腰包
minibag,mini bag|Mini bag|Minitasche|Mini-sac|Minibolso|Mini borsa|迷你包
card case|Card case|Kartenetui|Porte-cartes|Tarjetero|Portacarte|卡包
slacks|Slacks|Stoffhose|Pantalon habillé|Pantalón de vestir|Pantaloni eleganti|休闲西裤
zip jacket|Zip jacket|Reißverschlussjacke|Veste zippée|Chaqueta con cremallera|Giacca con zip|拉链夹克
goggles|Goggles|Schutzbrille|Lunettes de protection|Gafas protectoras|Occhiali protettivi|护目镜
mask|Mask|Maske|Masque|Máscara|Maschera|面罩
camping mug|Camping mug|Campingbecher|Tasse de camping|Taza de camping|Tazza da campeggio|露营杯
stainless steel|stainless steel|Edelstahl|acier inoxydable|acero inoxidable|acciaio inossidabile|不锈钢
drawstring|drawstring|Kordelzug|cordon de serrage|cordón ajustable|coulisse|抽绳
crew neck,crewneck|crew neck|Rundhals|col rond|cuello redondo|girocollo|圆领
crew neck top,yoga top,top|Top|Oberteil|Haut|Top|Top|上衣
tanks,tank top|Tank top|Tanktop|Débardeur|Camiseta de tirantes|Canotta|吊带背心
new arrival,new arrivals|new arrival|Neuheit|nouveauté|novedad|novità|新款
new|new|neu|nouveau|nuevo|nuovo|新款
classic|classic|klassisch|classique|clásico|classico|经典款
loose-fitting,loose fitting,loose|loose fit|weite Passform|coupe ample|corte holgado|vestibilità ampia|宽松版型
casual|casual|lässig|décontracté|informal|casual|休闲
comfortable|comfortable|bequem|confortable|cómodo|comodo|舒适款
design|design|Design|design|diseño|design|设计
new design|new design|neues Design|nouveau design|nuevo diseño|nuovo design|新设计
patchwork|patchwork|Patchwork|patchwork|patchwork|patchwork|拼接
striped|striped|gestreift|rayé|a rayas|a righe|条纹
crew|crew|Crew|crew|crew|crew|圆领
lightweight|lightweight|leicht|léger|ligero|leggero|轻量
reversible|reversible|wendbar|réversible|reversible|reversibile|双面
winter|winter|Winter|hiver|invierno|inverno|冬季
sports|sports|Sport|sport|deporte|sport|运动
vintage|vintage|Vintage|vintage|vintage|vintage|复古
fleece|fleece|Fleece|polaire|forro polar|pile|摇粒绒
printed,print|print|Druck|imprimé|estampado|stampa|印花
pendant|pendant|Anhänger|pendentif|colgante|ciondolo|吊坠
jewelled,rhinestone|rhinestone|Strass|strass|pedrería|strass|水钻
half-zip|half zip|halber Reißverschluss|demi-zip|media cremallera|mezza zip|半拉链
full zip|full zip|durchgehender Reißverschluss|zip intégral|cremallera completa|zip intera|全拉链
best quality,bese quality|high quality|hochwertig|haute qualité|alta calidad|alta qualità|高品质
styles available|styles available|Varianten verfügbar|variantes disponibles|variantes disponibles|varianti disponibili|可选款式
best|best|beste|meilleur|mejor|migliore|优选
stylish|stylish|modisch|élégant|de moda|alla moda|时尚款
and|and|und|et|y|e|和
with|with|mit|avec|con|con|带
`.trim().split('\n').map(line => line.split('|'));

const bySource = new Map();
const searchWords = titleLocales.map(() => new Map());
for (const [names, ...translations] of terms) {
  const aliases = names.split(',');
  for (const alias of aliases) bySource.set(alias, translations);
  // The source performs a substring search; a singular stem also finds plurals.
  const queryTerm = aliases.find(alias => aliases[0] === alias + 's') || aliases[0];
  translations.forEach((name, i) => searchWords[i].set(name.toLowerCase(), queryTerm));
}
const protectedTerms = ['New Era','New York','New Orleans','New Jersey','New England','Chrome Hearts','Fear of God','Stone Island','New Balance','Stone Roses','Golden State','White Mountaineering','Black Sabbath','Black Scale','Black Diamond','Red Bull','Red Sox','Pink Panther','Blue Jays','Green Bay','Golden Goose','The North Face','Stone Island','Fear of God','Off White','Off-White','White Mountaineering','Canada Goose','New Balance','Palm Angels','Chrome Hearts','Golden Goose','Red Wing','Blue Moon','Blue Version','Nike Air Force','Air Jordan','Air Max','Apple Watch','Apple Watch Series','Polo Ralph Lauren','Polo Bear','Pink Floyd','Black Cat','Black Phantom','Black Opium','Black Orchid','White Fox','Broken Planet','Silver Bullet','Blue Tint','Pure White','Air Force','Purple Brand','Green Goblin','Red Thunder','Blue Chill','Brown Thomas','Stone Cold','Gold Label','Silver Shadow','Gold Collection','Black Label'];
const literal = x => x.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const alternatives = values => [...values].sort((a,b) => b.length-a.length).map(literal).join('|');
// Digits beside optional counts occur frequently in source names (e.g. "27style").
const titlePattern = new RegExp('(?<![\\p{L}])(?:' + alternatives([...bySource.keys(), ...protectedTerms]) + ')(?![\\p{L}])', 'giu');
const protectedLower = new Set(protectedTerms.map(s=>s.toLowerCase()));
const lookupTerms = searchWords.map(map => new RegExp('(?<![\\p{L}])(?:'+alternatives(map.keys())+')(?![\\p{L}])','giu'));

function decodeTitle(value) {
  const entities = {amp:'&',quot:'"',apos:"'",lt:'<',gt:'>',nbsp:' '};
  return String(value ?? '').replace(/&(#(?:x[0-9a-f]+|\d+)|amp|quot|apos|lt|gt|nbsp);/gi, (match,k)=>{
    if(!k.startsWith('#')) return entities[k.toLowerCase()] || match;
    const code = k[1].toLowerCase()==='x'?parseInt(k.slice(2),16):parseInt(k.slice(1),10);
    return code<=0x10ffff ? String.fromCodePoint(code) : match;
  }).replace(/\s+/g,' ').trim();
}

export function localizedTitle(name, locale) {
  const i = titleLocales.indexOf(locale);
  const title = decodeTitle(name);
  if(i < 0) return title;
  // Keep the source spelling and capitalization of protected model/brand names.
  const translated = title.replace(titlePattern, match => {
    const key = match.toLowerCase();
    if(protectedLower.has(key)) return match;
    if(i===0 && !/^(?:sudaderas?|camisetas?|cazadoras?|chaqueta|camisa|pantalones|zapatos|zapatillas|bolsos?|cartera|cinturón|brazalete|reloj|gorra|chaleco|estilos|colores)$/.test(key)) return match;
    return bySource.get(key)?.[i] || match;
  });
  if (i === 0) return translated;
  const countWords = [bySource.get('styles')[i], bySource.get('colors')[i]].map(literal).join('|');
  const spaced = translated.replace(new RegExp('(\\d[+]?)\\s*(' + countWords + ')','giu'), '$1 $2');
  return locale === 'zh' ? spaced.replace(/([\p{Script=Han}])\s+(?=[\p{Script=Han}])/gu,'$1') : spaced;
}

export function sourceSearchTerm(query, locale, labels = []) {
  const value = String(query ?? '').trim();
  const i = titleLocales.indexOf(locale);
  const category = labels.findIndex(label => label.toLowerCase()===value.toLowerCase());
  const sourceCategories=['','shoes','sweatshirt','t-shirt','jacket','pants','hat','accessories','short sets','electronics','other stuff','jersey'];
  if(category>0 && sourceCategories[category]) return sourceCategories[category];
  if(i<1) return value;
  return value.replace(lookupTerms[i], match => searchWords[i].get(match.toLowerCase()) || match);
}
