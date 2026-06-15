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

const SLUG = "ats-friendly-resume";
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
    question: "Do ATS systems really reject resumes automatically?",
    answer:
      "Mostly no — the common failure is quieter. The ATS parses your resume into a database; recruiters then search and rank by keywords. A resume that parses badly or lacks the posting's terms isn't 'rejected', it just never surfaces in those searches.",
  },
  {
    question: "Are tables and columns always fatal to ATS parsing?",
    answer:
      "Not always — modern systems handle simple layouts better than older ones — but you can't know which system an employer runs. Single-column formatting removes the risk entirely, which is why it remains the standard advice for any ATS-screened application.",
  },
  {
    question: "Is PDF or DOCX better for ATS?",
    answer:
      "PDF, unless the posting explicitly asks for DOCX. Modern ATS software parses text-based PDFs reliably, and PDF preserves your layout for the human reader afterward. Avoid scanned/image PDFs — there is no text layer to parse.",
  },
  {
    question: "How do I know which keywords an ATS will look for?",
    answer:
      "Read the job description — recruiter searches are built from its language. The repeated tools, certifications, and noun phrases are the keyword set. Mirror the ones that are true of you, in the same wording, in your skills section and bullets.",
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
          <h1>What is an ATS-friendly resume?</h1>
          <p className="meta">Updated {meta.datePublished}</p>

          {/* Definition pattern + 40–60 words — the snippet target. */}
          <p className="answer">
            An ATS-friendly resume is one that applicant tracking system
            software can parse accurately: a single-column layout, standard
            section headings, real selectable text, common fonts, and wording
            that matches the job description&apos;s keywords. It ensures your
            content reaches the recruiter intact instead of arriving scrambled
            or unsearchable.
          </p>

          <h2>What is an applicant tracking system?</h2>
          <p>
            An applicant tracking system (ATS) is the software employers use
            to collect, parse, store, and rank job applications. When you
            apply online, the ATS converts your resume into structured data —
            name, titles, employers, dates, skills. Recruiters then search and
            filter that database by keywords rather than reading every file.
            Most large and mid-size employers screen this way, which is why
            formatting and keyword choices decide whether a human ever sees
            your experience.
          </p>

          <h2>Which formatting rules make a resume ATS-friendly?</h2>
          <ul>
            <li><strong>Single column.</strong> Multi-column layouts can scramble parsing order.</li>
            <li><strong>Standard headings.</strong> &quot;Work Experience&quot;, &quot;Skills&quot;, &quot;Education&quot; — parsers key on them.</li>
            <li><strong>Real text only.</strong> No text boxes, graphics, icons, or skill-bar images; that content is invisible or garbled to parsers.</li>
            <li><strong>Common fonts.</strong> Arial, Calibri, Georgia, Helvetica — and body text 10pt or larger.</li>
            <li><strong>No header/footer content.</strong> Some parsers skip them; keep contact details in the body.</li>
            <li><strong>Conventional dates.</strong> &quot;Jan 2023 – Mar 2025&quot; style ranges parse reliably.</li>
            <li><strong>Text-based PDF.</strong> Export, don&apos;t scan; check you can select the text.</li>
          </ul>

          <h2>How do keywords fit in?</h2>
          <p>
            Parsing gets your data into the database; keywords get it found.
            Recruiter searches are built from the job description&apos;s
            language, so the resume that mirrors it — exactly, not
            approximately (&quot;PostgreSQL&quot; when they say PostgreSQL,
            not &quot;databases&quot;) — ranks first. The tailoring workflow
            is covered step-by-step in{" "}
            <Link href="/tailor-resume-to-job-description">
              tailor your resume to the job description
            </Link>
            .
          </p>

          <h2>What does an ATS score measure?</h2>
          <p>
            A useful ATS score checks both halves: structure (does the file
            parse into clean fields?) and match (how much of the posting&apos;s
            keyword set does your content cover?). ResumeCraft scores every
            draft against the specific job description you paste and lists the
            missing keywords, so the fix is concrete rather than guesswork.
          </p>

          <div className="cta-banner">
            <h2>Check yours instead of wondering</h2>
            <p>Upload, paste the posting, see the score and the gaps.</p>
            <CTA page={PAGE} label="Score my resume" />
          </div>

          <FaqBlock items={faq} />
        </article>
      </main>
      <SiteFooter />
    </>
  );
}
