import type { Metadata } from "next";
import { createMetadata, absoluteUrl } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import {
  breadcrumbSchema,
  productSchema,
  softwareApplicationSchema,
} from "@/lib/schema";
import { siteConfig } from "@/lib/site";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { CTA } from "@/components/CTA";
import { FaqBlock, type QA } from "@/components/FaqBlock";

const PAGE = "/pricing";

export const metadata: Metadata = createMetadata({
  title: "Pricing — Free to Start, INR & USD Plans",
  description:
    "ResumeCraft pricing: 25 free credits, then Job Seeker at ₹149/$4.99 per month or Career Sprint at ₹399/$12.99 for 3 months. Refill packs from ₹99/$2.99. INR via Razorpay.",
  path: PAGE,
});

const faq: QA[] = [
  {
    question: "Is there a real free plan?",
    answer:
      "Yes. You get 25 credits on signup — enough for three Balanced optimizations or two Deep runs — and run the full flow (upload, AI tailoring, ATS scoring, PDF export). No card required.",
  },
  {
    question: "What is a credit?",
    answer:
      "One credit covers a unit of AI work. Quick mode costs 5 credits per optimization, Balanced costs 8, Deep costs 12. You can pick the mode per job application.",
  },
  {
    question: "Why is there separate INR pricing?",
    answer:
      "ResumeCraft bills natively in INR through Razorpay (UPI, cards, netbanking) at prices set for the Indian market — UPI, cards, and netbanking are all supported.",
  },
  {
    question: "What is Career Sprint?",
    answer:
      "A 3-month commitment plan for active job seekers: ₹399 / $12.99 total, 60 credits each month, 10 resume slots, priority processing. Cheaper per credit than Job Seeker monthly.",
  },
  {
    question: "Can I top up without subscribing?",
    answer:
      "Yes. Refill packs are one-time: 20 credits for ₹99/$2.99 (Starter) or 60 credits for ₹249/$7.99 (Pro). They stack on top of your existing balance.",
  },
  {
    question: "What payment methods are supported?",
    answer:
      "Razorpay handles payments: UPI, Indian and international cards, and netbanking for INR; cards for USD. ResumeCraft never stores card details.",
  },
];

const formatINR = (n: number) =>
  n === 0 ? "Free" : `₹${n.toLocaleString("en-IN")}`;
const formatUSD = (n: number) => (n === 0 ? "Free" : `$${n.toFixed(2)}`);

function periodLabel(planType: string, cycles?: number): string {
  if (planType === "recurring") return "per month";
  if (planType === "commitment") return `${cycles ?? 3}-month total`;
  if (planType === "one_time") return "one-time";
  return "forever";
}

const PLAN_IDS = ["free", "job_seeker", "career_sprint"];
const REFILL_IDS = ["refill_starter", "refill_pro"];

type Offer = (typeof siteConfig.offers)[number];

function PlanCard({ o }: { o: Offer }) {
  const popular = "popular" in o && o.popular;
  const cycles = "cyclesIfCommitment" in o ? o.cyclesIfCommitment : undefined;
  return (
    <li
      className="card"
      key={o.id}
      style={
        popular
          ? { borderColor: "var(--navy)", borderWidth: 2, position: "relative" }
          : undefined
      }
    >
      {popular && (
        <span
          style={{
            position: "absolute",
            top: "-0.6rem",
            right: "1rem",
            background: "var(--navy)",
            color: "#fff",
            padding: "0.15rem 0.6rem",
            borderRadius: "999px",
            fontSize: "0.75rem",
            fontWeight: 600,
          }}
        >
          Most popular
        </span>
      )}
      <h3>{o.name}</h3>
      <p className="plan-price">
        {formatINR(o.priceINR)}{" "}
        <span className="plan-price-alt">/ {formatUSD(o.priceUSD)}</span>
      </p>
      <p className="muted" style={{ fontSize: "0.85rem", marginTop: 0 }}>
        {periodLabel(o.planType, cycles)}
      </p>
      <ul style={{ paddingLeft: "1.1rem", marginTop: "0.6rem" }}>
        <li>
          {o.credits}
          {o.planType === "recurring" || o.planType === "commitment"
            ? " credits / month"
            : " credits"}
        </li>
        {o.slots > 0 && <li>{o.slots} resume slot{o.slots === 1 ? "" : "s"}</li>}
        <li>{o.blurb}</li>
      </ul>
    </li>
  );
}

export default function PricingPage() {
  const plans = PLAN_IDS.map(
    (id) => siteConfig.offers.find((o) => o.id === id)!,
  );
  const refills = REFILL_IDS.map(
    (id) => siteConfig.offers.find((o) => o.id === id)!,
  );
  const { quick, balanced, deep } = siteConfig.modeCredits;

  return (
    <>
      <SiteHeader page={PAGE} />
      <main>
        <JsonLd
          data={[
            softwareApplicationSchema(),
            productSchema(),
            breadcrumbSchema([
              { name: "Home", url: absoluteUrl("/") },
              { name: "Pricing", url: absoluteUrl(PAGE) },
            ]),
          ]}
        />

        <section className="hero container">
          <h1>Simple pricing, in your currency</h1>
          <p className="lede">
            Start with 25 free credits. Upgrade when you need more — in USD or
            native INR via Razorpay.
          </p>
        </section>

        <section className="section container">
          <h2>Plans</h2>
          <ul className="card-grid">
            {plans.map((o) => (
              <PlanCard o={o} key={o.id} />
            ))}
          </ul>

          <h2 style={{ marginTop: "2.5rem" }}>Refill packs</h2>
          <p className="muted">One-time top-ups. Credits never expire.</p>
          <ul className="card-grid">
            {refills.map((o) => (
              <PlanCard o={o} key={o.id} />
            ))}
          </ul>

          <p className="muted" style={{ marginTop: "1rem" }}>
            All plans include AI tailoring, ATS scoring, PDF and LaTeX export, and
            the full template library (ATS Classic, Modern, LaTeX, Fresher).
          </p>
        </section>

        <section className="section container">
          <h2>What a credit buys</h2>
          <p>
            Pick a mode per job application. One run consumes its mode cost from
            your balance.
          </p>
          <ul className="card-grid">
            <li className="card">
              <h3>Quick · {quick} credits</h3>
              <p>{siteConfig.modeExplainer.quick}</p>
            </li>
            <li className="card">
              <h3>Balanced · {balanced} credits</h3>
              <p>{siteConfig.modeExplainer.balanced}</p>
            </li>
            <li className="card">
              <h3>Deep · {deep} credits</h3>
              <p>{siteConfig.modeExplainer.deep}</p>
            </li>
          </ul>
        </section>

        <div className="container">
          <div className="cta-banner">
            <h2>Try the whole product before paying anything</h2>
            <p>25 free credits, no card required.</p>
            <CTA page={PAGE} label="Start free" />
          </div>
          <FaqBlock items={faq} />
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
