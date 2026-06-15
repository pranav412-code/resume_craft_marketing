/**
 * Build-time guard: no page <title> may exceed TITLE_LIMIT once the brand
 * suffix is appended. Catches the "title looks fine but truncates in the SERP
 * after ' | ResumeCraft'" mistake. Runs before `next build`.
 *
 * Programmatic surfaces (roles/templates/compare) are checked through the same
 * builders the pages use, so this scales to hundreds of generated pages.
 * Guides are hand-authored — their registry titles are checked against the
 * suffix budget (tags added per page are short and shown live in dev).
 */
import { roleTitle, templateTitle, compareTitle, finalTitleLength, TITLE_LIMIT, TITLE_SUFFIX } from "../lib/titles";
import { publishedRoles } from "../data/roles";
import { templateStyles } from "../data/templates";
import { competitors } from "../data/competitors";
import { guides } from "../lib/guides";

type Offender = { surface: string; path: string; title: string; len: number };

const offenders: Offender[] = [];

function check(surface: string, path: string, inner: string) {
  const len = finalTitleLength(inner);
  if (len > TITLE_LIMIT) {
    offenders.push({ surface, path, title: inner + TITLE_SUFFIX, len });
  }
}

for (const r of publishedRoles()) {
  check("role", `/resume-examples/${r.slug}`, roleTitle(r.title));
}
for (const t of templateStyles) {
  check("template", `/resume-templates/${t.slug}`, templateTitle(t.name));
}
for (const c of competitors) {
  check("compare", `/compare/${c.slug}`, compareTitle(c.name));
}
for (const g of guides) {
  // Raw registry title; per-page keyword tags (e.g. "(With Examples)") add a
  // few chars and are surfaced in dev — keep the registry title comfortably
  // under budget.
  check("guide", `/guides/${g.slug}`, g.title);
}

if (offenders.length) {
  console.error(`\n✗ ${offenders.length} page title(s) exceed ${TITLE_LIMIT} chars after the "${TITLE_SUFFIX}" suffix:\n`);
  for (const o of offenders) {
    console.error(`  [${o.surface}] ${o.path}\n    ${o.len} chars: "${o.title}"`);
  }
  console.error(`\nShorten the title builder in lib/titles.ts or the source data.\n`);
  process.exit(1);
}

console.log(`✓ titles: all ${publishedRoles().length + templateStyles.length + competitors.length + guides.length} checked titles ≤ ${TITLE_LIMIT} chars (incl. "${TITLE_SUFFIX}").`);
