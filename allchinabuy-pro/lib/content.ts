import { guides } from "./guides";
import { faqs, featuredFaqs } from "./faqs";

export { faqs, featuredFaqs, guides };
export type { Guide } from "./guides";
export type { FaqItem } from "./faqs";

export const SITE_URL = "https://allchinabuy.pro";
export const MAIN_SITE_URL = "https://www.allchinabuy.com";
export const CATALOGUE_SOURCE_URL = "https://www.cnfanshp.com";
export const LAST_REVIEWED = "July 18, 2026";

function buildAllChinaBuyProductUrl(itemId: string) {
  const sourceUrl = `https://weidian.com/item.html?itemId=${itemId}`;
  return `${MAIN_SITE_URL}/cn/page/buy/?nTag=Home-search&from=search-input&_search=url&position=&url=${encodeURIComponent(sourceUrl)}`;
}

export type Category = {
  slug: string;
  title: string;
  kicker: string;
  description: string;
  image: string;
  targetUrl: string;
  searchTerm: string;
};

export type Product = {
  slug: string;
  title: string;
  sourceTitle: string;
  itemId: string;
  category: string;
  categorySlug: string;
  short: string;
  description: string;
  image: string;
  checkedAt: string;
  tags: string[];
  targetUrl: string;
};

export const categories: Category[] = [
  {
    slug: "shoes",
    title: "Shoes",
    kicker: "Runners, casual pairs and everyday footwear",
    description:
      "Browse a cleaner route into the CNFansHP shoe catalogue, then compare the live listing before making any decision.",
    image: "/images/neutral-sneaker.png",
    targetUrl: `${CATALOGUE_SOURCE_URL}/shoes/`,
    searchTerm: "shoes",
  },
  {
    slug: "clothing",
    title: "Clothing",
    kicker: "T-shirts, sweatshirts and daily layers",
    description:
      "Start with broad clothing ideas and continue to the live catalogue for current options, details and availability.",
    image: "/images/charcoal-tee.png",
    targetUrl: `${CATALOGUE_SOURCE_URL}/t-shirts/`,
    searchTerm: "clothing",
  },
  {
    slug: "jackets",
    title: "Jackets",
    kicker: "Technical shells, casual jackets and outer layers",
    description:
      "Use material, intended weather and measurements as your first checks before following a jacket listing.",
    image: "/images/charcoal-jacket.png",
    targetUrl: `${CATALOGUE_SOURCE_URL}/jackets/`,
    searchTerm: "jackets",
  },
  {
    slug: "pants-shorts",
    title: "Pants & shorts",
    kicker: "Relaxed fits, daily basics and seasonal bottoms",
    description:
      "Compare waist, rise, inseam and fabric notes instead of relying on a generic size label alone.",
    image: "/images/everyday-bottoms.png",
    targetUrl: `${CATALOGUE_SOURCE_URL}/pants-shorts/`,
    searchTerm: "pants shorts",
  },
  {
    slug: "headwear",
    title: "Headwear",
    kicker: "Caps, beanies and low-weight add-ons",
    description:
      "A compact category for finding headwear while keeping fit, material and packaging shape in view.",
    image: "/images/cap-accessories.png",
    targetUrl: `${CATALOGUE_SOURCE_URL}/headwear/`,
    searchTerm: "headwear",
  },
  {
    slug: "accessories",
    title: "Accessories",
    kicker: "Bags, organizers and practical extras",
    description:
      "Review dimensions and materials carefully; product photos alone rarely communicate usable capacity.",
    image: "/images/black-crossbody.png",
    targetUrl: `${CATALOGUE_SOURCE_URL}/accessories/`,
    searchTerm: "accessories",
  },
  {
    slug: "jersey",
    title: "Jerseys",
    kicker: "Sports-inspired tops and coordinated sets",
    description:
      "Check the live product page for the current size chart, print method and care information.",
    image: "/images/sports-jersey.png",
    targetUrl: `${CATALOGUE_SOURCE_URL}/Jersey/`,
    searchTerm: "jersey",
  },
  {
    slug: "electronics",
    title: "Electronics",
    kicker: "Small devices and everyday accessories",
    description:
      "Confirm battery, plug, voltage, shipping-line and destination restrictions before ordering electronics.",
    image: "/images/small-electronics.png",
    targetUrl: `${CATALOGUE_SOURCE_URL}/electronics/`,
    searchTerm: "electronics",
  },
];

