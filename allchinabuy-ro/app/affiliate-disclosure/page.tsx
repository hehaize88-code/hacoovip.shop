import { TrustPage, trustMetadata } from "../trust-pages";
export const metadata = trustMetadata("affiliate-disclosure");
export default function Page() {
  return <TrustPage slug="affiliate-disclosure" />;
}
