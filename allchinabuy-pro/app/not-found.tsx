import Link from "next/link";

export default function NotFound() {
  return (
    <main id="main-content" className="not-found">
      <div>
        <p className="eyebrow">Route not found</p>
        <h1>404</h1>
        <p>The page may have moved, or the address may be incomplete. Return to the independent finds index.</p>
        <Link className="button button--lime" href="/finds">Browse finds <span aria-hidden="true">→</span></Link>
      </div>
    </main>
  );
}
