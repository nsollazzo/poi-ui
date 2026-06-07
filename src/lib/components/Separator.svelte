<script lang="ts">
	interface Props {
		/** Divider axis. */
		orientation?: 'horizontal' | 'vertical';
		/** Extra class(es) forwarded to the element. */
		class?: string;
	}

	let { orientation = 'horizontal', class: className = '' }: Props = $props();
</script>

<div
	class="poi-separator {className}"
	role="separator"
	aria-orientation={orientation}
	data-orientation={orientation}
></div>

<style>
	.poi-separator {
		flex-shrink: 0;
		border: 0;
		background: var(--poi-line);
	}
	.poi-separator[data-orientation='horizontal'] {
		width: 100%;
		height: var(--poi-hairline-width);
	}
	.poi-separator[data-orientation='vertical'] {
		align-self: stretch;
		width: var(--poi-hairline-width);
		height: 100%;
	}
</style>
