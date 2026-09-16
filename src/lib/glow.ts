"use client";

import { useEffect, useState } from "react";

/** Site highlight as bare RGB channels for glow effects (brass #d9a441). */
export const BRASS_GLOW = "217, 164, 65";
/** Dark-world highlight (cold #7aa2ff). */
export const COLD_GLOW = "122, 162, 255";

/** Spotlight color for a world; unknown worlds fall back to brass. */
export function glowForWorld(world: string | null): string {
  return world === "dark-world" ? COLD_GLOW : BRASS_GLOW;
}

/**
 * Live glow color: brass until the dark-world lands on the document, then
 * cold. Server-safe default so gated branches render identically on mount.
 */
export function useGlowColor(): string {
  const [glow, setGlow] = useState(BRASS_GLOW);
  useEffect(() => {
    const read = () =>
      setGlow(glowForWorld(document.documentElement.dataset.world ?? null));
    read();
    const observer = new MutationObserver(read);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-world"],
    });
    return () => observer.disconnect();
  }, []);
  return glow;
}
