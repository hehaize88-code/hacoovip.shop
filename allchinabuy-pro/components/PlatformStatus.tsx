import Link from "next/link";

export function PlatformStatus() {
  return (
    <aside className="platform-status" aria-label="Platform status checked October 5, 2026">
      <strong>Platform update · October 5, 2026</strong>
      <p>AllChinaBuy’s official homepage displays a maintenance notice. Current ordering and account services need separate verification. <Link href="/guides/allchinabuy-website-status-maintenance/">Read the confirmed notice and next steps</Link>.</p>
    </aside>
  );
}
