import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/lib/site";
import { CTA } from "@/components/CTA";

/** Sitewide header: brand + pillar nav + persistent CTA. Server component. */
export function SiteHeader({ page }: { page: string }) {
  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link href="/" className="brand" style={{ display: "inline-flex", alignItems: "center", gap: "0.625rem" }}>
          <Image
            src="/logo.png"
            alt={`${siteConfig.name} logo`}
            width={96}
            height={52}
            priority
            style={{ width: "auto", height: "44px", objectFit: "contain", display: "block" }}
          />
          <span>{siteConfig.name}</span>
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
