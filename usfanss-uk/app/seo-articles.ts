import type { ArticleContent, ArticleLocale } from "./article-content";

type NewArticleMeta = {
  slug: string;
  label: string;
  minutes: string;
  image: string;
  published: string;
  locales: ArticleLocale[];
  titles: Partial<Record<ArticleLocale, string>> & { en: string };
};

const officialSources = [
  { label: "USFans Beginner's Guide", url: "https://www.usfans.com/beginner-guide" },
  { label: "USFans Help Center", url: "https://www.usfans.com/help" },
  { label: "USFans Shipping Fee Estimation", url: "https://www.usfans.com/estimation" },
];

export const newArticleMeta: NewArticleMeta[] = [
  {
    slug: "usfans-uk-shipping-vat-customs",
    label: "UK shipping",
    minutes: "13 min",
    image: "/products/crewneck.webp",
    published: "2026-09-07",
    locales: ["en"],
    titles: { en: "USFans UK Shipping 2026: Weight, VAT & Customs" },
  },
  {
    slug: "usfans-tracking-to-uk",
    label: "Tracking guide",
    minutes: "12 min",
    image: "/products/cap.webp",
    published: "2026-09-07",
    locales: ["en", "it"],
    titles: {
      en: "USFans Tracking UK: Warehouse to Delivery Status",
      it: "USFans tracking 2026: leggere lo stato dal magazzino alla consegna",
    },
  },
  {
    slug: "is-usfans-safe-uk-buyers",
    label: "Safety checklist",
    minutes: "12 min",
    image: "/products/sneakers.jpg",
    published: "2026-09-07",
    locales: ["en", "it"],
    titles: {
      en: "Is USFans Safe for UK Buyers? 2026 Checklist",
      it: "USFans è sicuro? Controlli pratici prima di ordinare nel 2026",
    },
  },
  {
    slug: "usfans-warehouse-before-uk-shipping",
    label: "Warehouse planning",
    minutes: "12 min",
    image: "/products/hoodie.webp",
    published: "2026-09-07",
    locales: ["en"],
    titles: { en: "USFans Warehouse UK: Storage & Consolidation Guide" },
  },
  {
    slug: "usfans-fees-uk-buyers-total-cost",
    label: "Cost planning",
    minutes: "13 min",
    image: "/products/jeans.webp",
    published: "2026-09-07",
    locales: ["en"],
    titles: { en: "USFans Fees UK: Payment, Services & Parcel Cost" },
  },
  {
    slug: "usfans-returns-before-uk-shipping",
    label: "Returns guide",
    minutes: "11 min",
    image: "/products/polo.webp",
    published: "2026-09-07",
    locales: ["en"],
    titles: { en: "USFans Returns and Refunds Before Shipping to the UK" },
  },
  {
    slug: "usfans-uk-shipping-restrictions",
    label: "Route restrictions",
    minutes: "12 min",
    image: "/products/shorts.webp",
    published: "2026-09-07",
    locales: ["en"],
    titles: { en: "USFans UK Shipping Restrictions & Sensitive Items" },
  },
];

