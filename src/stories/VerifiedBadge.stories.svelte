<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { ThemeProvider, VerifiedBadge } from '$lib/index.js';

	const { Story } = defineMeta({
		title: 'Components/VerifiedBadge',
		component: VerifiedBadge,
		tags: ['autodocs']
	});
</script>

{#snippet seals()}
	<div style="display: flex; gap: 1.5rem; align-items: center; padding: 1.5rem; font-size: 1.5rem;">
		<VerifiedBadge tier="official" />
		<VerifiedBadge tier="verified" />
		<VerifiedBadge tier="official" label="First-party author" />
	</div>
{/snippet}

<Story name="The Machine" asChild>
	<ThemeProvider theme="machine">{@render seals()}</ThemeProvider>
</Story>

<Story name="Samaritan" asChild>
	<ThemeProvider theme="samaritan">{@render seals()}</ThemeProvider>
</Story>
