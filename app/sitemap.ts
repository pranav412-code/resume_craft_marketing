import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";
import { guides } from "@/lib/guides";
import { publishedRoles } from "@/data/roles";
import { templateStyles } from "@/data/templates";
import { competitors } from "@/data/competitors";

/**
 * XML sitemap — served at /sitemap.xml.
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
};

const staticRoutes: Entry[] = [
  { path: "/", priority: 1.0, changeFrequency: "weekly" },
  { path: "/resume-builder", priority: 0.9, changeFrequency: "weekly" },
  { path: "/resume-templates", priority: 0.8, changeFrequency: "weekly" },
  { path: "/resume-examples", priority: 0.8, changeFrequency: "weekly" },
  { path: "/tailor-resume-to-job-description", priority: 0.8, changeFrequency: "monthly" },
  { path: "/in", priority: 0.8, changeFrequency: "monthly" },
  { path: "/pricing", priority: 0.7, changeFrequency: "monthly" },
  { path: "/guides", priority: 0.7, changeFrequency: "weekly" },
  { path: "/about", priority: 0.4, changeFrequency: "yearly" },
  { path: "/privacy", priority: 0.3, changeFrequency: "yearly" },
  { path: "/terms", priority: 0.3, changeFrequency: "yearly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const statics = staticRoutes.map((r) => ({
    url: `${siteConfig.url}${r.path}`,
    lastModified: now,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));

  const guideEntries = guides.map((g) => ({
    url: `${siteConfig.url}/guides/${g.slug}`,
    lastModified: new Date(g.dateModified ?? g.datePublished),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // Programmatic surfaces — registries are the single source, so the sitemap
  // can never list a page that doesn't build (and vice versa).
  const roleEntries = publishedRoles().map((r) => ({
    url: `${siteConfig.url}/resume-examples/${r.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const templateEntries = templateStyles.map((t) => ({
    url: `${siteConfig.url}/resume-templates/${t.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const compareEntries = competitors.map((c) => ({
    url: `${siteConfig.url}/compare/${c.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [
    ...statics,
    ...guideEntries,
    ...roleEntries,
    ...templateEntries,
    ...compareEntries,
  ];
}
