import { describe, expect, it } from "vitest";
import { PERIODIC_TILES, describeTile } from "./site";

/**
 * Element data seam: every PeriodicTile owns grid coordinates plus a
 * mastery state, so the chemistry table grows by data edits, never layout
 * rewrites. Expectations come from spec #19 / ticket #20, not the code.
 */
describe("periodic table geometry", () => {
  it("keeps every element inside the 18-column chemistry grid", () => {
    expect(PERIODIC_TILES.length).toBeGreaterThan(0);
    for (const tile of PERIODIC_TILES) {
      expect(tile.col).toBeGreaterThanOrEqual(1);
      expect(tile.col).toBeLessThanOrEqual(18);
      expect(tile.row).toBeGreaterThanOrEqual(0);
      expect(tile.row).toBeLessThanOrEqual(3);
    }
  });

  it("never stacks two elements on one cell", () => {
    const cells = PERIODIC_TILES.map((t) => `${t.row}:${t.col}`);
    expect(new Set(cells).size).toBe(cells.length);
  });

  it("uses unique symbols", () => {
    const symbols = PERIODIC_TILES.map((t) => t.symbol);
    expect(new Set(symbols).size).toBe(symbols.length);
  });

  it("anchors the approved families: web basics left, JS/TS right", () => {
    const at = (row: number, col: number) =>
      PERIODIC_TILES.find((t) => t.row === row && t.col === col)?.symbol;
    expect(at(1, 1)).toBe("Ht");
    expect(at(1, 2)).toBe("Cs");
    expect(at(1, 18)).toBe("Nx");
  });

  it("holds the detached f-row for learning and future elements", () => {
    const frow = PERIODIC_TILES.filter((t) => t.row === 0).map((t) => t.symbol);
    expect(frow).toContain("St");
    expect(frow).toContain("Kb");
    expect(frow).toContain("Pg");
  });

  it("marks only f-row elements as learning", () => {
    for (const tile of PERIODIC_TILES) {
      expect(tile.mastery).toBe(tile.row === 0 ? "learning" : "mastered");
    }
  });

  it("names every element with a current version", () => {
    for (const tile of PERIODIC_TILES) {
      expect(tile.name.length).toBeGreaterThan(0);
      expect(tile.version.length).toBeGreaterThan(0);
    }
  });
});

describe("describeTile", () => {
  it("announces name, version, and mastery", () => {
    expect(describeTile(PERIODIC_TILES[0])).toBe("HTML, version 5, mastered");
    const learning = PERIODIC_TILES.find((t) => t.mastery === "learning");
    expect(learning).toBeDefined();
    expect(describeTile(learning!)).toBe(
      `${learning!.name}, version ${learning!.version}, learning`,
    );
  });
});
