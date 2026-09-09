import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";
import { guides } from "@/lib/content/guides";
import { publishedRoles, roleDates } from "@/data/roles";

/**
 * Bump when a batch of the core pages gets a real content/UX pass. Kept
 * explicit (not build-time) so <lastmod> doesn't churn on every deploy.
 */
const CORE_PAGES_UPDATED = "2026-09-09";

/**
 * XML sitemap - served at /sitemap.xml.
 * Static routes listed here; guides come from the registry so the sitemap
 * can never list a guide that doesn't exist (and vice versa).
 * When programmatic pillars ship (resume-examples/{job} etc.), generate those
 * entries from their data source and concat. Split into a sitemap index past
 * ~10k URLs.
 */
type Entry = {
  path: string;
  priority: number;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  /** ISO date; emitted as <lastmod>. Set on pages with real, dated content. */
  lastModified?: string;
};

const staticRoutes: Entry[] = [
  { path: "/", priority: 1.0, changeFrequency: "weekly", lastModified: CORE_PAGES_UPDATED },
  { path: "/resume-builder", priority: 0.9, changeFrequency: "weekly", lastModified: CORE_PAGES_UPDATED },
  { path: "/ai-resume-checker", priority: 0.9, changeFrequency: "weekly", lastModified: CORE_PAGES_UPDATED },
  { path: "/ats-checker", priority: 0.9, changeFrequency: "weekly", lastModified: CORE_PAGES_UPDATED },
  // /tools/ats-resume-scan is a retired URL (301 → /ats-checker) — never list it.
  { path: "/tools/jd-match-checker", priority: 0.8, changeFrequency: "weekly", lastModified: CORE_PAGES_UPDATED },
  { path: "/resume-optimization", priority: 0.8, changeFrequency: "monthly", lastModified: CORE_PAGES_UPDATED },
  { path: "/resume-examples", priority: 0.8, changeFrequency: "weekly", lastModified: CORE_PAGES_UPDATED },
  { path: "/tailor-resume-to-job-description", priority: 0.8, changeFrequency: "monthly", lastModified: CORE_PAGES_UPDATED },
  { path: "/latex-resume-builder", priority: 0.8, changeFrequency: "monthly", lastModified: CORE_PAGES_UPDATED },
  { path: "/ats-resume-checker-india", priority: 0.8, changeFrequency: "monthly" },
  { path: "/best-ai-resume-builder-2026", priority: 0.8, changeFrequency: "monthly" },
  { path: "/how-ats-score-works", priority: 0.7, changeFrequency: "monthly" },
  { path: "/reports/ats-resume-insights-2026", priority: 0.7, changeFrequency: "monthly" },
  { path: "/in", priority: 0.8, changeFrequency: "monthly" },
  { path: "/pricing", priority: 0.7, changeFrequency: "monthly" },
  { path: "/guides", priority: 0.7, changeFrequency: "weekly" },
  { path: "/about", priority: 0.4, changeFrequency: "yearly" },
  { path: "/contact", priority: 0.4, changeFrequency: "yearly" },
  { path: "/privacy", priority: 0.3, changeFrequency: "yearly" },
  { path: "/terms", priority: 0.3, changeFrequency: "yearly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const statics = staticRoutes.map((r) => ({
    url: `${siteConfig.url}${r.path}`,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
    ...(r.lastModified ? { lastModified: new Date(r.lastModified) } : {}),
  }));

  const guideEntries = guides.map((g) => ({
    url: `${siteConfig.url}/guides/${g.slug}`,
    lastModified: new Date(g.dateModified ?? g.datePublished),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // Programmatic surfaces - registries are the single source, so the sitemap
  // can never list a page that doesn't build (and vice versa).
  const roleEntries = publishedRoles().map((r) => ({
    url: `${siteConfig.url}/resume-examples/${r.slug}`,
    lastModified: new Date(roleDates(r).dateModified),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [
    ...statics,
    ...guideEntries,
    ...roleEntries,
  ];
}
