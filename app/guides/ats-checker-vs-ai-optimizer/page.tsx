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

const SLUG = "ats-checker-vs-ai-optimizer";
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
    question: "When is a free ATS checker enough?",
    answer:
      "When your structure already parses, you need a gap list against one job description, and you can rewrite bullets yourself. A checker shines for diagnosis - not for rewriting every weak line automatically.",
  },
  {
    question: "When do I need an AI resume optimizer?",
    answer:
      "When keywords are missing, bullets are duty-lists, or you are tailoring at volume and need faster rewrites that stay grounded in your experience. Optimizer without a real JD is still a weak loop.",
  },
  {
    question: "Can I use both a checker and an optimizer?",
    answer:
      "Yes - that is the intended loop: score against the posting, rewrite the listed gaps, re-score, then export. Diagnosis first, rewrite second.",
  },
  {
    question: "Does a high ATS score guarantee an interview?",
    answer:
      "No. Score measures parseability and match signals against a posting. Recruiters still judge substance, level fit, and honesty. Fake keywords that raise a score fail in interviews.",
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
          <h1>ATS checker vs AI resume optimizer</h1>
          <p className="meta">Updated {meta.datePublished}</p>

          <p className="answer">
            An ATS checker diagnoses parseability and keyword gaps against a job
            description; an AI optimizer rewrites to close those gaps. Use a
            free scan when you only need the gap list - use full optimization
            when bullets and coverage need a structured rewrite loop.
          </p>

          <h2>Step 1: Start with a free scan against the JD</h2>
          <p>
            Upload your resume and paste the posting into the{" "}
            <Link href="/ats-checker">ATS resume checker</Link> or{" "}
            <Link href="/tools/jd-match-checker">JD match checker</Link>. If the
            score is solid and gaps are tiny, fix those lines manually and stop.
          </p>

          <h2>Step 2: Know what the checker cannot do</h2>
          <p>
            Checkers do not replace weak storytelling. If every bullet is a duty
            list, or you are changing fields, diagnosis alone is slow. Role
            patterns like{" "}
            <Link href="/resume-examples/software-engineer">
              software engineer
            </Link>{" "}
            or{" "}
            <Link href="/resume-examples/business-analyst">
              business analyst
            </Link>{" "}
            show the outcome style recruiters expect.
          </p>

          <h2>Step 3: Move to optimization when rewrites pile up</h2>
          <p>
            Use{" "}
            <Link href="/resume-optimization">ATS resume optimization</Link>{" "}
            when you need score → rewrite → re-score in one flow, especially for{" "}
            <Link href="/tailor-resume-to-job-description">
              tailoring to a job description
            </Link>
            . Export PDF or LaTeX when the match stabilizes.
          </p>

          <h2>Step 4: Do not chase vanity scores</h2>
          <p>
            Stuffing skills you cannot defend inflates weak numbers and fails
            humans. Improve coverage of true requirements - the same advice as{" "}
            <Link href="/guides/improve-ats-score">
              how to improve your ATS resume score
            </Link>
            .
          </p>

          <div className="cta-banner">
            <h2>Diagnose first - optimize if needed</h2>
            <p>Free ATS check against your target job description.</p>
            <CTA page={PAGE} label="Check my ATS score - free" />
          </div>

          <FaqBlock items={faq} />
        </article>
      </main>
      <SiteFooter />
    </>
  );
}
