/**
 * JSON-LD builders. Render via <JsonLd/>.
 *
 * Rules:
 *  - Only emit schema for content actually visible on the page.
 *  - NEVER fabricate aggregateRating/review - manual-penalty risk.
 *    Add ratings only once real, earned reviews exist.
 */
import { siteConfig } from "@/lib/site";

const ORG_ID = `${siteConfig.url}/#organization`;
const SITE_ID = `${siteConfig.url}/#website`;

/** Brand entity. Emitted once, sitewide (root layout). GEO entity clarity. */
export function organizationSchema() {
  const org: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ORG_ID,
    name: siteConfig.name,
    legalName: siteConfig.legalName,
    alternateName: siteConfig.alternateName,
    url: siteConfig.url,
    logo: `${siteConfig.url}/logo.png`,
    description: siteConfig.description,
    disambiguatingDescription: siteConfig.disambiguatingDescription,
    email: siteConfig.emails.contact,
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      email: siteConfig.emails.contact,
    },
  };
  if (siteConfig.sameAs.length) org.sameAs = [...siteConfig.sameAs];
  return org;
}

/** WebSite node (+SearchAction for sitelinks-searchbox eligibility). */
export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": SITE_ID,
    url: siteConfig.url,
    name: siteConfig.name,
    publisher: { "@id": ORG_ID },
    inLanguage: "en",
  };
}

/** USD vs INR Offer lists; reused by SoftwareApplication + Product. */
function buildOffers() {
  const categoryFor = (planType: string) =>
    planType === "free"
      ? "free"
      : planType === "one_time"
      ? "one-time"
      : "subscription";

  const usd: Array<Record<string, unknown>> = [];
  const inr: Array<Record<string, unknown>> = [];
  for (const o of siteConfig.offers) {
    usd.push({
      "@type": "Offer",
      name: o.name,
      price: o.priceUSD.toFixed(2),
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      category: categoryFor(o.planType),
    });
    // Skip Free INR — Free is global; paid INR rows keep eligibleRegion: IN.
    if (o.priceINR > 0) {
      inr.push({
        "@type": "Offer",
        name: `${o.name} (India)`,
        price: o.priceINR.toString(),
        priceCurrency: "INR",
        availability: "https://schema.org/InStock",
        category: categoryFor(o.planType),
        eligibleRegion: { "@type": "Country", name: "IN" },
      });
    }
  }
  return { usd, inr };
}

const HIGH_PRICE_USD = "12.99";
const HIGH_PRICE_INR = "399";

function aggregateOffers(extra?: Record<string, unknown>) {
  const { usd, inr } = buildOffers();
  return [
    {
      "@type": "AggregateOffer",
      offerCount: usd.length,
      lowPrice: "0",
      highPrice: HIGH_PRICE_USD,
      priceCurrency: "USD",
      ...extra,
      offers: usd,
    },
    {
      "@type": "AggregateOffer",
      offerCount: inr.length,
      lowPrice: "0",
      highPrice: HIGH_PRICE_INR,
      priceCurrency: "INR",
      ...extra,
      offers: inr,
    },
  ];
}

/** The product. Home + product pages. */
export function softwareApplicationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: siteConfig.name,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    url: siteConfig.url,
    description: siteConfig.description,
    publisher: { "@id": ORG_ID },
    offers: aggregateOffers(),
  };
}

/** Product + Offer list for /pricing rich results (distinct from SoftwareApplication). */
export function productSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `${siteConfig.name} - AI Resume Builder`,
    description: siteConfig.description,
    image: `${siteConfig.url}/opengraph-image`,
    brand: { "@id": ORG_ID },
    offers: aggregateOffers({
      availability: "https://schema.org/InStock",
    }),
  };
}

/** Breadcrumbs - ordered [{name, url}]. */
export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: it.url,
    })),
  };
}

/** FAQ - PAA + voice (AEO). Only where the Q&As are visible on-page. */
export function faqSchema(qa: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: qa.map((x) => ({
      "@type": "Question",
      name: x.question,
      acceptedAnswer: { "@type": "Answer", text: x.answer },
    })),
  };
}

/** Article/guide pages. */
export function articleSchema(a: {
  headline: string;
  description: string;
  url: string;
  datePublished: string;
  dateModified?: string;
  author?: string;
  image?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: a.headline,
    description: a.description,
    url: a.url,
    mainEntityOfPage: a.url,
    datePublished: a.datePublished,
    dateModified: a.dateModified ?? a.datePublished,
    author: {
      "@type": a.author ? "Person" : "Organization",
      name: a.author ?? siteConfig.name,
    },
    publisher: { "@id": ORG_ID },
    ...(a.image ? { image: a.image } : {}),
  };
}
