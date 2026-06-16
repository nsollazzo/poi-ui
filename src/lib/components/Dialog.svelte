<script lang="ts">
	import type { Snippet } from 'svelte';
	import { useOverlayTheme } from '../theme/context.js';

	interface Props {
		/** Open state (two-way bindable). */
		open?: boolean;
		/** Render in the opposite theme polarity (machine ↔ samaritan) for contrast
		 *  against the page — the UI is flat, so polarity is its depth cue. No-op
		 *  outside a <ThemeProvider>. A dialog nested inside another overlay's content
		 *  still inverts relative to the app theme (never double-inverts); pass
		 *  `invert={false}` to match the surroundings instead. Default true. */
		invert?: boolean;
		/** Optional title; when set it labels the dialog (aria-labelledby). */
		title?: string;
		/** Accessible name when no `title` is rendered (e.g. a custom header). */
		'aria-label'?: string;
		/** Called after the dialog closes (Escape, backdrop click, or open=false). */
		onclose?: () => void;
		/** Dialog body. */
		children: Snippet;
		/** Extra class(es) forwarded to the <dialog>. */
		class?: string;
	}

	let {
		open = $bindable(false),
		invert = true,
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

	// Drive the native dialog imperatively. We never set the `open` attribute in
	// markup; showModal() reflects it, puts the dialog in the top layer, and adds
	// a focus trap + inert background.
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

	// If the dialog is unmounted while still open, the native `close` event never
	// fires, so handleClose() never runs — restore focus on teardown so it isn't
	// stranded on a now-removed element.
	$effect(() => () => {
		if (previouslyFocused?.isConnected) previouslyFocused.focus({ preventScroll: true });
	});

	// The single source of truth for closing is the native `close` event; every
	// dismissal path (Escape, backdrop click, open=false) routes through d.close()
	// so this fires exactly once. Sync the binding, notify, and restore focus.
	function handleClose() {
		open = false;
		onclose?.();
		if (previouslyFocused?.isConnected) previouslyFocused.focus({ preventScroll: true });
		previouslyFocused = null;
	}
</script>

<dialog
	bind:this={dialog}
	class="poi-dialog {className}"
	data-theme={overlayTheme.current}
	aria-modal="true"
	aria-labelledby={title ? titleId : undefined}
	aria-label={title ? undefined : ariaLabel}
	onclose={handleClose}
	onclick={(e) => {
		// Clicks on the dialog element itself = the backdrop region (content is a child).
		// Close natively so the `close` event stays the single dismissal path
		// (calling handleClose() directly would double-fire via the effect).
		if (e.target === dialog) dialog?.close();
	}}
>
	<div class="poi-dialog__content">
		{#if title}
			<h2 id={titleId} class="poi-dialog__title">{title}</h2>
		{/if}
		{@render children()}
	</div>
</dialog>

<style>
	.poi-dialog {
		margin: auto;
		max-width: min(90vw, 32rem);
		padding: 0;
		background: var(--poi-surface-base);
		color: var(--poi-ink);
		border: var(--poi-hairline-width) solid var(--poi-line);
		border-radius: var(--poi-radius);
	}
	/* Fallback literal covers browsers where ::backdrop doesn't inherit the custom property. */
	.poi-dialog::backdrop {
		background: var(--poi-overlay-bg, rgba(0, 0, 0, 0.7));
	}
	.poi-dialog__content {
		padding: var(--poi-space-5);
	}
	.poi-dialog__title {
		margin: 0 0 var(--poi-space-4);
		color: var(--poi-accent);
		font-family: var(--poi-font-mono);
		font-size: var(--poi-font-size-1);
		text-transform: uppercase;
		letter-spacing: var(--poi-tracking-display);
	}
</style>
