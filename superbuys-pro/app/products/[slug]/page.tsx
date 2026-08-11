import {notFound} from "next/navigation";
import {products} from "../../catalog";
import {ProductPage} from "../../site";
import {makeMetadata} from "../../seo";

export async function generateMetadata({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const product=products.find(p=>p.slug===slug);if(!product)return {};return makeMetadata(`products/${slug}`,"en",`${product.name} | Superbuy Spreadsheet Find`,`${product.name}: source price ¥${product.priceCny} CNY, category, QC reminder and the matching partner catalog link. Price checked 11 August 2026.`)}
export default async function Page({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const product=products.find(p=>p.slug===slug);if(!product)notFound();return <ProductPage locale="en" product={product}/>}
