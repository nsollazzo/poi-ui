<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { ThemeProvider, Block, Card, Box, StatusRow } from '$lib/index.js';

	const { Story } = defineMeta({
		title: 'Components/Containers',
		tags: ['autodocs']
	});
</script>

{#snippet containers()}
	<div style="display: grid; gap: 1.5rem; width: 360px; padding: 1.5rem;">
		<Block title="Block">
			<StatusRow label="Density" value="ROOMY" />
		</Block>
		<Card title="Card">
			<StatusRow label="Density" value="MEDIUM" />
		</Card>
		<Box title="Box" tone="threat">
			<StatusRow label="Density" value="TIGHT" accent />
		</Box>
	</div>
{/snippet}

<Story name="The Machine" asChild>
	<ThemeProvider theme="machine">{@render containers()}</ThemeProvider>
</Story>

<Story name="Samaritan" asChild>
	<ThemeProvider theme="samaritan">{@render containers()}</ThemeProvider>
</Story>
