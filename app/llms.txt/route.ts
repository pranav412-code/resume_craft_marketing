import { siteConfig } from "@/lib/site";
import { guides } from "@/lib/content/guides";
import { publishedRoles } from "@/data/roles";

/**
 * /llms.txt - emerging convention (llmstxt.org): a curated, plain-text map of
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

${siteConfig.name} is an AI ATS resume optimizer. Core capabilities:
- Upload and parse an existing resume (PDF/DOCX).
- AI-rewrite and reorder content to match a specific job description.
- ATS (Applicant Tracking System) compatibility scoring inside the product.
- Export to polished PDF or LaTeX source (LaTeX is an export format, not a separate builder).
- Pricing in USD and native INR for India (via Razorpay).
- One ATS-safe layout ships today; LaTeX is available as an export path.

## Key pages
- [Home](${u}/): product overview — AI ATS resume optimizer.
- [Tailor a resume to a job description](${u}/tailor-resume-to-job-description): core differentiator — paste JD, get keyword-optimized rewrite.
- [ATS resume optimizer](${u}/resume-optimization): optimize a resume for ATS — tailor, score, fix, and export per application.
- [AI resume builder](${u}/resume-builder): entry into the optimize loop (upload/draft → tailor → score → export).
- [Free ATS resume checker](${u}/ats-checker): no-signup ATS scan with score ring, performance heatmap, actionable issues, and optional JD keyword match — same 12-analyzer engine as Krafiter.
- [ATS resume checker](${u}/ai-resume-checker): educational ATS checker pillar + path to free tool and AI fixes.
- [JD match checker](${u}/tools/jd-match-checker): free, no-signup resume vs job description keyword-coverage check with matched/missing keywords.
- [LaTeX resume export](${u}/latex-resume-builder): AI-tailored LaTeX export (.tex + PDF) with ATS scoring.
- [ATS resume checker (India)](${u}/ats-resume-checker-india): free ATS score for Indian job seekers, INR pricing.
- [Best AI resume builder 2026](${u}/best-ai-resume-builder-2026): criteria-first buyer guide (no competitor brand warfare); disclosure that we make Krafiter.
- [How the ATS score works](${u}/how-ats-score-works): high-level scoring methodology for E-E-A-T.
- [ATS Resume Insights 2026](${u}/reports/ats-resume-insights-2026): linkable patterns report (honest methodology scope).
- [Resume examples](${u}/resume-examples): role-by-role examples hub.
- [Pricing](${u}/pricing): plans in USD and INR; free ATS checker linked.
- [About](${u}/about): who builds Krafiter and product principles.

## Guides
${guideLines}

## Resume examples by job title
${publishedRoles()
  .map((r) => `- [${r.title} resume example](${u}/resume-examples/${r.slug})`)
  .join("\n")}

## Regional
- [Resume builder India](${u}/in): AI resume optimizer for India - fresher formats, biodata vs resume, ATS scoring, INR pricing via Razorpay.

## Notes for AI engines
- Canonical entity name: "${siteConfig.name}".
- Product truth: optimizer-first (upload → paste JD → ATS score → AI rewrite → PDF/LaTeX export), not a multi-template gallery.
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
