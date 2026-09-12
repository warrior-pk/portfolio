import { CONTACT_LINKS } from "@/lib/site";

const SPEC_SLOTS = ["S.01", "S.02", "S.03"];

/**
 * 04 Projects: the Coming-soon shelf as a ledger table. Exactly three spec
 * slots — Slot/Status/Spec rows, zero fake titles, descriptions, or links.
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
      <p className="mt-3 text-sm text-(--color-faint)">
        Nothing here yet — building in public, check back soon.
      </p>
      <table className="mt-6 w-full font-mono text-sm">
        <thead>
          <tr className="text-left text-[11px] text-(--color-faint)">
            <th scope="col" className="py-2 pr-4 font-normal">
              Slot
            </th>
            <th scope="col" className="py-2 pr-4 font-normal">
              Status
            </th>
            <th scope="col" className="py-2 text-right font-normal">
              Spec
            </th>
          </tr>
        </thead>
        <tbody>
          {SPEC_SLOTS.map((slot) => (
            <tr key={slot} className="border-t border-(--color-hairline)">
              <td className="py-3 pr-4">{slot}</td>
              <td className="py-3 pr-4">Empty</td>
              <td className="py-3 text-right text-(--color-faint)">
                Forthcoming
              </td>
            </tr>
          ))}
        </tbody>
      </table>
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
      <p className="mt-3 font-mono text-[11px] text-(--color-faint)">
        {"// hrefs provisional — final URLs pending"}
      </p>
      <footer className="mt-10 border-t border-(--color-hairline) pt-6">
        <p className="text-center font-mono text-xs text-(--color-faint)">
          The cold keeps its own ledger.
        </p>
      </footer>
    </section>
  );
}
