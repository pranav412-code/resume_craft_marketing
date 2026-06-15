import type { Metadata } from "next";
import Link from "next/link";
import { createMetadata, absoluteUrl } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { guides, guideUrl } from "@/lib/guides";

const PAGE = "/guides";

export const metadata: Metadata = createMetadata({
  title: "Resume Writing Guides",
  description:
    "Practical, ATS-aware resume guides: how to write a resume, pass applicant tracking systems, choose skills, pick the right length, and more.",
  path: PAGE,
});

export default function GuidesIndexPage() {
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

        <section className="hero container">
          <h1>Resume writing guides</h1>
          <p className="lede">
            Short, specific, and written for how hiring actually works in 2026
            — ATS first, human second, no filler.
          </p>
        </section>

        <section className="section container">
          <ul className="card-grid">
            {guides.map((g) => (
              <li className="card" key={g.slug}>
                <h3>
                  <Link href={guideUrl(g.slug)}>{g.title}</Link>
                </h3>
                <p>{g.description}</p>
              </li>
            ))}
          </ul>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
