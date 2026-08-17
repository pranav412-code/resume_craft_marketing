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

const SLUG = "college-fresher-resume-ats";
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
    question: "Does ATS reject college fresher resumes automatically?",
    answer:
      "Usually no. The ATS stores your file as searchable fields. If it cannot parse your sections, or recruiters search for tools you never named, your resume never appears in the shortlist. Quiet miss, not a dramatic reject email.",
  },
  {
    question: "What should a college fresher put instead of work experience?",
    answer:
      "Education, 2–4 projects with named tools and an outcome, relevant coursework, internships or campus roles if they map to the posting, and a skills list that matches the job description honestly.",
  },
  {
    question: "How does ATS work on campus placement portals?",
    answer:
      "Same loop as off-campus: parse the PDF into name, education, skills, and dates; then rank or filter by keywords from the drive posting. Mass uploads make parse errors expensive — one broken layout can hide you from every recruiter on that drive.",
  },
  {
    question: "Should freshers write a long objective about career goals?",
    answer:
      "No. Replace it with two lines that name the role you are applying for and the two or three strengths the posting asks for. ATS and humans both read the top of the page first.",
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
          <h1>How college freshers build a resume that passes ATS</h1>
          <p className="meta">Updated {meta.datePublished}</p>

          <p className="answer">
            A college fresher resume that passes ATS is one page, education
            first, and built from projects and skills the posting actually
            names. Applicant tracking systems parse your PDF into fields, then
            recruiters search those fields — so layout and honest keywords
            decide whether a human ever opens the file.
          </p>

          <h2>How ATS works when you apply as a student</h2>
          <p>
            An applicant tracking system is the database behind campus
            portals, Naukri, LinkedIn Easy Apply, and most company career
            sites. You upload a resume. The software tries to extract name,
            email, degree, dates, skills, and project titles. Recruiters then
            type the same words that appear in the drive or job description —
            Python, Excel, Figma, Java, SQL — and only the rows that match
            show up.
          </p>
          <p>
            That is why a beautiful two-column template can fail a campus
            drive: the parser reads columns out of order, dumps your skills
            into the wrong field, or skips text sitting in a header. The
            recruiter is not “rejecting” you. They never see you. Formatting
            rules live in{" "}
            <Link href="/guides/ats-friendly-resume">
              what is an ATS-friendly resume
            </Link>
            ; Krafiter’s score dimensions are on{" "}
            <Link href="/how-ats-score-works">how the ATS score works</Link>.
          </p>

          <h2>What ATS reads when you have no job yet</h2>
          <p>
            ATS does not require a Work Experience heading. It needs labeled
            sections with selectable text. Education, Projects, Skills, and
            Internships parse as well as jobs — if the headings are standard
            and the tools are written the way the posting writes them. Empty
            “Experience: N/A” or a paragraph of career goals does not help
            search. Evidence does.
          </p>

          <h2>Build the resume: college fresher order</h2>
          <ol>
            <li>
              <strong>Header.</strong> Name, phone, email, city, GitHub or
              portfolio. No photo, father name, or declaration line for
              corporate and most campus forms. India layout detail:{" "}
              <Link href="/guides/fresher-resume-format">
                fresher resume format
              </Link>
              .
            </li>
            <li>
              <strong>Education first.</strong> Degree, institute, dates,
              CGPA if it helps, relevant coursework. This is the strongest
              structured signal you have.
            </li>
            <li>
              <strong>Projects as proof.</strong> Two to four items: problem,
              stack, outcome (users, grade, demo, what you shipped). Name
              tools exactly — React, not “web technologies.” Role patterns:{" "}
              <Link href="/resume-examples/software-engineer">
                software engineer
              </Link>{" "}
              and{" "}
              <Link href="/resume-examples/data-analyst">data analyst</Link>{" "}
              at student depth.
            </li>
            <li>
              <strong>Skills that match the posting.</strong> Hard skills from
              the JD you can defend in an interview. Skip “hardworking.”
            </li>
            <li>
              <strong>Internships and campus roles last (or skip).</strong>{" "}
              Keep them if they map to the job. Thin unrelated internships
              lose to a strong project. Internship-specific order:{" "}
              <Link href="/guides/resume-for-internship">
                internship resume guide
              </Link>
              .
            </li>
          </ol>
          <p>
            One page. If you have zero paid work, the same logic is in{" "}
            <Link href="/guides/resume-with-no-experience">
              resume with no experience
            </Link>
            .
          </p>

          <h2>Keywords from the campus drive, not a generic list</h2>
          <p>
            Copy the posting or drive brochure. Repeated tools and phrases are
            the search terms. Put the ones that are true of you in Skills and
            in project bullets. Do not invent production experience. How to
            extract terms:{" "}
            <Link href="/guides/resume-keywords-from-job-description">
              resume keywords from a job description
            </Link>
            .
          </p>

          <h2>Score it before you upload to the portal</h2>
          <p>
            Run a free{" "}
            <Link href="/ats-checker">ATS resume checker</Link> with that
            posting pasted in. Fix parse issues (tables, images-as-text) and
            close honest keyword gaps, then export a text-based PDF. Re-score
            once. Chasing 100 with stuffed skills fails the interview even if
            it passes the filter. Improve loop:{" "}
            <Link href="/guides/improve-ats-score">
              how to improve your ATS resume score
            </Link>
            .
          </p>

          <div className="cta-banner">
            <h2>Check a fresher resume against a real posting</h2>
            <p>
              Same 12-analyzer engine — no account. Paste the campus or
              first-job JD.
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
