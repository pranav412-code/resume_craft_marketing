/**
 * Guide registry - one place that knows every published guide.
 * Used by the /guides index, the sitemap, and internal-link blocks.
 * Add a row here when a new guide page ships (and create its page.tsx).
 */
export type GuideMeta = {
  slug: string;
  title: string;
  description: string;
  datePublished: string; // ISO
  dateModified?: string; // ISO
};

export const guides: GuideMeta[] = [
  {
    slug: "how-to-write-a-resume",
    title: "How to Write a Resume in 2026",
    description:
      "Step-by-step guide to an ATS-friendly resume: sections, format, keywords, and examples recruiters expect in 2026.",
    datePublished: "2026-06-11",
    dateModified: "2026-07-25",
  },
  {
    slug: "ats-friendly-resume",
    title: "What Is an ATS-Friendly Resume?",
    description:
      "What applicant tracking systems do, formatting rules that pass them, and how to tailor keywords so humans see your resume.",
    datePublished: "2026-06-11",
  },
  {
    slug: "resume-skills",
    title: "Skills to Put on a Resume",
    description:
      "How to choose hard and soft skills, where to place them, and role examples that match what employers scan for.",
    datePublished: "2026-06-11",
  },
  {
    slug: "cv-vs-resume",
    title: "CV vs Resume: The Difference",
    description:
      "CV vs resume: length, content, when each is expected, and how usage differs across the US, UK, Europe, and India.",
    datePublished: "2026-06-11",
  },
  {
    slug: "how-long-should-a-resume-be",
    title: "How Long Should a Resume Be?",
    description:
      "One page or two? Evidence by experience level, what recruiters read, and how to cut without losing impact.",
    datePublished: "2026-06-11",
  },
  {
    slug: "ats-optimized-resume",
    title: "How to Create an ATS Optimized Resume",
    description:
      "How to optimize a resume for ATS: parseable structure, keyword coverage from the job description, and a score loop that shows what to fix.",
    datePublished: "2026-07-25",
  },
  {
    slug: "resume-tips",
    title: "Resume Tips That Get Interviews",
    description:
      "Practical resume tips: common mistakes to avoid, stronger bullets, keyword tactics, and a pre-submit checklist before you apply.",
    datePublished: "2026-07-25",
  },
];

export function guideUrl(slug: string): string {
  return `/guides/${slug}`;
}
