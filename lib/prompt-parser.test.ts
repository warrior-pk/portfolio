import { describe, expect, it } from "vitest";
import { parsePromptCommand } from "./prompt-parser";

/**
 * Seam: Hero prompt command parser (pure function).
 * Asserts observable outcomes, never internals.
 */
describe("parsePromptCommand", () => {
  it("maps `projects` to a scroll to the Projects Section", () => {
    expect(parsePromptCommand("projects")).toEqual({
      kind: "scroll",
      sectionId: "projects",
    });
  });

  it("maps `about` to a scroll to the About Section", () => {
    expect(parsePromptCommand("about")).toEqual({
      kind: "scroll",
      sectionId: "about",
    });
  });

  it("maps `contact` to a scroll to the Contact Section", () => {
    expect(parsePromptCommand("contact")).toEqual({
      kind: "scroll",
      sectionId: "contact",
    });
  });

  it("normalizes case and surrounding whitespace", () => {
    expect(parsePromptCommand("  Projects  ")).toEqual({
      kind: "scroll",
      sectionId: "projects",
    });
    expect(parsePromptCommand("ABOUT")).toEqual({
      kind: "scroll",
      sectionId: "about",
    });
    expect(parsePromptCommand("\tContact\n")).toEqual({
      kind: "scroll",
      sectionId: "contact",
    });
  });

  it("lists exactly the three commands for `help`", () => {
    expect(parsePromptCommand("help")).toEqual({
      kind: "help",
      commands: ["projects", "about", "contact"],
    });
  });

  it("returns a dry error echoing the input for unknown commands", () => {
    expect(parsePromptCommand("deploy")).toEqual({
      kind: "error",
      message: "command not found: deploy — try help",
    });
  });

  it("echoes normalized input in the error", () => {
    expect(parsePromptCommand("  DEPLOY  ")).toEqual({
      kind: "error",
      message: "command not found: deploy — try help",
    });
  });

  it("maps the Easter egg phrase to the Dark-world theme flip", () => {
    expect(parsePromptCommand("sic mundus")).toEqual({ kind: "dark-world" });
  });

  it("normalizes the Easter egg phrase too", () => {
    expect(parsePromptCommand("  SIC MUNDUS  ")).toEqual({
      kind: "dark-world",
    });
  });
});