export const products: Product[] = [
  {
    slug: "neutral-mesh-runner",
    title: "Shoes-60",
    sourceTitle: "shoes-60",
    itemId: "7721490300",
    category: "Shoes",
    categorySlug: "shoes",
    short: "Matched source image and direct AllChinaBuy route for item 7721490300.",
    description:
      "The public source catalogue labels this footwear entry “shoes-60” and associates its displayed first image with Weidian item 7721490300. Open the matching AllChinaBuy route to reload current seller information, then verify sizing, options, price and availability before ordering.",
    image: "/images/products/shoes-60-7721490300.jpg",
    checkedAt: LAST_REVIEWED,
    tags: ["shoes-60", "footwear", "source-matched"],
    targetUrl: buildAllChinaBuyProductUrl("7721490300"),
  },
  {
    slug: "charcoal-technical-shell",
    title: "Celine Embroidered Jacket",
    sourceTitle: "Celine embroidered chocolate-",
    itemId: "7729275624",
    category: "Jackets",
    categorySlug: "jackets",
    short: "Matched source image and direct AllChinaBuy route for item 7729275624.",
    description:
      "The source catalogue displays the label “Celine embroidered chocolate-” for Weidian item 7729275624. The image shown here is that listing’s first image. Follow the matching AllChinaBuy route and confirm the full seller title, materials, measurements, options and current availability.",
    image: "/images/products/celine-jacket-7729275624.webp",
    checkedAt: LAST_REVIEWED,
    tags: ["jacket", "embroidered", "source-matched"],
    targetUrl: buildAllChinaBuyProductUrl("7729275624"),
  },
  {
    slug: "heavyweight-oversized-tee",
    title: "Polo Shirt (5 Styles)",
    sourceTitle: "Polo shirt（5 styles）",
    itemId: "7727310781",
    category: "Clothing",
    categorySlug: "clothing",
    short: "Matched source image and direct AllChinaBuy route for item 7727310781.",
    description:
      "The public source catalogue lists “Polo shirt（5 styles）” under Weidian item 7727310781. The first image is reproduced here to keep the card and destination aligned. Confirm the exact style, colour, size chart, fabric and seller details on AllChinaBuy before payment.",
    image: "/images/products/polo-shirt-7727310781.webp",
    checkedAt: LAST_REVIEWED,
    tags: ["polo shirt", "five styles", "source-matched"],
    targetUrl: buildAllChinaBuyProductUrl("7727310781"),
  },
  {
    slug: "utility-crossbody-bag",
    title: "The North Face Waist Pack",
    sourceTitle: "The North Face Waist Pack",
    itemId: "7714820698",
    category: "Accessories",
    categorySlug: "accessories",
    short: "Matched source image and direct AllChinaBuy route for item 7714820698.",
    description:
      "The source catalogue identifies this waist-pack listing as Weidian item 7714820698. Its first listing image is shown here. Open the corresponding AllChinaBuy route and check the selected colour, dimensions, strap range, construction and current seller information.",
    image: "/images/products/north-face-waist-pack-7714820698.webp",
    checkedAt: LAST_REVIEWED,
    tags: ["waist pack", "bag", "source-matched"],
    targetUrl: buildAllChinaBuyProductUrl("7714820698"),
  },
  {
    slug: "minimal-six-panel-cap",
    title: "Miu Miu Letter-Embroidered Beanie",
    sourceTitle: "Miu Miu letter-embroidered",
    itemId: "7726285689",
    category: "Headwear",
    categorySlug: "headwear",
    short: "Matched source image and direct AllChinaBuy route for item 7726285689.",
    description:
      "The source catalogue displays “Miu Miu letter-embroidered” for Weidian item 7726285689, with the first image showing several knit colour options. Use the matching AllChinaBuy page to confirm the actual option names, measurements, material and availability.",
    image: "/images/products/miu-miu-beanie-7726285689.webp",
    checkedAt: LAST_REVIEWED,
    tags: ["beanie", "headwear", "source-matched"],
    targetUrl: buildAllChinaBuyProductUrl("7726285689"),
  },
  {
    slug: "everyday-training-shoe",
    title: "Shoes-59",
    sourceTitle: "shoes-59",
    itemId: "7718490449",
    category: "Shoes",
    categorySlug: "shoes",
    short: "Matched source image and direct AllChinaBuy route for item 7718490449.",
    description:
      "The public source catalogue labels this footwear entry “shoes-59” and maps the displayed first image to Weidian item 7718490449. Open the exact AllChinaBuy route, then compare the option selected there with the image and verify size, material, price and stock.",
    image: "/images/products/shoes-59-7718490449.jpg",
    checkedAt: LAST_REVIEWED,
    tags: ["shoes-59", "footwear", "source-matched"],
    targetUrl: buildAllChinaBuyProductUrl("7718490449"),
  },
  {
    slug: "lightweight-hooded-layer",
    title: "Miu Miu Knitted Jacket",
    sourceTitle: "Miu Miu new arrival Knitted",
    itemId: "7729222146",
    category: "Jackets",
    categorySlug: "jackets",
    short: "Matched source image and direct AllChinaBuy route for item 7729222146.",
    description:
      "The source catalogue labels Weidian item 7729222146 “Miu Miu new arrival Knitted.” Its first listing image is reproduced here. Use the direct AllChinaBuy route to verify the full product title, knit composition, measurements, colour and live seller information.",
    image: "/images/products/miu-miu-jacket-7729222146.webp",
    checkedAt: LAST_REVIEWED,
    tags: ["knitted jacket", "zip jacket", "source-matched"],
    targetUrl: buildAllChinaBuyProductUrl("7729222146"),
  },
  {
    slug: "relaxed-cotton-top",
    title: "Broken Planet Tee",
    sourceTitle: "Broken Planet Tee",
    itemId: "7727358217",
    category: "Clothing",
    categorySlug: "clothing",
    short: "Matched source image and direct AllChinaBuy route for item 7727358217.",
    description:
      "The source catalogue lists “Broken Planet Tee” as Weidian item 7727358217 and uses the displayed multi-style image first. Open the matching AllChinaBuy destination and confirm which design and size are selected, along with fabric, measurements and current availability.",
    image: "/images/products/broken-planet-tee-7727358217.webp",
    checkedAt: LAST_REVIEWED,
    tags: ["tee", "multiple styles", "source-matched"],
    targetUrl: buildAllChinaBuyProductUrl("7727358217"),
  },
  {
    slug: "compact-travel-organizer",
    title: "VANS Trifold Canvas Wallet",
    sourceTitle: "VANS Velcro vertical tri-fold canvas sports wallet",
    itemId: "7730292918",
    category: "Accessories",
    categorySlug: "accessories",
    short: "Matched source image and direct AllChinaBuy route for item 7730292918.",
    description:
      "The public source title for Weidian item 7730292918 is “VANS Velcro vertical tri-fold canvas sports wallet.” The card uses that listing’s first image. Check the exact pattern, closure, dimensions, material and seller details on the matching AllChinaBuy page.",
    image: "/images/products/vans-wallet-7730292918.webp",
    checkedAt: LAST_REVIEWED,
    tags: ["wallet", "trifold", "source-matched"],
    targetUrl: buildAllChinaBuyProductUrl("7730292918"),
  },
  {
    slug: "sports-jersey-starting-point",
    title: "Football Jerseys",
    sourceTitle: "Football Jerseys",
    itemId: "7706116723",
    category: "Jerseys",
    categorySlug: "jersey",
    short: "Matched source image and direct AllChinaBuy route for item 7706116723.",
    description:
      "The source catalogue labels Weidian item 7706116723 “Football Jerseys” and displays the image used on this card first. Use the corresponding AllChinaBuy route to confirm the exact team or style option, size chart, decoration method, price and availability.",
    image: "/images/products/football-jerseys-7706116723.webp",
    checkedAt: LAST_REVIEWED,
    tags: ["football jersey", "sportswear", "source-matched"],
    targetUrl: buildAllChinaBuyProductUrl("7706116723"),
  },
  {
    slug: "everyday-bottoms-guide",
    title: "Patagonia Quick-Drying Pants",
    sourceTitle: "Patagonia quick-drying pants",
    itemId: "7726173713",
    category: "Pants & shorts",
    categorySlug: "pants-shorts",
    short: "Matched source image and direct AllChinaBuy route for item 7726173713.",
    description:
      "The source catalogue identifies Weidian item 7726173713 as “Patagonia quick-drying pants” and uses the displayed multi-colour image first. Confirm the precise colour, waist, rise, inseam, fabric and live seller information on AllChinaBuy.",
    image: "/images/products/patagonia-pants-7726173713.webp",
    checkedAt: LAST_REVIEWED,
    tags: ["quick-drying pants", "multiple colours", "source-matched"],
    targetUrl: buildAllChinaBuyProductUrl("7726173713"),
  },
  {
    slug: "small-electronics-checklist",
    title: "Horizon Earbuds (5 Styles)",
    sourceTitle: "Horizon Earbuds 5 styles",
    itemId: "7716842309",
    category: "Electronics",
    categorySlug: "electronics",
    short: "Matched source image and direct AllChinaBuy route for item 7716842309.",
    description:
      "The source catalogue labels Weidian item 7716842309 “Horizon Earbuds 5 styles” and supplies the first image shown here. Open the matching AllChinaBuy route and verify the selected style, technical specifications, battery details, compatibility and shipping-line restrictions.",
    image: "/images/products/horizon-earbuds-7716842309.webp",
    checkedAt: LAST_REVIEWED,
    tags: ["earbuds", "five styles", "source-matched"],
    targetUrl: buildAllChinaBuyProductUrl("7716842309"),
  },
];

function assertUniqueProductField(field: "slug" | "itemId" | "image" | "targetUrl") {
  const seen = new Set<string>();
  for (const product of products) {
    const value = product[field];
    if (seen.has(value)) {
      throw new Error(`Duplicate product ${field}: ${value}`);
    }
    seen.add(value);
  }
}

assertUniqueProductField("slug");
assertUniqueProductField("itemId");
assertUniqueProductField("image");
assertUniqueProductField("targetUrl");

export function getProduct(slug: string) {
  return products.find((product) => product.slug === slug);
}

export function getCategory(slug: string) {
  return categories.find((category) => category.slug === slug);
}

export function getGuide(slug: string) {
  return guides.find((guide) => guide.slug === slug);
}
