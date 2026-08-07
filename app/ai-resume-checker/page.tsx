import type { Metadata } from "next";
import Link from "next/link";
import { createMetadata, absoluteUrl } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { softwareApplicationSchema, breadcrumbSchema } from "@/lib/seo/schema";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { CTA } from "@/components/marketing/CTA";
import { FaqBlock, type QA } from "@/components/marketing/FaqBlock";

const PAGE = "/ai-resume-checker";

export const metadata: Metadata = createMetadata({
  title: "ATS Resume Checker - Free Score & AI Fixes",
  description:
    "ATS resume checker and AI resume checker: scan my resume for ATS score, see missing keywords, then fix gaps with AI rewrites. Free to start.",
  path: PAGE,
});

const faq: QA[] = [
  {
    question: "What is an ATS resume checker?",
    answer:
      "An ATS resume checker tests how well your resume will parse and rank inside applicant tracking systems - the software most employers use to filter applications before a human reads them. It scores structure, parseability, and keyword coverage against a specific job description.",
  },
  {
    question: "How does an AI resume checker differ from a plain ATS checker?",
    answer:
      "A plain ATS checker diagnoses the score and stops. Krafiter's AI resume checker closes the loop: the same system that finds missing keywords and weak bullets rewrites them, reorders sections for relevance, and re-scores the result - so you leave with a better resume, not just a report.",
  },
  {
    question: "Is the ATS resume checker free?",
    answer:
      "Yes to start. Sign-up gives 25 free credits - enough to run the full check-score-fix loop several times before paying. No card required. See Pricing for paid plans in your currency.",
  },
  {
    question: "What does the ATS score measure?",
    answer:
      "Two halves. Structure: can an ATS extract your name, experience, skills, and dates cleanly? Match: how much of the job description's keyword set does your content cover, and where? Both are scored against the specific posting you paste, not a generic rubric.",
  },
  {
    question: "Which ATS systems does it simulate?",
    answer:
      "Parsing logic similar to Workday, Greenhouse, Lever, iCIMS, and Taleo - the systems most large employers run. Job seekers in India get Naukri-aware checks on the dedicated India checker page.",
  },
];

export default function AiResumeCheckerPage() {
  return (
    <>
      <SiteHeader page={PAGE} />
      <main>
        <JsonLd
          data={[
            softwareApplicationSchema(),
            breadcrumbSchema([
              { name: "Home", url: absoluteUrl("/") },
              { name: "ATS Resume Checker", url: absoluteUrl(PAGE) },
            ]),
          ]}
        />

        <section className="hero container">
          <p className="eyebrow">Free ATS score · AI fixes in one pass</p>
          <h1>
            The ATS resume checker that fixes what it finds
          </h1>
          <p className="lede">
            Upload your resume, paste the job description, and get an ATS
            score with the exact keywords you are missing - then let the AI
            resume checker rewrite the gaps instead of leaving you a to-do
            list.
          </p>
          <div className="actions">
            <CTA page={PAGE} label="Check my resume - free" />
            <Link href="/ats-checker" className="btn btn-ghost">
              Try the instant scan - no signup
            </Link>
            <Link href="/guides/ats-optimized-resume" className="btn btn-ghost">
              How to optimize for ATS
            </Link>
          </div>
        </section>

        <section className="section container">
          <h2>What the ATS resume checker looks at</h2>
          <ul className="card-grid">
            <li className="card">
              <h3>Parseability</h3>
              <p>
                Can an ATS extract your contact details, experience, and
                skills cleanly? Tables, columns, and text boxes break this -
                the checker flags every one.
              </p>
            </li>
            <li className="card">
              <h3>Keyword coverage</h3>
              <p>
                How many of the job description&apos;s required and preferred
                skills appear in your resume - and whether they sit where
                recruiters and parsers look first.
              </p>
            </li>
            <li className="card">
              <h3>Format compliance</h3>
              <p>
                Standard section headings, selectable text, parseable date
                ranges, single-column fallback. The quiet failures that never
                show an error message.
              </p>
            </li>
            <li className="card">
              <h3>Bullet strength</h3>
              <p>
                Action verbs, quantified impact, role-specific phrasing.
                Generic bullets get AI-rewritten suggestions you can accept
                or edit.
              </p>
            </li>
          </ul>
        </section>

        <section className="section container">
          <h2>Check, fix, re-score - one flow</h2>
          <ul className="card-grid">
            <li className="card">
              <h3>1 · Upload</h3>
              <p>
                Drop in your current resume (PDF or DOCX). The parser
                extracts your experience into structured sections.
              </p>
            </li>
            <li className="card">
              <h3>2 · Paste the job description</h3>
              <p>
                The ATS score is computed against the exact posting you want -
                not a generic checklist that ignores what this employer asks
                for.
              </p>
            </li>
            <li className="card">
              <h3>3 · Apply AI fixes</h3>
              <p>
                Missing keywords, weak bullets, and structure issues come
                with one-click rewrites. See how the{" "}
                <Link href="/resume-builder">AI powered resume builder</Link>{" "}
                does the rewriting, or use the{" "}
                <Link href="/resume-optimization">ATS resume optimizer</Link>{" "}
                end to end.
              </p>
            </li>
            <li className="card">
              <h3>4 · Export when it scores</h3>
              <p>
                Re-run the check until the score stabilizes, then export a
                recruiter-ready PDF or LaTeX source.
              </p>
            </li>
          </ul>
        </section>

        <section className="section container">
          <h2>Want a score right now, without an account?</h2>
          <ul className="card-grid">
            <li className="card">
              <h3>
                <Link href="/ats-checker">Free ATS resume scan</Link>
              </h3>
              <p>
                Upload your resume and get an instant ATS score, strengths, and
                weaknesses - no signup, no email, nothing stored.
              </p>
            </li>
            <li className="card">
              <h3>
                <Link href="/tools/jd-match-checker">JD match checker</Link>
              </h3>
              <p>
                Checking against a specific posting? See matched and missing
                keywords with a coverage percentage in seconds.
              </p>
            </li>
          </ul>
        </section>

        <section className="section container">
          <h2>Applying from India?</h2>
          <p>
            The{" "}
            <Link href="/ats-resume-checker-india">
              ATS resume checker for India
            </Link>{" "}
            adds Naukri-aware scoring, India-format cleanup (photo, DOB,
            percentages), and native INR pricing via Razorpay. Same engine,
            tuned for the Indian hiring funnel - or start from the{" "}
            <Link href="/in">resume builder for India</Link>.
          </p>
        </section>

        <div className="container">
          <div className="cta-banner">
            <h2>Know your ATS score before the filter decides it</h2>
            <p>
              Free ATS resume checker against the job you actually want - and
              AI fixes for every gap it finds. Tailoring per posting is
              covered in{" "}
              <Link href="/tailor-resume-to-job-description">
                how to tailor your resume to a job description
              </Link>
              .
            </p>
            <CTA page={PAGE} label="Score my resume now" />
          </div>
          <FaqBlock items={faq} />
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
