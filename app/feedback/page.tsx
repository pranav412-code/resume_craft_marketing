import type { Metadata } from "next";
import Link from "next/link";
import { createMetadata, absoluteUrl } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";
import { siteConfig } from "@/lib/site";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { NetlifyForm } from "@/components/NetlifyForm";

const PAGE = "/feedback";

export const metadata: Metadata = createMetadata({
  title: "Feedback",
  description: `Share product feedback with ${siteConfig.name} — bug reports, feature requests, or general impressions. We read every submission.`,
  path: PAGE,
});

export default function FeedbackPage() {
  return (
    <>
      <SiteHeader page={PAGE} />
      <main>
        <JsonLd
          data={breadcrumbSchema([
            { name: "Home", url: absoluteUrl("/") },
            { name: "Feedback", url: absoluteUrl(PAGE) },
          ])}
        />
        <article className="prose container">
          <nav className="crumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link> / Feedback
          </nav>
          <h1>Feedback</h1>
          <p className="lede">
            What worked, what didn&apos;t, what&apos;s missing. Bug reports
            and feature requests welcome. Email is optional but helps us
            follow up.
          </p>

          <NetlifyForm
            name="feedback"
            submitLabel="Send feedback"
            successMessage="Thanks — feedback received. If you left an email we'll get back to you."
          >
            <label>
              Type
              <select
                name="type"
                required
                defaultValue="general"
                style={{ display: "block", width: "100%", padding: "0.5rem" }}
              >
                <option value="bug">Bug report</option>
                <option value="feature">Feature request</option>
                <option value="general">General feedback</option>
              </select>
            </label>
            <label>
              How would you rate the product so far?
              <select
                name="rating"
                defaultValue=""
                style={{ display: "block", width: "100%", padding: "0.5rem" }}
              >
                <option value="">— Optional —</option>
                <option value="5">5 — Love it</option>
                <option value="4">4 — Good</option>
                <option value="3">3 — Okay</option>
                <option value="2">2 — Needs work</option>
                <option value="1">1 — Frustrating</option>
              </select>
            </label>
            <label>
              Name (optional)
              <input
                type="text"
                name="name"
                autoComplete="name"
                style={{ display: "block", width: "100%", padding: "0.5rem" }}
              />
            </label>
            <label>
              Email (optional, so we can reply)
              <input
                type="email"
                name="email"
                autoComplete="email"
                style={{ display: "block", width: "100%", padding: "0.5rem" }}
              />
            </label>
            <label>
              Your feedback
              <textarea
                name="message"
                required
                rows={6}
                placeholder="What happened? What did you expect? Steps to reproduce if it's a bug."
                style={{ display: "block", width: "100%", padding: "0.5rem" }}
              />
            </label>
          </NetlifyForm>
        </article>
      </main>
      <SiteFooter />
    </>
  );
}
