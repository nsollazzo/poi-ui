<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { ThemeProvider, Chip } from '$lib/index.js';

	const { Story } = defineMeta({
		title: 'Components/Chip',
		tags: ['autodocs']
	});
</script>

<script lang="ts">
	let on = $state(true);
</script>

{#snippet demo()}
	<div style="display: flex; flex-wrap: wrap; gap: 0.5rem; padding: 1.5rem; align-items: center;">
		<Chip pressed={on} onclick={() => (on = !on)}>Toggle</Chip>
		<Chip pressed={false}>Inactive</Chip>
		<Chip href="#" current>Link / current</Chip>
		<Chip href="#">Link</Chip>
		<Chip hasPopup="menu" expanded={false}>Menu ▾</Chip>
		<!-- expanded without hasPopup: an honest disclosure trigger (popup of plain buttons) -->
		<Chip expanded={false} ariaControls="disclosure-popup">Disclosure ▾</Chip>
	</div>
{/snippet}

<Story name="The Machine" asChild>
	<ThemeProvider theme="machine">{@render demo()}</ThemeProvider>
</Story>

<Story name="Samaritan" asChild>
	<ThemeProvider theme="samaritan">{@render demo()}</ThemeProvider>
</Story>
