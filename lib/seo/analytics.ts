/**
 * First-party analytics helper. Fires to Plausible and/or GA4 when their
 * scripts are loaded via NEXT_PUBLIC_* env vars; no-ops otherwise.
 */

export type AnalyticsProps = Record<
  string,
  string | number | boolean | undefined
>;

declare global {
  interface Window {
    plausible?: (
      event: string,
      options?: { props?: AnalyticsProps },
    ) => void;
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

/** Fire a named event. Safe to call from SSR — no-ops off the client. */
export function trackEvent(name: string, props?: AnalyticsProps): void {
  if (typeof window === "undefined") return;

  if (typeof window.plausible === "function") {
    window.plausible(name, props ? { props } : undefined);
  }

  if (typeof window.gtag === "function") {
    window.gtag("event", name, props);
  }
}
