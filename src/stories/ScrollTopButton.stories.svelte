<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { ThemeProvider, ScrollTopButton } from '$lib/index.js';

	const { Story } = defineMeta({
		title: 'Components/ScrollTopButton',
		component: ScrollTopButton,
		tags: ['autodocs']
	});
</script>

{#snippet scroller()}
	<!-- A tall, scrollable <main> so reviewers can scroll and watch the button reveal.
	     tabindex + aria-label keep the scroll region keyboard-accessible, which axe's
	     scrollable-region-focusable rule requires; Svelte's noninteractive-tabindex lint
	     doesn't know the region scrolls, so suppress it here. -->
	<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
	<main
		tabindex="0"
		aria-label="Demo scroll region"
		style="height: 360px; overflow-y: auto; border: 1px solid var(--pn-line); border-radius: var(--pn-radius); background: var(--pn-surface-base); color: var(--pn-ink);"
	>
		<div style="display: grid; gap: var(--pn-space-4); padding: var(--pn-space-5);">
			<p style="font-family: var(--pn-font-display);">Scroll this panel to reveal the button.</p>
			{#each Array.from({ length: 24 }, (_, i) => i) as n (n)}
				<p>
					Surveillance log entry {n + 1}: the system observes, correlates, and predicts. Keep
					scrolling — the back-to-top control fades in once you pass the threshold.
				</p>
			{/each}
		</div>
		<ScrollTopButton threshold={150} />
	</main>
{/snippet}

<Story name="The Machine" asChild>
	<ThemeProvider theme="machine">{@render scroller()}</ThemeProvider>
</Story>

<Story name="Samaritan" asChild>
	<ThemeProvider theme="samaritan">{@render scroller()}</ThemeProvider>
</Story>
