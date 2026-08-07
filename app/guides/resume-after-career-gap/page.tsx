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

const SLUG = "resume-after-career-gap";
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
    question: "Should I hide a career gap on my resume?",
    answer:
      "No. Omitting years or fudging dates creates bigger risk in background checks. Use honest date ranges and a brief, neutral line for caregiving, health, study, or layoff - then lead with recent skills and outcomes.",
  },
  {
    question: "Where do I explain the gap - resume or cover letter?",
    answer:
      "One short resume line is enough for many gaps; expand in the cover letter or interview if asked. Keep the resume focused on evidence of readiness: projects, coursework, freelance, or volunteer with dates.",
  },
  {
    question: "Will ATS reject resumes with employment gaps?",
    answer:
      "ATS systems parse dates; they do not auto-reject gaps by themselves. Recruiters and hiring managers notice gaps - clear structure, recent keywords, and a brief explanation reduce friction more than design tricks.",
  },
  {
    question: "What if I have freelance or caregiving work during the gap?",
    answer:
      "Include it when it shows relevant skills - client outcomes, tools used, volume handled. Label it clearly so parsers and humans understand the dates and context.",
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
          <h1>Resume after a career gap</h1>
          <p className="meta">Updated {meta.datePublished}</p>

          <p className="answer">
            After a career gap, explain dates honestly in one neutral line, lead
            with recent projects or upskilling, and keep a single-column
            ATS-safe layout. Score keyword match to the job you want now - the
            gap is context, not the headline of your resume.
          </p>

          <h2>Step 1: Lead with recent evidence</h2>
          <p>
            Put a targeted summary, skills, and any recent coursework, freelance,
            or volunteer work above older roles. Recruiters scan the top third
            first - give them proof you are current for roles like{" "}
            <Link href="/resume-examples/customer-service-representative">
              customer service
            </Link>{" "}
            or{" "}
            <Link href="/resume-examples/human-resources-manager">
              human resources
            </Link>
            .
          </p>

          <h2>Step 2: Explain the gap without oversharing</h2>
          <p>
            Use a brief, factual phrase (family care, medical leave, full-time
            study, company layoff) and exact years. Skip drama and long personal
            narratives on the resume. Details belong in conversation if asked.
          </p>

          <h2>Step 3: Keep structure ATS-safe</h2>
          <p>
            Standard headings, selectable text, no multi-column tricks. See{" "}
            <Link href="/guides/ats-friendly-resume">
              ATS-friendly resume formatting
            </Link>
            . Then run an{" "}
            <Link href="/ats-checker">ATS resume checker</Link> against the
            posting so gaps in keywords - not just calendar gaps - get fixed.
          </p>

          <h2>Step 4: Tailor and re-score before applying</h2>
          <p>
            Close honest keyword gaps, strengthen bullets, and re-check with a{" "}
            <Link href="/tools/jd-match-checker">JD match checker</Link>.
            Continue in{" "}
            <Link href="/resume-optimization">ATS resume optimization</Link>{" "}
            when you are ready to rewrite and export PDF or LaTeX.
          </p>

          <div className="cta-banner">
            <h2>Check readiness for the role you want</h2>
            <p>Free ATS score against a real job description - then fix gaps.</p>
            <CTA page={PAGE} label="Check my ATS score - free" />
          </div>

          <FaqBlock items={faq} />
        </article>
      </main>
      <SiteFooter />
    </>
  );
}
