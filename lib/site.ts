/**
 * Single source of truth for brand + URLs. Read by metadata, schema, robots,
 * sitemap, llms.txt, and the CTA component so everything stays consistent.
 *
 * IMPORTANT: set NEXT_PUBLIC_SITE_URL / NEXT_PUBLIC_APP_URL in the env before
 * deploy. Primary marketing domain: https://krafiter.com
 */
function stripTrailingSlash(u: string): string {
  return u.replace(/\/+$/, "");
}

const SITE_URL = stripTrailingSlash(
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://krafiter.com",
);
const APP_URL = stripTrailingSlash(
  process.env.NEXT_PUBLIC_APP_URL ?? "https://app.krafiter.com",
);
const API_URL = stripTrailingSlash(
  process.env.NEXT_PUBLIC_API_URL ??
    "https://resume-craft-backend-1r57.onrender.com",
);

export const siteConfig = {
  name: "Krafiter",
  legalName: "Krafiter",
  url: SITE_URL,
  appUrl: APP_URL,
  apiUrl: API_URL,
  locale: "en_US",
  description:
    "AI ATS resume optimizer: upload your resume, tailor it to any job description, get an ATS score, then export PDF or LaTeX. Free to start — no credit card.",
  tagline: "AI ATS Resume Optimizer",
  // Single live mailbox — contact, support, and founder all route here.
  emails: {
    support: "admin@krafiter.com",
    contact: "admin@krafiter.com",
    founder: "admin@krafiter.com",
  },
  twitter: "@krafiter",
  // Brand entity links for schema sameAs — add only live profile URLs.
  sameAs: [] as string[],
  // Plans surfaced in SoftwareApplication/Product schema AND on /pricing.
  // Source of truth: backend/app/api/credits.py (paise/cents → major units here).
  // Backend ids: monthly → job_seeker, career_sprint, starter → refill_starter, pro → refill_pro.
  offers: [
    {
      id: "free",
      name: "Free",
      planType: "free",
      priceINR: 0,
      priceUSD: 0,
      credits: 25, // settings.INITIAL_CREDITS
      slots: 3, // settings.FREE_RESUME_SLOTS
      blurb: "25 credits to try the full flow",
    },
    {
      id: "job_seeker", // backend: monthly
      name: "Job Seeker",
      planType: "recurring",
      priceINR: 149, // 14900 paise
      priceUSD: 4.99, // 499 cents
      credits: 60,
      slots: 8,
      blurb: "60 credits/month + priority processing",
    },
    {
      id: "career_sprint",
      name: "Career Sprint",
      planType: "commitment",
      priceINR: 399, // 39900 paise · 3-month total
      priceUSD: 12.99, // 1299 cents · 3-month total
      credits: 60,
      slots: 10,
      cyclesIfCommitment: 3,
      popular: true,
      blurb: "3-month sprint · 60 credits/month · best value",
    },
    {
      id: "refill_starter", // backend: starter
      name: "Refill Starter",
      planType: "one_time",
      priceINR: 99, // 9900 paise
      priceUSD: 2.99, // 299 cents
      credits: 20,
      slots: 0,
      blurb: "20 credits, top up anytime",
    },
    {
      id: "refill_pro", // backend: pro
      name: "Refill Pro",
      planType: "one_time",
      priceINR: 249, // 24900 paise
      priceUSD: 7.99, // 799 cents
      credits: 60,
      slots: 0,
      blurb: "60 credits, top up anytime",
    },
  ],
  // Credit cost per optimization mode (settings.CREDIT_COST_*).
  modeCredits: { quick: 2, balanced: 5, deep: 8 } as const,
  modeExplainer: {
    quick: "Fast pass - keyword + heading fixes.",
    balanced: "Default - rewrites bullets + reorders for the JD.",
    deep: "Full rewrite + multi-pass ATS audit.",
  },
} as const;

export type Offer = (typeof siteConfig.offers)[number];

export type SiteConfig = typeof siteConfig;
