<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { ThemeProvider, SegmentedControl } from '$lib/index.js';

	const { Story } = defineMeta({
		title: 'Components/SegmentedControl',
		tags: ['autodocs']
	});

	const sorts = [
		{ value: 'name', label: 'A–Z' },
		{ value: 'newest', label: 'Newest' },
		{ value: 'downloads', label: 'Popular' }
	];
</script>

<script lang="ts">
	let machineValue = $state('name');
	let samaritanValue = $state('newest');
</script>

<Story name="The Machine" asChild>
	<ThemeProvider theme="machine">
		<div style="padding: 1.5rem;">
			<SegmentedControl
				bind:value={machineValue}
				options={sorts}
				label="Sort"
				ariaLabel="Sort order"
			/>
		</div>
	</ThemeProvider>
</Story>

<Story name="Samaritan" asChild>
	<ThemeProvider theme="samaritan">
		<div style="padding: 1.5rem;">
			<SegmentedControl
				bind:value={samaritanValue}
				options={sorts}
				label="Sort"
				ariaLabel="Sort order"
			/>
		</div>
	</ThemeProvider>
</Story>
