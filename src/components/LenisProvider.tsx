"use client";

import { useEffect } from "react";
import { useMotionGate } from "@/lib/motion-gate";
import { registerScroller } from "@/lib/scroll";

/**
 * Lenis smooth-scroll provider. Loaded lazily so hero JS stays minimal;
 * fully off under reduced-motion (native instant jumps instead).
 */
export function LenisProvider({ children }: { children: React.ReactNode }) {
  const { motionOK } = useMotionGate();

  useEffect(() => {
    if (!motionOK) {
      registerScroller(null);
      return;
    }
    let raf = 0;
    let lenis: { destroy: () => void; scrollTo: (t: string) => void } | null =
      null;
    let cancelled = false;

    (async () => {
      const { default: Lenis } = await import("lenis");
      if (cancelled) return;
      const instance = new Lenis({ duration: 1.1 });
      lenis = instance;
      registerScroller((target) => instance.scrollTo(`#${target}`));
      const loop = (time: number) => {
        instance.raf(time);
        raf = requestAnimationFrame(loop);
      };
      raf = requestAnimationFrame(loop);
    })();

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      lenis?.destroy();
      registerScroller(null);
    };
  }, [motionOK]);

  return <>{children}</>;
}
