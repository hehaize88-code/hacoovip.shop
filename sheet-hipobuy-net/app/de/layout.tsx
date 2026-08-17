import type { Metadata } from "next";
export const metadata: Metadata = { openGraph: { locale: "de_DE" } };
export default function GermanLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <div lang="de">{children}</div>;
}
