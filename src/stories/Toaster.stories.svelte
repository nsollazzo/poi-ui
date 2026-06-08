<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { ThemeProvider, Toaster, Button, toast } from '$lib/index.js';

	const { Story } = defineMeta({
		title: 'Components/Toaster',
		tags: ['autodocs']
	});
</script>

{#snippet demo()}
	<div style="padding: 1.5rem; display: flex; gap: 0.75rem; flex-wrap: wrap;">
		<Button onclick={() => toast('Target acquired', { level: 'success' })}>Success</Button>
		<Button onclick={() => toast('System relevance updated', { level: 'info' })}>Info</Button>
		<Button onclick={() => toast('Anomaly detected', { level: 'warning' })}>Warning</Button>
		<Button tone="threat" onclick={() => toast('Threat detected', { level: 'error' })}>Error</Button
		>
	</div>
	<Toaster />
{/snippet}

<Story name="The Machine" asChild>
	<ThemeProvider theme="machine">{@render demo()}</ThemeProvider>
</Story>

<Story name="Samaritan" asChild>
	<ThemeProvider theme="samaritan">{@render demo()}</ThemeProvider>
</Story>
