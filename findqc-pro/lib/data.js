export const MAIN_SITE = "https://cnfanshp.com";

export const categories = [
  {
    slug: "shoes",
    name: "Shoes",
    short: "Sneakers & footwear",
    description: "Browse footwear listings, compare available angles, and check shape, outsole, stitching and size-label details.",
    href: `${MAIN_SITE}/shoes/`,
    code: "01",
  },
  {
    slug: "hoodies-sweaters",
    name: "Hoodies",
    short: "Hoodies & sweaters",
    description: "Explore warm layers and use the QC checklist to review fabric weight, print placement, cuffs and measurements.",
    href: `${MAIN_SITE}/hoodies-sweaters/`,
    code: "02",
  },
  {
    slug: "t-shirts",
    name: "T-Shirts",
    short: "Tees & tops",
    description: "Find everyday tops and inspect collar shape, print alignment, seams, tags and the measurement ruler when shown.",
    href: `${MAIN_SITE}/t-shirts/`,
    code: "03",
  },
  {
    slug: "jackets",
    name: "Jackets",
    short: "Outerwear",
    description: "Review outerwear listings with attention to hardware, lining, panel symmetry, embroidery and overall dimensions.",
    href: `${MAIN_SITE}/jackets/`,
    code: "04",
  },
  {
    slug: "pants-shorts",
    name: "Pants",
    short: "Pants & shorts",
    description: "Compare bottoms and check the waist, inseam, pocket placement, drawstrings and size information before ordering.",
    href: `${MAIN_SITE}/pants-shorts/`,
    code: "05",
  },
  {
    slug: "headwear",
    name: "Headwear",
    short: "Caps & hats",
    description: "Browse caps and hats while checking crown shape, embroidery, brim profile, closure hardware and label details.",
    href: `${MAIN_SITE}/headwear/`,
    code: "06",
  },
  {
    slug: "accessories",
    name: "Accessories",
    short: "Bags, watches & more",
    description: "Discover accessories and examine finishing, hardware, dimensions and protective packaging in the available images.",
    href: `${MAIN_SITE}/accessories/`,
    code: "07",
  },
  {
    slug: "jersey",
    name: "Jerseys",
    short: "Teamwear",
    description: "Browse jersey listings and check numbering, badges, print alignment, stitching and size charts before choosing.",
    href: `${MAIN_SITE}/Jersey/`,
    code: "08",
  },
  {
    slug: "electronics",
    name: "Electronics",
    short: "Tech accessories",
    description: "Explore tech-related listings and confirm specifications, plug type, included parts and protective packaging.",
    href: `${MAIN_SITE}/electronics/`,
    code: "09",
  },
];

export const CATALOG_REVIEWED = "July 22, 2026";

const PRODUCT_NOTES = {
  shoes: "Footwear listing",
  "hoodies-sweaters": "Hoodie listing",
  "t-shirts": "T-shirt listing",
  jackets: "Outerwear listing",
  "pants-shorts": "Pants listing",
  headwear: "Headwear listing",
  accessories: "Accessory listing",
  jersey: "Jersey listing",
  electronics: "Electronics listing",
};

