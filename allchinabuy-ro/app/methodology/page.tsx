import { TrustPage, trustMetadata } from "../trust-pages";
export const metadata = trustMetadata("methodology");
export default function Page() {
  return <TrustPage slug="methodology" />;
}
