<script lang="ts">
	// Test-only harness: renders a component inside a <ThemeProvider> so its
	// theme tokens resolve. Lives outside src/lib so it is never packaged.
	import type { Component } from 'svelte';
	import { ThemeProvider, type PositronickTheme } from '$lib/index.js';

	interface Props {
		theme?: PositronickTheme;
		// Any component under test.
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		Comp: Component<any>;
		componentProps?: Record<string, unknown>;
	}

	let { theme = 'machine', Comp, componentProps = {} }: Props = $props();
</script>

<ThemeProvider {theme}>
	<Comp {...componentProps} />
</ThemeProvider>
