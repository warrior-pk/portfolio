"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useMotionGate } from "@/lib/motion-gate";
import { computeLensedTarget, dampFactor, gravityRadiusFor } from "@/lib/gravity";

/**
 * Cursor: small dot, desktop-pointer only, completely off on touch and
 * under reduced-motion. When active, the native OS cursor is hidden (via
 * `data-cursor="custom"` on <html>) so the dot is the sole pointer.
 * Gravity lensing: inside the hero the dot bends toward #god-particle
 * (the black hole stays put — the light gets pulled), capped so clicks
 * stay usable.
 */
export function CursorSpotlight() {
  const { pointerFX } = useMotionGate();
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!pointerFX) {
      document.documentElement.removeAttribute("data-cursor");
      return;
    }
    document.documentElement.dataset.cursor = "custom";
    return () => {
      document.documentElement.removeAttribute("data-cursor");
    };
  }, [pointerFX]);

  useEffect(() => {
    if (!pointerFX) return;
    const dot = dotRef.current;
    if (!dot) return;

    gsap.ticker.lagSmoothing(500, 33);

    const setDotX = gsap.quickSetter(dot, "x", "px");
    const setDotY = gsap.quickSetter(dot, "y", "px");

    // mx/my = true OS pointer, dx/dy = lensed dot.
    let mx = -100;
    let my = -100;
    let dx = -100;
    let dy = -100;
    let visible = false;
    let hole: HTMLElement | null = null;

    const onMove = (e: PointerEvent) => {
      mx = e.clientX;
      my = e.clientY;
      if (!visible) {
        visible = true;
        dx = mx;
        dy = my;
        hole ??= document.getElementById("god-particle");
        dot.style.opacity = "1";
      }
    };
    const onLeave = () => {
      visible = false;
      dot.style.opacity = "0";
    };
    const frame = (_time: number, deltaTime: number) => {
      if (!visible) return;
      // Bend the dot toward the black hole; outside the hero the
      // distance exceeds the radius and the pull falls to zero.
      let tx = mx;
      let ty = my;
      hole ??= document.getElementById("god-particle");
      if (hole) {
        const r = hole.getBoundingClientRect();
        if (r.bottom > 0 && r.top < window.innerHeight) {
          const lens = computeLensedTarget(
            mx,
            my,
            r.left + r.width / 2,
            r.top + r.height / 2,
            gravityRadiusFor(r.width, r.height),
          );
          tx = lens.x;
          ty = lens.y;
        }
      }
      const dotK = dampFactor(0.35, deltaTime);
      dx += (tx - dx) * dotK;
      dy += (ty - dy) * dotK;
      setDotX(dx);
      setDotY(dy);
    };
    gsap.ticker.add(frame);
    document.addEventListener("pointermove", onMove);
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      gsap.ticker.remove(frame);
      document.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, [pointerFX]);

  if (!pointerFX) return null;

  return (
    <div
      ref={dotRef}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[70] -ml-[3px] -mt-[3px] h-1.5 w-1.5 rounded-full bg-(--color-brass) opacity-0"
    />
  );
}
