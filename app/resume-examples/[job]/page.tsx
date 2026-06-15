import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { createMetadata, absoluteUrl } from "@/lib/seo";
import { roleTitle } from "@/lib/titles";
import { JsonLd } from "@/components/JsonLd";
import { articleSchema, breadcrumbSchema } from "@/lib/schema";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { CTA } from "@/components/CTA";
import { FaqBlock } from "@/components/FaqBlock";
import { publishedRoles, getRole } from "@/data/roles";
import { validateRoles } from "@/lib/validateRole";

/**
 * Programmatic P2 engine: one statically generated page per published role.
 * The QA gate runs here — a thin role FAILS the build (strategy §8).
 * Only registry slugs build; anything else 404s (no doorway-page sprawl).
 */
export const dynamicParams = false;

export function generateStaticParams() {
  const roles = publishedRoles();
  validateRoles(roles); // QA gate — throws on thin content, failing the build.
  return roles.map((r) => ({ job: r.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ job: string }>;
}): Promise<Metadata> {
  const { job } = await params;
  const role = getRole(job);
  if (!role) return {};
  return createMetadata({
    title: roleTitle(role.title),
    description: `A recruiter-aware ${role.title.toLowerCase()} resume example: the skills, ATS keywords, and quantified bullet points that pass screening — plus what recruiters actually scan for.`,
    path: `/resume-examples/${role.slug}`,
    type: "article",
  });
}

export default async function RoleExamplePage({
  params,
}: {
  params: Promise<{ job: string }>;
}) {
  const { job } = await params;
  const role = getRole(job);
  if (!role) notFound();

  const PAGE = `/resume-examples/${role.slug}`;
  const today = "2026-06-11";

  return (
    <>
      <SiteHeader page={PAGE} />
      <main>
        <JsonLd
          data={[
            articleSchema({
              headline: `${role.title} Resume Example`,
              description: role.answer,
              url: absoluteUrl(PAGE),
              datePublished: today,
            }),
            breadcrumbSchema([
              { name: "Home", url: absoluteUrl("/") },
              { name: "Resume Examples", url: absoluteUrl("/resume-examples") },
              { name: role.title, url: absoluteUrl(PAGE) },
            ]),
          ]}
        />

        <article className="prose">
          <nav className="crumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link> /{" "}
            <Link href="/resume-examples">Resume Examples</Link> / {role.title}
          </nav>

          <h1>{role.title} resume example &amp; keywords</h1>
          <p className="meta">
            {role.category} · Updated {today}
          </p>

          {/* AEO answer block — validated 35–75 words by the QA gate. */}
          <p className="answer">{role.answer}</p>

          <h2>What skills should a {role.title.toLowerCase()} resume include?</h2>
          <p>
            <strong>Hard skills</strong> (the keyword layer — mirror the
            posting&apos;s exact wording where true of you):
          </p>
          <ul>
            {role.hardSkills.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
          <p>
            <strong>Soft skills</strong> — shown through bullets, not listed as
            adjectives:
          </p>
          <ul>
            {role.softSkills.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>

          <h2>ATS keywords for {role.title.toLowerCase()} roles</h2>
          <p>
            Terms recruiters search and applicant tracking systems rank on for
            this title — work the true ones into your bullets and skills
            section (see{" "}
            <Link href="/guides/ats-friendly-resume">how ATS screening works</Link>
            ):
          </p>
          <ul>
            {role.atsKeywords.map((k) => (
              <li key={k}>{k}</li>
            ))}
          </ul>

          <h2>Example resume bullet points</h2>
          <p>
            Quantified patterns to adapt to your own numbers — never copy
            claims that aren&apos;t yours:
          </p>
          <ul>
            {role.bullets.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>

          <h2>What do recruiters look for in a {role.title.toLowerCase()} resume?</h2>
          <p>{role.recruiterLook}</p>

          <h2>Tips that move interviews</h2>
          <ul>
            {role.tips.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>

          <p className="muted">{role.salaryNote}</p>

          <div className="cta-banner">
            <h2>Build your {role.title.toLowerCase()} resume from this blueprint</h2>
            <p>
              Upload what you have — the AI tailors it to the exact posting and
              scores it.
            </p>
            <CTA
              page={PAGE}
              role={role.slug}
              template={role.template}
              label={`Build my ${role.title} resume`}
            />
          </div>

          <FaqBlock items={role.faq} />
        </article>
      </main>
      <SiteFooter />
    </>
  );
}
