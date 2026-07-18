import { guides } from "./guides";
import { faqs, featuredFaqs } from "./faqs";

export { faqs, featuredFaqs, guides };
export type { Guide } from "./guides";
export type { FaqItem } from "./faqs";

export const SITE_URL = "https://allchinabuy.pro";
export const MAIN_SITE_URL = "https://cnfanshp.com";
export const LAST_REVIEWED = "July 17, 2026";

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
    targetUrl: `${MAIN_SITE_URL}/shoes/`,
    searchTerm: "shoes",
  },
  {
    slug: "clothing",
    title: "Clothing",
    kicker: "T-shirts, sweatshirts and daily layers",
    description:
      "Start with broad clothing ideas and continue to the live catalogue for current options, details and availability.",
    image: "/images/charcoal-tee.png",
    targetUrl: `${MAIN_SITE_URL}/t-shirts/`,
    searchTerm: "clothing",
  },
  {
    slug: "jackets",
    title: "Jackets",
    kicker: "Technical shells, casual jackets and outer layers",
    description:
      "Use material, intended weather and measurements as your first checks before following a jacket listing.",
    image: "/images/charcoal-jacket.png",
    targetUrl: `${MAIN_SITE_URL}/jackets/`,
    searchTerm: "jackets",
  },
  {
    slug: "pants-shorts",
    title: "Pants & shorts",
    kicker: "Relaxed fits, daily basics and seasonal bottoms",
    description:
      "Compare waist, rise, inseam and fabric notes instead of relying on a generic size label alone.",
    image: "/images/everyday-bottoms.png",
    targetUrl: `${MAIN_SITE_URL}/pants-shorts/`,
    searchTerm: "pants shorts",
  },
  {
    slug: "headwear",
    title: "Headwear",
    kicker: "Caps, beanies and low-weight add-ons",
    description:
      "A compact category for finding headwear while keeping fit, material and packaging shape in view.",
    image: "/images/cap-accessories.png",
    targetUrl: `${MAIN_SITE_URL}/headwear/`,
    searchTerm: "headwear",
  },
  {
    slug: "accessories",
    title: "Accessories",
    kicker: "Bags, organizers and practical extras",
    description:
      "Review dimensions and materials carefully; product photos alone rarely communicate usable capacity.",
    image: "/images/black-crossbody.png",
    targetUrl: `${MAIN_SITE_URL}/accessories/`,
    searchTerm: "accessories",
  },
  {
    slug: "jersey",
    title: "Jerseys",
    kicker: "Sports-inspired tops and coordinated sets",
    description:
      "Check the live product page for the current size chart, print method and care information.",
    image: "/images/sports-jersey.png",
    targetUrl: `${MAIN_SITE_URL}/Jersey/`,
    searchTerm: "jersey",
  },
  {
    slug: "electronics",
    title: "Electronics",
    kicker: "Small devices and everyday accessories",
    description:
      "Confirm battery, plug, voltage, shipping-line and destination restrictions before ordering electronics.",
    image: "/images/small-electronics.png",
    targetUrl: `${MAIN_SITE_URL}/electronics/`,
    searchTerm: "electronics",
  },
];

