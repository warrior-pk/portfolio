"use client";

import { useEffect, useRef } from "react";
import { useMotionGate } from "@/lib/motion-gate";

/**
 * Cursor: small dot + soft trailing spotlight. Desktop-pointer only,
 * completely off on touch and under reduced-motion. The spotlight's only
 * reveal job is exposing faint grid labels in the hero.
 * When active, the native OS cursor is hidden (via `data-cursor="custom"`
 * on <html>) so the dot is the sole pointer.
 */
export function CursorSpotlight() {
  const { pointerFX } = useMotionGate();
  const dotRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

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
    const glow = glowRef.current;
    if (!dot || !glow) return;

    let x = -100;
    let y = -100;
    let gx = -100;
    let gy = -100;
    let raf = 0;
    let visible = false;

    const onMove = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
      if (!visible) {
        visible = true;
        dot.style.opacity = "1";
        glow.style.opacity = "1";
      }
      dot.style.transform = `translate(${x}px, ${y}px)`;
    };
    const onLeave = () => {
      visible = false;
      dot.style.opacity = "0";
      glow.style.opacity = "0";
    };
    const trail = () => {
      gx += (x - gx) * 0.12;
      gy += (y - gy) * 0.12;
      glow.style.transform = `translate(${gx}px, ${gy}px)`;
      raf = requestAnimationFrame(trail);
    };
    raf = requestAnimationFrame(trail);
    document.addEventListener("pointermove", onMove);
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, [pointerFX]);

  if (!pointerFX) return null;

  return (
    <>
      <div
        ref={dotRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[70] -ml-[3px] -mt-[3px] h-1.5 w-1.5 rounded-full bg-(--color-brass) opacity-0"
      />
      <div
        ref={glowRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[1] -ml-[160px] -mt-[160px] h-80 w-80 rounded-full opacity-0"
        style={{
          background:
            "radial-gradient(circle, color-mix(in srgb, var(--color-brass) 7%, transparent), transparent 65%)",
        }}
      />
    </>
  );
}
