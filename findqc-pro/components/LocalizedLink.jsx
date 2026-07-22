import { languagePath } from "../lib/routing";

export default function LocalizedLink({ href, children, ...props }) {
  const destination = typeof href === "string" && href.startsWith("/")
    ? languagePath(href)
    : href;

  return <a href={destination} {...props}>{children}</a>;
}
