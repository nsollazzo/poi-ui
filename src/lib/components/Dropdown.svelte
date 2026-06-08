<script lang="ts" generics="T extends string">
	import Chip from './Chip.svelte';

	interface Props {
		/** Selected value, or null for "no filter" (two-way bindable). */
		value: T | null;
		/** Selectable options. */
		options: { value: T; label: string }[];
		/** Trigger label (e.g. "Framework"). */
		label: string;
		/** Accessible name for the trigger (defaults to `label`). */
		ariaLabel?: string;
		/** Extra class(es) forwarded to the wrapper. */
		class?: string;
	}

	let { value = $bindable(), options, label, ariaLabel, class: className = '' }: Props = $props();

	let open = $state(false);
	let root = $state<HTMLDivElement>();

	const selectedLabel = $derived(options.find((o) => o.value === value)?.label);

	function choose(v: T | null) {
		value = v;
		open = false;
	}

	$effect(() => {
		if (!open) return;
		const onPointer = (e: MouseEvent) => {
			if (root && !root.contains(e.target as Node)) open = false;
		};
		const onKey = (e: KeyboardEvent) => {
			if (e.key === 'Escape') open = false;
		};
		// Capture phase so an outside click closes before other handlers run.
		window.addEventListener('click', onPointer, true);
		window.addEventListener('keydown', onKey);
		return () => {
			window.removeEventListener('click', onPointer, true);
			window.removeEventListener('keydown', onKey);
		};
	});
</script>

<div class="poi-dropdown {className}" bind:this={root}>
	<Chip
		pressed={value !== null}
		hasPopup="menu"
		expanded={open}
		ariaLabel={ariaLabel ?? label}
		onclick={() => (open = !open)}
	>
		{label}{#if selectedLabel}: {selectedLabel}{/if}<span
			class="poi-dropdown__caret"
			aria-hidden="true">▾</span
		>
	</Chip>

	{#if open}
		<div class="poi-dropdown__menu">
			<button
				type="button"
				class="poi-dropdown__item"
				data-active={value === null || undefined}
				onclick={() => choose(null)}
			>
				All
			</button>
			{#each options as o (o.value)}
				<button
					type="button"
					class="poi-dropdown__item"
					data-active={value === o.value || undefined}
					onclick={() => choose(o.value)}
				>
					{o.label}
				</button>
			{/each}
		</div>
	{/if}
</div>

<style>
	.poi-dropdown {
		position: relative;
		display: inline-flex;
	}
	.poi-dropdown__caret {
		font-size: 0.85em;
	}
	.poi-dropdown__menu {
		position: absolute;
		top: calc(100% + var(--poi-space-1));
		right: 0;
		z-index: 50;
		min-width: 9rem;
		display: flex;
		flex-direction: column;
		background: var(--poi-surface-base);
		border: var(--poi-hairline-width) solid var(--poi-line);
		border-radius: var(--poi-radius);
	}
	.poi-dropdown__item {
		padding: var(--poi-space-2) var(--poi-space-3);
		background: transparent;
		color: var(--poi-ink);
		border: none;
		text-align: left;
		font-family: var(--poi-font-display);
		font-size: var(--poi-font-size-1);
		text-transform: uppercase;
		letter-spacing: var(--poi-tracking-display);
		cursor: pointer;
		transition:
			color 0.12s var(--poi-ease),
			background 0.12s var(--poi-ease);
	}
	.poi-dropdown__item:not(:first-child) {
		border-top: var(--poi-hairline-width) solid var(--poi-line);
	}
	.poi-dropdown__item:hover {
		color: var(--poi-accent);
	}
	.poi-dropdown__item[data-active] {
		color: var(--poi-surface-base);
		background: var(--poi-accent);
	}
	.poi-dropdown__item:focus-visible {
		outline: none;
		box-shadow: var(--poi-focus-ring);
	}

	@media (prefers-reduced-motion: reduce) {
		.poi-dropdown__item {
			transition: none;
		}
	}
</style>