const en: Record<string, ArticleContent> = {
  "usfans-uk-shipping-vat-customs": {
    intro: "USFans shipping to the UK is easier to plan when product cost, parcel measurements, route eligibility, VAT and customs evidence are treated as separate decisions. This independent 2026 guide explains the checks that matter before payment without promising a fixed rate, delivery date or customs outcome.",
    sections: [
      {
        h: "Begin with the UK destination, not a copied haul price",
        paragraphs: [
          "A useful UK estimate starts with the exact destination, parcel contents and current warehouse data. A price posted by another buyer may involve a different month, route, exchange rate, package shape and set of restricted goods. Even two parcels with the same scale weight can be billed differently when one occupies more space or needs different handling. Treat community examples as context, never as a current quote.",
          "Write down the recipient country, postcode area, item categories and expected packaging before comparing routes. The official USFans beginner guide says the international shipping deposit is calculated from estimated weight, selected shipping method and destination, while the final charge uses the package size and weight verified by the shipping company. That makes the packed parcel—not an early spreadsheet estimate—the decisive cost record.",
        ],
      },
      {
        h: "Separate the five parts of a landed-cost estimate",
        paragraphs: [
          "Keep product price, Chinese domestic delivery, optional services, international shipping and UK import obligations on separate lines. This prevents a cheap listing from disguising a bulky or awkward parcel. It also makes later changes understandable: a revised total can be traced to a seller delivery charge, a packaging request, a different billable weight, a route change or an import charge rather than being treated as one unexplained number.",
          "Do not publish or rely on a universal cost-per-kilogram figure. Shipping tables can use weight bands, minimum charges, size limits and destination rules. Currency conversion can move between ordering and parcel submission. Build a range before the item reaches the warehouse, replace assumptions with recorded measurements after arrival, then compare the current route quotes again after packing.",
        ],
      },
      {
        h: "Use actual weight and volumetric weight correctly",
        paragraphs: [
          "Actual weight is the figure on a scale. Volumetric weight represents the space occupied by a package and is normally derived from length, width and height under the selected carrier's current formula. A large lightweight parcel can therefore be charged on a higher billable figure than its scale weight. Shoe boxes, padded jackets and rigid gift packaging are common reasons an early estimate changes.",
          "Record both sets of information instead of choosing whichever looks cheaper. Product-page dimensions are only planning clues because the international parcel may include several items, protective material and outer packaging. If repacking or box removal is requested, wait for the updated parcel measurements before making the final route comparison. An old screenshot should not override the latest warehouse record.",
        ],
      },
      {
        h: "Check whether every item is eligible for the same route",
        paragraphs: [
          "A product that can be purchased is not automatically accepted by every international shipping line. Batteries, liquids, powders, cosmetics, magnets and other sensitive contents can narrow the available choices. Size, weight, declared information and destination can add further limits. Review the routes actually offered for the assembled parcel rather than assuming that a broadly advertised line will accept every combination.",
          "When one item removes otherwise suitable UK routes, compare a sensible split with one consolidated parcel. A split may restore options but can repeat base charges, packaging and tracking. It also creates two separate customs and delivery records. The correct choice is the one supported by current measurements and eligibility, not an automatic rule that larger or smaller parcels are always better.",
        ],
      },
      {
        h: "Treat VAT and customs as evidence questions",
        paragraphs: [
          "The USFans Help Center includes guidance on VAT reform in the UK and EU and on customs declarations and duties, but the practical result still depends on the parcel, route and rules in force when it is submitted. Do not copy a declaration value from another user or describe a route as tax-free unless the current official route terms explicitly support that wording for the exact destination and contents.",
          "Keep the commercial description, quantity, product value and supporting order records consistent. Review the route's current declaration instructions and any displayed tax handling before payment. Customs decisions are made by authorities, not by an independent spreadsheet site, and no article can guarantee release. Honest preparation means accurate records, current route instructions and enough budget for outcomes that are not under the agent's control.",
        ],
      },
      {
        h: "Choose packaging by risk as well as volume",
        paragraphs: [
          "Removing unnecessary retail packaging can reduce volume, but it may also remove protection or identifying information. Reinforcement, corner protection and added padding can protect fragile contents while increasing dimensions. Decide item by item. A soft garment and a crush-sensitive collectible do not need the same treatment, and automatically selecting every option can be as unhelpful as removing every box.",
          "USFans describes package removal, reinforcement and insurance among the additional services that may be requested at parcel submission. Availability and terms should be checked in the live account. Write a precise remark, save it and inspect the resulting package record. If measurements change after the service, rerun the route comparison before paying the final amount.",
        ],
      },
      {
        h: "Read delivery estimates as ranges, not promises",
        paragraphs: [
          "A route estimate describes a typical or projected transit window, not a guaranteed arrival date. Export processing, flights, customs, local carrier handover, weather and peak demand can all affect timing. The official beginner guide explicitly notes risks including delays, confiscation, taxes, damage and missing parcels once third-party logistics companies and customs are involved.",
          "Compare tracking coverage, restrictions, compensation or insurance terms, size limits and current estimated transit—not only the cheapest headline. If an order is date-sensitive, leave margin before the event and avoid building a promise around the fastest historical example. Save the route information visible on the day of payment so later status updates have a clear baseline.",
        ],
      },
      {
        h: "Run a final UK parcel audit before payment",
        paragraphs: [
          "Confirm the recipient name, UK address format, postcode, contact details, contents, quantities, packaging request, declared information, scale weight, dimensions and billable weight. Check that no sensitive item has been mixed into an incompatible route. Compare the deposit with the latest parcel record and keep a dated copy of the route conditions that affected the decision.",
          "After dispatch, use the parcel record and tracking information rather than repeatedly recalculating the pre-shipment estimate. The strongest UK shipping workflow is a documented chain: verified items, reviewed QC evidence, measured parcel, eligible route, accurate submission and saved tracking. It cannot remove customs or carrier uncertainty, but it makes the decisions you control far easier to verify.",
        ],
      },
      {
        h: "Keep the estimate useful after the parcel arrives",
        paragraphs: [
          "After delivery, replace every estimated line with the confirmed result: final shipping charge, any account adjustment, customs or carrier payment, delivery date and condition received. Keep the original estimate beside it rather than overwriting it. The difference shows whether weight, volume, packaging, exchange movement, route choice or destination handling caused the biggest change.",
          "Use that record as a planning reference for a similar future parcel, not as a guaranteed UK price. Remove one-off services, update the product mix and obtain a fresh route estimate. Check the postcode and parcel dimensions again even when the products appear similar. A dated comparison improves future decisions because it preserves the method while acknowledging that carrier prices, acceptance rules, VAT handling and customs outcomes can change.",
        ],
      },
    ],
    sources: officialSources,
  },

  "usfans-tracking-to-uk": {
    intro: "USFans tracking becomes much clearer when order status, warehouse status and international parcel tracking are kept separate. This 2026 guide maps the journey from seller purchase to delivery and explains when a status is normal, when evidence is missing and when a focused support request is useful.",
    sections: [
      {
        h: "Identify which journey you are tracking",
        paragraphs: [
          "A product order and an international parcel are related but different records. Before warehouse arrival, the important movement is from the marketplace seller to the Chinese warehouse. After you select stored items, choose a route and pay the international shipping deposit, a parcel record is created for consolidation, packing and dispatch. Looking at the wrong record is a common reason a shipment appears to be stuck.",
          "Save the product order number, seller delivery reference when shown, warehouse receipt date, parcel number and international tracking number separately. Use the order page for purchase and domestic-delivery questions, the Warehouse area for received items and QC evidence, and the Parcels area for outbound shipping. A clean timeline makes a precise enquiry possible without mixing several stages into one vague complaint.",
        ],
      },
      {
        h: "Read purchase and seller-dispatch status first",
        paragraphs: [
          "After payment, the shopping agent contacts the seller and buys the selected item. A paid order does not mean the seller has already dispatched it. Variant confirmation, seller response and domestic shipping can take place before a carrier scan appears. Check whether the order needs additional information or whether an enquiry message has been posted in the account.",
          "The USFans beginner guide says agents may contact users by email or message when information is required and that users can use order enquiry during purchasing. If the expected product, color, size or quantity is unclear, answer that question before chasing international tracking. There cannot be an outbound parcel scan for an item that has not yet completed the domestic and warehouse stages.",
        ],
      },
      {
        h: "Treat warehouse arrival as a verification checkpoint",
        paragraphs: [
          "When the item reaches the warehouse, the status should be read together with the visible receipt information and inspection photos. Confirm that the correct variant and quantity arrived. Compare the images with the saved listing record and note any missing view or visible problem while after-sales options may still be available. Warehouse arrival is not simply a waiting milestone; it is the main evidence checkpoint before international shipment.",
          "Do not assume that every image or measurement will appear instantly or that every order receives identical views. Use the current account record as the source of truth. If one decisive detail is absent, request the narrowest useful clarification: a size-label view, a flat measurement or confirmation of an included part. Keep the reply with the order rather than relying on memory.",
        ],
      },
      {
        h: "Understand parcel submission and packing statuses",
        paragraphs: [
          "Selecting warehouse items and submitting them for delivery starts a new phase. Address details, route choice, packaging services and a shipping deposit must be reviewed before the parcel can be prepared. A submitted or packing status may therefore exist before an international carrier number becomes active. The package still has to be consolidated, reinforced when requested, measured and handed over.",
          "The official guide states that the final shipping fee is based on package size and weight verified by the shipping company and that a difference from the deposit is returned to the USFans account after shipment. If the parcel is being repacked or remeasured, the record can change before dispatch. Save the final figures and do not interpret that controlled warehouse work as carrier delay.",
        ],
      },
      {
        h: "Know when an international tracking number becomes useful",
        paragraphs: [
          "International tracking matters after the parcel is sent out. The official workflow directs users to User Center and then Parcels to follow shipping progress. A number created electronically may not show movement until the logistics provider receives or processes the package. The first meaningful scan can therefore follow label creation rather than appear at th