<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { ThemeProvider, StatusRow } from '$lib/index.js';

	const { Story } = defineMeta({
		title: 'Components/StatusRow',
		component: StatusRow,
		tags: ['autodocs']
	});
</script>

{#snippet rows()}
	<div style="width: 340px; padding: 1.5rem;">
		<StatusRow label="Designation" value="PRIMARY ASSET" />
		<StatusRow label="Location" value="NYC · 40.71, -74.01" />
		<StatusRow label="Last seen" value="00:00:14 AGO" />
		<StatusRow label="Threat" value="DETECTED" accent />
	</div>
{/snippet}

<Story name="The Machine" asChild>
	<ThemeProvider theme="machine">{@render rows()}</ThemeProvider>
</Story>

<Story name="Samaritan" asChild>
	<ThemeProvider theme="samaritan">{@render rows()}</ThemeProvider>
</Story>
