/**
 * IndexNow submitter — pings Bing/Yandex (and any IndexNow-compatible engine)
 * with the full live URL list so new/changed pages get crawled in minutes
 * instead of waiting days for organic discovery.
 *
 * RUN AFTER DEPLOY, never before — IndexNow verifies each URL is live and the
 * key file is reachable. Pinging a not-yet-deployed build = rejected URLs.
 *
 *   npm run indexnow                       # uses NEXT_PUBLIC_SITE_URL
 *   INDEXNOW_KEY=... npm run indexnow      # override key
 *
 * The key must match the file served at  <site>/<key>.txt  (in public/).
 * Endpoint fans out to all participating engines, so one POST is enough.
 */
import { siteConfig } from "../lib/site";
import { guides } from "../lib/guides";
import { publishedRoles } from "../data/roles";
import { templateStyles } from "../data/templates";

const KEY = process.env.INDEXNOW_KEY ?? "ac6d2a52ebfd33cb75367c527e0fc4a9";
const ENDPOINT = "https://api.indexnow.org/indexnow";

const STATIC_PATHS = [
  "/",
  "/resume-builder",
  "/resume-templates",
  "/resume-examples",
  "/tailor-resume-to-job-description",
  "/in",
  "/pricing",
  "/guides",
  "/about",
];

function buildUrlList(): string[] {
  const u = siteConfig.url;
  return [
    ...STATIC_PATHS.map((p) => `${u}${p}`),
    ...guides.map((g) => `${u}/guides/${g.slug}`),
    ...publishedRoles().map((r) => `${u}/resume-examples/${r.slug}`),
    ...templateStyles.map((t) => `${u}/resume-templates/${t.slug}`),
  ];
}

async function main() {
  const host = new URL(siteConfig.url).host;
  const urlList = buildUrlList();

  const body = {
    host,
    key: KEY,
    keyLocation: `${siteConfig.url}/${KEY}.txt`,
    urlList,
  };

  if (process.argv.includes("--dry-run")) {
    console.log(`[dry-run] would submit ${urlList.length} URLs to ${ENDPOINT}`);
    console.log(JSON.stringify(body, null, 2));
    return;
  }

  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify(body),
  });

  // IndexNow returns 200 (accepted) or 202 (accepted, validation pending).
  if (res.ok || res.status === 202) {
    console.log(`✓ IndexNow: submitted ${urlList.length} URLs for ${host} (HTTP ${res.status}).`);
  } else {
    const text = await res.text().catch(() => "");
    console.error(`✗ IndexNow rejected: HTTP ${res.status} ${res.statusText}\n${text}`);
    process.exit(1);
  }
}

main().catch((e) => {
  console.error("✗ IndexNow submit failed:", e);
  process.exit(1);
});
