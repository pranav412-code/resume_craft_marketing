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
  process.env.NEXT_PUBLIC_APP_URL ?? "https://app.resumecraft.app",
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
  // Plans surfaced in SoftwareApplication schema AND on /pricing.
  // PLACEHOLDER prices — update with the real Razorpay plans before launch.
  offers: [
    { name: "Free", price: "0", priceCurrency: "USD", blurb: "3 credits to try the full flow" },
    { name: "Pro", price: "9", priceCurrency: "USD", blurb: "Monthly credits + all templates" },
    { name: "Pro (India)", price: "499", priceCurrency: "INR", blurb: "Same Pro, INR-native via Razorpay" },
  ],
} as const;

export type SiteConfig = typeof siteConfig;
