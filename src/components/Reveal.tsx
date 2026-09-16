"use client";

import { motion } from "motion/react";
import { useMotionGate } from "@/lib/motion-gate";
import { useOnceVisible } from "@/lib/use-once-visible";
import { MOTION_EASE } from "@/lib/motion-tokens";

/**
 * Reveal: the single scroll-entrance primitive. Plain fade-up (≤300ms),
 * once per mount, final state rendered immediately under reduced-motion.
 * `disabled` opts out inside pinned stages, where the scrub owns entrances.
 */
export function Reveal({
  children,
  delay = 0,
  className,
  disabled = false,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  disabled?: boolean;
}) {
  const { motionOK } = useMotionGate();
  const { ref, visible } = useOnceVisible<HTMLDivElement>();

  if (!motionOK || disabled) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div ref={ref} className={className}>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={visible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.3, delay, ease: [...MOTION_EASE] }}
      >
        {children}
      </motion.div>
    </div>
  );
}
