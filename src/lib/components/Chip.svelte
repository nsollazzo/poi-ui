<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		/** Toggle/selected state (button mode). */
		pressed?: boolean;
		/** Current state (link mode) — sets aria-current="page". */
		current?: boolean;
		/** When set, renders an <a> (deep-linkable tab) instead of a <button>. */
		href?: string;
		/** Click handler (button mode). */
		onclick?: () => void;
		/** Turns the chip into a menu/listbox trigger: sets aria-haspopup. Only for
		 *  popups whose items carry real menu/listbox roles; a popup of plain buttons
		 *  is a disclosure — use `expanded` alone (see Dropdown). */
		hasPopup?: 'menu' | 'listbox' | 'true';
		/** Disclosure state. When set (with or without `hasPopup`) the chip renders
		 *  aria-expanded instead of aria-pressed. */
		expanded?: boolean;
		/** id of the popup element this chip controls (renders aria-controls). */
		ariaControls?: string;
		/** Accessible name override. */
		ariaLabel?: string;
		/** Native title tooltip. */
		title?: string;
		/** Extra class(es) forwarded to the element. */
		class?: string;
		/** Chip label. */
		children: Snippet;
	}

	let {
		pressed = false,
		current = false,
		href,
		onclick,
		hasPopup,
		expanded,
		ariaControls,
		ariaLabel,
		title,
		class: className = '',
		children
	}: Props = $props();

	// Visual "selected" hook, decoupled from ARIA (a popup trigger is selected when
	// it holds a value but is not an aria-pressed toggle).
	const active = $derived(href ? current : pressed);
	const isTrigger = $derived(hasPopup !== undefined || expanded !== undefined);
</script>

{#if href}
	<a
		{href}
		{title}
		class="pn-chip {className}"
		data-active={active || undefined}
		aria-current={current ? 'page' : undefined}
		aria-label={ariaLabel}>{@render children()}</a
	>
{:else}
	<button
		type="button"
		{title}
		class="pn-chip {className}"
		data-active={active || undefined}
		aria-pressed={isTrigger ? undefined : pressed}
		aria-haspopup={hasPopup}
		aria-expanded={isTrigger ? expanded : undefined}
		aria-controls={ariaControls}
		aria-label={ariaLabel}
		{onclick}>{@render children()}</button
	>
{/if}

<style>
	.pn-chip {
		display: inline-flex;
		align-items: center;
		gap: var(--pn-space-1);
		padding: var(--pn-space-1) var(--pn-space-3);
		background: var(--pn-surface-base);
		color: var(--pn-ink);
		border: var(--pn-hairline-width) solid var(--pn-line);
		border-radius: var(--pn-radius);
		font-family: var(--pn-font-display);
		font-size: var(--pn-font-size-1);
		text-transform: uppercase;
		letter-spacing: var(--pn-tracking-display);
		text-decoration: none;
		white-space: nowrap;
		cursor: pointer;
		transition:
			color 0.12s var(--pn-ease),
			border-color 0.12s var(--pn-ease),
			background 0.12s var(--pn-ease);
	}
	.pn-chip:hover {
		color: var(--pn-accent);
		border-color: var(--pn-accent);
	}
	/* Selected = accent fill with the page-ink inverted onto it. Using surface-base
	   (black in Machine / white in Samaritan) keeps WCAG-AA contrast in BOTH themes —
	   accent-ink (always white) is only ~3.99:1 on Machine's full red. */
	.pn-chip[data-active] {
		color: var(--pn-surface-base);
		background: var(--pn-accent);
		border-color: var(--pn-accent);
	}
	.pn-chip:focus-visible {
		outline: none;
		box-shadow: var(--pn-focus-ring);
	}

	@media (prefers-reduced-motion: reduce) {
		.pn-chip {
			transition: none;
		}
	}
</style>
