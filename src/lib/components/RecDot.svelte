<script lang="ts">
	interface Props {
		/** Accessible label for the indicator. */
		label?: string;
	}

	let { label = 'Recording' }: Props = $props();
</script>

<span class="pn-rec" role="img" aria-label={label}></span>

<style>
	.pn-rec {
		display: inline-block;
		width: 0.75rem;
		height: 0.75rem;
		border-radius: 50%;
		background: var(--pn-accent);
		box-shadow: var(--pn-emphasis-shadow);
		animation: pn-rec-pulse var(--pn-dur-pulse) var(--pn-ease) infinite;
	}

	@keyframes pn-rec-pulse {
		0%,
		100% {
			opacity: 1;
		}
		50% {
			opacity: 0.3;
		}
	}

	/* No infinite pulse when the user prefers reduced motion. */
	@media (prefers-reduced-motion: reduce) {
		.pn-rec {
			animation: none;
		}
	}
</style>
