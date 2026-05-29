<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { ThemeProvider, DesignationTag } from '$lib/index.js';

	const { Story } = defineMeta({
		title: 'Components/DesignationTag',
		component: DesignationTag,
		tags: ['autodocs']
	});
</script>

{#snippet tags()}
	<div style="display: flex; gap: 0.5rem; flex-wrap: wrap; padding: 1.5rem;">
		<DesignationTag label="Admin" />
		<DesignationTag label="Primary Asset" tone="asset" />
		<DesignationTag label="Threat" tone="threat" />
		<DesignationTag label="Irrelevant" />
	</div>
{/snippet}

<Story name="The Machine" asChild>
	<ThemeProvider theme="machine">{@render tags()}</ThemeProvider>
</Story>

<Story name="Samaritan" asChild>
	<ThemeProvider theme="samaritan">{@render tags()}</ThemeProvider>
</Story>
