"use client";

/**
 * Scroll bus: the Hero prompt asks for a Section, LenisProvider performs it.
 * Falls back to native smooth scroll when Lenis is off (reduced-motion/touch).
 */

export type ScrollFn = (target: string) => void;

let scroller: ScrollFn | null = null;

export function registerScroller(fn: ScrollFn | null) {
  scroller = fn;
}

export function scrollToSection(sectionId: string) {
  if (scroller) {
    scroller(sectionId);
    return;
  }
  const reduced =
    typeof window !== "undefined" &&
    typeof window.matchMedia !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  document
    .getElementById(sectionId)
    ?.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
}
