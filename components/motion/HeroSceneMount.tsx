"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

// three.js (~150KB gz) lives in its own async chunk — never in the initial
// bundle, never requested until the gate below passes.
const HeroScene = dynamic(() => import("./HeroScene"), { ssr: false });

/**
 * Gate for the hero WebGL scene. Mounts only where it can pay for itself:
 * desktop width, a real pointer, motion allowed, and WebGL present. On
 * anything else the SSR cockpit + CSS pseudo-3D tilt is the whole experience.
 */
export function HeroSceneMount() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const mq = (q: string) => window.matchMedia(q).matches;
    if (
      !mq("(min-width: 768px)") ||
      !mq("(hover: hover) and (pointer: fine)") ||
      mq("(prefers-reduced-motion: reduce)")
    ) {
      return;
    }
    try {
      const c = document.createElement("canvas");
      if (!(c.getContext("webgl2") || c.getContext("webgl"))) return;
    } catch {
      return;
    }
    setEnabled(true);
  }, []);

  return enabled ? <HeroScene /> : null;
}
