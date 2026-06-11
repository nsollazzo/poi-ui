<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { ThemeProvider, SortControl, type SortDir } from '$lib/index.js';

	const { Story } = defineMeta({
		title: 'Components/SortControl',
		tags: ['autodocs']
	});

	const fields = [
		{ value: 'name', label: 'Name' },
		{ value: 'date', label: 'Date', defaultDir: 'desc' as SortDir },
		{ value: 'threat', label: 'Threat', defaultDir: 'desc' as SortDir }
	];
</script>

<script lang="ts">
	let field = $state('date');
	let dir = $state<SortDir>('desc');
</script>

{#snippet demo()}
	<div style="padding: 1.5rem;">
		<SortControl bind:field bind:dir {fields} label="Sort" ariaLabel="Sort subjects" />
	</div>
{/snippet}

<Story name="The Machine" asChild>
	<ThemeProvider theme="machine">{@render demo()}</ThemeProvider>
</Story>

<Story name="Samaritan" asChild>
	<ThemeProvider theme="samaritan">{@render demo()}</ThemeProvider>
</Story>
