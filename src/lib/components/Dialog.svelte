<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		/** Open state (two-way bindable). */
		open?: boolean;
		/** Optional title; when set it labels the dialog (aria-labelledby). */
		title?: string;
		/** Called after the dialog closes (Escape, backdrop click, or open=false). */
		onclose?: () => void;
		/** Dialog body. */
		children: Snippet;
		/** Extra class(es) forwarded to the <dialog>. */
		class?: string;
	}

	let {
		open = $bindable(false),
		title,
		onclose,
		children,
		class: className = ''
	}: Props = $props();

	const titleId = $props.id();
	let dialog = $state<HTMLDialogElement | null>(null);
	let previouslyFocused: HTMLElement | null = null;

	// Drive the native dialog imperatively. We never set the `open` attribute —
	// showModal() puts it in the top layer with a focus trap + inert background.
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

	// Single close handler covers all three paths (Escape and backdrop both end in
	// the native `close` event): sync the binding, notify, and restore focus.
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
	aria-modal="true"
	aria-labelledby={title ? titleId : undefined}
	onclose={handleClose}
	onclick={(e) => {
		// Clicks on the dialog element itself = the backdrop region (content is a child).
		// Escape (native) provides the keyboard-dismiss path.
		if (e.target === dialog) handleClose();
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
		box-shadow: var(--poi-emphasis-shadow);
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
