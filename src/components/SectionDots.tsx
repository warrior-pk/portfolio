"use client";

import { useEffect, useState } from "react";
import { SECTIONS } from "@/lib/site";
import { useMotionGate } from "@/lib/motion-gate";
import { getScroller } from "@/lib/scroll";
import { progressFor } from "@/lib/scrub";

function goTo(id: string, smooth: boolean) {
  const scroller = getScroller();
  if (scroller) {
    scroller(id);
    return;
  }
  document
    .getElementById(id)
    ?.scrollIntoView({ behavior: smooth ? "smooth" : "auto" });
}

/**
 * SectionDots: side-dot plus progress chrome marking the active
 * full-screen SiteSection. Pointer-FX gate only — hidden for touch and
 * reduced-motion, where the route is a normal stacked flow.
 * Active state follows the section crossing viewport center, which holds
 * for pinned stages and the unpinned contact finale alike.
 */
export function SectionDots() {
  const { motionOK, pointerFX } = useMotionGate();
  const [active, setActive] = useState<string>(SECTIONS[0].id);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!pointerFX) return;
    const onScroll = () => {
      setProgress(
        progressFor(
          window.scrollY,
          document.documentElement.scrollHeight,
          window.innerHeight,
        ),
      );
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    );
    for (const section of SECTIONS) {
      const el = document.getElementById(section.id);
      if (el) observer.observe(el);
    }
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      observer.disconnect();
    };
  }, [pointerFX]);

  if (!pointerFX) return null;

  return (
    <>
      <div
        aria-hidden
        className="fixed top-0 left-0 z-[55] h-0.5 bg-(--color-brass) transition-[width] duration-150"
        style={{ width: `${progress * 100}%` }}
      />
      <nav
        aria-label="section navigation"
        className="fixed top-1/2 right-3 z-40 flex -translate-y-1/2 flex-col gap-3 md:right-5"
      >
        {SECTIONS.map((section) => {
          const current = active === section.id;
          return (
            <button
              key={section.id}
              type="button"
              onClick={() => goTo(section.id, motionOK)}
              aria-label={`Go to ${section.label}`}
              aria-current={current ? "true" : undefined}
              className="group flex items-center justify-end gap-2 p-1"
            >
              <span
                aria-hidden
                className="font-mono text-[10px] text-(--color-faint) opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100"
              >
                {section.index}
              </span>
              <span
                aria-hidden
                className={`block rounded-full transition-all duration-200 ${
                  current
                    ? "h-2 w-2 bg-(--color-brass)"
                    : "h-1.5 w-1.5 bg-(--color-faint)/40 group-hover:bg-(--color-faint)"
                }`}
              />
            </button>
          );
        })}
      </nav>
    </>
  );
}
