import type { Lang } from "./i18n";

export const products = [
  { id:"3359", name:"Amiri B22 Jersey/Shorts Set [6 styles]", image:"https://www.cnfanshp.com/uploads/allimg/20260106/1-26010612345E64.webp", price:"$14.46 USD", verified:"2026-10-07", category:"jerseys", tone:"peach" },
  { id:"3368", name:"Cole Buxton T-Shirts [32 styles]", image:"https://www.cnfanshp.com/uploads/allimg/20260106/1-260106125320143.webp", price:"$13.64 USD", verified:"2026-10-07", category:"tshirts", tone:"mint" },
  { id:"3352", name:"Christian Dior Book Tote Bag [4 styles]", image:"https://www.cnfanshp.com/uploads/allimg/20260106/1-260106122109303.webp", price:"$41.32 USD", verified:"2026-10-07", category:"bags", tone:"lilac" },
  { id:"3092", name:"Adidas Original Samba OG shoes", image:"https://www.cnfanshp.com/uploads/allimg/20251227/1-25122G03343222.webp", price:"$27.41 USD", verified:"2026-10-07", category:"shoes", tone:"sky" },
  { id:"2899", name:"Essentials Pants", image:"https://www.cnfanshp.com/uploads/allimg/20251224/1-251224141455211.webp", price:"$17.91 USD", verified:"2026-10-07", category:"pants", tone:"sand" },
  { id:"3389", name:"Prada Cloudbust Thunder Sneakers [11 styles]", image:"https://www.cnfanshp.com/uploads/allimg/20260106/1-2601061332151Q.webp", price:"$79.89 USD", verified:"2026-10-07", category:"shoes", tone:"rose" },
];
const categoryIndexes: Record<string,number> = {shoes:0, hoodies:1, tshirts:2, jackets:3, jerseys:4, bags:5};
const pants: Record<Lang,string> = {es:"Pantalones",en:"Pants",fr:"Pantalons",de:"Hosen",it:"Pantaloni",pl:"Spodnie",pt:"Calças",zh:"裤子"};
export const productCategory = (category: string, lang: Lang, names: string[]) => category === "pants" ? pants[lang] : names[categoryIndexes[category]];

export const catalogBase = "https://www.cnfanshp.com";
export const productUrl = (id: string) => `${catalogBase}/AllProducts/${id}.html`;

export const categorySlugs = ["shoes", "hoodies-sweaters", "t-shirts", "jackets", "Jersey", "accessories"];
export { coreArticleSlugs, growthArticleSlugs, articleSlugs } from "./articleRoutes";
