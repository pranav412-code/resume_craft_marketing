import type { Metadata } from "next";
import Link from "next/link";
import { createMetadata, absoluteUrl } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/seo/schema";
import { siteConfig } from "@/lib/site";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { CTA } from "@/components/marketing/CTA";
import { guides, guideUrl, type GuideMeta } from "@/lib/content/guides";

const PAGE = "/guides";

export const metadata: Metadata = createMetadata({
  title: "Resume Writing Guides",
  description:
    "Practical, ATS-aware resume guides: how to write a resume, resume tips, pass applicant tracking systems, choose skills, pick the right length, and more.",
  path: PAGE,
});

const FEATURED_SLUG = "how-to-write-a-resume";

/** Page-local journey bands — every `guides` slug appears in exactly one band. */
const JOURNEY_BANDS = [
  {
    id: "fundamentals",
    label: "Fundamentals",
    slugs: [
      "how-to-write-a-resume",
      "resume-tips",
      "resume-skills",
      "cv-vs-resume",
      "how-long-should-a-resume-be",
    ],
  },
  {
    id: "ats-keywords",
    label: "ATS & keywords",
    slugs: [
      "ats-friendly-resume",
      "ats-optimized-resume",
      "improve-ats-score",
      "resume-keywords-from-job-description",
      "tailor-resume-to-job-description-guide",
    ],
  },
  {
    id: "situations",
    label: "Career situations",
    slugs: [
      "resume-for-career-change",
      "resume-after-career-gap",
      "college-fresher-resume-ats",
      "resume-with-no-experience",
      "resume-for-internship",
      "resume-after-layoff",
      "fresher-resume-format",
    ],
  },
  {
    id: "tools",
    label: "Tools & decisions",
    slugs: [
      "ats-checker-vs-ai-optimizer",
      "template-builders-vs-jd-optimization",
      "how-to-choose-ai-resume-tool",
    ],
  },
] as const;

type BandId = (typeof JOURNEY_BANDS)[number]["id"];

function bandId(id: BandId): string {
  return `band-${id}`;
}

function bySlug(slug: string): GuideMeta | undefined {
  return guides.find((g) => g.slug === slug);
}

function assertBandCoverage(): void {
  const registry = new Set(guides.map((g) => g.slug));
  const banded = new Set<string>();
  for (const band of JOURNEY_BANDS) {
    for (const slug of band.slugs) {
      if (banded.has(slug)) {
        throw new Error(`[guides hub] duplicate band slug: ${slug}`);
      }
      if (!registry.has(slug)) {
        throw new Error(`[guides hub] unknown band slug: ${slug}`);
      }
      banded.add(slug);
    }
  }
  for (const slug of registry) {
    if (!banded.has(slug)) {
      throw new Error(`[guides hub] orphan guide slug: ${slug}`);
    }
  }
}

assertBandCoverage();

function hint(guide: GuideMeta): string {
  const text = guide.description.trim();
  if (text.length <= 150) return text;
  return `${text.slice(0, 147)}…`;
}

const PAPER_STEPS = [
  "Structure sections ATS can parse",
  "Pull keywords from the job description",
  "Rewrite bullets with proof, not filler",
  "Score the match — then tailor in product",
] as const;

/**
 * Guides hub. Lists every registry guide via guideUrl(); journey bands are
 * page-local (no GuideMeta.category). Featured slug also appears under Fundamentals.
 */
