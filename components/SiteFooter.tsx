import Link from "next/link";
import { siteConfig } from "@/lib/site";
import { guides, guideUrl } from "@/lib/guides";

/** Sitewide footer: pillar + guide links (internal-link mesh) + entity info. */
export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <p className="brand">{siteConfig.name}</p>
          <p className="muted">{siteConfig.tagline}</p>
        </div>
        <nav aria-label="Product">
          <p className="footer-head">Product</p>
          <Link href="/resume-builder">AI resume builder</Link>
          <Link href="/tailor-resume-to-job-description">Tailor to a job description</Link>
          <Link href="/resume-templates">Resume templates</Link>
          <Link href="/resume-examples">Resume examples</Link>
          <Link href="/pricing">Pricing</Link>
        </nav>
        <nav aria-label="Guides">
          <p className="footer-head">Guides</p>
          {guides.map((g) => (
            <Link key={g.slug} href={guideUrl(g.slug)}>
              {g.title}
            </Link>
          ))}
        </nav>
        <nav aria-label="Company">
          <p className="footer-head">Company</p>
          <Link href="/about">About</Link>
          <Link href="/in">ResumeCraft for India</Link>
          <p className="footer-head" style={{ marginTop: "0.8rem" }}>
            Compare
          </p>
          <Link href="/compare/zety-alternative">vs Zety</Link>
          <Link href="/compare/jobscan-alternative">vs Jobscan</Link>
          <Link href="/compare/rezi-alternative">vs Rezi</Link>
          <p className="footer-head" style={{ marginTop: "0.8rem" }}>
            Legal
          </p>
          <Link href="/privacy">Privacy Policy</Link>
          <Link href="/terms">Terms of Service</Link>
        </nav>
      </div>
      <div className="container footer-legal muted">
        © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
      </div>
    </footer>
  );
}
