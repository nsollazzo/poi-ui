<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		/** Left-hand label. */
		label: string;
		/** Right-hand value. Omit when using the default snippet for rich content. */
		value?: string;
		/** Emphasize the value with the accent (glowing in The Machine, crisp in Samaritan). */
		accent?: boolean;
		/** Rich value content; overrides `value`. */
		children?: Snippet;
		/** Paint a solid surface-base fill so the row reads cleanly over the <Backdrop> grid. */
		solid?: boolean;
	}

	let { label, value, accent = false, children, solid = false }: Props = $props();
</script>

<div class="poi-status-row" data-solid={solid || undefined}>
	<span class="poi-status-row__label">{label}</span>
	<span class="poi-status-row__value" class:accent>
		{#if children}{@render children()}{:else}{value}{/if}
	</span>
</div>

<style>
	.poi-status-row {
		display: flex;
		align-items: baseline;
		justify-content: space-between;
		gap: var(--poi-space-4);
		padding: var(--poi-space-2) 0;
		border-bottom: var(--poi-hairline-width) solid var(--poi-line);
		font-family: var(--poi-font-mono);
		font-size: var(--poi-font-size-2);
	}

	.poi-status-row__label {
		color: var(--poi-ink-dim);
		text-transform: uppercase;
		letter-spacing: 0.04em;
	}

	.poi-status-row__value {
		color: var(--poi-ink);
		text-align: right;
	}

	.poi-status-row__value.accent {
		color: var(--poi-accent);
		text-shadow: var(--poi-emphasis-text-shadow);
	}
</style>
