"use client";
/**
 * ScanWidget - the interactive free-tool widget shared by
 * /tools/ats-resume-scan (JD optional) and /tools/jd-match-checker
 * (JD required, keyword-coverage-first).
 *
 * POSTs multipart form-data to the anonymous public scan endpoint
 * (`POST {apiUrl}/api/v1/public/scan`, fields: file + optional jd_text) and
 * renders score, strengths/weaknesses, keyword coverage, and a locked-issues
 * teaser that converts into the app via ctaHref().
 */
import {
  useRef,
  useState,
  type ChangeEvent,
  type DragEvent,
  type FormEvent,
} from "react";
import { siteConfig } from "@/lib/site";
import { ctaHref } from "@/lib/cta";

type KeywordCoverage = {
  matched: string[];
  missing: string[];
  coverage_percent: number;
};

type ScanResult = {
  score: number;
  category: string;
  strengths: string[];
  weaknesses: string[];
  keyword_coverage: KeywordCoverage | null;
  issues_locked_count: number;
};

type ScanError = {
  kind: "rate-limit" | "parse" | "generic";
  message: string;
};

type Props = {
  /** Marketing page path hosting the widget (CTA attribution). */
  page: string;
  /** Require the job description before submitting (JD match checker). */
  jdRequired?: boolean;
  /** Render keyword coverage above strengths/weaknesses (JD match checker). */
  coverageFirst?: boolean;
};

const MAX_BYTES = 10 * 1024 * 1024;
const ACCEPTED_EXTENSIONS = [".pdf", ".docx"];

function validateFile(file: File): string | null {
  const name = file.name.toLowerCase();
  if (!ACCEPTED_EXTENSIONS.some((ext) => name.endsWith(ext))) {
    return "Please upload a PDF or DOCX file.";
  }
  if (file.size > MAX_BYTES) {
    return "File is larger than 10 MB. Export a smaller PDF and try again.";
  }
  return null;
}

