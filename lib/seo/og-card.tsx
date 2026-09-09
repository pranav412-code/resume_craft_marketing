import { ImageResponse } from "next/og";

/**
 * Shared Signal Paper OG/Twitter card renderer.
 *
 * Used by the sitewide default card (app/opengraph-image.tsx) and the
 * per-entity cards (app/og/[kind]/[slug]/route.tsx) so role and guide shares
 * carry their own title instead of one generic brand card.
 *
 * Satori rule: every node with >1 child must set display: flex | none.
 */
export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = "image/png";

const PAPER = "#F3F1ED";
const SURFACE = "#FFFCFA";
const INK = "#0B1220";
const MUTED = "#5A635E";
const BORDER = "#E4E0D8";
const ACCENT = "#2F6B66";
const ACCENT_TINT = "#E4EFED";

/** Fit the heading to the card — Satori has no line-clamp, so scale by length. */
function headingFontSize(heading: string): number {
  const n = heading.length;
  if (n <= 16) return 84;
  if (n <= 26) return 66;
  if (n <= 40) return 54;
  if (n <= 58) return 44;
  return 38;
}

type OgCardProps = {
  /** Small uppercase kicker, e.g. "krafiter.com" or "Resume example". */
  eyebrow: string;
  /** The headline — brand name on the default card, page title elsewhere. */
  heading: string;
  /** One supporting line under the heading. */
  subheading: string;
};

export function renderOgCard({ eyebrow, heading, subheading }: OgCardProps) {
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
            display: "flex",
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
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            bottom: 0,
            width: 10,
            background: ACCENT,
            display: "flex",
          }}
        />

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            height: "100%",
            padding: "72px 80px 72px 88px",
          }}
        >
          {/* Copy */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              flex: 1,
              maxWidth: 660,
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 28,
              }}
            >
              <div
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: 9999,
                  background: ACCENT,
                  marginRight: 10,
                  display: "flex",
                }}
              />
              <div
                style={{
                  fontSize: 22,
                  fontWeight: 600,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: ACCENT,
                  display: "flex",
                }}
              >
                {eyebrow}
              </div>
            </div>

            <div
              style={{
                fontSize: headingFontSize(heading),
                fontWeight: 800,
                letterSpacing: -2,
                lineHeight: 1.04,
                color: INK,
                display: "flex",
              }}
            >
              {heading}
            </div>

            <div
              style={{
                fontSize: 32,
                fontWeight: 600,
                marginTop: 18,
                color: MUTED,
                letterSpacing: -0.5,
                lineHeight: 1.25,
                display: "flex",
              }}
            >
              {subheading}
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "row",
                marginTop: 40,
              }}
            >
              {["JD tailor", "ATS score", "PDF · LaTeX"].map((pill) => (
                <div
                  key={pill}
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
                    marginRight: 12,
                  }}
                >
                  {pill}
                </div>
              ))}
            </div>
          </div>

          {/* Score card */}
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
                display: "flex",
              }}
            >
              ATS match
            </div>

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
                    display: "flex",
                  }}
                >
                  88
                </div>
                <div
                  style={{
                    fontSize: 20,
                    fontWeight: 600,
                    color: ACCENT,
                    marginTop: 4,
                    display: "flex",
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
                display: "flex",
              }}
            >
              Tailor · score · export
            </div>
          </div>
        </div>
      </div>
    ),
    OG_SIZE,
  );
}
