"use client";

/**
 * Scroll bus: LenisProvider registers its scroller here so any future
 * Section navigation can route through smooth scroll in one place.
 */

export type ScrollFn = (target: string) => void;

let scroller: ScrollFn | null = null;

export function registerScroller(fn: ScrollFn | null) {
  scroller = fn;
}

export function getScroller(): ScrollFn | null {
  return scroller;
}
