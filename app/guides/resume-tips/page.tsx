import type { Metadata } from "next";
import Link from "next/link";
import { createMetadata, absoluteUrl } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import { articleSchema, breadcrumbSchema } from "@/lib/schema";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { CTA } from "@/components/CTA";
import { FaqBlock, type QA } from "@/components/FaqBlock";
import { guides } from "@/lib/guides";

const SLUG = "resume-tips";
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
    question: "What are the most important resume tips?",
    answer:
      "Lead with relevance to the job description, quantify outcomes in every recent bullet, keep a single-column ATS-safe layout, cut anything older than ten to fifteen years that does not help this application, and proofread contact details twice. Those five changes move more interviews than a redesign.",
  },
  {
    question: "Should I use the same resume for every application?",
    answer:
      "No. Keep one master resume, then tailor a copy per role: mirror the posting's keywords where they are true of you, reorder so the most relevant experience leads, and drop bullets that do not support that job. Tailoring is the highest-ROI tip on this list.",
  },
  {
    question: "What resume mistakes hurt ATS screening the most?",
    answer:
      "Multi-column layouts, text in images or text boxes, creative section headings the parser does not recognize, headers/footers that hide contact info, and scanned PDFs with no selectable text. Fix structure first, then keywords.",
  },
  {
    question: "How do I know my resume tips actually worked?",
    answer:
      "Measure. Paste the same job description into an ATS resume checker, fix the missing keywords and parse issues it surfaces, and re-score until the draft stabilizes. Guesswork is optional once you have a score loop.",
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
          <h1>Resume tips that get interviews</h1>
          <p className="meta">Updated {meta.datePublished}</p>

          <p className="answer">
            The resume tips that move interview rates are practical, not
            decorative: tailor to the job description, quantify recent
            bullets, keep an ATS-safe layout, cut irrelevant history, and
            check the draft against the posting before you apply. Design
            polish helps only after those fundamentals are solid.
          </p>

          <h2>Tip 1: Tailor before you polish</h2>
          <p>
            A beautiful generic resume loses to a plain tailored one when the
            ATS ranks by keyword match. Mirror the employer&apos;s tools,
            skills, and noun phrases wherever they are true of you. The full
            workflow is in{" "}
            <Link href="/tailor-resume-to-job-description">
              how to tailor your resume to a job description
            </Link>
            ; for a blank-page process start with{" "}
            <Link href="/guides/how-to-write-a-resume">
              how to write a resume
            </Link>
            .
          </p>

          <h2>Tip 2: Quantify every recent bullet</h2>
          <p>
            Recruiters skim for proof. Prefer &quot;cut invoice cycle time
            30% across 4 regions&quot; over &quot;improved billing
            processes.&quot; If you lack a perfect metric, use scale - team
            size, budget, ticket volume, or frequency - rather than leaving
            the impact blank.
          </p>

          <h2>Tip 3: Keep the layout ATS-safe</h2>
          <p>
            Single column, standard headings, selectable text, common fonts.
            Skip skill bars, icons in place of words, and dual-column sidebars
            that scramble parse order. Details live in{" "}
            <Link href="/guides/ats-friendly-resume">
              what is an ATS-friendly resume
            </Link>
            .
          </p>

          <h2>Tip 4: Cut what does not help this application</h2>
          <p>
            Older roles, unrelated hobbies, and soft-skill filler steal space
            from the evidence that wins this interview. One page for under
            ten years of experience is usually enough - see{" "}
            <Link href="/guides/how-long-should-a-resume-be">
              how long should a resume be
            </Link>
            .
          </p>

          <h2>Tip 5: Put skills where parsers and humans look</h2>
          <p>
            Use a dedicated skills section with the hard skills the posting
            names, then prove the important ones in bullets. Exact wording
            beats clever synonyms. More on selection in{" "}
            <Link href="/guides/resume-skills">skills to put on a resume</Link>
            .
          </p>

          <h2>Common resume mistakes to avoid</h2>
          <ul>
            <li>
              <strong>Keyword stuffing</strong> you cannot defend in an
              interview.
            </li>
            <li>
              <strong>Objectives</strong> that state what you want instead of
              a summary of what you offer.
            </li>
            <li>
              <strong>Photos and biodata fields</strong> on corporate
              applications (especially outside traditional/government
              contexts).
            </li>
            <li>
              <strong>Typos in your email or phone</strong> - an instant
              dead end.
            </li>
            <li>
              <strong>Sending the same PDF</strong> to every role without a
              pass through an{" "}
              <Link href="/resume-optimization">ATS resume optimizer</Link>.
            </li>
          </ul>

          <h2>Pre-submit checklist</h2>
          <ol>
            <li>Contact details correct and in the body (not only a header).</li>
            <li>Summary and top bullets rewritten for this job description.</li>
            <li>Skills section mirrors the posting&apos;s required tools.</li>
            <li>Layout is single-column; text is selectable in the PDF.</li>
            <li>
              Draft scored with the{" "}
              <Link href="/ai-resume-checker">ATS resume checker</Link> against
              the same posting - gaps fixed once.
            </li>
          </ol>

          <div className="cta-banner">
            <h2>Apply the tips automatically</h2>
            <p>
              Upload your current resume, paste the job, and let the{" "}
              <Link href="/resume-builder">AI powered resume builder</Link>{" "}
              tailor, score, and export.
            </p>
            <CTA page={PAGE} label="Improve my resume - free" />
          </div>

          <FaqBlock items={faq} />
        </article>
      </main>
      <SiteFooter />
    </>
  );
}