export const products: Product[] = [
  {
    slug: "neutral-mesh-runner",
    title: "Neutral Mesh Runner",
    category: "Shoes",
    categorySlug: "shoes",
    short: "A neutral starting point for everyday technical runners.",
    description:
      "This discovery entry helps you compare neutral mesh running-style footwear without pretending that one image proves quality. Open the live CNFansHP results, review the current seller page, confirm sizing and inspect available detail photographs before ordering.",
    image: "/images/neutral-sneaker.png",
    checkedAt: LAST_REVIEWED,
    tags: ["neutral", "mesh", "runner"],
    targetUrl: `${MAIN_SITE_URL}/search.html?channelid=2&keywords=mesh%20runner%20shoes`,
  },
  {
    slug: "charcoal-technical-shell",
    title: "Charcoal Technical Shell",
    category: "Jackets",
    categorySlug: "jackets",
    short: "A practical route into lightweight technical outerwear.",
    description:
      "Use this page as a research starting point for technical shell jackets. Compare fabric composition, lining, hood construction, garment measurements and the warehouse photographs shown on the live listing. Water resistance should never be assumed from appearance alone.",
    image: "/images/charcoal-jacket.png",
    checkedAt: LAST_REVIEWED,
    tags: ["shell", "outerwear", "charcoal"],
    targetUrl: `${MAIN_SITE_URL}/search.html?channelid=2&keywords=technical%20shell%20jacket`,
  },
  {
    slug: "heavyweight-oversized-tee",
    title: "Heavyweight Oversized Tee",
    category: "Clothing",
    categorySlug: "clothing",
    short: "A simple entry for comparing relaxed cotton T-shirts.",
    description:
      "For an oversized T-shirt, the useful details are chest width, shoulder width, length, fabric weight and shrinkage guidance. Follow the live catalogue link and compare those measurements with a shirt you already own rather than choosing only by S, M or L.",
    image: "/images/charcoal-tee.png",
    checkedAt: LAST_REVIEWED,
    tags: ["t-shirt", "cotton", "oversized"],
    targetUrl: `${MAIN_SITE_URL}/search.html?channelid=2&keywords=heavyweight%20oversized%20t-shirt`,
  },
  {
    slug: "utility-crossbody-bag",
    title: "Utility Crossbody Bag",
    category: "Accessories",
    categorySlug: "accessories",
    short: "A compact accessory search focused on usable dimensions.",
    description:
      "Crossbody bags can look larger in product photography than they are. Check the listed height, width, depth, strap range, closure and internal pockets on the current product page. If those figures are missing, request clarification before purchase.",
    image: "/images/black-crossbody.png",
    checkedAt: LAST_REVIEWED,
    tags: ["bag", "utility", "travel"],
    targetUrl: `${MAIN_SITE_URL}/search.html?channelid=2&keywords=utility%20crossbody%20bag`,
  },
  {
    slug: "minimal-six-panel-cap",
    title: "Minimal Six-Panel Cap",
    category: "Headwear",
    categorySlug: "headwear",
    short: "A clean headwear route for simple everyday caps.",
    description:
      "Cap fit depends on crown depth, circumference and adjustment range. Use the current listing to confirm those details, and remember that firm packaging may be useful when a structured crown needs to hold its shape in transit.",
    image: "/images/cap-accessories.png",
    checkedAt: LAST_REVIEWED,
    tags: ["cap", "headwear", "minimal"],
    targetUrl: `${MAIN_SITE_URL}/search.html?channelid=2&keywords=six%20panel%20cap`,
  },
  {
    slug: "everyday-training-shoe",
    title: "Everyday Training Shoe",
    category: "Shoes",
    categorySlug: "shoes",
    short: "A second footwear route for casual training silhouettes.",
    description:
      "Before choosing a training-style shoe, compare insole length, outsole pattern, upper material and warehouse photos. This directory does not grade performance or authenticity; it simply takes you to current CNFansHP search results for further research.",
    image: "/images/everyday-training-shoe.png",
    checkedAt: LAST_REVIEWED,
    tags: ["training", "everyday", "footwear"],
    targetUrl: `${MAIN_SITE_URL}/search.html?channelid=2&keywords=everyday%20training%20shoes`,
  },
  {
    slug: "lightweight-hooded-layer",
    title: "Lightweight Hooded Layer",
    category: "Jackets",
    categorySlug: "jackets",
    short: "A browse path for packable hooded outer layers.",
    description:
      "A lightweight jacket is useful only when its material and fit suit the intended conditions. Confirm garment weight, measurements, pocket layout and fabric description on the live listing. Product imagery is a visual reference, not a performance test.",
    image: "/images/lightweight-hooded-layer.png",
    checkedAt: LAST_REVIEWED,
    tags: ["hooded", "layer", "lightweight"],
    targetUrl: `${MAIN_SITE_URL}/search.html?channelid=2&keywords=lightweight%20hooded%20anorak`,
  },
  {
    slug: "relaxed-cotton-top",
    title: "Relaxed Cotton Top",
    category: "Clothing",
    categorySlug: "clothing",
    short: "A measured approach to relaxed everyday tops.",
    description:
      "Use shoulder, chest and body-length figures to compare relaxed tops. Screens can shift colour, and fabric hand-feel cannot be confirmed from an image, so read the live listing and available buyer information carefully.",
    image: "/images/relaxed-cotton-top.png",
    checkedAt: LAST_REVIEWED,
    tags: ["cotton", "top", "relaxed"],
    targetUrl: `${MAIN_SITE_URL}/search.html?channelid=2&keywords=relaxed%20long%20sleeve%20cotton%20top`,
  },
  {
    slug: "compact-travel-organizer",
    title: "Compact Travel Organizer",
    category: "Accessories",
    categorySlug: "accessories",
    short: "A route into small organizers and travel add-ons.",
    description:
      "Small accessories are easy to add to a parcel but can still affect packed volume. Check exact dimensions, closures, material and weight on the current listing. Combine purchases only after estimating the final parcel rather than item price alone.",
    image: "/images/compact-travel-organizer.png",
    checkedAt: LAST_REVIEWED,
    tags: ["organizer", "travel", "accessory"],
    targetUrl: `${MAIN_SITE_URL}/search.html?channelid=2&keywords=compact%20travel%20organizer%20pouch`,
  },
  {
    slug: "sports-jersey-starting-point",
    title: "Sports Jersey Starting Point",
    category: "Jerseys",
    categorySlug: "jersey",
    short: "A category route for sports-inspired shirts and sets.",
    description:
      "Jersey measurements and decoration methods vary. Confirm the current size chart, fabric description, print or embroidery notes and care instructions on the linked page. This directory makes no authenticity or licensing claim.",
    image: "/images/sports-jersey.png",
    checkedAt: LAST_REVIEWED,
    tags: ["jersey", "sports", "shirt"],
    targetUrl: `${MAIN_SITE_URL}/search.html?channelid=2&keywords=sports%20jersey`,
  },
  {
    slug: "everyday-bottoms-guide",
    title: "Everyday Bottoms Guide",
    category: "Pants & shorts",
    categorySlug: "pants-shorts",
    short: "A practical browse route for pants and shorts.",
    description:
      "Waist labels alone are not enough for bottoms. Look for garment waist, rise, thigh, inseam and hem measurements, then compare them with a pair that fits. Follow the live category for current listings and product details.",
    image: "/images/everyday-bottoms.png",
    checkedAt: LAST_REVIEWED,
    tags: ["pants", "shorts", "sizing"],
    targetUrl: `${MAIN_SITE_URL}/search.html?channelid=2&keywords=casual%20cargo%20pants`,
  },
  {
    slug: "small-electronics-checklist",
    title: "Small Electronics Checklist",
    category: "Electronics",
    categorySlug: "electronics",
    short: "A safety-first route for small electronics searches.",
    description:
      "Electronics can have battery, plug, voltage and shipping restrictions. Verify technical specifications, destination compatibility and the shipping line before payment. Do not treat a marketplace photograph as proof of certification or performance.",
    image: "/images/small-electronics.png",
    checkedAt: LAST_REVIEWED,
    tags: ["electronics", "shipping", "checklist"],
    targetUrl: `${MAIN_SITE_URL}/search.html?channelid=2&keywords=small%20electronics%20accessories`,
  },
];

function assertUniqueProductField(field: "slug" | "image" | "targetUrl") {
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
