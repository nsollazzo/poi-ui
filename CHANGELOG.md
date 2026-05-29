# @nsollazzo/poi-ui

## 0.1.0

### Minor Changes

- [`2f41aad`](https://github.com/nsollazzo/poi-ui/commit/2f41aad9e87fa1c9fee68b0c0ff684728b913935) Thanks [@nsollazzo](https://github.com/nsollazzo)! - Add the core component set: `StatusRow` (the data primitive), `DesignationTag` (vocab-driven chip), `SubjectFrame`/`TargetBox` (theme-driven corner brackets in The Machine vs. a crosshair reticle in Samaritan), and the `Block` / `Card` / `Box` container densities (shared internal `Panel`). All support `neutral` / `threat` / `asset` tones and are verified in both themes with axe.

- [`75bad09`](https://github.com/nsollazzo/poi-ui/commit/75bad09f7906f8bf7cfb865180717a6bcd781f81) Thanks [@nsollazzo](https://github.com/nsollazzo)! - Foundation release. Adds `<ThemeProvider>` with two runtime-switchable themes selected by a `data-theme` attribute — The Machine (dark: white + red on black, neon glow) and Samaritan (light: black + red on white, glow-free). Ships a layered CSS-variable token system (primitives → semantic per-theme → component), exposed via `@nsollazzo/poi-ui/tokens.css`; the `useTheme()` context helper; subject designation vocabularies; and a reactive `reducedMotion` helper. All theming is overridable through CSS custom properties.

- [`4812d0d`](https://github.com/nsollazzo/poi-ui/commit/4812d0d6dfc202500cf15bd4ae1c50df6dbcd077) Thanks [@nsollazzo](https://github.com/nsollazzo)! - Add the secondary components: `Button` (glow/pulse in The Machine vs. crisp in Samaritan, optional rotate-on-hover), `ProgressBar` (sizes, glowing vs. flat fill), `RecDot` (pulsing record indicator), `Terminal` (monospace with blinking prompt), `Banner` (word-by-word "samaritanWrite" reveal), `Loading` (rotating cube), and `Window` (collapsible, theme-driven chrome — traffic-light dots vs. a severe red title bar). All motion is gated behind `prefers-reduced-motion`; everything is verified in both themes with axe. The full 13-component inventory is now complete.
