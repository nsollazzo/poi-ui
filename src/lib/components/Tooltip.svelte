<script lang="ts">
	import type { Snippet } from 'svelte';
	import { useOverlayTheme } from '../theme/context.js';

	interface Props {
		/** Tooltip text. */
		text: string;
		/** Render the bubble in the opposite theme polarity (machine ↔ samaritan)
		 *  for contrast against the page; the trigger keeps the page theme. No-op
		 *  outside a <ThemeProvider>. Default true. */
		invert?: boolean;
		/** Which side of the trigger the bubble appears on. */
		side?: 'top' | 'bottom' | 'left' | 'right';
		/** Show delay in ms (hover/focus). */
		delay?: number;
		/** The trigger element. */
		children: Snippet;
		/** Extra class(es) forwarded to the wrapper. */
		class?: string;
	}

	let {
		text,
		invert = true,
		side = 'top',
		delay = 0,
		children,
		class: className = ''
	}: Props = $props();

	const overlayTheme = useOverlayTheme(() => invert);

	const bubbleId = $props.id();
	let open = $state(false);
	let wrapper = $state<HTMLElement | null>(null);
	let timer: ReturnType<typeof setTimeout> | undefined;

	function show() {
		clearTimeout(timer);
		if (delay > 0) timer = setTimeout(() => (open = true), delay);
		else open = true;
	}
	function hide() {
		clearTimeout(timer);
		open = false;
	}
	// Hide only when focus leaves the wrapper entirely — moving focus between
	// multiple focusable children inside the trigger must not flicker the bubble.
	function handleFocusOut(event: FocusEvent) {
		if (!wrapper?.contains(event.relatedTarget as Node | null)) hide();
	}

	// aria-describedby must live on the focused trigger, not this wrapper, or AT
	// won't announce the tip when the control is focused. Point it at the first
	// focusable descendant (the trigger), falling back to the wrapper.
	$effect(() => {
		const host = wrapper;
		if (!host) return;
		const target =
			host.querySelector<HTMLElement>(
				'a[href], button, input, select, textarea, [tabindex]:not([tabindex="-1"])'
			) ?? host;
		if (open) target.setAttribute('aria-describedby', bubbleId);
		else target.removeAttribute('aria-describedby');
	});

	// Escape must dismiss even when the tip was opened by hover (focus is then
	// elsewhere, so a wrapper keydown handler would never see it). Listen at the
	// document level only while open.
	$effect(() => {
		if (!open) return;
		const onKeydown = (event: KeyboardEvent) => {
			if (event.key === 'Escape') hide();
		};
		document.addEventListener('keydown', onKeydown);
		return () => document.removeEventListener('keydown', onKeydown);
	});

	// Clear any pending show timer if the component is destroyed mid-delay.
	$effect(() => () => clearTimeout(timer));
</script>

<!-- Wrapper hosts hover/focus handling and positions the bubble; the
     aria-describedby link is applied to the focusable trigger inside (see effect
     above). (svelte-ignore: a plain span hosting mouse/focus handlers; the
     trigger inside stays the focusable element.) -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<span
	bind:this={wrapper}
	class="poi-tooltip {className}"
	onmouseenter={show}
	onmouseleave={hide}
	onfocusin={show}
	onfocusout={handleFocusOut}
>
	{@render children()}
	{#if open}
		<span
			class="poi-tooltip__bubble"
			role="tooltip"
			id={bubbleId}
			data-theme={overlayTheme.current}
			data-side={side}>{text}</span
		>
	{/if}
</span>

<style>
	.poi-tooltip {
		position: relative;
		display: inline-flex;
	}

	.poi-tooltip__bubble {
		position: absolute;
		z-index: 1;
		pointer-events: none;
		white-space: nowrap;
		padding: var(--poi-space-1) var(--poi-space-2);
		/* surface-2 is a translucent lift; composite it over the opaque base so an
		   inverted bubble doesn't see through to the opposite-polarity page. */
		background: linear-gradient(var(--poi-surface-2), var(--poi-surface-2)) var(--poi-surface-base);
		color: var(--poi-ink);
		border: var(--poi-hairline-width) solid var(--poi-line);
		border-radius: var(--poi-radius);
		font-family: var(--poi-font-mono);
		font-size: var(--poi-font-size-1);
	}

	/* Pure-CSS placement. No collision detection / flipping — a tooltip near a
	   viewport edge can overflow; that's an accepted limitation for a lightweight
	   primitive. */
	.poi-tooltip__bubble[data-side='top'] {
		bottom: 100%;
		left: 50%;
		transform: translateX(-50%);
		margin-bottom: var(--poi-space-2);
	}
	.poi-tooltip__bubble[data-side='bottom'] {
		top: 100%;
		left: 50%;
		transform: translateX(-50%);
		margin-top: var(--poi-space-2);
	}
	.poi-tooltip__bubble[data-side='left'] {
		right: 100%;
		top: 50%;
		transform: translateY(-50%);
		margin-right: var(--poi-space-2);
	}
	.poi-tooltip__bubble[data-side='right'] {
		left: 100%;
		top: 50%;
		transform: translateY(-50%);
		margin-left: var(--poi-space-2);
	}
</style>
