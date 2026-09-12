"use client";

import { MOTION_EASE_CSS } from "@/lib/motion-tokens";
import { useMotionGate } from "@/lib/motion-gate";
import { useOnceVisible } from "@/lib/use-once-visible";
import { CONTACT_LINKS } from "@/lib/site";
import { Section } from "./Section";

const SKELETON_COUNT = 3;
/** Stagger budget: last slot settled by 350ms (250ms + 2 × 50ms). */
const SETTLE_MS = 250;
const STAGGER_MS = 50;

/**
 * 04 Projects: the Coming-soon shelf. Empty-state TUI output plus exactly
 * three skeleton slots — empty bordered cards, subtle pulse, zero fake
 * titles, descriptions, or links. The staggered settle on scroll entry is
 * this Section's Apple-style moment (one of max two).
 */
export function ProjectsShelf() {
  const { motionOK } = useMotionGate();
  const { ref: listRef, visible: settled } =
    useOnceVisible<HTMLUListElement>(0.3);

  return (
    <Section
      id="projects"
      index="04"
      label="projects"
      labelledBy="projects-heading"
    >
      <div className="max-w-3xl">
        <h2
          id="projects-heading"
          className="font-display text-3xl font-semibold tracking-tight text-(--color-lume) md:text-4xl"
        >
          Projects
        </h2>
        <div className="mt-6 border border-(--color-hairline) bg-(--color-panel) px-3 py-2.5 font-mono text-sm">
          <span aria-hidden className="text-(--color-brass)">
            $&nbsp;
          </span>
          <span className="text-(--color-lume)">ls projects</span>
        </div>
        <p role="status" className="mt-2 font-mono text-xs text-(--color-faint)">
          0 results — building in public, check back soon
        </p>
        <ul
          ref={listRef}
          aria-label="coming-soon shelf"
          className="mt-6 grid gap-3 sm:grid-cols-3"
        >
          {Array.from({ length: SKELETON_COUNT }).map((_, i) => (
            <li
              key={i}
              aria-hidden
              className="shelf-pulse min-h-36 border border-(--color-hairline) bg-(--color-panel)/60"
              style={
                motionOK
                  ? {
                      opacity: settled ? undefined : 0,
                      transform: settled ? "none" : "translateY(12px)",
                      transition: `opacity ${SETTLE_MS}ms ${MOTION_EASE_CSS} ${i * STAGGER_MS}ms, transform ${SETTLE_MS}ms ${MOTION_EASE_CSS} ${i * STAGGER_MS}ms`,
                    }
                  : undefined
              }
            />
          ))}
        </ul>
      </div>
    </Section>
  );
}

/**
 * 05 Contact + footer. Links carry clearly-marked provisional hrefs;
 * footer carries exactly one cold one-liner in copy, zero visuals.
 */
export function ContactFooter() {
  return (
    <Section id="contact" index="05" label="contact" labelledBy="contact-heading">
      <div className="max-w-2xl">
        <h2
          id="contact-heading"
          className="font-display text-3xl font-semibold tracking-tight text-(--color-lume) md:text-4xl"
        >
          Contact
        </h2>
        <ul className="mt-8 divide-y divide-(--color-hairline) border-y border-(--color-hairline)">
          {CONTACT_LINKS.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                data-placeholder={link.placeholder ? "true" : undefined}
                className="group flex items-center justify-between py-3 font-mono text-sm text-(--color-lume) hover:text-(--color-brass)"
              >
                <span>{link.label}</span>
                <span aria-hidden className="text-(--color-faint)">
                  ↗
                </span>
              </a>
            </li>
          ))}
        </ul>
        <p className="mt-3 font-mono text-[11px] text-(--color-faint)">
          {"// hrefs provisional — final URLs pending"}
        </p>
      </div>
      <footer className="mt-20 border-t border-(--color-hairline) pt-6 pb-16">
        <p className="font-mono text-xs text-(--color-faint)">
          The cold keeps its own ledger.
        </p>
      </footer>
    </Section>
  );
}
