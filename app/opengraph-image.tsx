import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site";

/**
 * Default OG / Twitter share card — Signal Paper brand.
 * Generated at build; routes can ship their own opengraph-image to override.
 */
export const alt = `${siteConfig.name} — ${siteConfig.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const PAPER = "#F3F1ED";
const SURFACE = "#FFFCFA";
const INK = "#0B1220";
const MUTED = "#5A635E";
const BORDER = "#E4E0D8";
const ACCENT = "#2F6B66";
const ACCENT_TINT = "#E4EFED";
const SCORE = 88;

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          position: "relative",
          background: PAPER,
          fontFamily:
            'ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif',
          overflow: "hidden",
        }}
      >
        {/* Soft teal wash — right atmosphere, not a purple/blue AI gradient */}
        <div
          style={{
            position: "absolute",
            right: -120,
            top: -80,
            width: 520,
            height: 520,
            borderRadius: 9999,
            background: ACCENT_TINT,
            opacity: 0.85,
          }}
        />
        <div
          style={{
            position: "absolute",
            right: 40,
            bottom: -160,
            width: 380,
            height: 380,
            borderRadius: 9999,
            background: "#D8E8E5",
            opacity: 0.7,
          }}
        />

        {/* Left hairline rule — editorial Signal Paper cue */}
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            bottom: 0,
            width: 10,
            background: ACCENT,
          }}
        />

        {/* Content */}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            height: "100%",
            padding: "72px 80px 72px 88px",
            gap: 48,
          }}
        >
          {/* Copy column */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              flex: 1,
              maxWidth: 640,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                marginBottom: 28,
              }}
            >
              <div
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: 9999,
                  background: ACCENT,
                }}
              />
              <div
                style={{
                  fontSize: 22,
                  fontWeight: 600,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: ACCENT,
                }}
              >
                krafiter.com
              </div>
            </div>

            <div
              style={{
                fontSize: 84,
                fontWeight: 800,
                letterSpacing: -2.5,
                lineHeight: 1.02,
                color: INK,
              }}
            >
              {siteConfig.name}
            </div>

            <div
              style={{
                fontSize: 36,
                fontWeight: 600,
                marginTop: 18,
                color: MUTED,
                letterSpacing: -0.5,
                lineHeight: 1.25,
              }}
            >
              {siteConfig.tagline}
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                gap: 12,
                marginTop: 40,
              }}
            >
              {["JD tailor", "ATS score", "PDF · LaTeX"].map((label) => (
                <div
                  key={label}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    padding: "12px 20px",
                    borderRadius: 9999,
                    background: SURFACE,
                    border: `1.5px solid ${BORDER}`,
                    color: INK,
                    fontSize: 22,
                    fontWeight: 600,
                  }}
                >
                  {label}
                </div>
              ))}
            </div>
          </div>

          {/* Score card — product signal */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              width: 340,
              height: 400,
              borderRadius: 24,
              background: SURFACE,
              border: `1.5px solid ${BORDER}`,
              boxShadow: "0 16px 48px rgba(47, 107, 102, 0.12)",
              padding: 36,
            }}
          >
            <div
              style={{
                fontSize: 18,
                fontWeight: 700,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: MUTED,
                marginBottom: 20,
              }}
            >
              ATS match
            </div>

            {/* Ring approximation via nested circles */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 200,
                height: 200,
                borderRadius: 9999,
                border: `14px solid ${ACCENT_TINT}`,
                borderTopColor: ACCENT,
                borderRightColor: ACCENT,
                position: "relative",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    fontSize: 72,
                    fontWeight: 800,
                    letterSpacing: -2,
                    color: INK,
                    lineHeight: 1,
                  }}
                >
                  {SCORE}
                </div>
                <div
                  style={{
                    fontSize: 20,
                    fontWeight: 600,
                    color: ACCENT,
                    marginTop: 4,
                  }}
                >
                  / 100
                </div>
              </div>
            </div>

            <div
              style={{
                marginTop: 28,
                fontSize: 20,
                fontWeight: 600,
                color: MUTED,
                textAlign: "center",
              }}
            >
              Tailor · score · export
            </div>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
