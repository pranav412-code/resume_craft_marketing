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

const SLUG = "resume-after-layoff";
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
    question: "Should I put 'laid off' on my resume?",
    answer:
      "Not required. End dates are enough on the resume; you can say the role ended in a reduction in force in interviews or a brief cover note. Keep the resume focused on impact in that role, not the exit.",
  },
  {
    question: "How do I explain a short last role after a layoff?",
    answer:
      "Lead with scope and outcomes achieved in the time you had. If the tenure was brief, emphasize shipped work and metrics over months in seat. Honesty about dates still matters.",
  },
  {
    question: "Should I apply with the same resume to every opening?",
    answer:
      "No. After a layoff, speed matters - but so does match. Keep a master resume, then tailor keywords and top bullets to each posting and score ATS coverage before submit.",
  },
  {
    question: "Is it okay to show freelance or contract work right after a layoff?",
    answer:
      "Yes when it is real and relevant. Clear dates and client or project outcomes fill the timeline and prove you stayed current while searching.",
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
          <h1>Resume after a layoff</h1>
          <p className="meta">Updated {meta.datePublished}</p>

          <p className="answer">
            After a layoff, reframe your recent role around scope and outcomes,
            keep tone neutral, and tailor fast to each open posting. Score ATS
            match against the job description so you fix keyword gaps quickly -
            bitterness and blame never belong on the page.
          </p>

          <h2>Step 1: Reframe the recent role</h2>
          <p>
            Rewrite bullets for what you owned and shipped - not why the company
            cut headcount. Quantify like strong examples for{" "}
            <Link href="/resume-examples/operations-manager">
              operations manager
            </Link>{" "}
            or{" "}
            <Link href="/resume-examples/product-manager">product manager</Link>
            : metrics, systems, stakeholders.
          </p>

          <h2>Step 2: Keep tone professional</h2>
          <p>
            No digs at employers, no apology paragraphs. Dates and a clean
            summary aimed at the next role are enough. Save context for
            interviews when asked about the transition.
          </p>

          <h2>Step 3: Tailor quickly per posting</h2>
          <p>
            Run each target JD through a{" "}
            <Link href="/tools/jd-match-checker">JD match checker</Link> or{" "}
            <Link href="/ats-checker">ATS checker</Link>. Reorder skills and
            bullets to match; follow{" "}
            <Link href="/guides/tailor-resume-to-job-description-guide">
              how to tailor a resume to a job description
            </Link>
            .
          </p>

          <h2>Step 4: Optimize and export for volume applying</h2>
          <p>
            Close honest gaps, re-score, export PDF or LaTeX, and move to the
            next posting.{" "}
            <Link href="/resume-optimization">Resume optimization</Link> in
            Krafiter is built for that score → rewrite → export loop.
          </p>

          <div className="cta-banner">
            <h2>Tailor your next application fast</h2>
            <p>Free ATS check against the role you are targeting now.</p>
            <CTA page={PAGE} label="Check my ATS score - free" />
          </div>

          <FaqBlock items={faq} />
        </article>
      </main>
      <SiteFooter />
    </>
  );
}
