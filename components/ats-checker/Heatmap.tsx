"use client";

import type { AnalysisResult } from "./types";

const LABELS: Record<string, string> = {
  sections: "Sections",
  skills: "Skills",
  experience: "Experience",
  projects: "Projects",
  certifications: "Certs",
  impact: "Impact",
  keywords: "Keywords",
  formatting: "Format",
  consistency: "Consistency",
  intensity: "Density",
  narrative: "Narrative",
  education: "Education",
};

const GROUPS: { id: string; title: string; keys: string[] }[] = [
  {
    id: "content",
    title: "Content",
    keys: [
      "impact",
      "intensity",
      "keywords",
      "skills",
      "experience",
      "projects",
      "certifications",
    ],
  },
  {
    id: "structure",
    title: "Structure",
    keys: ["sections", "formatting", "consistency"],
  },
  {
    id: "language",
    title: "Language",
    keys: ["narrative", "education"],
  },
];

function tone(score: number) {
  if (score >= 80) return { cls: "tone-strong", label: "Strong" };
  if (score >= 60) return { cls: "tone-watch", label: "Watch" };
  return { cls: "tone-weak", label: "Weak" };
}

function groupAverage(
  breakdown: Record<string, number>,
  keys: string[],
): number | null {
  const values = keys
    .map((k) => breakdown[k])
    .filter((v): v is number => typeof v === "number");
  if (values.length === 0) return null;
  return Math.round(values.reduce((a, b) => a + b, 0) / values.length);
}

export function Heatmap({
  breakdown,
}: {
  breakdown: AnalysisResult["breakdown"];
}) {
  const renderedGroups = GROUPS.map((g) => {
    const items = g.keys
      .map((k) => ({ k, v: breakdown[k] }))
      .filter((x) => typeof x.v === "number");
    return { ...g, items };
  }).filter((g) => g.items.length > 0);

  const placed = new Set(renderedGroups.flatMap((g) => g.items.map((i) => i.k)));
  const extras = Object.entries(breakdown)
    .filter(([k, v]) => typeof v === "number" && !placed.has(k))
    .map(([k, v]) => ({ k, v: v as number }));

  return (
    <div className="ac-heatmap">
      {renderedGroups.map((g) => {
        const avg = groupAverage(breakdown, g.keys);
        const at = avg !== null ? tone(avg) : null;
        return (
          <div key={g.id} className="ac-heatmap-group">
            <div className="ac-heatmap-group-head">
              <span className="ac-mono">{g.title}</span>
              {avg !== null && at && (
                <span className={`ac-mono ${at.cls}`}>
                  Avg {avg}
                </span>
              )}
            </div>
            <div className="ac-heatmap-grid">
              {g.items.map(({ k, v }) => {
                const t = tone(v);
                return (
                  <div key={k} className="ac-metric">
                    <div className="ac-metric-head">
                      <span className="ac-mono muted">
                        {LABELS[k.toLowerCase()] || k}
                      </span>
                      <span className={`ac-pill ${t.cls}`}>{t.label}</span>
                    </div>
                    <div className="ac-metric-score">
                      <span className={`ac-metric-num ${t.cls}`}>{v}</span>
                      <span className="ac-mono muted">/100</span>
                    </div>
                    <div className="ac-bar">
                      <div
                        className={`ac-bar-fill ${t.cls}`}
                        style={{ width: `${v}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}

      {extras.length > 0 && (
        <div className="ac-heatmap-group">
          <div className="ac-heatmap-group-head">
            <span className="ac-mono">Other</span>
          </div>
          <div className="ac-heatmap-grid">
            {extras.map(({ k, v }) => {
              const t = tone(v);
              return (
                <div key={k} className="ac-metric">
                  <div className="ac-metric-head">
                    <span className="ac-mono muted">
                      {LABELS[k.toLowerCase()] || k}
                    </span>
                    <span className={`ac-pill ${t.cls}`}>{t.label}</span>
                  </div>
                  <div className="ac-metric-score">
                    <span className={`ac-metric-num ${t.cls}`}>{v}</span>
                    <span className="ac-mono muted">/100</span>
                  </div>
                  <div className="ac-bar">
                    <div
                      className={`ac-bar-fill ${t.cls}`}
                      style={{ width: `${v}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
