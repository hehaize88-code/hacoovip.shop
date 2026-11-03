import {SectionPage} from "../site";
import {discoveryText, sectionTitles} from "../content";
import {makeMetadata} from "../seo";

export const metadata = makeMetadata("articles", "en", sectionTitles.en.articles, discoveryText.en.hubDescription);
export default function Page(){return <SectionPage locale="en" section="articles"/>}
