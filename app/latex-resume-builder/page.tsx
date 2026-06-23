import type { Metadata } from "next";
import Link from "next/link";
import { createMetadata, absoluteUrl } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import { softwareApplicationSchema, breadcrumbSchema } from "@/lib/schema";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { CTA } from "@/components/CTA";
import { FaqBlock, type QA } from "@/components/FaqBlock";

const PAGE = "/latex-resume-builder";

export const metadata: Metadata = createMetadata({
  title: "LaTeX Resume Builder — AI Tailored, ATS Scored, Clean .tex Export",
  description:
    "Generate a typeset-quality LaTeX resume with AI. Tailored to any job description, ATS-scored, exports clean .tex source and PDF. Free to start.",
  path: PAGE,
});

const faq: QA[] = [
  {
    question: "Why use LaTeX for a resume?",
    answer:
      "LaTeX produces consistent, typeset-quality output that PDF builders cannot match — precise spacing, ligatures, microtype kerning, and reproducible builds. The source is plain text, so it version-controls cleanly in git and survives across operating systems and years.",
  },
  {
    question: "Do I need to know LaTeX to use this?",
    answer:
      "No. Upload your resume in PDF or DOCX, paste the job description, and ResumeCraft generates the .tex source for you. You can compile it on Overleaf, locally with TeX Live or MiKTeX, or just download the PDF directly.",
  },
  {
    question: "Will ATS systems read a LaTeX-built PDF?",
    answer:
      "Yes when generated correctly. ResumeCraft's LaTeX templates use selectable text, standard fonts, single-column flows, and ATS-safe section headings. Every export is run through the same ATS score check as our standard PDFs.",
  },
  {
    question: "Which LaTeX classes do you use?",
    answer:
      "ResumeCraft templates are built on lightweight custom classes derived from moderncv and altacv principles — minimal package dependencies, fast compile, and parseable by every major ATS we have tested.",
  },
  {
    question: "Can I edit the .tex after export?",
    answer:
      "Yes. The exported source is human-readable and commented. Edit it in Overleaf, VS Code with LaTeX Workshop, or any editor, and recompile.",
  },
];

export default function LatexResumeBuilderPage() {
  return (
    <>
      <SiteHeader page={PAGE} />
      <main>
        <JsonLd
          data={[
            softwareApplicationSchema(),
            breadcrumbSchema([
              { name: "Home", url: absoluteUrl("/") },
              { name: "LaTeX Resume Builder", url: absoluteUrl(PAGE) },
            ]),
          ]}
        />

        <section className="hero container">
          <p className="eyebrow">LaTeX · AI tailored · ATS scored</p>
          <h1>
            LaTeX resume builder — <em>typeset quality, AI-tailored</em>
          </h1>
          <p className="lede">
            Generate a clean .tex source and recruiter-ready PDF in one pass.
            Tailored to the job description, scored for ATS, edited in
            Overleaf or any editor.
          </p>
          <div className="actions">
            <CTA page={PAGE} label="Build my LaTeX resume — free" />
            <Link href="/resume-templates" className="btn btn-ghost">
              Browse templates
            </Link>
          </div>
        </section>

        <section className="section container">
          <h2>Why developers, researchers, and academics pick LaTeX</h2>
          <ul className="card-grid">
            <li className="card">
              <h3>Reproducible builds</h3>
              <p>
                Plain-text source. Compiles to the same PDF on any machine,
                any year. No vendor lock-in, no font drift.
              </p>
            </li>
            <li className="card">
              <h3>Version control friendly</h3>
              <p>
                Git diffs every change line-by-line. Branch for each
                application. No more <em>resume_final_v7_REAL.pdf</em>.
              </p>
            </li>
            <li className="card">
              <h3>Typeset-quality output</h3>
              <p>
                Microtype kerning, proper ligatures, precise spacing.
                Looks better than every drag-and-drop builder on the market.
              </p>
            </li>
            <li className="card">
              <h3>ATS-safe by default</h3>
              <p>
                Single-column, selectable text, standard headings. Every
                export scored against real ATS parsing.
              </p>
            </li>
          </ul>
        </section>

        <section className="section container">
          <h2>How it works</h2>
          <ol className="card-grid">
            <li className="card">
              <h3>1 · Upload</h3>
              <p>
                Drop your existing resume (PDF, DOCX, or .tex). Parser
                extracts experience, skills, education.
              </p>
            </li>
            <li className="card">
              <h3>2 · Paste the JD</h3>
              <p>
                AI rewrites bullets and reorders sections to match the
                target role.
              </p>
            </li>
            <li className="card">
              <h3>3 · Score</h3>
              <p>
                ATS compatibility score with keyword gaps surfaced and
                one-click fixes.
              </p>
            </li>
            <li className="card">
              <h3>4 · Export</h3>
              <p>
                Download <code>.tex</code> source + compiled PDF. Open in
                Overleaf if you want to edit further.
              </p>
            </li>
          </ol>
        </section>

        <section className="section container">
          <h2>LaTeX vs PDF builders</h2>
          <ul className="card-grid">
            <li className="card">
              <h3>Drag-and-drop builders</h3>
              <p>
                Fast to start. Output drifts between fonts and renderers.
                Hard to diff. Tied to the vendor's editor forever.
              </p>
            </li>
            <li className="card">
              <h3>Raw LaTeX in Overleaf</h3>
              <p>
                Full control but slow setup, no JD targeting, no ATS check,
                no parser for your existing resume.
              </p>
            </li>
            <li className="card">
              <h3>ResumeCraft LaTeX builder</h3>
              <p>
                AI does the tailoring and scoring. You get clean .tex you
                can keep editing. Best of both.
              </p>
            </li>
          </ul>
        </section>

        <div className="container">
          <div className="cta-banner">
            <h2>Ship a LaTeX resume in under ten minutes</h2>
            <p>Free to start. Clean .tex source. ATS-scored.</p>
            <CTA page={PAGE} label="Try it free" />
          </div>
          <FaqBlock items={faq} />
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
