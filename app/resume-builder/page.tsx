import type { Metadata } from "next";
import Link from "next/link";
import { createMetadata, absoluteUrl } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { softwareApplicationSchema, breadcrumbSchema } from "@/lib/seo/schema";
import { siteConfig } from "@/lib/site";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { CTA } from "@/components/marketing/CTA";
import { FaqBlock, type QA } from "@/components/marketing/FaqBlock";

const PAGE = "/resume-builder";

export const metadata: Metadata = createMetadata({
  title: "AI Resume Builder & Online Resume Maker",
  description:
    "AI resume builder and online resume maker: upload your draft, tailor it to any job description, get an ATS score, then export PDF or LaTeX. Free to start.",
  path: PAGE,
});

const faq: QA[] = [
  {
    question: "Is Krafiter a template gallery or an optimizer?",
    answer:
      "An optimizer first. You upload or draft once, then tailor to each job description with AI, score for ATS, and export. One ATS layout ships today plus LaTeX export — not a multi-template Canva-style gallery.",
  },
  {
    question: "How is an AI resume builder different from a template editor?",
    answer:
      "A template editor formats what you type. Krafiter rewrites content against a target job description, surfaces missing keywords, strengthens bullets, and orders sections so the most relevant material appears first — then scores the result.",
  },
  {
    question: "Will my resume still sound like me?",
    answer:
      "Yes. The AI starts from your real experience - it rephrases and prioritizes; it does not invent jobs or skills. You review and edit every suggestion before exporting.",
  },
  {
    question: "Do I need to start from scratch?",
    answer:
      "No. Upload your existing resume as PDF or DOCX and Krafiter parses it into structured sections automatically. Most users go from upload to a tailored, scored resume in under ten minutes.",
  },
];

