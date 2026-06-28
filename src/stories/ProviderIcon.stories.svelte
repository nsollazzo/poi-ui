<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { ThemeProvider, ProviderIcon } from '$lib/index.js';

	const { Story } = defineMeta({
		title: 'Components/ProviderIcon',
		component: ProviderIcon,
		tags: ['autodocs']
	});
</script>

{#snippet icons()}
	<div style="display: flex; gap: 1.25rem; align-items: center; padding: 1.5rem;">
		<ProviderIcon provider="github" size={28} />
		<ProviderIcon provider="google" size={28} />
		<ProviderIcon provider="twitter" size={28} />
		<ProviderIcon provider="apple" size={28} />
	</div>
{/snippet}

<Story name="The Machine" asChild>
	<ThemeProvider theme="machine">{@render icons()}</ThemeProvider>
</Story>

<Story name="Samaritan" asChild>
	<ThemeProvider theme="samaritan">{@render icons()}</ThemeProvider>
</Story>
