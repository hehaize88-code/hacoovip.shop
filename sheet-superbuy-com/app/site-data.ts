export const MAIN_SITE = "https://www.cnfanshp.com";

export type Product = {
  title: string;
  category: string;
  price: string;
  image: string;
  url: string;
  status: string;
};

export const categories = [
  { name: "Shoes", note: "Sneakers & footwear", url: `${MAIN_SITE}/shoes/` },
  { name: "Hoodies", note: "Sweatshirts & knits", url: `${MAIN_SITE}/hoodies-sweaters/` },
  { name: "T-Shirts", note: "Short & long sleeve", url: `${MAIN_SITE}/t-shirts/` },
  { name: "Jackets", note: "Outerwear & layers", url: `${MAIN_SITE}/jackets/` },
  { name: "Pants", note: "Trousers & shorts", url: `${MAIN_SITE}/pants-shorts/` },
  { name: "Headwear", note: "Caps & beanies", url: `${MAIN_SITE}/headwear/` },
  { name: "Accessories", note: "Small goods & extras", url: `${MAIN_SITE}/accessories/` },
  { name: "Jersey", note: "Sport styles", url: `${MAIN_SITE}/jersey/` },
  { name: "Electronics", note: "Devices & add-ons", url: `${MAIN_SITE}/electronics/` },
  { name: "Other finds", note: "More categories", url: `${MAIN_SITE}/other-stuff/` },
];

export const products: Product[] = [
  {
    title: "Shoes 64",
    category: "Shoes",
    price: "≈ $36.20",
    image: "https://www.cnfanshp.com/uploads/allimg/20260427/1-26042G03A3226.webp",
    url: `${MAIN_SITE}/AllProducts/6049.html`,
    status: "6-image gallery",
  },
  {
    title: "Shoes 62",
    category: "Shoes",
    price: "≈ $55.70",
    image: "https://www.cnfanshp.com/uploads/allimg/20260427/1-26042G0310V93.webp",
    url: `${MAIN_SITE}/AllProducts/6047.html`,
    status: "6-image gallery",
  },
  {
    title: "Classic loose-fit crew neck",
    category: "Hoodies",
    price: "≈ $19.60",
    image: "https://www.cnfanshp.com/uploads/allimg/20260417/1-26041G1101D39.webp",
    url: `${MAIN_SITE}/AllProducts/5974.html`,
    status: "6-image gallery",
  },
  {
    title: "Embroidered jacket",
    category: "Jackets",
    price: "≈ $41.70",
    image: "https://www.cnfanshp.com/uploads/allimg/20260417/1-26041G1193O56.webp",
    url: `${MAIN_SITE}/AllProducts/5981.html`,
    status: "6-image gallery",
  },
  {
    title: "Drawstring pants",
    category: "Pants",
    price: "≈ $34.80",
    image: "https://www.cnfanshp.com/uploads/allimg/20260417/1-26041G1212V39.webp",
    url: `${MAIN_SITE}/AllProducts/5983.html`,
    status: "5-image gallery",
  },
  {
    title: "Piqué cotton short sleeve",
    category: "T-Shirts",
    price: "≈ $30.10",
    image: "https://www.cnfanshp.com/uploads/allimg/20260417/1-26041G1121Q55.webp",
    url: `${MAIN_SITE}/AllProducts/5976.html`,
    status: "6-image gallery",
  },
];

export const quickFaqs = [
  {
    question: "Is this the official Superbuy website?",
    answer:
      "No. This is an independent product-research and buying-guide site. It does not process orders, payments, returns, or shipping.",
  },
  {
    question: "Are the USD prices final?",
    answer:
      "No. USD figures are browsing estimates based on the source listing. Confirm the current item price, domestic delivery, optional services, and international shipping before paying.",
  },
  {
    question: "What does a route check mean?",
    answer:
      "It means the destination page and its primary product image were reachable when reviewed. It is not an authenticity endorsement or a guarantee that stock will remain available.",
  },
  {
    question: "Why check QC photos before shipping?",
    answer:
      "Warehouse photos can help you compare the received item with the selected colour, size, quantity, and visible condition before you submit the international parcel.",
  },
];
