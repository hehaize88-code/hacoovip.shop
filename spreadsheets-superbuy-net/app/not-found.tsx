import Link from "next/link";

export default function NotFound() {
  return <main className="not-found"><span>404</span><h1>This page is not in the spreadsheet.</h1><p>The URL may have changed or the page may not exist.</p><Link href="/">Return home →</Link></main>;
}
