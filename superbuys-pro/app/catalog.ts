import type { Locale } from "./content";

export const CATALOG_UPDATED = "2026-08-11";

export type CatalogProduct = {
  id: string;
  slug: string;
  name: string;
  category: "shoes" | "hoodies" | "t-shirts" | "jackets" | "pants" | "headwear" | "accessories" | "jerseys";
  priceCny: number;
  image: string;
  targetUrl: string;
  tone: "lime" | "orange" | "blue" | "pink";
};

const rows: Array<[string,string,string,CatalogProduct["category"],number,string,CatalogProduct["tone"]]> = [
  ["5973","patagonia-quick-drying-pants","Patagonia quick-drying pants","pants",239,"webp","lime"],
  ["5974","patagonia-loose-crew-neck-sweatshirt","Patagonia classic loose-fitting crew neck","hoodies",140,"webp","orange"],
  ["6049","casual-low-top-shoes-64","Shoes 64 — casual low-top","shoes",259,"webp","blue"],
  ["5850","nba-city-edition-jerseys","NBA City Edition jerseys — 40 styles","jerseys",88,"webp","pink"],
  ["6045","shoes-60","Shoes 60","shoes",330,"jpg","lime"],
  ["6044","shoes-59","Shoes 59","shoes",399,"jpg","orange"],
  ["6043","shoes-58","Shoes 58","shoes",280,"jpg","blue"],
  ["6042","shoes-57","Shoes 57","shoes",340,"jpg","pink"],
  ["5970","miu-miu-collared-patchwork-casual","Miu Miu collared patchwork casual top","hoodies",160,"webp","lime"],
  ["5968","balenciaga-new-collection-sweatshirt","Balenciaga new collection sweatshirt","hoodies",159,"webp","orange"],
  ["5960","balenciaga-cotton-crew-neck-sweatshirt","Balenciaga cotton printed crew-neck sweatshirt","hoodies",269,"webp","blue"],
  ["5976","gucci-pique-cotton-short-sleeve","Gucci piqué cotton short-sleeve top","t-shirts",215,"webp","pink"],
  ["5953","polo-shirt-five-styles","Polo shirt — 5 styles","t-shirts",109,"webp","lime"],
  ["5934","off-white-t-shirt","Off White T-shirt","t-shirts",110,"webp","orange"],
  ["5931","broken-planet-tee","Broken Planet tee","t-shirts",115.32,"webp","blue"],
  ["5981","celine-embroidered-jacket","Celine embroidered jacket","jackets",298,"webp","pink"],
  ["5969","miu-miu-knitted-jacket","Miu Miu knitted jacket","jackets",320,"webp","lime"],
  ["5958","maison-margiela-casual-business-jacket","Maison Margiela casual business jacket","jackets",455,"webp","orange"],
  ["5933","prada-jacket","Prada jacket","jackets",208,"webp","blue"],
  ["5983","balenciaga-drawstring-pants","Balenciaga drawstring pants","pants",249,"webp","pink"],
  ["5982","drew-house-distressed-wide-leg-jeans","Drew House distressed wide-leg jeans","pants",249,"webp","lime"],
  ["5980","acne-studios-butterfly-pants","Acne Studios 1996 Butterfly pants","pants",398,"webp","orange"],
  ["5979","balenciaga-vintage-washed-jeans","Balenciaga vintage washed denim jeans","pants",398,"webp","blue"],
  ["5971","miu-miu-letter-embroidered-cap","Miu Miu letter-embroidered cap","headwear",89,"webp","pink"],
  ["5889","loewe-print-baseball-cap","Loewe all-over print baseball cap","headwear",89,"webp","lime"],
  ["5888","chanel-printed-bucket-hat","Chanel printed bucket hat","headwear",99,"webp","orange"],
  ["5887","louis-vuitton-stylish-hat","Louis Vuitton stylish hat","headwear",99,"webp","blue"],
  ["5952","longines-watches-39-styles","Longines watches — 39 styles","accessories",520,"webp","pink"],
  ["5947","van-cleef-grey-mother-of-pearl-accessory","Van Cleef grey mother-of-pearl accessory","accessories",260,"webp","lime"],
  ["5946","van-cleef-accessory","Van Cleef accessory","accessories",260,"webp","orange"],
  ["5945","vans-tri-fold-canvas-wallet","VANS tri-fold canvas sports wallet","accessories",40,"webp","blue"],
  ["5785","nfl-super-bowl-49-jersey","NFL Super Bowl 49 jersey","jerseys",75,"webp","pink"],
  ["5342","football-jerseys","Football jerseys","jerseys",131,"webp","lime"],
];

export const products: CatalogProduct[] = rows.map(([id,slug,name,category,priceCny,ext,tone]) => ({
  id, slug, name, category, priceCny, tone,
  image:`/products/${id}.${ext}`,
  targetUrl:`https://www.cnfanshp.com/AllProducts/${id}.html`,
}));

