import type { Metadata } from "next";
import Link from "next/link";
import {
  createMetadata,
  absoluteUrl,
  softwareApplicationSchema,
  breadcrumbSchema,
} from "@/lib/seo";
import { siteConfig } from "@/lib/site";
import { JsonLd } from "@/components/seo/JsonLd";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { FaqBlock, type QA } from "@/components/marketing/FaqBlock";
import { ATS_CHECKER_ABSOLUTE_TITLE } from "@/lib/seo/titles";
import { AtsCheckerApp } from "@/components/ats-checker/AtsCheckerApp";

const PAGE = "/ats-checker";
const DESCRIPTION =
  "Free ATS resume checker: scan my resume for an ATS score — formatting, keywords, parseability. Full breakdown, no account. Upgrade in-app to AI rewrite.";

export const metadata: Metadata = createMetadata({
  title: ATS_CHECKER_ABSOLUTE_TITLE,
  absoluteTitle: true,
  description: DESCRIPTION,
  path: PAGE,
});

const faq: QA[] = [
  {
    question: "What does the free ATS resume checker score?",
    answer:
      "It runs the same 12-analyzer engine as Krafiter: parseability (can an ATS read your sections and dates?), format compliance (tables, columns, text boxes), keyword coverage against an optional job description, bullet strength, and section structure. You get a numeric ATS score plus a breakdown of strengths and gaps.",
  },
  {
    question: "Do I need to sign up or paste my email?",
    answer:
      "No. Upload a PDF or DOCX and get an instant score — nothing is stored on our servers after the scan completes. Rate limits apply to keep the free tier sustainable; sign up only if you want AI rewrites and unlimited checks.",
  },
  {
    question: "How is this different from the AI resume checker?",
    answer:
      "This page is the instant, no-account scan — diagnose only. The AI resume checker in the app adds keyword rewrites, bullet fixes, re-scoring, and PDF or LaTeX export. Use this page to see your baseline; upgrade when you want the AI to fix what it finds.",
  },
  {
    question: "Should I paste a job description?",
    answer:
      "Recommended. Without a JD, the checker scores general ATS parseability and structure. With a JD, keyword match and coverage are scored against that exact posting — the same signal recruiters and parsers use when filtering applications.",
  },
  {
    question: "Is my resume data private?",
    answer:
      "The public scan sends your file to our API for analysis and does not persist it after the response. For full tailoring with saved versions, use the app at app.krafiter.com under our privacy policy.",
  },
];

export default function AtsCheckerPage() {
  const url = absoluteUrl(PAGE);
  return (
    <>
      <SiteHeader page={PAGE} />
      <main>
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
              isPartOf: {
                "@type": "WebSite",
                name: siteConfig.name,
                url: siteConfig.url,
              },
            },
          ]}
        />

        <section className="hero container">
          <p className="eyebrow">Free · No signup · Instant score</p>
          <h1>Free ATS resume checker</h1>
          <p className="lede">
            Scan my resume for an ATS score — formatting, keywords, and
            parseability against any job description. Same 12-analyzer engine
            as Krafiter, no account required.
          </p>
        </section>

        <AtsCheckerApp />

        <section className="section container">
          <h2>What the ATS check covers</h2>
          <ul className="card-grid">
            <li className="card">
              <h3>Parseability</h3>
              <p>
                Can applicant tracking systems extract your name, contact
                details, experience, skills, and dates? Tables, multi-column
                layouts, and text boxes break parsing — the checker flags each
                one.
              </p>
            </li>
            <li className="card">
              <h3>Keyword match</h3>
              <p>
                Paste a job description and see which required and preferred
                terms appear in your resume, which are missing, and how that
                affects your overall ATS score.
              </p>
            </li>
            <li className="card">
              <h3>Format compliance</h3>
              <p>
                Standard section headings, selectable text, parseable date
                ranges, and single-column fallback. The quiet failures that
                never show an error message but still filter you out.
              </p>
            </li>
            <li className="card">
              <h3>Bullet strength</h3>
              <p>
                Action verbs, quantified impact, and role-specific phrasing.
                Weak bullets are surfaced so you know what to rewrite before
                you apply.
              </p>
            </li>
          </ul>
        </section>

        <section className="section container">
          <h2>Free scan vs AI rewrite</h2>
          <p>
            This page gives you a diagnostic ATS score — strengths, weaknesses,
            and keyword gaps — with no signup. When you want the AI to rewrite
            bullets, reorder sections for a specific posting, and re-score until
            the result stabilizes, use the{" "}
            <Link href="/ai-resume-checker">AI resume checker</Link> or{" "}
            <Link href="/tailor-resume-to-job-description">
              tailor your resume to a job description
            </Link>{" "}
            in the app. See{" "}
            <Link href="/guides/ats-checker-vs-ai-optimizer">
              ATS checker vs AI optimizer
            </Link>{" "}
            for when each fits.
          </p>
        </section>

        <section className="section container">
          <h2>Related free tools</h2>
          <ul className="card-grid">
            <li className="card">
              <h3>
                <Link href="/tools/jd-match-checker">JD match checker</Link>
              </h3>
              <p>
                Already have a target posting? See matched and missing keywords
                with a coverage percentage in seconds.
              </p>
            </li>
            <li className="card">
              <h3>
                <Link href="/ai-resume-checker">AI resume checker</Link>
              </h3>
              <p>
                Same score, plus AI fixes for every gap — rewrites, re-orders,
                and export when the score is ready.
              </p>
            </li>
          </ul>
        </section>

        <div className="container">
          <FaqBlock items={faq} />
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
