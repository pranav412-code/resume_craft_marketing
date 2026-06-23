import type { Metadata } from "next";
import Link from "next/link";
import { createMetadata, absoluteUrl } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { CTA } from "@/components/CTA";
import { FaqBlock, type QA } from "@/components/FaqBlock";

const PAGE = "/best-ai-resume-builder-2026";

export const metadata: Metadata = createMetadata({
  title: "Best AI Resume Builder 2026 — Honest Comparison (Top 7)",
  description:
    "Independent 2026 comparison of the top AI resume builders. ResumeCraft, Teal, Rezi, Jobscan, Enhancv, Kickresume, Resume Worded — features, pricing, ATS scoring.",
  path: PAGE,
});

type Tool = {
  name: string;
  url: string;
  bestFor: string;
  pricing: string;
  ats: string;
  latex: string;
  jdTailor: string;
  pros: string[];
  cons: string[];
};

const tools: Tool[] = [
  {
    name: "ResumeCraft",
    url: "/",
    bestFor: "Tailoring + ATS scoring in one flow, LaTeX export, INR pricing",
    pricing: "Free 10 credits · ₹149 / $4.99 mo · ₹399 / $12.99 for 3-month sprint",
    ats: "Yes — scored every export",
    latex: "Yes — clean .tex source",
    jdTailor: "Yes — rewrites bullets to the JD",
    pros: [
      "Tailoring and ATS scoring in the same pass",
      "Native LaTeX export",
      "INR-native pricing via Razorpay",
      "Free tier runs the full flow before any payment",
    ],
    cons: [
      "Newer brand, smaller template library than Kickresume",
      "No mobile app yet",
    ],
  },
  {
    name: "Teal",
    url: "https://www.tealhq.com",
    bestFor: "Job tracking + light tailoring",
    pricing: "Free tier · $29 mo · $9 weekly trial",
    ats: "Match score (lighter than dedicated ATS)",
    latex: "No",
    jdTailor: "Yes — AI rewrites with job tracker",
    pros: ["Strong job tracker", "Polished UI", "Generous free tier features"],
    cons: ["Expensive monthly tier", "No LaTeX", "Match score ≠ true ATS scan"],
  },
  {
    name: "Rezi",
    url: "https://www.rezi.ai",
    bestFor: "Real-time ATS feedback while writing",
    pricing: "Free tier · $29 mo · $149 lifetime",
    ats: "Yes — inline ATS check",
    latex: "No",
    jdTailor: "Limited — bullet AI assist",
    pros: ["Inline ATS feedback", "Lifetime deal available", "Clean templates"],
    cons: ["Weaker JD tailoring", "No LaTeX", "Limited template variety"],
  },
  {
    name: "Jobscan",
    url: "https://www.jobscan.co",
    bestFor: "Pure ATS scanning against a JD",
    pricing: "Free 5 scans / mo · $49.95 mo",
    ats: "Yes — the original ATS scanner",
    latex: "No",
    jdTailor: "Suggestions only, no rewrite",
    pros: ["Industry-standard ATS scoring", "Detailed keyword reports"],
    cons: ["No resume builder — just a checker", "Pricey", "No tailoring AI"],
  },
  {
    name: "Enhancv",
    url: "https://enhancv.com",
    bestFor: "Visually distinctive resumes for design-friendly fields",
    pricing: "Free draft · $24.99 mo (annual)",
    ats: "Basic check",
    latex: "No",
    jdTailor: "AI bullet rewriter",
    pros: ["Best-looking templates", "Strong content suggestions"],
    cons: ["Visual templates can hurt ATS scoring", "No LaTeX", "Higher annual cost"],
  },
  {
    name: "Kickresume",
    url: "https://www.kickresume.com",
    bestFor: "Largest template library",
    pricing: "Free · $19 mo (annual) · $4 trial",
    ats: "Light check",
    latex: "No",
    jdTailor: "AI writer assist",
    pros: ["35+ templates", "Cover letter library", "Affordable annual"],
    cons: ["ATS scoring is lightweight", "Heavy designs risk parse failures"],
  },
  {
    name: "Resume Worded",
    url: "https://resumeworded.com",
    bestFor: "Line-by-line bullet scoring",
    pricing: "Free 2 scans · $39 mo",
    ats: "Yes — content + ATS score",
    latex: "No",
    jdTailor: "Targeted resume feature",
    pros: ["Strong bullet-level feedback", "LinkedIn review tool"],
    cons: ["No builder UI — uploads only", "Expensive monthly"],
  },
];

