<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { ThemeProvider, Terminal, Banner, Loading } from '$lib/index.js';

	const { Story } = defineMeta({
		title: 'Components/Effects',
		tags: ['autodocs']
	});
</script>

{#snippet effects()}
	<div style="display: grid; gap: 1.5rem; width: 420px; padding: 1.5rem;">
		<Banner text="Threat detected" />
		<Terminal prompt="root@samaritan:~#">access --override</Terminal>
		<Terminal prompt="$"
			>curl https://positronick.com/api/souls/socratic-tutor.md > ~/.hermes/SOUL.md</Terminal
		>
		<Loading label="Acquiring target" />
	</div>
{/snippet}

<Story name="The Machine" asChild>
	<ThemeProvider theme="machine">{@render effects()}</ThemeProvider>
</Story>

<Story name="Samaritan" asChild>
	<ThemeProvider theme="samaritan">{@render effects()}</ThemeProvider>
</Story>
