import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { createMetadata } from "@/lib/seo";
import { HOME_ABSOLUTE_TITLE } from "@/lib/seo/titles";
import { JsonLd } from "@/components/seo/JsonLd";
import { softwareApplicationSchema } from "@/lib/seo/schema";
import { siteConfig } from "@/lib/site";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { CTA } from "@/components/marketing/CTA";
import { FaqBlock, type QA } from "@/components/marketing/FaqBlock";

const PAGE = "/";

export const metadata: Metadata = createMetadata({
  title: HOME_ABSOLUTE_TITLE,
  absoluteTitle: true,
  description:
    "AI ATS resume optimizer: upload your resume, tailor it to any job description, get an ATS score, then export PDF or LaTeX. Free to start.",
  path: PAGE,
  // Reciprocal hreflang with the India page.
  languages: { en: "/", "en-IN": "/in", "x-default": "/" },
});

const faq: QA[] = [
  {
    question: "What does Krafiter do?",
    answer:
      "Krafiter is an AI ATS resume optimizer. You upload your existing resume, paste the job description you are applying for, and the AI rewrites and reorders your content to match it — then scores the result for ATS compatibility and exports a polished PDF or LaTeX file.",
  },
  {
    question: "Is Krafiter free?",
    answer:
      "Yes to start. You get 25 free credits on signup — enough for 12 Quick, 5 Balanced, or 3 Deep runs — and run the full flow (upload, AI tailoring, ATS score, PDF export) before paying. See Pricing for paid plans in your currency.",
  },
  {
    question: "What is an ATS score?",
    answer:
      "An ATS score estimates how well your resume will parse and how closely it matches this job description — structure, formatting, and keywords. It does not guarantee an interview; humans still decide. Use it to find and fix gaps before you apply.",
  },
  {
    question: "Can I export my resume to LaTeX?",
    answer:
      "Yes. Alongside PDF, Krafiter exports clean LaTeX source — a typeset-quality format popular with developers, researchers, and academics. LaTeX is an export format after you optimize, not a separate builder product.",
  },
];

