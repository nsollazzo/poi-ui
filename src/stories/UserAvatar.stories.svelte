<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { ThemeProvider, UserAvatar } from '$lib/index.js';

	const { Story } = defineMeta({
		title: 'Components/UserAvatar',
		component: UserAvatar,
		tags: ['autodocs']
	});

	const withImage = { name: 'Harold Finch', image: 'https://i.pravatar.cc/128?img=12' };
</script>

{#snippet avatars()}
	<div style="display: flex; gap: 1rem; align-items: center; padding: 1.5rem;">
		<!-- Image avatars across a few sizes. -->
		<UserAvatar user={withImage} size={32} />
		<UserAvatar user={withImage} size={44} />
		<UserAvatar user={withImage} size={64} />
		<!-- Monogram fallbacks: first initial, then the "?" no-name case. -->
		<UserAvatar user={{ name: 'Root' }} size={44} />
		<UserAvatar user={{ name: 'Sameen Shaw' }} size={64} />
		<UserAvatar user={{}} size={44} />
	</div>
{/snippet}

<Story name="The Machine" asChild>
	<ThemeProvider theme="machine">{@render avatars()}</ThemeProvider>
</Story>

<Story name="Samaritan" asChild>
	<ThemeProvider theme="samaritan">{@render avatars()}</ThemeProvider>
</Story>
