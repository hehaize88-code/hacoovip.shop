export const CATALOG_CHECKED_DATE = "2026-08-24";
export const USD_REFERENCE_RATE = 0.13894;

export type CatalogCategory = {
  slug: "shoes" | "hoodies" | "jerseys" | "bags" | "headwear" | "electronics";
  name: string;
  searchLabel: string;
  intro: string;
  checklist: string[];
};

export type CatalogProduct = {
  id: string;
  name: string;
  category: CatalogCategory["slug"];
  cny: number;
  image: string;
};

export const catalogCategories: CatalogCategory[] = [
  {
    slug: "shoes",
    name: "Shoes",
    searchLabel: "Hipobuy shoes spreadsheet",
    intro: "Compare currently reachable shoe listings in one server-rendered table. Use the row as a discovery shortcut, then confirm the live variation, size system, seller information and warehouse evidence before approval.",
    checklist: ["Match the exact model and selected color.", "Compare label, seller chart and useful measurements.", "Inspect both shoes, sole joins and heel alignment.", "Confirm boxes and accessories only when they matter to you."],
  },
  {
    slug: "hoodies",
    name: "Hoodies",
    searchLabel: "Hipobuy hoodie finds",
    intro: "Browse checked hoodie and sweatshirt links with dated price references. The listing title and image help identify the row; the paid variation and warehouse measurements remain the evidence for a buying decision.",
    checklist: ["Check the selected color and size label.", "Compare chest, length and sleeve measurements.", "Review print or embroidery placement.", "Inspect cuffs, hem, seams and visible marks."],
  },
  {
    slug: "jerseys",
    name: "Jerseys",
    searchLabel: "Hipobuy jersey spreadsheet",
    intro: "Use this category to locate jersey listings without mixing them into a general feed. Multi-style listings require extra care: verify the exact team, season, name set, size and included pieces on the live order line.",
    checklist: ["Record the exact team, season and style option.", "Confirm name, number and badge choices where offered.", "Compare garment measurements instead of size letters alone.", "Check print alignment, seams and visible pulls."],
  },
  {
    slug: "bags",
    name: "Bags",
    searchLabel: "Hipobuy bags finds",
    intro: "Review checked bag links and dated price snapshots, then inspect the live listing for size, material claims, color and included straps or pouches. A warehouse photograph can show visible construction but cannot certify composition or authenticity.",
    checklist: ["Confirm dimensions and selected color.", "Count detachable straps, pouches and accessories.", "Inspect handles, zipper paths, corners and hardware.", "Treat authenticity and hidden material claims as unverified."],
  },
  {
    slug: "headwear",
    name: "Headwear",
    searchLabel: "Hipobuy headwear spreadsheet",
    intro: "Find currently reachable caps and hats with a consistent verification record. Before ordering, confirm size or adjustability; before shipping, check shape, embroidery, brim condition and visible construction in warehouse photos.",
    checklist: ["Confirm size, adjustability and selected color.", "Review crown shape and brim symmetry.", "Inspect embroidery, print and edge finishing.", "Check compression or packaging damage before shipping."],
  },
  {
    slug: "electronics",
    name: "Electronics",
    searchLabel: "Hipobuy electronics spreadsheet",
    intro: "This is a discovery index, not a safety or compatibility certification. Electronics may face battery, plug, radio, route or destination restrictions, and a still warehouse image cannot establish battery life, internal specifications or long-term function.",
    checklist: ["Confirm model, connector, plug and included parts.", "Check battery and route restrictions before payment.", "Ask what functional testing is actually available.", "Do not infer internal specifications from a listing title."],
  },
];