// [main-site page ID, marketplace item ID, source-page title, CNY price,
// source-page views at review time, local first-listing image]
const PRODUCT_ROWS = {
  shoes: [
    ["6045", "7721490300", "shoes-60", "330", "761", "shoes-6045.jpg"],
    ["6044", "7718490449", "shoes-59", "399", "696", "shoes-6044.jpg"],
    ["6043", "7718478481", "shoes-58", "280", "722", "shoes-6043.jpg"],
    ["6042", "7721519754", "shoes-57", "340", "679", "shoes-6042.jpg"],
    ["6041", "7721480454", "shoes-56", "449", "596", "shoes-6041.jpg"],
    ["6040", "7718401451", "shoes-55", "459", "815", "shoes-6040.jpg"],
    ["6039", "7721482086", "shoes-54", "298", "804", "shoes-6039.jpg"],
    ["6038", "7718529759", "shoes-53", "450", "897", "shoes-6038.jpg"],
    ["6037", "7718442847", "shoes-52", "400", "890", "shoes-6037.jpg"],
    ["6036", "7718527953", "shoes-51", "280", "576", "shoes-6036.jpg"],
    ["6035", "7718470681", "shoes-50", "200", "807", "shoes-6035.jpg"],
    ["6034", "7721434928", "shoes-49", "180", "500", "shoes-6034.jpg"],
  ],
  "hoodies-sweaters": [
    ["5974", "7729171230", "Patagonia classic loose-fitting crew neck", "140", "503", "hoodies-sweaters-5974.webp"],
    ["5970", "7729230050", "Miu Miu's new collared patchwork casual", "160", "652", "hoodies-sweaters-5970.webp"],
    ["5968", "7726030455", "Balenciaga new collection", "159", "915", "hoodies-sweaters-5968.webp"],
    ["5960", "7726283791", "Balenciaga 100% Cotton Printed Crew Neck Sweatshirt", "269", "578", "hoodies-sweaters-5960.webp"],
    ["5959", "7726234257", "Burberry embroidered knit casual sweater", "298", "535", "hoodies-sweaters-5959.webp"],
    ["5935", "7730389718", "Stone Island round print sweatshirt", "210", "881", "hoodies-sweaters-5935.webp"],
    ["5902", "7725908708", "Chanel new arrival crew neck top", "160", "668", "hoodies-sweaters-5902.webp"],
    ["5896", "7725857374", "Chanel new diamond", "189", "694", "hoodies-sweaters-5896.webp"],
    ["5894", "7725949854", "Miu Miu new loose-fitting striped long", "320", "794", "hoodies-sweaters-5894.webp"],
    ["5891", "7722857485", "Oakley embroidered crewneck fleece sweatshirt", "210", "955", "hoodies-sweaters-5891.webp"],
    ["5859", "7722887201", "Alo half-zip base layer yoga top", "270", "804", "hoodies-sweaters-5859.webp"],
    ["5856", "7725908762", "Hellstar printed loose short", "240", "759", "hoodies-sweaters-5856.webp"],
  ],
  "t-shirts": [
    ["5976", "7728855390", "Gucci pique cotton breathable and versatile short", "215", "518", "t-shirts-5976.webp"],
    ["5953", "7727310781", "Polo shirt (5 styles)", "109", "611", "t-shirts-5953.webp"],
    ["5934", "7727281311", "Off White T-shirt", "110", "803", "t-shirts-5934.webp"],
    ["5931", "7727358217", "Broken Planet Tee", "115.32", "925", "t-shirts-5931.webp"],
    ["5927", "7727336601", "Supreme T-shirt (31 CP)", "99", "867", "t-shirts-5927.webp"],
    ["5926", "7730322634", "Louis Vuitton T-Shirts (2 CP)", "121", "658", "t-shirts-5926.webp"],
    ["5925", "7727273015", "Louis Vuitton LV T-Shirts (2 CP)", "161", "946", "t-shirts-5925.webp"],
    ["5920", "7725871400", "Vlone tee", "99", "762", "t-shirts-5920.webp"],
    ["5916", "7725959684", "Fendi Tee", "113", "667", "t-shirts-5916.webp"],
    ["5915", "7722809541", "Burberry T-shirt", "168", "774", "t-shirts-5915.webp"],
    ["5906", "7725867228", "Chrome Hearts CH new", "189", "615", "t-shirts-5906.webp"],
    ["5898", "7725940018", "Louis Vuitton LV knitted top", "220", "753", "t-shirts-5898.webp"],
  ],
  jackets: [
    ["5981", "7729275624", "Celine embroidered chocolate", "298", "990", "jackets-5981.webp"],
    ["5969", "7729222146", "Miu Miu new arrival knitted jacket", "320", "692", "jackets-5969.webp"],
    ["5958", "7730289022", "Maison Margiela casual business jacket", "455", "717", "jackets-5958.webp"],
    ["5933", "7727293037", "Prada jacket", "208", "643", "jackets-5933.webp"],
    ["5919", "7725945994", "The North Face Nuptse Jacket", "299", "577", "jackets-5919.webp"],
    ["5910", "7725371094", "Louis Vuitton jacket", "158", "797", "jackets-5910.webp"],
    ["5905", "7725918472", "Chrome Hearts CH new design", "189", "548", "jackets-5905.webp"],
    ["5904", "7725877164", "Miu Miu new reversible zip-up", "298", "947", "jackets-5904.webp"],
    ["5903", "7722885221", "Chanel new short padded jacket", "320", "691", "jackets-5903.jpg"],
    ["5901", "7722955895", "Polo Ralph Lauren new jacket", "330", "688", "jackets-5901.webp"],
    ["5900", "7723769521", "Fendi new jacquard letter jacket", "230", "962", "jackets-5900.jpg"],
    ["5899", "7725912766", "Burberry new lightweight jacket", "550", "917", "jackets-5899.webp"],
  ],
  "pants-shorts": [
    ["5983", "7729253730", "Balenciaga new drawstring", "249", "781", "pants-shorts-5983.webp"],
    ["5982", "7729192626", "Drew House distressed wide-leg jeans", "249", "949", "pants-shorts-5982.webp"],
    ["5980", "7726261745", "Acne Studios 1996 Butterfly", "398", "746", "pants-shorts-5980.webp"],
    ["5979", "7729167174", "Balenciaga vintage washed denim jeans", "398", "788", "pants-shorts-5979.webp"],
    ["5978", "7729247850", "Acne Studios 1996 Splatter Paint Graffiti Jeans", "268", "882", "pants-shorts-5978.webp"],
    ["5977", "7729235950", "Balenciaga new collection letter embroidered", "279", "854", "pants-shorts-5977.webp"],
    ["5973", "7726173713", "Patagonia quick-drying pants", "239", "775", "pants-shorts-5973.webp"],
    ["5972", "7726189121", "Chrome Hearts new lettered pants", "198", "780", "pants-shorts-5972.webp"],
    ["5928", "7730283040", "Chanel denim shorts", "128", "590", "pants-shorts-5928.webp"],
    ["5912", "7725931994", "Gallery Dept pants", "217", "520", "pants-shorts-5912.webp"],
    ["5895", "7722901063", "Miu Miu drawstring pants", "275", "668", "pants-shorts-5895.webp"],
    ["5857", "7725893110", "ALO casual straight-leg pants", "239", "976", "pants-shorts-5857.webp"],
  ],
  headwear: [
    ["5971", "7726285689", "Miu Miu letter-embroidered beanie", "89", "617", "headwear-5971.webp"],
    ["5889", "7722941911", "Loewe all-over print sun protection baseball cap", "89", "787", "headwear-5889.webp"],
    ["5888", "7725889134", "Chanel new printed sun protection bucket hat", "99", "849", "headwear-5888.webp"],
    ["5887", "7725940012", "Louis Vuitton new stylish hat", "99", "998", "headwear-5887.webp"],
    ["5886", "7725861398", "Chanel logo-print visor hat", "89", "979", "headwear-5886.webp"],
    ["5885", "7722388983", "Dior new denim wide-brimmed hat", "99", "801", "headwear-5885.webp"],
    ["5884", "7725881082", "Miu Miu new embroidered knitted hat", "79", "609", "headwear-5884.webp"],
    ["5864", "7722967721", "Chanel beaded straw visor hat", "89", "780", "headwear-5864.webp"],
    ["5863", "7722891123", "Celine hand-woven flat-top sun hat", "99", "620", "headwear-5863.webp"],
    ["5820", "7719430431", "Patagonia winter hat", "49", "553", "headwear-5820.webp"],
    ["5772", "7718419125", "STUSSY Hat", "96", "545", "headwear-5772.webp"],
    ["5741", "7719745572", "Prada cap", "99", "575", "headwear-5741.webp"],
  ],
  accessories: [
    ["5952", "7727360235", "Longines watches (39 styles)", "520", "531", "accessories-5952.webp"],
    ["5947", "7727267525", "Arpels grey mother-of-pearl accessory", "260", "579", "accessories-5947.webp"],
    ["5946", "7730257528", "Van Cleef & Arpels accessory", "260", "720", "accessories-5946.webp"],
    ["5945", "7730292918", "VANS vertical tri-fold canvas sports wallet", "40", "535", "accessories-5945.webp"],
    ["5944", "7730367938", "Louis Vuitton diamond enchantment accessory", "260", "849", "accessories-5944.webp"],
    ["5943", "7730316700", "Chanel blue heart silver perfume accessory", "260", "604", "accessories-5943.jpg"],
    ["5941", "7730308694", "Chanel Double C hollow earrings", "260", "509", "accessories-5941.webp"],
    ["5940", "7727342529", "Gucci fashion sunglasses", "129", "839", "accessories-5940.webp"],
    ["5924", "7726868202", "Louis Vuitton letter-coated accessory", "220", "743", "accessories-5924.webp"],
    ["5923", "7726881916", "Louis Vuitton cherry bag decoration", "220", "763", "accessories-5923.webp"],
    ["5922", "7722801557", "Miu Miu 5057 Sunglasses (39 styles)", "65", "834", "accessories-5922.webp"],
    ["5874", "7725883170", "Louis Vuitton accessory", "220", "946", "accessories-5874.jpg"],
  ],
  jersey: [
    ["5850", "7722497712", "NBA City Edition Jerseys (40 styles)", "88", "774", "jersey-5850.webp"],
    ["5846", "7719309547", "NBA City Edition Jerseys (40 styles)", "88", "789", "jersey-5846.jpg"],
    ["5785", "7718512161", "NFL Super Bowl 49", "75", "632", "jersey-5785.webp"],
    ["5342", "7706116723", "Football Jerseys", "131", "633", "jersey-5342.webp"],
    ["5176", "7704607213", "Stussy jerseys", "99", "630", "jersey-5176.webp"],
    ["5166", "7704598833", "Lebron James Lakers Jersey", "130", "511", "jersey-5166.webp"],
    ["5083", "7703414539", "Manchester City Away Jersey (32 styles)", "99", "717", "jersey-5083.webp"],
    ["4929", "7704827800", "Adidas T-shirt", "79", "699", "jersey-4929.webp"],
    ["4911", "7701112655", "Football Jersey", "118", "973", "jersey-4911.webp"],
    ["4888", "7701145927", "Real Madrid Jersey", "90", "829", "jersey-4888.webp"],
    ["4681", "7680778633", "Japan Jersey Stussy", "96", "718", "jersey-4681.webp"],
    ["4674", "7683725108", "NFL 49ERS", "75", "506", "jersey-4674.webp"],
  ],
  electronics: [
    ["5822", "7719471861", "AIR magnetic power accessory", "75", "975", "electronics-5822.webp"],
    ["5821", "7719446295", "Apple Watch S9", "170", "699", "electronics-5821.webp"],
    ["5819", "7722369054", "Cartier mechanical watch", "2680", "749", "electronics-5819.webp"],
    ["5753", "7719804524", "Cartier and Rolex watch collection", "358", "806", "electronics-5753.webp"],
    ["5752", "7719822298", "Armani watch", "183", "681", "electronics-5752.gif"],
    ["5732", "7716842309", "Horizon Earbuds (5 styles)", "1440", "626", "electronics-5732.webp"],
    ["5693", "7715355081", "Watch Ultra 2", "324", "753", "electronics-5693.webp"],
    ["5691", "7718233360", "Server", "1101", "534", "electronics-5691.webp"],
    ["5650", "7715789308", "Rolex men's watches (40 styles)", "480", "544", "electronics-5650.webp"],
    ["5632", "7712834899", "Watch Series 9", "170", "734", "electronics-5632.webp"],
    ["5630", "7715763542", "Rolex Submariner & Nautilus watches", "366", "767", "electronics-5630.webp"],
    ["5615", "7711911589", "Rolex mechanical watches", "480", "708", "electronics-5615.webp"],
  ],
};

