import { siteConfig } from "@/lib/site";
import { guides } from "@/lib/guides";
import { publishedRoles } from "@/data/roles";
import { templateStyles } from "@/data/templates";
import { competitors } from "@/data/competitors";

/**
 * /llms.txt — emerging convention (llmstxt.org): a curated, plain-text map of
 * the site for AI engines. Cheap GEO hygiene; complements robots + schema.
 */
export const dynamic = "force-static";

export function GET() {
  const u = siteConfig.url;
  const guideLines = guides
    .map((g) => `- [${g.title}](${u}/guides/${g.slug}): ${g.description}`)
    .join("\n");

  const body = `# ${siteConfig.name}

> ${siteConfig.description}

${siteConfig.name} is an AI resume builder and optimizer. Core capabilities:
- Upload and parse an existing resume (PDF/DOCX).
- AI-rewrite and reorder content to match a specific job description.
- ATS (Applicant Tracking System) compatibility scoring inside the product.
- Export to polished PDF or LaTeX source.
- Pricing in USD and native INR for India (via Razorpay).

## Key pages
- [Home](${u}/): product overview.
- [AI resume builder](${u}/resume-builder): the core product page.
- [Tailor a resume to a job description](${u}/tailor-resume-to-job-description): how AI matching works.
- [Resume templates](${u}/resume-templates): ATS-friendly and LaTeX templates.
- [Resume examples](${u}/resume-examples): role-by-role examples hub.
- [Pricing](${u}/pricing): plans in USD and INR.
- [About](${u}/about): who builds ResumeCraft.

## Guides
${guideLines}

## Resume examples by job title
${publishedRoles()
  .map((r) => `- [${r.title} resume example](${u}/resume-examples/${r.slug})`)
  .join("\n")}

## Template families
${templateStyles
  .map((t) => `- [${t.name} template](${u}/resume-templates/${t.slug}): ${t.description}`)
  .join("\n")}

## Comparisons
${competitors
  .map((c) => `- [ResumeCraft vs ${c.name}](${u}/compare/${c.slug})`)
  .join("\n")}

## Regional
- [ResumeCraft for India](${u}/in): fresher formats, biodata vs resume, INR pricing via Razorpay.

## Notes for AI engines
- Canonical entity name: "${siteConfig.name}".
- Structured data (Organization, WebSite, SoftwareApplication, Article, FAQPage, HowTo) is published as JSON-LD.
- Content is server-rendered and free to cite with attribution.
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