export const catalogProducts: CatalogProduct[] = [
  { id: "6045", name: "shoes-60", category: "shoes", cny: 330, image: "/uploads/allimg/20260417/1-26041G55S9251.jpg" },
  { id: "6044", name: "shoes-59", category: "shoes", cny: 399, image: "/uploads/allimg/20260417/1-26041G55T0302.jpg" },
  { id: "6043", name: "shoes-58", category: "shoes", cny: 280, image: "/uploads/allimg/20260417/1-26041G55T15c.jpg" },
  { id: "6042", name: "shoes-57", category: "shoes", cny: 340, image: "/uploads/allimg/20260417/1-26041G55THL.jpg" },
  { id: "6041", name: "shoes-56", category: "shoes", cny: 449, image: "/uploads/allimg/20260417/1-26041G55TVK.jpg" },
  { id: "6040", name: "shoes-55", category: "shoes", cny: 459, image: "/uploads/allimg/20260417/1-26041G55Ta19.jpg" },
  { id: "6039", name: "shoes-54", category: "shoes", cny: 298, image: "/uploads/allimg/20260417/1-26041G55U0V9.jpg" },
  { id: "6038", name: "shoes-53", category: "shoes", cny: 450, image: "/uploads/allimg/20260417/1-26041G55U0115.jpg" },
  { id: "6037", name: "shoes-52", category: "shoes", cny: 400, image: "/uploads/allimg/20260417/1-26041G55U1U5.jpg" },
  { id: "6036", name: "shoes-51", category: "shoes", cny: 280, image: "/uploads/allimg/20260417/1-26041G55U22J.jpg" },
  { id: "5974", name: "Patagonia classic loose-fitting crew neck", category: "hoodies", cny: 140, image: "/uploads/allimg/20260417/1-26041G1101D39.webp" },
  { id: "5970", name: "Miu Miu's new collared patchwork casual", category: "hoodies", cny: 160, image: "/uploads/allimg/20260417/1-26041G1054H39.webp" },
  { id: "5968", name: "Balenciaga new collection", category: "hoodies", cny: 159, image: "/uploads/allimg/20260417/1-26041G10133Z9.webp" },
  { id: "5960", name: "Balenciaga 100% Cotton Printed Crew Neck Sweatshirt", category: "hoodies", cny: 269, image: "/uploads/allimg/20260417/1-26041G0532K03.webp" },
  { id: "5959", name: "Burberry embroidered knit casual sweater", category: "hoodies", cny: 298, image: "/uploads/allimg/20260417/1-26041G0522GH.webp" },
  { id: "5935", name: "Stone Island round print sweatshirt", category: "hoodies", cny: 210, image: "/uploads/allimg/20260417/1-26041G02H9E1.webp" },
  { id: "5902", name: "Chanel new arrival crew neck top", category: "hoodies", cny: 160, image: "/uploads/allimg/20260402/1-26040211255A33.webp" },
  { id: "5896", name: "Chanel new diamond", category: "hoodies", cny: 189, image: "/uploads/allimg/20260402/1-260402111TW02.webp" },
  { id: "5894", name: "Miu Miu new loose-fitting striped long", category: "hoodies", cny: 320, image: "/uploads/allimg/20260402/1-260402111613V3.webp" },
  { id: "5891", name: "Oakley embroidered crewneck fleece sweatshirt", category: "hoodies", cny: 210, image: "/uploads/allimg/20260402/1-26040211125M91.webp" },
  { id: "5850", name: "NBA City Edition Jerseys [40 styles]", category: "jerseys", cny: 88, image: "/uploads/allimg/20260328/1-26032Q40Z2R6.webp" },
  { id: "5846", name: "NBA City Edition Jerseys [40 styles]", category: "jerseys", cny: 88, image: "/uploads/allimg/20260328/1-26032Q4020U08.webp" },
  { id: "5785", name: "NFL Super Bowl 49", category: "jerseys", cny: 75, image: "/uploads/allimg/20260327/1-26032G0515GM.webp" },
  { id: "5342", name: "Football Jerseys", category: "jerseys", cny: 131, image: "/uploads/allimg/20260313/1-260313123U3436.webp" },
  { id: "5176", name: "Stussy jerseys", category: "jerseys", cny: 99, image: "/uploads/allimg/20260310/1-260310144P3315.webp" },
  { id: "5166", name: "Lebron James Lakers Jersey", category: "jerseys", cny: 130, image: "/uploads/allimg/20260310/1-260310143Q2249.webp" },
  { id: "5083", name: "Manchester City 21/22/23/24 Away Jersey [32 styles]", category: "jerseys", cny: 99, image: "/uploads/allimg/20260309/1-260309111001V3.webp" },
  { id: "4929", name: "adidas T-shirt", category: "jerseys", cny: 79, image: "/uploads/allimg/20260306/1-260306113945X3.webp" },
  { id: "4911", name: "Football Jersey", category: "jerseys", cny: 118, image: "/uploads/allimg/20260306/1-26030611003X26.webp" },
  { id: "4888", name: "Real Madrid Jersey", category: "jerseys", cny: 90, image: "/uploads/allimg/20260305/1-260305150942S5.webp" },
  { id: "5729", name: "YSL bags", category: "bags", cny: 252, image: "/uploads/allimg/20260326/1-260326111Z1A1.webp" },
  { id: "5621", name: "Cheap Woman Bags", category: "bags", cny: 175, image: "/uploads/allimg/20260320/1-26032012111N57.webp" },
  { id: "5619", name: "Cheap Woman Bags", category: "bags", cny: 366, image: "/uploads/allimg/20260320/1-260320120923114.webp" },
  { id: "5445", name: "Lacoste and Loewe Bags [40 styles]", category: "bags", cny: 210, image: "/uploads/allimg/20260314/1-260314111631939.webp" },
  { id: "5363", name: "Coach Bags", category: "bags", cny: 300, image: "/uploads/allimg/20260313/1-260313130440434.webp" },
  { id: "5234", name: "Burberry bags (40 styles)", category: "bags", cny: 278, image: "/uploads/allimg/20260311/1-260311135911R0.webp" },
  { id: "5175", name: "Cheap Woman Bags", category: "bags", cny: 252, image: "/uploads/allimg/20260310/1-260310144F4215.webp" },
  { id: "5163", name: "Chanel bags", category: "bags", cny: 390, image: "/uploads/allimg/20260310/1-260310143502J5.webp" },
  { id: "5148", name: "Coach Signature Crossbody & Tote Bags [39 styles]", category: "bags", cny: 109, image: "/uploads/allimg/20260310/1-260310141U95C.webp" },
  { id: "5141", name: "Prada bags", category: "bags", cny: 430, image: "/uploads/allimg/20260310/1-260310141204Z0.webp" },
  { id: "5971", name: "Miu Miu letter-embroidered", category: "headwear", cny: 89, image: "/uploads/allimg/20260417/1-26041G10Fc05.webp" },
  { id: "5889", name: "Loewe all-over print sun protection baseball cap", category: "headwear", cny: 89, image: "/uploads/allimg/20260402/1-260402111049305.webp" },
  { id: "5888", name: "Chanel new printed sun protection bucket hat", category: "headwear", cny: 99, image: "/uploads/allimg/20260402/1-26040211095JM.webp" },
  { id: "5887", name: "Louis Vuitton (LV) new stylish", category: "headwear", cny: 99, image: "/uploads/allimg/20260402/1-260402110Z4B0.webp" },
  { id: "5886", name: "Chanel logo-print visor hat", category: "headwear", cny: 89, image: "/uploads/allimg/20260402/1-260402110P3107.webp" },
  { id: "5885", name: "Dior new denim wide-brimmed", category: "headwear", cny: 99, image: "/uploads/allimg/20260402/1-260402110F2191.webp" },
  { id: "5884", name: "Miu Miu new embroidered knitted hat", category: "headwear", cny: 79, image: "/uploads/allimg/20260402/1-26040211055OO.webp" },
  { id: "5864", name: "Chanel beaded straw visor hat", category: "headwear", cny: 89, image: "/uploads/allimg/20260401/1-260401200050561.webp" },
  { id: "5863", name: "Celine hand-woven sun hat with flat top", category: "headwear", cny: 99, image: "/uploads/allimg/20260401/1-2604011959442W.webp" },
  { id: "5820", name: "Patagonia winter hat", category: "headwear", cny: 49, image: "/uploads/allimg/20260328/1-26032Q32450V3.webp" },
  { id: "5822", name: "AIR MagSsfe", category: "electronics", cny: 75, image: "/uploads/allimg/20260328/1-26032Q32640313.webp" },
  { id: "5821", name: "Apple watch s9", category: "electronics", cny: 170, image: "/uploads/allimg/20260328/1-26032Q3254E02.webp" },
  { id: "5819", name: "Cartier Mechanical watches Top Replica", category: "electronics", cny: 2680, image: "/uploads/allimg/20260328/1-26032Q32351559.webp" },
  { id: "5753", name: "Cartier, Rolex watch", category: "electronics", cny: 358, image: "/uploads/allimg/20260326/1-260326114432P7.webp" },
  { id: "5752", name: "Armani watch", category: "electronics", cny: 183, image: "/uploads/allimg/20260326/1-26032611432R09.gif" },
  { id: "5732", name: "Horizon Earbuds 5 styles", category: "electronics", cny: 1440, image: "/uploads/allimg/20260326/1-260326112201519.webp" },
  { id: "5693", name: "Watch Ultra 2", category: "electronics", cny: 324, image: "/uploads/allimg/20260324/1-26032409394L18.webp" },
  { id: "5691", name: "Server", category: "electronics", cny: 1101, image: "/uploads/allimg/20260324/1-260324093I34C.webp" },
  { id: "5650", name: "ROLEX Brand Men's Watches (40 styles)", category: "electronics", cny: 480, image: "/uploads/allimg/20260321/1-260321110934336.webp" },
  { id: "5632", name: "Watch series 9", category: "electronics", cny: 170, image: "/uploads/allimg/20260321/1-26032110452L33.webp" },
];

export function getCatalogCategory(slug: string) {
  return catalogCategories.find((category) => category.slug === slug);
}

export function productsForCategory(slug: string) {
  return catalogProducts.filter((product) => product.category === slug);
}

export function productHref(id: string) {
  return `https://cnfanshp.com/AllProducts/${id}.html`;
}

export function imageHref(path: string) {
  return `https://cnfanshp.com${path}`;
}

export function usdReference(cny: number) {
  return `$${(cny * USD_REFERENCE_RATE).toFixed(2)}`;
}
