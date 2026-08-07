import type { Metadata } from "next";
import Link from "next/link";
import { createMetadata, absoluteUrl } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { softwareApplicationSchema, breadcrumbSchema } from "@/lib/seo/schema";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { CTA } from "@/components/marketing/CTA";
import { FaqBlock, type QA } from "@/components/marketing/FaqBlock";
import { ScanWidget } from "@/components/tools/ScanWidget";

const PAGE = "/tools/jd-match-checker";

export const metadata: Metadata = createMetadata({
  title: "JD Match Checker - Free Resume vs Job Description Match",
  description:
    "Check how well your resume matches a job description - free, no signup. See matched and missing keywords, coverage percent, and an ATS score in seconds.",
  path: PAGE,
});

const faq: QA[] = [
  {
    question: "What does the JD match checker do?",
    answer:
      "It compares your resume against a specific job description and shows keyword coverage: which of the posting's terms your resume already contains, which are missing, and a coverage percentage - plus an overall ATS score. Free, instant, no signup.",
  },
  {
    question: "Why does keyword matching matter so much?",
    answer:
      "Applicant tracking systems rank resumes partly on how closely their language matches the posting, and recruiters skim for the same terms. A resume that mirrors the job description's vocabulary - where it's true of your experience - ranks and reads better.",
  },
  {
    question: "Should I just add every missing keyword?",
    answer:
      "Only where it's true of you. Mirroring means describing real experience in the employer's vocabulary; stuffing keywords you can't back up fails the moment a human reads the resume. Use the missing list as a checklist of what to evidence, not paste.",
  },
  {
    question: "What coverage percentage is good enough?",
    answer:
      "There's no universal cutoff, but resumes covering the posting's hard requirements - tools, certifications, and the exact noun phrases it repeats - consistently outrank generic ones. Focus on closing the missing keywords that are genuinely true of your experience.",
  },
  {
    question: "Can it also fix the gaps it finds?",
    answer:
      "The free checker diagnoses. The full Krafiter flow (free to start, 25 credits) rewrites bullets to close the gaps, reorders sections for relevance, and re-scores against the same job description before you export.",
  },
];

export default function JdMatchCheckerPage() {
  return (
    <>
      <SiteHeader page={PAGE} />
      <main>
        <JsonLd
          data={[
            softwareApplicationSchema(),
            breadcrumbSchema([
              { name: "Home", url: absoluteUrl("/") },
              { name: "JD Match Checker", url: absoluteUrl(PAGE) },
            ]),
          ]}
        />

        <section className="hero container">
          <p className="eyebrow">Free · keyword coverage · no signup</p>
          <h1>JD match checker</h1>
          <p className="lede">
            Paste the job description, upload your resume, and see exactly
            which keywords you match and which you&apos;re missing - with a
            coverage percentage and ATS score. No account needed.
          </p>
        </section>

        <section className="section container">
          <ScanWidget page={PAGE} jdRequired coverageFirst />
        </section>

        <section className="section container">
          <h2>How to read your match result</h2>
          <ul className="card-grid">
            <li className="card">
              <h3>Coverage percent</h3>
              <p>
                How much of the job description&apos;s keyword set your resume
                covers. The bar moves when you add terms that are true of your
                experience.
              </p>
            </li>
            <li className="card">
              <h3>Matched keywords</h3>
              <p>
                Terms the posting asks for that your resume already contains -
                these are working for you in both the ATS ranking and the
                recruiter skim.
              </p>
            </li>
            <li className="card">
              <h3>Missing keywords</h3>
              <p>
                Requirements the posting repeats that your resume never
                mentions. Treat this as a checklist:{" "}
                <Link href="/tailor-resume-to-job-description">
                  tailor the resume
                </Link>{" "}
                to evidence each one you genuinely have.
              </p>
            </li>
            <li className="card">
              <h3>ATS score</h3>
              <p>
                The overall parse-and-content score. Just want the structural
                check without a JD? Use the{" "}
                <Link href="/ats-checker">free ATS resume checker</Link>
                .
              </p>
            </li>
          </ul>
        </section>

        <section className="section container">
          <h2>Close the gaps automatically</h2>
          <p>
            Knowing the missing keywords is half the work - rewriting bullets
            to evidence them is the other half. Krafiter&apos;s AI does both
            in one pass: it{" "}
            <Link href="/tailor-resume-to-job-description">
              tailors your resume to the job description
            </Link>
            , closes the keyword gaps that are true of you, and re-scores with
            the <Link href="/ai-resume-checker">ATS resume checker</Link>{" "}
            before export.
          </p>
        </section>

        <div className="container">
          <div className="cta-banner">
            <h2>Missing keywords don&apos;t fix themselves</h2>
            <p>
              Sign up free and let the AI rewrite your resume against this
              exact job description. 25 free credits, no card.
            </p>
            <CTA page={PAGE} label="Close my gaps - free" />
          </div>
          <FaqBlock items={faq} />
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
