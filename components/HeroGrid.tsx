"use client";

import { useEffect, useRef } from "react";
import { useMotionGate } from "@/lib/motion-gate";

/**
 * Hero grid: static Zed-style hairlines living in the Hero Section only,
 * with a local low-opacity mouse glow on desktop pointers. Fades out on
 * scroll past the Hero; never persists down the route.
 */
export function HeroGrid() {
  const { pointerFX } = useMotionGate();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!pointerFX) return;
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const onMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        el.style.setProperty("--mx", `${x}px`);
        el.style.setProperty("--my", `${y}px`);
        el.style.setProperty("--glow", "1");
      });
    };
    const onLeave = () => {
      el.style.setProperty("--glow", "0");
    };
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, [pointerFX]);

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden"
      style={{ ["--mx" as string]: "50%", ["--my" as string]: "30%", ["--glow" as string]: "0" }}
    >
      {/* static hairlines */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(var(--color-hairline) 1px, transparent 1px), linear-gradient(90deg, var(--color-hairline) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          opacity: 0.35,
          maskImage:
            "radial-gradient(ellipse 90% 80% at 50% 40%, black 30%, transparent 75%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 90% 80% at 50% 40%, black 30%, transparent 75%)",
        }}
      />
      {/* faint grid labels: only revealed by the spotlight */}
      <div
        className="absolute inset-0 font-mono text-[10px] text-(--color-faint)"
        style={{
          opacity: "var(--glow)",
          maskImage:
            "radial-gradient(circle 180px at var(--mx) var(--my), black, transparent 70%)",
          WebkitMaskImage:
            "radial-gradient(circle 180px at var(--mx) var(--my), black, transparent 70%)",
          transition: "opacity 250ms cubic-bezier(0.22, 1, 0.36, 1)",
        }}
      >
        <span className="absolute left-[8%] top-[18%]">r.01 / drift</span>
        <span className="absolute right-[10%] top-[32%]">r.02 / signal</span>
        <span className="absolute bottom-[24%] left-[14%]">r.03 / static</span>
        <span className="absolute bottom-[30%] right-[16%]">r.04 / lume</span>
      </div>
      {/* local mouse glow */}
      <div
        className="absolute inset-0"
        style={{
          opacity: "var(--glow)",
          background:
            "radial-gradient(circle 220px at var(--mx) var(--my), color-mix(in srgb, var(--color-brass) 9%, transparent), transparent 70%)",
          transition: "opacity 250ms cubic-bezier(0.22, 1, 0.36, 1)",
        }}
      />
    </div>
  );
}
