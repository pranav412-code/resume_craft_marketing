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

const SLUG = "resume-skills";
const PAGE = `/guides/${SLUG}`;
const meta = guides.find((g) => g.slug === SLUG)!;

export const metadata: Metadata = createMetadata({
  title: `${meta.title} (With Examples)`,
  description: meta.description,
  path: PAGE,
  type: "article",
});

const faq: QA[] = [
  {
    question: "How many skills should I list on a resume?",
    answer:
      "Eight to twelve in the skills section, all relevant to the target role. A longer list dilutes the strong signals and reads as padding. Skills beyond the section belong demonstrated inside experience bullets, not enumerated.",
  },
  {
    question: "Should I include soft skills on a resume?",
    answer:
      "Sparingly, and shown rather than claimed. 'Leadership' as a list item is noise; 'led a 6-person team through a zero-downtime migration' is evidence. Reserve list space for hard skills the job description names; let bullets carry the soft skills.",
  },
  {
    question: "What's the difference between hard and soft skills?",
    answer:
      "Hard skills are teachable, testable capabilities — Python, financial modeling, Figma, a nursing certification. Soft skills are working behaviors — communication, prioritization, teamwork. ATS keyword searches run almost entirely on hard skills, which is why they anchor the skills section.",
  },
  {
    question: "Should I rate my skill levels (bars, percentages)?",
    answer:
      "No. Skill bars and percentages are graphics an ATS cannot read and recruiters cannot calibrate — '80% Python' has no agreed meaning. If proficiency matters, state it in words ('advanced', '5 years') or prove it with a bullet.",
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
          <h1>Skills to put on a resume</h1>
          <p className="meta">Updated {meta.datePublished}</p>

          <p className="answer">
            Put the hard skills the job description explicitly names — tools,
            technologies, certifications, methods — using the posting&apos;s
            exact wording, plus two or three differentiators you can prove.
            List eight to twelve in a dedicated skills section and demonstrate
            the rest, including soft skills, inside quantified experience
            bullets.
          </p>

          <h2>How do you choose which skills to list?</h2>
          <p>
            Start from the job description, not from yourself. Extract every
            tool, method, and certification it mentions; that is the keyword
            set recruiters and ATS searches are built on (see{" "}
            <Link href="/guides/ats-friendly-resume">how ATS screening works</Link>).
            Keep the ones true of you, in the employer&apos;s wording. Then add
            a small number of differentiators — adjacent skills that set you
            apart for this role. Everything else is cut or moved into bullets.
          </p>

          <h2>Hard skills examples by role</h2>
          <ul>
            <li><strong>Software engineer:</strong> Python, TypeScript, React, PostgreSQL, AWS, Docker, CI/CD, system design.</li>
            <li><strong>Data analyst:</strong> SQL, Excel, Python (pandas), Tableau or Power BI, A/B testing, data modeling.</li>
            <li><strong>Digital marketer:</strong> SEO, Google Ads, GA4, email automation, copywriting, funnel analysis.</li>
            <li><strong>Registered nurse:</strong> patient assessment, IV therapy, EHR (Epic), medication administration, triage, BLS/ACLS.</li>
            <li><strong>Project manager:</strong> Agile/Scrum, Jira, stakeholder management, budgeting, risk tracking, roadmapping.</li>
            <li><strong>Accountant:</strong> GAAP, reconciliations, Tally or QuickBooks, financial reporting, GST/TDS (India), audit support.</li>
          </ul>

          <h2>Where do skills go on the resume?</h2>
          <p>
            Three placements, working together: a scannable{" "}
            <strong>skills section</strong> (the keyword anchor), woven into{" "}
            <strong>experience bullets</strong> as evidence (&quot;built ETL
            pipelines in Python/Airflow&quot;), and the two or three most
            role-defining ones in the <strong>summary</strong>. This
            redundancy is deliberate — sections get parsed, bullets get read.
          </p>

          <h2>Common skills-section mistakes</h2>
          <ul>
            <li>Listing soft-skill adjectives (&quot;motivated&quot;, &quot;team player&quot;) instead of capabilities.</li>
            <li>Synonym drift — writing &quot;JS&quot; when the posting says &quot;JavaScript&quot;; literal matching matters.</li>
            <li>Skill bars, star ratings, icon clouds — unreadable to parsers, meaningless to recruiters.</li>
            <li>One static list for every application instead of re-tailoring per posting.</li>
          </ul>

          <div className="cta-banner">
            <h2>Let the job description choose your skills</h2>
            <p>
              ResumeCraft extracts the posting&apos;s keyword set and shows
              which ones your resume is missing.
            </p>
            <CTA page={PAGE} label="Match my skills" />
          </div>

          <FaqBlock items={faq} />
        </article>
      </main>
      <SiteFooter />
    </>
  );
}
