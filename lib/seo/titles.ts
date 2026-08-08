/**
 * Single source of truth for page <title> strings.
 *
 * Both the page components and the build-time guard (scripts/check-titles.ts)
 * import these builders, so a title can never overflow in production without
 * failing the build first. The layout appends `${TITLE_SUFFIX}` to every
 * non-absolute title, so the budget below is for the FINAL rendered title.
 *
 * Why 60: Google truncates titles past ~60 chars in the SERP. Keeping the
 * suffix in the math is the mistake the strategy post calls out - a 46-char
 * title becomes 60 after " | Krafiter".
 */
import { siteConfig } from "@/lib/site";

export const TITLE_SUFFIX = ` | ${siteConfig.name}`;
export const TITLE_LIMIT = 60;

/** Final rendered length once the layout template appends the brand suffix. */
export function finalTitleLength(inner: string): number {
  return inner.length + TITLE_SUFFIX.length;
}

/** Append the year only when it still fits the budget; drop it otherwise. */
function withOptionalYear(base: string, year = "2026"): string {
  const withYear = `${base} (${year})`;
  return finalTitleLength(withYear) <= TITLE_LIMIT ? withYear : base;
}

/** /resume-examples/{job} */
export function roleTitle(title: string): string {
  return withOptionalYear(`${title} Resume Example`);
}

/** Pages with absoluteTitle: true — final SERP title, no layout suffix. */
export const HOME_ABSOLUTE_TITLE = `AI ATS Resume Optimizer | Tailor to Job | ${siteConfig.name}`;
export const ATS_CHECKER_ABSOLUTE_TITLE = `Free ATS Resume Checker | ${siteConfig.name}`;

export function absoluteTitles(): { path: string; title: string }[] {
  return [
    { path: "/", title: HOME_ABSOLUTE_TITLE },
    { path: "/ats-checker", title: ATS_CHECKER_ABSOLUTE_TITLE },
  ];
}

