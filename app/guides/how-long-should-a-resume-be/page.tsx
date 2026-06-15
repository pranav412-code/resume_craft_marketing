import type { Metadata } from "next";
import Link from "next/link";
import { createMetadata, absoluteUrl } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import { articleSchema, breadcrumbSchema } from "@/lib/schema";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { CTA } from "@/components/CTA";
import { FaqBlock, type QA } from "@/components/FaqBlock";
import { guides } from "@/lib/guides";

const SLUG = "how-long-should-a-resume-be";
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
    question: "Is a two-page resume ever acceptable?",
    answer:
      "Yes — when ten-plus years of relevant scope genuinely fill it. Senior engineers, managers, and specialists routinely run two pages. The rule is earned length: every line must compete for the target role; padding to look senior reads as the opposite.",
  },
  {
    question: "Can a resume be one and a half pages?",
    answer:
      "Avoid it. A trailing half page looks unfinished and wastes the reader's scan. Either cut back to a dense single page or restructure so the second page is at least two-thirds full.",
  },
  {
    question: "Does resume length matter to ATS software?",
    answer:
      "Parsers don't penalize length — recruiters do. The ATS stores everything; the human skims the first screen. Length is a human-attention decision: front-load the most relevant material regardless of page count.",
  },
  {
    question: "How long should a fresher's resume be?",
    answer:
      "One page, education first, with projects and internships carrying the evidence. Without years of experience to compress, a second page almost always signals filler rather than depth.",
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
          <h1>How long should a resume be?</h1>
          <p className="meta">Updated {meta.datePublished}</p>

          <p className="answer">
            One page for most candidates with under ten years of experience;
            two pages when senior scope genuinely fills them. Recruiters skim
            for seconds, so the first half-page must carry your strongest,
            most role-relevant material — length is earned by relevance, never
            by padding.
          </p>

          <h2>Resume length by career stage</h2>
          <ul>
            <li><strong>Student / fresher:</strong> one page. Education and projects lead.</li>
            <li><strong>1–9 years:</strong> one page, dense. Cut early roles to make room for recent impact.</li>
            <li><strong>10+ years / senior IC &amp; management:</strong> one or two pages. Compress roles older than ~15 years into one-liners.</li>
            <li><strong>Executive:</strong> two pages, achievement-led; detail lives in the interview, not the resume.</li>
            <li><strong>Academic/research (CV):</strong> no limit — that&apos;s a different document; see <Link href="/guides/cv-vs-resume">CV vs resume</Link>.</li>
          </ul>

          <h2>What do recruiters actually read?</h2>
          <p>
            Initial screens average seconds, not minutes, and attention
            concentrates on the top third of page one: title, summary, current
            role, first bullets. That is the real constraint behind the
            one-page rule — not printing costs. Whatever your total length,
            engineer that first screen: summary matched to the posting,
            strongest quantified achievement first, keywords visible without
            scrolling.
          </p>

          <h2>How to cut a resume that runs long</h2>
          <ul>
            <li>Drop bullets that don&apos;t support <em>this</em> application — the tailoring discipline in <Link href="/tailor-resume-to-job-description">tailor your resume</Link> usually frees half a page alone.</li>
            <li>Compress roles older than ten years to title + employer + one line.</li>
            <li>Delete &quot;references available on request&quot;, objectives, and address lines — dead weight.</li>
            <li>Merge overlapping bullets; keep the one with the number in it.</li>
            <li>Tighten formatting (margins 0.5–1in, 10–11pt body) before cutting content — but never below readable.</li>
          </ul>

          <div className="cta-banner">
            <h2>Let relevance decide the length</h2>
            <p>ResumeCraft trims to what the job description rewards — and shows the score.</p>
            <CTA page={PAGE} label="Optimize mine" />
          </div>

          <FaqBlock items={faq} />
        </article>
      </main>
      <SiteFooter />
    </>
  );
}
