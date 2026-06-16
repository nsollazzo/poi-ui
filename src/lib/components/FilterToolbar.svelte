<script lang="ts">
	import type { Snippet } from 'svelte';
	import { slide } from 'svelte/transition';
	import { reducedMotion } from '../actions/reducedMotion.js';

	interface Props {
		/** Search text (two-way bindable). Escape clears it. */
		value?: string;
		/** Search input placeholder. */
		placeholder?: string;
		/** Accessible name for the search input (defaults to `placeholder`). */
		ariaLabel?: string;
		/** Preformatted result readout (e.g. "12 / 87"). Rendered as a live region. */
		status?: string;
		/** Active filters; clicking a token removes it and refocuses the search input. */
		filters?: { label: string; remove: () => void }[];
		/** Clears everything; renders the trailing clear button while filters are active. */
		onclear?: () => void;
		/** Label for the clear button. */
		clearLabel?: string;
		/** Key that focuses the search from anywhere on the page; null disables. */
		shortcutKey?: string | null;
		/** Row rendered above the command bar (e.g. a ChipGroup of primary tabs). */
		primary?: Snippet;
		/** Right-aligned controls (e.g. Dropdown, SortControl). */
		controls?: Snippet;
		/** Extra class(es) forwarded to the wrapper. */
		class?: string;
	}

	let {
		value = $bindable(''),
		placeholder,
		ariaLabel,
		status,
		filters = [],
		onclear,
		clearLabel = 'Clear',
		shortcutKey = '/',
		primary,
		controls,
		class: className = ''
	}: Props = $props();

	let inputEl = $state<HTMLInputElement>();

	const slideParams = $derived(reducedMotion.current ? { duration: 0 } : { duration: 140 });

	// The shortcut focuses search from anywhere on the page — a nod to the
	// terminal identity — but must never fire while the user is typing elsewhere.
	$effect(() => {
		const key = shortcutKey;
		if (!key) return;
		const onKey = (e: KeyboardEvent) => {
			if (e.key !== key || e.metaKey || e.ctrlKey || e.altKey) return;
			const t = e.target as HTMLElement | null;
			const tag = t?.tagName;
			if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT' || t?.isContentEditable) return;
			e.preventDefault();
			inputEl?.focus();
		};
		window.addEventListener('keydown', onKey);
		return () => window.removeEventListener('keydown', onKey);
	});
</script>

<div class="poi-toolbar {className}">
	{#if primary}<div class="poi-toolbar__primary">{@render primary()}</div>{/if}

	<div class="poi-toolbar__bar">
		<div class="poi-toolbar__field">
			<span class="poi-toolbar__prompt" aria-hidden="true">›</span>
			<input
				bind:this={inputEl}
				class="poi-toolbar__search"
				type="search"
				{placeholder}
				bind:value
				onkeydown={(e) => {
					if (e.key === 'Escape') value = '';
				}}
				aria-label={ariaLabel ?? placeholder}
			/>
		</div>

		<div class="poi-toolbar__controls">
			{#if controls}{@render controls()}{/if}
			{#if status}<p class="poi-toolbar__status" role="status">{status}</p>{/if}
		</div>
	</div>

	{#if filters.length > 0}
		<div class="poi-toolbar__tokens" transition:slide={slideParams}>
			{#each filters as f, i (i)}
				<button
					type="button"
					class="poi-toolbar__token"
					onclick={() => {
						f.remove();
						inputEl?.focus();
					}}
					aria-label={`Remove filter: ${f.label}`}
				>
					{f.label}<span class="poi-toolbar__token-x" aria-hidden="true">✕</span>
				</button>
			{/each}
			{#if onclear}
				<button type="button" class="poi-toolbar__clear" onclick={onclear}>{clearLabel}</button>
			{/if}
		</div>
	{/if}
</div>

<style>
	.poi-toolbar {
		display: flex;
		flex-direction: column;
		gap: var(--poi-space-3);
	}
	.poi-toolbar__primary {
		display: flex;
	}
	.poi-toolbar__bar {
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		gap: var(--poi-space-3);
	}
	/* The command field grows to fill the row so the controls hug it (no dead gap). */
	.poi-toolbar__field {
		flex: 1 1 280px;
		display: flex;
		align-items: center;
		gap: var(--poi-space-3);
		box-sizing: border-box;
		padding: var(--poi-space-3) var(--poi-space-4);
		background: var(--poi-surface-base);
		border: var(--poi-hairline-width) solid var(--poi-line);
		border-radius: var(--poi-radius);
	}
	.poi-toolbar__field:focus-within {
		border-color: var(--poi-accent);
	}
	.poi-toolbar__prompt {
		font-family: var(--poi-font-mono);
		font-size: var(--poi-font-size-2);
		font-weight: 700;
		line-height: 1;
		color: var(--poi-accent);
	}
	.poi-toolbar__search {
		flex: 1;
		min-width: 0;
		background: none;
		border: none;
		color: var(--poi-ink);
		font-family: var(--poi-font-mono);
		font-size: var(--poi-font-size-2);
	}
	.poi-toolbar__search:focus {
		outline: none;
	}
	.poi-toolbar__controls {
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		gap: var(--poi-space-4);
	}
	.poi-toolbar__status {
		margin: 0;
		font-family: var(--poi-font-mono);
		font-size: var(--poi-font-size-1);
		text-transform: uppercase;
		letter-spacing: 0.04em;
		color: var(--poi-ink-dim);
		white-space: nowrap;
		font-variant-numeric: tabular-nums;
	}
	.poi-toolbar__tokens {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: var(--poi-space-2);
	}
	/* Active filters read as console arguments — click anywhere on a token to drop it. */
	.poi-toolbar__token {
		display: inline-flex;
		align-items: center;
		gap: var(--poi-space-2);
		padding: var(--poi-space-1) var(--poi-space-3);
		background: var(--poi-surface-base);
		color: var(--poi-ink-dim);
		border: var(--poi-hairline-width) solid var(--poi-line);
		border-radius: var(--poi-radius);
		font-family: var(--poi-font-mono);
		font-size: var(--poi-font-size-1);
		cursor: pointer;
		transition:
			color 0.12s var(--poi-ease),
			border-color 0.12s var(--poi-ease);
	}
	.poi-toolbar__token-x {
		font-size: 0.85em;
	}
	.poi-toolbar__token:hover {
		color: var(--poi-accent);
		border-color: var(--poi-accent);
	}
	.poi-toolbar__token:focus-visible {
		outline: none;
		box-shadow: var(--poi-focus-ring);
	}
	.poi-toolbar__clear {
		padding: var(--poi-space-1) var(--poi-space-2);
		background: none;
		border: none;
		color: var(--poi-ink-dim);
		font-family: var(--poi-font-mono);
		font-size: var(--poi-font-size-1);
		text-transform: uppercase;
		letter-spacing: 0.04em;
		cursor: pointer;
		transition: color 0.12s var(--poi-ease);
	}
	.poi-toolbar__clear:hover {
		color: var(--poi-accent);
	}
	.poi-toolbar__clear:focus-visible {
		outline: none;
		box-shadow: var(--poi-focus-ring);
	}

	@media (prefers-reduced-motion: reduce) {
		.poi-toolbar__token,
		.poi-toolbar__clear {
			transition: none;
		}
	}
</style>
