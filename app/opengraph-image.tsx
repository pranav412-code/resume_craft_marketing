import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site";

/**
 * Dynamic default OG/social image — generated at build, no asset needed.
 * Also used for Twitter cards when no twitter-image exists.
 * Routes can ship their own opengraph-image to override.
 */
export const alt = `${siteConfig.name} — ${siteConfig.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "linear-gradient(135deg, #1B2A4A 0%, #2563EB 100%)",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ fontSize: 64, fontWeight: 800, letterSpacing: -1 }}>
          {siteConfig.name}
        </div>
        <div style={{ fontSize: 36, marginTop: 16, color: "#93C5FD" }}>
          {siteConfig.tagline}
        </div>
        <div
          style={{ fontSize: 24, marginTop: 32, maxWidth: 900, color: "#E2E8F0" }}
        >
          AI tailoring to any job description • ATS scoring • PDF &amp; LaTeX
          export
        </div>
      </div>
    ),
    size,
  );
}
