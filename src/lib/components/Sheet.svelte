<script lang="ts">
	import type { Snippet } from 'svelte';
	import { useOverlayTheme } from '../theme/context.js';

	interface Props {
		/** Open state (two-way bindable). */
		open?: boolean;
		/** Render in the opposite theme polarity (machine ↔ samaritan) for contrast
		 *  against the page. No-op outside a <ThemeProvider>. Default true. */
		invert?: boolean;
		/** Edge the sheet slides in from. */
		side?: 'left' | 'right';
		/** Optional title; when set it labels the sheet (aria-labelledby). */
		title?: string;
		/** Accessible name when no `title` is rendered (e.g. a custom header). */
		'aria-label'?: string;
		/** Called after the sheet closes (Escape, backdrop click, or open=false). */
		onclose?: () => void;
		/** Sheet body. */
		children: Snippet;
		/** Extra class(es) forwarded to the <dialog>. */
		class?: string;
	}

	let {
		open = $bindable(false),
		invert = true,
		side = 'right',
		title,
		'aria-label': ariaLabel,
		onclose,
		children,
		class: className = ''
	}: Props = $props();

	const overlayTheme = useOverlayTheme(() => invert);

	const titleId = $props.id();
	let dialog = $state<HTMLDialogElement | null>(null);
	let previouslyFocused: HTMLElement | null = null;

	$effect(() => {
		const d = dialog;
		if (!d) return;
		if (open && !d.open) {
			previouslyFocused = document.activeElement as HTMLElement | null;
			d.showModal();
		} else if (!open && d.open) {
			d.close();
		}
	});

	// Restore focus on teardown if unmounted while open (no native `close` fires).
	$effect(() => () => {
		if (previouslyFocused?.isConnected) previouslyFocused.focus({ preventScroll: true });
	});

	// Closing always routes through the native `close` event so this fires once.
	function handleClose() {
		open = false;
		onclose?.();
		if (previouslyFocused?.isConnected) previouslyFocused.focus({ preventScroll: true });
		previouslyFocused = null;
	}
</script>

<dialog
	bind:this={dialog}
	class="poi-sheet {className}"
	data-theme={overlayTheme.current}
	data-side={side}
	aria-modal="true"
	aria-labelledby={title ? titleId : undefined}
	aria-label={title ? undefined : ariaLabel}
	onclose={handleClose}
	onclick={(e) => {
		// Close natively so the `close` event is the single dismissal path.
		if (e.target === dialog) dialog?.close();
	}}
>
	<div class="poi-sheet__content">
		{#if title}
			<h2 id={titleId} class="poi-sheet__title">{title}</h2>
		{/if}
		{@render children()}
	</div>
</dialog>

<style>
	.poi-sheet {
		margin: 0;
		width: min(90vw, 24rem);
		max-width: 90vw;
		height: 100dvh;
		max-height: 100dvh;
		padding: 0;
		background: var(--poi-surface-base);
		color: var(--poi-ink);
		border: 0;
		border-radius: var(--poi-radius);
	}
	.poi-sheet[data-side='right'] {
		margin-left: auto;
		border-left: var(--poi-hairline-width) solid var(--poi-line);
	}
	.poi-sheet[data-side='left'] {
		margin-right: auto;
		border-right: var(--poi-hairline-width) solid var(--poi-line);
	}
	.poi-sheet::backdrop {
		background: var(--poi-overlay-bg, rgba(0, 0, 0, 0.7));
	}
	.poi-sheet__content {
		height: 100%;
		overflow-y: auto;
		padding: var(--poi-space-5);
	}
	.poi-sheet__title {
		margin: 0 0 var(--poi-space-4);
		color: var(--poi-accent);
		font-family: var(--poi-font-mono);
		font-size: var(--poi-font-size-1);
		text-transform: uppercase;
		letter-spacing: var(--poi-tracking-display);
	}

	/* Slide-in via @starting-style (Chromium); degrades to an instant show elsewhere. */
	.poi-sheet[open] {
		transform: translateX(0);
		transition: transform 0.3s var(--poi-ease);
	}
	@starting-style {
		.poi-sheet[data-side='right'][open] {
			transform: translateX(100%);
		}
		.poi-sheet[data-side='left'][open] {
			transform: translateX(-100%);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.poi-sheet[open] {
			transition: none;
		}
	}
</style>
