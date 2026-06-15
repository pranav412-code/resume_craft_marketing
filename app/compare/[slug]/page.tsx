import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { createMetadata, absoluteUrl } from "@/lib/seo";
import { compareTitle } from "@/lib/titles";
import { JsonLd } from "@/components/JsonLd";
import { articleSchema, breadcrumbSchema } from "@/lib/schema";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { CTA } from "@/components/CTA";
import { FaqBlock } from "@/components/FaqBlock";
import { competitors, getCompetitor } from "@/data/competitors";

/**
 * P7 engine: honest comparison/alternative pages. These are what AI engines
 * quote for "best resume builder / X alternative" queries (GEO), and they
 * convert bottom-of-funnel searchers (SEO).
 * Competitor claims stay general & durable; specifics live on our side only.
 */
export const dynamicParams = false;

export function generateStaticParams() {
  return competitors.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const c = getCompetitor(slug);
  if (!c) return {};
  return createMetadata({
    title: compareTitle(c.name),
    description: `Considering a ${c.name} alternative? An honest comparison: where ResumeCraft differs — JD tailoring with ATS scoring, LaTeX export, INR pricing — and where ${c.name} may fit better.`,
    path: `/compare/${c.slug}`,
    type: "article",
  });
}

export default async function ComparePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const c = getCompetitor(slug);
  if (!c) notFound();

  const PAGE = `/compare/${c.slug}`;

  return (
    <>
      <SiteHeader page={PAGE} />
      <main>
        <JsonLd
          data={[
            articleSchema({
              headline: `ResumeCraft vs ${c.name}`,
              description: `Where ResumeCraft and ${c.name} differ, honestly compared.`,
              url: absoluteUrl(PAGE),
              datePublished: "2026-06-11",
            }),
            breadcrumbSchema([
              { name: "Home", url: absoluteUrl("/") },
              { name: `${c.name} Alternative`, url: absoluteUrl(PAGE) },
            ]),
          ]}
        />

        <article className="prose">
          <nav className="crumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link> / Compare / ResumeCraft vs {c.name}
          </nav>

          <h1>
            ResumeCraft vs {c.name}: an honest comparison
          </h1>
          <p className="meta">Updated 2026-06-11</p>

          <p className="answer">
            {c.name} — {c.knownFor} ResumeCraft takes a different bet: tailor
            the resume to the specific job description with AI, show a
            transparent ATS score, and export to PDF or LaTeX — with native
            INR pricing for India. Which fits depends on how you apply, so
            here is the difference, honestly.
          </p>

          <h2>Where ResumeCraft is different</h2>
          {c.edges.map((e) => (
            <section key={e.title}>
              <h3>{e.title}</h3>
              <p>{e.detail}</p>
            </section>
          ))}

          <h2>Where {c.name} may fit you better</h2>
          <p>{c.honestFit}</p>

          <h2>The fair way to decide</h2>
          <p>
            Take one real job posting you care about. Run your current resume
            through both free tiers, compare the tailored output and any
            score/report each gives, and pick the one whose result you would
            actually send. Ten minutes settles what comparison pages can&apos;t.
          </p>

          <div className="cta-banner">
            <h2>Run the test with ResumeCraft first</h2>
            <p>Free credits cover the full upload → tailor → score → export flow.</p>
            <CTA page={PAGE} label="Start the free test" />
          </div>

          <FaqBlock items={c.faq} />
        </article>
      </main>
      <SiteFooter />
    </>
  );
}
