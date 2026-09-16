/**
 * Scrub seam: pin travel and shared scrub progress for pinned SiteSections.
 * Travel derives from measured content height so short scenes still dwell
 * while their inner timeline plays, and tall future content extends the
 * scrub automatically (stepped sub-scenes).
 */

/** Hero pin progress (0..1), written by the hero stage, read by the blob. */
export const heroScrub = { value: 0 };

/**
 * Pin travel in px: content overflow plus a hold of `holdRatio` viewports.
 */
export function travelFor(
  contentH: number,
  vh: number,
  holdRatio = 0.6,
): number {
  if (!(vh > 0)) return 0;
  return Math.max(holdRatio * vh, contentH - vh + holdRatio * vh);
}

/** Overall route progress (0..1) from scroll position. */
export function progressFor(scrollY: number, docH: number, vh: number): number {
  const room = docH - vh;
  if (!(room > 0)) return 1;
  return Math.min(1, Math.max(0, scrollY / room));
}
