<script lang="ts">
	import '../styles/tokens.css';
	import type { Snippet } from 'svelte';
	import { setThemeContext, type PositronickTheme } from './context.js';

	interface Props {
		/** Active theme. Bindable, so callers can drive a theme switcher. */
		theme?: PositronickTheme;
		/** Content rendered inside the themed root. */
		children?: Snippet;
	}

	let { theme = $bindable('machine'), children }: Props = $props();

	setThemeContext({
		get theme() {
			return theme;
		},
		setTheme: (next: PositronickTheme) => {
			theme = next;
		}
	});
</script>

<div class="pn-root" data-theme={theme}>
	{@render children?.()}
</div>
