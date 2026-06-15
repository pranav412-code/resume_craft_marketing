import type { Metadata } from "next";
import Link from "next/link";
import { createMetadata, absoluteUrl } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import { articleSchema, breadcrumbSchema, howToSchema } from "@/lib/schema";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { CTA } from "@/components/CTA";
import { FaqBlock, type QA } from "@/components/FaqBlock";
import { guides } from "@/lib/guides";

const SLUG = "how-to-write-a-resume";
const PAGE = `/guides/${SLUG}`;
const meta = guides.find((g) => g.slug === SLUG)!;

export const metadata: Metadata = createMetadata({
  title: `${meta.title} (Step-by-Step)`,
  description: meta.description,
  path: PAGE,
  type: "article",
});

const steps = [
  {
    name: "Pick the right format",
    text: "Use reverse-chronological order in a single-column layout with standard headings. It is what recruiters expect and what applicant tracking systems parse most reliably.",
  },
  {
    name: "Write the header",
    text: "Name, phone, email, city, and relevant links (LinkedIn, portfolio, GitHub). No photo for US/UK/India corporate applications; no full street address.",
  },
  {
    name: "Lead with a summary matched to the role",
    text: "Two to three lines stating your title, years of experience, and the two or three strengths the target job description asks for. Rewrite it per application.",
  },
  {
    name: "Build experience bullets on outcomes",
    text: "Start each bullet with a strong verb, state what you did, and quantify the result — 'cut deploy time 40%' beats 'responsible for deployments'. Three to six bullets per recent role.",
  },
  {
    name: "Add a targeted skills section",
    text: "List the hard skills the job description names, using its exact wording where true of you. Skip generic filler like 'hardworking'.",
  },
  {
    name: "Close with education and extras",
    text: "Degree, institution, year. Add certifications, publications, or projects when they support the target role. Freshers put education before experience.",
  },
  {
    name: "Tailor, score, and export",
    text: "Match the resume against the specific job description, check it parses cleanly in an ATS, fix missing keywords, and export as PDF unless the posting asks otherwise.",
  },
];

const faq: QA[] = [
  {
    question: "What is the best resume format in 2026?",
    answer:
      "Reverse-chronological, single column, standard section headings, common fonts, exported as PDF. It is the format recruiters expect and ATS software parses most accurately. Functional (skills-only) formats hide your work history and are widely treated as a red flag.",
  },
  {
    question: "Should I write a different resume for every job?",
    answer:
      "Keep one master resume, then tailor a copy per application: mirror the posting's keywords where they are true of you, reorder so the most relevant experience leads, and cut bullets that don't support that role. Tailoring is the highest-impact step in this guide.",
  },
  {
    question: "Do I need a summary or an objective?",
    answer:
      "A summary, in almost all cases. Objectives state what you want; summaries state what you offer — which is what the reader is screening for. The exception is a career change or first job, where a short objective can frame the transition.",
  },
  {
    question: "How far back should a resume go?",
    answer:
      "Ten to fifteen years for most careers. Older roles either drop off or compress into a one-line 'Earlier career' entry. Detail spent on a 2008 job is detail stolen from the role that wins this interview.",
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
              dateModified: meta.dateModified,
            }),
            breadcrumbSchema([
              { name: "Home", url: absoluteUrl("/") },
              { name: "Guides", url: absoluteUrl("/guides") },
              { name: meta.title, url: absoluteUrl(PAGE) },
            ]),
            howToSchema({
              name: "How to write a resume",
              description:
                "Seven steps from blank page to an ATS-ready, tailored resume.",
              steps,
            }),
          ]}
        />

        <article className="prose">
          <nav className="crumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link> / <Link href="/guides">Guides</Link> /{" "}
            {meta.title}
          </nav>
          <h1>How to write a resume in 2026</h1>
          <p className="meta">
            Updated {meta.dateModified ?? meta.datePublished}
          </p>

          {/* AEO answer block — 40–60 words, extractable. */}
          <p className="answer">
            To write a resume: choose a reverse-chronological single-column
            format, open with a role-matched summary, prove each job with
            quantified achievement bullets, list the hard skills the posting
            names, close with education — then tailor the wording to the
            specific job description and check it parses cleanly in an ATS
            before sending.
          </p>

          <h2>What are the steps to write a resume?</h2>
          <ol>
            {steps.map((s) => (
              <li key={s.name}>
                <strong>{s.name}.</strong> {s.text}
              </li>
            ))}
          </ol>

          <h2>What sections does a resume need?</h2>
          <p>
            Five core sections, in this order for experienced candidates:
            header, summary, work experience, skills, education. Freshers and
            students flip education above experience and may add projects or
            internships as a separate section. Optional sections —
            certifications, publications, volunteering — earn their place only
            when they support the target role. More on choosing skills in{" "}
            <Link href="/guides/resume-skills">skills to put on a resume</Link>.
          </p>

          <h2>How long should it be?</h2>
          <p>
            One page for under ten years of experience; two pages when senior
            scope genuinely requires it. The full reasoning, by career stage,
            is in{" "}
            <Link href="/guides/how-long-should-a-resume-be">
              how long should a resume be
            </Link>
            .
          </p>

          <h2>What makes it pass ATS screening?</h2>
          <p>
            Structure and keywords. Single column, real text (no graphics or
            text boxes), standard headings — and wording that mirrors the job
            description where it is true of you. The complete checklist is in{" "}
            <Link href="/guides/ats-friendly-resume">
              what is an ATS-friendly resume
            </Link>
            .
          </p>

          <div className="cta-banner">
            <h2>Skip the blank page entirely</h2>
            <p>
              Upload what you have — the AI rebuilds it against the job you
              want, with an ATS score.
            </p>
            <CTA page={PAGE} label="Write mine with AI" />
          </div>

          <FaqBlock items={faq} />
        </article>
      </main>
      <SiteFooter />
    </>
  );
}
