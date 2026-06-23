import type { Metadata } from "next";
import Link from "next/link";
import { createMetadata, absoluteUrl } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import { softwareApplicationSchema, breadcrumbSchema } from "@/lib/schema";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { CTA } from "@/components/CTA";
import { FaqBlock, type QA } from "@/components/FaqBlock";

const PAGE = "/ats-resume-checker-india";

export const metadata: Metadata = createMetadata({
  title: "ATS Resume Checker India — Free Score, INR Pricing | ResumeCraft",
  description:
    "Free ATS resume checker for Indian job seekers. Score your resume against Naukri, LinkedIn, and Workday parsers. INR pricing via Razorpay. Start free.",
  path: PAGE,
  languages: { "en-IN": PAGE, en: PAGE, "x-default": PAGE },
});

const faq: QA[] = [
  {
    question: "Is the ATS checker really free?",
    answer:
      "Yes. Sign up gives 25 free credits — enough to run three Balanced ATS checks end-to-end (upload, score, export). No card required. Paid plans start at ₹149/month for Job Seeker and ₹399 for a 3-month Career Sprint.",
  },
  {
    question: "Which ATS systems does it test against?",
    answer:
      "ResumeCraft tests parsing logic similar to Workday, Greenhouse, Lever, iCIMS, Taleo, and Naukri's internal screener. Indian recruiters most commonly use Naukri RMS, LinkedIn Recruiter, and Workday — all simulated.",
  },
  {
    question: "Why do Indian resumes need a different checker?",
    answer:
      "Indian-format resumes often include photos, marital status, date of birth, and university percentages — fields that confuse Western ATS systems and waste header space. ResumeCraft flags these and rewrites the structure to score well on both Indian and global ATS pipelines.",
  },
  {
    question: "Do you support INR payment?",
    answer:
      "Yes — native INR billing via Razorpay (UPI, cards, net banking, wallets). Pricing is set in rupees, not dollar-converted. ₹149/month Job Seeker, ₹399 three-month Career Sprint, ₹99 refill starter.",
  },
  {
    question: "Will my resume work for both Indian and overseas jobs?",
    answer:
      "Yes. ResumeCraft tailors per job description, so the same source resume produces an India-format version for Naukri/LinkedIn-India searches and a global-format version for Workday/Greenhouse pipelines used by FAANG and overseas employers.",
  },
];

export default function AtsCheckerIndiaPage() {
  return (
    <>
      <SiteHeader page={PAGE} />
      <main>
        <JsonLd
          data={[
            softwareApplicationSchema(),
            breadcrumbSchema([
              { name: "Home", url: absoluteUrl("/") },
              { name: "ATS Resume Checker India", url: absoluteUrl(PAGE) },
            ]),
          ]}
        />

        <section className="hero container">
          <p className="eyebrow">Free · INR pricing · Naukri + Workday tested</p>
          <h1>
            ATS resume checker for <em>Indian job seekers</em>
          </h1>
          <p className="lede">
            Score your resume against the ATS systems used by Indian
            recruiters and global employers hiring from India. Free to start.
            Pay in rupees via Razorpay. No dollar markup.
          </p>
          <div className="actions">
            <CTA page={PAGE} label="Check my resume — free" />
            <Link href="/in" className="btn btn-ghost">
              India-specific plans
            </Link>
          </div>
        </section>

        <section className="section container">
          <h2>Built for the Indian hiring funnel</h2>
          <ul className="card-grid">
            <li className="card">
              <h3>Naukri + LinkedIn India scoring</h3>
              <p>
                Tests against the parsers most common in Indian recruitment
                — Naukri RMS, LinkedIn Recruiter, and the Workday pipeline
                used by IT services and product companies.
              </p>
            </li>
            <li className="card">
              <h3>India-format cleanup</h3>
              <p>
                Removes photo, DOB, marital status, and percentage clutter
                that breaks Western ATS — keeps them for India-only
                applications.
              </p>
            </li>
            <li className="card">
              <h3>INR pricing via Razorpay</h3>
              <p>
                ₹149/month Job Seeker. ₹399 three-month Career Sprint. UPI,
                cards, net banking. No FX markup on a USD price tag.
              </p>
            </li>
            <li className="card">
              <h3>Tailored per JD</h3>
              <p>
                Paste any job post — TCS, Infosys, Razorpay, Flipkart,
                Google India, Microsoft IDC — and ResumeCraft rewrites to
                fit it. Same source, every application.
              </p>
            </li>
          </ul>
        </section>

        <section className="section container">
          <h2>What the score actually measures</h2>
          <ul className="card-grid">
            <li className="card">
              <h3>Parseability</h3>
              <p>
                Can the ATS extract your name, contact, experience, and
                skills cleanly? Tables, headers, and columns break this —
                we flag them.
              </p>
            </li>
            <li className="card">
              <h3>Keyword coverage</h3>
              <p>
                How many of the JD's required and preferred skills appear
                in your resume — and where (skills section vs buried in
                a bullet).
              </p>
            </li>
            <li className="card">
              <h3>Format compliance</h3>
              <p>
                Standard section names, selectable text, single-column
                fallback, dates in a parseable format.
              </p>
            </li>
            <li className="card">
              <h3>Bullet strength</h3>
              <p>
                Action verbs, quantified impact, role-specific phrasing.
                Generic bullets get rewritten suggestions.
              </p>
            </li>
          </ul>
        </section>

        <div className="container">
          <div className="cta-banner">
            <h2>Don't get filtered before a human sees you</h2>
            <p>Free ATS score. INR pricing. Tailor per application.</p>
            <CTA page={PAGE} label="Score my resume now" />
          </div>
          <FaqBlock items={faq} />
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
