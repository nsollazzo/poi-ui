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
	// clobbering `pn-input`. Accessible name (aria-label / aria-labelledby) and
	// validity (aria-invalid) flow through {...rest}.
	let { value = $bindable(''), class: className = '', ...rest }: Props = $props();
</script>

<input class="pn-input {className}" {...rest} bind:value />

<style>
	.pn-input {
		width: 100%;
		padding: var(--pn-space-2) var(--pn-space-3);
		background: var(--pn-surface-1);
		color: var(--pn-ink);
		border: var(--pn-hairline-width) solid var(--pn-line);
		border-radius: var(--pn-radius);
		font-family: var(--pn-font-mono);
		font-size: var(--pn-font-size-2);
		outline: none;
		transition:
			border-color 0.15s var(--pn-ease),
			box-shadow 0.15s var(--pn-ease);
	}

	.pn-input::placeholder {
		color: var(--pn-ink-dim);
	}

	.pn-input:focus-visible {
		border-color: var(--pn-accent);
		box-shadow: var(--pn-focus-ring);
	}

	/* Invalid reads as the threat/red state (red in both themes). */
	.pn-input[aria-invalid='true'] {
		border-color: var(--pn-accent);
	}

	.pn-input:disabled {
		opacity: 0.4;
		cursor: not-allowed;
	}

	@media (prefers-reduced-motion: reduce) {
		.pn-input {
			transition: none;
		}
	}
</style>
