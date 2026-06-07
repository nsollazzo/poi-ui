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

<p class="poi-banner" data-solid={solid || undefined}>
	<!-- Full text for assistive tech; the animated words are decorative. -->
	<span class="poi-sr-only">{text}</span>
	<span aria-hidden="true">
		{#each words as word, i (i)}<span class="poi-banner__word" class:visible={i < shown}
				>{word + ' '}</span
			>{/each}
	</span>
</p>

<style>
	.poi-banner {
		margin: 0;
		padding: var(--poi-space-3) var(--poi-space-4);
		border-bottom: var(--poi-hairline-width) solid var(--poi-line);
		color: var(--poi-ink);
		font-family: var(--poi-font-display);
		font-size: var(--poi-font-size-4);
		text-align: center;
		text-transform: uppercase;
		letter-spacing: var(--poi-tracking-display);
	}

	.poi-banner[data-solid] {
		background-color: var(--poi-surface-base);
	}

	.poi-banner__word {
		opacity: 0;
		transition: opacity var(--poi-dur-fade) var(--poi-ease);
	}
	.poi-banner__word.visible {
		opacity: 1;
	}

	.poi-sr-only {
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
		.poi-banner__word {
			opacity: 1;
			transition: none;
		}
	}
</style>
