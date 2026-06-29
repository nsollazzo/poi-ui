<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		/**
		 * Page content rendered above the graph-paper backdrop.
		 *
		 * Page-level: wrap your whole app in a single `<Backdrop>` (inside a
		 * `<ThemeProvider>`). It fills the viewport and paints the graph-paper grid
		 * behind everything, extending down the full scrollable page.
		 */
		children: Snippet;
	}

	let { children }: Props = $props();
</script>

<div class="pn-backdrop">
	<div class="pn-backdrop__layer" aria-hidden="true"></div>
	<div class="pn-backdrop__content">{@render children()}</div>
</div>

<style>
	.pn-backdrop {
		position: relative;
		/* Own stacking context so the __layer/__content z-indexes (0/1) stay scoped
		   here and never compete with app chrome (portals, toasts) mounted elsewhere. */
		isolation: isolate;
		/* Fill the viewport so wrapping the whole app in one <Backdrop> covers the
		   page. Viewport-relative (not 100%) so it works regardless of ancestor
		   height — .pn-root has none. Grows past the viewport with tall content;
		   the absolute __layer then extends the grid down the full page. */
		min-height: 100vh; /* fallback for UAs without dvh support */
		min-height: 100dvh;
		width: 100%;
		background-color: var(--pn-surface-base);
		color: var(--pn-ink);
	}

	/* Engineering graph paper: a fine minor grid with a heavier line every Nth cell.
	   Major gradients are listed first so they paint over the minor grid where the
	   two coincide; the major tile is an exact multiple of the minor cell, so every
	   Nth minor line lands under a major one and reads heavier. */
	.pn-backdrop__layer {
		position: absolute;
		inset: 0;
		pointer-events: none;
		z-index: 0;
		background-image:
			linear-gradient(
				to right,
				var(--pn-grid-line-major) var(--pn-grid-major-width),
				transparent var(--pn-grid-major-width)
			),
			linear-gradient(
				to bottom,
				var(--pn-grid-line-major) var(--pn-grid-major-width),
				transparent var(--pn-grid-major-width)
			),
			linear-gradient(
				to right,
				var(--pn-grid-line-minor) var(--pn-grid-minor-width),
				transparent var(--pn-grid-minor-width)
			),
			linear-gradient(
				to bottom,
				var(--pn-grid-line-minor) var(--pn-grid-minor-width),
				transparent var(--pn-grid-minor-width)
			);
		background-size:
			calc(var(--pn-grid-cell) * var(--pn-grid-major-every))
				calc(var(--pn-grid-cell) * var(--pn-grid-major-every)),
			calc(var(--pn-grid-cell) * var(--pn-grid-major-every))
				calc(var(--pn-grid-cell) * var(--pn-grid-major-every)),
			var(--pn-grid-cell) var(--pn-grid-cell),
			var(--pn-grid-cell) var(--pn-grid-cell);
	}

	.pn-backdrop__content {
		position: relative;
		z-index: 1;
	}
</style>
