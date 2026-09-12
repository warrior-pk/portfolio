"use client";

import { useEffect, useState } from "react";
import { SECTIONS, VERSION } from "@/lib/site";
import { SweepingSecondsHand } from "./SweepingSecondsHand";

function useNow() {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const t = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(t);
  }, []);
  return now;
}

function useActiveSection() {
  const [active, setActive] = useState("hero");
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    for (const s of SECTIONS) {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);
  return active;
}

/**
 * TUI chrome: slim persistent status bar owning the Section indicator,
 * the version string carrying the Hidden 18, the ticking timestamp with
 * mechanical-tick easing, and the Sweeping seconds hand.
 */
export function StatusBar() {
  const now = useNow();
  const active = useActiveSection();
  const position = SECTIONS.findIndex((s) => s.id === active) + 1 || 1;

  const hh = String(now.getHours()).padStart(2, "0");
  const mm = String(now.getMinutes()).padStart(2, "0");
  const ss = String(now.getSeconds()).padStart(2, "0");

  return (
    <div
      role="status"
      aria-label={`section ${position} of 5, version ${VERSION}`}
      className="fixed inset-x-0 bottom-0 z-[60] border-t border-(--color-hairline) bg-(--color-void)/90 backdrop-blur-sm"
    >
      <div className="mx-auto flex h-9 max-w-6xl items-center gap-3 px-4 font-mono text-[11px] tracking-wide text-(--color-faint)">
        <span className="tabular-nums text-(--color-lume)">
          {String(position).padStart(2, "0")}/05
        </span>
        <span aria-hidden className="text-(--color-hairline)">
          |
        </span>
        <span>{VERSION}</span>
        <span aria-hidden className="text-(--color-hairline)">
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
