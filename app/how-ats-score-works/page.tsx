import type { Metadata } from "next";
import Link from "next/link";
import { createMetadata, absoluteUrl } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { articleSchema, breadcrumbSchema } from "@/lib/seo/schema";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { CTA } from "@/components/marketing/CTA";
import { FaqBlock, type QA } from "@/components/marketing/FaqBlock";

const PAGE = "/how-ats-score-works";

export const metadata: Metadata = createMetadata({
  title: "How the ATS Score Works",
  description:
    "How Krafiter's ATS resume score is calculated at a high level: parseability, keyword coverage against a job description, structure, and bullet strength — without proprietary internals.",
  path: PAGE,
  type: "article",
});

const faq: QA[] = [
  {
    question: "Is the ATS score the same as a hiring decision?",
    answer:
      "No. An ATS score estimates how well your document parses and matches a posting's language. Humans still decide interviews. Use the score to fix gaps before you apply, not as a guarantee.",
  },
  {
    question: "Why does pasting a job description change the score?",
    answer:
      "Keyword and requirement coverage is measured against that posting. The same resume can score differently for two roles — which is why we score per application, not once forever.",
  },
  {
    question: "Do you share proprietary scoring weights publicly?",
    answer:
      "No. This page explains the dimensions we measure in plain language. Exact weights and analyzer internals stay internal so the product stays useful and harder to game with stuffing.",
  },
  {
    question: "How is the free checker related to in-app optimization?",
    answer:
      "The free ATS checker shows score and gaps without signup. In the app, you can rewrite for the JD (Quick, Balanced, or Deep), re-score, and export PDF or LaTeX.",
  },
];

export default function HowAtsScoreWorksPage() {
  return (
    <>
      <SiteHeader page={PAGE} />
      <main>
        <JsonLd
          data={[
            articleSchema({
              headline: "How the ATS Score Works",
              description:
                "High-level methodology for Krafiter ATS scoring: parseability, JD keyword coverage, structure, and bullet strength.",
              url: absoluteUrl(PAGE),
              datePublished: "2026-07-29",
              image: absoluteUrl("/opengraph-image"),
            }),
            breadcrumbSchema([
              { name: "Home", url: absoluteUrl("/") },
              { name: "How the ATS score works", url: absoluteUrl(PAGE) },
            ]),
          ]}
        />

        <article className="prose">
          <nav className="crumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link> / How the ATS score works
          </nav>
          <h1>How the ATS score works</h1>
          <p className="meta">Updated 2026-07-29</p>

          <p className="answer">
            Krafiter&apos;s ATS score estimates how well a resume will parse
            and match a specific job description. It looks at structure,
            keyword coverage you can defend, and bullet clarity — then surfaces
            gaps you can fix before you apply. It is a diagnostic, not a hiring
            promise.
          </p>

          <h2>What we believe about scoring</h2>
          <p>
            Employers often filter with software before a human reads your
            file. Candidates deserve to see that filter in advance. Our product
            loop is intentional:{" "}
            <strong>upload → paste JD → score → rewrite → export</strong>. The
            score exists to make the middle of that loop honest. More on our
            principles is on the{" "}
            <Link href="/about">About</Link> page.
          </p>

          <h2>Dimensions we measure (high level)</h2>
          <ul>
            <li>
              <strong>Parseability</strong> — Can standard ATS software extract
              contact details, headings, dates, and body text? Multi-column
              layouts, text in images, and exotic section names often fail here.
            </li>
            <li>
              <strong>Job-description keyword coverage</strong> — Which required
              tools, skills, and phrases from the posting appear in your resume
              where they are true of you?
            </li>
            <li>
              <strong>Structure and section clarity</strong> — Experience,
              skills, education, and related blocks labeled in ways parsers and
              recruiters recognize.
            </li>
            <li>
              <strong>Bullet strength</strong> — Outcome-oriented lines beat
              vague duty lists when both machines and humans scan the page.
            </li>
          </ul>
          <p>
            Exact weights stay proprietary. Gaming a public formula with keyword
            stuffing helps weak checkers and fails interviews — we optimize for
            honest match, not fake 100s. See{" "}
            <Link href="/guides/improve-ats-score">
              how to improve your ATS resume score
            </Link>
            .
          </p>

          <h2>Free check vs in-app rewrite</h2>
          <p>
            Use the{" "}
            <Link href="/ats-checker">free ATS resume checker</Link> (no signup)
            to see score and issues. Pair it with the{" "}
            <Link href="/tools/jd-match-checker">JD match checker</Link> for
            keyword gaps. When you are ready to rewrite for one posting, use the{" "}
            <Link href="/resume-optimization">ATS resume optimizer</Link> in the
            app.
          </p>

          <h2>What the score does not claim</h2>
          <p>
            We do not claim integration with every vendor portal, guaranteed
            interviews, or that one global score fits every country and
            industry. India-focused format tips live on{" "}
            <Link href="/in">Krafiter for India</Link>; fresher ordering
            guidance is in{" "}
            <Link href="/guides/fresher-resume-format">
              fresher resume format
            </Link>
            .
          </p>

          <div className="cta-banner">
            <h2>See your score on a real posting</h2>
            <p>Free ATS check — then optimize the gaps in the app.</p>
            <CTA page={PAGE} label="Check my ATS score - free" />
          </div>

          <FaqBlock items={faq} />
        </article>
      </main>
      <SiteFooter />
    </>
  );
}
