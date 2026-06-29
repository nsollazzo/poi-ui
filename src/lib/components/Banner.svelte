<script lang="ts">
	import { reducedMotion } from '../actions/reducedMotion.js';

	interface Props {
		/** The banner text, revealed word by word (the show's "samaritanWrite" effect). */
		text: string;
		/** Milliseconds between words. */
		speed?: number;
		/** Paint a solid surface-base fill so the banner reads cleanly over the <Backdrop> grid. */
		solid?: boolean;
	}

	let { text, speed = 500, solid = false }: Props = $props();

	const words = $derived(text.split(' '));
	let shown = $state(0);

	$effect(() => {
		// Reduced motion: reveal everything at once, no timers.
		if (reducedMotion.current) {
			shown = words.length;
			return;
		}
		shown = 0;
		let i = 0;
		const id = setInterval(() => {
			i += 1;
			shown = i;
			if (i >= words.length) clearInterval(id);
		}, speed);
		return () => clearInterval(id);
	});
</script>

<p class="pn-banner" data-solid={solid || undefined}>
	<!-- Full text for assistive tech; the animated words are decorative. -->
	<span class="pn-sr-only">{text}</span>
	<span aria-hidden="true">
		{#each words as word, i (i)}<span class="pn-banner__word" class:visible={i < shown}
				>{word + ' '}</span
			>{/each}
	</span>
</p>

<style>
	.pn-banner {
		margin: 0;
		padding: var(--pn-space-3) var(--pn-space-4);
		border-bottom: var(--pn-hairline-width) solid var(--pn-line);
		color: var(--pn-ink);
		font-family: var(--pn-font-display);
		font-size: var(--pn-font-size-4);
		text-align: center;
		text-transform: uppercase;
		letter-spacing: var(--pn-tracking-display);
	}

	.pn-banner__word {
		opacity: 0;
		transition: opacity var(--pn-dur-fade) var(--pn-ease);
	}
	.pn-banner__word.visible {
		opacity: 1;
	}

	.pn-sr-only {
		position: absolute;
		width: 1px;
		height: 1px;
		margin: -1px;
		padding: 0;
		overflow: hidden;
		clip: rect(0 0 0 0);
		white-space: nowrap;
		border: 0;
	}

	@media (prefers-reduced-motion: reduce) {
		.pn-banner__word {
			opacity: 1;
			transition: none;
		}
	}
</style>
