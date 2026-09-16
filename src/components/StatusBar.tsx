"use client";

import { useEffect, useState } from "react";
import { SECTIONS, VERSION } from "@/lib/site";
import { SweepingSecondsHand } from "./SweepingSecondsHand";

function useNow() {
  // Null on server + first client render so SSR HTML matches; the clock
  // starts after mount. Rendering `new Date()` during render would hydrate
  // against a stale server timestamp.
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    setNow(new Date());
    const t = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(t);
  }, []);
  return now;
}

function useActiveSection() {
  const [active, setActive] = useState(SECTIONS[0]);
  useEffect(() => {
    // Center-band probe, same as SectionDots: layout offsets drift under
    // pinning, but the section crossing viewport center is always truth.
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const found = SECTIONS.find((s) => s.id === entry.target.id);
            if (found) setActive(found);
          }
        }
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    );
    for (const section of SECTIONS) {
      const el = document.getElementById(section.id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);
  return active;
}

/**
 * TUI chrome: slim persistent status bar owning the version string,
 * the active-section readout, the ticking timestamp with mechanical-tick
 * easing, and the Sweeping seconds hand.
 */
export function StatusBar() {
  const now = useNow();
  const active = useActiveSection();

  const hh = now ? String(now.getHours()).padStart(2, "0") : "--";
  const mm = now ? String(now.getMinutes()).padStart(2, "0") : "--";
  const ss = now ? String(now.getSeconds()).padStart(2, "0") : "--";

  return (
    <div
      role="status"
      aria-label={`version ${VERSION}`}
      className="fixed inset-x-0 bottom-0 z-[60] border-t border-(--color-hairline) bg-(--color-void)/90 backdrop-blur-sm"
    >
      <div className="mx-auto flex h-9 max-w-6xl items-center gap-3 px-4 font-mono text-[11px] tracking-wide text-(--color-faint)">
        <span>{VERSION}</span>
        <span aria-hidden className="text-(--color-hairline)">
          |
        </span>
        <span aria-hidden className="hidden text-(--color-brass) sm:inline">
          {active.index} {active.label}
        </span>
        <span aria-hidden className="hidden text-(--color-hairline) sm:inline">
          |
        </span>
        <span className="tabular-nums" aria-label={`current time ${hh}:${mm}:${ss}`}>
          {hh}
          <span className="tick-colon">:</span>
          {mm}
          <span className="tick-colon">:</span>
          {ss}
        </span>
        <span className="ml-auto flex items-center gap-2">
          <span className="hidden sm:inline">scroll</span>
          <SweepingSecondsHand />
        </span>
      </div>
    </div>
  );
}
