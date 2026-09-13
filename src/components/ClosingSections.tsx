import { CONTACT_LINKS } from "@/lib/site";

/**
 * 04 Projects: one honest teaser line until the interactive showcase
 * unlocks. No fake titles, no placeholder slots.
 */
export function ProjectsShelf() {
  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="border-b border-(--color-hairline) px-6 py-12 md:px-12"
    >
      <h2
        id="projects-heading"
        className="font-display text-2xl font-semibold tracking-tight"
      >
        Projects
      </h2>
      <p className="mt-3 max-w-md leading-relaxed text-(--color-faint)">
        My work — web apps and backend services — gets an interactive
        showcase here. This section unlocks soon.
      </p>
    </section>
  );
}

/**
 * 05 Contact + footer. Links carry clearly-marked provisional hrefs;
 * footer carries exactly one cold one-liner in copy, zero visuals.
 */
export function ContactFooter() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="px-6 py-12 md:px-12"
    >
      <h2
        id="contact-heading"
        className="font-display text-2xl font-semibold tracking-tight"
      >
        Contact
      </h2>
      <ul className="mt-6 grid grid-cols-2 gap-px border border-(--color-hairline) bg-(--color-hairline) md:grid-cols-4">
        {CONTACT_LINKS.map((link) => (
          <li key={link.label} className="bg-(--color-panel)">
            <a
              href={link.href}
              data-placeholder={link.placeholder ? "true" : undefined}
              className="block p-6 text-center font-mono text-sm text-(--color-lume) hover:text-(--color-brass)"
            >
              {link.label} <span aria-hidden>↗</span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
