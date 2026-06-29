<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		/**
		 * The long-form content to style — composed Svelte markup, or your own HTML rendered with
		 * `{@html}` *inside* this wrapper.
		 *
		 * @security `Prose` never calls `{@html}` itself; it only applies typography to whatever you
		 * render. If you pass HTML from an untrusted source, sanitize it on your side first — the
		 * library deliberately stays inert so the sanitization decision lives with the data.
		 */
		children: Snippet;
		/** Extra class(es) forwarded to the root element. */
		class?: string;
	}

	let { children, class: className = '' }: Props = $props();
</script>

<div class="pn-prose {className}">{@render children()}</div>

<style>
	/* Long-form typography. The selectors are :global because the styled elements are authored by
	   the consumer (passed as children), not by this component. */
	.pn-prose {
		color: var(--pn-ink);
		line-height: 1.6;
		font-size: var(--pn-font-size-3);
	}
	/* Collapse the leading margin so dropping <Prose> directly under a page title doesn't double the
	   gap. The trailing margin of the last block is left intact for stacking. */
	.pn-prose > :global(:first-child) {
		margin-top: 0;
	}
	.pn-prose :global(h1),
	.pn-prose :global(h2),
	.pn-prose :global(h3) {
		font-family: var(--pn-font-display);
		text-transform: uppercase;
		letter-spacing: var(--pn-tracking-display);
		color: var(--pn-ink);
		margin: var(--pn-space-5) 0 var(--pn-space-3);
		line-height: 1.2;
	}
	.pn-prose :global(h1) {
		font-size: var(--pn-font-size-4);
		color: var(--pn-accent);
	}
	.pn-prose :global(h2) {
		font-size: var(--pn-font-size-4);
	}
	.pn-prose :global(h3) {
		font-size: var(--pn-font-size-3);
	}
	.pn-prose :global(p),
	.pn-prose :global(li) {
		font-size: var(--pn-font-size-2);
	}
	.pn-prose :global(ul),
	.pn-prose :global(ol) {
		padding-left: var(--pn-space-5);
	}
	.pn-prose :global(li) {
		margin: var(--pn-space-1) 0;
	}
	.pn-prose :global(a) {
		color: var(--pn-accent);
	}
	.pn-prose :global(code) {
		font-family: var(--pn-font-mono);
		font-size: 0.9em;
		background: var(--pn-surface-2);
		padding: 0.1em 0.3em;
	}
	.pn-prose :global(pre) {
		background: var(--pn-surface-2);
		padding: var(--pn-space-3);
		overflow-x: auto;
		border: var(--pn-hairline-width) solid var(--pn-line);
	}
	.pn-prose :global(pre code) {
		background: none;
		padding: 0;
	}
	.pn-prose :global(blockquote) {
		margin: var(--pn-space-3) 0;
		padding-left: var(--pn-space-4);
		border-left: 2px solid var(--pn-accent);
		color: var(--pn-ink-dim);
	}
</style>
