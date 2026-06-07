<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import {
		ThemeProvider,
		Backdrop,
		StatusRow,
		DesignationTag,
		Button,
		ProgressBar
	} from '$lib/index.js';

	const { Story } = defineMeta({
		title: 'Components/Backdrop',
		component: Backdrop,
		tags: ['autodocs'],
		// Render edge-to-edge: Backdrop is a page-level wrapper that fills the viewport.
		parameters: { layout: 'fullscreen' }
	});
</script>

{#snippet page()}
	<Backdrop>
		<div style="padding: 3rem; display: grid; gap: 1rem; max-width: 420px;">
			<DesignationTag label="New York, NY" />
			<StatusRow label="Grid" value="ACTIVE" />
			<StatusRow label="Map overlay" value="STANDBY" />
		</div>
	</Backdrop>
{/snippet}

<Story name="The Machine" asChild>
	<ThemeProvider theme="machine">{@render page()}</ThemeProvider>
</Story>

<Story name="Samaritan" asChild>
	<ThemeProvider theme="samaritan">{@render page()}</ThemeProvider>
</Story>

<!-- Left column lets the grid show through; right column opts into `solid` to cover it. -->
{#snippet solidDemo()}
	<Backdrop>
		<div style="padding: 3rem; display: flex; gap: 3rem; flex-wrap: wrap;">
			<div style="display: grid; gap: 1rem; width: 300px; align-content: start;">
				<DesignationTag label="Default — grid shows through" />
				<Button>Acquire</Button>
				<StatusRow label="Signal" value="WEAK" />
				<ProgressBar value={48} label="Default" />
			</div>
			<div style="display: grid; gap: 1rem; width: 300px; align-content: start;">
				<DesignationTag label="Solid — covers the grid" solid />
				<Button solid>Acquire</Button>
				<StatusRow label="Signal" value="STRONG" solid />
				<ProgressBar value={48} label="Solid" solid />
			</div>
		</div>
	</Backdrop>
{/snippet}

<Story name="Solid · The Machine" asChild>
	<ThemeProvider theme="machine">{@render solidDemo()}</ThemeProvider>
</Story>

<Story name="Solid · Samaritan" asChild>
	<ThemeProvider theme="samaritan">{@render solidDemo()}</ThemeProvider>
</Story>
