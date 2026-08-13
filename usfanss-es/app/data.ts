export const products = [
  { id:"3359", name:"HOKA One One Speedgoat 5 Trail Running Shoes", image:"/product-images/product-3359.webp", price:"$218", verified:"13 Aug 2026", category:"shoes", tone:"peach" },
  { id:"3368", name:"Corteiz C Star Sweater [15 styles]", image:"/product-images/product-3368.webp", price:"$363.48", verified:"13 Aug 2026", category:"hoodies", tone:"mint" },
  { id:"3352", name:"Off-White Tee", image:"/product-images/product-3352.webp", price:"$112", verified:"13 Aug 2026", category:"tshirts", tone:"lilac" },
  { id:"3092", name:"THE NORTH FACE x KAWS 1996 Nuptse Down Jacket", image:"/product-images/product-3092.jpg", price:"$380", verified:"13 Aug 2026", category:"jackets", tone:"sky" },
  { id:"2899", name:"NBA Chicago Bulls Sports Jersey (9 styles)", image:"/product-images/product-2899.jpg", price:"$99", verified:"13 Aug 2026", category:"jerseys", tone:"sand" },
  { id:"3389", name:"Adidas Bag", image:"/product-images/product-3389.webp", price:"$179", verified:"13 Aug 2026", category:"bags", tone:"rose" },
];

export const catalogBase = "https://www.cnbuycha.com";
export const productUrl = (id: string) => `${catalogBase}/AllProducts/${id}.html`;

export const categorySlugs = ["shoes", "hoodies-sweaters", "t-shirts", "jackets", "jersey", "accessories"];
export const articleSlugs = ["usfans-index-guide", "qc-photos-guide", "shipping-cost-guide"];
