import type { Metadata } from "next";
import Link from "next/link";
import { createMetadata, absoluteUrl } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/seo/schema";
import { siteConfig } from "@/lib/site";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { CTA } from "@/components/marketing/CTA";

const PAGE = "/about";

export const metadata: Metadata = createMetadata({
  title: "About",
  description:
    "Who builds Krafiter and how we work: AI ATS resume optimization, transparent scoring, honest JD tailoring, LaTeX export, and INR-native pricing.",
  path: PAGE,
});

export default function AboutPage() {
  return (
    <>
      <SiteHeader page={PAGE} />
      <main>
        <JsonLd
          data={breadcrumbSchema([
            { name: "Home", url: absoluteUrl("/") },
            { name: "About", url: absoluteUrl(PAGE) },
          ])}
        />

        <article className="prose">
          <h1>About {siteConfig.name}</h1>
          <p>
            {siteConfig.name} is an <strong>AI ATS resume optimizer</strong>.
            Employers often screen with software before a human reads your
            file. We build the loop that closes that gap: upload your resume,
            paste the job description, see an ATS score, rewrite for that
            posting, and export PDF or LaTeX.
          </p>
          <p>{siteConfig.disambiguatingDescription}</p>

          <h2>Our methodology (plain language)</h2>
          <p>
            Scoring looks at parseability, keyword coverage against the job
            description, structure, and bullet strength. We publish a
            high-level explanation — not proprietary weights — so candidates
            understand what to fix. Read{" "}
            <Link href="/how-ats-score-works">how the ATS score works</Link>{" "}
            and our{" "}
            <Link href="/reports/ats-resume-insights-2026">
              2026 ATS resume insights
            </Link>
            .
          </p>

          <h2>What we believe</h2>
          <ul>
            <li>
              <strong>Tailoring, not fabrication.</strong> The AI rephrases
              and prioritizes your real experience. It does not invent
              credentials — that fails interviews.
            </li>
            <li>
              <strong>Show the score.</strong> If software will judge your
              resume, you deserve to see that judgment before you apply. Start
              with the{" "}
              <Link href="/ats-checker">free ATS checker</Link> (no signup).
            </li>
            <li>
              <strong>One job at a time.</strong> A single generic resume
              underperforms across different postings. JD match and rewrite
              modes exist for a reason.
            </li>
            <li>
              <strong>Export quality.</strong> PDF for most applications; LaTeX{" "}
              <em>export</em> for engineers and academics who want typeset
              source — not a separate template marketplace.
            </li>
            <li>
              <strong>Fair regional pricing.</strong> India pays in INR via
              Razorpay at INR-market prices — see{" "}
              <Link href="/in">Krafiter for India</Link>.
            </li>
          </ul>

          <h2>Who builds it</h2>
          <p>
            Krafiter is built by a small product team focused on the job
            search stack: parsing, ATS diagnostics, JD-aware rewrite, and
            export. We ship version 1.0 and move carefully rather than
            overclaiming template libraries we do not have.
          </p>
          <p>
            Questions, feedback, or press:{" "}
            <a href={`mailto:${siteConfig.emails.founder}`}>
              {siteConfig.emails.founder}
            </a>
            . Product feedback also goes through{" "}
            <Link href="/feedback">/feedback</Link> and{" "}
            <Link href="/contact">/contact</Link>.
          </p>

          <h2>How to evaluate us (without brand wars)</h2>
          <p>
            Prefer criteria over hype: Does the tool paste a JD? Show a score?
            Rewrite honestly? Export what you need? Price fairly for your
            region? Our buyer guide:{" "}
            <Link href="/guides/how-to-choose-ai-resume-tool">
              how to choose an AI resume tool
            </Link>
            .
          </p>

          <div className="cta-banner">
            <h2>See it on your own resume</h2>
            <p>Free ATS check first — then optimize for the job you want.</p>
            <CTA page={PAGE} label="Optimize my resume - free" />
          </div>
        </article>
      </main>
      <SiteFooter />
    </>
  );
}
