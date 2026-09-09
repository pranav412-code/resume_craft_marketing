import { siteConfig } from "@/lib/site";
import { renderOgCard, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/seo/og-card";

/** Default sitewide OG / Twitter share card — Signal Paper brand. */
export const alt = `${siteConfig.name} — ${siteConfig.tagline}`;
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function OgImage() {
  return renderOgCard({
    eyebrow: "krafiter.com",
    heading: siteConfig.name,
    subheading: siteConfig.tagline,
  });
}
