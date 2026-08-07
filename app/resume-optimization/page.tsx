import type { Metadata } from "next";
import Link from "next/link";
import { createMetadata, absoluteUrl } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { softwareApplicationSchema, breadcrumbSchema } from "@/lib/seo/schema";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { CTA } from "@/components/marketing/CTA";
import { FaqBlock, type QA } from "@/components/marketing/FaqBlock";

const PAGE = "/resume-optimization";

export const metadata: Metadata = createMetadata({
  title: "ATS Resume Optimizer - Optimize Resume for ATS",
  description:
    "ATS resume optimizer that helps you optimize a resume for ATS: match keywords to the job description, fix parse issues, score the draft, and export PDF or LaTeX.",
  path: PAGE,
});

const faq: QA[] = [
  {
    question: "What is an ATS resume optimizer?",
    answer:
      "An ATS resume optimizer adjusts a resume for a specific job application so it both parses cleanly in applicant tracking systems and covers the posting's keywords. It reorders content by relevance, strengthens bullets with quantified outcomes, fixes formatting ATS cannot read, and measures the result with an ATS score.",
  },
  {
    question: "How do I optimize a resume for ATS?",
    answer:
      "Start from a parseable single-column layout, extract the job description's required skills and phrases, mirror those terms where they are true of you, lead with the most relevant experience, then score the draft against the same posting and fix what the score surfaces. Krafiter runs that loop with AI in minutes.",
  },
  {
    question: "How does Krafiter's ATS resume optimizer work?",
    answer:
      "You upload your resume and paste the job description. The AI extracts the posting's requirements, maps them to your parsed experience, rewrites and reorders bullets to close the gaps, and shows an ATS score plus the keywords still missing. You review every change before exporting.",
  },
  {
    question: "How is optimization different from rewriting my resume?",
    answer:
      "Optimization keeps your real experience and reshapes how it is presented for one target role - vocabulary, order, emphasis, and format. Nothing is invented. A rewrite from scratch risks losing the substance that got you the experience in the first place.",
  },
  {
    question: "Is the ATS resume optimizer free to try?",
    answer:
      "Yes. Sign-up gives 25 free credits - enough to run the full optimize-score-export flow several times. See Pricing for paid plans in your currency.",
  },
];

export default function ResumeOptimizationPage() {
  return (
    <>
      <SiteHeader page={PAGE} />
      <main>
        <JsonLd
          data={[
            softwareApplicationSchema(),
            breadcrumbSchema([
              { name: "Home", url: absoluteUrl("/") },
              { name: "ATS Resume Optimizer", url: absoluteUrl(PAGE) },
            ]),
          ]}
        />

        <section className="hero container">
          <p className="eyebrow">Optimize for ATS · Tailor · Score · Export</p>
          <h1>
            ATS resume optimizer — optimize your resume for ATS, one job at a time
          </h1>
          <p className="lede">
            A resume optimized for everything is optimized for nothing.
            Krafiter&apos;s ATS resume optimizer tunes yours to the exact
            job description - keywords, order, and bullets - then proves it
            with an ATS score.
          </p>
          <div className="actions">
            <CTA page={PAGE} />
            <Link href="/ats-checker" className="btn btn-ghost">
              Free ATS check first
            </Link>
          </div>
        </section>

        <section className="section container">
          <h2>What it means to optimize a resume for ATS</h2>
          <ul className="card-grid">
            <li className="card">
              <h3>Keyword match</h3>
              <p>
                The posting&apos;s required tools, skills, and phrases -
                mirrored in your resume wherever they are true of your
                experience, in the employer&apos;s exact wording.
              </p>
            </li>
            <li className="card">
              <h3>Relevance order</h3>
              <p>
                The most job-relevant experience moves into the top third,
                where recruiters actually look in their first seconds per
                scan.
              </p>
            </li>
            <li className="card">
              <h3>Bullet strength</h3>
              <p>
                Weak, generic bullets get rewritten against the requirements
                with action verbs and quantified outcomes - the same engine
                behind the{" "}
                <Link href="/resume-builder">AI resume builder</Link> entry
                flow.
              </p>
            </li>
            <li className="card">
              <h3>ATS structure</h3>
              <p>
                Headings, layout, and dates that parse cleanly in Workday,
                Greenhouse, Lever, and the rest - so the content survives the
                software between you and the recruiter.
              </p>
            </li>
          </ul>
        </section>

        <section className="section container">
          <h2>Optimization is a loop, not an edit</h2>
          <p>
            Every change is measured: optimize for ATS, score with the{" "}
            <Link href="/ats-checker">free ATS resume checker</Link>, fix
            what the score surfaces, and export once it stabilizes. The
            manual version of this workflow is documented in{" "}
            <Link href="/tailor-resume-to-job-description">
              how to tailor your resume to a job description
            </Link>{" "}
            and{" "}
            <Link href="/guides/ats-optimized-resume">
              how to create an ATS optimized resume
            </Link>{" "}
            - Krafiter runs it for you in minutes.
          </p>
        </section>

        <div className="container">
          <div className="cta-banner">
            <h2>One ATS-optimized resume per application</h2>
            <p>
              Upload once. Optimize for every job you actually want - without
              an hour of editing each time.
            </p>
            <CTA page={PAGE} />
          </div>
          <FaqBlock items={faq} />
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
