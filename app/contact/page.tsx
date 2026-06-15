import type { Metadata } from "next";
import Link from "next/link";
import { createMetadata, absoluteUrl } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";
import { siteConfig } from "@/lib/site";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { NetlifyForm } from "@/components/NetlifyForm";

const PAGE = "/contact";

export const metadata: Metadata = createMetadata({
  title: "Contact",
  description: `Get in touch with ${siteConfig.name} — questions, support, partnership, press, or grievance requests.`,
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
            Questions about the product, billing, partnerships, or anything
            else — drop a note. We read every message.
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

          <h2 style={{ marginTop: "2rem" }}>Other channels</h2>
          <ul>
            <li>Grievance / data-protection: see <Link href="/privacy">Privacy Policy §10</Link></li>
            <li>Refund requests: see <Link href="/terms">Terms §6</Link></li>
          </ul>
        </article>
      </main>
      <SiteFooter />
    </>
  );
}
