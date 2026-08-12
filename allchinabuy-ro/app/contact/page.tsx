import { TrustPage, trustMetadata } from "../trust-pages";
export const metadata = trustMetadata("contact");
export default function Page() {
  return <TrustPage slug="contact" />;
}
