"use client";
import { useState, type FormEvent, type ReactNode } from "react";

type Props = {
  name: "contact" | "feedback";
  children: ReactNode;
  submitLabel?: string;
  successMessage?: string;
};

function encode(data: Record<string, string>) {
  return Object.keys(data)
    .map(
      (k) => encodeURIComponent(k) + "=" + encodeURIComponent(data[k] ?? ""),
    )
    .join("&");
}

export function NetlifyForm({
  name,
  children,
  submitLabel = "Send",
  successMessage = "Thanks — we got it. We'll reply within 1–2 working days.",
}: Props) {
  const [state, setState] = useState<"idle" | "submitting" | "done" | "error">(
    "idle",
  );
  const [errMsg, setErrMsg] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const data: Record<string, string> = { "form-name": name };
    fd.forEach((v, k) => {
      data[k] = typeof v === "string" ? v : "";
    });
    setState("submitting");
    try {
      const res = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encode(data),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setState("done");
      form.reset();
    } catch (err) {
      setErrMsg(err instanceof Error ? err.message : "Submit failed");
      setState("error");
    }
  }

  if (state === "done") {
    return (
      <div className="card" role="status" aria-live="polite">
        <p>{successMessage}</p>
      </div>
    );
  }

  return (
    <form
      name={name}
      method="POST"
      data-netlify="true"
      netlify-honeypot="bot-field"
      onSubmit={onSubmit}
      style={{ display: "grid", gap: "1rem", maxWidth: 560 }}
    >
      <input type="hidden" name="form-name" value={name} />
      <p hidden>
        <label>
          Don&apos;t fill if you&apos;re human: <input name="bot-field" />
        </label>
      </p>
      {children}
      <div>
        <button
          type="submit"
          className="btn btn-primary"
          disabled={state === "submitting"}
        >
          {state === "submitting" ? "Sending…" : submitLabel}
        </button>
        {state === "error" && (
          <p className="muted" role="alert" style={{ marginTop: "0.5rem" }}>
            Could not send ({errMsg}). Email us directly if it persists.
          </p>
        )}
      </div>
    </form>
  );
}
