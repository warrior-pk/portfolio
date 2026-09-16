"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useMotionGate } from "@/lib/motion-gate";
import { registerScroller, stageTargetFor } from "@/lib/scroll";

interface EngineInstance {
  destroy: () => void;
  scrollTo: (target: string | HTMLElement) => void;
  raf: (time: number) => void;
  on: (event: "scroll", callback: () => void) => void;
}

/**
 * Lenis smooth-scroll provider, driving through the shared GSAP ticker so
 * the pin/scrub engine never drifts from the scroller. Loaded lazily so
 * hero JS stays minimal; fully off under reduced-motion (native instant
 * jumps instead). Pins re-measure on window load for slow fonts/media.
 */
export function LenisProvider({ children }: { children: React.ReactNode }) {
  const { motionOK } = useMotionGate();

  useEffect(() => {
    if (!motionOK) {
      registerScroller(null);
      return;
    }
    gsap.registerPlugin(ScrollTrigger);
    let engine: EngineInstance | null = null;
    let cancelled = false;
    let cleanupEngine = () => {};

    (async () => {
      const { default: Lenis } = await import("lenis");
      if (cancelled) return;
      const instance: EngineInstance = new Lenis({ duration: 1.1 });
      engine = instance;
      registerScroller((target) => {
        // Resolve the layout-stable wrapper: Lenis honors its scroll-margin
        // and its rect stays truthful while a pin is active.
        const node = stageTargetFor(target);
        if (node instanceof HTMLElement) instance.scrollTo(node);
        else instance.scrollTo(`#${target}`);
      });
      const sync = () => {
        ScrollTrigger.update();
      };
      instance.on("scroll", sync);
      const drive = (time: number) => {
        instance.raf(time * 1000);
      };
      gsap.ticker.add(drive);
      gsap.ticker.lagSmoothing(0);
      const refresh = () => {
        ScrollTrigger.refresh();
      };
      window.addEventListener("load", refresh);
      cleanupEngine = () => {
        window.removeEventListener("load", refresh);
        gsap.ticker.remove(drive);
      };
    })();

    return () => {
      cancelled = true;
      cleanupEngine();
      engine?.destroy();
      registerScroller(null);
    };
  }, [motionOK]);

  return <>{children}</>;
}
