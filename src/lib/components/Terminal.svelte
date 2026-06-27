<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		/** Prompt sigil shown at the start of the command line. */
		prompt?: string;
		/** Show the blinking cursor trailing the command. */
		cursor?: boolean;
		/** Terminal contents (normal-case, monospace). */
		children?: Snippet;
	}

	let { prompt = '>', cursor = true, children }: Props = $props();

	let commandEl = $state<HTMLElement>();
	let copied = $state(false);
	let resetTimer: ReturnType<typeof setTimeout>;

	async function copy() {
		const text = commandEl?.textContent?.trim() ?? '';
		if (!text || !navigator.clipboard) return;
		try {
			await navigator.clipboard.writeText(text);
			copied = true;
			clearTimeout(resetTimer);
			resetTimer = setTimeout(() => (copied = false), 1500);
		} catch {
			// Clipboard denied/unavailable — leave `copied` false so the button never falsely claims success.
		}
	}

	$effect(() => () => clearTimeout(resetTimer));
</script>

<div class="pn-terminal">
	{#if children}
		<button
			class="pn-terminal__copy"
			type="button"
			data-copied={copied || undefined}
			aria-label={copied ? 'Copied' : 'Copy command'}
			onclick={copy}
		>
			<span aria-hidden="true">{copied ? '✓' : '⧉'}</span>
		</button>
	{/if}
	<div class="pn-terminal__line">
		<span class="pn-terminal__sigil">{prompt}</span><span
			class="pn-terminal__command"
			bind:this={commandEl}>{@render children?.()}</span
		>{#if cursor}<span class="pn-terminal__cursor" aria-hidden="true"></span>{/if}
	</div>
	{#if children}
		<span class="pn-terminal__live" aria-live="polite">{copied ? 'Copied' : ''}</span>
	{/if}
</div>

<style>
	.pn-terminal {
		position: relative;
		padding: var(--pn-space-3);
		background: var(--pn-surface-base);
		color: var(--pn-ink);
		border: var(--pn-hairline-width) solid var(--pn-line);
		border-radius: var(--pn-radius);
		font-family: var(--pn-font-mono);
		font-size: var(--pn-font-size-2);
		text-transform: none;
	}

	.pn-terminal__line {
		/* Reserve room on the right so a wrapping command never collides with the copy button. */
		padding-right: var(--pn-space-6);
	}
	.pn-terminal__sigil {
		margin-right: var(--pn-space-2);
		color: var(--pn-accent);
	}
	.pn-terminal__command {
		/* Preserve the command's own whitespace/newlines; keep it off the line so the
		   source-formatting whitespace around the sigil/cursor stays collapsible. */
		white-space: pre-wrap;
	}
	.pn-terminal__cursor {
		display: inline-block;
		width: 0.5rem;
		height: 1rem;
		vertical-align: text-bottom;
		background: var(--pn-ink);
		animation: pn-blink 1s steps(1) infinite;
	}

	.pn-terminal__copy {
		position: absolute;
		top: var(--pn-space-2);
		right: var(--pn-space-2);
		display: inline-flex;
		align-items: center;
		justify-content: center;
		padding: var(--pn-space-1);
		background: transparent;
		color: var(--pn-ink);
		border: none;
		font-family: var(--pn-font-mono);
		font-size: var(--pn-font-size-2);
		line-height: 1;
		cursor: pointer;
		transition: color 0.15s var(--pn-ease);
	}
	.pn-terminal__copy:hover {
		color: var(--pn-accent);
	}
	.pn-terminal__copy:focus-visible {
		outline: none;
		box-shadow: var(--pn-focus-ring);
	}
	.pn-terminal__copy[data-copied] {
		color: var(--pn-accent);
	}

	.pn-terminal__live {
		position: absolute;
		width: 1px;
		height: 1px;
		padding: 0;
		margin: -1px;
		overflow: hidden;
		clip: rect(0 0 0 0);
		white-space: nowrap;
		border: 0;
	}

	@keyframes pn-blink {
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
		.pn-terminal__cursor {
			animation: none;
		}
		.pn-terminal__copy {
			transition: none;
		}
	}
</style>
