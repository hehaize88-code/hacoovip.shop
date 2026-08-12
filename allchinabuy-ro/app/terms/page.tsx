import { TrustPage, trustMetadata } from "../trust-pages";
export const metadata = trustMetadata("terms");
export default function Page() {
  return <TrustPage slug="terms" />;
}
