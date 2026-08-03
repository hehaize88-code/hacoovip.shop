export type FindRecord = {
  id: string;
  slug: string;
  name: string;
  category: "Shoes" | "Hoodies" | "Bags" | "Jerseys" | "Watches";
  priceUsd: string;
  image: string;
  destination: string;
  lastChecked: string;
};

const checked = "August 3, 2026";

export const finds: FindRecord[] = [
  { id: "6059", slug: "find-6059", name: "Shoes 1 — Record 6059", category: "Shoes", priceUsd: "$55.42", image: "/finds/6059.gif", destination: "https://www.cnfanshp.com/AllProducts/6059.html", lastChecked: checked },
  { id: "6057", slug: "find-6057", name: "Shoes 1 — Record 6057", category: "Shoes", priceUsd: "$47.92", image: "/finds/6057.webp", destination: "https://www.cnfanshp.com/AllProducts/6057.html", lastChecked: checked },
  { id: "6049", slug: "find-6049", name: "Shoes 64", category: "Shoes", priceUsd: "$35.97", image: "/finds/6049.webp", destination: "https://www.cnfanshp.com/AllProducts/6049.html", lastChecked: checked },
  { id: "6048", slug: "find-6048", name: "Shoes 63", category: "Shoes", priceUsd: "$44.44", image: "/finds/6048.webp", destination: "https://www.cnfanshp.com/AllProducts/6048.html", lastChecked: checked },
  { id: "6047", slug: "find-6047", name: "Shoes 62", category: "Shoes", priceUsd: "$55.28", image: "/finds/6047.webp", destination: "https://www.cnfanshp.com/AllProducts/6047.html", lastChecked: checked },
  { id: "6046", slug: "find-6046", name: "Shoes 61", category: "Shoes", priceUsd: "$24.86", image: "/finds/6046.webp", destination: "https://www.cnfanshp.com/AllProducts/6046.html", lastChecked: checked },
  { id: "5756", slug: "find-5756", name: "Corteiz Hoodie Sets", category: "Hoodies", priceUsd: "$22.08", image: "/finds/5756.webp", destination: "https://www.cnfanshp.com/AllProducts/5756.html", lastChecked: checked },
  { id: "5743", slug: "find-5743", name: "Louis Vuitton Hoodie", category: "Hoodies", priceUsd: "$17.78", image: "/finds/5743.webp", destination: "https://www.cnfanshp.com/AllProducts/5743.html", lastChecked: checked },
  { id: "5742", slug: "find-5742", name: "Palm Angel Hoodie", category: "Hoodies", priceUsd: "$27.64", image: "/finds/5742.webp", destination: "https://www.cnfanshp.com/AllProducts/5742.html", lastChecked: checked },
  { id: "5708", slug: "find-5708", name: "Mixed Emotion Hoodie", category: "Hoodies", priceUsd: "$17.78", image: "/finds/5708.webp", destination: "https://www.cnfanshp.com/AllProducts/5708.html", lastChecked: checked },
  { id: "5706", slug: "find-5706", name: "Balenciaga Hoodie", category: "Hoodies", priceUsd: "$17.78", image: "/finds/5706.webp", destination: "https://www.cnfanshp.com/AllProducts/5706.html", lastChecked: checked },
  { id: "5663", slug: "find-5663", name: "Derschutze Hoodie", category: "Hoodies", priceUsd: "$16.39", image: "/finds/5663.webp", destination: "https://www.cnfanshp.com/AllProducts/5663.html", lastChecked: checked },
  { id: "5964", slug: "find-5964", name: "Bottega Veneta Woven Bag", category: "Bags", priceUsd: "$41.39", image: "/finds/5964.webp", destination: "https://www.cnfanshp.com/AllProducts/5964.html", lastChecked: checked },
  { id: "5962", slug: "find-5962", name: "Loro Piana Vintage Leather Bag", category: "Bags", priceUsd: "$41.94", image: "/finds/5962.webp", destination: "https://www.cnfanshp.com/AllProducts/5962.html", lastChecked: checked },
  { id: "5961", slug: "find-5961", name: "Bottega Veneta Woven Chain Bag", category: "Bags", priceUsd: "$34.58", image: "/finds/5961.webp", destination: "https://www.cnfanshp.com/AllProducts/5961.html", lastChecked: checked },
  { id: "5923", slug: "find-5923", name: "Louis Vuitton Cherry Bag", category: "Bags", priceUsd: "$30.56", image: "/finds/5923.webp", destination: "https://www.cnfanshp.com/AllProducts/5923.html", lastChecked: checked },
  { id: "5913", slug: "find-5913", name: "Fred Perry Bag", category: "Bags", priceUsd: "$18.47", image: "/finds/5913.webp", destination: "https://www.cnfanshp.com/AllProducts/5913.html", lastChecked: checked },
  { id: "5883", slug: "find-5883", name: "Miu Miu Mini Leather Bowling Bag", category: "Bags", priceUsd: "$37.50", image: "/finds/5883.webp", destination: "https://www.cnfanshp.com/AllProducts/5883.html", lastChecked: checked },
  { id: "5850", slug: "find-5850", name: "NBA City Edition Jerseys — Record 5850", category: "Jerseys", priceUsd: "$12.22", image: "/finds/5850.webp", destination: "https://www.cnfanshp.com/AllProducts/5850.html", lastChecked: checked },
  { id: "5846", slug: "find-5846", name: "NBA City Edition Jerseys — Record 5846", category: "Jerseys", priceUsd: "$12.22", image: "/finds/5846.webp", destination: "https://www.cnfanshp.com/AllProducts/5846.html", lastChecked: checked },
  { id: "5613", slug: "find-5613", name: "2024–25 Soccer Jerseys 41–80", category: "Jerseys", priceUsd: "$13.75", image: "/finds/5613.webp", destination: "https://www.cnfanshp.com/AllProducts/5613.html", lastChecked: checked },
  { id: "5583", slug: "find-5583", name: "Serie A Jersey Set", category: "Jerseys", priceUsd: "$13.75", image: "/finds/5583.webp", destination: "https://www.cnfanshp.com/AllProducts/5583.html", lastChecked: checked },
  { id: "5560", slug: "find-5560", name: "Chrome Hearts Jersey", category: "Jerseys", priceUsd: "$21.94", image: "/finds/5560.webp", destination: "https://www.cnfanshp.com/AllProducts/5560.html", lastChecked: checked },
  { id: "5349", slug: "find-5349", name: "Japanese Jersey", category: "Jerseys", priceUsd: "$13.75", image: "/finds/5349.webp", destination: "https://www.cnfanshp.com/AllProducts/5349.html", lastChecked: checked },
  { id: "5952", slug: "find-5952", name: "Longines Watches — 39 Styles", category: "Watches", priceUsd: "$72.22", image: "/finds/5952.webp", destination: "https://www.cnfanshp.com/AllProducts/5952.html", lastChecked: checked },
  { id: "5821", slug: "find-5821", name: "Apple Watch S9", category: "Watches", priceUsd: "$23.61", image: "/finds/5821.webp", destination: "https://www.cnfanshp.com/AllProducts/5821.html", lastChecked: checked },
  { id: "5819", slug: "find-5819", name: "Cartier Mechanical Watches", category: "Watches", priceUsd: "$372.22", image: "/finds/5819.webp", destination: "https://www.cnfanshp.com/AllProducts/5819.html", lastChecked: checked },
  { id: "5753", slug: "find-5753", name: "Cartier and Rolex Watch Record", category: "Watches", priceUsd: "$49.72", image: "/finds/5753.webp", destination: "https://www.cnfanshp.com/AllProducts/5753.html", lastChecked: checked },
  { id: "5752", slug: "find-5752", name: "Armani Watch", category: "Watches", priceUsd: "$25.42", image: "/finds/5752.gif", destination: "https://www.cnfanshp.com/AllProducts/5752.html", lastChecked: checked },
  { id: "5693", slug: "find-5693", name: "Watch Ultra 2", category: "Watches", priceUsd: "$45.00", image: "/finds/5693.webp", destination: "https://www.cnfanshp.com/AllProducts/5693.html", lastChecked: checked },
];

export const findRoutes = finds.map((item) => item.slug);
