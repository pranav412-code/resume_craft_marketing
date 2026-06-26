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

const SLUG = "cv-vs-resume";
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
    question: "Is a CV just a longer resume?",
    answer:
      "In the US sense, essentially yes in spirit but not in use: the academic CV is a complete career record (publications, grants, teaching) used for research and faculty roles, while a resume is a 1–2 page marketing document for industry jobs. In the UK, Europe, and India, 'CV' simply means what Americans call a resume.",
  },
  {
    question: "Which one do employers in India expect?",
    answer:
      "Indian employers say 'CV' and 'resume' interchangeably, but expect the same artifact: a concise 1–2 page document. Freshers commonly lead with education and projects. 'Biodata' is an older format including personal details — only use it where explicitly requested.",
  },
  {
    question: "Can I send a resume when a job asks for a CV?",
    answer:
      "Outside academia, yes — in the UK, Europe, India, and most of the world, the posting's 'CV' means a concise professional document, i.e. a resume. For academic, research, or medical positions, send a full academic CV with publications instead.",
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
          <h1>CV vs resume: what&apos;s the difference?</h1>
          <p className="meta">Updated {meta.datePublished}</p>

          <p className="answer">
            A resume is a 1–2 page document tailored to a specific job; a CV
            (curriculum vitae) in the US/academic sense is a complete,
            untailored record of a career — publications, research, teaching —
            that grows with time. Outside the US, &quot;CV&quot; usually just
            means resume.
          </p>

          {/* AEO table-snippet target. */}
          <h2>CV vs resume at a glance</h2>
          <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th></th>
                <th>Resume</th>
                <th>CV (academic sense)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Length</strong></td>
                <td>1–2 pages</td>
                <td>No limit; grows with career</td>
              </tr>
              <tr>
                <td><strong>Purpose</strong></td>
                <td>Industry job applications</td>
                <td>Academic, research, faculty, fellowships</td>
              </tr>
              <tr>
                <td><strong>Content</strong></td>
                <td>Selected, tailored achievements</td>
                <td>Complete record: publications, grants, teaching, talks</td>
              </tr>
              <tr>
                <td><strong>Tailoring</strong></td>
                <td>Per application</td>
                <td>Rarely changed; appended over time</td>
              </tr>
              <tr>
                <td><strong>Order</strong></td>
                <td>Most relevant first</td>
                <td>Conventional academic sections</td>
              </tr>
            </tbody>
          </table>
          </div>

          <h2>What does &quot;CV&quot; mean by region?</h2>
          <ul>
            <li><strong>United States &amp; Canada:</strong> &quot;resume&quot; for industry; &quot;CV&quot; reserved for academia/research/medicine.</li>
            <li><strong>UK, Ireland, Europe:</strong> &quot;CV&quot; is the standard word for the concise 1–2 page document — a resume by another name.</li>
            <li><strong>India:</strong> both words used loosely; employers expect a concise resume. &quot;Biodata&quot; survives in some government/matrimonial contexts only.</li>
            <li><strong>Australia &amp; NZ:</strong> &quot;CV&quot; and &quot;resume&quot; interchangeable; 2–3 pages tolerated.</li>
          </ul>

          <h2>Which should you send?</h2>
          <p>
            Applying to a company, anywhere in the world: a tailored resume
            (whatever the posting calls it). Applying for research, faculty,
            or medical-academic positions: a full academic CV. When in doubt,
            the presence of &quot;publications&quot; in the requirements is
            the tell. For building the former, start with{" "}
            <Link href="/guides/how-to-write-a-resume">how to write a resume</Link>.
          </p>

          <div className="cta-banner">
            <h2>Need the concise kind?</h2>
            <p>Build a tailored, ATS-scored resume in minutes — LaTeX export included for academics.</p>
            <CTA page={PAGE} label="Build it free" />
          </div>

          <FaqBlock items={faq} />
        </article>
      </main>
      <SiteFooter />
    </>
  );
}
