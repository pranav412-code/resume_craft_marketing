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

const SLUG = "improve-ats-score";
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
    question: "What does an ATS resume score actually measure?",
    answer:
      "Most useful scores combine parseability (can the system read your sections?) with keyword coverage against a specific job description. A number without a posting is a weak proxy - always score against the role you are applying to.",
  },
  {
    question: "What ATS score should I aim for?",
    answer:
      "Aim for the score to stabilize after you have covered every true requirement - often that lands in a high range. Chasing 100 by inserting skills you cannot defend fails in the interview and can look like stuffing to modern filters.",
  },
  {
    question: "Why is my ATS score low even with years of experience?",
    answer:
      "Common causes: multi-column or image-based layouts that fail parsing, missing exact tool names from the posting, or strong experience buried below the fold. Fix structure first, then keyword placement, then bullet strength.",
  },
  {
    question: "Can I improve my score without rewriting everything?",
    answer:
      "Often yes - rename skills to match the posting, move relevant bullets up, replace weak duty lists with quantified outcomes, and remove tables or headers that break parsers. Re-score after each pass.",
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
          <h1>How to improve your ATS resume score</h1>
          <p className="meta">Updated {meta.datePublished}</p>

          <p className="answer">
            How to improve the ATS score of a resume: fix what the checker
            measures against a real job description — clean structure that
            parses, keyword coverage you can prove, and stronger bullets. Run
            a score, close the listed gaps, re-score, and export once the match
            stabilizes - do not chase 100 with fake keywords.
          </p>

          <h2>Step 1: Score against the actual job posting</h2>
          <p>
            Upload your resume and paste the job description into an{" "}
            <Link href="/ats-checker">ATS resume checker</Link>. A score
            without a posting cannot tell you which keywords or requirements
            you are missing. The gap list is the roadmap - not a vanity number
            alone.
          </p>

          <h2>Step 2: Fix parseability before keywords</h2>
          <p>
            If the ATS cannot read contact details, headings, or dates, keyword
            work will not help. Use a single column, standard section titles,
            and selectable text. Details are in{" "}
            <Link href="/guides/ats-friendly-resume">
              ATS-friendly resume formatting
            </Link>{" "}
            and the fuller optimization loop in{" "}
            <Link href="/guides/ats-optimized-resume">
              how to create an ATS optimized resume
            </Link>
            .
          </p>

          <h2>Step 3: Close honest keyword and bullet gaps</h2>
          <p>
            Add missing tools and phrases that are true of your experience,
            demonstrate them in quantified bullets, and reorder so the top third
            matches the posting. For role patterns, see examples like{" "}
            <Link href="/resume-examples/software-engineer">
              software engineer
            </Link>{" "}
            or{" "}
            <Link href="/resume-examples/qa-engineer">QA engineer</Link>. Deeper
            keyword tactics are in{" "}
            <Link href="/guides/resume-keywords-from-job-description">
              resume keywords from a job description
            </Link>
            .
          </p>

          <h2>Step 4: Rewrite, re-score, then export</h2>
          <p>
            Apply AI or manual rewrites to weak bullets, run the checker again,
            and stop when coverage of true requirements is solid. Krafiter
            supports that loop with score → rewrite → PDF/LaTeX export. Continue
            in the{" "}
            <Link href="/resume-optimization">ATS resume optimizer</Link> when
            you are ready to apply the fixes in-product.
          </p>

          <h2>What will not raise a meaningful score</h2>
          <p>
            Keyword stuffing, graphics that hide text, and claiming skills you
            cannot discuss all inflate weak checkers while failing humans.
            Improve the score by making true experience easier to parse and
            easier to match to the posting.
          </p>

          <div className="cta-banner">
            <h2>See your score, then fix it</h2>
            <p>Free ATS check against your target job - then optimize the gaps.</p>
            <CTA page={PAGE} label="Check my ATS score - free" />
          </div>

          <FaqBlock items={faq} />
        </article>
      </main>
      <SiteFooter />
    </>
  );
}
