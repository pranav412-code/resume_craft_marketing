"use client";

import { useEffect } from "react";

/**
 * Sitewide motion controller. Renders nothing.
 *
 * Two jobs:
 *  1. Scroll reveal — `.section-title-motion`, `.motion-card`, `.resume-shot`,
 *     `[data-reveal]` rise + fade in the frame the reader reaches them, once,
 *     then never move again. A 3s backstop reveals anything still pending so a
 *     stalled observer can never leave content hidden.
 *  2. Loop pausing — containers marked `[data-motion-loop]` get `.is-paused`
 *     (CSS halts descendant `animation-play-state`) while fully offscreen or the
 *     tab is hidden, so the ticker / paper float / hero idle-3D / orbit ring
 *     don't burn frames behind the fold.
 *
 * No-JS: CSS keeps every target visible and static — the `.motion-js` class this
 * adds is what opts elements into the hidden start state.
 * Reduced motion: this effect returns early. Nothing is gated, nothing moves.
 */
export function MotionRoot() {
  useEffect(() => {
    const root = document.documentElement;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    root.classList.add("motion-js");
    const cleanups: Array<() => void> = [
      () => root.classList.remove("motion-js"),
    ];

    const REVEAL =
      ".section-title-motion, .motion-card, .resume-shot, [data-reveal]";
    const targets = Array.from(document.querySelectorAll<HTMLElement>(REVEAL));
    const vh = window.innerHeight || 800;
    const show = (el: Element) => el.classList.add("is-inview");

    if (!("IntersectionObserver" in window)) {
      targets.forEach(show);
    } else {
      const revealObserver = new IntersectionObserver(
        (entries, obs) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              show(entry.target);
              obs.unobserve(entry.target);
            }
          }
        },
        { rootMargin: "0px 0px -12% 0px", threshold: 0.1 },
      );

      for (const el of targets) {
        // On screen at load: show now, skip the observer round-trip so
        // above-the-fold content never flashes.
        if (el.getBoundingClientRect().top < vh * 0.9) show(el);
        else revealObserver.observe(el);
      }

      // Backstop: content must never stay hidden because the observer stalled.
      const backstop = window.setTimeout(() => {
        targets.forEach(show);
        revealObserver.disconnect();
      }, 3000);

      cleanups.push(() => {
        window.clearTimeout(backstop);
        revealObserver.disconnect();
      });

      const loops = Array.from(
        document.querySelectorAll<HTMLElement>("[data-motion-loop]"),
      );
      const loopObserver = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            entry.target.classList.toggle("is-paused", !entry.isIntersecting);
          }
        },
        { threshold: 0 },
      );
      loops.forEach((el) => loopObserver.observe(el));

      const onVisibility = () => {
        const hidden = document.hidden;
        loops.forEach((el) => el.classList.toggle("is-paused", hidden));
      };
      document.addEventListener("visibilitychange", onVisibility);

      cleanups.push(() => {
        loopObserver.disconnect();
        document.removeEventListener("visibilitychange", onVisibility);
      });
    }

    return () => cleanups.forEach((fn) => fn());
  }, []);

  return null;
}
