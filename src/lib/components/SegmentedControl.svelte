<script lang="ts" generics="T extends string">
	import Chip from './Chip.svelte';

	interface Props {
		/** Selected value — always one (two-way bindable; no toggle-off). */
		value: T;
		/** Selectable options. */
		options: { value: T; label: string }[];
		/** Optional leading label. */
		label?: string;
		/** Accessible name for the segment group. */
		ariaLabel: string;
		/** Extra class(es) forwarded to the wrapper. */
		class?: string;
	}

	let { value = $bindable(), options, label, ariaLabel, class: className = '' }: Props = $props();
</script>

<div class="poi-segmented {className}">
	{#if label}<span class="poi-segmented__label">{label}</span>{/if}
	<div class="poi-segmented__track" role="group" aria-label={ariaLabel}>
		{#each options as o (o.value)}
			<Chip pressed={value === o.value} onclick={() => (value = o.value)}>{o.label}</Chip>
		{/each}
	</div>
</div>

<style>
	.poi-segmented {
		display: inline-flex;
		align-items: center;
		gap: var(--poi-space-2);
	}
	.poi-segmented__label {
		font-family: var(--poi-font-mono);
		font-size: var(--poi-font-size-1);
		text-transform: uppercase;
		letter-spacing: 0.04em;
		color: var(--poi-ink-dim);
	}
	.poi-segmented__track {
		display: flex;
		align-items: center;
	}
	/* Drop the doubled border so the segments read as one connected control.
	   (A -1px margin overlap leaves subpixel gaps at fractional zoom levels;
	   flush boxes can't.) */
	.poi-segmented__track :global(.poi-chip + .poi-chip) {
		border-left: none;
	}
	/* Keep the focused segment's ring above its neighbours. */
	.poi-segmented__track :global(.poi-chip[data-active]) {
		position: relative;
		z-index: 1;
	}
	.poi-segmented__track :global(.poi-chip:focus-visible) {
		position: relative;
		z-index: 2;
	}
</style>
