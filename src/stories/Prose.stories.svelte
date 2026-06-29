<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { ThemeProvider, Prose } from '$lib/index.js';

	const { Story } = defineMeta({
		title: 'Components/Prose',
		component: Prose,
		tags: ['autodocs']
	});
</script>

<!-- Prose is a styling wrapper: it applies the design system's long-form typography to whatever
	 markup you pass as children. The library never calls {@html} — here we author the content as
	 plain Svelte markup; an app would render its own sanitized HTML inside the same wrapper. -->
{#snippet article()}
	<Prose>
		<h1>System Directive</h1>
		<p>
			The Machine observes, correlates, and predicts. This paragraph demonstrates body copy with
			<a href="#ref">an inline link</a> and a fragment of <code>inline()</code> code.
		</p>
		<h2>Operating Parameters</h2>
		<ul>
			<li>Relevant numbers only.</li>
			<li>No detail beyond what is asked.</li>
			<li>Both themes share one typographic scale.</li>
		</ul>
		<h3>Sample Transmission</h3>
		<pre><code>const verdict = relevant ? "act" : "observe";</code></pre>
		<blockquote>Can you hear me?</blockquote>
	</Prose>
{/snippet}

<Story name="The Machine" asChild>
	<ThemeProvider theme="machine">
		<div style="max-width: 42rem; padding: 1.5rem;">{@render article()}</div>
	</ThemeProvider>
</Story>

<Story name="Samaritan" asChild>
	<ThemeProvider theme="samaritan">
		<div style="max-width: 42rem; padding: 1.5rem;">{@render article()}</div>
	</ThemeProvider>
</Story>
