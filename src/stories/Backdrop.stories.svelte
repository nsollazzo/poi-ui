<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { ThemeProvider, Backdrop, StatusRow, DesignationTag } from '$lib/index.js';

	const { Story } = defineMeta({
		title: 'Components/Backdrop',
		component: Backdrop,
		tags: ['autodocs'],
		// Render edge-to-edge: Backdrop is a page-level wrapper that fills the viewport.
		parameters: { layout: 'fullscreen' }
	});
</script>

{#snippet page()}
	<Backdrop>
		<div style="padding: 3rem; display: grid; gap: 1rem; max-width: 420px;">
			<DesignationTag label="New York, NY" />
			<StatusRow label="Grid" value="ACTIVE" />
			<StatusRow label="Map overlay" value="STANDBY" />
		</div>
	</Backdrop>
{/snippet}

<Story name="The Machine" asChild>
	<ThemeProvider theme="machine">{@render page()}</ThemeProvider>
</Story>

<Story name="Samaritan" asChild>
	<ThemeProvider theme="samaritan">{@render page()}</ThemeProvider>
</Story>
