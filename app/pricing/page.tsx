import type { Metadata } from "next";
import { createMetadata, absoluteUrl } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema, softwareApplicationSchema } from "@/lib/schema";
import { siteConfig } from "@/lib/site";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { CTA } from "@/components/CTA";
import { FaqBlock, type QA } from "@/components/FaqBlock";

const PAGE = "/pricing";

export const metadata: Metadata = createMetadata({
  title: "Pricing — Free to Start, INR & USD Plans",
  description:
    "ResumeCraft pricing: start free with full-feature credits, then upgrade in USD or native INR via Razorpay. No dollar-converted markup for India.",
  path: PAGE,
});

const faq: QA[] = [
  {
    question: "Is there a real free plan?",
    answer:
      "Yes. Free credits run the complete flow — upload, AI tailoring, ATS scoring, and export — not a crippled preview. You only pay when you need more credits or premium templates.",
  },
  {
    question: "Why is there separate INR pricing?",
    answer:
      "Most resume tools charge India dollar-converted prices. ResumeCraft bills natively in INR through Razorpay (UPI, cards, netbanking) at a price set for the Indian market, not a currency conversion.",
  },
  {
    question: "What payment methods are supported?",
    answer:
      "Razorpay handles payments: UPI, Indian and international cards, and netbanking for INR; cards for USD. Payments are processed by Razorpay — ResumeCraft never stores card details.",
  },
];

/**
 * NOTE: plan cards render from siteConfig.offers — the SAME source the
 * SoftwareApplication schema uses, so visible prices and schema never drift.
 * Update lib/site.ts offers with the real Razorpay plans before launch.
 */
export default function PricingPage() {
  return (
    <>
      <SiteHeader page={PAGE} />
      <main>
        <JsonLd
          data={[
            softwareApplicationSchema(),
            breadcrumbSchema([
              { name: "Home", url: absoluteUrl("/") },
              { name: "Pricing", url: absoluteUrl(PAGE) },
            ]),
          ]}
        />

        <section className="hero container">
          <h1>Simple pricing, in your currency</h1>
          <p className="lede">
            Start free. Upgrade only when you need more — in USD, or native
            INR for India via Razorpay.
          </p>
        </section>

        <section className="section container">
          <ul className="card-grid">
            {siteConfig.offers.map((o) => (
              <li className="card" key={o.name}>
                <h3>{o.name}</h3>
                <p style={{ fontSize: "1.6rem", fontWeight: 800, color: "var(--navy)" }}>
                  {o.priceCurrency === "INR" ? "₹" : "$"}
                  {o.price}
                  {o.price !== "0" && <span style={{ fontSize: "0.9rem", fontWeight: 500 }}> /mo</span>}
                </p>
                <p>{o.blurb}</p>
              </li>
            ))}
          </ul>
          <p className="muted" style={{ marginTop: "1rem" }}>
            All plans include AI tailoring, ATS scoring, and PDF export. LaTeX
            export and the full template library are included in Pro.
          </p>
        </section>

        <div className="container">
          <div className="cta-banner">
            <h2>Try the whole product before paying anything</h2>
            <p>Free credits, no card required.</p>
            <CTA page={PAGE} label="Start free" />
          </div>
          <FaqBlock items={faq} />
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
