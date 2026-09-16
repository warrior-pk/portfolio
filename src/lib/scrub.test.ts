import { describe, expect, it } from "vitest";
import { heroScrub, progressFor, travelFor } from "./scrub";

/**
 * Scrub seam: pin travel derives from measured content height so short
 * scenes still dwell while tall future content extends the scrub.
 */
describe("travelFor", () => {
  it("holds short scenes for a fraction of the viewport", () => {
    expect(travelFor(800, 1000)).toBe(600);
  });

  it("equals the hold when content exactly fills the viewport", () => {
    expect(travelFor(1000, 1000)).toBe(600);
  });

  it("extends with overflow for tall content", () => {
    expect(travelFor(2500, 1000)).toBe(2100);
  });

  it("returns zero without a viewport", () => {
    expect(travelFor(2000, 0)).toBe(0);
  });
});

describe("heroScrub", () => {
  it("starts at zero and accepts progress writes", () => {
    heroScrub.value = 0;
    expect(heroScrub.value).toBe(0);
    heroScrub.value = 0.5;
    expect(heroScrub.value).toBe(0.5);
    heroScrub.value = 0;
  });
});

describe("progressFor", () => {
  it("is zero at the top and one at the end", () => {
    expect(progressFor(0, 5000, 1000)).toBe(0);
    expect(progressFor(4000, 5000, 1000)).toBe(1);
  });

  it("scales linearly mid-route", () => {
    expect(progressFor(2000, 5000, 1000)).toBe(0.5);
  });

  it("clamps overscroll", () => {
    expect(progressFor(-50, 5000, 1000)).toBe(0);
    expect(progressFor(9999, 5000, 1000)).toBe(1);
  });

  it("is complete when nothing scrolls", () => {
    expect(progressFor(0, 800, 1000)).toBe(1);
  });
});
