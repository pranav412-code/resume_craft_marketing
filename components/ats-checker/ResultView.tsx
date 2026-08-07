"use client";

import { useEffect, useState } from "react";
import { Heatmap } from "./Heatmap";
import type { AnalysisResult, Issue } from "./types";
import { ctaHref } from "@/lib/cta";

interface Props {
  result: AnalysisResult;
  onReset?: () => void;
}

function findingKey(issue: Issue, i: number): string {
  return [issue.section, issue.location, issue.line, issue.title, i]
    .filter((v) => v != null && v !== "")
    .join("-");
}

function useCountUp(target: number, durationMs = 1200) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    let frame = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / durationMs);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(Math.round(target * eased));
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [target, durationMs]);
  return value;
}

function FindingCard({ issue, index }: { issue: Issue; index: number }) {
  const section = issue.section || "Resume";
  const problem = issue.problem || issue.detail || issue.title;
  const snippet = issue.snippet?.trim() || "";
  const improved = issue.improved?.trim() || "";
  const hasSnippet = Boolean(snippet);
  const hasImproved = Boolean(improved);
  const step = String(index + 1).padStart(2, "0");

  return (
    <article
      className="ac-fix"
      style={{ ["--i" as string]: index }}
    >
      <div className="ac-fix-rail" aria-hidden="true">
        <span className="ac-fix-step">{step}</span>
        <span className="ac-fix-line" />
      </div>

      <div className="ac-fix-card">
        <header className="ac-fix-head">
          <span className="ac-fix-tag">{section}</span>
          {issue.severity && (
            <span className={`ac-fix-sev sev-${issue.severity}`}>
              {issue.severity}
            </span>
          )}
        </header>

        {issue.location && (
          <h4 className="ac-fix-where">{issue.location}</h4>
        )}

        {(hasSnippet || hasImproved) && (
          <div className="ac-reel" aria-label="Before and after">
            {hasSnippet && (
              <div className="ac-reel-before">
                <span className="ac-ba-label">Cut</span>
                <p className="ac-ba-cut">{snippet}</p>
              </div>
            )}
            {!hasSnippet && hasImproved && (
              <div className="ac-reel-before">
                <span className="ac-ba-label">Cut</span>
                <p className="ac-ba-cut">{section}</p>
              </div>
            )}
            {hasImproved && (
              <div className="ac-reel-after">
                <span className="ac-ba-label">Rewrite</span>
                <p className="ac-ba-improved">{improved}</p>
              </div>
            )}
          </div>
        )}

        {problem && <p className="ac-fix-why">{problem}</p>}
      </div>
    </article>
  );
}

