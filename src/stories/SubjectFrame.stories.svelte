<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { ThemeProvider, SubjectFrame, StatusRow } from '$lib/index.js';

	const { Story } = defineMeta({
		title: 'Components/SubjectFrame',
		component: SubjectFrame,
		tags: ['autodocs']
	});
</script>

{#snippet dossier()}
	<div style="width: 360px; padding: 2.5rem;">
		<SubjectFrame designation="Primary Asset" tone="asset">
			<StatusRow label="Name" value="John Reese" />
			<StatusRow label="Status" value="ACTIVE" />
			<StatusRow label="Relevance" value="HIGH" accent />
		</SubjectFrame>
	</div>
{/snippet}

<Story name="The Machine" asChild>
	<ThemeProvider theme="machine">{@render dossier()}</ThemeProvider>
</Story>

<Story name="Samaritan" asChild>
	<ThemeProvider theme="samaritan">{@render dossier()}</ThemeProvider>
</Story>
