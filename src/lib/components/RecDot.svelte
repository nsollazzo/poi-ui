<script lang="ts">
	interface Props {
		/** Accessible label for the indicator. */
		label?: string;
	}

	let { label = 'Recording' }: Props = $props();
</script>

<span class="poi-rec" role="img" aria-label={label}></span>

<style>
	.poi-rec {
		display: inline-block;
		width: 0.75rem;
		height: 0.75rem;
		border-radius: 50%;
		background: var(--poi-accent);
		box-shadow: var(--poi-emphasis-shadow);
		animation: poi-rec-pulse var(--poi-dur-pulse) var(--poi-ease) infinite;
	}

	@keyframes poi-rec-pulse {
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
		.poi-rec {
			animation: none;
		}
	}
</style>
