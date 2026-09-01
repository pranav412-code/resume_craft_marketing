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
      // Read by the delegated listener in components/seo/Analytics.tsx.
      // Server-rendered attributes — no client boundary, no runtime cost.
      data-cta="1"
      data-cta-page={page}
      data-cta-role={role}
      data-cta-template={template}
    >
      {label}
    </a>
  );
}

export { ctaHref };
