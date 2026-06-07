<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { ThemeProvider, Sheet, Button } from '$lib/index.js';

	const { Story } = defineMeta({
		title: 'Components/Sheet',
		tags: ['autodocs']
	});
</script>

<script lang="ts">
	let machineOpen = $state(false);
	let samaritanOpen = $state(false);
</script>

<Story name="The Machine" asChild>
	<ThemeProvider theme="machine">
		<div style="padding: 1.5rem;">
			<Button onclick={() => (machineOpen = true)}>Open panel</Button>
			<Sheet bind:open={machineOpen} side="right" title="System controls">
				<p style="margin: 0 0 1rem;">Relevance filters and overrides.</p>
				<Button onclick={() => (machineOpen = false)}>Close</Button>
			</Sheet>
		</div>
	</ThemeProvider>
</Story>

<Story name="Samaritan" asChild>
	<ThemeProvider theme="samaritan">
		<div style="padding: 1.5rem;">
			<Button onclick={() => (samaritanOpen = true)}>Open panel</Button>
			<Sheet bind:open={samaritanOpen} side="left" title="Directives">
				<p style="margin: 0 0 1rem;">Active directives and assets.</p>
				<Button onclick={() => (samaritanOpen = false)}>Close</Button>
			</Sheet>
		</div>
	</ThemeProvider>
</Story>