export default function HomePage() {
  return (
    <>
      <SiteHeader page={PAGE} />
      <main>
        <JsonLd data={softwareApplicationSchema()} />

        {/* 1. Hero — brand + optimizer promise + CTAs + cockpit (SSR; CSS tilt) */}
        <section className="hero container hero-creative">
          <p className="hero-brand">{siteConfig.name}</p>
          <h1>
            See your ATS match,{" "}
            <br />
            <em>then fix it for this job</em>
          </h1>
          <p className="lede">
            Upload your resume, paste this job description, see what’s
            missing, and rewrite for that posting — free to start.
          </p>
          <div className="actions">
            <CTA page={PAGE} label="Optimize my resume — free" />
          </div>

          <div className="hero-stage">
            <div className="hero-product">
              <div className="hero-cockpit">
                <div className="cockpit-score">
                  <p className="cockpit-kicker">Match for this job</p>
                  <div className="score-orbit">
                    <span className="score-value">89</span>
                    <span className="score-caption">62 → 89</span>
                  </div>
                  <ul className="signal-pills">
                    <li>JD keywords covered</li>
                    <li>Parseable structure</li>
                    <li>Bullets match the posting</li>
                  </ul>
                  <p className="muted">
                    Alignment with this job description — not a promise of an
                    interview.
                  </p>
                </div>
                <div className="cockpit-diff">
                  <p className="cockpit-kicker">Bullet transformation</p>
                  <div className="diff-card before">
                    <span className="diff-label">Before</span>
                    <p>Managed projects and worked with team on deliverables.</p>
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
              </div>
            </div>
          </div>
        </section>

        <section className="container">
          <div className="signal-ticker" aria-label="Product flow">
            <p>
              <span>UPLOAD</span>
              <span>PASTE JD</span>
              <span>ATS SCORE</span>
              <span>REWRITE</span>
              <span>PDF / LATEX EXPORT</span>
              <span>UPLOAD</span>
              <span>PASTE JD</span>
              <span>ATS SCORE</span>
              <span>REWRITE</span>
              <span>PDF / LATEX EXPORT</span>
            </p>
          </div>
        </section>

        <section className="section container resume-gallery-section">
          <h2 className="section-title-motion">Resume in motion</h2>
          <p className="section-lede">
            From raw document to ATS match to rewritten bullets — the loop
            recruiters never see.
          </p>
          <ul className="resume-gallery reveal-stagger">
            <li className="resume-shot">
              <Image
                src="/marketing/resume-paper.png"
                alt="Clean ATS-friendly resume document on warm paper"
                width={640}
                height={640}
                className="resume-shot-img"
              />
              <p className="resume-shot-caption">Upload a structured resume</p>
            </li>
            <li className="resume-shot">
              <Image
                src="/marketing/resume-ats-score.png"
                alt="Resume beside a teal ATS match score ring showing 92"
                width={640}
                height={640}
                className="resume-shot-img"
              />
              <p className="resume-shot-caption">See your ATS match score</p>
            </li>
            <li className="resume-shot">
              <Image
                src="/marketing/resume-rewrite.png"
                alt="Before and after resume bullet rewrite with stronger impact lines"
                width={640}
                height={640}
                className="resume-shot-img"
              />
              <p className="resume-shot-caption">Rewrite for the job</p>
            </li>
          </ul>
        </section>

        {/* 2. How it works */}
        <section className="section container">
          <h2 className="section-title-motion">How it works</h2>
          <p className="section-lede">
            Five steps from upload to recruiter-ready export. No guesswork.
          </p>
          <ul className="bento-grid reveal-stagger">
            <li className="card motion-card">
              <span className="step-number">01 Upload</span>
              <h3>Drop your resume</h3>
              <p>
                PDF or DOCX — the parser extracts your experience, skills, and
                education automatically.
              </p>
            </li>
            <li className="card motion-card">
              <span className="step-number">02 Paste JD</span>
              <h3>Add the job description</h3>
              <p>
                Paste the posting you are applying for so keyword match and
                rewrite stay grounded in that role.
              </p>
            </li>
            <li className="card motion-card">
              <span className="step-number">03 Score</span>
              <h3>See your ATS score</h3>
              <p>
                12 parallel analyzers score compatibility with this posting.
                Spot gaps with the{" "}
                <Link href="/ats-checker">ATS resume checker</Link> before you
                rewrite.
              </p>
            </li>
            <li className="card motion-card">
              <span className="step-number">04 Rewrite</span>
              <h3>Optimize bullets</h3>
              <p>
                AI rewrites and reorders content for the JD — stronger verbs,
                clearer impact, better keyword coverage.
              </p>
            </li>
            <li className="card motion-card">
              <span className="step-number">05 Export</span>
              <h3>Download and apply</h3>
              <p>
                Recruiter-ready PDF, or LaTeX source for full typographic
                control.
              </p>
            </li>
          </ul>
        </section>

        {/* 3. Problems we solve */}
        <section className="section container">
          <h2 className="section-title-motion">Problems we solve</h2>
          <p className="section-lede">
            Real job-seeker blockers — mapped to the product loop, not generic
            resume advice.
          </p>
          <ul className="card-grid reveal-stagger">
            <li className="card motion-card">
              <h3>
                <Link href="/ats-checker">ATS rejected or unknown score</Link>
              </h3>
              <p>
                See how applicant tracking systems read your resume — score,
                structure, and keyword gaps — before you apply again.
              </p>
            </li>
            <li className="card motion-card">
              <h3>
                <Link href="/tailor-resume-to-job-description">
                  One resume for every job
                </Link>
              </h3>
              <p>
                Tailor your resume to each job description so keywords and
                bullets match what this employer asked for.
              </p>
            </li>
            <li className="card motion-card">
              <h3>
                <Link href="/resume-optimization">Weak bullets, low match</Link>
              </h3>
              <p>
                Optimize vague experience lines into ATS-friendly, role-specific
                bullets with a measurable match lift.
              </p>
            </li>
            <li className="card motion-card">
              <h3>
                <Link href="/latex-resume-builder">Need PDF or LaTeX export</Link>
              </h3>
              <p>
                Ship a clean PDF for recruiters, or LaTeX source for engineers
                and academics who want typeset control.
              </p>
            </li>
          </ul>
        </section>

        {/* 4. Free tools */}
        <section className="section container">
          <h2 className="section-title-motion">Free tools — no signup</h2>
          <p className="section-lede">
            Check your ATS score with no signup, then compare your resume
            against a job description before you optimize in the app.
          </p>
          <ul className="card-grid reveal-stagger">
            <li className="card motion-card">
              <h3>
                <Link href="/ats-checker">ATS score checker — no signup</Link>
              </h3>
              <p>
                Upload your resume for a full ATS score, performance heatmap,
                and actionable issues — no account, no email required.
              </p>
            </li>
            <li className="card motion-card">
              <h3>
                <Link href="/tools/jd-match-checker">JD match with resume</Link>
              </h3>
              <p>
                Upload your resume and paste a job description to see which
                keywords match and which are still missing.
              </p>
            </li>
          </ul>
        </section>

        <div className="container">
          <FaqBlock items={faq} />

          <div className="cta-banner">
            <h2>Ready to optimize for this job?</h2>
            <p>Upload, paste a JD, score, rewrite, export. Free to start.</p>
            <CTA page={PAGE} label="Optimize my resume — free" />
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
