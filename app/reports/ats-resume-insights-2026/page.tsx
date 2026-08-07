import type { Metadata } from "next";
import Link from "next/link";
import { createMetadata, absoluteUrl } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { articleSchema, breadcrumbSchema } from "@/lib/seo/schema";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { CTA } from "@/components/marketing/CTA";
import { FaqBlock, type QA } from "@/components/marketing/FaqBlock";
import { siteConfig } from "@/lib/site";

const PAGE = "/reports/ats-resume-insights-2026";

export const metadata: Metadata = createMetadata({
  title: "ATS Resume Insights 2026",
  description:
    "Krafiter ATS resume insights 2026: common parseability failures, keyword gaps vs job descriptions, and how to use free scoring tools before you optimize.",
  path: PAGE,
  type: "article",
});

const faq: QA[] = [
  {
    question: "Is this report based on a published sample size?",
    answer:
      "This edition summarizes patterns we observe in ATS scoring design, free-tool usage flows, and optimization practice — not a fabricated N-resume study. When privacy-safe aggregate product metrics are ready, we will publish them as numbered updates on this report series.",
  },
  {
    question: "Can other sites cite this report?",
    answer:
      "Yes, with attribution to Krafiter and a link to this page. Prefer quoting the methodology and pattern statements rather than inventing statistics we did not publish.",
  },
  {
    question: "How does this help job seekers today?",
    answer:
      "Use the patterns as a checklist: fix parseability, match true JD keywords, strengthen bullets, then re-score. Free tools on this site make that loop concrete without a signup.",
  },
];

export default function AtsResumeInsights2026Page() {
  return (
    <>
      <SiteHeader page={PAGE} />
      <main>
        <JsonLd
          data={[
            articleSchema({
              headline: "ATS Resume Insights 2026",
              description:
                "Patterns in ATS parseability, JD keyword gaps, and optimization practice from Krafiter.",
              url: absoluteUrl(PAGE),
              datePublished: "2026-07-29",
              image: absoluteUrl("/opengraph-image"),
            }),
            breadcrumbSchema([
              { name: "Home", url: absoluteUrl("/") },
              { name: "Reports", url: absoluteUrl(PAGE) },
              { name: "ATS Resume Insights 2026", url: absoluteUrl(PAGE) },
            ]),
          ]}
        />

        <article className="prose">
          <nav className="crumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link> / Reports / ATS Resume Insights 2026
          </nav>
          <h1>ATS Resume Insights 2026</h1>
          <p className="meta">Published 2026-07-29 · Krafiter research note</p>

          <p className="answer">
            Most ATS failures we see are not mysterious: resumes that parsers
            cannot read, keywords missing from the job description, and weak
            bullets that bury proof. This report summarizes those patterns and
            points to free checks and an optimize loop you can run before you
            apply.
          </p>

          <h2>Methodology (honest scope)</h2>
          <p>
            Krafiter builds an{" "}
            <Link href="/how-ats-score-works">ATS score</Link> around
            parseability, JD keyword coverage, structure, and bullet strength.
            This 2026 insights note captures recurring failure modes from that
            product design and from public free-tool flows — not invented
            percentages. A future update will add privacy-safe aggregates (for
            example average score lift after JD-tailored rewrite) once sample
            quality and anonymization bars are met.
          </p>

          <h2>Pattern 1: Parseability still kills strong careers</h2>
          <p>
            Multi-column designs, icons replacing section labels, and text
            locked in images remain common. Recruiters never see the evidence if
            the parser drops it. Prefer a single column and standard headings —
            see{" "}
            <Link href="/guides/ats-friendly-resume">
              what an ATS-friendly resume is
            </Link>
            .
          </p>

          <h2>Pattern 2: One resume vs many job descriptions</h2>
          <p>
            Candidates reuse a generic file across postings. Keyword coverage
            collapses whenever the employer&apos;s vocabulary differs. The fix
            is per-application tailoring: extract requirements, place true
            keywords, reorder proof. Guides:{" "}
            <Link href="/guides/tailor-resume-to-job-description-guide">
              tailor to a job description
            </Link>{" "}
            and{" "}
            <Link href="/guides/resume-keywords-from-job-description">
              keywords from a JD
            </Link>
            .
          </p>

          <h2>Pattern 3: Career-stage resumes need different evidence order</h2>
          <p>
            Freshers and career changers fail when they force a senior layout.
            Education/projects-first or transferable-skills-first ordering
            matches how humans and systems scan early-career files. See{" "}
            <Link href="/guides/fresher-resume-format">
              fresher resume format
            </Link>
            ,{" "}
            <Link href="/guides/resume-with-no-experience">
              resume with no experience
            </Link>
            , and{" "}
            <Link href="/guides/resume-for-career-change">
              resume for a career change
            </Link>
            .
          </p>

          <h2>Pattern 4: Score without a posting is a weak proxy</h2>
          <p>
            A number alone does not tell you what to fix. Pair score with a
            pasted JD so missing tools and phrases become a checklist — then
            re-score after edits (
            <Link href="/guides/improve-ats-score">improve ATS score</Link>).
          </p>

          <h2>What to do next</h2>
          <ol>
            <li>
              Run the{" "}
              <Link href="/ats-checker">free ATS resume checker</Link> (no
              signup).
            </li>
            <li>
              Check keyword coverage with the{" "}
              <Link href="/tools/jd-match-checker">JD match checker</Link>.
            </li>
            <li>
              Optimize in-app with{" "}
              <Link href="/resume-optimization">ATS resume optimization</Link>{" "}
              when you are ready to rewrite for one role.
            </li>
          </ol>

          <h2>Press and citation</h2>
          <p>
            For quotes or partnerships:{" "}
            <a href={`mailto:${siteConfig.emails.founder}`}>
              {siteConfig.emails.founder}
            </a>
            . Please attribute Krafiter and link to this URL.
          </p>

          <div className="cta-banner">
            <h2>Test these insights on your resume</h2>
            <p>Free ATS score against your target job — then fix the gaps.</p>
            <CTA page={PAGE} label="Check my ATS score - free" />
          </div>

          <FaqBlock items={faq} />
        </article>
      </main>
      <SiteFooter />
    </>
  );
}
