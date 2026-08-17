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

const SLUG = "ats-optimized-resume";
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
    question: "What is the difference between ATS-friendly and ATS optimized?",
    answer:
      "ATS-friendly means the file parses cleanly - structure, headings, fonts, no tables. ATS optimized goes further: the content is also tuned to a specific job description, so recruiter keyword searches surface it near the top. Friendly is the floor; optimized is the goal for each application.",
  },
  {
    question: "Can I optimize one resume for every job?",
    answer:
      "No - optimization is per posting. Recruiter searches are built from each job description's language, so the keyword set changes with every role. Keep one strong master resume, then tailor a copy per application. With AI assistance this takes minutes, not an hour.",
  },
  {
    question: "What ATS score should I aim for?",
    answer:
      "Aim for the score to stabilize after you have covered every requirement that is true of you - typically that lands in the high range. Chasing 100 by inserting keywords you cannot back up is counterproductive: it fails the moment a human reads the resume.",
  },
  {
    question: "Does an ATS optimized resume look worse to humans?",
    answer:
      "It should look better. The same edits that help parsers - standard headings, single column, requirement-matched bullets near the top, quantified outcomes - are what recruiters scan for in their first seconds with your resume.",
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
          <h1>How to create an ATS optimized resume</h1>
          <p className="meta">Updated {meta.datePublished}</p>

          {/* Definition pattern + 40–60 words - the snippet target. */}
          <p className="answer">
            An ATS optimized resume is one that both parses cleanly inside
            applicant tracking system software and covers the specific
            keywords a job description asks for. Optimization means checking
            the resume against the actual posting - measuring structure and
            keyword coverage - and fixing the gaps before you apply.
          </p>

          <h2>Step 1: Start from a parseable structure</h2>
          <p>
            No keyword work matters if the ATS cannot read the file. Use a
            single column, standard section headings, real selectable text,
            and conventional date ranges; keep contact details out of the
            header and footer. The full formatting checklist is in{" "}
            <Link href="/guides/ats-friendly-resume">
              what is an ATS-friendly resume
            </Link>
            .
          </p>

          <h2>Step 2: Extract the keyword set from the job description</h2>
          <p>
            Recruiter searches are built from the posting&apos;s own language.
            Pull out the hard requirements - tools, certifications, years of
            experience - and the noun phrases the employer repeats. Those
            exact phrases, not synonyms, are what both the ATS ranking and
            the recruiter&apos;s eyes key on.
          </p>

          <h2>Step 3: Close the gaps honestly</h2>
          <p>
            For every requirement that is true of your experience, make sure
            it appears in the employer&apos;s wording - in the skills section
            and demonstrated in a quantified bullet. Reorder so the most
            job-relevant material sits in the top third. The per-application
            workflow is covered step by step in{" "}
            <Link href="/tailor-resume-to-job-description">
              tailor your resume to a job description
            </Link>
            .
          </p>

          <h2>Step 4: Score, fix, and re-score</h2>
          <p>
            Optimization is a loop, not a one-off edit. Run the resume
            through the{" "}
            <Link href="/ats-checker">free ATS resume checker</Link> against
            the same posting: it measures parseability and keyword coverage,
            lists what is missing, and rewrites weak bullets with AI. Apply
            the fixes, re-run the check, and export once the score
            stabilizes.
          </p>

          <h2>What optimization does not mean</h2>
          <p>
            It does not mean stuffing keywords you cannot back up, hiding
            white-on-white text, or copying the posting verbatim. Modern
            systems and recruiters both catch this - and it collapses in the
            interview. Optimization is describing your real experience in the
            employer&apos;s vocabulary, ordered by relevance.
          </p>

          <div className="cta-banner">
            <h2>Optimize against the job, not a guess</h2>
            <p>
              Upload and paste the posting in the{" "}
              <Link href="/ats-checker">free ATS resume checker</Link>, then
              fix gaps in the app.
            </p>
            <CTA page={PAGE} label="Check my resume - free" />
          </div>

          <FaqBlock items={faq} />
        </article>
      </main>
      <SiteFooter />
    </>
  );
}
