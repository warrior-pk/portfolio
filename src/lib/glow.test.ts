import { describe, expect, it } from "vitest";
import { BRASS_GLOW, COLD_GLOW, glowForWorld } from "./glow";

/**
 * Glow seam: the tile spotlight color follows the site highlight — brass
 * in the default world, cold in dark-world. Expectations come from the
 * site palette in the spec, not the code.
 */
describe("glowForWorld", () => {
  it("glows brass by default", () => {
    expect(glowForWorld(null)).toBe(BRASS_GLOW);
    expect(glowForWorld("light")).toBe(BRASS_GLOW);
  });

  it("glows cold in dark-world", () => {
    expect(glowForWorld("dark-world")).toBe(COLD_GLOW);
  });

  it("exposes bare RGB channels for the glow component", () => {
    expect(BRASS_GLOW).toBe("217, 164, 65");
    expect(COLD_GLOW).toBe("122, 162, 255");
  });
});
