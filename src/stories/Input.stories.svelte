<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { ThemeProvider, Input } from '$lib/index.js';

	const { Story } = defineMeta({
		title: 'Components/Input',
		tags: ['autodocs']
	});
</script>

{#snippet demo()}
	<div style="display: grid; gap: 1rem; width: 360px; padding: 1.5rem;">
		<Input aria-label="Designation" placeholder="Enter designation" />
		<Input aria-label="Locked field" value="POI-2187" disabled />
		<Input aria-label="Invalid field" value="bad input" aria-invalid={true} />
	</div>
{/snippet}

<Story name="The Machine" asChild>
	<ThemeProvider theme="machine">{@render demo()}</ThemeProvider>
</Story>

<Story name="Samaritan" asChild>
	<ThemeProvider theme="samaritan">{@render demo()}</ThemeProvider>
</Story>
