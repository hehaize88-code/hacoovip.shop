import { TrustPage, trustMetadata } from "../trust-pages";
export const metadata = trustMetadata("about");
export default function Page() {
  return <TrustPage slug="about" />;
}
