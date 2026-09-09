import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticleContent } from "../article-content";
import { getPriorityArticle, priorityArticles } from "../priority-article-data";

export function generateStaticParams(){return priorityArticles.map(article=>({slug:article.slug}));}

export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{
  const {slug}=await params;
  const article=getPriorityArticle(slug);
  if(!article) return {};
  return {
    title:article.title,
    description:article.description,
    alternates:{canonical:`/articles/${article.slug}/`},
    openGraph:{title:article.title,description:article.description,type:"article",url:`/articles/${article.slug}/`,images:["/og.png"]},
    twitter:{card:"summary_large_image",title:article.title,description:article.description,images:["/og.png"]}
  };
}

export default async function PriorityArticlePage({params}:{params:Promise<{slug:string}>}){
  const {slug}=await params;
  const article=getPriorityArticle(slug);
  if(!article) notFound();
  return <ArticleContent {...article} published="2026-09-09" updated="2026-09-09"/>;
}
