<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { ThemeProvider, RecDot, ProgressBar, Button, StatusRow } from '$lib/index.js';

	const { Story } = defineMeta({
		title: 'Components/Indicators',
		tags: ['autodocs']
	});
</script>

{#snippet indicators()}
	<div style="display: grid; gap: 1.5rem; width: 360px; padding: 1.5rem;">
		<StatusRow label="Recording">
			<RecDot label="Recording" />
		</StatusRow>
		<ProgressBar value={68} label="Acquiring target" />
		<ProgressBar value={32} size="lg" label="System relevance" />
		<div style="display: flex; gap: 0.75rem;">
			<Button>Acquire</Button>
			<Button tone="threat">Engage</Button>
			<Button disabled>Offline</Button>
		</div>
	</div>
{/snippet}

<Story name="The Machine" asChild>
	<ThemeProvider theme="machine">{@render indicators()}</ThemeProvider>
</Story>

<Story name="Samaritan" asChild>
	<ThemeProvider theme="samaritan">{@render indicators()}</ThemeProvider>
</Story>
