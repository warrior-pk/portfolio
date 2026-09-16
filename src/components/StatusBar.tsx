"use client";

import { useEffect, useState } from "react";
import { SECTIONS, VERSION } from "@/lib/site";

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
 * TUI chrome: slim persistent status bar owning the version string and
 * the active-section readout.
 */
export function StatusBar() {
  const active = useActiveSection();

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
      </div>
    </div>
  );
}
