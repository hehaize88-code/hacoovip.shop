import { HomePage } from "./site";
import { makeMetadata } from "./seo";

import {discoveryText} from "./content";
export const metadata = makeMetadata("", "en", discoveryText.en.homeTitle, discoveryText.en.homeDescription);

export default function Page() {
  return <HomePage locale="en" />;
}
