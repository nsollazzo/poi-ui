<script lang="ts">
	import { useTheme, oppositeTheme, type PositronickTheme } from '../theme/context.js';
	import PositronickMark from './PositronickMark.svelte';

	interface Props {
		/**
		 * Called with the newly selected theme after a toggle. Lets a host persist an
		 * explicit choice (e.g. cookie + account) alongside the context-driven switch.
		 */
		onchange?: (theme: PositronickTheme) => void;
	}

	let { onchange }: Props = $props();

	// The theme itself is driven through the <ThemeProvider> context.
	const ctx = useTheme();
	const isDark = $derived(ctx.theme === 'machine');

	function flip() {
		const next = oppositeTheme(ctx.theme);
		ctx.setTheme(next);
		onchange?.(next);
	}
</script>

<button
	type="button"
	role="switch"
	aria-checked={isDark}
	aria-label="Dark mode"
	class="pn-theme-toggle"
	class:dark={isDark}
	onclick={flip}
>
	<!-- Track affordances: sun marks the light end, moon the dark end. -->
	<svg class="end sun" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
		<circle cx="12" cy="12" r="5" fill="currentColor" />
		<g stroke="currentColor" stroke-width="2" stroke-linecap="round">
			<line x1="12" y1="1" x2="12" y2="4" />
			<line x1="12" y1="20" x2="12" y2="23" />
			<line x1="1" y1="12" x2="4" y2="12" />
			<line x1="20" y1="12" x2="23" y2="12" />
			<line x1="4.2" y1="4.2" x2="6.3" y2="6.3" />
			<line x1="17.7" y1="17.7" x2="19.8" y2="19.8" />
			<line x1="4.2" y1="19.8" x2="6.3" y2="17.7" />
			<line x1="17.7" y1="6.3" x2="19.8" y2="4.2" />
		</g>
	</svg>
	<svg class="end moon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
		<path d="M21 12.8A9 9 0 1 1 11.2 3 7 7 0 0 0 21 12.8Z" fill="currentColor" />
	</svg>
	<!-- The Positronick mark is the knob; its `+` follows currentColor → near-black on the light
	     (samaritan) end, white on the dark (machine) end. -->
	<span class="thumb"><PositronickMark size={24} /></span>
</button>

<style>
	.pn-theme-toggle {
		--track-h: 30px;
		--pad: 3px;
		--thumb: 24px;
		--travel: 30px;
		position: relative;
		display: inline-flex;
		align-items: center;
		width: calc(var(--thumb) + var(--travel) + var(--pad) * 2);
		height: var(--track-h);
		padding: var(--pad);
		border: var(--pn-hairline-width) solid var(--pn-line);
		border-radius: 999px;
		background: var(--pn-surface-base);
		cursor: pointer;
		color: var(--pn-ink);
	}
	.pn-theme-toggle:focus-visible {
		outline: none;
		box-shadow: var(--pn-focus-ring);
	}

	/* End icons sit at the track edges, dimmed; the active end fades out under the thumb. */
	.end {
		position: absolute;
		width: 14px;
		height: 14px;
		top: 50%;
		transform: translateY(-50%);
		color: var(--pn-ink-dim);
		opacity: 0.55;
		transition: opacity 0.16s ease;
	}
	.sun {
		left: 7px;
	}
	.moon {
		right: 7px;
	}
	.pn-theme-toggle:not(.dark) .sun,
	.pn-theme-toggle.dark .moon {
		opacity: 0;
	}

	/* The mark is the knob; slide it across on toggle. */
	.thumb {
		display: inline-flex;
		width: var(--thumb);
		height: var(--thumb);
		align-items: center;
		justify-content: center;
		transform: translateX(0);
		transition: transform 0.18s ease;
	}
	.pn-theme-toggle.dark .thumb {
		transform: translateX(var(--travel));
	}
	@media (prefers-reduced-motion: reduce) {
		.thumb,
		.end {
			transition: none;
		}
	}
</style>
