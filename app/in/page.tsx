import type { Metadata } from "next";
import Link from "next/link";
import { createMetadata, absoluteUrl } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { CTA } from "@/components/CTA";
import { FaqBlock, type QA } from "@/components/FaqBlock";

const PAGE = "/in";

/**
 * P6 India page. Content genuinely differs from the global home (formats,
 * fresher expectations, INR billing) — which is what justifies a separate URL
 * + hreflang instead of geo-IP currency switching alone (strategy §6).
 * hreflang map is reciprocal with the home page.
 */
export const metadata: Metadata = createMetadata({
  title: "Resume Format for India — Freshers & Professionals",
  description:
    "The resume format Indian employers and campus placements expect: education-first fresher layouts, ATS-safe structure, biodata vs resume explained — with INR pricing via Razorpay.",
  path: PAGE,
  languages: { en: "/", "en-IN": "/in", "x-default": "/" },
});

const faq: QA[] = [
  {
    question: "What resume format do Indian companies expect?",
    answer:
      "A concise 1–2 page resume: contact details, summary, skills, experience (or education-first for freshers), projects, education. Single column, no photo for corporate roles, exported as PDF. Large Indian employers and MNCs screen with the same ATS software used globally, so parse-safe formatting applies fully.",
  },
  {
    question: "Is biodata the same as a resume?",
    answer:
      "No. Biodata is an older format carrying personal details — date of birth, marital status, family information — still used in some government and traditional contexts. Corporate and campus hiring expects a resume without those fields. Send biodata only where it is explicitly requested.",
  },
  {
    question: "Should freshers put education before experience?",
    answer:
      "Yes. With limited work history, education, projects, and internships are the evidence — they lead the page. CGPA goes in when it clears stated cutoffs. ResumeCraft's Fresher template handles this ordering automatically.",
  },
  {
    question: "Why does INR pricing matter?",
    answer:
      "ResumeCraft bills natively in INR through Razorpay — UPI, cards, netbanking — at prices set for the Indian market, with GST handled per Indian tax rules.",
  },
];

export default function IndiaPage() {
  return (
    <>
      <SiteHeader page={PAGE} />
      <main>
        <JsonLd
          data={breadcrumbSchema([
            { name: "Home", url: absoluteUrl("/") },
            { name: "India", url: absoluteUrl(PAGE) },
          ])}
        />

        <section className="hero container">
          <h1>The resume format Indian employers actually screen for</h1>
          <p className="lede">
            Education-first fresher layouts, ATS-safe structure, and AI
            tailoring to the job description — with pricing in rupees, not
            converted dollars.
          </p>
          <div className="actions">
            <CTA page={PAGE} template="fresher" label="Build my resume — free" />
            <Link href="/resume-templates/fresher" className="btn btn-ghost">
              See the fresher template
            </Link>
          </div>
        </section>

        <section className="section container">
          <h2>What changes for the Indian market</h2>
          <ul className="card-grid">
            <li className="card">
              <h3>Fresher format, done right</h3>
              <p>
                Education, projects, and internships lead; one page; no photo,
                no biodata fields. Matches campus-placement expectations.
              </p>
            </li>
            <li className="card">
              <h3>ATS screening is here too</h3>
              <p>
                Naukri-era keyword screening and global ATS portals both rank
                on job-description match — tailoring applies fully in India.
              </p>
            </li>
            <li className="card">
              <h3>INR-native billing</h3>
              <p>
                Razorpay checkout with UPI, cards, and netbanking. Job Seeker
                ₹149/month or Career Sprint ₹399 for 3 months (most popular).
                See <Link href="/pricing">pricing</Link>.
              </p>
            </li>
            <li className="card">
              <h3>Same AI engine</h3>
              <p>
                Upload, paste the posting, get a tailored draft with an ATS
                score — in minutes, in your context.
              </p>
            </li>
          </ul>
        </section>

        <div className="container">
          <div className="cta-banner">
            <h2>From campus to offer letter</h2>
            <p>25 free credits to start — no card needed.</p>
            <CTA page={PAGE} template="fresher" label="Build fresher resume — free" />
          </div>
          <FaqBlock items={faq} />
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