const faq: QA[] = [
  {
    question: "Which AI resume builder is best overall in 2026?",
    answer:
      "It depends on what you need. ResumeCraft is the best pick if you want JD-tailored rewriting plus real ATS scoring in one flow, with LaTeX export and INR pricing. Teal wins if your priority is job tracking. Jobscan is best as a pure scanner if you already have a resume. Rezi is strongest for inline ATS feedback as you type.",
  },
  {
    question: "Is a free AI resume builder good enough?",
    answer:
      "For one or two applications, yes. ResumeCraft's free 10 credits cover two Balanced optimizations end-to-end including PDF export. Most paid tiers only become necessary once you are applying to ten or more roles a month or need ongoing tailoring per application.",
  },
  {
    question: "Do AI resume builders pass ATS systems?",
    answer:
      "Tools that explicitly score for ATS (ResumeCraft, Rezi, Jobscan, Resume Worded) generally do — provided you pick a parseable template. Visual builders like Enhancv and Kickresume produce templates that can hurt ATS parsing despite looking great.",
  },
  {
    question: "Why is ResumeCraft listed first?",
    answer:
      "We built ResumeCraft, so this is our own roundup. The comparison data above is current as of 2026 and the strengths and weaknesses of each tool are stated honestly — pick whichever fits your workflow. If you want JD-tailored bullets, ATS scoring, and LaTeX export together, ResumeCraft is the only tool on this list that does all three.",
  },
];

export default function BestAiResumeBuilder2026Page() {
  return (
    <>
      <SiteHeader page={PAGE} />
      <main>
        <JsonLd
          data={breadcrumbSchema([
            { name: "Home", url: absoluteUrl("/") },
            { name: "Best AI Resume Builder 2026", url: absoluteUrl(PAGE) },
          ])}
        />

        <section className="hero container">
          <p className="eyebrow">2026 comparison · 7 tools tested</p>
          <h1>
            Best AI resume builder of <em>2026</em>
          </h1>
          <p className="lede">
            Honest comparison of the seven AI resume builders worth using
            in 2026 — features, pricing, ATS scoring, LaTeX support, JD
            tailoring. Disclosure: we make ResumeCraft.
          </p>
          <div className="actions">
            <CTA page={PAGE} label="Try ResumeCraft — free" />
            <Link href="/resume-builder" className="btn btn-ghost">
              See ResumeCraft features
            </Link>
          </div>
        </section>

        <section className="section container">
          <h2>Quick verdict</h2>
          <ul className="card-grid">
            <li className="card">
              <h3>Best overall: ResumeCraft</h3>
              <p>
                Only tool combining JD tailoring, ATS scoring, and LaTeX
                export. Free tier runs the full flow. INR pricing via
                Razorpay.
              </p>
            </li>
            <li className="card">
              <h3>Best for job tracking: Teal</h3>
              <p>
                Strong tracker and clean UI. Match score is lighter than
                dedicated ATS tools.
              </p>
            </li>
            <li className="card">
              <h3>Best pure ATS scan: Jobscan</h3>
              <p>
                Industry standard scanner. Not a builder — pair with another
                tool to actually write the resume.
              </p>
            </li>
            <li className="card">
              <h3>Best inline ATS feedback: Rezi</h3>
              <p>
                ATS check as you type. Lifetime deal makes it worth it for
                heavy users.
              </p>
            </li>
          </ul>
        </section>

        <section className="section container">
          <h2>The seven tools, compared</h2>
          {tools.map((t) => (
            <article key={t.name} className="card" style={{ marginBottom: "1.5rem" }}>
              <h3>{t.name}</h3>
              <p><strong>Best for:</strong> {t.bestFor}</p>
              <p><strong>Pricing:</strong> {t.pricing}</p>
              <p><strong>ATS scoring:</strong> {t.ats}</p>
              <p><strong>LaTeX export:</strong> {t.latex}</p>
              <p><strong>JD tailoring:</strong> {t.jdTailor}</p>
              <p><strong>Pros:</strong></p>
              <ul>
                {t.pros.map((p) => <li key={p}>{p}</li>)}
              </ul>
              <p><strong>Cons:</strong></p>
              <ul>
                {t.cons.map((c) => <li key={c}>{c}</li>)}
              </ul>
              {t.url.startsWith("/") ? (
                <p><Link href={t.url}>Visit {t.name} →</Link></p>
              ) : (
                <p><a href={t.url} rel="nofollow noopener" target="_blank">Visit {t.name} →</a></p>
              )}
            </article>
          ))}
        </section>

        <section className="section container">
          <h2>How we evaluated</h2>
          <ul className="card-grid">
            <li className="card">
              <h3>JD tailoring quality</h3>
              <p>
                Did the tool actually rewrite bullets against a specific
                job description, or just give generic AI suggestions?
              </p>
            </li>
            <li className="card">
              <h3>ATS scoring depth</h3>
              <p>
                Real ATS simulation vs lightweight keyword counter.
                Parseability and format checks matter as much as keywords.
              </p>
            </li>
            <li className="card">
              <h3>Export quality</h3>
              <p>
                Clean PDF for recruiters. LaTeX for developers and
                researchers. DOCX for legacy ATS pipelines.
              </p>
            </li>
            <li className="card">
              <h3>Pricing fairness</h3>
              <p>
                Real free tiers vs paywalled exports. INR-native vs
                dollar-converted markup for Indian users.
              </p>
            </li>
          </ul>
        </section>

        <div className="container">
          <div className="cta-banner">
            <h2>Skip the comparison fatigue</h2>
            <p>Try ResumeCraft free. 10 credits. No card. Full flow.</p>
            <CTA page={PAGE} label="Build my resume now" />
          </div>
          <FaqBlock items={faq} />
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
