import Link from "next/link";
import { siteConfig } from "@/lib/site";
import { CTA } from "@/components/CTA";

/** Sitewide header: brand + pillar nav + persistent CTA. Server component. */
export function SiteHeader({ page }: { page: string }) {
  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link href="/" className="brand">
          {siteConfig.name}
        </Link>
        <nav className="main-nav" aria-label="Main">
          <Link href="/resume-templates">Templates</Link>
          <Link href="/resume-examples">Examples</Link>
          <Link href="/guides">Guides</Link>
          <Link href="/pricing">Pricing</Link>
        </nav>
        <CTA page={page} label="Start free" />
      </div>
    </header>
  );
}
