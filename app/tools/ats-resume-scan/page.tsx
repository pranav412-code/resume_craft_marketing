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

const PAGE = "/tools/ats-resume-scan";

export const metadata: Metadata = createMetadata({
  title: "Free ATS Resume Scan - Instant Score, No Signup",
  description:
    "Scan your resume for ATS compatibility in seconds - no signup, no email. Upload a PDF or DOCX and get an instant score, strengths, and fixes.",
  path: PAGE,
});

const faq: QA[] = [
  {
    question: "Is the ATS resume scan really free?",
    answer:
      "Yes - and it needs no account or email. Upload your resume and get an instant ATS score with strengths and weaknesses. Signing up (free, 25 credits) unlocks the full issue list and AI-powered fixes.",
  },
  {
    question: "What file types does the scanner accept?",
    answer:
      "PDF and DOCX, up to 10 MB. Use a text-based PDF (exported from a word processor or builder), not a scanned image - scanned resumes can't be parsed by ATS software either, which is itself a failing result.",
  },
  {
    question: "Is my resume stored after the scan?",
    answer:
      "No. The anonymous scan parses your file in memory, computes the score, and returns the result. Nothing is saved to an account because there is no account.",
  },
  {
    question: "What does the score measure?",
    answer:
      "How reliably applicant tracking systems can parse your resume: structure, standard headings, selectable text, date formats, and content strength. Paste a job description alongside the file to also get keyword coverage against that specific posting.",
  },
  {
    question: "How is this different from the full Krafiter checker?",
    answer:
      "The free scan shows your score, top strengths and weaknesses, and keyword coverage. The full product (free to start with 25 credits) shows every issue it found and rewrites the gaps with AI - bullets, keywords, and structure - then re-scores the result.",
  },
];

export default function AtsResumeScanPage() {
  return (
    <>
      <SiteHeader page={PAGE} />
      <main>
        <JsonLd
          data={[
            softwareApplicationSchema(),
            breadcrumbSchema([
              { name: "Home", url: absoluteUrl("/") },
              { name: "Free ATS Resume Scan", url: absoluteUrl(PAGE) },
            ]),
          ]}
        />

        <section className="hero container">
          <p className="eyebrow">Free · instant · no signup</p>
          <h1>Free ATS resume scan</h1>
          <p className="lede">
            Upload your resume and get an ATS compatibility score in seconds -
            no account, no email. Add a job description to see which keywords
            you match and which you&apos;re missing.
          </p>
        </section>

        <section className="section container">
          <ScanWidget page={PAGE} />
        </section>

        <section className="section container">
          <h2>What the scan checks</h2>
          <ul className="card-grid">
            <li className="card">
              <h3>Parseability</h3>
              <p>
                Can an ATS extract your name, experience, skills, and dates
                cleanly? Tables, columns, and image-based text break this.
              </p>
            </li>
            <li className="card">
              <h3>Structure &amp; headings</h3>
              <p>
                Standard section names, sensible ordering, parseable date
                ranges - the quiet failures that never show an error message.
              </p>
            </li>
            <li className="card">
              <h3>Content strength</h3>
              <p>
                Action verbs, quantified impact, and section completeness -
                the things recruiters skim for after the parser is done.
              </p>
            </li>
            <li className="card">
              <h3>Keyword coverage (with a JD)</h3>
              <p>
                Paste a job description and the scan compares its keyword set
                against your resume. Checking a specific role? Use the{" "}
                <Link href="/tools/jd-match-checker">JD match checker</Link>.
              </p>
            </li>
          </ul>
        </section>

        <section className="section container">
          <h2>From score to fixed resume</h2>
          <p>
            The scan diagnoses; the full product fixes. Krafiter&apos;s{" "}
            <Link href="/ai-resume-checker">ATS resume checker</Link> shows
            every issue and rewrites the gaps with AI - then re-scores until
            the resume clears. It&apos;s free to start with 25 credits, no card
            required. Applying in India? See the{" "}
            <Link href="/ats-resume-checker-india">
              ATS resume checker for India
            </Link>
            .
          </p>
        </section>

        <div className="container">
          <div className="cta-banner">
            <h2>Don&apos;t stop at the diagnosis</h2>
            <p>
              Sign up free to see every issue the scan found - and let the AI
              fix them.
            </p>
            <CTA page={PAGE} label="Fix my resume - free" />
          </div>
          <FaqBlock items={faq} />
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
