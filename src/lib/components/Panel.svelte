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

<section class="pn-panel" data-density={density} data-tone={tone}>
	{#if title}
		<header class="pn-panel__title">{title}</header>
	{/if}
	<div class="pn-panel__body">
		{@render children()}
	</div>
	{#if footer}
		<footer class="pn-panel__footer">{@render footer()}</footer>
	{/if}
</section>

<style>
	/* Backgrounds stay on the base surface so dim/accent text keeps WCAG-AA
	   contrast in both themes; depth comes from hairline dividers, not fills. */
	.pn-panel {
		background: var(--pn-surface-base);
		color: var(--pn-ink);
		border: var(--pn-hairline-width) solid var(--pn-line);
		border-radius: var(--pn-radius);
	}
	.pn-panel[data-tone='threat'] {
		border-color: var(--pn-accent);
		box-shadow: var(--pn-emphasis-shadow);
	}
	.pn-panel[data-tone='asset'] {
		border-color: var(--pn-asset);
	}

	.pn-panel__title {
		border-bottom: var(--pn-hairline-width) solid var(--pn-line);
		color: var(--pn-ink);
		font-family: var(--pn-font-display);
		text-transform: uppercase;
		letter-spacing: var(--pn-tracking-display);
	}
	.pn-panel[data-tone='threat'] .pn-panel__title {
		color: var(--pn-accent);
		border-bottom-color: var(--pn-accent);
		text-shadow: var(--pn-emphasis-text-shadow);
	}

	.pn-panel__footer {
		border-top: var(--pn-hairline-width) solid var(--pn-line);
		color: var(--pn-ink-dim);
		font-family: var(--pn-font-mono);
		font-size: var(--pn-font-size-1);
	}

	/* Density = spacing + title prominence. */
	.pn-panel[data-density='block'] .pn-panel__title {
		padding: var(--pn-space-3) var(--pn-space-4);
		font-size: var(--pn-font-size-4);
	}
	.pn-panel[data-density='block'] .pn-panel__body {
		padding: var(--pn-space-4);
	}
	.pn-panel[data-density='block'] .pn-panel__footer {
		padding: var(--pn-space-3) var(--pn-space-4);
	}

	.pn-panel[data-density='card'] .pn-panel__title {
		padding: var(--pn-space-2) var(--pn-space-3);
		font-size: var(--pn-font-size-3);
	}
	.pn-panel[data-density='card'] .pn-panel__body {
		padding: var(--pn-space-3);
	}
	.pn-panel[data-density='card'] .pn-panel__footer {
		padding: var(--pn-space-2) var(--pn-space-3);
	}

	.pn-panel[data-density='box'] .pn-panel__title {
		padding: var(--pn-space-1) var(--pn-space-2);
		font-size: var(--pn-font-size-1);
	}
	.pn-panel[data-density='box'] .pn-panel__body {
		padding: var(--pn-space-2);
	}
	.pn-panel[data-density='box'] .pn-panel__footer {
		padding: var(--pn-space-1) var(--pn-space-2);
	}
</style>
