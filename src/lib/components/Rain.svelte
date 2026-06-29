<script module lang="ts">
	/** Rain weight: how many drops fall. drizzle 40 · steady 80 · downpour 140. */
	export type RainDensity = 'drizzle' | 'steady' | 'downpour';

	const DROP_COUNT: Record<RainDensity, number> = {
		drizzle: 40,
		steady: 80,
		downpour: 140
	};

	interface Drop {
		x: number; // left edge, %
		len: number; // streak length, px
		dur: number; // fall-time multiplier of --poi-dur-rain
		delay: number; // start offset multiplier of --poi-dur-rain (applied negative)
		op: number; // opacity
	}

	/* Deterministic PRNG (mulberry32). A FIXED seed makes the drop field identical
	   on the server and the client, so SSR consumers get no hydration mismatch, and
	   it stays stable across renders and tests — while still looking scattered.
	   See https://stackoverflow.com/a/47593316. */
	function mulberry32(seed: number): () => number {
		return () => {
			seed = (seed + 0x6d2b79f5) | 0;
			let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
			t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
			return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
		};
	}

	const SEED = 0x504f49; // "POI"

	function buildDrops(count: number): Drop[] {
		const rng = mulberry32(SEED);
		const drops: Drop[] = [];
		for (let i = 0; i < count; i++) {
			drops.push({
				x: rng() * 100,
				len: 40 + rng() * 60, // 40–100px
				dur: 0.7 + rng() * 1.0, // 0.7–1.7× base (faster/slower drops)
				delay: rng() * 1.7, // 0–1.7× base, staggers the column so it reads full at load
				op: 0.16 + rng() * 0.14 // faint ink streaks
			});
		}
		return drops;
	}
</script>

<script lang="ts">
	interface Props {
		/** Rain weight: drizzle 40 · steady 80 · downpour 140 drops. */
		density?: RainDensity;
	}

	let { density = 'steady' }: Props = $props();

	const drops = $derived(buildDrops(DROP_COUNT[density]));
</script>

<!-- Decorative ambient layer: hidden from assistive tech, never interactive. -->
<div class="poi-rain" aria-hidden="true">
	{#each drops as drop, i (i)}
		<span
			class="poi-rain__drop"
			style="--x: {drop.x.toFixed(3)}%; --len: {drop.len.toFixed(2)}px; --dur: {drop.dur.toFixed(
				3
			)}; --delay: {drop.delay.toFixed(3)}; --op: {drop.op.toFixed(3)};"
		></span>
	{/each}
</div>

<style>
	.poi-rain {
		position: fixed;
		inset: 0;
		overflow: hidden;
		pointer-events: none;
	}

	.poi-rain__drop {
		position: absolute;
		top: 0;
		left: var(--x);
		width: 1.5px;
		height: var(--len);
		opacity: var(--op);
		/* Fades in from nothing at the head, like a falling raindrop trail. Ink colour
		   is theme-driven: black on Samaritan, white on The Machine. The rain is
		   monochrome — the only red in the storm is the lightning. */
		background: linear-gradient(to bottom, transparent, var(--poi-ink));
		/* Per-drop speed and start offset scale off the shared --poi-dur-rain token,
		   so retuning that one value rescales the whole shower. Negative delay starts
		   each drop mid-fall. */
		animation: poi-rain-fall calc(var(--poi-dur-rain) * var(--dur)) linear
			calc(var(--poi-dur-rain) * var(--delay) * -1) infinite;
	}

	@keyframes poi-rain-fall {
		from {
			transform: translateY(-12vh);
		}
		to {
			transform: translateY(112vh);
		}
	}

	/* Decorative motion only — no falling rain when reduced motion is requested. */
	@media (prefers-reduced-motion: reduce) {
		.poi-rain {
			display: none;
		}
	}
</style>
