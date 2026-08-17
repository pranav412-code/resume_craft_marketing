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
  {
    slug: "tailor-resume-to-job-description-guide",
    title: "How to Tailor a Resume to a Job Description",
    description:
      "How to tailor a resume to a job description: extract requirements, close keyword gaps honestly, reorder for relevance, and score the match before you apply.",
    datePublished: "2026-07-29",
  },
  {
    slug: "improve-ats-score",
    title: "How to Improve Your ATS Resume Score",
    description:
      "How to improve your ATS resume score: fix parseability, cover job-description keywords you can prove, rewrite weak bullets, and re-score until the match stabilizes.",
    datePublished: "2026-07-29",
  },
  {
    slug: "resume-keywords-from-job-description",
    title: "Resume Keywords from a Job Description",
    description:
      "How to pull resume keywords from a job description, place them where ATS and recruiters look, and avoid stuffing - then verify coverage with a JD match check.",
    datePublished: "2026-07-29",
  },
  {
    slug: "resume-for-career-change",
    title: "Resume for a Career Change",
    description:
      "How to rewrite a resume when changing industries: map transferable skills, reframe experience for the new job description, and score ATS match before you apply.",
    datePublished: "2026-07-29",
  },
  {
    slug: "resume-after-career-gap",
    title: "Resume After a Career Gap",
    description:
      "How to explain career gaps honestly on a resume, lead with recent evidence, and keep an ATS-safe structure that still gets past screening.",
    datePublished: "2026-07-29",
  },
  {
    slug: "resume-with-no-experience",
    title: "Resume With No Experience",
    description:
      "How to write a resume with no paid experience: education and projects first, honest skills, and first-job ATS tips that still pass parsing.",
    datePublished: "2026-07-29",
  },
  {
    slug: "resume-for-internship",
    title: "Internship Resume Guide",
    description:
      "Internship resume format: education, projects, and keywords that match internship postings so ATS and campus recruiters can find you.",
    datePublished: "2026-07-29",
  },
  {
    slug: "resume-after-layoff",
    title: "Resume After a Layoff",
    description:
      "How to reframe a recent role after a layoff, avoid bitterness on the page, and tailor quickly for open roles with an ATS match check.",
    datePublished: "2026-07-29",
  },
  {
    slug: "college-fresher-resume-ats",
    title: "College Fresher Resume and How ATS Works",
    description:
      "How college freshers build a resume and how ATS works: education-first structure, projects as proof, campus-drive keywords, and a score check before you apply.",
    datePublished: "2026-08-18",
  },
  {
    slug: "fresher-resume-format",
    title: "Fresher Resume Format",
    description:
      "Fresher resume format for India and campus hiring: education-first, no biodata clutter, ATS-safe structure for first-job and internship applications.",
    datePublished: "2026-07-29",
  },
  {
    slug: "ats-checker-vs-ai-optimizer",
    title: "ATS Checker vs AI Resume Optimizer",
    description:
      "When a free ATS scan is enough versus when you need a full AI rewrite: parseability, keyword gaps, and the score-to-optimize loop.",
    datePublished: "2026-07-29",
  },
  {
    slug: "template-builders-vs-jd-optimization",
    title: "Template Builders vs JD-Tailored Optimization",
    description:
      "Looks versus job match: why a polished template is not enough, and how JD-tailored optimization improves ATS and recruiter fit.",
    datePublished: "2026-07-29",
  },
  {
    slug: "how-to-choose-ai-resume-tool",
    title: "How to Choose an AI Resume Tool",
    description:
      "Checklist for choosing an AI resume tool: ATS scoring against a real JD, honest rewrites, export options, and disclosure that we make Krafiter.",
    datePublished: "2026-07-29",
  },
];

export function guideUrl(slug: string): string {
  return `/guides/${slug}`;
}
