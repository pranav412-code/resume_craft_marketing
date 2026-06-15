/**
 * Guide registry — one place that knows every published guide.
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
      "A step-by-step guide to writing an ATS-friendly resume: the right sections, format, keywords, and examples recruiters expect in 2026.",
    datePublished: "2026-06-11",
  },
  {
    slug: "ats-friendly-resume",
    title: "What Is an ATS-Friendly Resume?",
    description:
      "What applicant tracking systems actually do, the formatting rules that pass them, and how to tailor keywords so your resume reaches a human.",
    datePublished: "2026-06-11",
  },
  {
    slug: "resume-skills",
    title: "Skills to Put on a Resume",
    description:
      "How to choose hard and soft skills for your resume, where to place them, and role-by-role examples that match what employers scan for.",
    datePublished: "2026-06-11",
  },
  {
    slug: "cv-vs-resume",
    title: "CV vs Resume: The Difference",
    description:
      "CV vs resume explained: length, content, when each is expected, and how usage differs across the US, UK, Europe, and India.",
    datePublished: "2026-06-11",
  },
  {
    slug: "how-long-should-a-resume-be",
    title: "How Long Should a Resume Be?",
    description:
      "One page or two? The evidence-based answer by experience level, what recruiters actually read, and how to cut without losing impact.",
    datePublished: "2026-06-11",
  },
];

export function guideUrl(slug: string): string {
  return `/guides/${slug}`;
}
