"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { siteConfig } from "@/lib/site";
import { LoadingStages } from "./LoadingStages";
import { ResultView } from "./ResultView";
import type { AnalysisResult } from "./types";

/** Keep the stage animation readable even when the API returns in <1s. */
const MIN_LOADING_MS = 5600;

export function AtsCheckerApp() {
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [jdText, setJdText] = useState("");
  const [jdOpen, setJdOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const scanGen = useRef(0);

  const uploadFile = async (selectedFile: File) => {
    setFile(selectedFile);
    setIsUploading(true);
    setResult(null);
    setError(null);

    const formData = new FormData();
    formData.append("file", selectedFile);
    if (jdText.trim()) formData.append("jd_text", jdText.trim());

    const started = Date.now();
    const gen = ++scanGen.current;

    try {
      const response = await fetch(`${siteConfig.apiUrl}/api/v1/public/scan`, {
        method: "POST",
        body: formData,
      });
      if (!response.ok) {
        if (response.status === 429) {
          throw new Error(
            "You've used your free scans for now. Sign up for unlimited checks and AI fixes.",
          );
        }
        const j = await response.json().catch(() => ({}));
        throw new Error(
          typeof j.detail === "string" ? j.detail : "Analysis failed",
        );
      }
      const data = (await response.json()) as AnalysisResult;

      const elapsed = Date.now() - started;
      const wait = Math.max(0, MIN_LOADING_MS - elapsed);
      if (wait > 0) {
        await new Promise((r) => setTimeout(r, wait));
      }
      if (gen !== scanGen.current) return;
      setResult(data);
    } catch (err) {
      if (gen !== scanGen.current) return;
      setError(err instanceof Error ? err.message : "Failed to analyze");
    } finally {
      if (gen === scanGen.current) setIsUploading(false);
    }
  };

  const reset = () => {
    scanGen.current += 1;
    setFile(null);
    setResult(null);
    setIsUploading(false);
    setError(null);
  };

  return (
    <div className="ats-checker">
      <div className="ac-shell">
        <header className="ac-header ac-header-enter">
          <div className="ac-header-top">
            <div>
              <div className="ac-mono muted ac-crumb ac-enter-1">
                <Link href="/">Home</Link>
                <span> / </span>
                <span>001 / Scan</span>
              </div>
              <h1 className="ac-enter-2">Free ATS Resume Checker</h1>
              <p className="muted ac-enter-3">
                Scan my resume for an ATS score against any job description —
                same engine as Krafiter. Free, no signup.
              </p>
            </div>
          </div>
        </header>

        {!result && !isUploading && (
          <div className="ac-upload-block ac-upload-enter">
            <div className="ac-jd-toggle">
              <button
                type="button"
                className="ac-jd-btn"
                onClick={() => setJdOpen((v) => !v)}
                aria-expanded={jdOpen}
              >
                <span>
                  Target job description{" "}
                  <span className="ac-mono muted">(Recommended)</span>
                </span>
                <span className="ac-mono muted">{jdOpen ? "▲" : "▼"}</span>
              </button>
              {jdOpen && (
                <textarea
                  value={jdText}
                  onChange={(e) => setJdText(e.target.value)}
                  placeholder="Paste the target job description here..."
                  rows={6}
                  className="ac-jd-input ac-jd-open"
                />
              )}
            </div>

            <div
              className={`ac-dropzone${dragOver ? " is-over" : ""}`}
              onClick={() => document.getElementById("ac-file-upload")?.click()}
              onDragOver={(e) => {
                e.preventDefault();
                setDragOver(true);
              }}
              onDragLeave={() => setDragOver(false)}
              onDrop={(e) => {
                e.preventDefault();
                setDragOver(false);
                if (e.dataTransfer.files[0]) uploadFile(e.dataTransfer.files[0]);
              }}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  document.getElementById("ac-file-upload")?.click();
                }
              }}
            >
              <input
                type="file"
                id="ac-file-upload"
                className="sr-only"
                accept=".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                onChange={(e) => {
                  if (e.target.files?.[0]) uploadFile(e.target.files[0]);
                }}
              />
              <div className="ac-drop-icon" aria-hidden="true">
                ↑
              </div>
              <h2>Drop your resume here</h2>
              <p className="muted">PDF or DOCX up to 10MB</p>
              <span className="ac-choose">Choose file</span>
            </div>

            {error && <div className="ac-error ac-error-shake">{error}</div>}
          </div>
        )}

        {isUploading && (
          <div className="ac-loading-enter">
            <LoadingStages
              filename={file?.name}
              withJd={!!jdText.trim()}
              onCancel={reset}
            />
          </div>
        )}

        {result && <ResultView result={result} onReset={reset} />}

        <footer className="ac-footer">
          <div className="ac-mono muted">
            Engine · same 12-analyzer ATS as Krafiter
          </div>
          <div className="ac-footer-links">
            <Link href="/privacy">Privacy</Link>
            <Link href="/terms">Terms</Link>
            <Link href="/pricing">Pricing</Link>
          </div>
        </footer>
      </div>
    </div>
  );
}
