<script lang="ts">
	interface Props {
		/** Accessible label announced while loading. */
		label?: string;
	}

	let { label = 'Loading' }: Props = $props();
</script>

<div class="poi-loading" role="status" aria-label={label}>
	<span class="poi-loading__cube" aria-hidden="true"></span>
</div>

<style>
	.poi-loading {
		display: inline-flex;
		perspective: 200px;
	}
	.poi-loading__cube {
		width: 2rem;
		height: 2rem;
		border: 2px solid var(--poi-accent);
		box-shadow: var(--poi-emphasis-shadow);
		animation: poi-loading var(--poi-dur-cube) var(--poi-ease) infinite;
	}

	@keyframes poi-loading {
		0% {
			transform: rotateX(0) rotateY(0);
		}
		25% {
			transform: rotateX(180deg) rotateY(0);
		}
		50% {
			transform: rotateX(180deg) rotateY(180deg);
		}
		100% {
			transform: rotateX(0) rotateY(360deg);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.poi-loading__cube {
			animation: none;
		}
	}
</style>
