<script lang="ts">
	interface Props {
		/** Divider axis. */
		orientation?: 'horizontal' | 'vertical';
		/** Extra class(es) forwarded to the element. */
		class?: string;
	}

	let { orientation = 'horizontal', class: className = '' }: Props = $props();
</script>

<div class="pn-separator {className}" role="separator" aria-orientation={orientation}></div>

<style>
	.pn-separator {
		flex-shrink: 0;
		border: 0;
		background: var(--pn-line);
	}
	.pn-separator[aria-orientation='horizontal'] {
		width: 100%;
		height: var(--pn-hairline-width);
	}
	.pn-separator[aria-orientation='vertical'] {
		align-self: stretch;
		width: var(--pn-hairline-width);
		height: 100%;
	}
</style>
