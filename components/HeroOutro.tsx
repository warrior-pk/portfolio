"use client";

import { useEffect, useRef } from "react";
import { MOTION_EASE_CSS } from "@/lib/motion-tokens";
import { useMotionGate } from "@/lib/motion-gate";

/**
 * Hero outro pin: one of max two Apple-style moments. The hero content
 * stays pinned while the About Section enters, fading/scaling out tied to
 * About's position — not to raw scroll distance. Static when the motion
 * gate is off.
 */
export function HeroOutro({ children }: { children: React.ReactNode }) {
  const { motionOK } = useMotionGate();
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!motionOK) return;
    const inner = innerRef.current;
    if (!inner) return;
    let ticking = false;
    const update = () => {
      ticking = false;
      // 0 while About is still below the viewport, 1 as its top reaches top.
      const about = document.getElementById("about");
      const top = about
        ? about.getBoundingClientRect().top
        : window.innerHeight;
      const progress = Math.min(
        1,
        Math.max(0, 1 - top / window.innerHeight),
      );
      inner.style.opacity = String(1 - progress * 0.9);
      inner.style.transform = `scale(${1 - progress * 0.06}) translateY(${-progress * 40}px)`;
    };
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [motionOK]);

  if (!motionOK) return <>{children}</>;

  return (
    <div className="relative h-[170vh]">
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
        <div
          ref={innerRef}
          style={{ transition: `opacity 200ms ${MOTION_EASE_CSS}` }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
