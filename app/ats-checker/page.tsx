import type { Metadata } from "next";
import {
  createMetadata,
  absoluteUrl,
  softwareApplicationSchema,
  breadcrumbSchema,
} from "@/lib/seo";
import { siteConfig } from "@/lib/site";
import { JsonLd } from "@/components/seo/JsonLd";
import { AtsCheckerApp } from "@/components/ats-checker/AtsCheckerApp";

const PAGE = "/ats-checker";
const TITLE = `Free ATS Resume Checker | ${siteConfig.name}`;
const DESCRIPTION =
  "Free ATS resume checker: scan my resume for an ATS score — formatting, keywords, parseability. Full breakdown, no account. Upgrade in-app to AI rewrite.";

export const metadata: Metadata = createMetadata({
  title: TITLE,
  absoluteTitle: true,
  description: DESCRIPTION,
  path: PAGE,
});

export default function AtsCheckerPage() {
  const url = absoluteUrl(PAGE);
  return (
    <>
      <JsonLd
        data={[
          softwareApplicationSchema(),
          breadcrumbSchema([
            { name: "Home", url: absoluteUrl("/") },
            { name: "Free ATS Resume Checker", url },
          ]),
          {
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "Free ATS Resume Checker",
            url,
            description: DESCRIPTION,
            isPartOf: { "@type": "WebSite", name: siteConfig.name, url: siteConfig.url },
          },
        ]}
      />
      <AtsCheckerApp />
    </>
  );
}
