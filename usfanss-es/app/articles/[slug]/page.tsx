"use client";
import { use } from "react";
import { ArticlePage } from "../../components/IndependentPages";
export default function Page({params}:{params:Promise<{slug:string}>}){const {slug}=use(params);return <ArticlePage slug={slug}/>}
