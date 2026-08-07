"use client";

import { useEffect, useState } from "react";

type Stage = {
  key: string;
  label: string;
  detail: string;
  startsAt: number;
};

const STAGES: Stage[] = [
  {
    key: "parse",
    label: "Parsing resume",
    detail: "Extracting text, sections, contact info",
    startsAt: 0,
  },
  {
    key: "normalize",
    label: "Normalizing structure",
    detail: "Mapping experience, education, skills",
    startsAt: 1200,
  },
  {
    key: "ats",
    label: "Running ATS engine",
    detail: "12 rule-based analyzers, scoring breakdown",
    startsAt: 2600,
  },
  {
    key: "insights",
    label: "Building rewrite reel",
    detail: "Finding weak lines and stronger replacements",
    startsAt: 4200,
  },
];

interface Props {
  filename?: string;
  withJd?: boolean;
  onCancel?: () => void;
}

export function LoadingStages({ filename, withJd, onCancel }: Props) {
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    const start = Date.now();
    const id = setInterval(() => setElapsed(Date.now() - start), 100);
    return () => clearInterval(id);
  }, []);

  let activeIdx = 0;
  for (let i = 0; i < STAGES.length; i++) {
    if (elapsed >= STAGES[i].startsAt) activeIdx = i;
  }

  return (
    <div className="ac-loading">
      <div className="ac-loader-frame" aria-hidden="true">
        <span className="ac-loader-scan" />
      </div>

      <div className="ac-mono muted mb-3">Analyzing</div>
      <h2 className="ac-loading-title">{filename || "your resume"}</h2>
      <p className="muted ac-loading-sub">
        {withJd
          ? "Matching against JD · Deep scan active"
          : "Usually completes in under 10 seconds"}
      </p>

      <ol className="ac-stages">
        {STAGES.map((stage, idx) => {
          const isDone = idx < activeIdx;
          const isActive = idx === activeIdx;
          return (
            <li
              key={stage.key}
              className={[
                "ac-stage",
                isActive ? "is-active" : "",
                !isActive && !isDone ? "is-pending" : "",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              <div
                className={[
                  "ac-stage-icon",
                  isDone || isActive ? "is-on" : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
              >
                {isDone ? "✓" : isActive ? "…" : String(idx + 1).padStart(2, "0")}
              </div>
              <div>
                <div className="ac-stage-label">
                  {stage.label}
                  {isActive ? "…" : ""}
                </div>
                <div className="ac-mono muted">{stage.detail}</div>
              </div>
            </li>
          );
        })}
      </ol>

      {onCancel && (
        <button type="button" className="ac-link-btn" onClick={onCancel}>
          Cancel scan
        </button>
      )}
    </div>
  );
}
