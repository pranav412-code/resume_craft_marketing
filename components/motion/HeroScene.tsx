"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * Hero focal moment — the machine reading your paper.
 *
 * A physical resume sheet floats in real perspective behind the SSR cockpit
 * card (`.hero-product`), lit warm from the right and teal-rimmed from the
 * left. A teal scan band travels down it on a slow loop: the ATS read. The
 * camera parallaxes toward the pointer and drifts on its own when idle.
 *
 * This mounts only on desktop + fine-pointer + motion-allowed + WebGL-capable
 * (see HeroSceneMount). Everything it renders is decorative: the div is
 * aria-hidden and pointer-events:none, the cockpit DOM stays untouched on top.
 * If WebGL init throws, the CSS pseudo-3D tilt stays as the fallback and the
 * `.has-hero-scene` flag is never set.
 */

// Signal Paper tokens, mirrored as numbers for WebGL.
const PAPER = 0xfffcfa;
const LINE = 0xd8d3c9;
const HEADING = 0x9a938a;
const ACCENT = 0x2f6b66;
const ACCENT_BRIGHT = 0x3a7d77;
const WARM_LIGHT = 0xfff3e6;

function makeSheetTexture(): THREE.Texture {
  const w = 512;
  const h = 668;
  const c = document.createElement("canvas");
  c.width = w;
  c.height = h;
  const ctx = c.getContext("2d")!;

  const hex = (n: number) => `#${n.toString(16).padStart(6, "0")}`;
  ctx.fillStyle = hex(PAPER);
  ctx.fillRect(0, 0, w, h);

  const pad = 54;
  // Name block + contact line — kept pale so the sheet always reads as
  // faint printed paper, never a hard dark slab behind the card.
  ctx.fillStyle = hex(0x9a938a);
  ctx.fillRect(pad, 64, 150, 13);
  ctx.fillStyle = hex(LINE);
  ctx.fillRect(pad, 92, 240, 7);

  let y = 150;
  const sections = [4, 5, 3, 4];
  for (const rows of sections) {
    ctx.fillStyle = hex(HEADING);
    ctx.fillRect(pad, y, 120, 10);
    y += 30;
    for (let i = 0; i < rows; i++) {
      ctx.fillStyle = hex(LINE);
      const lineW = w - pad * 2 - (i === rows - 1 ? 90 + Math.random() * 60 : Math.random() * 30);
      ctx.fillRect(pad, y, lineW, 7);
      y += 22;
    }
    y += 26;
  }

  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 4;
  return tex;
}

