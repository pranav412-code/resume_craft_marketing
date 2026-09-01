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

/**
 * Inline source for the delegated CTA click listener, injected once by
 * components/seo/Analytics.tsx (and therefore only when analytics is
 * configured). Kept here so event names live beside trackEvent().
 *
 * Delegation, not a React island: <CTA> renders inside SiteHeader on every
 * page, so a client wrapper would hydrate all ~60 pages. This is ~400 bytes
 * and no boundary. The plausible stub queues clicks that land before
 * script.js finishes loading — otherwise the first CTA click is lost.
 *
 * NOTE: this file must never gain "use client" — lib/seo/index.ts re-exports
 * it and nearly every page imports createMetadata from there, so a client
 * directive here would put a boundary on the entire site.
 */
export const CTA_CLICK_LISTENER = `
window.plausible=window.plausible||function(){(window.plausible.q=window.plausible.q||[]).push(arguments)};
document.addEventListener("click",function(e){
var a=e.target&&e.target.closest&&e.target.closest("[data-cta]");
if(!a)return;
var p={page:a.getAttribute("data-cta-page")||"",role:a.getAttribute("data-cta-role")||"",template:a.getAttribute("data-cta-template")||""};
if(window.plausible)window.plausible("cta_click",{props:p});
if(window.gtag)window.gtag("event","cta_click",p);
},true);
`.trim();
