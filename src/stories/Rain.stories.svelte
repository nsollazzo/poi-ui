<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { ThemeProvider, Backdrop, Rain } from '$lib/index.js';

	const { Story } = defineMeta({
		title: 'Components/Rain',
		component: Rain,
		tags: ['autodocs']
	});
</script>

{#snippet page(blurb: string)}
	<div style="padding: 3rem; max-width: 42rem; font-family: var(--poi-font-mono);">
		<h1
			style="font-family: var(--poi-font-display); letter-spacing: var(--poi-tracking-display); margin: 0 0 1rem;"
		>
			RAIN
		</h1>
		<p style="margin: 0; line-height: 1.6;">{blurb}</p>
	</div>
{/snippet}

<Story name="The Machine" asChild>
	<ThemeProvider theme="machine">
		<Backdrop rain>
			{@render page('Monochrome white rain on black, falling behind the grid.')}
		</Backdrop>
	</ThemeProvider>
</Story>

<Story name="Samaritan" asChild>
	<ThemeProvider theme="samaritan">
		<Backdrop rain>
			{@render page('Monochrome black rain on white, falling behind the grid.')}
		</Backdrop>
	</ThemeProvider>
</Story>

<Story name="Downpour" asChild>
	<ThemeProvider theme="machine">
		<Backdrop rain={{ density: 'downpour' }}>
			{@render page('A heavy downpour.')}
		</Backdrop>
	</ThemeProvider>
</Story>
