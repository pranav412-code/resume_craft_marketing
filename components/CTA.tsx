/**
 * CTA — the single bridge from marketing content into the product app.
 *
 * Lands on the app ROOT with query params. The app is a state-routed SPA with
 * no /start route; on first load it reads these params and, seeing
 * src=marketing, opens the sign-up tab (see App.tsx). Params:
 *   src      always "marketing" — attribution + triggers the signup tab
 *   page     marketing path that earned the click (e.g. "/guides/ats-friendly-resume")
 *   role     optional job-title slug to pre-fill the builder (e.g. "nurse")
 *   template optional template slug to pre-select (e.g. "ats", "latex")
 *
 * Next step app-side: persist src+page onto the new user row for attribution,
 * and consume role/template to pre-fill the builder after signup. Keep param
 * names stable — they become analytics history.
 */
import { siteConfig } from "@/lib/site";

export function ctaHref(opts: {
  page: string;
  role?: string;
  template?: string;
}): string {
  const url = new URL(`${siteConfig.appUrl}/`);
  url.searchParams.set("src", "marketing");
  url.searchParams.set("page", opts.page);
  if (opts.role) url.searchParams.set("role", opts.role);
  if (opts.template) url.searchParams.set("template", opts.template);
  return url.toString();
}

type CTAProps = {
  /** Marketing page path that hosts this CTA (attribution). */
  page: string;
  label?: string;
  role?: string;
  template?: string;
  variant?: "primary" | "ghost";
};

export function CTA({
  page,
  label = "Build my resume — free",
  role,
  template,
  variant = "primary",
}: CTAProps) {
  return (
    <a
      className={variant === "primary" ? "btn btn-primary" : "btn btn-ghost"}
      href={ctaHref({ page, role, template })}
      rel="noopener"
    >
      {label}
    </a>
  );
}
