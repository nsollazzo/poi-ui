<script lang="ts" generics="T extends string">
	import Chip from './Chip.svelte';

	interface Props {
		/** Active sort field (two-way bindable). */
		field: T;
		/** Sort direction (two-way bindable). */
		dir: 'asc' | 'desc';
		/** Selectable fields; defaultDir is applied when switching to a field. */
		fields: { value: T; label: string; defaultDir?: 'asc' | 'desc' }[];
		/** Optional leading label (e.g. "Sort"). */
		label?: string;
		/** Accessible name for the field group. */
		ariaLabel: string;
		/** Extra class(es) forwarded to the wrapper. */
		class?: string;
	}

	let {
		field = $bindable(),
		dir = $bindable(),
		fields,
		label,
		ariaLabel,
		class: className = ''
	}: Props = $props();

	// Clicking the active field flips direction; clicking another field switches
	// to it and applies that field's natural default direction.
	function select(f: { value: T; defaultDir?: 'asc' | 'desc' }) {
		if (field === f.value) {
			dir = dir === 'asc' ? 'desc' : 'asc';
		} else {
			field = f.value;
			dir = f.defaultDir ?? 'asc';
		}
	}
</script>

<div class="poi-sort {className}">
	{#if label}<span class="poi-sort__label">{label}</span>{/if}
	<div class="poi-sort__track" role="group" aria-label={ariaLabel}>
		{#each fields as f (f.value)}
			<Chip
				pressed={field === f.value}
				onclick={() => select(f)}
				ariaLabel={field === f.value
					? `Sort by ${f.label}, ${dir === 'asc' ? 'ascending' : 'descending'}`
					: `Sort by ${f.label}`}
			>
				{f.label}{#if field === f.value}<span class="poi-sort__arrow" aria-hidden="true"
						>{dir === 'asc' ? '↑' : '↓'}</span
					>{/if}
			</Chip>
		{/each}
	</div>
</div>

<style>
	.poi-sort {
		display: inline-flex;
		align-items: center;
		gap: var(--poi-space-2);
	}
	.poi-sort__label {
		font-family: var(--poi-font-mono);
		font-size: var(--poi-font-size-1);
		text-transform: uppercase;
		letter-spacing: 0.04em;
		color: var(--poi-ink-dim);
	}
	.poi-sort__track {
		display: flex;
		align-items: center;
	}
	/* Drop the doubled border so the segments read as one connected control.
	   (A -1px margin overlap leaves subpixel gaps at fractional zoom levels;
	   flush boxes can't.) */
	.poi-sort__track :global(.poi-chip + .poi-chip) {
		border-left: none;
	}
	/* Keep the focused segment's ring above its neighbours. */
	.poi-sort__track :global(.poi-chip[data-active]) {
		position: relative;
		z-index: 1;
	}
	.poi-sort__track :global(.poi-chip:focus-visible) {
		position: relative;
		z-index: 2;
	}
	.poi-sort__arrow {
		font-size: 0.85em;
	}
</style>
