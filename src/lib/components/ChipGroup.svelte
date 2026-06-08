<script lang="ts" generics="T extends string">
	import Chip from './Chip.svelte';

	interface Props {
		/** Selected value, or null for "no filter" (two-way bindable). */
		value: T | null;
		/** Selectable options. */
		options: { value: T; label: string }[];
		/** When set, a leading chip clears the selection. */
		allLabel?: string;
		/** Accessible name for the group. */
		ariaLabel: string;
		/** Extra class(es) forwarded to the wrapper. */
		class?: string;
	}

	let {
		value = $bindable(),
		options,
		allLabel,
		ariaLabel,
		class: className = ''
	}: Props = $props();
</script>

<div class="poi-chip-group {className}" role="group" aria-label={ariaLabel}>
	{#if allLabel}
		<Chip pressed={value === null} onclick={() => (value = null)}>{allLabel}</Chip>
	{/if}
	{#each options as o (o.value)}
		<Chip pressed={value === o.value} onclick={() => (value = value === o.value ? null : o.value)}>
			{o.label}
		</Chip>
	{/each}
</div>

<style>
	.poi-chip-group {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: var(--poi-space-2);
	}
</style>
