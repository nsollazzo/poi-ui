---
'@midika/poi-ui': minor
---

Foundation release. Adds `<ThemeProvider>` with two runtime-switchable themes selected by a `data-theme` attribute — The Machine (dark: white + red on black, neon glow) and Samaritan (light: black + red on white, glow-free). Ships a layered CSS-variable token system (primitives → semantic per-theme → component), exposed via `@midika/poi-ui/tokens.css`; the `useTheme()` context helper; subject designation vocabularies; and a reactive `reducedMotion` helper. All theming is overridable through CSS custom properties.
