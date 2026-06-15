import type { Metadata } from "next";
import { createMetadata, absoluteUrl } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";
import { siteConfig } from "@/lib/site";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { CTA } from "@/components/CTA";

const PAGE = "/about";

export const metadata: Metadata = createMetadata({
  title: "About ResumeCraft",
  description:
    "Who builds ResumeCraft and why: an AI resume builder focused on honest tailoring, ATS transparency, LaTeX-quality output, and fair pricing for India.",
  path: PAGE,
});

/**
 * E-E-A-T surface. Replace the placeholder paragraphs with real founder
 * names, credentials, and a real contact route before launch — AI engines
 * and Google both weigh "who runs this" heavily for careers content.
 */
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
            {siteConfig.name} exists because the modern application process is
            asymmetric: employers screen with software, while candidates write
            for humans. We build tools that close that gap — AI that tailors a
            resume to the job description it will actually be screened
            against, with an ATS score that shows the result instead of
            asking you to trust it.
          </p>

          <h2>What we believe</h2>
          <ul>
            <li>
              <strong>Tailoring, not fabrication.</strong> The AI rephrases
              and prioritizes your real experience. It does not invent
              credentials — that fails interviews and wastes everyone&apos;s
              time.
            </li>
            <li>
              <strong>Show the score.</strong> If software is going to judge
              your resume, you deserve to see that judgment before you apply.
            </li>
            <li>
              <strong>Typography matters.</strong> We export real LaTeX, not
              just PDFs, because precise documents read as precise candidates.
            </li>
            <li>
              <strong>Fair regional pricing.</strong> India pays in INR at
              INR-market prices via Razorpay — not a dollar conversion.
            </li>
          </ul>

          <h2>Who builds it</h2>
          <p>
            {/* TODO before launch: real founder bio(s), names, credentials,
                photo, and a contact email — this is the E-E-A-T anchor page. */}
            ResumeCraft is built by a small product team focused on the job
            search stack. Questions, feedback, or press: reach us through the
            app&apos;s feedback form.
          </p>

          <div className="cta-banner">
            <h2>See it on your own resume</h2>
            <p>The product explains itself faster than we can.</p>
            <CTA page={PAGE} label="Try ResumeCraft free" />
          </div>
        </article>
      </main>
      <SiteFooter />
    </>
  );
}