export const products = Array.from({ length: 12 }, (_, rowIndex) =>
  categories.map(({ slug }) => {
    const [id, sourceId, name, price, views, image] = PRODUCT_ROWS[slug][rowIndex];
    return {
      id,
      sourceId,
      name,
      category: slug,
      price,
      views,
      image: `/products/catalog/${image}`,
      href: `${MAIN_SITE}/AllProducts/${id}.html`,
      note: PRODUCT_NOTES[slug],
      reviewedAt: CATALOG_REVIEWED,
    };
  }),
).flat();

for (const { slug } of categories) {
  const categoryCount = products.filter((product) => product.category === slug).length;
  if (categoryCount < 8 || categoryCount > 12) {
    throw new Error(`Product category ${slug} must contain 8–12 products; found ${categoryCount}.`);
  }
}

for (const field of ["id", "sourceId", "href", "image"]) {
  const values = products.map((product) => product[field]);
  if (new Set(values).size !== values.length) {
    throw new Error(`Product catalog contains a duplicate ${field}.`);
  }
}

export const faqs = [
  {
    question: "Does FindQC Pro sell products?",
    answer: "No. FindQC Pro is an independent product-discovery and QC education website. Product pages and purchase actions open the source catalog on cnfanshp.com, where availability and current details should be confirmed.",
  },
  {
    question: "Are the displayed images a guarantee of product quality?",
    answer: "No. Images are reference material, not a guarantee. Check the listing details and any warehouse or inspection images made available for your own order before approving international shipment.",
  },
  {
    question: "What can I search for?",
    answer: "You can search this site's mapped categories and product shortlist by a word such as shoes, hoodie or cap, or enter a known product ID. Matching results keep their exact source-page links instead of sending every query to a generic all-products page.",
  },
  {
    question: "Why should I check QC images before shipping?",
    answer: "A careful image review can help you spot visible issues such as an incorrect colour, obvious damage, missing parts or a measurement mismatch while the parcel is still at the warehouse. It cannot verify every material or performance detail.",
  },
];

export { articles } from "./articles.js";
