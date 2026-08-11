import {notFound} from "next/navigation";
import {products} from "../../../catalog";
import {locales,ProductPage,type Locale} from "../../../site";
import {makeMetadata} from "../../../seo";

export async function generateMetadata({params}:{params:Promise<{lang:string;slug:string}>}){const {lang,slug}=await params;const product=products.find(p=>p.slug===slug);if(!locales.includes(lang as Locale)||!product)return {};return makeMetadata(`products/${slug}`,lang as Locale,`${product.name} | Superbuy Spreadsheet`,`${product.name}: dated CNY source price, category, QC reminder and matching partner catalog link.`)}
export default async function Page({params}:{params:Promise<{lang:string;slug:string}>}){const {lang,slug}=await params;const product=products.find(p=>p.slug===slug);if(!locales.includes(lang as Locale)||!product)notFound();return <ProductPage locale={lang as Locale} product={product}/>}
