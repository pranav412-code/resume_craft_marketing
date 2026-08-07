import type { Metadata } from "next";
import Link from "next/link";
import { createMetadata, absoluteUrl } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/seo/schema";
import { siteConfig } from "@/lib/site";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { CTA } from "@/components/marketing/CTA";
import { publishedRoles, type Role } from "@/data/roles";

const PAGE = "/resume-examples";

export const metadata: Metadata = createMetadata({
  title: "Resume Examples by Job Title",
  description:
    "Role-by-role resume examples with the skills, keywords, and bullet points that pass ATS screening - written to be copied, customized, and built on free.",
  path: PAGE,
});

function catId(category: string): string {
  return `cat-${category.toLowerCase().replace(/\s+/g, "-")}`;
}

function groupByCategory(roles: Role[]): { category: string; roles: Role[] }[] {
  const map = new Map<string, Role[]>();
  for (const r of roles) {
    const list = map.get(r.category);
    if (list) list.push(r);
    else map.set(r.category, [r]);
  }
  return Array.from(map.entries()).map(([category, roles]) => ({
    category,
    roles,
  }));
}

function featuredRole(roles: Role[]): Role {
  return (
    roles.find((r) => r.slug === "software-engineer") ??
    roles.find((r) => r.category === "Technology") ??
    roles[0]
  );
}

function excerpt(role: Role): string {
  const first = role.answer.split(/[.!?]/)[0]?.trim();
  if (first && first.length > 40) {
    return first.length > 160 ? `${first.slice(0, 157)}…` : `${first}.`;
  }
  return `Skills, ATS keywords, and quantified bullets for ${role.title} applications.`;
}

/**
 * Hub page (P2). Lists published role examples and funnels to the builder.
 * Every publishedRoles() entry links to /resume-examples/{slug}.
 */
export default function ExamplesPage() {
  const roles = publishedRoles();
  const featured = featuredRole(roles);
  const bands = groupByCategory(roles);
  const sampleBullets = featured.bullets.slice(0, 3);
  const sampleKeywords = featured.atsKeywords.slice(0, 4);

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

        <section className="hero container hero-creative ex-hero">
          <p className="hero-brand">{siteConfig.name}</p>
          <h1>
            Resume examples by job title
            <br />
            <em>built the way ATS and recruiters actually scan</em>
          </h1>
          <p className="lede">
            Role-specific skills, ATS keywords, and quantified bullets — then
            convert the pattern into your tailored resume in the builder.
          </p>
          <div className="actions">
            <CTA page={PAGE} label="Build mine instead — free" />
            <Link href="#role-browse" className="btn btn-ghost">
              Browse roles
            </Link>
          </div>

          <div className="hero-stage ex-stage">
            <div className="hero-product">
              <div className="ex-paper">
                <p className="ex-paper-kicker">
                  {featured.title.toUpperCase()} EXAMPLE
                </p>
                <ul className="ex-paper-bullets">
                  {sampleBullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
                <div className="ex-paper-chips" aria-label="ATS keywords">
                  <span className="ex-paper-chips-label">ATS keywords</span>
                  {sampleKeywords.map((k) => (
                    <span key={k} className="ex-chip">
                      {k}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="container">
          <div className="signal-ticker" aria-label="Examples flow">
            <p>
              <span>ROLE EXAMPLE</span>
              <span>ATS KEYWORDS</span>
              <span>QUANTIFIED BULLETS</span>
              <span>TAILOR IN BUILDER</span>
              <span>ROLE EXAMPLE</span>
              <span>ATS KEYWORDS</span>
              <span>QUANTIFIED BULLETS</span>
              <span>TAILOR IN BUILDER</span>
            </p>
          </div>
        </section>

        <section
          id="role-browse"
          className="section container ex-browse"
          aria-labelledby="role-browse-title"
        >
          <h2 id="role-browse-title" className="section-title-motion">
            Browse examples by job title
          </h2>
          <p className="section-lede">
            Jump a category, open a role page, then tailor the pattern to your
            job description in the builder. More roles ship in reviewed batches.
          </p>

          <nav className="ex-cat-nav" aria-label="Role categories">
            {bands.map(({ category }) => (
              <a
                key={category}
                href={`#${catId(category)}`}
                className="ex-cat-chip"
              >
                {category}
              </a>
            ))}
          </nav>

          <article className="ex-role-featured motion-card">
            <p className="ex-role-cat">{featured.category}</p>
            <h3>
              <Link href={`/resume-examples/${featured.slug}`}>
                {featured.title}
              </Link>
            </h3>
            <p className="ex-role-excerpt">{excerpt(featured)}</p>
            <Link
              href={`/resume-examples/${featured.slug}`}
              className="ex-role-cta"
            >
              View example →
            </Link>
          </article>

          <div className="ex-role-index reveal-stagger">
            {bands.map(({ category, roles: catRoles }, i) => (
              <div
                key={category}
                id={catId(category)}
                className={`ex-cat-band${i < 4 ? " motion-card" : ""}`}
                tabIndex={-1}
              >
                <h3 className="ex-cat-label">{category}</h3>
                <ul className="ex-role-list">
                  {catRoles.map((r) => (
                    <li key={r.slug} className="ex-role-row">
                      <Link
                        href={`/resume-examples/${r.slug}`}
                        className="ex-role-link"
                      >
                        <span className="ex-role-title">{r.title}</span>
                        <span className="ex-role-hint">
                          Skills, ATS keywords, and quantified bullets for{" "}
                          {r.title.toLowerCase()}
                        </span>
                        <span className="ex-role-arrow" aria-hidden="true">
                          →
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <p className="ex-browse-foot">
            More roles ship in reviewed batches. If yours isn&apos;t live yet,
            the builder produces a tailored example from your experience — which
            beats copying anyone else&apos;s. Not sure what to include? Start
            with{" "}
            <Link href="/guides/how-to-write-a-resume">
              how to write a resume
            </Link>{" "}
            and{" "}
            <Link href="/guides/resume-skills">skills to put on a resume</Link>.
          </p>
        </section>

        <div className="container">
          <div className="cta-banner cta-banner--mid">
            <h2>An example is a start. Your JD is the win.</h2>
            <p>
              Copy the structure, then upload and tailor every bullet to the
              posting you&apos;re applying for.{" "}
              <Link href="/tailor-resume-to-job-description">
                See how tailoring works
              </Link>
              .
            </p>
            <CTA page={PAGE} label="Upload and tailor — free" />
          </div>
        </div>

        <div className="container">
          <div className="cta-banner">
            <h2>The best example is your own resume, tailored</h2>
            <p>
              Stop sending a generic copy — upload once and leave with a
              job-specific version.
            </p>
            <CTA page={PAGE} label="Upload and tailor - free" />
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
