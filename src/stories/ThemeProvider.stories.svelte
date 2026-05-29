<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { ThemeProvider } from '$lib/index.js';

	const { Story } = defineMeta({
		title: 'Theme/ThemeProvider',
		component: ThemeProvider,
		tags: ['autodocs'],
		parameters: { layout: 'fullscreen' },
		argTypes: {
			theme: {
				control: 'inline-radio',
				options: ['machine', 'samaritan'],
				description: 'Active theme'
			}
		},
		args: { theme: 'machine' }
	});
</script>

{#snippet demo()}
	<div style="padding: 2rem; min-height: 220px;">
		<h2
			style="margin: 0 0 1rem; text-transform: uppercase; letter-spacing: var(--poi-tracking-display);"
		>
			POI-UI
		</h2>
		<p style="font-family: var(--poi-font-mono); color: var(--poi-ink-dim); margin: 0;">
			The same component set, re-skinned by a single data-theme attribute.
		</p>
	</div>
{/snippet}

<Story name="The Machine" args={{ theme: 'machine' }}>
	{@render demo()}
</Story>

<Story name="Samaritan" args={{ theme: 'samaritan' }}>
	{@render demo()}
</Story>

<Story name="Playground">
	{@render demo()}
</Story>
