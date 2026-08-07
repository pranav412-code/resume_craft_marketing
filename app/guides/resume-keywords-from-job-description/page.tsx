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

const SLUG = "resume-keywords-from-job-description";
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
    question: "What counts as a resume keyword from a job description?",
    answer:
      "Hard skills, tools, certifications, job-title variants, and repeated noun phrases the employer uses for requirements. Soft skills matter less for ATS ranking unless the posting repeats them as must-haves - still show them through bullets when true.",
  },
  {
    question: "Should I use exact phrases or synonyms?",
    answer:
      "Prefer the posting's exact wording for critical tools and requirements - recruiter searches and many ATS rankers are literal. You can add a common synonym once if space allows, but exact match comes first.",
  },
  {
    question: "Where do I place keywords so they actually help?",
    answer:
      "Skills section plus evidence in recent experience bullets, especially in the top third of the page. A keyword that appears only in a dense footer skills dump is weaker than one proven in a quantified outcome.",
  },
  {
    question: "How do I know I covered enough keywords?",
    answer:
      "Run a JD match or ATS check against the same posting. Cover every requirement that is true of you; leave out requirements you cannot support. The goal is honest coverage, not a stuffed word cloud.",
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
          <h1>Resume keywords from a job description</h1>
          <p className="meta">Updated {meta.datePublished}</p>

          <p className="answer">
            Resume keywords from a job description are the tools, skills, and
            repeated phrases that posting uses for requirements. Pull them out,
            place the ones you can prove in skills and bullets, and verify
            coverage with a JD match - without stuffing language you cannot
            defend in an interview.
          </p>

          <h2>Step 1: Pull the keyword set from the posting</h2>
          <p>
            Read the responsibilities and requirements sections. Capture exact
            product names, frameworks, certifications, and phrases that appear
            more than once. Those strings are what recruiter ATS searches and
            many ranking features look for - synonyms alone often miss.
          </p>

          <h2>Step 2: Map keywords to proof on your resume</h2>
          <p>
            For each keyword that is true of you, ensure it appears in a skills
            line and in at least one bullet that shows how you used it. Role
            pages such as{" "}
            <Link href="/resume-examples/frontend-developer">
              frontend developer
            </Link>{" "}
            illustrate how stack keywords should show up in context, not only in
            a dump list. Broader skill placement tips are in{" "}
            <Link href="/guides/resume-skills">skills to put on a resume</Link>.
          </p>

          <h2>Step 3: Prefer match over rewrite-from-scratch</h2>
          <p>
            You rarely need a new resume - you need Balanced coverage of true
            requirements, then a deeper rewrite only where bullets are weak.
            The product loop is: paste JD → see missing keywords → rewrite
            gaps → re-check. That is the same problem{" "}
            <Link href="/tailor-resume-to-job-description">
              tailor resume to job description
            </Link>{" "}
            solves end to end.
          </p>

          <h2>Step 4: Verify with a JD match or ATS score</h2>
          <p>
            Run the{" "}
            <Link href="/ats-checker">free ATS checker</Link> or continue in
            the optimizer so you see which keywords remain uncovered. Fix only
            honest gaps, then export. For score-focused tactics, see{" "}
            <Link href="/guides/improve-ats-score">
              how to improve your ATS resume score
            </Link>
            .
          </p>

          <h2>Keyword stuffing vs keyword match</h2>
          <p>
            Stuffing lists every noun from the posting without evidence.
            Matching describes your real work in the employer&apos;s vocabulary.
            Humans and stronger screening systems both punish the first and
            reward the second.
          </p>

          <div className="cta-banner">
            <h2>Check keyword coverage against the JD</h2>
            <p>Paste the posting, see missing keywords, and rewrite the gaps.</p>
            <CTA page={PAGE} label="Match my resume to a JD - free" />
          </div>

          <FaqBlock items={faq} />
        </article>
      </main>
      <SiteFooter />
    </>
  );
}
