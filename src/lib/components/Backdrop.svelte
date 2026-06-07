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

<div class="poi-backdrop">
	<div class="poi-backdrop__layer" aria-hidden="true"></div>
	<div class="poi-backdrop__content">{@render children()}</div>
</div>

<style>
	.poi-backdrop {
		position: relative;
		/* Fill the viewport so wrapping the whole app in one <Backdrop> covers the
		   page. Viewport-relative (not 100%) so it works regardless of ancestor
		   height — .poi-root has none. Grows past the viewport with tall content;
		   the absolute __layer then extends the grid down the full page. */
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
