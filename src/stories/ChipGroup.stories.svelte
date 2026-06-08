<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { ThemeProvider, ChipGroup } from '$lib/index.js';

	const { Story } = defineMeta({
		title: 'Components/ChipGroup',
		tags: ['autodocs']
	});

	const categories = [
		{ value: 'agent', label: 'Agent' },
		{ value: 'tool', label: 'Tool' },
		{ value: 'prompt', label: 'Prompt' }
	];
</script>

<script lang="ts">
	let machineValue = $state<string | null>('agent');
	let samaritanValue = $state<string | null>(null);
</script>

<Story name="The Machine" asChild>
	<ThemeProvider theme="machine">
		<div style="padding: 1.5rem;">
			<ChipGroup
				bind:value={machineValue}
				options={categories}
				allLabel="All"
				ariaLabel="Filter by category"
			/>
		</div>
	</ThemeProvider>
</Story>

<Story name="Samaritan" asChild>
	<ThemeProvider theme="samaritan">
		<div style="padding: 1.5rem;">
			<ChipGroup
				bind:value={samaritanValue}
				options={categories}
				allLabel="All"
				ariaLabel="Filter by category"
			/>
		</div>
	</ThemeProvider>
</Story>
