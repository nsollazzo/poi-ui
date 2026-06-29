---
'@positronick/ui': minor
---

feat: add six reusable primitives — `UserAvatar`, `ScrollTopButton`, `ThemeToggle`, `PositronickMark`, `VerifiedBadge`, and `ProviderIcon`

Ported from the Positronick app and generalised for the library: app-specific types are inlined, brand/icon SVGs are inlined (no asset or `~icons` dependency), tokens use `--pn-*`, and each ships with browser tests and Storybook stories. `ThemeToggle` pairs with the existing `ThemeProvider`/`useTheme` context; `PositronickMark` is the brand mark (with a `mono` tint mode).
