<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		/** Content rendered above the graph-paper backdrop. */
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
		min-height: 100%;
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
