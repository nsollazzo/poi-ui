<script lang="ts">
	import type { HTMLInputAttributes } from 'svelte/elements';

	// Inline interface (never `export interface` in a .svelte file). Extending the
	// native attributes lets every input prop (type, placeholder, aria-*, etc.)
	// pass straight through via {...rest}.
	interface Props extends HTMLInputAttributes {
		/** Current value (two-way bindable). For text-like inputs; checkbox/radio
		 *  (use bind:checked) and file (read-only) are not supported by this primitive. */
		value?: string;
		/** Extra class(es) forwarded to the element. */
		class?: string;
	}

	// `class` is pulled out of rest so a consumer's class extends ours instead of
	// clobbering `poi-input`. Accessible name (aria-label / aria-labelledby) and
	// validity (aria-invalid) flow through {...rest}.
	let { value = $bindable(''), class: className = '', ...rest }: Props = $props();
</script>

<input class="poi-input {className}" {...rest} bind:value />

<style>
	.poi-input {
		width: 100%;
		padding: var(--poi-space-2) var(--poi-space-3);
		background: var(--poi-surface-1);
		color: var(--poi-ink);
		border: var(--poi-hairline-width) solid var(--poi-line);
		border-radius: var(--poi-radius);
		font-family: var(--poi-font-mono);
		font-size: var(--poi-font-size-2);
		outline: none;
		transition:
			border-color 0.15s var(--poi-ease),
			box-shadow 0.15s var(--poi-ease);
	}

	.poi-input::placeholder {
		color: var(--poi-ink-dim);
	}

	.poi-input:focus-visible {
		border-color: var(--poi-accent);
		box-shadow: var(--poi-focus-ring);
	}

	/* Invalid reads as the threat/red state (red in both themes). */
	.poi-input[aria-invalid='true'] {
		border-color: var(--poi-accent);
	}

	.poi-input:disabled {
		opacity: 0.4;
		cursor: not-allowed;
	}

	@media (prefers-reduced-motion: reduce) {
		.poi-input {
			transition: none;
		}
	}
</style>
