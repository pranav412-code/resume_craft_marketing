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

const SLUG = "how-to-choose-ai-resume-tool";
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
    question: "What should an AI resume tool score against?",
    answer:
      "A real job description - not a generic industry average alone. Useful tools show keyword and parseability gaps you can act on, then let you re-score after edits.",
  },
  {
    question: "How do I know AI rewrites are honest?",
    answer:
      "You should be able to defend every changed bullet in an interview. Prefer tools that keep your facts and ask you to confirm skills - not ones that invent employers or metrics.",
  },
  {
    question: "Do I need PDF and LaTeX export?",
    answer:
      "PDF is table stakes for applications. LaTeX export helps when you want versionable, parse-friendly technical resumes. Avoid tools that only offer graphics-heavy layouts that break ATS.",
  },
  {
    question: "Are you affiliated with Krafiter?",
    answer:
      "Yes - we make Krafiter. This checklist is still meant to help you evaluate any AI resume tool: JD-based scoring, honest rewrites, parseable export, and clear pricing.",
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
          <h1>How to choose an AI resume tool</h1>
          <p className="meta">Updated {meta.datePublished}</p>

          <p className="answer">
            Choose an AI resume tool that scores against a real job description,
            rewrites only what you can defend, keeps ATS-safe structure, and
            exports clean PDF or LaTeX. Disclosure: we make Krafiter - use
            this checklist on any product, including ours.
          </p>

          <h2>Checklist: JD-based scoring</h2>
          <p>
            Prefer a free path to paste a posting and see gaps - like our{" "}
            <Link href="/ats-checker">ATS checker</Link> and{" "}
            <Link href="/tools/jd-match-checker">JD match checker</Link>. A
            score without a JD is a weak proxy for whether you will pass that
            employer&apos;s screen.
          </p>

          <h2>Checklist: Honest optimization loop</h2>
          <p>
            Look for score → rewrite → re-score, not one-shot magic. Compare
            approaches in{" "}
            <Link href="/guides/ats-checker-vs-ai-optimizer">
              ATS checker vs AI resume optimizer
            </Link>
            . Role pages such as{" "}
            <Link href="/resume-examples/data-scientist">data scientist</Link>{" "}
            and{" "}
            <Link href="/resume-examples/devops-engineer">DevOps engineer</Link>{" "}
            show the evidence density good tools should preserve.
          </p>

          <h2>Checklist: Structure and export</h2>
          <p>
            Reject tools that push unreadable multi-column art as the default.
            Favor parseable layouts and PDF/LaTeX export - see{" "}
            <Link href="/latex-resume-builder">LaTeX resume builder</Link> for
            technical export needs. Skip promises of trendy template fashion
            names.
          </p>

          <h2>Checklist: Privacy, pricing, and fit</h2>
          <p>
            Read what happens to your resume data, what is free vs paid, and
            whether{" "}
            <Link href="/tailor-resume-to-job-description">
              JD tailoring
            </Link>{" "}
            and{" "}
            <Link href="/resume-optimization">optimization</Link> are first-class
            - not afterthoughts. Then run one real posting through the tool
            before you commit.
          </p>

          <div className="cta-banner">
            <h2>Try the Krafiter checklist live</h2>
            <p>Free ATS check against a job description - then optimize gaps.</p>
            <CTA page={PAGE} label="Check my ATS score - free" />
          </div>

          <FaqBlock items={faq} />
        </article>
      </main>
      <SiteFooter />
    </>
  );
}
