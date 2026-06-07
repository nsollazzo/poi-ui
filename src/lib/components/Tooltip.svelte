<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		/** Tooltip text. */
		text: string;
		/** Which side of the trigger the bubble appears on. */
		side?: 'top' | 'bottom' | 'left' | 'right';
		/** Show delay in ms (hover/focus). */
		delay?: number;
		/** The trigger element. */
		children: Snippet;
		/** Extra class(es) forwarded to the wrapper. */
		class?: string;
	}

	let { text, side = 'top', delay = 0, children, class: className = '' }: Props = $props();

	const bubbleId = $props.id();
	let open = $state(false);
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
	function onkeydown(event: KeyboardEvent) {
		if (event.key === 'Escape') hide();
	}

	// Clear any pending show timer if the component is destroyed mid-delay.
	$effect(() => () => clearTimeout(timer));
</script>

<!-- Wrapper carries the description link + hover/focus/escape handling. aria-describedby
     is set only while open so it never dangles. (svelte-ignore: a plain span hosting
     mouse/focus/key handlers; the trigger inside stays the focusable element.) -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<span
	class="poi-tooltip {className}"
	aria-describedby={open ? bubbleId : undefined}
	onmouseenter={show}
	onmouseleave={hide}
	onfocusin={show}
	onfocusout={hide}
	{onkeydown}
>
	{@render children()}
	{#if open}
		<span class="poi-tooltip__bubble" role="tooltip" id={bubbleId} data-side={side}>{text}</span>
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
		background: var(--poi-surface-2);
		color: var(--poi-ink);
		border: var(--poi-hairline-width) solid var(--poi-line);
		border-radius: var(--poi-radius);
		font-family: var(--poi-font-mono);
		font-size: var(--poi-font-size-1);
		box-shadow: var(--poi-emphasis-shadow);
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
