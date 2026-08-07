/**
 * CTA - the single bridge from marketing content into the product app.
 *
 * Lands on the app ROOT with query params. The app is a state-routed SPA with
 * no /start route; on first load it reads these params and, seeing
 * src=marketing, opens the sign-up tab (see App.tsx).
 *
 * Server Component — plain anchor (no client boundary / webpack island).
 */
import { ctaHref } from "@/lib/cta";

type CTAProps = {
  page: string;
  label?: string;
  role?: string;
  template?: string;
  variant?: "primary" | "ghost";
};

export function CTA({
  page,
  label = "Optimize my resume — free",
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

export { ctaHref };
