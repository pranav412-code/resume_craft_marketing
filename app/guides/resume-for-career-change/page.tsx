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

const SLUG = "resume-for-career-change";
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
    question: "Should I use a functional resume for a career change?",
    answer:
      "Usually no. Chronological or hybrid formats parse more reliably in ATS and match what recruiters expect. Lead with a summary and skills mapped to the new field, then keep dated experience - reframed for transferable outcomes.",
  },
  {
    question: "How do I show transferable skills without looking vague?",
    answer:
      "Name the skill the posting uses, then prove it with a bullet from your prior industry - budget owned, stakeholders managed, systems shipped. Vague soft-skill lists without evidence fail both ATS keyword checks and human screens.",
  },
  {
    question: "Do I need a different resume for every career-change application?",
    answer:
      "Yes for keyword and summary focus. Keep a master version, then tailor the summary, skills order, and top bullets to each job description. Score the match before you submit.",
  },
  {
    question: "Where should I put career-change intent on the resume?",
    answer:
      "In a short professional summary aimed at the target role - not a long cover-letter paragraph. Pair it with skills and projects that mirror the new job description.",
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
          <h1>Resume for a career change</h1>
          <p className="meta">Updated {meta.datePublished}</p>

          <p className="answer">
            A career-change resume rewrites toward the new job: map transferable
            skills to the posting, reframe past bullets for outcomes the target
            role cares about, and score ATS keyword coverage against that job
            description - not your old industry title alone.
          </p>

          <h2>Step 1: Extract the new job description</h2>
          <p>
            Paste the target posting into a{" "}
            <Link href="/tools/jd-match-checker">JD match checker</Link> or{" "}
            <Link href="/ats-checker">ATS resume checker</Link>. List required
            skills, tools, and outcomes. Your rewrite goal is coverage of what
            you can honestly claim - not every buzzword on the page.
          </p>

          <h2>Step 2: Map transferable skills and evidence</h2>
          <p>
            For each requirement, write one proof line from prior work: project
            delivery →{" "}
            <Link href="/resume-examples/project-manager">project manager</Link>{" "}
            patterns; analysis and reporting →{" "}
            <Link href="/resume-examples/business-analyst">
              business analyst
            </Link>{" "}
            style bullets. Drop duties that only signal the old industry unless
            they prove a shared skill.
          </p>

          <h2>Step 3: Tailor summary, order, and keywords</h2>
          <p>
            Lead with a summary for the destination role, put matching skills
            high, and reorder bullets so the top third mirrors the posting.
            Deeper tactics are in{" "}
            <Link href="/guides/tailor-resume-to-job-description-guide">
              how to tailor a resume to a job description
            </Link>{" "}
            and the product flow at{" "}
            <Link href="/tailor-resume-to-job-description">
              tailor resume to job description
            </Link>
            .
          </p>

          <h2>Step 4: Score, rewrite, export</h2>
          <p>
            Close keyword gaps you can defend, re-score, then export a clean
            single-column PDF or LaTeX. Krafiter supports that loop without
            promising decorative template brands - structure and JD match come
            first.
          </p>

          <div className="cta-banner">
            <h2>Score your career-change match</h2>
            <p>
              Free ATS check against the role you want next - then optimize the
              gaps.
            </p>
            <CTA page={PAGE} label="Check my ATS score - free" />
          </div>

          <FaqBlock items={faq} />
        </article>
      </main>
      <SiteFooter />
    </>
  );
}
