export const SITE_URL = "https://hacoo.pro";
export const DESTINATION = "https://www.cnfanshp.com";

export const categories = [
  {
    slug: "shoes",
    name: "Shoes",
    eyebrow: "Fit first",
    count: "60+ edits",
    destination: "/shoes/",
    image: "/products/shoe-performance.webp",
    description: "Browse footwear finds with a practical focus on measurements, shape, material notes and current listing details.",
    checklist: ["Compare insole length, not only the printed size", "Check both sides and the heel from matching angles", "Confirm the live listing before making a decision"],
  },
  {
    slug: "headwear",
    name: "Headwear",
    eyebrow: "Top it off",
    count: "Caps, hats & beanies",
    destination: "/headwear/",
    image: "/products/headwear-edit.webp",
    description: "Explore caps, hats and beanies with practical checks for fit, construction, material and current options.",
    checklist: ["Compare head circumference and crown depth", "Confirm whether the style is fitted, adjustable or stretch", "Inspect the brim, seams and embroidery on the selected option"],
  },
  {
    slug: "hoodies-sweaters",
    name: "Hoodies & Sweaters",
    eyebrow: "Layer ready",
    count: "Seasonal layers",
    destination: "/hoodies-sweaters/",
    image: "/products/knit-everyday.webp",
    description: "Explore hoodies, knits and pullovers through one focused Hacoo spreadsheet-style category route.",
    checklist: ["Check chest width and total length", "Look for clear fabric-weight information", "Review cuffs, hems and graphic alignment"],
  },
  {
    slug: "t-shirts",
    name: "T-Shirts",
    eyebrow: "Everyday edit",
    count: "Short sleeves",
    destination: "/t-shirts/",
    image: "/products/tee-edit.webp",
    description: "Find tees and polo styles, then verify the latest color, size and availability on the live catalog.",
    checklist: ["Use shoulder, chest and length measurements", "Check print placement at full and close range", "Confirm color under neutral lighting when possible"],
  },
  {
    slug: "jackets",
    name: "Jackets",
    eyebrow: "Outer layer",
    count: "Light to insulated",
    destination: "/jackets/",
    image: "/products/jacket-edit.webp",
    description: "Browse outerwear and seasonal layers with guidance for sizing, construction and shipping-volume checks.",
    checklist: ["Leave room for the layers you plan to wear", "Inspect zipper tracks, pockets and seam joins", "Consider packed volume before checkout"],
  },
  {
    slug: "pants-shorts",
    name: "Pants & Shorts",
    eyebrow: "Better proportions",
    count: "Bottoms edit",
    destination: "/pants-shorts/",
    image: "/products/shorts-utility.webp",
    description: "A measurement-led selection of trousers, shorts and casual bottoms from the live CNFansHP catalog.",
    checklist: ["Compare waist, rise, inseam and leg opening", "Check pocket and panel symmetry", "Read whether the waist is fixed or elasticated"],
  },
  {
    slug: "accessories",
    name: "Accessories",
    eyebrow: "Small details",
    count: "Finishing pieces",
    destination: "/accessories/",
    image: "/products/accessory-edit.webp",
    description: "Explore smaller finds through a faster route, while still checking dimensions, material and listing status.",
    checklist: ["Check exact dimensions instead of relying on photos", "Inspect closures, edges and moving parts", "Review material descriptions carefully"],
  },
  {
    slug: "electronics",
    name: "Electronics",
    eyebrow: "Specs matter",
    count: "Devices & extras",
    destination: "/electronics/",
    image: "/products/electronics-edit.webp",
    description: "Browse electronics and device accessories with extra attention to versions, compatibility and package contents.",
    checklist: ["Confirm plug, voltage and region compatibility", "Check the exact model and included accessories", "Review warranty and return terms on the destination"],
  },
];

