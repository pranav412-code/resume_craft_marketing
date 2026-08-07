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

const SLUG = "resume-with-no-experience";
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
    question: "Can I get interviews with a resume that has no job history?",
    answer:
      "Yes when education, projects, coursework, and activities prove skills the posting asks for. Recruiters hire first-job candidates on evidence of capability - not empty Experience sections padded with fluff.",
  },
  {
    question: "Should I put an objective on a no-experience resume?",
    answer:
      "Prefer a short targeted summary naming the role and two or three strengths tied to the job description. Vague objectives waste the top of the page that ATS and humans both read first.",
  },
  {
    question: "How many projects should I list?",
    answer:
      "Two to four strong ones beat a long list of tutorials. For each: problem, tools, and a result - users, grade, demo link, or what you learned that maps to the posting.",
  },
  {
    question: "Is a one-page resume required with no experience?",
    answer:
      "Yes in almost all cases. One page forces focus on education, skills, and projects that match the job. See length guidance in our how-long guide if you are unsure what to cut.",
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
          <h1>Resume with no experience</h1>
          <p className="meta">Updated {meta.datePublished}</p>

          <p className="answer">
            With no paid experience, lead with education and projects that prove
            the skills in the job description, keep one ATS-safe page, and
            mirror first-job keywords honestly. Score the match before you
            apply so missing tools and phrases show up early.
          </p>

          <h2>Step 1: Education and projects first</h2>
          <p>
            Place education, relevant coursework, and 2–4 projects above any
            thin work history. Name the stack and outcome - the same pattern
            used in{" "}
            <Link href="/resume-examples/frontend-developer">
              frontend developer
            </Link>{" "}
            and{" "}
            <Link href="/resume-examples/data-analyst">data analyst</Link>{" "}
            examples, scaled to student or career-starter depth.
          </p>

          <h2>Step 2: Pull keywords from the first-job posting</h2>
          <p>
            Use a{" "}
            <Link href="/tools/jd-match-checker">JD match checker</Link> or{" "}
            <Link href="/ats-checker">ATS checker</Link> with the internship or
            junior posting. Add tools and phrases you actually used in class or
            projects - never invent production experience you cannot discuss.
          </p>

          <h2>Step 3: Keep format parseable</h2>
          <p>
            Single column, standard headings, no graphics-as-text. Campus and
            India-focused structure tips live in{" "}
            <Link href="/guides/fresher-resume-format">
              fresher resume format
            </Link>{" "}
            and on{" "}
            <Link href="/in">Krafiter for India</Link>. Skip biodata fields
            that waste space and confuse parsers.
          </p>

          <h2>Step 4: Optimize and export</h2>
          <p>
            Close honest gaps, re-score, then export PDF or LaTeX. Krafiter{" "}
            <Link href="/resume-optimization">resume optimization</Link> is
            built for that loop - clean structure over decorative template
            promises.
          </p>

          <div className="cta-banner">
            <h2>Check your first-job ATS match</h2>
            <p>Free score against a real junior or internship posting.</p>
            <CTA page={PAGE} label="Check my ATS score - free" />
          </div>

          <FaqBlock items={faq} />
        </article>
      </main>
      <SiteFooter />
    </>
  );
}
