# POI-UI

> An AI's point of view, rendered as UI.

A **Svelte 5** component library and design system styled after the two artificial superintelligences in _Person of Interest_ — **The Machine** and **Samaritan**. A surveillance‑HUD aesthetic of corner‑bracket targeting boxes, monospace data rows, designation tags, and processing readouts.

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

By **MiDika SRL**. MIT licensed.

> **Status: pre‑release (`0.0.0`).** The toolchain and theming foundation are in place; components are landing milestone by milestone. APIs may change before `1.0`.

## Install

```sh
pnpm add @midika/poi-ui svelte
```

`svelte@^5` is a peer dependency.

## Usage

```svelte
<script>
	import { ThemeProvider } from '@midika/poi-ui';
	import '@midika/poi-ui/tokens.css';
</script>

<ThemeProvider theme="machine">
	<!-- POI-UI components render here, themed by the provider -->
</ThemeProvider>
```

Theming is exposed entirely through CSS custom properties; consumers can override any semantic or component token without forking a component.

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

POI-UI targets WCAG AA contrast in **both** theme directions, ships visible themed keyboard focus rings, uses real `<button>`/`<dialog>` semantics, and gates **all** motion behind `prefers-reduced-motion`.

## Credits

Visual language inspired by the on‑screen interfaces of _Person of Interest_ (Bad Robot / Warner Bros.). This is an independent, fan‑made design system and is not affiliated with or endorsed by the rights holders.
