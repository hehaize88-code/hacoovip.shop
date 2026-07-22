import { languagePath } from "../lib/routing";

export const dynamic = "force-static";

export default function manifest() {
  return { name: "FindQC Pro", short_name: "FindQC", description: "Product finder and QC education guides", start_url: languagePath("/"), display: "standalone", background_color: "#f3f0e8", theme_color: "#111914", icons: [{ src: "/findqc-logo.png", sizes: "128x128", type: "image/png" }] };
}
