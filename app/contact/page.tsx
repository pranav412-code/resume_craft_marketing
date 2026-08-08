import type { Metadata } from "next";
import Link from "next/link";
import { createMetadata, absoluteUrl } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/seo/schema";
import { siteConfig } from "@/lib/site";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { NetlifyForm } from "@/components/forms/NetlifyForm";
import { CTA } from "@/components/marketing/CTA";

const PAGE = "/contact";

export const metadata: Metadata = createMetadata({
  title: "Contact",
  description: `Contact ${siteConfig.name} for product questions, billing, partnerships, privacy requests, or ATS optimizer support.`,
  path: PAGE,
});

export default function ContactPage() {
  return (
    <>
      <SiteHeader page={PAGE} />
      <main>
        <JsonLd
          data={breadcrumbSchema([
            { name: "Home", url: absoluteUrl("/") },
            { name: "Contact", url: absoluteUrl(PAGE) },
          ])}
        />
        <article className="prose container">
          <nav className="crumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link> / Contact
          </nav>
          <h1>Contact</h1>
          <p className="lede">
            Questions about the AI ATS resume optimizer, billing, partnerships,
            or privacy — drop a note. We read every message.
          </p>

          <NetlifyForm name="contact" submitLabel="Send message">
            <label>
              Name
              <input
                type="text"
                name="name"
                required
                autoComplete="name"
                style={{ display: "block", width: "100%", padding: "0.5rem" }}
              />
            </label>
            <label>
              Email
              <input
                type="email"
                name="email"
                required
                autoComplete="email"
                style={{ display: "block", width: "100%", padding: "0.5rem" }}
              />
            </label>
            <label>
              Subject
              <input
                type="text"
                name="subject"
                required
                placeholder="What is this about?"
                style={{ display: "block", width: "100%", padding: "0.5rem" }}
              />
            </label>
            <label>
              Message
              <textarea
                name="message"
                required
                rows={6}
                placeholder="Tell us what you need."
                style={{ display: "block", width: "100%", padding: "0.5rem" }}
              />
            </label>
          </NetlifyForm>

          <h2 style={{ marginTop: "2rem" }}>What to contact us about</h2>
          <p>
            {siteConfig.name} is an AI ATS resume optimizer: upload a resume,
            tailor it to a job description, get an ATS score, then export PDF or
            LaTeX. Use this page when you need a human — not when you only need
            a free scan (use the checker linked below).
          </p>
          <ul>
            <li>
              <strong>Product &amp; support</strong> — how optimize / tailor
              modes work, credit costs, export issues, account access, or bugs
              in the app.
            </li>
            <li>
              <strong>Billing</strong> — Job Seeker or Career Sprint plans,
              refill packs, invoices, failed payments, or refunds (also see{" "}
              <Link href="/terms">Terms §6</Link>).
            </li>
            <li>
              <strong>Partnerships &amp; press</strong> — integrations,
              campus or employer programs, and media requests.
            </li>
            <li>
              <strong>Privacy &amp; grievance</strong> — data access, deletion,
              or grievance requests under our{" "}
              <Link href="/privacy">Privacy Policy §10</Link>.
            </li>
          </ul>

          <h2>Response window</h2>
          <p>
            We aim to reply within two business days for product and billing
            messages sent via the form or{" "}
            <a href={`mailto:${siteConfig.emails.contact}`}>
              {siteConfig.emails.contact}
            </a>
            . Privacy and grievance requests may take longer when we need to
            verify identity. Messages outside business hours are queued and
            answered in order — include your account email and a clear subject
            so we can route faster.
          </p>

          <h2>Try the product before you write</h2>
          <p>
            For a no-account ATS score, use the free{" "}
            <Link href="/ats-checker">ATS resume checker</Link> — same scoring
            engine, instant breakdown on parseability, format, and keywords.
            When you are ready to rewrite bullets, match a job description, and
            export, open the app and start optimizing for free.
          </p>
          <p>
            <CTA page={PAGE} label="Optimize my resume — free" />
          </p>

          <h2>What we do not offer</h2>
          <p>
            We do not sell template galleries, designer resume packs, or
            one-size-fits-all layout libraries. {siteConfig.name} focuses on
            optimizing and tailoring your existing content for ATS parsers and
            the job you are applying to — not decorating a blank template.
            If you need a visual template marketplace, we are not the right
            vendor; if you need a stronger match score and cleaner parse, we
            are.
          </p>

          <h2>Other channels</h2>
          <ul>
            <li>
              Email:{" "}
              <a href={`mailto:${siteConfig.emails.contact}`}>
                {siteConfig.emails.contact}
              </a>{" "}
              (general, support, and billing)
            </li>
            <li>
              Grievance / data-protection: see{" "}
              <Link href="/privacy">Privacy Policy §10</Link>
            </li>
            <li>
              Refund requests: see <Link href="/terms">Terms §6</Link>
            </li>
            <li>
              Pricing overview: <Link href="/pricing">Plans &amp; credits</Link>
            </li>
          </ul>
        </article>
      </main>
      <SiteFooter />
    </>
  );
}