export function ResultView({ result, onReset }: Props) {
  const jd = result.jd_match;
  const optimizeHref = ctaHref({ page: "/ats-checker" });
  const issues = result.issues || [];
  const displayScore = useCountUp(result.score, 1400);
  const ringOffset = 527 - (527 * displayScore) / 100;

  return (
    <div className="ac-results ac-reveal">
      {onReset && (
        <button
          type="button"
          className="ac-link-btn ac-back ac-reveal-item"
          style={{ ["--i" as string]: 0 }}
          onClick={onReset}
        >
          ← Back to upload
        </button>
      )}

      <div
        className="ac-score-grid ac-reveal-item"
        style={{ ["--i" as string]: 1 }}
      >
        <div className="ac-score-panel">
          <div className="ac-ring-wrap">
            <svg viewBox="0 0 192 192" className="ac-ring">
              <circle cx="96" cy="96" r="84" className="ac-ring-track" />
              <circle
                cx="96"
                cy="96"
                r="84"
                className="ac-ring-value ac-ring-anim"
                style={{
                  strokeDasharray: 527,
                  strokeDashoffset: ringOffset,
                }}
              />
            </svg>
            <div className="ac-ring-label">
              <span className="ac-ring-num">{displayScore}</span>
              <span className="ac-mono muted">Rating</span>
            </div>
          </div>
          <h3 className="ac-category">{result.category}</h3>
          <div className="ac-meta-row">
            <span className="ac-pill">
              Level: <strong>{result.seniority || "n/a"}</strong>
            </span>
            {issues.length > 0 && (
              <span className="ac-pill">
                Fixes: <strong>{issues.length}</strong>
              </span>
            )}
          </div>
          {onReset && (
            <button
              type="button"
              className="ac-link-btn mt-4"
              onClick={onReset}
            >
              Rescan
            </button>
          )}
        </div>

        <div className="ac-heatmap-panel">
          <div className="ac-mono muted mb-4">Performance heatmap</div>
          <Heatmap breakdown={result.breakdown || {}} />
        </div>
      </div>

      {jd && (
        <div
          className="ac-card ac-jd ac-reveal-item"
          style={{ ["--i" as string]: 2 }}
        >
          <div className="ac-mono muted mb-6">Target role alignment</div>
          <div className="ac-jd-score">
            <div className="ac-jd-score-head">
              <span className="ac-mono">Keyword match</span>
              <span className="ac-jd-pct">{jd.match_percent}%</span>
            </div>
            <div className="ac-bar">
              <div
                className="ac-bar-fill tone-strong ac-bar-grow"
                style={{
                  width: `${jd.match_percent}%`,
                  ["--grow-delay" as string]: "0.4s",
                }}
              />
            </div>
            <div className="ac-mono muted ac-jd-count">
              {jd.matched.length} of {jd.total} match
            </div>
          </div>
          <div className="ac-jd-cols">
            <div>
              <h4 className="ac-mono tone-strong mb-3">
                Detected ({jd.matched.length})
              </h4>
              <div className="ac-chips">
                {jd.matched.length === 0 && (
                  <span className="muted">No keywords detected</span>
                )}
                {jd.matched.map((k, i) => (
                  <span
                    key={k}
                    className="ac-chip tone-strong ac-chip-pop"
                    style={{ ["--i" as string]: i }}
                  >
                    {k}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h4 className="ac-mono tone-weak mb-3">
                Gaps ({jd.missing.length})
              </h4>
              <div className="ac-chips">
                {jd.missing.length === 0 && (
                  <span className="muted">No missing keywords</span>
                )}
                {jd.missing.map((k, i) => (
                  <span
                    key={k}
                    className="ac-chip tone-weak ac-chip-pop"
                    style={{ ["--i" as string]: i }}
                  >
                    {k}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      <div
        className="ac-issues ac-reveal-item"
        style={{ ["--i" as string]: jd ? 3 : 2 }}
      >
        <div className="ac-mono muted mb-2">002 / Rewrite reel</div>
        <h3 className="ac-section-title">Cut weak lines. Keep the rewrite.</h3>
        <p className="ac-issues-lede muted">
          Each card shows what to strike from your resume and a stronger version
          to put in its place.
        </p>

        {issues.length === 0 ? (
          <div className="ac-card">
            <p className="muted">No major weak sections found — clean signal.</p>
          </div>
        ) : (
          <div className="ac-fix-list">
            {issues.map((issue, i) => (
              <FindingCard
                key={findingKey(issue, i)}
                issue={issue}
                index={i}
              />
            ))}
          </div>
        )}
      </div>

      <section
        className="ac-next ac-reveal-item"
        style={{ ["--i" as string]: jd ? 4 : 3 }}
      >
        <div className="ac-mono mb-3 opacity-60">003 / Next step</div>
        <h2>Want automatic rewrites?</h2>
        <p>
          This scan shows where your resume is weak. Krafiter can rewrite
          those sections for ATS compatibility — measurable improvement or your
          credits back.
        </p>
        <a href={optimizeHref} className="ac-cta">
          Optimize on Krafiter →
        </a>
      </section>
    </div>
  );
}
