/**
 * God-particle gravity: single source of truth for the black-hole pull.
 * Both CursorSpotlight (dot lensing) and HeroBlob (intensity surge) share
 * these constants so the feel stays tuned identically.
 */

export const GRAVITY_RADIUS = 520;
export const GRAVITY_AURA = 420;
export const MAX_PULL = 90;

export interface LensedTarget {
  x: number;
  y: number;
  /** 0..1 proximity — 1 at the event horizon, 0 beyond the radius */
  prox: number;
}

/**
 * Field radius that always covers the whole blob plus an aura around it.
 * Scales with the blob's on-screen size so mobile (68vw) and desktop
 * (56vmin) both stay fully inside the field.
 */
export function gravityRadiusFor(w: number, h: number): number {
  return Math.max(GRAVITY_RADIUS, Math.hypot(w, h) / 2 + GRAVITY_AURA);
}

/**
 * Magnetic-bend model: the dot bends toward the hole center with a
 * quadratic falloff (1 - d/R)^2, capped at MAX_PULL so clicks stay usable.
 * Kinematic offset, not Newtonian integration — tight control by design.
 */
export function computeLensedTarget(
  mx: number,
  my: number,
  cx: number,
  cy: number,
  radius: number = GRAVITY_RADIUS,
): LensedTarget {
  const vx = cx - mx;
  const vy = cy - my;
  const dist = Math.hypot(vx, vy);
  if (dist >= radius || dist <= 0.01) {
    return { x: mx, y: my, prox: 0 };
  }
  const falloff = (1 - dist / radius) ** 2;
  const prox = falloff;
  const pull = Math.min(MAX_PULL, falloff * MAX_PULL * 1.6);
  return {
    x: mx + (vx / dist) * pull,
    y: my + (vy / dist) * pull,
    prox,
  };
}

/** Frame-rate independent exponential smoothing factor. */
export function dampFactor(smoothing: number, deltaMs: number): number {
  // smoothing is the per-60fps rate (e.g. 0.35); scale to actual delta.
  return 1 - Math.pow(1 - smoothing, deltaMs / (1000 / 60));
}
