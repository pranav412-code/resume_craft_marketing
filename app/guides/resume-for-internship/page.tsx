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

const SLUG = "resume-for-internship";
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
    question: "How long should an internship resume be?",
    answer:
      "One page. Campus and early-career recruiters move fast - education, skills, projects, and any prior internships or leadership roles should fit without dense multi-column layouts.",
  },
  {
    question: "Do I need work experience for an internship resume?",
    answer:
      "Not always. Strong projects, coursework, hackathons, and campus roles can carry the page when they mirror the internship posting's tools and responsibilities.",
  },
  {
    question: "Should internship resumes use the same keywords as full-time roles?",
    answer:
      "Use the keywords from that internship posting. Titles may say intern, but ATS still matches tools and phrases - Python, Excel, Figma, customer support - exactly as written when they are true of you.",
  },
  {
    question: "Is a GPA required on an internship resume?",
    answer:
      "Include GPA when it is strong or when the employer asks. Otherwise prioritize projects and skills that match the job description over a middling number that does not help screening.",
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
          <h1>Internship resume guide</h1>
          <p className="meta">Updated {meta.datePublished}</p>

          <p className="answer">
            An internship resume is one ATS-safe page: education, projects, and
            keywords copied honestly from the internship posting. Lead with
            proof you can contribute - tools used, outcomes, and campus work -
            then score the match before you apply.
          </p>

          <h2>Step 1: Match the internship posting</h2>
          <p>
            Paste the internship JD into an{" "}
            <Link href="/ats-checker">ATS resume checker</Link> or{" "}
            <Link href="/tools/jd-match-checker">JD match checker</Link>. Note
            required tools and soft skills. Your resume should cover what you
            can demonstrate from class, projects, or prior short roles.
          </p>

          <h2>Step 2: Format for campus and ATS</h2>
          <p>
            Education near the top, clear dates, standard section titles, single
            column. Quantify projects the way full-time examples do for{" "}
            <Link href="/resume-examples/software-engineer">
              software engineer
            </Link>{" "}
            or{" "}
            <Link href="/resume-examples/digital-marketing-manager">
              digital marketing
            </Link>
            , scaled to internship scope.
          </p>

          <h2>Step 3: Projects and keywords over fluff</h2>
          <p>
            Replace vague club descriptions with bullets that name tools and
            results. Keyword placement guidance is in{" "}
            <Link href="/guides/resume-keywords-from-job-description">
              resume keywords from a job description
            </Link>
            . Avoid stuffing skills you cannot discuss in a screening call.
          </p>

          <h2>Step 4: Tailor, score, export</h2>
          <p>
            Adjust summary and skills per posting, re-score, then export PDF or
            LaTeX. Use{" "}
            <Link href="/tailor-resume-to-job-description">
              tailor resume to job description
            </Link>{" "}
            when you want the product loop for internship applications.
          </p>

          <div className="cta-banner">
            <h2>Score your internship resume</h2>
            <p>Free ATS check against the internship you want.</p>
            <CTA page={PAGE} label="Check my ATS score - free" />
          </div>

          <FaqBlock items={faq} />
        </article>
      </main>
      <SiteFooter />
    </>
  );
}