export const products = [
  { name: "Grey low-top sneakers", category: "Shoes", image: "/products/live-6045.jpg", href: "/AllProducts/6045.html", tag: "Live" },
  { name: "Letter-embroidered beanies", category: "Headwear", image: "/products/live-5971.webp", href: "/AllProducts/5971.html", tag: "Current" },
  { name: "Classic logo crew-neck", category: "Sweatshirts", image: "/products/live-5974.webp", href: "/AllProducts/5974.html", tag: "Popular" },
  { name: "Piqué cotton polo", category: "T-Shirts", image: "/products/live-5976.webp", href: "/AllProducts/5976.html", tag: "Fresh" },
  { name: "Colour-block track jacket", category: "Jackets", image: "/products/live-5981.webp", href: "/AllProducts/5981.html", tag: "Updated" },
  { name: "Drawstring denim shorts", category: "Pants & Shorts", image: "/products/live-5983.webp", href: "/AllProducts/5983.html", tag: "New" },
  { name: "Classic dress watch", category: "Accessories", image: "/products/live-5952.webp", href: "/AllProducts/5952.html", tag: "39 styles" },
  { name: "Magnetic power bank", category: "Electronics", image: "/products/live-5822.webp", href: "/AllProducts/5822.html", tag: "Tech" },
];

export const guides = [
  {
    slug: "what-is-a-hacoo-spreadsheet",
    title: "What Is a Hacoo Spreadsheet?",
    short: "A clear definition of spreadsheet-style product discovery, what it can help with, and what it cannot verify for you.",
    read: "5 min",
  },
  {
    slug: "how-to-use-hacoo-spreadsheet",
    title: "How to Use a Hacoo Spreadsheet",
    short: "A practical workflow for moving from category discovery to a live product page without losing important details.",
    read: "7 min",
  },
  {
    slug: "qc-photo-checklist",
    title: "QC Photo Checklist",
    short: "Learn which views, measurements and construction details are useful when photographs are available.",
    read: "8 min",
  },
  {
    slug: "size-guide",
    title: "Hacoo Size Guide",
    short: "Why garment measurements beat familiar size labels, with a short method for reducing avoidable sizing mistakes.",
    read: "6 min",
  },
  {
    slug: "shipping-planning",
    title: "Plan for Shipping",
    short: "A planning guide for dimensions, weight, destination rules and live shipping information—without invented delivery promises.",
    read: "6 min",
  },
];

