<script module lang="ts">
	/** A single section-nav destination. */
	export interface SectionNavItem {
		href: string;
		label: string;
	}
</script>

<script lang="ts">
	import { tick } from 'svelte';

	interface Props {
		/** The destinations, in order. */
		items: SectionNavItem[];
		/** The current location (e.g. a pathname) used to resolve the active item. */
		current: string;
		/** Accessible label for the `<nav>` landmark. */
		label: string;
		/**
		 * Active-item matcher. Defaults to exact equality of `item.href` and `current`. Pass a
		 * predicate (e.g. a prefix match) to keep the component framework-/route-agnostic.
		 */
		isActive?: (item: SectionNavItem, current: string) => boolean;
		/** Extra class(es) forwarded to the root element. */
		class?: string;
	}

	const exact = (item: SectionNavItem, current: string) => item.href === current;

	let { items, current, label, isActive = exact, class: className = '' }: Props = $props();

	let navEl: HTMLElement | undefined = $state();

	// On the mobile scroll-row, keep the active tab in view so it is never stranded off-screen when
	// you land deep in a section. No-op on desktop (the sidebar has no overflow) and when already
	// in view. Match by index so an href with selector-special characters can't break the lookup.
	$effect(() => {
		const activeIndex = items.findIndex((i) => isActive(i, current));
		if (!navEl || activeIndex < 0) return;
		tick().then(() =>
			navEl?.querySelectorAll<HTMLElement>('a')[activeIndex]?.scrollIntoView({
				block: 'nearest',
				inline: 'nearest'
			})
		);
	});
</script>

<nav class="pn-section-nav {className}" aria-label={label} bind:this={navEl}>
	{#each items as item (item.href)}
		{@const active = isActive(item, current)}
		<a href={item.href} class:on={active} aria-current={active ? 'page' : undefined}>{item.label}</a
		>
	{/each}
</nav>

<style>
	/* Mobile (<768px): a single horizontal scroll-row — never wraps, hidden scrollbar, active = an
	   underline bar. */
	.pn-section-nav {
		display: flex;
		gap: var(--pn-space-2);
		overflow-x: auto;
		scrollbar-width: none;
		border-bottom: var(--pn-hairline-width) solid var(--pn-line);
	}
	.pn-section-nav::-webkit-scrollbar {
		display: none;
	}
	.pn-section-nav a {
		flex: none;
		padding: var(--pn-space-2) var(--pn-space-3);
		font-family: var(--pn-font-mono);
		font-size: var(--pn-font-size-1);
		text-transform: uppercase;
		letter-spacing: var(--pn-tracking-display);
		color: var(--pn-ink-dim);
		text-decoration: none;
		white-space: nowrap;
		border-bottom: 2px solid transparent;
		margin-bottom: calc(-1 * var(--pn-hairline-width));
	}
	.pn-section-nav a:hover {
		color: var(--pn-accent);
	}
	.pn-section-nav a.on {
		color: var(--pn-ink);
		border-bottom-color: var(--pn-accent);
	}
	.pn-section-nav a:focus-visible {
		outline: none;
		box-shadow: var(--pn-focus-ring);
	}

	/* Desktop (≥768px): a sticky vertical sidebar — active = a left bar. */
	@media (min-width: 768px) {
		.pn-section-nav {
			position: sticky;
			top: var(--pn-space-5);
			flex-direction: column;
			gap: 0;
			overflow-x: visible;
			border-bottom: none;
			border-left: var(--pn-hairline-width) solid var(--pn-line);
		}
		.pn-section-nav a {
			border-bottom: none;
			border-left: 2px solid transparent;
			margin-bottom: 0;
			margin-left: calc(-1 * var(--pn-hairline-width));
		}
		.pn-section-nav a.on {
			border-left-color: var(--pn-accent);
		}
	}
</style>
