import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/lib/site";
import { CTA } from "@/components/marketing/CTA";

/**
 * Sitewide header: brand + pillar nav + persistent CTA.
 * Mobile menu is CSS-only (checkbox) — no client component boundary.
 */
export function SiteHeader({ page }: { page: string }) {
  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link href="/" className="brand">
          <Image
            src="/logo.png"
            alt={`${siteConfig.name} logo`}
            width={32}
            height={28}
            priority
            className="brand-logo"
          />
          <span>{siteConfig.name}</span>
        </Link>

        <div className="header-bar-end">
          <CTA page={page} label="Start free" variant="primary" />
          <input
            type="checkbox"
            id="site-nav-toggle"
            className="nav-toggle-input"
            aria-controls="header-nav-panel"
          />
          <label htmlFor="site-nav-toggle" className="nav-toggle" aria-label="Menu">
            <span className="nav-toggle-bar" aria-hidden="true" />
            <span className="nav-toggle-bar" aria-hidden="true" />
            <span className="nav-toggle-bar" aria-hidden="true" />
          </label>
        </div>

        <div id="header-nav-panel" className="header-nav-panel">
          <nav className="main-nav" aria-label="Main">
            <Link href="/ats-checker">Free ATS Check</Link>
            <Link href="/tools/jd-match-checker">JD Match</Link>
            <Link href="/resume-examples">Examples</Link>
            <Link href="/guides">Guides</Link>
            <Link href="/pricing">Pricing</Link>
          </nav>
          <div className="header-actions">
            <CTA page={page} label="Start free" />
          </div>
        </div>
      </div>
    </header>
  );
}
