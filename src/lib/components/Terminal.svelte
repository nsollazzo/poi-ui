<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		/** Prompt sigil shown before the blinking cursor. */
		prompt?: string;
		/** Terminal contents (normal-case, monospace). */
		children?: Snippet;
	}

	let { prompt = '>', children }: Props = $props();
</script>

<div class="poi-terminal">
	{#if children}
		<div class="poi-terminal__body">{@render children()}</div>
	{/if}
	<div class="poi-terminal__prompt">
		<span class="poi-terminal__sigil">{prompt}</span>
		<span class="poi-terminal__cursor" aria-hidden="true"></span>
	</div>
</div>

<style>
	.poi-terminal {
		padding: var(--poi-space-3);
		background: var(--poi-surface-base);
		color: var(--poi-ink);
		border: var(--poi-hairline-width) solid var(--poi-line);
		border-radius: var(--poi-radius);
		font-family: var(--poi-font-mono);
		font-size: var(--poi-font-size-2);
		text-transform: none;
	}

	.poi-terminal__body {
		white-space: pre-wrap;
	}

	.poi-terminal__prompt {
		display: flex;
		align-items: center;
		gap: var(--poi-space-2);
		margin-top: var(--poi-space-2);
	}
	.poi-terminal__sigil {
		color: var(--poi-accent);
	}
	.poi-terminal__cursor {
		display: inline-block;
		width: 0.5rem;
		height: 1rem;
		background: var(--poi-ink);
		animation: poi-blink 1s steps(1) infinite;
	}

	@keyframes poi-blink {
		0%,
		50% {
			opacity: 1;
		}
		50.01%,
		100% {
			opacity: 0;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.poi-terminal__cursor {
			animation: none;
		}
	}
</style>
