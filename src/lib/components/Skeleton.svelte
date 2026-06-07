<script lang="ts">
	interface Props {
		/** Extra class(es) forwarded to the element — set width/height here. */
		class?: string;
	}

	let { class: className = '' }: Props = $props();
</script>

<!-- Decorative placeholder; the loading state should be announced elsewhere (e.g. <Loading role="status">). -->
<div class="poi-skeleton {className}" aria-hidden="true"></div>

<style>
	.poi-skeleton {
		display: block;
		min-width: 1rem;
		min-height: 1rem;
		background: var(--poi-surface-2);
		animation: poi-skeleton-pulse var(--poi-dur-pulse) var(--poi-ease) infinite;
	}

	@keyframes poi-skeleton-pulse {
		0%,
		100% {
			opacity: 1;
		}
		50% {
			opacity: 0.5;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.poi-skeleton {
			animation: none;
		}
	}
</style>
