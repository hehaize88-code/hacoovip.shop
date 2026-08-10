export const articles = [
  {
    slug: "acbuy-warehouse-storage-parcel-consolidation",
    title: "ACbuy Warehouse Storage and Parcel Consolidation: A Pre-Shipping Checklist",
    description: "Understand ACbuy QC photos, its published storage window, parcel consolidation and the shipping deposit before submitting a warehouse parcel.",
    excerpt: "A fact-checked walkthrough of the decisions between warehouse arrival and international dispatch, including the QC-photo wording that differs across ACbuy pages.",
    published: "2026-07-19",
    modified: "2026-07-19",
    checkedLabel: "July 19, 2026",
    read: "10 min",
    image: {
      path: "/articles/acbuy-warehouse-consolidation-checklist.webp",
      width: 1200,
      height: 630,
      alt: "ACbuy warehouse checklist from QC review through storage, consolidation and parcel submission",
      caption: "An original Hacoo Pro decision map for the warehouse-to-parcel stage.",
    },
  },
  {
    slug: "hacoo-order-missing-item-split-shipment",
    title: "Hacoo Order Missing an Item: Split-Shipment Checklist",
    description: "Learn how to tell a Hacoo split shipment from a missing item, match tracking numbers to order lines, save evidence and choose the right support path.",
    excerpt: "A status-led method for reconciling order lines, tracking references and received contents before reporting an item as missing.",
    published: "2026-08-08",
    modified: "2026-08-08",
    checkedLabel: "August 8, 2026",
    read: "9 min",
    image: {
      path: "/articles/hacoo-partial-order-decision-map.svg",
      width: 1200,
      height: 630,
      alt: "Three-step Hacoo partial-order check for order lines, tracking groups and received items",
      caption: "An original Hacoo Pro decision map for distinguishing a split shipment from a missing item.",
    },
  },
  {
    slug: "hacoo-preorder-backorder-support",
    title: "Hacoo Preorder and Backorder Support Guide",
    description: "Use Hacoo preorder and backorder status evidence to track unshipped items, understand possible split fulfilment and send a precise support request.",
    excerpt: "A proactive workflow for recording preorder or backorder status, separating preparation from delivery, and asking support one answerable question.",
    published: "2026-08-11",
    modified: "2026-08-11",
    checkedLabel: "August 11, 2026",
    read: "9 min",
    image: {
      path: "/articles/hacoo-preorder-status-map.svg",
      width: 1200,
      height: 630,
      alt: "Hacoo preorder support map for item status, shipment assignment and evidence collection",
      caption: "An original Hacoo Pro status map for following a preorder or backorder before fulfilment.",
    },
  },
];

export function getArticle(slug) {
  return articles.find((article) => article.slug === slug);
}
