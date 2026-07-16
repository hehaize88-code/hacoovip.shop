import StructuredData from "./StructuredData";
import { createBreadcrumbList } from "@/app/schema";

export default function BreadcrumbData(props) {
  return <StructuredData data={{ "@context": "https://schema.org", ...createBreadcrumbList(props) }}/>;
}
