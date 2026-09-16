"use client";

import { useMotionGate } from "@/lib/motion-gate";
import { goToSection } from "@/lib/scroll";

const NAV = ["hero", "about", "skills", "projects", "contact"];

/**
 * 00 Masthead: sticky route chrome, independent of every SiteSection so
 * pinned scenes can never trap it. Anchor identities are unchanged; clicks
 * route through the scroll bus (layout-stable targets under pinning) with
 * plain-anchor hrefs as the no-JS fallback.
 */
export function Masthead() {
  const { motionOK } = useMotionGate();
  return (
    <header className="sticky top-0 z-50 border-b border-(--color-hairline) bg-(--color-void)/85 backdrop-blur-md">
      <div className="flex flex-wrap items-baseline justify-between gap-2 px-6 py-4 md:px-12">
        <p className="font-display text-lg font-semibold tracking-tight md:text-2xl">
          Piyush Kumar
          <span aria-hidden className="ml-2 inline-block h-2 w-2 rounded-full bg-(--color-brass)" />
        </p>
        <nav
          aria-label="sections"
          className="flex flex-wrap gap-x-5 gap-y-1 font-mono text-xs text-(--color-faint)"
        >
          {NAV.map((item, i) => (
            <a
              key={item}
              href={`#${item}`}
              onClick={(e) => {
                e.preventDefault();
                goToSection(item, motionOK);
              }}
              className="transition-colors duration-200 hover:text-(--color-brass)"
            >
              <span aria-hidden className="mr-1 text-(--color-faint)/50">
                0{i + 1}
              </span>
              {item}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
