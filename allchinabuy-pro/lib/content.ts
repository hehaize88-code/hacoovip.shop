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

export type Guide = {
  slug: string;
  title: string;
  eyebrow: string;
  description: string;
  readingTime: string;
  updated: string;
  sections: { title: string; body: string }[];
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

export const guides: Guide[] = [
  {
    slug: "how-a-china-shopping-directory-works",
    title: "How a China Shopping Directory Works",
    eyebrow: "Beginner guide",
    description:
      "Understand what a curated product directory can do, what it cannot verify, and how to continue safely to a live shopping page.",
    readingTime: "7 min read",
    updated: LAST_REVIEWED,
    sections: [
      {
        title: "A directory is a discovery layer",
        body: "A shopping directory organizes routes into a larger catalogue. It can make categories, common searches and practical checks easier to understand, but it does not manufacture, inspect or ship the products. AllChinaBuy Pro is independent and sends visitors to CNFansHP when they want to view live catalogue results.",
      },
      {
        title: "Start broad, then verify the live page",
        body: "Begin with the product type you actually need. Once you reach a live result, review the current title, images, options, price, seller information and availability. Directory descriptions are research prompts; the destination page remains the place to confirm current commercial details.",
      },
      {
        title: "Use measurements instead of assumptions",
        body: "International size labels are inconsistent. Compare garment measurements with an item you already own, and check shoe insole or foot-length guidance when available. If a necessary measurement is missing, asking before purchase is safer than guessing.",
      },
      {
        title: "Plan the complete cost",
        body: "The product price is only one part of a cross-border purchase. Domestic delivery, optional services, packing materials, international shipping, taxes and payment conversion can all affect the total. Keep a simple estimate and leave room for packed weight or volume to change.",
      },
      {
        title: "Keep records",
        body: "Save the original listing link, selected options, measurements and key screenshots. Links and stock can change. A compact record makes it easier to compare warehouse information with what you selected and to explain a problem if one appears.",
      },
    ],
  },
  {
    slug: "qc-photo-checklist",
    title: "A Practical QC Photo Checklist",
    eyebrow: "Quality control",
    description:
      "A repeatable way to review warehouse photographs without confusing photographs with a full product inspection.",
    readingTime: "8 min read",
    updated: LAST_REVIEWED,
    sections: [
      {
        title: "Check the order first",
        body: "Before looking for small flaws, confirm that the product, colour, size and quantity match the order. A clear photograph of the wrong option is still the wrong order. Compare visible labels and measurement evidence with your saved purchase details.",
      },
      {
        title: "Review shape and symmetry",
        body: "Look at the product from several angles. For footwear, compare left and right shape, panels, sole alignment and visible glue. For clothing, check seams, hems, pockets, zips and the way the garment sits when laid flat. Perspective can distort proportions, so avoid judging from a single angle.",
      },
      {
        title: "Ask for measurements that answer a decision",
        body: "Extra photographs are most useful when they resolve a specific uncertainty. Requesting insole length, chest width, body length or bag dimensions is more actionable than asking for another general picture. State the exact measurement and units you need.",
      },
      {
        title: "Understand the limits",
        body: "A warehouse image cannot reliably prove durability, long-term colourfastness, electronics performance, water resistance or authenticity. Treat it as one checkpoint in the process. Product claims that need laboratory or brand verification require stronger evidence.",
      },
      {
        title: "Make a documented decision",
        body: "Record whether you accept the item, request clarification or use the available return process. Deadlines can apply, so review photographs promptly. Keep the photographs and messages connected to the order in case you need them later.",
      },
    ],
  },
  {
    slug: "shipping-cost-planning",
    title: "Plan Shipping Cost Before You Build a Haul",
    eyebrow: "Shipping guide",
    description:
      "A grounded method for estimating packed weight, volumetric weight, restrictions and destination costs before checkout.",
    readingTime: "9 min read",
    updated: LAST_REVIEWED,
    sections: [
      {
        title: "Separate product and parcel weight",
        body: "Product weight is not final parcel weight. Outer cartons, protective material and consolidation choices add weight and dimensions. Shoes and structured bags may occupy more space than their scale weight suggests, which matters when a line uses volumetric calculations.",
      },
      {
        title: "Compare chargeable-weight rules",
        body: "Shipping lines can calculate charges differently. Some use actual weight, while others compare actual and volumetric weight and charge the larger figure. Read the current line rules and use the official calculator with realistic dimensions rather than the smallest possible estimate.",
      },
      {
        title: "Check restrictions before purchasing",
        body: "Batteries, liquids, magnets, food, cosmetics and some branded goods can face route or destination restrictions. A cheap product becomes an expensive problem if it cannot use the expected shipping line. Confirm restrictions before placing the product order.",
      },
      {
        title: "Treat taxes as destination-specific",
        body: "Customs rules, thresholds and tax collection differ by country and can change. Do not copy another buyer's declaration or tax outcome without checking the current requirements for your destination. Use official customs information when accuracy matters.",
      },
      {
        title: "Keep a buffer",
        body: "Estimates are useful, not guarantees. Build a buffer for packing changes, exchange rates and carrier adjustments. If the final quotation is outside your budget, reconsider parcel composition and available lines before submitting international delivery.",
      },
    ],
  },
  {
    slug: "product-link-safety",
    title: "Product Link Safety: What to Check Before You Click Buy",
    eyebrow: "Link guide",
    description:
      "How to recognize the destination, preserve the source link and avoid treating a directory page as proof of a seller or product.",
    readingTime: "6 min read",
    updated: LAST_REVIEWED,
    sections: [
      {
        title: "Know where the link ends",
        body: "Read the destination domain before continuing. AllChinaBuy Pro links to CNFansHP for live catalogue searches, but it remains a separate independent website. A familiar brand name inside a URL path is not the same as ownership of the domain.",
      },
      {
        title: "Preserve the original source",
        body: "When a product originates on another marketplace, save that original address as well as the agent or catalogue link. The source helps you recover context if a converted link changes or an item becomes unavailable.",
      },
      {
        title: "Do not trust urgency labels alone",
        body: "Countdowns, stock warnings and popularity labels can be useful only when backed by current inventory data. Avoid rushing because a directory or promotional page says an item is trending. Verify availability and terms on the current destination page.",
      },
      {
        title: "Check payment and account pages carefully",
        body: "Use a unique password and verify the domain before entering credentials or payment details. Secure HTTPS is necessary but does not by itself prove that every seller or product claim is reliable.",
      },
      {
        title: "Report broken routes",
        body: "A responsible directory should update or remove broken links. If a route no longer reaches the intended category or returns an unexpected destination, stop and use the contact page to report it instead of trying similar-looking domains.",
      },
    ],
  },
];

export const faqs = [
  {
    question: "Is AllChinaBuy Pro the official AllChinaBuy website?",
    answer:
      "No. AllChinaBuy Pro is an independent shopping directory. It is not owned, sponsored or endorsed by AllChinaBuy, CNFansHP or the marketplaces mentioned in its guides.",
  },
  {
    question: "Does this website sell or ship products?",
    answer:
      "No. It organizes discovery pages and practical research guidance. Product browsing, account activity, payment and fulfilment take place on the destination website.",
  },
  {
    question: "Where does the search box go?",
    answer:
      "A text search opens the corresponding CNFansHP search-results page using the exact words you entered. An empty category link opens the relevant catalogue section instead.",
  },
  {
    question: "Are the product images proof of quality or authenticity?",
    answer:
      "No. The original logo-free images on this directory illustrate product categories. They do not prove the quality, availability, origin or authenticity of a live marketplace item.",
  },
  {
    question: "How often are directory links reviewed?",
    answer:
      "The core destination routes were reviewed on July 17, 2026. Each discovery page shows its review date. Availability and destination content can still change after that date.",
  },
  {
    question: "Why are there no invented ratings or customer quotations?",
    answer:
      "Ratings and testimonials require verifiable evidence. This directory avoids fabricating social proof and instead explains what shoppers should verify on the live listing.",
  },
];

export function getProduct(slug: string) {
  return products.find((product) => product.slug === slug);
}

export function getCategory(slug: string) {
  return categories.find((category) => category.slug === slug);
}

export function getGuide(slug: string) {
  return guides.find((guide) => guide.slug === slug);
}
