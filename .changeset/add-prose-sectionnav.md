---
'@positronick/ui': minor
---

feat: add two reusable components — `Prose` and `SectionNav`

- `Prose` — a styling wrapper that applies the design system's long-form typography to whatever markup is passed as `children`. It never calls `{@html}` itself, so sanitization stays the consumer's responsibility and no XSS surface ships in the library.
- `SectionNav` — a responsive section sub-navigation (horizontal scroll-row on mobile, sticky vertical sidebar on desktop) with active-item scroll-into-view. Route-agnostic via `{ items, current, label, isActive? }`; the `SectionNavItem` type is exported.
