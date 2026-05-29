<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		type?: 'button' | 'submit' | 'reset';
		tone?: 'neutral' | 'threat' | 'asset';
		disabled?: boolean;
		/** Rotate the content 180° on hover — a POI flourish (gated by reduced-motion). */
		rotateOnHover?: boolean;
		onclick?: (event: MouseEvent) => void;
		children: Snippet;
	}

	let {
		type = 'button',
		tone = 'neutral',
		disabled = false,
		rotateOnHover = false,
		onclick,
		children
	}: Props = $props();
</script>

<button
	class="poi-button"
	class:rotate={rotateOnHover}
	data-tone={tone}
	{type}
	{disabled}
	{onclick}
>
	<span class="poi-button__content">{@render children()}</span>
</button>

<style>
	.poi-button {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: var(--poi-space-2);
		padding: var(--poi-space-2) var(--poi-space-4);
		background: transparent;
		color: var(--poi-ink);
		border: var(--poi-hairline-width) solid var(--poi-line);
		border-radius: var(--poi-radius);
		font-family: var(--poi-font-display);
		font-size: var(--poi-font-size-2);
		text-transform: uppercase;
		letter-spacing: var(--poi-tracking-display);
		cursor: pointer;
		transition:
			box-shadow 0.15s var(--poi-ease),
			color 0.15s,
			border-color 0.15s;
	}

	.poi-button[data-tone='threat'] {
		color: var(--poi-accent);
		border-color: var(--poi-accent);
	}

	.poi-button:hover:not(:disabled) {
		color: var(--poi-accent);
		border-color: var(--poi-accent);
		box-shadow: var(--poi-emphasis-shadow);
	}

	.poi-button:focus-visible {
		outline: none;
		box-shadow: var(--poi-focus-ring);
	}

	.poi-button:disabled {
		opacity: 0.4;
		cursor: not-allowed;
	}

	.poi-button.rotate .poi-button__content {
		transition: transform var(--poi-dur-pulse) var(--poi-ease);
	}
	.poi-button.rotate:hover:not(:disabled) .poi-button__content {
		transform: rotate(180deg);
	}

	@media (prefers-reduced-motion: reduce) {
		.poi-button,
		.poi-button__content {
			transition: none;
		}
		.poi-button.rotate:hover .poi-button__content {
			transform: none;
		}
	}
</style>
