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

const SLUG = "fresher-resume-format";
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
    question: "What is the best fresher resume format for campus placement?",
    answer:
      "One page, education-first, single column, standard headings, projects with tools named. That structure parses in ATS used by campus drives and off-campus portals better than multi-column designs or photo-heavy biodata layouts.",
  },
  {
    question: "Should Indian fresher resumes include personal details like father name or photo?",
    answer:
      "Skip biodata fields unless a specific employer form requires them. Photo, religion, marital status, and parent names waste space and can introduce bias; they rarely help ATS matching.",
  },
  {
    question: "Where do I put internships on a fresher resume?",
    answer:
      "Above or directly below education when they are relevant - with dates, tools, and one or two quantified bullets. Thin or unrelated internships can sit lower or be omitted if projects are stronger.",
  },
  {
    question: "Do fresher resumes need a declaration at the bottom?",
    answer:
      "No for most modern applications. A declaration line is outdated for ATS and email applications. Use that space for skills, projects, or a clean contact line instead.",
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
          <h1>Fresher resume format</h1>
          <p className="meta">Updated {meta.datePublished}</p>

          <p className="answer">
            A fresher resume format for India and campus hiring is
            education-first, one page, and ATS-safe: no biodata clutter, clear
            projects with tools named, and keywords from the job or drive
            posting. For how ATS treats campus uploads and the full build
            order, start with{" "}
            <Link href="/guides/college-fresher-resume-ats">
              college fresher resume and how ATS works
            </Link>
            . Score the match before you upload to portals.
          </p>

          <h2>Step 1: Education-first, biodata last (or never)</h2>
          <p>
            Lead with degree, institute, dates, and relevant coursework. Drop
            photo, father name, religion, and hobby lists unless a form
            explicitly asks. More India-focused context is on{" "}
            <Link href="/in">Krafiter India</Link> and{" "}
            <Link href="/ats-resume-checker-india">
              ATS resume checker for India
            </Link>
            .
          </p>

          <h2>Step 2: Projects that look like work evidence</h2>
          <p>
            Two to four projects with problem, stack, and outcome beat long
            objective paragraphs. Mirror patterns from{" "}
            <Link href="/resume-examples/software-engineer">
              software engineer
            </Link>{" "}
            or{" "}
            <Link href="/resume-examples/data-analyst">data analyst</Link>{" "}
            examples at student depth - tools named exactly as in the posting.
          </p>

          <h2>Step 3: ATS-safe layout</h2>
          <p>
            Single column, standard headings (Education, Projects, Skills,
            Internships), selectable text. Avoid tables and text in images.
            Details in{" "}
            <Link href="/guides/ats-friendly-resume">
              what is an ATS-friendly resume
            </Link>
            .
          </p>

          <h2>Step 4: Check against the drive or job posting</h2>
          <p>
            Run an{" "}
            <Link href="/ats-checker">ATS checker</Link> or{" "}
            <Link href="/tools/jd-match-checker">JD match checker</Link>, close
            honest keyword gaps, then export PDF or LaTeX via{" "}
            <Link href="/resume-optimization">resume optimization</Link> - not
            decorative templates that break parsers.
          </p>

          <div className="cta-banner">
            <h2>Check your fresher resume for ATS</h2>
            <p>Free score against a campus or first-job posting.</p>
            <CTA page={PAGE} label="Check my ATS score - free" />
          </div>

          <FaqBlock items={faq} />
        </article>
      </main>
      <SiteFooter />
    </>
  );
}
