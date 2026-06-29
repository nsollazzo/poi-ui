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

<div class="pn-status-row" data-solid={solid || undefined}>
	<span class="pn-status-row__label">{label}</span>
	<span class="pn-status-row__value" class:accent>
		{#if children}{@render children()}{:else}{value}{/if}
	</span>
</div>

<style>
	.pn-status-row {
		display: flex;
		align-items: baseline;
		justify-content: space-between;
		gap: var(--pn-space-4);
		padding: var(--pn-space-2) 0;
		border-bottom: var(--pn-hairline-width) solid var(--pn-line);
		font-family: var(--pn-font-mono);
		font-size: var(--pn-font-size-2);
	}

	.pn-status-row__label {
		color: var(--pn-ink-dim);
		text-transform: uppercase;
		letter-spacing: 0.04em;
	}

	.pn-status-row__value {
		color: var(--pn-ink);
		text-align: right;
	}

	.pn-status-row__value.accent {
		color: var(--pn-accent);
		text-shadow: var(--pn-emphasis-text-shadow);
	}
</style>
