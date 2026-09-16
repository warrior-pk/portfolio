"use client";

/**
 * Scroll bus: LenisProvider registers its scroller here so Section
 * navigation (masthead anchors, SectionDots) routes through smooth scroll
 * in one place.
 */

export type ScrollFn = (target: string) => void;

let scroller: ScrollFn | null = null;

export function registerScroller(fn: ScrollFn | null) {
  scroller = fn;
}

export function getScroller(): ScrollFn | null {
  return scroller;
}

/**
 * Layout-stable navigation target: the pinned-stage wrapper if the section
 * is pinned, else the section itself. A pinned section's own box is fixed
 * mid-pin, so its rect no longer marks a scroll destination — its wrapper
 * (the pin trigger, always in flow) does.
 */
export function stageTargetFor(id: string): Element | null {
  if (typeof document === "undefined") return null;
  const el = document.getElementById(id);
  return el?.closest("[data-stage]") ?? el;
}

/** Glide to a SiteSection via the bus, falling back to native scrolling. */
export function goToSection(id: string, smooth: boolean) {
  const scroller = getScroller();
  if (scroller) {
    scroller(id);
    return;
  }
  stageTargetFor(id)?.scrollIntoView({
    behavior: smooth ? "smooth" : "auto",
  });
}
