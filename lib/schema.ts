/**
 * JSON-LD builders. Render via <JsonLd/>.
 *
 * Rules:
 *  - Only emit schema for content actually visible on the page.
 *  - NEVER fabricate aggregateRating/review — manual-penalty risk.
 *    Add ratings only once real, earned reviews exist.
 */
import { siteConfig } from "@/lib/site";

const ORG_ID = `${siteConfig.url}/#organization`;
const SITE_ID = `${siteConfig.url}/#website`;

/** Brand entity. Emitted once, sitewide (root layout). GEO entity clarity. */
export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ORG_ID,
    name: siteConfig.name,
    legalName: siteConfig.legalName,
    url: siteConfig.url,
    logo: `${siteConfig.url}/logo.png`,
    description: siteConfig.description,
    sameAs: [...siteConfig.sameAs],
  };
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
    offers: {
      "@type": "AggregateOffer",
      offerCount: siteConfig.offers.length,
      lowPrice: "0",
      priceCurrency: "USD",
      offers: siteConfig.offers.map((o) => ({
        "@type": "Offer",
        name: o.name,
        price: o.price,
        priceCurrency: o.priceCurrency,
        category: o.price === "0" ? "free" : "subscription",
      })),
    },
  };
}

/** Breadcrumbs — ordered [{name, url}]. */
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

/** FAQ — PAA + voice (AEO). Only where the Q&As are visible on-page. */
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

/** HowTo — step content. AEO list snippets. */
export function howToSchema(h: {
  name: string;
  description: string;
  steps: { name: string; text: string }[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: h.name,
    description: h.description,
    step: h.steps.map((s, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: s.name,
      text: s.text,
    })),
  };
}