const labels: Record<Locale,Record<CatalogProduct["category"],string>> = {
  en:{shoes:"Shoes",hoodies:"Sweatshirts", "t-shirts":"T-shirts",jackets:"Jackets",pants:"Pants / shorts",headwear:"Headwear",accessories:"Accessories",jerseys:"Jerseys"},
  de:{shoes:"Schuhe",hoodies:"Sweatshirts", "t-shirts":"T-Shirts",jackets:"Jacken",pants:"Hosen / Shorts",headwear:"Kopfbedeckung",accessories:"Accessoires",jerseys:"Trikots"},
  fr:{shoes:"Chaussures",hoodies:"Sweats", "t-shirts":"T-shirts",jackets:"Vestes",pants:"Pantalons / shorts",headwear:"Couvre-chefs",accessories:"Accessoires",jerseys:"Maillots"},
  it:{shoes:"Scarpe",hoodies:"Felpe", "t-shirts":"T-shirt",jackets:"Giacche",pants:"Pantaloni / shorts",headwear:"Copricapi",accessories:"Accessori",jerseys:"Maglie"},
  nl:{shoes:"Schoenen",hoodies:"Sweaters", "t-shirts":"T-shirts",jackets:"Jassen",pants:"Broeken / shorts",headwear:"Hoofddeksels",accessories:"Accessoires",jerseys:"Shirts"},
  ms:{shoes:"Kasut",hoodies:"Baju panas", "t-shirts":"Kemeja-T",jackets:"Jaket",pants:"Seluar / pendek",headwear:"Penutup kepala",accessories:"Aksesori",jerseys:"Jersi"},
};

export function categoryLabel(locale:Locale, category:CatalogProduct["category"]){return labels[locale][category];}

export const productCopy:Record<Locale,{sourcePrice:string;updated:string;details:string;check:string;partner:string;partnerNote:string;back:string;specs:string;category:string;sourceId:string}>= {
  en:{sourcePrice:"SOURCE PRICE (CNY)",updated:"PRICE CHECKED 11 AUG 2026",details:"VIEW DETAILS",check:"Check the live option, seller terms, domestic delivery and warehouse evidence before ordering. The listed price is a dated discovery reference, not a delivered-cost quote.",partner:"OPEN PARTNER LISTING",partnerNote:"This button opens the matching product page on our partner catalog, cnfanshp.com—not Superbuy.com.",back:"BACK TO ALL FINDS",specs:"PRODUCT RECORD",category:"CATEGORY",sourceId:"SOURCE ID"},
  de:{sourcePrice:"QUELLPREIS (CNY)",updated:"PREIS GEPRÜFT 11. AUG. 2026",details:"DETAILS ANSEHEN",check:"Prüfe vor der Bestellung die aktuelle Variante, Verkäuferbedingungen, Inlandslieferung und Lagerbelege. Der Preis ist eine datierte Orientierung, kein Endpreis.",partner:"PARTNER-ANGEBOT ÖFFNEN",partnerNote:"Diese Schaltfläche öffnet die passende Produktseite unseres Partnerkatalogs cnfanshp.com – nicht Superbuy.com.",back:"ZURÜCK ZU ALLEN PRODUKTEN",specs:"PRODUKTDATENSATZ",category:"KATEGORIE",sourceId:"QUELL-ID"},
  fr:{sourcePrice:"PRIX SOURCE (CNY)",updated:"PRIX VÉRIFIÉ LE 11 AOÛT 2026",details:"VOIR LES DÉTAILS",check:"Vérifiez l’option active, les conditions du vendeur, la livraison locale et les preuves d’entrepôt. Ce prix daté n’est pas un coût livré.",partner:"OUVRIR L’OFFRE PARTENAIRE",partnerNote:"Ce bouton ouvre le produit correspondant sur notre catalogue partenaire cnfanshp.com, et non sur Superbuy.com.",back:"RETOUR AUX PRODUITS",specs:"FICHE PRODUIT",category:"CATÉGORIE",sourceId:"ID SOURCE"},
  it:{sourcePrice:"PREZZO FONTE (CNY)",updated:"PREZZO VERIFICATO 11 AGO 2026",details:"VEDI DETTAGLI",check:"Controlla variante, condizioni del venditore, consegna locale e prove di magazzino. Il prezzo è un riferimento datato, non un costo consegnato.",partner:"APRI L’OFFERTA PARTNER",partnerNote:"Questo pulsante apre il prodotto corrispondente sul catalogo partner cnfanshp.com, non su Superbuy.com.",back:"TORNA A TUTTI I PRODOTTI",specs:"SCHEDA PRODOTTO",category:"CATEGORIA",sourceId:"ID FONTE"},
  nl:{sourcePrice:"BRONPRIJS (CNY)",updated:"PRIJS GECONTROLEERD 11 AUG 2026",details:"BEKIJK DETAILS",check:"Controleer de actuele optie, verkopersvoorwaarden, lokale levering en magazijnbewijs. De prijs is een gedateerde zoekreferentie, geen bezorgde totaalprijs.",partner:"OPEN PARTNERAANBOD",partnerNote:"Deze knop opent het overeenkomende product op partnercatalogus cnfanshp.com, niet op Superbuy.com.",back:"TERUG NAAR ALLE PRODUCTEN",specs:"PRODUCTGEGEVENS",category:"CATEGORIE",sourceId:"BRON-ID"},
  ms:{sourcePrice:"HARGA SUMBER (CNY)",updated:"HARGA DISEMAK 11 OGOS 2026",details:"LIHAT BUTIRAN",check:"Semak pilihan semasa, syarat penjual, penghantaran tempatan dan bukti gudang. Harga ini ialah rujukan bertarikh, bukan jumlah kos dihantar.",partner:"BUKA SENARAI RAKAN KONGSI",partnerNote:"Butang ini membuka produk sepadan di katalog rakan kongsi cnfanshp.com, bukan Superbuy.com.",back:"KEMBALI KE SEMUA PRODUK",specs:"REKOD PRODUK",category:"KATEGORI",sourceId:"ID SUMBER"},
};
