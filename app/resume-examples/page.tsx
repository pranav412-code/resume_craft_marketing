import type { Metadata } from "next";
import Link from "next/link";
import { createMetadata, absoluteUrl } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { CTA } from "@/components/CTA";
import { publishedRoles } from "@/data/roles";

const PAGE = "/resume-examples";

export const metadata: Metadata = createMetadata({
  title: "Resume Examples by Job Title",
  description:
    "Role-by-role resume examples with the skills, keywords, and bullet points that pass ATS screening — written to be copied, customized, and built on free.",
  path: PAGE,
});

/**
 * Hub page (P2). The programmatic /resume-examples/{job} pages are the volume
 * engine and ship in QA'd batches (top 100 roles first). Until they exist,
 * this hub explains the category and funnels to the builder — it must NOT
 * link to per-role URLs that would 404.
 */
export default function ExamplesPage() {
  return (
    <>
      <SiteHeader page={PAGE} />
      <main>
        <JsonLd
          data={breadcrumbSchema([
            { name: "Home", url: absoluteUrl("/") },
            { name: "Resume Examples", url: absoluteUrl(PAGE) },
          ])}
        />

        <section className="hero container">
          <h1>Resume examples that match how employers actually screen</h1>
          <p className="lede">
            Role-specific examples — the skills, ATS keywords, and quantified
            bullet points that work for each job title. Built from real
            job-description data, reviewed by humans.
          </p>
          <div className="actions">
            <CTA page={PAGE} label="Build mine instead" />
          </div>
        </section>

        <section className="section container">
          <h2>Browse examples by job title</h2>
          <ul className="card-grid">
            {publishedRoles().map((r) => (
              <li className="card" key={r.slug}>
                <h3>
                  <Link href={`/resume-examples/${r.slug}`}>{r.title}</Link>
                </h3>
                <p>
                  {r.category} — skills, ATS keywords, and quantified bullets
                  for {r.title.toLowerCase()} applications.
                </p>
              </li>
            ))}
          </ul>
          <p style={{ marginTop: "1.2rem" }}>
            More roles ship in reviewed batches. If yours isn&apos;t live yet,
            the builder produces a tailored example from <em>your</em>{" "}
            experience — which beats copying anyone else&apos;s. Not sure what
            to include? Start with{" "}
            <Link href="/guides/how-to-write-a-resume">
              how to write a resume
            </Link>{" "}
            and <Link href="/guides/resume-skills">skills to put on a resume</Link>.
          </p>
        </section>

        <div className="container">
          <div className="cta-banner">
            <h2>The best example is your own resume, tailored</h2>
            <p>Upload it and see the difference in minutes.</p>
            <CTA page={PAGE} label="Upload and tailor — free" />
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
