<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { ThemeProvider, Backdrop, Lightning } from '$lib/index.js';

	const { Story } = defineMeta({
		title: 'Components/Lightning',
		component: Lightning,
		tags: ['autodocs']
	});
</script>

{#snippet page(blurb: string)}
	<div style="padding: 3rem; max-width: 42rem; font-family: var(--poi-font-mono);">
		<h1
			style="font-family: var(--poi-font-display); letter-spacing: var(--poi-tracking-display); margin: 0 0 1rem;"
		>
			LIGHTNING
		</h1>
		<p style="margin: 0; line-height: 1.6;">{blurb}</p>
	</div>
{/snippet}

<!-- Strikes are occasional — wait a few seconds, or use the Dramatic story to see one fast. -->
<Story name="The Machine" asChild>
	<ThemeProvider theme="machine">
		<Backdrop lightning>
			{@render page('Red lightning on black — a bolt cracks down and the sky washes red.')}
		</Backdrop>
	</ThemeProvider>
</Story>

<Story name="Samaritan" asChild>
	<ThemeProvider theme="samaritan">
		<Backdrop lightning>
			{@render page('The same red lightning on white — red is the one shared accent.')}
		</Backdrop>
	</ThemeProvider>
</Story>

<Story name="Dramatic" asChild>
	<ThemeProvider theme="machine">
		<Backdrop lightning={{ intensity: 'dramatic' }}>
			{@render page('Brighter, more frequent strikes.')}
		</Backdrop>
	</ThemeProvider>
</Story>

<!-- The full storm: monochrome rain + red lightning together. -->
<Story name="Storm" asChild>
	<ThemeProvider theme="machine">
		<Backdrop rain lightning={{ intensity: 'dramatic' }}>
			{@render page('The full storm — monochrome rain behind the grid, red lightning above it.')}
		</Backdrop>
	</ThemeProvider>
</Story>
