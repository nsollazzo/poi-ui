<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { ThemeProvider, ThemeToggle } from '$lib/index.js';

	const { Story } = defineMeta({
		title: 'Components/ThemeToggle',
		component: ThemeToggle,
		tags: ['autodocs']
	});
</script>

{#snippet toggle()}
	<div style="display: flex; gap: 0.5rem; padding: 1.5rem;">
		<ThemeToggle />
	</div>
{/snippet}

<Story name="The Machine" asChild>
	<ThemeProvider theme="machine">{@render toggle()}</ThemeProvider>
</Story>

<Story name="Samaritan" asChild>
	<ThemeProvider theme="samaritan">{@render toggle()}</ThemeProvider>
</Story>
