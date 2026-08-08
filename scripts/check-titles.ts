/**
 * Build-time guard: no page <title> may exceed TITLE_LIMIT once the brand
 * suffix is appended. Catches the "title looks fine but truncates in the SERP
 * after ' | Krafiter'" mistake. Runs before `next build`.
 *
 * Programmatic surfaces (roles/templates) are checked through the same
 * builders the pages use, so this scales to hundreds of generated pages.
 * Guides are hand-authored - their registry titles are checked against the
 * suffix budget (tags added per page are short and shown live in dev).
 *
 * Also fails if a hand-authored createMetadata title already embeds
 * "| Krafiter" without absoluteTitle (layout would double the brand).
 */
import fs from "node:fs";
import path from "node:path";
import {
  roleTitle,
  finalTitleLength,
  TITLE_LIMIT,
  TITLE_SUFFIX,
  absoluteTitles,
} from "../lib/seo/titles";
import { publishedRoles } from "../data/roles";
import { guides } from "../lib/content/guides";

type Offender = { surface: string; path: string; title: string; len: number };

const offenders: Offender[] = [];

function check(surface: string, pagePath: string, inner: string) {
  const len = finalTitleLength(inner);
  if (len > TITLE_LIMIT) {
    offenders.push({ surface, path: pagePath, title: inner + TITLE_SUFFIX, len });
  }
}

function checkAbsolute(surface: string, pagePath: string, title: string) {
  if (title.length > TITLE_LIMIT) {
    offenders.push({ surface, path: pagePath, title, len: title.length });
  }
}

for (const r of publishedRoles()) {
  check("role", `/resume-examples/${r.slug}`, roleTitle(r.title));
}
for (const g of guides) {
  check("guide", `/guides/${g.slug}`, g.title);
}
for (const t of absoluteTitles()) {
  checkAbsolute("absolute", t.path, t.title);
}

/** Scan page.tsx files for duplicate brand in non-absolute titles. */
const brandInTitle = /title:\s*(?:`[^`]*\|\s*Krafiter[^`]*`|"[^"]*\|\s*Krafiter[^"]*")/;
const absoluteFlag = /absoluteTitle:\s*true/;
const appDir = path.join(__dirname, "..", "app");
const dupBrand: string[] = [];

function walk(dir: string) {
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, ent.name);
    if (ent.isDirectory()) walk(full);
    else if (ent.name === "page.tsx") {
      const src = fs.readFileSync(full, "utf8");
      if (!src.includes("createMetadata")) continue;
      const rel = path.relative(path.join(__dirname, ".."), full).replace(/\\/g, "/");
      if (brandInTitle.test(src) && !absoluteFlag.test(src)) {
        dupBrand.push(rel);
      }
    }
  }
}
walk(appDir);

if (offenders.length) {
  console.error(`\n✗ ${offenders.length} page title(s) exceed ${TITLE_LIMIT} chars:\n`);
  for (const o of offenders) {
    console.error(`  [${o.surface}] ${o.path}\n    ${o.len} chars: "${o.title}"`);
  }
  console.error(`\nShorten titles in lib/seo/titles.ts or the source data.\n`);
  process.exit(1);
}

if (dupBrand.length) {
  console.error(`\n✗ ${dupBrand.length} page(s) hardcode "| Krafiter" in title without absoluteTitle:\n`);
  for (const p of dupBrand) console.error(`  ${p}`);
  console.error(
    `\nDrop the brand from the title string (layout appends "${TITLE_SUFFIX}") or set absoluteTitle: true.\n`,
  );
  process.exit(1);
}

console.log(
  `✓ titles: all ${publishedRoles().length + guides.length + absoluteTitles().length} checked titles ≤ ${TITLE_LIMIT} chars; no duplicate-brand titles.`,
);