function makeShadowTexture(): THREE.Texture {
  const s = 256;
  const c = document.createElement("canvas");
  c.width = s;
  c.height = s;
  const ctx = c.getContext("2d")!;
  const g = ctx.createRadialGradient(s / 2, s / 2, 0, s / 2, s / 2, s / 2);
  g.addColorStop(0, "rgba(11,18,32,0.28)");
  g.addColorStop(1, "rgba(11,18,32,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, s, s);
  return new THREE.CanvasTexture(c);
}

export default function HeroScene() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: "low-power",
      });
    } catch {
      return; // no fallback needed — CSS tilt already covers it
    }

    const size = () => ({
      w: mount.clientWidth || 1,
      h: mount.clientHeight || 1,
    });
    let { w, h } = size();

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setSize(w, h);
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);
    Object.assign(renderer.domElement.style, { width: "100%", height: "100%", display: "block" });

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(30, w / h, 0.1, 50);
    camera.position.set(0, 0, 7);

    const world = new THREE.Group();
    world.rotation.set(-0.14, 0.32, 0.05);
    world.position.y = -0.12; // nudge low so the stack peeks from behind the card
    scene.add(world);

    scene.add(new THREE.AmbientLight(WARM_LIGHT, 1.15));
    const key = new THREE.DirectionalLight(0xffffff, 1.5);
    key.position.set(4, 5, 6);
    scene.add(key);
    const rim = new THREE.DirectionalLight(ACCENT, 0.7);
    rim.position.set(-5, 1, 2);
    scene.add(rim);

    const sheetGeo = new THREE.PlaneGeometry(3.0, 3.9);
    const sheetTex = makeSheetTexture();

    const backSheet = new THREE.Mesh(
      sheetGeo,
      new THREE.MeshStandardMaterial({ map: sheetTex, roughness: 0.95, metalness: 0 }),
    );
    backSheet.position.set(-0.42, -0.3, -0.4);
    backSheet.rotation.z = 0.06;
    world.add(backSheet);

    const frontSheet = new THREE.Mesh(
      sheetGeo,
      new THREE.MeshStandardMaterial({ map: sheetTex.clone(), roughness: 0.9, metalness: 0 }),
    );
    frontSheet.position.set(0.12, 0.08, 0);
    world.add(frontSheet);

    const shadow = new THREE.Mesh(
      new THREE.PlaneGeometry(6, 6),
      new THREE.MeshBasicMaterial({
        map: makeShadowTexture(),
        transparent: true,
        depthWrite: false,
      }),
    );
    shadow.position.set(0.1, -0.2, -0.8);
    world.add(shadow);

    // Scan band — the ATS read.
    const scan = new THREE.Mesh(
      new THREE.PlaneGeometry(3.2, 0.1),
      new THREE.MeshBasicMaterial({
        color: ACCENT_BRIGHT,
        transparent: true,
        opacity: 0,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      }),
    );
    scan.position.set(0.12, 0, 0.03);
    world.add(scan);
    const scanGlow = new THREE.Mesh(
      new THREE.PlaneGeometry(3.4, 0.9),
      new THREE.MeshBasicMaterial({
        color: ACCENT,
        transparent: true,
        opacity: 0,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      }),
    );
    scanGlow.position.copy(scan.position);
    scanGlow.position.z -= 0.01;
    world.add(scanGlow);

    // Pointer parallax target, normalised roughly -1..1.
    const pointer = { x: 0, y: 0 };
    let lastPointer = 0;
    const onPointerMove = (e: PointerEvent) => {
      pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.y = (e.clientY / window.innerHeight) * 2 - 1;
      lastPointer = performance.now();
    };
    window.addEventListener("pointermove", onPointerMove, { passive: true });

    const clock = new THREE.Clock();
    let prev = 0;
    let raf = 0;
    let running = false;

    const SCAN_PERIOD = 6.2; // seconds: sweep + rest
    const SCAN_SWEEP = 2.4;
    const TOP = 2.1;
    const BOT = -2.1;

    const frame = () => {
      raf = requestAnimationFrame(frame);
      const t = clock.getElapsedTime();
      const dt = Math.min(t - prev, 0.05);
      prev = t;

      // Idle drift takes over ~1.4s after the pointer stops.
      const idle = performance.now() - lastPointer > 1400;
      const tx = idle ? Math.sin(t * 0.28) * 0.55 : pointer.x * 0.7;
      const ty = idle ? Math.cos(t * 0.22) * 0.3 : -pointer.y * 0.4;

      camera.position.x += (tx - camera.position.x) * Math.min(dt * 3.5, 1);
      camera.position.y += (ty - camera.position.y) * Math.min(dt * 3.5, 1);
      camera.lookAt(0, 0, 0);
      world.rotation.y += (0.32 + tx * 0.05 - world.rotation.y) * Math.min(dt * 2, 1);

      frontSheet.position.y = 0.08 + Math.sin(t * 0.6) * 0.03;
      backSheet.position.y = -0.3 + Math.sin(t * 0.6 + 1.1) * 0.025;

      // Scan sweep with eased ends.
      const p = (t % SCAN_PERIOD) / SCAN_SWEEP;
      if (p <= 1) {
        const eased = p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2;
        const y = TOP + (BOT - TOP) * eased;
        scan.position.y = y;
        scanGlow.position.y = y;
        const edge = Math.sin(Math.PI * p);
        (scan.material as THREE.MeshBasicMaterial).opacity = 0.55 * edge;
        (scanGlow.material as THREE.MeshBasicMaterial).opacity = 0.16 * edge;
      } else {
        (scan.material as THREE.MeshBasicMaterial).opacity = 0;
        (scanGlow.material as THREE.MeshBasicMaterial).opacity = 0;
      }

      renderer.render(scene, camera);
    };

    const start = () => {
      if (running) return;
      running = true;
      prev = 0;
      clock.start();
      raf = requestAnimationFrame(frame);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    let onScreen = false;
    const sync = () => (onScreen && !document.hidden ? start() : stop());
    const io = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting;
      sync();
    }, { threshold: 0.01 });
    io.observe(mount);
    document.addEventListener("visibilitychange", sync);

    const ro = new ResizeObserver(() => {
      ({ w, h } = size());
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    });
    ro.observe(mount);

    const onContextLost = (e: Event) => {
      e.preventDefault();
      stop();
    };
    renderer.domElement.addEventListener("webglcontextlost", onContextLost);

    // First render succeeded — retire the CSS idle tilt for the real thing.
    renderer.render(scene, camera);
    mount.closest(".hero-stage")?.classList.add("has-hero-scene");

    return () => {
      stop();
      io.disconnect();
      ro.disconnect();
      document.removeEventListener("visibilitychange", sync);
      window.removeEventListener("pointermove", onPointerMove);
      renderer.domElement.removeEventListener("webglcontextlost", onContextLost);
      mount.closest(".hero-stage")?.classList.remove("has-hero-scene");
      scene.traverse((obj) => {
        if (obj instanceof THREE.Mesh) {
          obj.geometry.dispose();
          const m = obj.material as THREE.Material & { map?: THREE.Texture };
          m.map?.dispose();
          m.dispose();
        }
      });
      sheetTex.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return <div ref={mountRef} className="hero-scene" aria-hidden="true" />;
}