export default function ResumeBuilderPage() {
  return (
    <>
      <SiteHeader page={PAGE} />
      <main>
        <JsonLd
          data={[
            softwareApplicationSchema(),
            breadcrumbSchema([
              { name: "Home", url: absoluteUrl("/") },
              { name: "AI Resume Builder", url: absoluteUrl(PAGE) },
            ]),
          ]}
        />

        <section className="hero container hero-creative rb-hero">
          <p className="hero-brand">{siteConfig.name}</p>
          <h1>
            AI resume builder that
            <br />
            <em>tailors, scores, and exports</em>
          </h1>
          <p className="lede">
            Upload or draft once, tailor every bullet to the job description,
            get an ATS score, then export PDF or LaTeX — free to start.
          </p>
          <div className="actions">
            <CTA page={PAGE} label="Build my resume — free" />
            <Link
              href="/tailor-resume-to-job-description"
              className="btn btn-ghost"
            >
              See how tailoring works
            </Link>
          </div>

          <div className="hero-stage">
            <div className="hero-product">
              <div className="hero-cockpit">
                <div className="cockpit-score">
                  <p className="cockpit-kicker">Builder match snapshot</p>
                  <div className="score-orbit">
                    <span className="score-value">90</span>
                    <span className="score-caption">ATS Match</span>
                  </div>
                  <ul className="signal-pills">
                    <li>Keyword coverage</li>
                    <li>Structure clear</li>
                    <li>Export-ready</li>
                  </ul>
                </div>
                <div className="cockpit-diff">
                  <p className="cockpit-kicker">JD-tailored rewrite</p>
                  <div className="diff-card before">
                    <span className="diff-label">Before</span>
                    <p>
                      Responsible for reporting and collaborating with the team
                      on projects.
                    </p>
                  </div>
                  <div className="diff-arrow" aria-hidden="true">
                    →
                  </div>
                  <div className="diff-card after">
                    <span className="diff-label">After</span>
                    <p>
                      Built weekly KPI dashboards for a 12-person product team,
                      cutting status meeting time by 30%.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="container">
          <div className="signal-ticker" aria-label="Builder flow">
            <p>
              <span>UPLOAD</span>
              <span>TAILOR TO JD</span>
              <span>ATS SCORE</span>
              <span>REWRITE</span>
              <span>PDF / LATEX</span>
              <span>UPLOAD</span>
              <span>TAILOR TO JD</span>
              <span>ATS SCORE</span>
              <span>REWRITE</span>
              <span>PDF / LATEX</span>
            </p>
          </div>
        </section>

        <section className="section container">
          <h2 className="section-title-motion">One loop per application</h2>
          <p className="section-lede">
            An optimizer-led builder — not a template gallery. Same upload,
            stronger match for each job you apply to.
          </p>
          <ol className="builder-spine reveal-stagger">
            <li className="builder-spine__step motion-card">
              <span className="step-number">01</span>
              <div>
                <h3>Upload or draft</h3>
                <p>
                  Drop a PDF or DOCX — we parse experience, skills, and
                  education into structured sections. Or start from a blank
                  draft.
                </p>
              </div>
            </li>
            <li className="builder-spine__step motion-card">
              <span className="step-number">02</span>
              <div>
                <h3>Paste JD + tailor bullets</h3>
                <p>
                  Paste the job post. AI maps your experience to its
                  requirements and rewrites bullets to close gaps honestly.
                </p>
              </div>
            </li>
            <li className="builder-spine__step motion-card builder-spine__step--accent">
              <span className="step-number">03</span>
              <div>
                <h3>ATS compatibility score</h3>
                <p>
                  Every draft is scored for structure, parseability, and
                  keyword coverage. Run the{" "}
                  <Link href="/ats-checker">free ATS resume checker</Link> on
                  any version.
                </p>
              </div>
            </li>
            <li className="builder-spine__step motion-card">
              <span className="step-number">04</span>
              <div>
                <h3>Export PDF &amp; LaTeX</h3>
                <p>
                  One-click recruiter-ready PDF, or LaTeX source for full
                  control via{" "}
                  <Link href="/latex-resume-builder">LaTeX resume export</Link>.
                  Keep a tailored version for every application.
                </p>
              </div>
            </li>
          </ol>
        </section>

        <section className="section container rb-proof">
          <h2 className="section-title-motion">
            Same experience. Stronger match for this job.
          </h2>
          <p className="section-lede">
            Illustrative rewrite: weak generic line → JD-aligned bullet with a
            clearer ATS signal.
          </p>
          <div className="rb-proof__panel">
            <div className="rb-proof__diff">
              <div className="diff-card before">
                <span className="diff-label">Before</span>
                <p>
                  Managed projects and worked with team on deliverables.
                </p>
              </div>
              <div className="diff-arrow" aria-hidden="true">
                →
              </div>
              <div className="diff-card after">
                <span className="diff-label">After</span>
                <p>
                  Led 6 cross-functional launches, delivering 98% on-time
                  milestones across product and engineering.
                </p>
              </div>
            </div>
            <div className="rb-proof__score">
              <p className="cockpit-kicker">Illustrative ATS match</p>
              <p className="rb-proof__score-value">90</p>
              <p className="rb-proof__score-note">
                Structure + keywords after tailor — not a guaranteed result.
              </p>
            </div>
          </div>
        </section>

        <div className="container">
          <div className="cta-banner cta-banner--mid">
            <h2>Ready to build your next version?</h2>
            <p>
              Upload once, then tailor for the role you want — free to start.
            </p>
            <CTA page={PAGE} label="Build my resume — free" />
          </div>

          <FaqBlock items={faq} />

          <div className="cta-banner">
            <h2>Stop sending the same resume everywhere</h2>
            <p>
              Keep a scored, job-specific version for every application. See how
              we compare in our{" "}
              <Link href="/best-ai-resume-builder-2026">
                2026 AI resume builder comparison
              </Link>
              .
            </p>
            <CTA page={PAGE} label="Build my resume — free" />
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
