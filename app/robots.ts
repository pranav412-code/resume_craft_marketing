import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";

/**
 * robots.txt - served at /robots.txt.
 *
 * GEO policy: EXPLICITLY welcome AI search/answer crawlers so Krafiter can
 * be retrieved and cited by Perplexity, ChatGPT Search, Gemini, Claude, etc.
 * Blocking them (a common default) = silent GEO invisibility.
 * To later opt out of model TRAINING while keeping AI search: move the
 * training bots (GPTBot, CCBot, Google-Extended, Applebot-Extended) into a
 * disallow rule and keep OAI-SearchBot / PerplexityBot / ClaudeBot allowed.
 */
export default function robots(): MetadataRoute.Robots {
  // Netlify sets CONTEXT on every build. Deploy previews and branch deploys
  // live on crawlable *.netlify.app hosts, so keep them out of the index —
  // robots.ts is static and cannot inspect the request host at serve time.
  // Unset CONTEXT means a local build, which should behave like production.
  const isProduction =
    !process.env.CONTEXT || process.env.CONTEXT === "production";

  if (!isProduction) {
    return { rules: [{ userAgent: "*", disallow: "/" }] };
  }

  const aiCrawlers = [
    "GPTBot",
    "OAI-SearchBot",
    "ChatGPT-User",
    "PerplexityBot",
    "Perplexity-User",
    "ClaudeBot",
    "Claude-Web",
    "Google-Extended",
    "Applebot-Extended",
    "CCBot",
    "Amazonbot",
    "Bytespider",
    "cohere-ai",
  ];

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/draft/"],
      },
      {
        userAgent: aiCrawlers,
        allow: "/",
      },
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}
