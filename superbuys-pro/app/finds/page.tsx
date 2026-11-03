import {SectionPage} from "../site";
import {discoveryText} from "../content";
import {makeMetadata} from "../seo";

export const metadata = makeMetadata("finds", "en", discoveryText.en.findsTitle, discoveryText.en.findsDescription);
export default function Page(){return <SectionPage locale="en" section="finds"/>}
