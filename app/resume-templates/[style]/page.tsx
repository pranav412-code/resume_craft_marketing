import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { createMetadata, absoluteUrl } from "@/lib/seo";
import { templateTitle } from "@/lib/titles";
import { JsonLd } from "@/components/JsonLd";
import { articleSchema, breadcrumbSchema } from "@/lib/schema";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { CTA } from "@/components/CTA";
import { FaqBlock } from "@/components/FaqBlock";
import { templateStyles, getTemplateStyle } from "@/data/templates";

/** P3 engine: one page per template family. Registry-driven; unknown slugs 404. */
export const dynamicParams = false;

export function generateStaticParams() {
  return templateStyles.map((t) => ({ style: t.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ style: string }>;
}): Promise<Metadata> {
  const { style } = await params;
  const t = getTemplateStyle(style);
  if (!t) return {};
  return createMetadata({
    title: templateTitle(t.name),
    description: `${t.description} Who it fits, why it parses cleanly in ATS, and how to start free.`,
    path: `/resume-templates/${t.slug}`,
    type: "article",
  });
}

export default async function TemplateStylePage({
  params,
}: {
  params: Promise<{ style: string }>;
}) {
  const { style } = await params;
  const t = getTemplateStyle(style);
  if (!t) notFound();

  const PAGE = `/resume-templates/${t.slug}`;

  return (
    <>
      <SiteHeader page={PAGE} />
      <main>
        <JsonLd
          data={[
            articleSchema({
              headline: `${t.name} Resume Template`,
              description: t.description,
              url: absoluteUrl(PAGE),
              datePublished: "2026-06-11",
            }),
            breadcrumbSchema([
              { name: "Home", url: absoluteUrl("/") },
              { name: "Resume Templates", url: absoluteUrl("/resume-templates") },
              { name: t.name, url: absoluteUrl(PAGE) },
            ]),
          ]}
        />

        <article className="prose">
          <nav className="crumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link> /{" "}
            <Link href="/resume-templates">Resume Templates</Link> / {t.name}
          </nav>

          <h1>{t.name} resume template</h1>
          <p className="meta">{t.audience}</p>

          <p className="answer">{t.answer}</p>

          <h2>What&apos;s in this template family</h2>
          <ul>
            {t.features.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>

          <h2>How it behaves in ATS screening</h2>
          <p>{t.atsNotes}</p>
          <p>
            Formatting is half the equation — wording is the other. Pair the
            template with{" "}
            <Link href="/tailor-resume-to-job-description">
              tailoring to the job description
            </Link>{" "}
            so the content matches what the ATS ranks on.
          </p>

          <div className="cta-banner">
            <h2>Start with {t.name}</h2>
            <p>The AI fills it with content tailored to your target job.</p>
            <CTA page={PAGE} template={t.slug} label={`Use the ${t.name} template`} />
          </div>

          <FaqBlock items={t.faq} />
        </article>
      </main>
      <SiteFooter />
    </>
  );
}
