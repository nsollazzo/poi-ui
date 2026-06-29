<script module lang="ts">
	/** Storm strength: peak flash + how often it strikes. */
	export type LightningIntensity = 'restrained' | 'dramatic';

	interface Strike {
		x: string; // bolt centre, % across the viewport
		dur: number; // cycle-length multiplier of --poi-dur-lightning
		delay: number; // phase offset, fraction of the cycle (applied negative)
		points: string; // SVG polyline for the jagged bolt (viewBox 0 0 40 100)
	}

	/* A small FIXED set of strikes — no RNG, so it's deterministic and SSR-safe.
	   Different x / shape / cycle length / phase means successive strikes land in
	   different places at different times instead of metronomically repeating. */
	const STRIKES: Strike[] = [
		{ x: '22%', dur: 1.0, delay: 0, points: '20,0 14,22 24,30 16,52 26,60 18,82 22,100' },
		{ x: '58%', dur: 1.45, delay: 0.4, points: '18,0 26,18 16,34 28,50 18,66 24,84 16,100' },
		{ x: '80%', dur: 0.8, delay: 0.72, points: '22,0 14,20 22,38 12,54 22,72 14,88 20,100' }
	];
</script>

<script lang="ts">
	interface Props {
		/** Storm strength: 'restrained' (default) is gentler and rarer; 'dramatic' is brighter and more frequent. */
		intensity?: LightningIntensity;
	}

	let { intensity = 'restrained' }: Props = $props();
</script>

<!-- Decorative ambient layer: hidden from assistive tech, never interactive. -->
<div class="poi-lightning" data-intensity={intensity} aria-hidden="true">
	{#each STRIKES as strike, i (i)}
		<div
			class="poi-lightning__strike"
			style="--x: {strike.x}; --dur: {strike.dur}; --delay: {strike.delay};"
		>
			<div class="poi-lightning__flash"></div>
			<svg class="poi-lightning__bolt" viewBox="0 0 40 100" preserveAspectRatio="xMidYMin meet">
				<polyline points={strike.points} />
			</svg>
		</div>
	{/each}
</div>

<style>
	.poi-lightning {
		position: fixed;
		inset: 0;
		overflow: hidden;
		pointer-events: none;
		/* Restrained by default: low peak alpha, long gaps between strikes. */
		--flash-strength: 0.3;
		--cycle: 1.3;
	}
	.poi-lightning[data-intensity='dramatic'] {
		--flash-strength: 0.5;
		--cycle: 0.85;
	}

	.poi-lightning__strike {
		position: absolute;
		inset: 0;
		opacity: 0;
		/* One flash per strike (a single bright rise+fall, NOT a rapid strobe) keeps
		   us well under WCAG 2.3.1's 3-flashes/second photosensitivity threshold.
		   Both the flash and the bolt are children, so this one opacity drives both. */
		animation: poi-lightning-strike calc(var(--poi-dur-lightning) * var(--dur) * var(--cycle))
			linear calc(var(--poi-dur-lightning) * var(--dur) * var(--cycle) * var(--delay) * -1) infinite;
	}

	/* Broad red sky-wash, strongest near the bolt and fading out — the "lightning lit
	   the sky" glow. Always var(--poi-accent): identical red on both themes. */
	.poi-lightning__flash {
		position: absolute;
		inset: 0;
		opacity: var(--flash-strength);
		background: radial-gradient(120% 90% at var(--x) -20%, var(--poi-accent) 0%, transparent 65%);
	}

	.poi-lightning__bolt {
		position: absolute;
		top: 0;
		left: var(--x);
		height: 72vh;
		width: auto;
		transform: translateX(-50%); /* centre the bolt on --x */
		overflow: visible;
	}
	.poi-lightning__bolt polyline {
		fill: none;
		stroke: var(--poi-accent);
		stroke-width: 2;
		stroke-linecap: round;
		stroke-linejoin: round;
		vector-effect: non-scaling-stroke; /* crisp 2px stroke regardless of scale */
		filter: drop-shadow(0 0 4px var(--poi-accent));
	}

	@keyframes poi-lightning-strike {
		0% {
			opacity: 0;
		}
		2% {
			opacity: 1;
		}
		10% {
			opacity: 0;
		}
		100% {
			opacity: 0;
		}
	}

	/* Decorative motion only — and red full-screen flashing is a photosensitivity
	   hazard, so kill it entirely when the user prefers reduced motion. */
	@media (prefers-reduced-motion: reduce) {
		.poi-lightning {
			display: none;
		}
	}
</style>
