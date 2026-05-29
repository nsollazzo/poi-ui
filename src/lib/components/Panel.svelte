<script lang="ts">
	// Internal base for the three container densities (Block / Card / Box).
	// Not exported from the package; consumers use the named wrappers.
	import type { Snippet } from 'svelte';

	interface Props {
		density: 'block' | 'card' | 'box';
		title?: string;
		tone?: 'neutral' | 'threat' | 'asset';
		children: Snippet;
		footer?: Snippet;
	}

	let { density, title, tone = 'neutral', children, footer }: Props = $props();
</script>

<section class="poi-panel" data-density={density} data-tone={tone}>
	{#if title}
		<header class="poi-panel__title">{title}</header>
	{/if}
	<div class="poi-panel__body">
		{@render children()}
	</div>
	{#if footer}
		<footer class="poi-panel__footer">{@render footer()}</footer>
	{/if}
</section>

<style>
	/* Backgrounds stay on the base surface so dim/accent text keeps WCAG-AA
	   contrast in both themes; depth comes from hairline dividers, not fills. */
	.poi-panel {
		background: var(--poi-surface-base);
		color: var(--poi-ink);
		border: var(--poi-hairline-width) solid var(--poi-line);
		border-radius: var(--poi-radius);
	}
	.poi-panel[data-tone='threat'] {
		border-color: var(--poi-accent);
		box-shadow: var(--poi-emphasis-shadow);
	}
	.poi-panel[data-tone='asset'] {
		border-color: var(--poi-asset);
	}

	.poi-panel__title {
		border-bottom: var(--poi-hairline-width) solid var(--poi-line);
		color: var(--poi-ink);
		font-family: var(--poi-font-display);
		text-transform: uppercase;
		letter-spacing: var(--poi-tracking-display);
	}
	.poi-panel[data-tone='threat'] .poi-panel__title {
		color: var(--poi-accent);
		border-bottom-color: var(--poi-accent);
		text-shadow: var(--poi-emphasis-text-shadow);
	}

	.poi-panel__footer {
		border-top: var(--poi-hairline-width) solid var(--poi-line);
		color: var(--poi-ink-dim);
		font-family: var(--poi-font-mono);
		font-size: var(--poi-font-size-1);
	}

	/* Density = spacing + title prominence. */
	.poi-panel[data-density='block'] .poi-panel__title {
		padding: var(--poi-space-3) var(--poi-space-4);
		font-size: var(--poi-font-size-4);
	}
	.poi-panel[data-density='block'] .poi-panel__body {
		padding: var(--poi-space-4);
	}
	.poi-panel[data-density='block'] .poi-panel__footer {
		padding: var(--poi-space-3) var(--poi-space-4);
	}

	.poi-panel[data-density='card'] .poi-panel__title {
		padding: var(--poi-space-2) var(--poi-space-3);
		font-size: var(--poi-font-size-3);
	}
	.poi-panel[data-density='card'] .poi-panel__body {
		padding: var(--poi-space-3);
	}
	.poi-panel[data-density='card'] .poi-panel__footer {
		padding: var(--poi-space-2) var(--poi-space-3);
	}

	.poi-panel[data-density='box'] .poi-panel__title {
		padding: var(--poi-space-1) var(--poi-space-2);
		font-size: var(--poi-font-size-1);
	}
	.poi-panel[data-density='box'] .poi-panel__body {
		padding: var(--poi-space-2);
	}
	.poi-panel[data-density='box'] .poi-panel__footer {
		padding: var(--poi-space-1) var(--poi-space-2);
	}
</style>
