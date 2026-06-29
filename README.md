# positronick-ui

[![npm version](https://img.shields.io/npm/v/@positronick/ui)](https://www.npmjs.com/package/@positronick/ui)
[![CI](https://github.com/positronick/ui/actions/workflows/ci.yml/badge.svg)](https://github.com/positronick/ui/actions/workflows/ci.yml)
[![Coverage Status](https://coveralls.io/repos/github/positronick/ui/badge.svg?branch=main)](https://coveralls.io/github/positronick/ui?branch=main)
[![OpenSSF Scorecard](https://api.scorecard.dev/projects/github.com/positronick/ui/badge)](https://scorecard.dev/viewer/?uri=github.com/positronick/ui)
[![license](https://img.shields.io/npm/l/@positronick/ui)](./LICENSE)

> An AI's point of view, rendered as UI.

**positronick-ui** is a **Svelte 5** component library and design system. Its visual language is inspired by the two artificial superintelligences in _Person of Interest_ — **The Machine** and **Samaritan** — a surveillance‑HUD aesthetic of corner‑bracket targeting boxes, monospace data rows, designation tags, and processing readouts.

**One component set, two runtime‑switchable themes** — selected by a single `data-theme` attribute on a `<ThemeProvider>`:

|             | The Machine                  | Samaritan                  |
| ----------- | ---------------------------- | -------------------------- |
| Mode        | Dark                         | Light                      |
| Surface     | black                        | white                      |
| Ink         | white                        | black                      |
| Accent      | red (neon glow)              | red (crisp, glow‑free)     |
| Temperament | watchful, benevolent         | cold, total, authoritarian |
| Motif       | solid square corner brackets | crosshair / reticle        |

Red is the only constant accent; the two themes are a deliberate light/dark inversion that share type, radius (~0), hairlines, uppercase display type, and monospace data. Switching the attribute re‑skins everything via a swapped token layer — no component forks.

By **[Nicholas Sollazzo](https://nsollazzo.com)**. MIT licensed.

> **Status: pre‑release (`0.0.0`).** The toolchain and theming foundation are in place; components are landing milestone by milestone. APIs may change before `1.0`.

## Install

```sh
pnpm add @positronick/ui svelte
```

`svelte@^5` is a peer dependency.

## Usage

```svelte
<script>
	import { ThemeProvider } from '@positronick/ui';
	import '@positronick/ui/tokens.css';
</script>

<ThemeProvider theme="machine">
	<!-- positronick-ui components render here, themed by the provider -->
</ThemeProvider>
```

Theming is exposed entirely through CSS custom properties; consumers can override any semantic or component token without forking a component.

## Components

All components render in both themes and are exported from the package root.

| Component                    | Purpose                                                                                            |
| ---------------------------- | -------------------------------------------------------------------------------------------------- |
| `ThemeProvider`              | Sets `data-theme`, exposes the theme via context (`useTheme`), injects tokens                      |
| `SubjectFrame` / `TargetBox` | Frames a subject with corner brackets (Machine) or a crosshair reticle (Samaritan) + a designation |
| `DesignationTag`             | Small labelled chip (`neutral` / `threat` / `asset` tone)                                          |
| `StatusRow`                  | Label / value data row with a hairline divider — the core repeating primitive                      |
| `Block` / `Card` / `Box`     | The three container densities (roomy → tight)                                                      |
| `Window`                     | Collapsible titlebar panel — traffic-light dots (Machine) vs. a severe red bar (Samaritan)         |
| `Button`                     | Real `<button>` with glow/pulse (Machine) or crisp state (Samaritan); optional rotate-on-hover     |
| `ProgressBar`                | `role="progressbar"` with a glowing (Machine) or flat (Samaritan) fill; `sm`/`md`/`lg`             |
| `Terminal`                   | Monospace, normal-case content with a blinking prompt                                              |
| `Banner`                     | Word-by-word reveal (the show's "samaritanWrite" effect)                                           |
| `RecDot`                     | Pulsing record indicator                                                                           |
| `Loading`                    | Rotating cube loader                                                                               |

Also exported: `useTheme`, the `reducedMotion` helper, the `MACHINE_DESIGNATIONS` / `SAMARITAN_DESIGNATIONS` vocabularies, and the `PositronickTheme` / `Designation` types.

## Demo & docs

- **Kitchen-sink demo** (both themes side by side): https://positronick.github.io/ui/
- **Storybook** (per-component, with a11y checks): https://positronick.github.io/ui/storybook/

## Develop

```sh
pnpm install
pnpm dev              # SvelteKit kitchen-sink demo (both themes side by side)
pnpm storybook        # component workshop + docs + a11y
pnpm test             # vitest (browser-mode component tests + node + storybook)
pnpm test:coverage    # coverage report (lcov + html)
pnpm check            # svelte-check
pnpm lint             # prettier + eslint
pnpm build            # build the demo + package the library to dist/
```

See [CONTRIBUTING.md](./CONTRIBUTING.md).

## Accessibility

positronick-ui targets WCAG AA contrast in **both** theme directions, ships visible themed keyboard focus rings, uses real `<button>`/`<dialog>` semantics, and gates **all** motion behind `prefers-reduced-motion`.

## Credits

Visual language inspired by the on‑screen interfaces of _Person of Interest_ (Bad Robot / Warner Bros.). This is an independent, fan‑made design system and is not affiliated with or endorsed by the rights holders.
