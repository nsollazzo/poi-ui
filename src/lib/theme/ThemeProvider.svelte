<script lang="ts">
	import '../styles/tokens.css';
	import type { Snippet } from 'svelte';
	import { setThemeContext, type PoiTheme } from './context.js';

	interface Props {
		/** Active theme. Bindable, so callers can drive a theme switcher. */
		theme?: PoiTheme;
		/** Content rendered inside the themed root. */
		children?: Snippet;
	}

	let { theme = $bindable('machine'), children }: Props = $props();

	setThemeContext({
		get theme() {
			return theme;
		},
		setTheme: (next: PoiTheme) => {
			theme = next;
		}
	});
</script>

<div class="poi-root" data-theme={theme}>
	{@render children?.()}
</div>
