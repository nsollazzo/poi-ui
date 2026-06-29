<script lang="ts">
	import type { Snippet } from 'svelte';
	import Rain, { type RainDensity } from './Rain.svelte';
	import Lightning, { type LightningIntensity } from './Lightning.svelte';

	type RainOptions = { density?: RainDensity };
	type LightningOptions = { intensity?: LightningIntensity };

	interface Props {
		/**
		 * Page content rendered above the graph-paper backdrop.
		 *
		 * Page-level: wrap your whole app in a single `<Backdrop>` (inside a
		 * `<ThemeProvider>`). It fills the viewport and paints the graph-paper grid
		 * behind everything, extending down the full scrollable page.
		 */
		children: Snippet;
		/**
		 * Opt-in monochrome rain, rendered beneath the grid (and beneath your
		 * content). `true` uses the default steady density; pass an object to tune
		 * it, e.g. `rain={{ density: 'downpour' }}`.
		 */
		rain?: boolean | RainOptions;
		/**
		 * Opt-in red lightning — a sky-flash plus a jagged bolt, always red on both
		 * themes. `true` uses the default restrained intensity; pass an object to
		 * tune it, e.g. `lightning={{ intensity: 'dramatic' }}`. Combine with `rain`
		 * for the full storm.
		 */
		lightning?: boolean | LightningOptions;
	}

	let { children, rain = false, lightning = false }: Props = $props();

	// Normalise each `boolean | options` union: `true` -> defaults ({}), an object
	// -> itself, `false` -> layer not rendered.
	const rainOpts: RainOptions | undefined = $derived(
		rain === true ? {} : rain === false ? undefined : rain
	);
	const lightningOpts: LightningOptions | undefined = $derived(
		lightning === true ? {} : lightning === false ? undefined : lightning
	);
</script>

<div class="poi-backdrop">
	<!-- Rain first so it paints behind the grid layer (both at stacking level 0,
	     painted in DOM order) and behind the content (z-index 1). -->
	{#if rainOpts}
		<Rain density={rainOpts.density} />
	{/if}
	<div class="poi-backdrop__layer" aria-hidden="true"></div>
	<!-- Lightning AFTER the grid so the bolt + flash paint above the grid and rain
	     (but still below the content at z-index 1). -->
	{#if lightningOpts}
		<Lightning intensity={lightningOpts.intensity} />
	{/if}
	<div class="poi-backdrop__content">{@render children()}</div>
</div>

<style>
	.poi-backdrop {
		position: relative;
		/* Own stacking context so the __layer/__content z-indexes (0/1) stay scoped
		   here and never compete with app chrome (portals, toasts) mounted elsewhere. */
		isolation: isolate;
		/* Fill the viewport so wrapping the whole app in one <Backdrop> covers the
		   page. Viewport-relative (not 100%) so it works regardless of ancestor
		   height — .poi-root has none. Grows past the viewport with tall content;
		   the absolute __layer then extends the grid down the full page. */
		min-height: 100vh; /* fallback for UAs without dvh support */
		min-height: 100dvh;
		width: 100%;
		background-color: var(--poi-surface-base);
		color: var(--poi-ink);
	}

	/* Engineering graph paper: a fine minor grid with a heavier line every Nth cell.
	   Major gradients are listed first so they paint over the minor grid where the
	   two coincide; the major tile is an exact multiple of the minor cell, so every
	   Nth minor line lands under a major one and reads heavier. */
	.poi-backdrop__layer {
		position: absolute;
		inset: 0;
		pointer-events: none;
		z-index: 0;
		background-image:
			linear-gradient(
				to right,
				var(--poi-grid-line-major) var(--poi-grid-major-width),
				transparent var(--poi-grid-major-width)
			),
			linear-gradient(
				to bottom,
				var(--poi-grid-line-major) var(--poi-grid-major-width),
				transparent var(--poi-grid-major-width)
			),
			linear-gradient(
				to right,
				var(--poi-grid-line-minor) var(--poi-grid-minor-width),
				transparent var(--poi-grid-minor-width)
			),
			linear-gradient(
				to bottom,
				var(--poi-grid-line-minor) var(--poi-grid-minor-width),
				transparent var(--poi-grid-minor-width)
			);
		background-size:
			calc(var(--poi-grid-cell) * var(--poi-grid-major-every))
				calc(var(--poi-grid-cell) * var(--poi-grid-major-every)),
			calc(var(--poi-grid-cell) * var(--poi-grid-major-every))
				calc(var(--poi-grid-cell) * var(--poi-grid-major-every)),
			var(--poi-grid-cell) var(--poi-grid-cell),
			var(--poi-grid-cell) var(--poi-grid-cell);
	}

	.poi-backdrop__content {
		position: relative;
		z-index: 1;
	}
</style>
