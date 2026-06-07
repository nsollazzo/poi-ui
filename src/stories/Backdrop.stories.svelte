<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { ThemeProvider, Backdrop, StatusRow, DesignationTag } from '$lib/index.js';

	const { Story } = defineMeta({
		title: 'Components/Backdrop',
		component: Backdrop,
		tags: ['autodocs']
	});
</script>

{#snippet scene()}
	<div style="min-height: 480px; padding: 3rem;">
		<Backdrop>
			<div style="display: grid; gap: 1rem; width: 360px;">
				<DesignationTag label="New York, NY" />
				<StatusRow label="Grid" value="ACTIVE" />
				<StatusRow label="Map overlay" value="STANDBY" />
			</div>
		</Backdrop>
	</div>
{/snippet}

<Story name="The Machine" asChild>
	<ThemeProvider theme="machine">{@render scene()}</ThemeProvider>
</Story>

<Story name="Samaritan" asChild>
	<ThemeProvider theme="samaritan">{@render scene()}</ThemeProvider>
</Story>
