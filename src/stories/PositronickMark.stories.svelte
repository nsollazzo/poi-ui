<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { ThemeProvider, PositronickMark } from '$lib/index.js';

	const { Story } = defineMeta({
		title: 'Components/PositronickMark',
		component: PositronickMark,
		tags: ['autodocs']
	});
</script>

{#snippet marks()}
	<div style="display: flex; align-items: center; gap: 1.5rem; padding: 1.5rem;">
		<PositronickMark />
		<PositronickMark size={48} />
		<PositronickMark size={64} />
		<!-- mono renders the whole mark in currentColor; tint via the surrounding color. -->
		<span style="color: var(--pn-ink-dim);"><PositronickMark mono size={48} /></span>
	</div>
{/snippet}

<Story name="The Machine" asChild>
	<ThemeProvider theme="machine">{@render marks()}</ThemeProvider>
</Story>

<Story name="Samaritan" asChild>
	<ThemeProvider theme="samaritan">{@render marks()}</ThemeProvider>
</Story>
