#!/usr/bin/env node
/**
 * Uptime / parking regression guard for krafiter.com apex.
 * Fails if Server ≠ Netlify or body/title looks like a parked domain.
 *
 * Usage: node scripts/check-origin.mjs [N]
 * Default N = 10.
 */
const URL = "https://krafiter.com/";
const N = Math.max(1, Number.parseInt(process.argv[2] ?? "10", 10) || 10);
const PARKED_RE = /parked\s+domain/i;

async function oneCheck(i) {
  const res = await fetch(URL, {
    redirect: "follow",
    headers: { "user-agent": "krafiter-check-origin/1.0" },
  });
  const server = res.headers.get("server") ?? "";
  const body = await res.text();
  const titleMatch = body.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  const title = (titleMatch?.[1] ?? "").replace(/\s+/g, " ").trim();

  const okServer = /netlify/i.test(server);
  const parked =
    PARKED_RE.test(title) || PARKED_RE.test(body.slice(0, 8000));

  if (!okServer || parked || !res.ok) {
    return {
      i,
      ok: false,
      status: res.status,
      server,
      title,
      reason: !okServer
        ? `Server="${server}" (expected Netlify)`
        : parked
          ? "Parked Domain match"
          : `HTTP ${res.status}`,
    };
  }
  return { i, ok: true, status: res.status, server, title };
}

const results = [];
for (let i = 1; i <= N; i++) {
  try {
    results.push(await oneCheck(i));
  } catch (err) {
    results.push({
      i,
      ok: false,
      reason: err instanceof Error ? err.message : String(err),
    });
  }
}

const failed = results.filter((r) => !r.ok);
for (const r of results) {
  if (r.ok) {
    console.log(`OK  #${r.i}  ${r.status}  Server=${r.server}  title=${r.title}`);
  } else {
    console.error(`FAIL #${r.i}  ${r.reason}`);
  }
}

if (failed.length) {
  console.error(`\ncheck-origin: ${failed.length}/${N} failed`);
  process.exit(1);
}
console.log(`\ncheck-origin: ${N}/${N} Netlify OK`);
