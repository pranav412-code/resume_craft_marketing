/**
 * Single source of truth for page <title> strings.
 *
 * Both the page components and the build-time guard (scripts/check-titles.ts)
 * import these builders, so a title can never overflow in production without
 * failing the build first. The layout appends `${TITLE_SUFFIX}` to every
 * non-absolute title, so the budget below is for the FINAL rendered title.
 *
 * Why 60: Google truncates titles past ~60 chars in the SERP. Keeping the
 * suffix in the math is the mistake the strategy post calls out — a 46-char
 * title becomes 60 after " | ResumeCraft".
 */
import { siteConfig } from "./site";

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

/** /resume-templates/{style} */
export function templateTitle(name: string): string {
  return `${name} Resume Template`;
}

/** /compare/{slug} — keeps the "{name} alternative" target keyword. */
export function compareTitle(name: string): string {
  return withOptionalYear(`${name} Alternative — ${siteConfig.name}`);
}
