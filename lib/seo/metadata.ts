/**
 * createMetadata() - per-page Metadata helper.
 * Guarantees a self-referencing canonical + correct OG/Twitter on every page.
 */
import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";

type PageMeta = {
  /** Page title. Layout template appends " | {brand}" unless absolute. */
  title: string;
  /** Set true to bypass the "%s | {brand}" template (home page). */
  absoluteTitle?: boolean;
  description?: string;
  /** Path beginning with "/" (e.g. "/resume-templates"). Drives canonical + OG url. */
  path: string;
  /** Override social image (absolute or root-relative). Defaults to /opengraph-image. */
  image?: string;
  /** True on utility pages you don't want indexed. */
  noindex?: boolean;
  type?: "website" | "article";
  /**
   * hreflang map for pages with regional variants, e.g.
   * { "en": "/", "en-IN": "/in", "x-default": "/" }.
   * MUST be reciprocal: every page in the set declares the same map.
   */
  languages?: Record<string, string>;
};

export function absoluteUrl(path: string): string {
  return `${siteConfig.url}${path.startsWith("/") ? path : `/${path}`}`;
}

export function createMetadata(meta: PageMeta): Metadata {
  const url = absoluteUrl(meta.path);
  const description = meta.description ?? siteConfig.description;
  const images = [
    {
      url: meta.image ?? "/opengraph-image",
      width: 1200,
      height: 630,
      alt: `${siteConfig.name} - ${siteConfig.tagline}`,
    },
  ];

  return {
    title: meta.absoluteTitle ? { absolute: meta.title } : meta.title,
    description,
    alternates: {
      canonical: url,
      ...(meta.languages
        ? {
            languages: Object.fromEntries(
              Object.entries(meta.languages).map(([lang, p]) => [
                lang,
                absoluteUrl(p),
              ]),
            ),
          }
        : {}),
    },
    // Only emit `robots` when we actually need to suppress indexing. Next.js
    // replaces the parent's `robots` object wholesale (no deep merge), so an
    // `{index:true,follow:true}` here would delete the root layout's googleBot
    // block — costing max-snippet:-1 and max-image-preview:large sitewide.
    // `follow: true` on noindex keeps internal link equity flowing.
    ...(meta.noindex
      ? {
          robots: {
            index: false,
            follow: true,
            googleBot: { index: false, follow: true },
          },
        }
      : {}),
    openGraph: {
      type: meta.type ?? "website",
      url,
      title: meta.title,
      description,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      images,
    },
    twitter: {
      card: "summary_large_image",
      title: meta.title,
      description,
      site: siteConfig.twitter,
      images: images.map((i) => i.url),
    },
  };
}
