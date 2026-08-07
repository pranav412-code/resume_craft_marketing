import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/lib/site";

/** Sitewide footer: Product / Free tools / Resources / Company+Legal. */
export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <Link href="/" className="brand">
            <Image
              src="/logo.png"
              alt={`${siteConfig.name} logo`}
              width={32}
              height={28}
              className="brand-logo"
            />
            <span>{siteConfig.name}</span>
          </Link>
          <p className="muted">{siteConfig.tagline}</p>
        </div>
        <nav aria-label="Product">
          <p className="footer-head">Product</p>
          <Link href="/tailor-resume-to-job-description">Tailor to JD</Link>
          <Link href="/resume-optimization">ATS optimizer</Link>
          <Link href="/resume-builder">Resume builder</Link>
          <Link href="/pricing">Pricing</Link>
          <Link href="/latex-resume-builder">LaTeX export</Link>
        </nav>
        <nav aria-label="Free tools">
          <p className="footer-head">Free tools</p>
          <Link href="/ats-checker">ATS score checker (no signup)</Link>
          <Link href="/tools/jd-match-checker">JD match with resume</Link>
        </nav>
        <nav aria-label="Resources">
          <p className="footer-head">Resources</p>
          <Link href="/resume-examples">Examples</Link>
          <Link href="/guides">Guides</Link>
          <Link href="/how-ats-score-works">How ATS score works</Link>
          <Link href="/reports/ats-resume-insights-2026">ATS insights 2026</Link>
          <Link href="/in">India</Link>
          <Link href="/best-ai-resume-builder-2026">How to choose (2026)</Link>
        </nav>
        <nav aria-label="Company">
          <p className="footer-head">Company</p>
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
          <Link href="/feedback">Feedback</Link>
          <p className="footer-head" style={{ marginTop: "0.8rem" }}>
            Legal
          </p>
          <Link href="/privacy">Privacy</Link>
          <Link href="/terms">Terms</Link>
        </nav>
      </div>
      <div className="container footer-legal muted">
        © 2026 {siteConfig.name}. All rights reserved.
      </div>
    </footer>
  );
}
