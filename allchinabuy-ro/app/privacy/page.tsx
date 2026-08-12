import { TrustPage, trustMetadata } from "../trust-pages";
export const metadata = trustMetadata("privacy");
export default function Page() {
  return <TrustPage slug="privacy" />;
}
