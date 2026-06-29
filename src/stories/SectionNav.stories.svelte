<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { ThemeProvider, SectionNav } from '$lib/index.js';

	const { Story } = defineMeta({
		title: 'Components/SectionNav',
		component: SectionNav,
		tags: ['autodocs']
	});

	const items = [
		{ href: '/docs', label: 'Overview' },
		{ href: '/docs/install', label: 'Install' },
		{ href: '/docs/theming', label: 'Theming' },
		{ href: '/docs/components', label: 'Components' },
		{ href: '/docs/changelog', label: 'Changelog' }
	];
</script>

<!-- A horizontal scroll-row below 768px, a sticky vertical sidebar at/above it. Resize the preview
	 to see the layout switch. `current` drives the active item; pass `isActive` for prefix matching. -->
{#snippet nav()}
	<div style="padding: 1.5rem; max-width: 16rem;">
		<SectionNav {items} current="/docs/theming" label="Documentation sections" />
	</div>
{/snippet}

<Story name="The Machine" asChild>
	<ThemeProvider theme="machine">{@render nav()}</ThemeProvider>
</Story>

<Story name="Samaritan" asChild>
	<ThemeProvider theme="samaritan">{@render nav()}</ThemeProvider>
</Story>
