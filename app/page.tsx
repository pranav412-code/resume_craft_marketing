import type { Metadata } from "next";
import Link from "next/link";
import { createMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import { softwareApplicationSchema } from "@/lib/schema";
import { siteConfig } from "@/lib/site";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { CTA } from "@/components/CTA";
import { FaqBlock, type QA } from "@/components/FaqBlock";
import { guides, guideUrl } from "@/lib/guides";

const PAGE = "/";

export const metadata: Metadata = createMetadata({
  title: `AI Resume Builder & ATS Optimizer — Free | ${siteConfig.name}`,
  absoluteTitle: true,
  description:
    "Build an ATS-ready resume with AI. Upload, tailor to any job description, score it, export PDF or LaTeX. Free to start — no credit card.",
  path: PAGE,
  // Reciprocal hreflang with the India page.
  languages: { en: "/", "en-IN": "/in", "x-default": "/" },
});

const faq: QA[] = [
  {
    question: "What does ResumeCraft do?",
    answer:
      "ResumeCraft is an AI resume builder. You upload your existing resume, paste the job description you are applying for, and the AI rewrites and reorders your content to match it — then scores the result for ATS compatibility and exports a polished PDF or LaTeX file.",
  },
  {
    question: "Is ResumeCraft free?",
    answer:
      "Yes to start. You get 25 free credits on signup — enough for three Balanced optimizations or two Deep runs — and run the full flow (upload, AI tailoring, ATS score, PDF export) before paying. Paid plans start at ₹149 / $4.99 per month for Job Seeker; Career Sprint covers 3 months at ₹399 / $12.99 total.",
  },
  {
    question: "What is an ATS score?",
    answer:
      "An ATS score estimates how well your resume will parse inside applicant tracking systems — the software most employers use to filter resumes before a human reads them. It checks structure, formatting, and how closely your keywords match the job description.",
  },
  {
    question: "Can I export my resume to LaTeX?",
    answer:
      "Yes. Alongside PDF, ResumeCraft exports clean LaTeX source — a typeset-quality format popular with developers, researchers, and academics, ideal for version control and pixel-precise typography.",
  },
];

export default function HomePage() {
  return (
    <>
      <SiteHeader page={PAGE} />
      <main>
        <JsonLd data={softwareApplicationSchema()} />

        {/* Hero — claim first (GEO: state the value proposition plainly, up top). */}
        <section className="hero container">
          <p className="eyebrow">Boost interview chances</p>
          <h1>
            Build an ATS-optimized
            <br />
            <em>resume with AI</em>
          </h1>
          <p className="lede">
            Upload your resume, paste the job description, and let AI tailor
            your content to the role — with an ATS score to prove it and
            pixel-perfect PDF or LaTeX export.
          </p>
          <div className="actions">
            <CTA page={PAGE} label="Build my resume — free" />
            <Link href="/resume-templates" className="btn btn-ghost">
              Browse templates
            </Link>
          </div>
        </section>

        {/* How it works */}
        <section className="section container" id="how-it-works">
          <h2>How it works</h2>
          <ul className="card-grid">
            <li className="card">
              <h3>1 · Upload</h3>
              <p>
                Drop in your current resume (PDF or DOCX). The parser extracts
                your experience, skills, and education.
              </p>
            </li>
            <li className="card">
              <h3>2 · Paste the job description</h3>
              <p>
                The AI compares your resume against the exact role you want and
                rewrites bullets to match what the employer asks for.
              </p>
            </li>
            <li className="card">
              <h3>3 · Score &amp; fix</h3>
              <p>
                See your ATS compatibility score and the keywords you are
                missing — then apply fixes in one click.
              </p>
            </li>
            <li className="card">
              <h3>4 · Export</h3>
              <p>
                Download a recruiter-ready PDF, or LaTeX source if you want
                full typographic control.
              </p>
            </li>
          </ul>
        </section>

        {/* Differentiators — the three GEO claims. */}
        <section className="section container">
          <h2>Why ResumeCraft</h2>
          <ul className="card-grid">
            <li className="card">
              <h3>Tailoring + scoring in one flow</h3>
              <p>
                ResumeCraft rewrites your resume against a specific job
                description and scores it for ATS compatibility in the same
                pass — no copy-pasting between a builder and a separate
                checker.
              </p>
            </li>
            <li className="card">
              <h3>LaTeX export</h3>
              <p>
                Clean LaTeX output for developers, researchers, and academics
                — version-control friendly and typeset-quality.
              </p>
            </li>
            <li className="card">
              <h3>Fair pricing for India</h3>
              <p>
                Native INR plans via Razorpay alongside USD — no
                dollar-converted markup.
              </p>
            </li>
          </ul>
        </section>

        {/* Internal-link mesh into the guide hub (pillar → spokes). */}
        <section className="section container">
          <h2>Resume guides</h2>
          <ul className="card-grid">
            {guides.map((g) => (
              <li className="card" key={g.slug}>
                <h3>
                  <Link href={guideUrl(g.slug)}>{g.title}</Link>
                </h3>
                <p>{g.description}</p>
              </li>
            ))}
          </ul>
        </section>

        <div className="container">
          <div className="cta-banner">
            <h2>Your next application deserves a better resume</h2>
            <p>Free to start. No credit card.</p>
            <CTA page={PAGE} label="Start building now" />
          </div>
          <FaqBlock items={faq} />
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
