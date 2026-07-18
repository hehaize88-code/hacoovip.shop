export type FaqSourceKey = "directory" | "order" | "freight" | "goods";

export type FaqCategory =
  | "About this site"
  | "Order & checkout"
  | "Inspection & photos"
  | "Packing & storage"
  | "Shipping calculator"
  | "Restrictions & used items";

export type FaqSource = {
  title: string;
  url: string;
  scope: string;
  official: boolean;
};

export type FaqItem = {
  id: string;
  category: FaqCategory;
  question: string;
  answer: string;
  sources: FaqSourceKey[];
  featured?: boolean;
};

export const FAQ_REVIEWED = "July 18, 2026";

export const faqSources: Record<FaqSourceKey, FaqSource> = {
  directory: {
    title: "AllChinaBuy Pro disclaimer",
    url: "/disclaimer",
    scope: "This directory’s ownership, role and editorial limits.",
    official: false,
  },
  order: {
    title: "AllChinaBuy Order Confirmation",
    url: "https://m.allchinabuy.com/en/confirmorder/?isformcart=1",
    scope: "Public order-stage text covering cost timing, inspection, photos and original packing.",
    official: true,
  },
  freight: {
    title: "AllChinaBuy Shipping Calculator",
    url: "https://m.allchinabuy.com/en/freightcompute/",
    scope: "Public calculator fields, chargeable-weight guidance, route notes and warehouse limits.",
    official: true,
  },
  goods: {
    title: "AllChinaBuy Goods Detail",
    url: "https://m.allchinabuy.com/en/goodsdetail/",
    scope: "Public product-stage notices, restrictions, storage wording and used-item terms.",
    official: true,
  },
};

export const faqCategories: Array<{
  label: FaqCategory;
  slug: string;
  description: string;
}> = [
  {
    label: "About this site",
    slug: "about-this-site",
    description: "Who operates this directory and where transactions happen.",
  },
  {
    label: "Order & checkout",
    slug: "order-checkout",
    description: "What the first checkout includes and what to record before paying.",
  },
  {
    label: "Inspection & photos",
    slug: "inspection-photos",
    description: "The stated scope of standard checks, detailed photos and sealed packages.",
  },
  {
    label: "Packing & storage",
    slug: "packing-storage",
    description: "Original inbound boxes, warehouse separation and public storage wording.",
  },
  {
    label: "Shipping calculator",
    slug: "shipping-calculator",
    description: "Inputs, volume weight, route comparison and the limits of an estimate.",
  },
  {
    label: "Restrictions & used items",
    slug: "restrictions-used-items",
    description: "Reference-only route checks, prohibited goods and condition-sensitive purchases.",
  },
];

