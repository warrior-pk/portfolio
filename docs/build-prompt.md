# Build: Awwwards-tier single-page developer portfolio (static-first)

## 1. Goal

Build a blazingly fast, single-route, full-screen-section personal portfolio for a **software developer** that reads as **minimal TUI brutalism** (Opencode-inspired: hairline borders, mono type, status bar) and hides **covert fan-only traces** in plain sight. The craft bar is "Awwwards nominee executed with restraint" — every animation must feel inevitable, never decorative. Nothing may look amateur or overdone.

## 2. Stack (locked — see `docs/adr/0001-static-nextjs-portfolio.md`)

- **Next.js with static export** (`output: 'export'`), one route (`/`), five sections. No backend, no CMS in v1.
- **Tailwind** for styling. **Motion** (framer-motion/motion) for animation. **Lenis** for smooth scroll.
- Type: one **grotesk** for display + one **mono** for TUI/body-detail. System fallbacks required.
- Read `AGENTS.md`, `CONTEXT.md`, and `docs/agents/*.md` first. Use the glossary terms exactly (`CONTEXT.md` is the vocabulary authority: Section, Coming-soon shelf, Fan trace vs. Easter egg, Triquetra, Dark-world theme, Periodic tile, Sweeping seconds, Hidden 18).

## 3. Global system

- **Theme**: dark-first "lume-on-dark" base (near-black background, off-white text, one restrained accent + one Breaking Bad green used ONLY in periodic tiles). A second **Dark-world theme** exists but is reachable ONLY via the `sic mundus` easter egg (see §6) — it is not a visible toggle.
- **TUI chrome**: a slim persistent **status bar** (section indicator `01/05`, version string containing the hidden 18 as `v1.8`, a ticking timestamp with mechanical-tick easing) + hairline dividers + mono micro-labels. Terminal styling everywhere; only ONE working terminal moment (hero prompt, §4).
- **Triquetra sigil**: the ONLY recurring mark. Use for favicon, loader mark, and section dividers. Draw it in code (SVG), subtly — never large, never explained.
- **Motion tokens (hard rules)**: single ease-out curve everywhere; durations **200–350ms**; section entrances are plain fade-up ≤300ms; `prefers-reduced-motion` disables ALL motion (cursor effects, smooth scroll, reveals); no intro loader longer than **800ms**; no parallax-everywhere; max TWO Apple-style scroll moments total (§5).
- **Responsive/touch**: all cursor/spotlight effects are **desktop-pointer only** — completely off on touch. Full-screen sections must degrade gracefully to natural heights on small screens (no trapped content, no forced 100vh overflow).

## 4. Sections (single route, in this order — each ~full screen)

1. **01 Hero**: full-viewport. Zed-style **static hairline grid background** with a subtle mouse-glow that follows the pointer (desktop only) and fades out on scroll past hero. Center-left: name, one-line dev identity, TUI prompt line (`$`) that **accepts exactly 3 commands** — `projects`, `about`, `contact` — each smooth-scrolling to its section; unknown input gets a dry TUI error (`command not found: <x> — try help`), and `help` lists the three. `sic mundus` triggers the Dark-world theme flip (undocumented in UI).
2. **02 About**: 2–3 sentence dev identity + one chase/clutch-flavored line (Kohli nod in COPY ONLY, no imagery/names/jerseys). Keep placeholder-safe: real copy now, refined later.
3. **03 Stack**: skills rendered EXCLUSIVELY as **Periodic tiles** (symbol + index, e.g. `Ts 01`) in a tight grid. This is the only Breaking Bad visual on the site.
4. **04 Projects (Coming-soon shelf)**: TUI line `$ ls projects` → output `0 results — building in public, check back soon` + exactly **3 skeleton slots** (empty bordered cards, subtle pulse, no fake titles/descriptions). This section gets the ONE scroll-driven Apple-style reveal (staggered skeleton settle on entry).
5. **05 Contact + footer**: contact links (email, GitHub, LinkedIn, X — placeholder hrefs acceptable, clearly marked), then footer containing the single GoT trace: **one cold one-liner in copy** (no dragons, thrones, sigils, or quotes-as-headers anywhere).

## 5. Motion & interaction spec (exact)

- **Cursor (desktop only)**: small dot + soft trailing spotlight; the spotlight's ONLY reveal job is exposing faint grid labels in the hero. Off on touch and under reduced-motion.
- **Grid**: static hairlines; mouse glow is local and low-opacity; grid fades after hero — it must NOT persist down the page.
- **Apple-style moments (max 2)**: (a) sticky pinned hero-outro (hero content fades/scales out pinned as About enters); (b) Projects skeleton stagger on scroll-entry. Everything else: fade-up ≤300ms, once per section.
- **Sweeping seconds**: scroll progress is rendered as a **mechanical sweeping seconds hand** (thin hand + tick marks, tick-eased motion) in the status bar or edge rail — the site's one watch behavior. No other watch imagery (no gears, no watch faces).

## 6. Fan traces (covert-only — placement is exact, never explained in UI)

| Source | Element | Placement |
|---|---|---|
| Dark | Triquetra sigil | favicon, loader, section dividers |
| Dark | `sic mundus` easter egg → Dark-world theme | hero prompt only, undocumented |
| Breaking Bad | Periodic tiles | Stack section only |
| GoT | one cold one-liner | footer copy only, zero visuals |
| Watches | Sweeping seconds scroll hand | status bar / edge rail |
| Kohli | Hidden `18` (`v1.8`, `18*` tally) + one chase/clutch copy line | status bar version + About copy |

Forbidden: character names, posters, dragons, thrones, quotes-as-headers, jerseys, photos, green-everywhere, any explained/labeled reference.

## 7. Performance & quality bars (must-pass)

- Hero interactive **<1.5s** on mid-tier mobile; scroll at **60fps** with zero layout shift; keep hero JS minimal (budget: no heavy hero deps, code-split Motion/Lenis where possible).
- Semantic HTML, keyboard-operable prompt + nav, visible focus states, contrast-safe mono micro-text, `prefers-reduced-motion` fully respected.
- `next build` must pass with static export; no console errors; no broken anchors.

## 8. Non-goals (do NOT build)

No blog, no testimonials, no resume download, no CMS, no fake projects, no multi-page routing, no theme toggle button, no loader/showreel intro, no cursor effects on touch, no parallax seas, no explained fan references.

## 9. Deliverable & acceptance

- Implement in this repo preserving `AGENTS.md`, `CONTEXT.md`, `docs/adr/`, `docs/agents/` conventions; use glossary terms in code identifiers/comments where natural.
- Acceptance: (1) five full-screen sections scroll in order with Lenis smoothness; (2) hero commands `projects/about/contact/help` + `sic mundus` all work; (3) cursor/spotlight desktop-only; (4) Projects shows empty-state + 3 skeletons, zero fake content; (5) all six fan traces present and covert; (6) reduced-motion kills everything; (7) static export builds clean.
