import type { Metadata } from "next";
import Link from "next/link";
import { createMetadata, absoluteUrl } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { articleSchema, breadcrumbSchema } from "@/lib/seo/schema";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { CTA } from "@/components/marketing/CTA";
import { FaqBlock, type QA } from "@/components/marketing/FaqBlock";
import { guides } from "@/lib/content/guides";

const SLUG = "template-builders-vs-jd-optimization";
const PAGE = `/guides/${SLUG}`;
const meta = guides.find((g) => g.slug === SLUG)!;

export const metadata: Metadata = createMetadata({
  title: meta.title,
  description: meta.description,
  path: PAGE,
  type: "article",
});

const faq: QA[] = [
  {
    question: "Are resume templates bad for ATS?",
    answer:
      "Decorative multi-column or graphics-heavy templates often break parsing. Clean, single-column layouts with standard headings pass more reliably - visual polish should never hide selectable text.",
  },
  {
    question: "What is JD-tailored optimization?",
    answer:
      "Rewriting and reordering your resume so skills, keywords, and bullets match a specific job description - then verifying coverage with a match score. Looks alone do not do that work.",
  },
  {
    question: "Can I use a nice layout and still optimize for the JD?",
    answer:
      "Yes if the layout stays parseable. Prioritize match to the posting first; choose export formats (PDF or LaTeX) that keep text readable by ATS after you tailor.",
  },
  {
    question: "Why do applications fail even with a polished resume?",
    answer:
      "Often the resume never mirrored the posting's tools and requirements. Recruiters and ATS both look for role fit - a generic beautiful page for every application underperforms a tailored one.",
  },
];

export default function Page() {
  return (
    <>
      <SiteHeader page={PAGE} />
      <main>
        <JsonLd
          data={[
            articleSchema({
              headline: meta.title,
              description: meta.description,
              url: absoluteUrl(PAGE),
              datePublished: meta.datePublished,
              image: absoluteUrl("/opengraph-image"),
            }),
            breadcrumbSchema([
              { name: "Home", url: absoluteUrl("/") },
              { name: "Guides", url: absoluteUrl("/guides") },
              { name: meta.title, url: absoluteUrl(PAGE) },
            ]),
          ]}
        />

        <article className="prose">
          <nav className="crumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link> / <Link href="/guides">Guides</Link> /{" "}
            {meta.title}
          </nav>
          <h1>Template builders vs JD-tailored optimization</h1>
          <p className="meta">Updated {meta.datePublished}</p>

          <p className="answer">
            Template builders optimize how a resume looks; JD-tailored
            optimization improves how it matches a specific job description for
            ATS and recruiters. Looks help only after structure parses and
            keywords you can prove cover the posting.
          </p>

          <h2>Step 1: Separate looks from match</h2>
          <p>
            A polished layout does not tell you which tools from the posting are
            missing. Start with a{" "}
            <Link href="/tools/jd-match-checker">JD match checker</Link> or{" "}
            <Link href="/ats-checker">ATS checker</Link> so gaps are visible
            before you fuss over spacing.
          </p>

          <h2>Step 2: Prefer parseable structure</h2>
          <p>
            Single column, standard headings, no text locked in images. See{" "}
            <Link href="/guides/ats-friendly-resume">
              ATS-friendly resume
            </Link>
            . Krafiter emphasizes clean ATS structure and LaTeX export - not
            promises of trendy decorative template names.
          </p>

          <h2>Step 3: Tailor content to the posting</h2>
          <p>
            Reorder skills and bullets toward the JD. Use role examples such as{" "}
            <Link href="/resume-examples/ux-designer">UX designer</Link> or{" "}
            <Link href="/resume-examples/product-manager">product manager</Link>{" "}
            for outcome-style bullets, then apply{" "}
            <Link href="/tailor-resume-to-job-description">
              tailor resume to job description
            </Link>
            .
          </p>

          <h2>Step 4: Optimize, then export</h2>
          <p>
            Close honest keyword gaps in{" "}
            <Link href="/resume-optimization">resume optimization</Link>,
            re-score, and export PDF or LaTeX. Visual polish is a last pass - not
            a substitute for job match.
          </p>

          <div className="cta-banner">
            <h2>Optimize for the job - not just the look</h2>
            <p>Free ATS check against your target posting.</p>
            <CTA page={PAGE} label="Check my ATS score - free" />
          </div>

          <FaqBlock items={faq} />
        </article>
      </main>
      <SiteFooter />
    </>
  );
}
