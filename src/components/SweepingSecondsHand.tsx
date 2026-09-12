"use client";

import { useEffect, useRef } from "react";
import { useMotionGate } from "@/lib/motion-gate";

/**
 * Sweeping seconds: scroll progress as a mechanical watch's sweeping
 * seconds hand with tick easing. Thin hand + tick marks, one placement
 * only (status bar). No other watch imagery anywhere. Frozen under
 * reduced-motion — the gate kills ALL motion.
 */
const TICKS = 60;
const DEGREES = 360;

export function SweepingSecondsHand() {
  const { motionOK } = useMotionGate();
  const handRef = useRef<SVGLineElement>(null);

  useEffect(() => {
    const hand = handRef.current;
    if (!hand) return;

    const update = () => {
      const max =
        document.documentElement.scrollHeight - window.innerHeight || 1;
      const progress = Math.min(1, Math.max(0, window.scrollY / max));
      // Tick easing: snap to discrete ticks like a movement.
      const snapped = Math.round(progress * TICKS) / TICKS;
      hand.setAttribute("transform", `rotate(${snapped * DEGREES} 14 14)`);
    };

    update();
    if (!motionOK) return;

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        update();
        ticking = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [motionOK]);

  return (
    <svg
      viewBox="0 0 28 28"
      aria-hidden
      className="h-7 w-7 shrink-0 text-(--color-faint)"
    >
      {Array.from({ length: 12 }).map((_, i) => {
        const angle = (i * 30 * Math.PI) / 180;
        const outer = 12.5;
        const inner = i % 3 === 0 ? 9.5 : 10.8;
        return (
          <line
            key={i}
            x1={14 + inner * Math.sin(angle)}
            y1={14 - inner * Math.cos(angle)}
            x2={14 + outer * Math.sin(angle)}
            y2={14 - outer * Math.cos(angle)}
            stroke="currentColor"
            strokeWidth={i % 3 === 0 ? 1.2 : 0.7}
            opacity={i % 3 === 0 ? 0.9 : 0.5}
          />
        );
      })}
      <line
        ref={handRef}
        x1={14}
        y1={14}
        x2={14}
        y2={4.5}
        stroke="var(--color-brass)"
        strokeWidth={1.2}
        strokeLinecap="round"
        transform="rotate(0 14 14)"
      />
      <circle cx={14} cy={14} r={1.3} fill="var(--color-brass)" />
    </svg>
  );
}
