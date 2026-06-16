<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { ThemeProvider, Dialog, Button } from '$lib/index.js';

	const { Story } = defineMeta({
		title: 'Components/Dialog',
		tags: ['autodocs']
	});
</script>

<script lang="ts">
	let machineOpen = $state(false);
	let samaritanOpen = $state(false);
	let matchingOpen = $state(false);
</script>

<Story name="The Machine" asChild>
	<ThemeProvider theme="machine">
		<div style="padding: 1.5rem;">
			<Button onclick={() => (machineOpen = true)}>Open dossier</Button>
			<Dialog bind:open={machineOpen} title="Subject dossier">
				<p style="margin: 0 0 1rem;">Designation: POI-2187. Status: under surveillance.</p>
				<Button onclick={() => (machineOpen = false)}>Acknowledge</Button>
			</Dialog>
		</div>
	</ThemeProvider>
</Story>

<Story name="Samaritan" asChild>
	<ThemeProvider theme="samaritan">
		<div style="padding: 1.5rem;">
			<Button onclick={() => (samaritanOpen = true)}>Open dossier</Button>
			<Dialog bind:open={samaritanOpen} title="Subject dossier">
				<p style="margin: 0 0 1rem;">Designation: POI-2187. Status: deviant.</p>
				<Button onclick={() => (samaritanOpen = false)}>Acknowledge</Button>
			</Dialog>
		</div>
	</ThemeProvider>
</Story>

<!-- By default a dialog inverts to the opposite theme polarity (the page's depth
     cue in a flat UI); invert={false} keeps it in the surrounding theme. -->
<Story name="Matching theme (invert false)" asChild>
	<ThemeProvider theme="samaritan">
		<div style="padding: 1.5rem;">
			<Button onclick={() => (matchingOpen = true)}>Open dossier</Button>
			<Dialog bind:open={matchingOpen} invert={false} title="Subject dossier">
				<p style="margin: 0 0 1rem;">Designation: POI-2187. Status: deviant.</p>
				<Button onclick={() => (matchingOpen = false)}>Acknowledge</Button>
			</Dialog>
		</div>
	</ThemeProvider>
</Story>
