import type { Metadata } from "next";
import { createMetadata, absoluteUrl } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";
import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { CTA } from "@/components/CTA";
import { FaqBlock, type QA } from "@/components/FaqBlock";
import { templateStyles } from "@/data/templates";

const PAGE = "/resume-templates";

export const metadata: Metadata = createMetadata({
  title: "Resume Templates — ATS-Friendly & LaTeX",
  description:
    "ATS-friendly resume templates that parse cleanly in applicant tracking systems, plus LaTeX templates for developers and academics. Pick one and build free.",
  path: PAGE,
});

const faq: QA[] = [
  {
    question: "What makes a resume template ATS-friendly?",
    answer:
      "An ATS-friendly template uses a single-column layout, standard section headings, real text instead of graphics, and common fonts. It avoids tables, text boxes, images, and headers/footers that applicant tracking systems mis-parse — so your content survives intact for the human reader.",
  },
  {
    question: "Why would I want a LaTeX resume template?",
    answer:
      "LaTeX produces precise, consistent typography that ordinary editors can't match, and the source file is plain text you can version-control. It is the standard in academia and popular with software engineers. ResumeCraft exports LaTeX directly — no manual typesetting needed.",
  },
  {
    question: "Are creative templates bad for ATS?",
    answer:
      "Heavily designed templates often fail parsing: multi-column layouts scramble reading order and icons replace searchable text. Use a clean structure for the ATS stage; save visual flair for portfolios or in-person copies.",
  },
];

/**
 * Hub page (P3). The per-style/per-role programmatic template pages plug in
 * under /resume-templates/{slug} in the next phase — keep this page's links in
 * sync with what actually exists (sitemap rule: never link a page that 404s).
 */
export default function TemplatesPage() {
  return (
    <>
      <SiteHeader page={PAGE} />
      <main>
        <JsonLd
          data={breadcrumbSchema([
            { name: "Home", url: absoluteUrl("/") },
            { name: "Resume Templates", url: absoluteUrl(PAGE) },
          ])}
        />

        <section className="hero container">
          <h1>Resume templates built to pass ATS — including LaTeX</h1>
          <p className="lede">
            Every ResumeCraft template parses cleanly in applicant tracking
            systems. Pick a style; the AI fills it with content tailored to
            your target job.
          </p>
          <div className="actions">
            <CTA page={PAGE} label="Start with a template" template="ats" />
          </div>
        </section>

        <section className="section container">
          <h2>Template families</h2>
          <ul className="card-grid">
            {templateStyles.map((t) => (
              <li className="card" key={t.slug}>
                <h3>
                  <Link href={`/resume-templates/${t.slug}`}>{t.name}</Link>
                </h3>
                <p>{t.description}</p>
              </li>
            ))}
          </ul>
        </section>

        <div className="container">
          <div className="cta-banner">
            <h2>Templates don&apos;t get jobs — tailored content does</h2>
            <p>Pick a template, then let the AI match it to the role.</p>
            <CTA page={PAGE} label="Tailor a template — free" />
          </div>
          <FaqBlock items={faq} />
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
