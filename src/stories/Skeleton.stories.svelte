<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { ThemeProvider, Skeleton } from '$lib/index.js';

	const { Story } = defineMeta({
		title: 'Components/Skeleton',
		tags: ['autodocs']
	});
</script>

{#snippet demo()}
	<div style="display: grid; gap: 0.75rem; width: 360px; padding: 1.5rem;">
		<Skeleton class="sk-title" />
		<Skeleton class="sk-line" />
		<Skeleton class="sk-line" />
		<Skeleton class="sk-line short" />
	</div>
	<style>
		.sk-title {
			height: 1.5rem;
			width: 60%;
		}
		.sk-line {
			height: 0.875rem;
			width: 100%;
		}
		.sk-line.short {
			width: 40%;
		}
	</style>
{/snippet}

<Story name="The Machine" asChild>
	<ThemeProvider theme="machine">{@render demo()}</ThemeProvider>
</Story>

<Story name="Samaritan" asChild>
	<ThemeProvider theme="samaritan">{@render demo()}</ThemeProvider>
</Story>
