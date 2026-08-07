import type { Metadata } from "next";
import Link from "next/link";
import { createMetadata, absoluteUrl } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { articleSchema, breadcrumbSchema } from "@/lib/seo/schema";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { CTA } from "@/components/marketing/CTA";
import { FaqBlock, type QA } from "@/components/marketing/FaqBlock";
import { guides } from "@/lib/content/guides";

const SLUG = "tailor-resume-to-job-description-guide";
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
    question: "How long should it take to tailor a resume to a job description?",
    answer:
      "With a strong master resume, focused tailoring usually takes 15–30 minutes: extract requirements, adjust skills and top bullets, then score the match. AI-assisted rewrite against the posting can compress the edit loop further without inventing experience.",
  },
  {
    question: "Do I need a different resume for every application?",
    answer:
      "You need a tailored copy for each posting that matters - not a rewrite from scratch. Keep one master file, duplicate it per job, and change keywords, ordering, and emphasis so the top third mirrors that description.",
  },
  {
    question: "What if I do not have every skill in the job description?",
    answer:
      "Cover what is true of you in the employer's wording, and skip or honestly de-emphasize hard requirements you lack. Stuffing keywords you cannot discuss in an interview fails both modern ATS heuristics and human screens.",
  },
  {
    question: "Where should tailored keywords appear?",
    answer:
      "In the skills section and demonstrated in recent bullets - ideally in the top third of the page. Mentions buried in page-two fluff rarely help recruiter keyword search or a six-second human skim.",
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
          <h1>How to tailor a resume to a job description</h1>
          <p className="meta">Updated {meta.datePublished}</p>

          <p className="answer">
            Tailoring a resume to a job description means rewriting one
            application copy so its skills, keywords, and top bullets mirror
            that posting - without inventing experience. Extract the
            requirements, close honest gaps in the employer&apos;s language,
            reorder for relevance, then score the match before you apply.
          </p>

          <h2>Step 1: Start from a master resume, not a blank page</h2>
          <p>
            Keep one strong, parseable master file with your full history.
            Duplicate it for each application. One-resume-fits-all applications
            lose when recruiters search the ATS for phrases from{" "}
            <em>this</em> posting. Format rules that keep the file readable are
            covered in{" "}
            <Link href="/guides/ats-friendly-resume">
              what is an ATS-friendly resume
            </Link>
            .
          </p>

          <h2>Step 2: Extract requirements from the job description</h2>
          <p>
            Highlight hard requirements - tools, certifications, years, domain -
            and noun phrases the employer repeats. Those exact strings drive
            both ATS ranking and recruiter Ctrl-F habits. A focused walkthrough
            of keyword extraction lives in{" "}
            <Link href="/guides/resume-keywords-from-job-description">
              resume keywords from a job description
            </Link>
            .
          </p>

          <h2>Step 3: Close gaps honestly and reorder the top third</h2>
          <p>
            For every requirement that is true of you, place it in the
            employer&apos;s wording in skills and in a quantified bullet near
            the top. Move less relevant history down. Role-specific examples -
            for instance a{" "}
            <Link href="/resume-examples/product-manager">
              product manager resume example
            </Link>{" "}
            - show how domain language should look when tailored.
          </p>

          <h2>Step 4: Score the match, rewrite, and export</h2>
          <p>
            Paste the posting into a JD-aware checker and fix what the score
            flags: missing keywords, weak bullets, structure issues. Krafiter
            follows upload → paste JD → score → AI rewrite → PDF/LaTeX. Start
            with the product flow on{" "}
            <Link href="/tailor-resume-to-job-description">
              tailor resume to job description
            </Link>{" "}
            or run a quick pass in the{" "}
            <Link href="/ats-checker">free ATS checker</Link>.
          </p>

          <h2>What tailoring is not</h2>
          <p>
            It is not synonym stuffing, white-on-white keywords, or copying the
            posting verbatim. Optimization describes real experience in the
            employer&apos;s vocabulary, ordered by relevance for that job.
          </p>

          <div className="cta-banner">
            <h2>Tailor this application in minutes</h2>
            <p>Upload your resume, paste the job description, and fix the gaps.</p>
            <CTA page={PAGE} label="Optimize my resume - free" />
          </div>

          <FaqBlock items={faq} />
        </article>
      </main>
      <SiteFooter />
    </>
  );
}
