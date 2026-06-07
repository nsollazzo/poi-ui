<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { ThemeProvider, Separator } from '$lib/index.js';

	const { Story } = defineMeta({
		title: 'Components/Separator',
		tags: ['autodocs']
	});
</script>

{#snippet demo()}
	<div style="display: grid; gap: 1rem; width: 360px; padding: 1.5rem;">
		<span>Above the line</span>
		<Separator />
		<span>Below the line</span>
		<div style="display: flex; align-items: center; gap: 1rem; height: 2rem;">
			<span>Left</span>
			<Separator orientation="vertical" />
			<span>Right</span>
		</div>
	</div>
{/snippet}

<Story name="The Machine" asChild>
	<ThemeProvider theme="machine">{@render demo()}</ThemeProvider>
</Story>

<Story name="Samaritan" asChild>
	<ThemeProvider theme="samaritan">{@render demo()}</ThemeProvider>
</Story>
