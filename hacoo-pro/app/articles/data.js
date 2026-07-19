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
];

export function getArticle(slug) {
  return articles.find((article) => article.slug === slug);
}
