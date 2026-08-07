/**
 * Marketing pricing currency helpers.
 * Amounts live in siteConfig.offers — keep in sync with backend/app/api/credits.py
 * (prices in major units here; backend stores paise/cents).
 *
 * UI rule: show ONE currency per visitor (IN → INR, else USD). Never dual-price
 * on marketing cards so regions are not compared side-by-side.
 */
import { headers } from "next/headers";

export type PricingCurrency = "INR" | "USD";

const COUNTRY_HEADERS = [
  "x-visitor-country", // set by middleware
  "x-nf-country", // Netlify
  "cf-ipcountry", // Cloudflare
  "x-vercel-ip-country", // Vercel
  "x-appengine-country",
] as const;

/** India → INR; everywhere else (and unknown) → USD. Matches backend currency_for_country. */
export function currencyForCountry(country: string | null | undefined): PricingCurrency {
  if (!country) return "USD";
  const code = country.trim().toUpperCase();
  if (!code || code === "XX" || code === "T1" || code === "ZZ") return "USD";
  return code === "IN" ? "INR" : "USD";
}

/** Resolve display currency from geo headers only (no public override). */
export async function resolvePricingCurrency(): Promise<{
  currency: PricingCurrency;
  country: string | null;
}> {
  const h = await headers();
  let country: string | null = null;
  for (const name of COUNTRY_HEADERS) {
    const val = h.get(name);
    if (val && val.trim()) {
      country = val.trim().toUpperCase();
      break;
    }
  }

  return { currency: currencyForCountry(country), country };
}

export function formatOfferPrice(
  priceINR: number,
  priceUSD: number,
  currency: PricingCurrency,
): string {
  if (currency === "INR") {
    return priceINR === 0 ? "Free" : `₹${priceINR.toLocaleString("en-IN")}`;
  }
  return priceUSD === 0 ? "Free" : `$${priceUSD.toFixed(2)}`;
}
