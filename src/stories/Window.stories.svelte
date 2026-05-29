<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { ThemeProvider, Window, StatusRow } from '$lib/index.js';

	const { Story } = defineMeta({
		title: 'Components/Window',
		component: Window,
		tags: ['autodocs']
	});
</script>

{#snippet win()}
	<div style="width: 380px; padding: 1.5rem;">
		<Window title="Surveillance Feed">
			<StatusRow label="Camera" value="42ND ST" />
			<StatusRow label="Status" value="LIVE" accent />
		</Window>
	</div>
{/snippet}

<Story name="The Machine" asChild>
	<ThemeProvider theme="machine">{@render win()}</ThemeProvider>
</Story>

<Story name="Samaritan" asChild>
	<ThemeProvider theme="samaritan">{@render win()}</ThemeProvider>
</Story>
