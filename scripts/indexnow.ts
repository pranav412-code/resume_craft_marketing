/**
 * IndexNow submitter - pings Bing/Yandex (and any IndexNow-compatible engine)
 * with the full live URL list so new/changed pages get crawled in minutes
 * instead of waiting days for organic discovery.
 *
 * RUN AFTER DEPLOY, never before - IndexNow verifies each URL is live and the
 * key file is reachable. Pinging a not-yet-deployed build = rejected URLs.
 *
 *   npm run indexnow                       # uses NEXT_PUBLIC_SITE_URL
 *   INDEXNOW_KEY=... npm run indexnow      # override key
 *
 * The key must match the file served at  <site>/<key>.txt  (in public/).
 * Endpoint fans out to all participating engines, so one POST is enough.
 */
import { siteConfig } from "../lib/site";
import sitemap from "../app/sitemap";

const KEY = process.env.INDEXNOW_KEY ?? "ac6d2a52ebfd33cb75367c527e0fc4a9";
const ENDPOINT = "https://api.indexnow.org/indexnow";

/**
 * The sitemap is the single source of submittable URLs. A hand-kept list here
 * silently drifts (it had already lost /contact, /privacy and /terms), so
 * derive instead — a page can never be in one and missing from the other.
 * Safe under tsx: app/sitemap.ts imports only `import type` from next.
 */
function buildUrlList(): string[] {
  return sitemap().map((entry) => entry.url);
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
