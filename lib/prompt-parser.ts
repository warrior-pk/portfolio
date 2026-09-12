/**
 * Hero prompt command parser — the one pure logic seam.
 *
 * Contract: normalize input by trimming + lowercasing, then map to exactly
 * one outcome. Uses glossary terms (Section, Dark-world theme, Easter egg).
 */

export const SUPPORTED_COMMANDS = ["projects", "about", "contact"] as const;

export type SupportedCommand = (typeof SUPPORTED_COMMANDS)[number];

/** Easter egg phrase that flips to the Dark-world theme. Never hinted in UI copy. */
export const DARK_WORLD_PHRASE = "sic mundus";

export type PromptOutcome =
  | { kind: "scroll"; sectionId: SupportedCommand }
  | { kind: "help"; commands: readonly SupportedCommand[] }
  | { kind: "error"; message: string }
  | { kind: "dark-world" };

export function parsePromptCommand(rawInput: string): PromptOutcome {
  const input = rawInput.trim().toLowerCase();

  if (input === DARK_WORLD_PHRASE) return { kind: "dark-world" };

  if ((SUPPORTED_COMMANDS as readonly string[]).includes(input)) {
    return { kind: "scroll", sectionId: input as SupportedCommand };
  }

  if (input === "help") {
    return { kind: "help", commands: [...SUPPORTED_COMMANDS] };
  }

  return { kind: "error", message: `command not found: ${input} — try help` };
}
