/**
 * Single source of truth for brand + URLs. Read by metadata, schema, robots,
 * sitemap, llms.txt, and the CTA component so everything stays consistent.
 *
 * IMPORTANT: set NEXT_PUBLIC_SITE_URL / NEXT_PUBLIC_APP_URL in the env before
 * deploy. The fallbacks below are placeholders — replace once domains exist.
 */
function stripTrailingSlash(u: string): string {
  return u.replace(/\/+$/, "");
}

const SITE_URL = stripTrailingSlash(
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://resumecraft.app",
);
const APP_URL = stripTrailingSlash(
  process.env.NEXT_PUBLIC_APP_URL ?? "https://app.resumecraft.site",
);
const API_URL = stripTrailingSlash(
  process.env.NEXT_PUBLIC_API_URL ??
    "https://resume-craft-backend-1r57.onrender.com",
);

export const siteConfig = {
  name: "ResumeCraft",
  legalName: "ResumeCraft",
  url: SITE_URL,
  appUrl: APP_URL,
  apiUrl: API_URL,
  locale: "en_US",
  description:
    "Build an ATS-ready resume with AI. Upload your resume, tailor it to any job description, see your ATS score, and export to PDF or LaTeX. Free to start.",
  tagline: "AI Resume Builder & ATS Optimizer",
  twitter: "@resumecraft",
  // Brand entity links — strengthens the GEO entity graph (schema sameAs).
  // Replace with real profiles; remove any that don't exist.
  sameAs: [
    "https://twitter.com/resumecraft",
    "https://www.linkedin.com/company/resumecraft",
    "https://www.producthunt.com/products/resumecraft",
    "https://github.com/resumecraft",
  ],
  // Plans surfaced in SoftwareApplication/Product schema AND on /pricing.
  // Source of truth: backend/app/api/credits.py packs endpoint.
  offers: [
    {
      id: "free",
      name: "Free",
      planType: "free",
      priceINR: 0,
      priceUSD: 0,
      credits: 10,
      slots: 1,
      blurb: "10 credits to try the full flow",
    },
    {
      id: "job_seeker",
      name: "Job Seeker",
      planType: "recurring",
      priceINR: 149,
      priceUSD: 4.99,
      credits: 60,
      slots: 8,
      blurb: "60 credits/month + priority processing",
    },
    {
      id: "career_sprint",
      name: "Career Sprint",
      planType: "commitment",
      priceINR: 399,
      priceUSD: 12.99,
      credits: 60,
      slots: 10,
      cyclesIfCommitment: 3,
      popular: true,
      blurb: "3-month sprint · 60 credits/month · best value",
    },
    {
      id: "refill_starter",
      name: "Refill Starter",
      planType: "one_time",
      priceINR: 99,
      priceUSD: 2.99,
      credits: 20,
      slots: 0,
      blurb: "20 credits, top up anytime",
    },
    {
      id: "refill_pro",
      name: "Refill Pro",
      planType: "one_time",
      priceINR: 249,
      priceUSD: 7.99,
      credits: 60,
      slots: 0,
      blurb: "60 credits, top up anytime",
    },
  ],
  // Credit cost per optimization mode (source: backend/app/api/optimize.py).
  modeCredits: { quick: 5, balanced: 8, deep: 12 } as const,
  modeExplainer: {
    quick: "Fast pass — keyword + heading fixes.",
    balanced: "Default — rewrites bullets + reorders for the JD.",
    deep: "Full rewrite + multi-pass ATS audit.",
  },
} as const;

export type Offer = (typeof siteConfig.offers)[number];

export type SiteConfig = typeof siteConfig;
