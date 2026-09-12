"use client";

import { useEffect, useRef, useState } from "react";
import { useMotionGate } from "./motion-gate";

/**
 * Once-visible gate: flips true the first time the returned ref enters
 * the viewport. Shared by every fade-up / settle reveal so the
 * IntersectionObserver once-pattern lives in exactly one place.
 */
export function useOnceVisible<T extends HTMLElement>(threshold = 0.15) {
  const { motionOK } = useMotionGate();
  const ref = useRef<T>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!motionOK) {
      setVisible(true);
      return;
    }
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [motionOK, threshold]);

  return { ref, visible };
}
