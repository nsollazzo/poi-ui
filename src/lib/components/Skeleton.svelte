<script lang="ts">
	interface Props {
		/** Extra class(es) forwarded to the element — set width/height here. */
		class?: string;
	}

	let { class: className = '' }: Props = $props();
</script>

<!-- Decorative placeholder; the loading state should be announced elsewhere (e.g. <Loading role="status">). -->
<div class="pn-skeleton {className}" aria-hidden="true"></div>

<style>
	.pn-skeleton {
		display: block;
		background: var(--pn-surface-2);
		animation: pn-skeleton-pulse var(--pn-dur-pulse) var(--pn-ease) infinite;
	}

	/* Sensible default size so a bare <Skeleton /> is visible, but at zero
	   specificity (:where) so any consumer width/height set via `class` wins —
	   including sizes smaller than this default. */
	:where(.pn-skeleton) {
		width: 100%;
		height: 1rem;
	}

	@keyframes pn-skeleton-pulse {
		0%,
		100% {
			opacity: 1;
		}
		50% {
			opacity: 0.5;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.pn-skeleton {
			animation: none;
		}
	}
</style>