export default function GuidesIndexPage() {
  const featured = bySlug(FEATURED_SLUG) ?? guides[0];
  const featuredBand =
    JOURNEY_BANDS.find((b) =>
      (b.slugs as readonly string[]).includes(featured.slug),
    ) ?? JOURNEY_BANDS[0];

  return (
    <>
      <SiteHeader page={PAGE} />
      <main>
        <JsonLd
          data={breadcrumbSchema([
            { name: "Home", url: absoluteUrl("/") },
            { name: "Guides", url: absoluteUrl(PAGE) },
          ])}
        />

        <section className="hero container hero-creative gu-hero">
          <p className="hero-brand">{siteConfig.name}</p>
          <h1>
            Resume writing guides
            <br />
            <em>ATS-first, short, and built to convert into a tailored resume</em>
          </h1>
          <p className="lede">
            Practical, ATS-aware how-tos — then apply the advice in the
            optimizer so you leave with a resume matched to a real job
            description, not a longer reading list.
          </p>
          <div className="actions">
            <CTA page={PAGE} label="Apply this in the builder — free" />
            <Link href="#guide-browse" className="btn btn-ghost">
              Browse guides
            </Link>
          </div>

          <div className="hero-stage gu-stage">
            <div className="hero-product">
              <div className="gu-paper">
                <p className="gu-paper-kicker">GUIDE · HOW TO WRITE A RESUME</p>
                <ol className="gu-paper-steps">
                  {PAPER_STEPS.map((step, i) => (
                    <li key={step}>
                      <span className="gu-paper-num" aria-hidden="true">
                        {i + 1}
                      </span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
                <p className="gu-paper-foot">Then tailor in {siteConfig.name}</p>
              </div>
            </div>
          </div>
        </section>

        <section className="container gu-ticker">
          <div className="signal-ticker" aria-label="Guides flow">
            <p>
              <span>READ GUIDE</span>
              <span>APPLY ADVICE</span>
              <span>SCORE VS JD</span>
              <span>EXPORT</span>
              <span>READ GUIDE</span>
              <span>APPLY ADVICE</span>
              <span>SCORE VS JD</span>
              <span>EXPORT</span>
            </p>
          </div>
        </section>

        <section
          id="guide-browse"
          className="section container gu-browse"
          aria-labelledby="guide-browse-title"
        >
          <h2 id="guide-browse-title" className="section-title-motion">
            Browse by what you need next
          </h2>
          <p className="section-lede">
            ATS-first, short guides — pick a journey, read what applies, then
            tailor the result to your job description in {siteConfig.name}.
          </p>

          <nav className="gu-journey-nav" aria-label="Guide journeys">
            {JOURNEY_BANDS.map((band) => (
              <a
                key={band.id}
                href={`#${bandId(band.id)}`}
                className="gu-journey-chip"
              >
                {band.label}
              </a>
            ))}
          </nav>

          <article className="gu-guide-featured motion-card">
            <p className="gu-guide-band">{featuredBand.label}</p>
            <h3>
              <Link href={guideUrl(featured.slug)}>{featured.title}</Link>
            </h3>
            <p className="gu-guide-excerpt">{hint(featured)}</p>
            <Link href={guideUrl(featured.slug)} className="gu-guide-cta">
              Read guide →
            </Link>
          </article>

          <div className="gu-guide-index reveal-stagger">
            {JOURNEY_BANDS.map((band, i) => (
              <div
                key={band.id}
                id={bandId(band.id)}
                className={`gu-band${i < 4 ? " motion-card" : ""}`}
                tabIndex={-1}
              >
                <h3 className="gu-band-label">{band.label}</h3>
                <ul className="gu-guide-list">
                  {band.slugs.map((slug) => {
                    const g = bySlug(slug);
                    if (!g) return null;
                    return (
                      <li key={slug} className="gu-guide-row">
                        <Link
                          href={guideUrl(g.slug)}
                          className="gu-guide-link"
                        >
                          <span className="gu-guide-title">{g.title}</span>
                          <span className="gu-guide-hint">{hint(g)}</span>
                          <span className="gu-guide-arrow" aria-hidden="true">
                            →
                          </span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>

          <p className="gu-browse-foot">
            Guides teach the craft;{" "}
            <Link href="/resume-examples">resume examples</Link> show role
            patterns. Score a draft in the{" "}
            <Link href="/ats-checker">free ATS resume checker</Link>, then
            tailor in the builder.
          </p>
        </section>

        <div className="container">
          <div className="cta-banner cta-banner--mid">
            <h2>Reading is step one. Matching your JD is the win.</h2>
            <p>
              Take what the guide teaches, then upload and tailor every section
              against a real posting.{" "}
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
            <h2>Guides teach the rules. Your JD sets the target.</h2>
            <p>
              Close the loop: upload once, score against the posting, and leave
              with a job-specific resume — not another tab of tips.
            </p>
            <CTA page={PAGE} label="Upload and tailor - free" />
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
