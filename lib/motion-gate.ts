"use client";

import { useEffect, useState } from "react";

export interface MotionGate {
  /** prefers-reduced-motion is active */
  reducedMotion: boolean;
  /** touch / coarse pointer */
  coarsePointer: boolean;
  /** false when reduced motion is on — kills smooth scroll, reveals, pins */
  motionOK: boolean;
  /** true only for fine desktop pointers with no reduced-motion — cursor FX gate */
  pointerFX: boolean;
}

function readGate(): MotionGate {
  if (typeof window === "undefined" || typeof window.matchMedia === "undefined") {
    return {
      reducedMotion: false,
      coarsePointer: false,
      motionOK: true,
      pointerFX: false,
    };
  }
  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;
  const coarsePointer = window.matchMedia("(pointer: coarse)").matches;
  const finePointer = window.matchMedia("(pointer: fine)").matches;
  const motionOK = !reducedMotion;
  return {
    reducedMotion,
    coarsePointer,
    motionOK,
    pointerFX: finePointer && !coarsePointer && !reducedMotion,
  };
}

/**
 * Single motion gate for the whole route. Disables smooth scroll, reveals,
 * cursor effects and pins under reduced-motion; cursor FX additionally need
 * a fine desktop pointer. Mirrors the gate to `data-motion` for CSS.
 */
export function useMotionGate(): MotionGate {
  const [gate, setGate] = useState<MotionGate>(readGate);

  useEffect(() => {
    const update = () => setGate(readGate());
    setGate(readGate());
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const coarse = window.matchMedia("(pointer: coarse)");
    const fine = window.matchMedia("(pointer: fine)");
    reduce.addEventListener("change", update);
    coarse.addEventListener("change", update);
    fine.addEventListener("change", update);
    return () => {
      reduce.removeEventListener("change", update);
      coarse.removeEventListener("change", update);
      fine.removeEventListener("change", update);
    };
  }, []);

  useEffect(() => {
    document.documentElement.dataset.motion = gate.motionOK ? "on" : "off";
  }, [gate.motionOK]);

  return gate;
}
