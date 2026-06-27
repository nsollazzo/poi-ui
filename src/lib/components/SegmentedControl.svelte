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

<div class="pn-segmented {className}">
	{#if label}<span class="pn-segmented__label">{label}</span>{/if}
	<div class="pn-segmented__track" role="group" aria-label={ariaLabel}>
		{#each options as o (o.value)}
			<Chip pressed={value === o.value} onclick={() => (value = o.value)}>{o.label}</Chip>
		{/each}
	</div>
</div>

<style>
	.pn-segmented {
		display: inline-flex;
		align-items: center;
		gap: var(--pn-space-2);
	}
	.pn-segmented__label {
		font-family: var(--pn-font-mono);
		font-size: var(--pn-font-size-1);
		text-transform: uppercase;
		letter-spacing: 0.04em;
		color: var(--pn-ink-dim);
	}
	.pn-segmented__track {
		display: flex;
		align-items: center;
	}
	/* Drop the doubled border so the segments read as one connected control.
	   (A -1px margin overlap leaves subpixel gaps at fractional zoom levels;
	   flush boxes can't.) */
	.pn-segmented__track :global(.pn-chip + .pn-chip) {
		border-left: none;
	}
	/* Keep the focused segment's ring above its neighbours. */
	.pn-segmented__track :global(.pn-chip[data-active]) {
		position: relative;
		z-index: 1;
	}
	.pn-segmented__track :global(.pn-chip:focus-visible) {
		position: relative;
		z-index: 2;
	}
</style>
