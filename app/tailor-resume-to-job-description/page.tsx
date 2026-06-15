import type { Metadata } from "next";
import Link from "next/link";
import { createMetadata, absoluteUrl } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema, howToSchema } from "@/lib/schema";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { CTA } from "@/components/CTA";
import { FaqBlock, type QA } from "@/components/FaqBlock";

const PAGE = "/tailor-resume-to-job-description";

export const metadata: Metadata = createMetadata({
  title: "Tailor Your Resume to a Job Description",
  description:
    "How to tailor a resume to a job description — what to change, which keywords matter, and how ResumeCraft's AI does it for you in minutes with an ATS score.",
  path: PAGE,
});

const steps = [
  {
    name: "Read the job description like a parser",
    text: "Highlight the hard requirements: tools, certifications, years of experience, and the exact noun phrases the employer repeats. Those phrases are what both the ATS and the recruiter scan for first.",
  },
  {
    name: "Mirror the employer's language",
    text: "If the posting says 'stakeholder management' and your resume says 'worked with teams', update yours to use the employer's term wherever it is true of your experience. Keyword matching is literal.",
  },
  {
    name: "Reorder for relevance",
    text: "Move the most job-relevant experience and skills into the top third of the resume. Recruiters average seconds per scan; relevance buried on page two is relevance lost.",
  },
  {
    name: "Rewrite bullets against requirements",
    text: "For each major requirement, make sure one bullet demonstrates it with a quantified outcome. Cut bullets that do not support this application.",
  },
  {
    name: "Score and iterate",
    text: "Run the tailored resume through an ATS check against the same job description, fix the missing keywords it surfaces, and export once the score stabilizes.",
  },
];

const faq: QA[] = [
  {
    question: "Should I tailor my resume for every job application?",
    answer:
      "Yes, for any role you genuinely want. Tailoring measurably increases interview rates because both ATS filters and recruiters compare your wording against the job description. With AI assistance it takes minutes per application instead of an hour.",
  },
  {
    question: "Is mirroring job-description keywords the same as keyword stuffing?",
    answer:
      "No. Mirroring means describing your real experience in the employer's vocabulary. Stuffing means inserting keywords you cannot back up — which fails the moment a human reads the resume or asks about it in an interview.",
  },
  {
    question: "How does ResumeCraft tailor a resume automatically?",
    answer:
      "You upload your resume and paste the job description. The AI extracts the posting's requirements, maps them to your parsed experience, rewrites and reorders bullets to close the gaps, and shows an ATS score plus the keywords still missing — all before you export.",
  },
];

export default function TailorPage() {
  return (
    <>
      <SiteHeader page={PAGE} />
      <main>
        <JsonLd
          data={[
            breadcrumbSchema([
              { name: "Home", url: absoluteUrl("/") },
              { name: "Tailor Resume to Job Description", url: absoluteUrl(PAGE) },
            ]),
            howToSchema({
              name: "How to tailor a resume to a job description",
              description:
                "Five steps to align a resume with a specific job posting so it passes ATS screening and reads as relevant to recruiters.",
              steps,
            }),
          ]}
        />

        <article className="prose">
          <h1>Tailor your resume to the job description</h1>

          {/* AEO answer block: 40–60 words, directly under the H1. */}
          <p className="answer">
            Tailoring a resume means rewriting and reordering your content to
            match one specific job posting — mirroring its keywords where they
            are true of you, leading with the most relevant experience, and
            proving each major requirement with a quantified bullet. It is the
            single highest-impact edit before applying.
          </p>

          <h2>How do you tailor a resume to a job description?</h2>
          <ol>
            {steps.map((s) => (
              <li key={s.name}>
                <strong>{s.name}.</strong> {s.text}
              </li>
            ))}
          </ol>

          <h2>Why tailoring beats a &quot;perfect&quot; generic resume</h2>
          <p>
            Most mid-size and large employers screen applications with an
            applicant tracking system before a person reads them. The ATS
            ranks resumes partly on how closely their language matches the
            posting. A polished generic resume loses to a rougher tailored one
            on that comparison — every time the keywords differ.
          </p>
          <p>
            Tailoring also changes the human read. Recruiters skim for
            relevance signals in seconds; when your top bullets restate their
            own requirements with evidence, the decision to interview gets
            easy. See{" "}
            <Link href="/guides/ats-friendly-resume">
              what makes a resume ATS-friendly
            </Link>{" "}
            for the formatting half of the equation.
          </p>

          <div className="cta-banner">
            <h2>ResumeCraft does these five steps for you</h2>
            <p>Upload resume → paste job description → tailored draft + ATS score.</p>
            <CTA page={PAGE} label="Tailor mine now" />
          </div>

          <FaqBlock items={faq} />
        </article>
      </main>
      <SiteFooter />
    </>
  );
}
