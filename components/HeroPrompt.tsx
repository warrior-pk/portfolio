"use client";

import { useState } from "react";
import { SUPPORTED_COMMANDS, parsePromptCommand } from "@/lib/prompt-parser";
import { scrollToSection } from "@/lib/scroll";

function flipToDarkWorld() {
  // Session-only: the Dark-world theme stays reachable solely through the
  // Easter egg phrase — no toggle, no hint, no persistence.
  document.documentElement.dataset.world = "dark-world";
}

/**
 * Hero prompt: the single working terminal moment. Accepts exactly three
 * commands (scroll to their Section); `help` lists them; unknown input
 * gets a dry error. The Easter egg phrase flips the Dark-world theme with
 * nothing hinted in the UI. Visually it is a bare input line — no sigil,
 * no box — so the terminal is inferred, never stated.
 */
export function HeroPrompt() {
  const [value, setValue] = useState("");
  const [output, setOutput] = useState<string | null>(null);
  const [announcement, setAnnouncement] = useState("");

  const run = (raw: string) => {
    const outcome = parsePromptCommand(raw);
    switch (outcome.kind) {
      case "scroll":
        setOutput(`→ ${outcome.sectionId}`);
        setAnnouncement(`scrolling to ${outcome.sectionId}`);
        scrollToSection(outcome.sectionId);
        break;
      case "help":
        setOutput(SUPPORTED_COMMANDS.join("  "));
        setAnnouncement(`available commands: ${SUPPORTED_COMMANDS.join(", ")}`);
        break;
      case "dark-world":
        flipToDarkWorld();
        setOutput("acknowledged.");
        setAnnouncement("acknowledged");
        break;
      case "error":
        setOutput(outcome.message);
        setAnnouncement(outcome.message);
        break;
    }
  };

  return (
    <div className="mt-8 max-w-xl">
      <form
        role="search"
        aria-label="site prompt"
        onSubmit={(e) => {
          e.preventDefault();
          run(value);
          setValue("");
        }}
        className="mt-10 max-w-xl border-b border-(--color-hairline) focus-within:border-(--color-brass)"
      >
        <label htmlFor="hero-prompt" className="sr-only">
          type a command: projects, about, contact, or help
        </label>
        <input
          id="hero-prompt"
          type="text"
          autoComplete="off"
          autoCapitalize="off"
          spellCheck={false}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="type help + enter"
          className="w-full bg-transparent py-2.5 font-mono text-sm text-(--color-lume) placeholder:text-(--color-faint)/60 focus:outline-none"
        />
      </form>
      <div aria-live="polite" className="mt-2 min-h-5 font-mono text-xs text-(--color-faint)">
        {output ? <span>{output}</span> : <span>&nbsp;</span>}
      </div>
      <span aria-live="polite" className="sr-only">
        {announcement}
      </span>
    </div>
  );
}
