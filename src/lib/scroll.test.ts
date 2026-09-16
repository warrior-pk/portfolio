import { describe, expect, it } from "vitest";
import { getScroller, registerScroller } from "./scroll";

/**
 * Scroll-bus contract: the single seam anchors, dots, and the smooth
 * scroller coordinate through. Registering publishes, null unpublishes.
 */
describe("scroll bus", () => {
  it("starts unpublished", () => {
    registerScroller(null);
    expect(getScroller()).toBeNull();
  });

  it("publishes the registered scroller", () => {
    const calls: string[] = [];
    registerScroller((target) => {
      calls.push(target);
    });
    getScroller()?.("about");
    expect(calls).toEqual(["about"]);
    registerScroller(null);
  });

  it("latest registration wins", () => {
    registerScroller(() => {});
    const latest = () => {};
    registerScroller(latest);
    expect(getScroller()).toBe(latest);
    registerScroller(null);
  });
});
