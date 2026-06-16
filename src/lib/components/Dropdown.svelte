<script lang="ts" generics="T extends string">
	import { tick } from 'svelte';
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
	const menuId = $props.id();

	const selectedLabel = $derived(options.find((o) => o.value === value)?.label);

	const trigger = () => root?.querySelector<HTMLButtonElement>('button.poi-chip');

	// Honest disclosure focus contract: focus lands on the first option when the
	// popup opens, and returns to the trigger on keyboard close or selection.
	async function toggle() {
		open = !open;
		if (open) {
			await tick();
			root?.querySelector<HTMLElement>('.poi-dropdown__item')?.focus();
		}
	}

	function choose(v: T | null) {
		value = v;
		open = false;
		trigger()?.focus();
	}

	$effect(() => {
		if (!open) return;
		const onPointer = (e: MouseEvent) => {
			if (root && !root.contains(e.target as Node)) open = false;
		};
		const onKey = (e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				open = false;
				trigger()?.focus();
			}
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
		expanded={open}
		ariaControls={open ? menuId : undefined}
		ariaLabel={ariaLabel ?? label}
		onclick={toggle}
	>
		{label}{#if selectedLabel}: {selectedLabel}{/if}<span
			class="poi-dropdown__caret"
			aria-hidden="true">▾</span
		>
	</Chip>

	{#if open}
		<div class="poi-dropdown__menu" id={menuId}>
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