export const guideContent = {
  "what-is-a-hacoo-spreadsheet": {
    kicker: "Start with the definition",
    intro: "A Hacoo spreadsheet is a community phrase for a structured collection of product-discovery links. The useful part is the organization: instead of opening unrelated posts, a visitor can begin with a product category, scan a smaller set of options and continue to a live listing for current information.",
    sections: [
      ["What a spreadsheet can do", "It can shorten the discovery stage by grouping links into recognizable categories such as shoes, T-shirts, jackets or accessories. A well-maintained guide can also explain what to measure and which listing details should be checked before a decision."],
      ["What it cannot guarantee", "A link is not a guarantee of availability, quality, suitability, shipping cost or delivery time. Listings change. Images, options and terms should always be checked on the current destination page."],
      ["How Hacoo Pro is different", "Hacoo Pro is an independent editorial index rather than an official Hacoo service or a seller. It combines category routes with practical reading, then links to the CNFansHP catalog when you want to inspect current listing details."],
    ],
    steps: ["Choose the closest category", "Read the category-specific checklist", "Open the current listing", "Verify the details on the destination"],
  },
  "how-to-use-hacoo-spreadsheet": {
    kicker: "A calmer discovery workflow",
    intro: "Good spreadsheet browsing is less about opening as many links as possible and more about eliminating unsuitable options early. Use a short, repeatable process so price or photography does not distract from fit, specifications and current availability.",
    sections: [
      ["Begin with intent", "Decide whether you are exploring a category, solving a sizing question or looking for a specific type of item. Category pages are faster when the product type is already clear; guides are more useful when a question is blocking the next step."],
      ["Create a short list", "Open only a few promising listings. Compare the same information across each one: measurements, options, material description, included items and the date you last checked the page."],
      ["Use the live page as the final reference", "Hacoo Pro provides discovery context. The linked CNFansHP page is where you should confirm current images, options and availability. If the information is incomplete, pause rather than guessing."],
    ],
    steps: ["Pick one category", "Shortlist two or three listings", "Compare like-for-like details", "Recheck the live destination page"],
  },
  "qc-photo-checklist": {
    kicker: "Look for useful evidence",
    intro: "When product photographs or quality-control images are available, consistency matters more than a single attractive angle. A useful set should make it possible to compare shape, finish and measurements without relying on assumptions.",
    sections: [
      ["Start with the full shape", "Look for front, back and side views taken from a similar distance. For paired items, both sides should be visible together so obvious differences are easier to notice."],
      ["Inspect construction points", "Move closer to seams, hems, zippers, hardware and printed or embroidered areas. Neutral lighting is helpful because deep shadows can hide edges and surface variation."],
      ["Match the selected option", "Photographs are only useful when they correspond to the chosen size, color or model. Compare visible labels and measurements with the option shown on the live listing."],
    ],
    steps: ["Full front and back", "Both sides or both items", "Detail views of stress points", "Visible measurement reference"],
  },
  "size-guide": {
    kicker: "Measurements before labels",
    intro: "A familiar size label is not a universal measurement. The most reliable starting point is an item you already own and like: measure it flat, then compare those numbers with the current listing rather than choosing by S, M or L alone.",
    sections: [
      ["For tops and jackets", "Record shoulder width, chest width, sleeve length and back length. If you plan to layer clothing underneath, compare with a jacket that already fits that way."],
      ["For pants and shorts", "Compare waist, rise, inseam and leg opening. Confirm whether the listed waist is a flat width, a full circumference or a range for an elasticated waistband."],
      ["For footwear", "Use foot length and, where available, the internal length of a comfortable shoe. Leave appropriate room for socks and movement, and do not assume a regional conversion is exact."],
    ],
    steps: ["Measure a well-fitting item", "Use the same measurement method", "Compare every important dimension", "Ask when the size chart is unclear"],
  },
  "shipping-planning": {
    kicker: "Plan, then verify live terms",
    intro: "Shipping information changes with destination, dimensions, weight, carrier and local rules. A responsible guide should help you identify those variables, not promise a universal price or delivery window.",
    sections: [
      ["Think about packed size", "Bulky outerwear, footwear boxes and large accessories may occupy more space than their product weight suggests. Packed dimensions can materially affect the available shipping options."],
      ["Check destination requirements", "Import rules, restricted items, taxes and carrier availability vary by country. Use the checkout or shipping provider's current information for your destination."],
      ["Keep evidence of the live terms", "Before completing an external transaction, save the applicable product, shipping and return information. Hacoo Pro does not process orders and cannot control third-party terms."],
    ],
    steps: ["Confirm destination", "Estimate packed weight and volume", "Review live carrier options", "Read current returns and restrictions"],
  },
};

export const faqs = [
  ["What is Hacoo Pro?", "Hacoo Pro is an independent product-discovery and editorial guide for people searching Hacoo spreadsheet-style categories, links and buying checklists."],
  ["Is Hacoo Pro the official Hacoo website?", "No. Hacoo Pro is independent and is not affiliated with, endorsed by or operated by Hacoo or any marketplace."],
  ["Does Hacoo Pro sell products?", "No. We organize discovery pages and link to external live listings. Any transaction takes place on the destination website under its own terms."],
  ["Where do the product links go?", "Product and category buttons currently open relevant pages on cnfanshp.com so visitors can check the live catalog information."],
  ["Are listings always available?", "No. External listings, options and availability can change. Always check the current destination page."],
  ["Does a listing guarantee product quality?", "No. A link or photograph cannot guarantee quality. Use available measurements, listing information and policies to make your own assessment."],
  ["How should I choose a size?", "Compare the listing measurements with a similar item you already own. Do not rely only on familiar size letters or automatic regional conversions."],
  ["Does Hacoo Pro promise shipping times?", "No. Shipping depends on destination, carrier, package and current third-party terms. We explain what to check without inventing a universal timeline."],
];
