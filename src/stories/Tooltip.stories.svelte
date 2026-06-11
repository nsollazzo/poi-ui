<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { ThemeProvider, Tooltip, Button } from '$lib/index.js';

	const { Story } = defineMeta({
		title: 'Components/Tooltip',
		tags: ['autodocs']
	});
</script>

{#snippet demo()}
	<div style="display: flex; gap: 2rem; padding: 3rem; justify-content: center;">
		<Tooltip text="Acquire target" side="top">
			<Button>Top</Button>
		</Tooltip>
		<Tooltip text="System relevance" side="bottom">
			<Button>Bottom</Button>
		</Tooltip>
		<Tooltip text="Threat detected" side="right">
			<Button tone="threat">Right</Button>
		</Tooltip>
	</div>
{/snippet}

<Story name="The Machine" asChild>
	<ThemeProvider theme="machine">{@render demo()}</ThemeProvider>
</Story>

<Story name="Samaritan" asChild>
	<ThemeProvider theme="samaritan">{@render demo()}</ThemeProvider>
</Story>

<!-- By default the bubble inverts to the opposite theme polarity; invert={false}
     keeps it in the surrounding theme. -->
<Story name="Matching theme (invert false)" asChild>
	<ThemeProvider theme="samaritan">
		<div style="display: flex; gap: 2rem; padding: 3rem; justify-content: center;">
			<Tooltip text="Acquire target" side="top" invert={false}>
				<Button>Top</Button>
			</Tooltip>
			<Tooltip text="System relevance" side="bottom" invert={false}>
				<Button>Bottom</Button>
			</Tooltip>
		</div>
	</ThemeProvider>
</Story>
