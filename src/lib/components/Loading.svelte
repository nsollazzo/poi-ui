<script lang="ts">
	interface Props {
		/** Accessible label announced while loading. */
		label?: string;
		/** Paint a solid surface-base fill so the loader reads cleanly over the <Backdrop> grid. */
		solid?: boolean;
	}

	let { label = 'Loading', solid = false }: Props = $props();
</script>

<div class="pn-loading" role="status" aria-label={label} data-solid={solid || undefined}>
	<span class="pn-loading__cube" aria-hidden="true"></span>
</div>

<style>
	.pn-loading {
		display: inline-flex;
		perspective: 200px;
	}
	.pn-loading__cube {
		width: 2rem;
		height: 2rem;
		border: 2px solid var(--pn-accent);
		box-shadow: var(--pn-emphasis-shadow);
		animation: pn-loading var(--pn-dur-cube) var(--pn-ease) infinite;
	}

	@keyframes pn-loading {
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
		.pn-loading__cube {
			animation: none;
		}
	}
</style>
