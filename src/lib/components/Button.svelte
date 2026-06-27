<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		type?: 'button' | 'submit' | 'reset';
		tone?: 'neutral' | 'threat' | 'asset';
		disabled?: boolean;
		/** Rotate the content 180° on hover — a POI flourish (gated by reduced-motion). */
		rotateOnHover?: boolean;
		/** Paint a solid surface-base fill so the button reads cleanly over the <Backdrop> grid. */
		solid?: boolean;
		onclick?: (event: MouseEvent) => void;
		children: Snippet;
	}

	let {
		type = 'button',
		tone = 'neutral',
		disabled = false,
		rotateOnHover = false,
		solid = false,
		onclick,
		children
	}: Props = $props();
</script>

<button
	class="pn-button"
	class:rotate={rotateOnHover}
	data-tone={tone}
	data-solid={solid || undefined}
	{type}
	{disabled}
	{onclick}
>
	<span class="pn-button__content">{@render children()}</span>
</button>

<style>
	.pn-button {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: var(--pn-space-2);
		padding: var(--pn-space-2) var(--pn-space-4);
		background: transparent;
		color: var(--pn-ink);
		border: var(--pn-hairline-width) solid var(--pn-line);
		border-radius: var(--pn-radius);
		font-family: var(--pn-font-display);
		font-size: var(--pn-font-size-2);
		text-transform: uppercase;
		letter-spacing: var(--pn-tracking-display);
		cursor: pointer;
		transition:
			box-shadow 0.15s var(--pn-ease),
			color 0.15s,
			border-color 0.15s;
	}

	.pn-button[data-tone='threat'] {
		color: var(--pn-accent);
		border-color: var(--pn-accent);
	}

	.pn-button:hover:not(:disabled) {
		color: var(--pn-accent);
		border-color: var(--pn-accent);
		box-shadow: var(--pn-emphasis-shadow);
	}

	.pn-button:focus-visible {
		outline: none;
		box-shadow: var(--pn-focus-ring);
	}

	.pn-button:disabled {
		opacity: 0.4;
		cursor: not-allowed;
	}

	.pn-button.rotate .pn-button__content {
		transition: transform var(--pn-dur-pulse) var(--pn-ease);
	}
	.pn-button.rotate:hover:not(:disabled) .pn-button__content {
		transform: rotate(180deg);
	}

	@media (prefers-reduced-motion: reduce) {
		.pn-button,
		.pn-button__content {
			transition: none;
		}
		.pn-button.rotate:hover .pn-button__content {
			transform: none;
		}
	}
</style>
