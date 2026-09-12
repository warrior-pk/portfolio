"use client";

import { useEffect, useState } from "react";
import { BOOT_MARK_MS } from "@/lib/motion-tokens";
import { useMotionGate } from "@/lib/motion-gate";
import { Triquetra } from "./Triquetra";

/**
 * Boot mark: the Triquetra loader placement. A quiet mark, never a
 * showreel intro — always gone within 800ms, skipped under reduced-motion.
 */
export function BootMark() {
  const { motionOK } = useMotionGate();
  const [gone, setGone] = useState(false);

  useEffect(() => {
    if (!motionOK) {
      setGone(true);
      return;
    }
    const t = window.setTimeout(() => setGone(true), BOOT_MARK_MS);
    return () => window.clearTimeout(t);
  }, [motionOK]);

  if (gone) return null;

  return (
    <div
      aria-hidden
      className="fixed inset-0 z-[80] flex items-center justify-center bg-(--color-void)"
    >
      <Triquetra className="h-8 w-8 text-(--color-faint)" />
    </div>
  );
}
