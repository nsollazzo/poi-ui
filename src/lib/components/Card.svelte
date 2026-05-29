<script lang="ts">
	import type { Snippet } from 'svelte';
	import Panel from './Panel.svelte';

	interface Props {
		/** Optional uppercase title bar. */
		title?: string;
		tone?: 'neutral' | 'threat' | 'asset';
		children: Snippet;
		footer?: Snippet;
	}

	let { title, tone, children, footer }: Props = $props();
</script>

<Panel density="card" {title} {tone} {footer}>{@render children()}</Panel>
