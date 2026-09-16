/** Single motion budget: one ease-out curve, 200–350ms durations. */
export const MOTION_EASE = [0.22, 1, 0.36, 1] as const;
export const MOTION_EASE_CSS = "cubic-bezier(0.22, 1, 0.36, 1)";

/** Section entrance: plain fade-up, 300ms max, once per Section. */
export const FADE_UP_MS = 300;
export const FADE_UP_DISTANCE = 16;