export function ScanWidget({ page, jdRequired = false, coverageFirst = false }: Props) {
  const [file, setFile] = useState<File | null>(null);
  const [jd, setJd] = useState("");
  const [dragging, setDragging] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "done">("idle");
  const [result, setResult] = useState<ScanResult | null>(null);
  const [error, setError] = useState<ScanError | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const signupHref = ctaHref({ page });

  function pickFile(f: File | undefined | null) {
    if (!f) return;
    const problem = validateFile(f);
    if (problem) {
      setError({ kind: "generic", message: problem });
      return;
    }
    setError(null);
    setFile(f);
  }

  function onDrop(e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setDragging(false);
    pickFile(e.dataTransfer.files?.[0]);
  }

  function onInputChange(e: ChangeEvent<HTMLInputElement>) {
    pickFile(e.target.files?.[0]);
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!file) {
      setError({ kind: "generic", message: "Choose a resume file first (PDF or DOCX)." });
      return;
    }
    if (jdRequired && !jd.trim()) {
      setError({
        kind: "generic",
        message: "Paste the job description - the match check scores against it.",
      });
      return;
    }

    setStatus("loading");
    setError(null);
    setResult(null);

    try {
      const body = new FormData();
      body.append("file", file);
      if (jd.trim()) body.append("jd_text", jd.trim());

      const res = await fetch(`${siteConfig.apiUrl}/api/v1/public/scan`, {
        method: "POST",
        body,
      });

      if (res.status === 429) {
        setError({
          kind: "rate-limit",
          message:
            "You've used your free scans for now. Sign up free for 25 credits and unlimited access to your results.",
        });
        setStatus("idle");
        return;
      }

      if (res.status === 400 || res.status === 422) {
        let detail = "";
        try {
          const data = await res.json();
          if (typeof data?.detail === "string") detail = data.detail;
        } catch {
          // non-JSON error body - fall through to the generic parse message
        }
        setError({
          kind: "parse",
          message:
            detail ||
            "We couldn't read that file. Make sure it's a text-based PDF (not a scan or image) or a DOCX and try again.",
        });
        setStatus("idle");
        return;
      }

      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }

      const data = (await res.json()) as ScanResult;
      setResult(data);
      setStatus("done");
    } catch {
      setError({
        kind: "generic",
        message: "Something went wrong reaching the scanner. Please try again in a moment.",
      });
      setStatus("idle");
    }
  }

  function reset() {
    setFile(null);
    setJd("");
    setResult(null);
    setError(null);
    setStatus("idle");
    if (inputRef.current) inputRef.current.value = "";
  }

  if (status === "done" && result) {
    const coverage = result.keyword_coverage;

    const coverageBlock = coverage ? (
      <div className="scan-block">
        <h3>Keyword coverage: {coverage.coverage_percent}%</h3>
        <div
          className="coverage-track"
          role="progressbar"
          aria-valuenow={coverage.coverage_percent}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Keyword coverage"
        >
          <div
            className="coverage-fill"
            style={{ width: `${Math.min(100, Math.max(0, coverage.coverage_percent))}%` }}
          />
        </div>
        {coverage.matched.length > 0 && (
          <>
            <p className="scan-chip-label">Matched keywords</p>
            <ul className="chips">
              {coverage.matched.map((k) => (
                <li className="chip" key={k}>
                  {k}
                </li>
              ))}
            </ul>
          </>
        )}
        {coverage.missing.length > 0 && (
          <>
            <p className="scan-chip-label">Missing keywords</p>
            <ul className="chips">
              {coverage.missing.map((k) => (
                <li className="chip chip-missing" key={k}>
                  {k}
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    ) : null;

    const strengthsBlock =
      result.strengths.length > 0 ? (
        <div className="scan-block">
          <h3>What&apos;s working</h3>
          <ul>
            {result.strengths.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </div>
      ) : null;

    const weaknessesBlock =
      result.weaknesses.length > 0 ? (
        <div className="scan-block">
          <h3>What&apos;s holding it back</h3>
          <ul>
            {result.weaknesses.map((w) => (
              <li key={w}>{w}</li>
            ))}
          </ul>
        </div>
      ) : null;

    return (
      <div className="scan-widget" aria-live="polite">
        <div className="scan-score">
          <span className="scan-score-value">{result.score}</span>
          <span className="scan-score-max">/ 100</span>
          <p className="scan-score-category">{result.category}</p>
        </div>

        {coverageFirst ? (
          <>
            {coverageBlock}
            {strengthsBlock}
            {weaknessesBlock}
          </>
        ) : (
          <>
            {strengthsBlock}
            {weaknessesBlock}
            {coverageBlock}
          </>
        )}

        {result.issues_locked_count > 0 && (
          <div className="scan-teaser">
            <p>
              <strong>
                {result.issues_locked_count} more issue
                {result.issues_locked_count === 1 ? "" : "s"} found
              </strong>{" "}
              - sign up free to see and auto-fix them. 25 free credits, no card
              required.
            </p>
            <a className="btn btn-primary" href={signupHref} rel="noopener">
              Fix my resume - free
            </a>
          </div>
        )}

        <button type="button" className="btn btn-ghost scan-again" onClick={reset}>
          Scan another resume
        </button>
      </div>
    );
  }

  return (
    <form className="scan-widget" onSubmit={onSubmit}>
      <div
        className={`scan-drop${dragging ? " is-drag" : ""}`}
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={onDrop}
        onClick={() => inputRef.current?.click()}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            inputRef.current?.click();
          }
        }}
        aria-label="Upload your resume (PDF or DOCX, max 10 MB)"
      >
        <input
          ref={inputRef}
          type="file"
          accept=".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          onChange={onInputChange}
          hidden
        />
        {file ? (
          <p className="scan-file">{file.name}</p>
        ) : (
          <>
            <p>
              <strong>Drop your resume here</strong> or click to browse
            </p>
            <p className="muted">PDF or DOCX · max 10 MB · nothing is stored</p>
          </>
        )}
      </div>

      <label className="scan-jd-label" htmlFor="scan-jd">
        Job description{jdRequired ? "" : " (optional - unlocks keyword matching)"}
      </label>
      <textarea
        id="scan-jd"
        className="scan-jd"
        value={jd}
        onChange={(e) => setJd(e.target.value)}
        placeholder={
          jdRequired
            ? "Paste the full job description you're applying to…"
            : "Paste a job description to see matched and missing keywords…"
        }
        required={jdRequired}
      />

      {error && (
        <div className="scan-error" role="alert">
          <p>{error.message}</p>
          {error.kind === "rate-limit" && (
            <a className="btn btn-primary" href={signupHref} rel="noopener">
              Sign up free - 25 credits
            </a>
          )}
        </div>
      )}

      <button type="submit" className="btn btn-primary" disabled={status === "loading"}>
        {status === "loading"
          ? "Scanning…"
          : jdRequired
            ? "Check my match"
            : "Scan my resume - free"}
      </button>
    </form>
  );
}
