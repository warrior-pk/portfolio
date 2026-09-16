# Pinned scrub storytelling over scroll snap

Apple-style full screens could be CSS scroll-snap paging, GSAP-pinned scrub, or both. We chose pinned scrub via ScrollTrigger with no snap: snap alone cannot carry the hero blob, tile stagger, or vault reveals tied to scroll position.

Considered Options: snap paging only (cheap, no inner animation); both combined (closest to Apple, heavier than needed).
Consequences: Lenis must drive via the GSAP ticker with `ScrollTrigger.update`; snap CSS stays out; reduced-motion and coarse pointers fall back to normal flow with no pins.
