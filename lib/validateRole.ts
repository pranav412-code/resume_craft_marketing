/**
 * QA GATE for programmatic pages (strategy §8 anti-thin-content guardrail).
 *
 * Runs at BUILD TIME from generateStaticParams: any published role below the
 * content thresholds throws → `next build` fails → thin page cannot ship.
 * Raise thresholds as the library matures; never lower them to ship a batch.
 */
import type { Role } from "@/data/roles";

const MIN = {
  hardSkills: 8,
  softSkills: 3,
  atsKeywords: 10,
  bullets: 6,
  faq: 3,
  tips: 3,
  answerWords: 35,
  answerWordsMax: 75,
  recruiterLookChars: 200,
};

export function validateRole(role: Role): void {
  const errors: string[] = [];
  const words = role.answer.trim().split(/\s+/).length;

  if (role.hardSkills.length < MIN.hardSkills)
    errors.push(`hardSkills ${role.hardSkills.length} < ${MIN.hardSkills}`);
  if (role.softSkills.length < MIN.softSkills)
    errors.push(`softSkills ${role.softSkills.length} < ${MIN.softSkills}`);
  if (role.atsKeywords.length < MIN.atsKeywords)
    errors.push(`atsKeywords ${role.atsKeywords.length} < ${MIN.atsKeywords}`);
  if (role.bullets.length < MIN.bullets)
    errors.push(`bullets ${role.bullets.length} < ${MIN.bullets}`);
  if (role.faq.length < MIN.faq) errors.push(`faq ${role.faq.length} < ${MIN.faq}`);
  if (role.tips.length < MIN.tips) errors.push(`tips ${role.tips.length} < ${MIN.tips}`);
  if (words < MIN.answerWords || words > MIN.answerWordsMax)
    errors.push(`answer block ${words} words (need ${MIN.answerWords}–${MIN.answerWordsMax})`);
  if (role.recruiterLook.length < MIN.recruiterLookChars)
    errors.push(`recruiterLook too short (${role.recruiterLook.length} chars)`);

  if (errors.length) {
    throw new Error(
      `[QA gate] /resume-examples/${role.slug} fails content thresholds — fix or set status:"draft":\n  - ${errors.join("\n  - ")}`,
    );
  }
}

export function validateRoles(roles: Role[]): void {
  const seen = new Set<string>();
  for (const r of roles) {
    if (seen.has(r.slug)) throw new Error(`[QA gate] duplicate role slug: ${r.slug}`);
    seen.add(r.slug);
    validateRole(r);
  }
}
