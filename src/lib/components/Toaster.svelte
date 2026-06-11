<script lang="ts">
	import type { Snippet } from 'svelte';
	import { fly, fade } from 'svelte/transition';
	import { reducedMotion } from '../actions/reducedMotion.js';
	import { oppositeTheme, useThemeOptional } from '../theme/context.js';
	import { store, remove, type ToastItem } from '../toast/store.svelte.js';

	interface Props {
		/** Render toasts in the opposite theme polarity (machine ↔ samaritan) for
		 *  contrast against the page. Requires the Toaster to be mounted inside a
		 *  <ThemeProvider>; otherwise it no-ops. Default true. */
		invert?: boolean;
		/** Override the close-button icon (defaults to ×). */
		closeIcon?: Snippet;
		/** Override the per-level icon; receives the toast level. */
		icon?: Snippet<[ToastItem['level']]>;
		/** Extra class(es) forwarded to the container. */
		class?: string;
	}

	let { invert = true, closeIcon, icon, class: className = '' }: Props = $props();

	const themeContext = useThemeOptional();
	const overlayTheme = $derived(
		invert && themeContext ? oppositeTheme(themeContext.theme) : undefined
	);

	// Motion is opt-out under prefers-reduced-motion.
	const inParams = $derived(reducedMotion.current ? { duration: 0 } : { y: -8, duration: 300 });
	const outParams = $derived(reducedMotion.current ? { duration: 0 } : { duration: 300 });

	// Decorative default glyphs so level is not signalled by color alone (WCAG 1.4.1).
	const glyphs: Record<ToastItem['level'], string> = {
		info: 'i',
		success: '✓',
		warning: '!',
		error: '✕'
	};
</script>

<!-- The container is a persistent polite live region: toasts inserted into a
     region that already exists are announced reliably, whereas a freshly inserted
     role="status" node is not. Errors additionally carry role="alert" so they
     interrupt assertively. -->
<div class="poi-toaster {className}" data-theme={overlayTheme} aria-live="polite">
	{#each store.items as item (item.id)}
		<div
			class="poi-toast"
			data-level={item.level}
			role={item.level === 'error' ? 'alert' : undefined}
			aria-atomic="true"
			in:fly={inParams}
			out:fade={outParams}
		>
			<span class="poi-toast__icon" aria-hidden="true">
				{#if icon}{@render icon(item.level)}{:else}{glyphs[item.level]}{/if}
			</span>
			<span class="poi-toast__message">{item.message}</span>
			<button
				class="poi-toast__close"
				type="button"
				aria-label="Dismiss"
				onclick={() => remove(item.id)}
			>
				{#if closeIcon}{@render closeIcon()}{:else}×{/if}
			</button>
			{#if item.duration > 0 && !reducedMotion.current}
				<span
					class="poi-toast__progress"
					style:animation-duration="{item.duration}ms"
					aria-hidden="true"
				></span>
			{/if}
		</div>
	{/each}
</div>

<style>
	.poi-toaster {
		position: fixed;
		top: var(--poi-space-4);
		left: 50%;
		transform: translateX(-50%);
		z-index: 1000;
		display: flex;
		flex-direction: column;
		gap: var(--poi-space-2);
		width: max-content;
		max-width: min(90vw, 28rem);
		pointer-events: none;
	}

	.poi-toast {
		--poi-toast-accent: var(--poi-status-info);
		position: relative;
		overflow: hidden;
		display: flex;
		align-items: flex-start;
		gap: var(--poi-space-2);
		padding: var(--poi-space-2) var(--poi-space-3);
		background: var(--poi-surface-base);
		color: var(--poi-ink);
		border: var(--poi-hairline-width) solid var(--poi-toast-accent);
		border-left-width: 3px;
		border-radius: var(--poi-radius);
		font-size: var(--poi-font-size-2);
		pointer-events: auto;
	}
	.poi-toast[data-level='success'] {
		--poi-toast-accent: var(--poi-status-success);
	}
	.poi-toast[data-level='warning'] {
		--poi-toast-accent: var(--poi-status-warning);
	}
	.poi-toast[data-level='error'] {
		--poi-toast-accent: var(--poi-status-error);
	}

	.poi-toast__icon {
		flex-shrink: 0;
		color: var(--poi-toast-accent);
		font-family: var(--poi-font-mono);
		font-weight: 700;
		line-height: 1.4;
	}
	.poi-toast__message {
		flex: 1;
	}
	.poi-toast__close {
		flex-shrink: 0;
		padding: 0 var(--poi-space-1);
		background: transparent;
		border: 0;
		color: var(--poi-ink-dim);
		font-family: var(--poi-font-mono);
		font-size: var(--poi-font-size-3);
		line-height: 1;
		cursor: pointer;
	}
	.poi-toast__close:hover {
		color: var(--poi-ink);
	}
	.poi-toast__close:focus-visible {
		outline: none;
		box-shadow: var(--poi-focus-ring);
	}

	.poi-toast__progress {
		position: absolute;
		left: 0;
		bottom: 0;
		width: 100%;
		height: 2px;
		background: var(--poi-toast-accent);
		transform-origin: left;
		animation: poi-toast-shrink linear forwards;
	}
	@keyframes poi-toast-shrink {
		from {
			transform: scaleX(1);
		}
		to {
			transform: scaleX(0);
		}
	}
	/* The progress bar isn't rendered at all under reduced motion (gated in JS),
	   so no @media override is needed here. */
</style>
