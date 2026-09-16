"use client";

import gsap from "gsap";
import { CONTACT_LINKS } from "@/lib/site";
import { useMotionGate } from "@/lib/motion-gate";
import { Reveal } from "./Reveal";
import { PinnedSection, type StageTimelineBuilder } from "./PinnedSection";

/**
 * 04 Projects: one honest teaser line until the interactive showcase
 * unlocks. No fake titles, no placeholder slots — three sealed vault
 * slots hold the space instead.
 */
const VAULT_SLOTS = ["01", "02", "03"];

/** Vault scrub: teaser stages in, then Sealed slots arrive in order. */
const buildVaultTimeline: StageTimelineBuilder = (tl, stage) => {
  const q = gsap.utils.selector(stage);
  tl.from(
    q("[data-scrub-step]"),
    { opacity: 0, y: 32, duration: 0.35, stagger: 0.1 },
    0,
  );
};

export function ProjectsShelf() {
  const { pointerFX } = useMotionGate();
  return (
    <PinnedSection buildTimeline={buildVaultTimeline}>
      <section
        id="projects"
        aria-labelledby="projects-heading"
        className="relative flex min-h-svh flex-col justify-center overflow-hidden border-b border-(--color-hairline) px-6 py-16 md:px-12 md:py-28"
      >
        <span
          aria-hidden
          className="font-display pointer-events-none absolute -top-4 right-4 text-[7rem] leading-none font-semibold text-(--color-lume)/[0.04] select-none md:text-[10rem]"
        >
          04
        </span>
        <Reveal disabled={pointerFX}>
          <p className="flex items-center justify-between font-mono text-[11px] tracking-[0.25em] text-(--color-faint) uppercase">
            <span>04 — projects</span>
            <span className="flex items-center gap-2">
              <span aria-hidden className="shelf-pulse inline-block h-1.5 w-1.5 rounded-full bg-(--color-brass)" />
              unlocking
            </span>
          </p>
          <h2
            id="projects-heading"
            data-scrub-step
            className="font-display mt-6 text-[clamp(3rem,9vw,7rem)] leading-[0.9] font-semibold tracking-tight"
          >
            The vault
            <br />
            <span className="text-stroke">opens soon.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.1} disabled={pointerFX}>
          <p
            data-scrub-step
            className="mt-6 max-w-md leading-relaxed text-(--color-faint)"
          >
            My work — web apps and backend services — gets an interactive
            showcase here. This section unlocks soon.
          </p>
        </Reveal>
        <ul aria-label="upcoming project slots" className="mt-10 grid gap-3 md:grid-cols-3">
          {VAULT_SLOTS.map((slot, i) => (
            <li key={slot}>
              <Reveal
                delay={Math.min(i * 0.08, 0.24)}
                disabled={pointerFX}
                className="h-full"
              >
                <div
                  data-scrub-step
                  className="flex h-full min-h-40 flex-col justify-between border border-dashed border-(--color-hairline) p-5 transition-colors duration-300 hover:border-(--color-brass)/60"
                >
                  <div className="flex items-center justify-between font-mono text-xs text-(--color-faint)">
                    <span>SLOT {slot}</span>
                    <span aria-hidden className="shelf-pulse inline-block h-1.5 w-1.5 rounded-full bg-(--color-faint)/60" />
                  </div>
                  <p className="font-mono text-xs tracking-[0.25em] text-(--color-faint)/60 uppercase">
                    sealed
                  </p>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
        <Reveal delay={0.15} disabled={pointerFX}>
          <p data-scrub-step className="mt-8 font-mono text-xs text-(--color-faint)">
            meanwhile —{" "}
            <a
              href="https://github.com/warrior-pk"
              className="text-(--color-lume) underline decoration-(--color-brass) decoration-2 underline-offset-4 transition-colors duration-200 hover:text-(--color-brass)"
            >
              browse the workshop on github
            </a>
          </p>
        </Reveal>
      </section>
    </PinnedSection>
  );
}

/**
 * 05 Contact + footer. Links carry clearly-marked provisional hrefs;
 * footer carries exactly one cold one-liner in copy, zero visuals.
 * Unpinned finale: full-screen presence, normal flow, fade-up entrances.
 */
export function ContactFooter() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="relative flex min-h-svh flex-col justify-center overflow-hidden px-6 pt-16 pb-24 md:px-12 md:pt-28"
    >
      <Reveal>
        <p className="font-mono text-[11px] tracking-[0.25em] text-(--color-faint) uppercase">
          05 — contact
        </p>
        <h2
          id="contact-heading"
          className="font-display mt-6 text-[clamp(3.5rem,13vw,11rem)] leading-[0.85] font-semibold tracking-[-0.03em]"
        >
          LET&apos;S
          <br />
          TALK<span className="text-(--color-brass)">.</span>
        </h2>
      </Reveal>
      <Reveal delay={0.1}>
        <a
          href="mailto:piyu8h@outlook.com"
          className="font-display mt-8 inline-block text-xl text-(--color-lume)/90 underline decoration-(--color-brass) decoration-2 underline-offset-8 transition-colors duration-200 hover:text-(--color-brass) md:text-2xl"
        >
          piyu8h@outlook.com
        </a>
      </Reveal>
      <Reveal delay={0.14}>
        <ul className="mt-10 grid grid-cols-2 gap-px border border-(--color-hairline) bg-(--color-hairline) md:grid-cols-4">
          {CONTACT_LINKS.map((link) => (
            <li key={link.label} className="bg-(--color-panel)">
              <a
                href={link.href}
                data-placeholder={link.placeholder ? "true" : undefined}
                className="group flex items-center justify-between p-6 font-mono text-sm text-(--color-lume) transition-colors duration-200 hover:bg-(--color-brass) hover:text-[#0a0a0b] md:p-8"
              >
                {link.label}
                <span
                  aria-hidden
                  className="inline-block transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                >
                  ↗
                </span>
              </a>
            </li>
          ))}
        </ul>
      </Reveal>
      <div className="mt-12 flex flex-wrap items-center justify-end gap-3 font-mono text-[11px] text-(--color-faint)/70">
        <a
          href="#hero"
          className="tracking-[0.25em] uppercase transition-colors duration-200 hover:text-(--color-brass)"
        >
          back to top ↑
        </a>
      </div>
    </section>
  );
}
