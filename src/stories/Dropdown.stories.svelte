<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { ThemeProvider, Dropdown } from '$lib/index.js';

	const { Story } = defineMeta({
		title: 'Components/Dropdown',
		tags: ['autodocs']
	});

	const frameworks = [
		{ value: 'svelte', label: 'Svelte' },
		{ value: 'react', label: 'React' },
		{ value: 'vue', label: 'Vue' }
	];
</script>

<script lang="ts">
	let machineValue = $state<string | null>('svelte');
	let samaritanValue = $state<string | null>(null);
</script>

<Story name="The Machine" asChild>
	<ThemeProvider theme="machine">
		<div style="padding: 1.5rem; min-height: 12rem;">
			<Dropdown bind:value={machineValue} options={frameworks} label="Framework" />
		</div>
	</ThemeProvider>
</Story>

<Story name="Samaritan" asChild>
	<ThemeProvider theme="samaritan">
		<div style="padding: 1.5rem; min-height: 12rem;">
			<Dropdown bind:value={samaritanValue} options={frameworks} label="Framework" />
		</div>
	</ThemeProvider>
</Story>