export const faqs: FaqItem[] = [
  {
    id: "is-this-official",
    category: "About this site",
    question: "Is AllChinaBuy Pro the official AllChinaBuy website?",
    answer:
      "No. AllChinaBuy Pro is an independent research directory. It is not owned, sponsored or endorsed by AllChinaBuy, and it does not represent AllChinaBuy support.",
    sources: ["directory"],
  },
  {
    id: "does-this-site-take-orders",
    category: "About this site",
    question: "Does this website accept payment, buy items or ship parcels?",
    answer:
      "No. This site publishes discovery routes and research notes. Account activity, payment, purchasing, warehouse services and fulfilment happen on the destination platform, not here.",
    sources: ["directory"],
  },
  {
    id: "international-shipping-included",
    category: "Order & checkout",
    question: "Does the item checkout total include international shipping?",
    answer:
      "No. AllChinaBuy’s public order-confirmation text labels the item-stage total as excluding international delivery, and the goods page says international shipping is calculated and charged after the goods reach the warehouse.",
    sources: ["order", "goods"],
    featured: true,
  },
  {
    id: "when-international-shipping-calculated",
    category: "Order & checkout",
    question: "When is the international shipping fee calculated?",
    answer:
      "After the goods arrive at the warehouse and you submit the final parcel. That is when the parcel’s actual packing, warehouse, weight and dimensions can be used to evaluate available routes.",
    sources: ["order", "goods", "freight"],
  },
  {
    id: "what-to-save-before-paying",
    category: "Order & checkout",
    question: "What should I save before I pay for an item?",
    answer:
      "Keep the original product URL, selected option, quantity, item price, local delivery, destination country and any paid service request. This is a practical record—not a platform requirement—and it gives you something concrete to compare with warehouse photos or a later price difference.",
    sources: ["order", "goods"],
  },
  {
    id: "price-can-change",
    category: "Order & checkout",
    question: "Can the amount change after I submit an order?",
    answer:
      "Yes. The public checkout copy warns that expired product or promotion information may require recalculation, and that a seller price change can create a difference to pay. Compare any request with the live listing and your saved order record before accepting it.",
    sources: ["order", "goods"],
  },
  {
    id: "every-product-purchasable",
    category: "Order & checkout",
    question: "Can AllChinaBuy purchase every item from every third-party platform?",
    answer:
      "No. The public goods interface includes notices for unavailable platforms, items that are not eligible for the shopping-agent service and contraband that cannot be added to the cart. A link resolving successfully is not proof that the item can be purchased.",
    sources: ["goods"],
  },
  {
    id: "standard-inspection-scope",
    category: "Inspection & photos",
    question: "What does AllChinaBuy’s standard inspection say it checks?",
    answer:
      "The current public order text describes checks of product information such as quantity, colour and size, with inspection photos. That is a visible warehouse check, not proof of authenticity, material composition, electrical safety or long-term durability.",
    sources: ["order"],
    featured: true,
  },
  {
    id: "standard-photo-count",
    category: "Inspection & photos",
    question: "Does the public page say three standard photos are included?",
    answer:
      "Yes. The current order-confirmation copy refers to three free standard inspection photos when it explains detailed-photo services. Treat that as public interface wording checked on the date below; the services shown in your live order remain authoritative.",
    sources: ["order"],
  },
  {
    id: "what-is-detailed-photo",
    category: "Inspection & photos",
    question: "What is a detailed photo?",
    answer:
      "The public order page describes it as a value-added photo for a personalised or precise requirement beyond the standard inspection photos. Use it to answer a decision question—a measurement, label, connector or close-up—not merely to request another general angle.",
    sources: ["order"],
  },
  {
    id: "write-photo-request",
    category: "Inspection & photos",
    question: "How should I write a useful detailed-photo request?",
    answer:
      "Ask for one observable requirement per photo and name the exact endpoints or angle. For example: ‘Lay the shirt flat and show chest width from armpit seam to armpit seam in centimetres.’ The public instructions say one photo handles one detailed requirement.",
    sources: ["order"],
  },
  {
    id: "photo-retake",
    category: "Inspection & photos",
    question: "Can I request a retake when a detailed photo misses my instruction?",
    answer:
      "The current public order copy says you may contact customer service for a free retake when the photo does not match the stated requirement. Save the original wording so the mismatch is easy to demonstrate.",
    sources: ["order"],
  },
  {
    id: "sealed-package-inspection",
    category: "Inspection & photos",
    question: "Are sealed products opened for inspection by default?",
    answer:
      "No. The public order text says sealed packaging is not opened for inspection or photos by default. If you choose not to unpack, staff may only check the outer package, so the contents and some quality issues cannot be confirmed.",
    sources: ["order"],
  },
  {
    id: "original-packing-meaning",
    category: "Packing & storage",
    question: "What does ‘Inbound With Original Packing’ mean?",
    answer:
      "It is described as a free service that retains the domestic courier’s outer box and weighs it with the goods. Keeping that box can increase both weight and dimensions, and the retained box data is used when you later submit the parcel.",
    sources: ["order"],
  },
  {
    id: "original-packing-opened",
    category: "Packing & storage",
    question: "Does choosing original packing prevent the warehouse from opening the parcel?",
    answer:
      "No. The same public description says the parcel may still be unpacked to check for prohibited contents and to perform inspection. It also says the service can be cancelled automatically if the box does not meet the service conditions.",
    sources: ["order"],
  },
  {
    id: "no-original-packing",
    category: "Packing & storage",
    question: "What happens if I do not select original packing?",
    answer:
      "The public order page says the warehouse removes the domestic courier box by default. For fragile goods, it says staff will first confirm whether that outer box should be kept.",
    sources: ["order"],
  },
  {
    id: "different-warehouses",
    category: "Packing & storage",
    question: "Can items stored in different warehouses be shipped together?",
    answer:
      "No. The public calculator says products stored in different warehouses must be sent separately. It also states that the Hong Kong warehouse receives parcels bound for overseas destinations and does not accept parcels sent to mainland China.",
    sources: ["freight"],
    featured: true,
  },
  {
    id: "public-storage-period",
    category: "Packing & storage",
    question: "What storage periods are stated on the public goods page?",
    answer:
      "The current public used-item terms state a 90-day shopping-agent preservation period in the South China warehouse and 30 days in the Hong Kong warehouse. Because deadlines can be account- and order-specific, follow the timer and notices in your live account rather than treating those figures as a permanent promise.",
    sources: ["goods"],
  },
  {
    id: "calculator-inputs",
    category: "Shipping calculator",
    question: "What information does the public shipping calculator ask for?",
    answer:
      "Destination country, item category, packed box length, width and height, sending warehouse and weight. These fields matter because route eligibility and chargeable weight can change with the destination, classification, warehouse and final package.",
    sources: ["freight"],
  },
  {
    id: "volume-weight-formula",
    category: "Shipping calculator",
    question: "What volume-weight formula does the calculator display?",
    answer:
      "With dimensions entered in centimetres, the public interface displays length × width × height × 1,000 ÷ 5,000 for volume weight in grams. That is equivalent to length × width × height ÷ 5,000 in kilograms. Always check the selected line because a route can use a different weighing rule.",
    sources: ["freight"],
    featured: true,
  },
  {
    id: "actual-or-volume-weight",
    category: "Shipping calculator",
    question: "Will I be charged by actual weight or volume weight?",
    answer:
      "It depends on the line. The public calculator says some lines use the larger of actual and volume weight, while some apply different methods at different parcel sizes. Read the delivery notice for the specific live route.",
    sources: ["freight"],
  },
  {
    id: "category-classification-final",
    category: "Shipping calculator",
    question: "Is the category I choose in the calculator the final classification?",
    answer:
      "No. AllChinaBuy explicitly labels the selected category as an estimate reference and says the warehouse’s stocked-item classification prevails when there is a difference.",
    sources: ["freight"],
  },
  {
    id: "shipping-cost-components",
    category: "Shipping calculator",
    question: "Which cost components can appear in a route breakdown?",
    answer:
      "The public calculator contains fields for first-weight cost, added-weight cost, fuel surcharge, operating fee and declaration-related charges. Not every field applies to every route, so use the current route breakdown rather than adding them universally.",
    sources: ["freight"],
  },
  {
    id: "price-and-time-guaranteed",
    category: "Shipping calculator",
    question: "Are the estimated shipping price and delivery time guaranteed?",
    answer:
      "No. The calculator says logistics companies may adjust prices with market conditions and labels transit time as a logistics-provider estimate for reference. Save the quotation date and recheck before parcel payment.",
    sources: ["freight"],
  },
  {
    id: "compare-routes",
    category: "Shipping calculator",
    question: "What should I compare besides the cheapest route?",
    answer:
      "Compare its chargeable-weight rule, mailing limits, delivery notice, estimated time, delivery method and any tax-status label shown. These are route descriptors, not a substitute for current destination customs rules or a guarantee of clearance.",
    sources: ["freight"],
  },
  {
    id: "restriction-search-final",
    category: "Restrictions & used items",
    question: "Does a mailing-restriction search result guarantee the item can ship?",
    answer:
      "No. The public goods interface says restriction results are for reference and that final eligibility is subject to warehouse quality-control results after the item is stocked.",
    sources: ["goods"],
  },
  {
    id: "dangerous-or-prohibited-item",
    category: "Restrictions & used items",
    question: "What does the public calculator say about dangerous or prohibited goods?",
    answer:
      "It says dangerous goods are not supported for delivery. If a prohibited item has already been purchased and sent to the warehouse, the public notice says it can be returned to the seller’s original address; follow the live order instructions and support guidance for the actual case.",
    sources: ["freight"],
  },
  {
    id: "route-means-legal",
    category: "Restrictions & used items",
    question: "Does an available route prove that my item is legal to import?",
    answer:
      "No. AllChinaBuy’s public text says logistics providers adjust route restrictions in real time according to customs, airline and operational requirements. An available estimate does not replace the laws, taxes or permissions that apply at your destination.",
    sources: ["goods", "freight"],
  },
  {
    id: "used-item-risks",
    category: "Restrictions & used items",
    question: "What are the main risks of buying a used item through AllChinaBuy?",
    answer:
      "The public used-item terms describe AllChinaBuy as the purchasing agent rather than the seller, warn that a seller may delay or fail to ship, and say used goods may not support return or exchange. They also limit warehouse inspection to visible appearance and do not promise checks of quality, authenticity or completeness.",
    sources: ["goods"],
  },
  {
    id: "used-item-fee-universal",
    category: "Restrictions & used items",
    question: "Is there one universal service fee or return rule for every used-item order?",
    answer:
      "Do not assume one. The current public interface contains different fee wording for different used-item and third-party flows, while item-specific return support can also differ. Read the exact notice and fee shown on the live order before accepting the risk.",
    sources: ["goods", "order"],
  },
];

export const featuredFaqs = faqs.filter((item) => item.featured);

