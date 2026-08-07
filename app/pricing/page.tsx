import type { Metadata } from "next";
import { createMetadata, absoluteUrl } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  breadcrumbSchema,
  productSchema,
  softwareApplicationSchema,
} from "@/lib/seo/schema";
import { siteConfig } from "@/lib/site";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { CTA } from "@/components/marketing/CTA";
import { FaqBlock, type QA } from "@/components/marketing/FaqBlock";
import {
  formatOfferPrice,
  resolvePricingCurrency,
  type PricingCurrency,
} from "@/lib/pricing/currency";

const PAGE = "/pricing";

/** Geo-driven — must not be statically cached as a single currency. */
export const dynamic = "force-dynamic";

export const metadata: Metadata = createMetadata({
  title: "Pricing - Free Credits & ATS Checker",
  description:
    "Krafiter pricing: 25 free credits to try the ATS optimizer, then paid plans for more runs, resume slots, and priority processing. Free ATS checker on the marketing site.",
  path: PAGE,
});

function buildFaq(currency: PricingCurrency): QA[] {
  const sprint = formatOfferPrice(399, 12.99, currency);
  const starter = formatOfferPrice(99, 2.99, currency);
  const pro = formatOfferPrice(249, 7.99, currency);
  const payNote =
    currency === "INR"
      ? "Razorpay handles payments: UPI, cards, and netbanking. Krafiter never stores card details."
      : "Razorpay handles card payments in USD. Krafiter never stores card details.";

  return [
    {
      question: "Is there a real free plan?",
      answer:
        "Yes. You get 25 credits on signup - enough for 12 Quick, 5 Balanced, or 3 Deep runs - and run the full flow (upload, AI tailoring, ATS scoring, PDF export). No card required.",
    },
    {
      question: "What is a credit?",
      answer:
        "One credit covers a unit of AI work. Quick mode costs 2 credits per optimization, Balanced costs 5, Deep costs 8. You can pick the mode per job application.",
    },
    {
      question: "What is Career Sprint?",
      answer: `A 3-month commitment plan for active job seekers: ${sprint} total, 60 credits each month, 10 resume slots, priority processing. Cheaper per credit than Job Seeker monthly.`,
    },
    {
      question: "Can I top up without subscribing?",
      answer: `Yes. Refill packs are one-time: 20 credits for ${starter} (Starter) or 60 credits for ${pro} (Pro). They stack on top of your existing balance.`,
    },
    {
      question: "What payment methods are supported?",
      answer: payNote,
    },
    {
      question: "How is currency chosen?",
      answer:
        "Checkout and this page use the billing currency for your region. Prices shown match what you pay in the app — we do not list other regions’ prices here.",
    },
  ];
}

function periodLabel(planType: string, cycles?: number): string {
  if (planType === "recurring") return "per month";
  if (planType === "commitment") return `${cycles ?? 3}-month total`;
  if (planType === "one_time") return "one-time";
  return "forever";
}

const PLAN_IDS = ["free", "job_seeker", "career_sprint"];
const REFILL_IDS = ["refill_starter", "refill_pro"];

type Offer = (typeof siteConfig.offers)[number];

function PlanCard({
  o,
  currency,
}: {
  o: Offer;
  currency: PricingCurrency;
}) {
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
        {formatOfferPrice(o.priceINR, o.priceUSD, currency)}
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
        {o.slots > 0 && <li>{o.slots} resume slot{o.slots > 1 ? "s" : ""}</li>}
        <li>{o.blurb}</li>
      </ul>
    </li>
  );
}

export default async function PricingPage() {
  const { currency } = await resolvePricingCurrency();
  const faq = buildFaq(currency);

  const plans = PLAN_IDS.map(
    (id) => siteConfig.offers.find((o) => o.id === id)!,
  );
  const refills = REFILL_IDS.map(
    (id) => siteConfig.offers.find((o) => o.id === id)!,
  );
  const { quick, balanced, deep } = siteConfig.modeCredits;

  const heroLede =
    currency === "INR"
      ? "Start with 25 free credits. Plans below are billed in INR via Razorpay (UPI, cards, netbanking)."
      : "Start with 25 free credits. Plans below are billed in USD — the same amounts as app checkout.";

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
          <h1>Simple pricing</h1>
          <p className="lede">{heroLede}</p>
        </section>

        <section className="section container">
          <h2>Plans</h2>
          <ul className="card-grid">
            {plans.map((o) => (
              <PlanCard o={o} currency={currency} key={o.id} />
            ))}
          </ul>

          <h2 style={{ marginTop: "2.5rem" }}>Refill packs</h2>
          <p className="muted">One-time top-ups. Credits never expire.</p>
          <ul className="card-grid">
            {refills.map((o) => (
              <PlanCard o={o} currency={currency} key={o.id} />
            ))}
          </ul>

          <p className="muted" style={{ marginTop: "1rem" }}>
            All plans include AI tailoring, ATS scoring, PDF and LaTeX export, and
            an ATS-safe resume layout built for job-description targeting.
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
            <CTA page={PAGE} label="Create free account" />
          </div>
          <FaqBlock items={faq} />
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
