import type { Metadata } from "next";
import Link from "next/link";
import { createMetadata, absoluteUrl } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import { softwareApplicationSchema, breadcrumbSchema } from "@/lib/schema";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { CTA } from "@/components/CTA";
import { FaqBlock, type QA } from "@/components/FaqBlock";

const PAGE = "/resume-builder";

export const metadata: Metadata = createMetadata({
  title: "AI Resume Builder — Tailored & ATS-Scored",
  description:
    "Build a resume with AI that tailors every bullet to the job you want, scores it for ATS compatibility, and exports to PDF or LaTeX. Free to start.",
  path: PAGE,
});

const faq: QA[] = [
  {
    question: "How is an AI resume builder different from a template editor?",
    answer:
      "A template editor formats what you type. An AI resume builder rewrites the content itself: it compares your experience against a target job description, surfaces missing keywords, rewrites bullets in stronger language, and orders sections so the most relevant material appears first.",
  },
  {
    question: "Will my resume still sound like me?",
    answer:
      "Yes. The AI starts from your real experience — it rephrases and prioritizes; it does not invent jobs or skills. You review and edit every suggestion before exporting.",
  },
  {
    question: "Do I need to start from scratch?",
    answer:
      "No. Upload your existing resume as PDF or DOCX and ResumeCraft parses it into structured sections automatically. Most users go from upload to a tailored, scored resume in under ten minutes.",
  },
];

export default function ResumeBuilderPage() {
  return (
    <>
      <SiteHeader page={PAGE} />
      <main>
        <JsonLd
          data={[
            softwareApplicationSchema(),
            breadcrumbSchema([
              { name: "Home", url: absoluteUrl("/") },
              { name: "AI Resume Builder", url: absoluteUrl(PAGE) },
            ]),
          ]}
        />

        <section className="hero container">
          <p className="eyebrow">AI builder · ATS scored</p>
          <h1>
            The AI resume builder that targets <em>the job, not the page</em>
          </h1>
          <p className="lede">
            Generic resumes get filtered. ResumeCraft rewrites yours against
            the exact job description — then proves it with an ATS score.
          </p>
          <div className="actions">
            <CTA page={PAGE} />
            <Link href="/tailor-resume-to-job-description" className="btn btn-ghost">
              See how tailoring works
            </Link>
          </div>
        </section>

        <section className="section container">
          <h2>What you get</h2>
          <ul className="card-grid">
            <li className="card">
              <h3>Job-description matching</h3>
              <p>
                Paste any job post. The AI maps your experience to its
                requirements and rewrites bullets to close the gaps honestly.
              </p>
            </li>
            <li className="card">
              <h3>ATS compatibility score</h3>
              <p>
                Every draft is scored the way applicant tracking systems read
                it — structure, parseability, and keyword coverage.
              </p>
            </li>
            <li className="card">
              <h3>PDF &amp; LaTeX export</h3>
              <p>
                One-click recruiter-ready PDF, or LaTeX source for full
                typographic control. <Link href="/resume-templates">Browse templates</Link>.
              </p>
            </li>
            <li className="card">
              <h3>Versions per application</h3>
              <p>
                Keep a tailored version for every application instead of one
                generic resume for all of them.
              </p>
            </li>
          </ul>
        </section>

        <div className="container">
          <div className="cta-banner">
            <h2>Stop sending the same resume everywhere</h2>
            <p>Upload once, tailor for every application.</p>
            <CTA page={PAGE} label="Try it free" />
          </div>
          <FaqBlock items={faq} />
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
