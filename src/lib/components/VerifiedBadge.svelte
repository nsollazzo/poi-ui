<script lang="ts">
	import Tooltip from './Tooltip.svelte';

	/** Seal type: first-party vs team-curated. */
	type Tier = 'official' | 'verified';

	interface Props {
		/** Which seal to render. 'official' uses the accent red; 'verified' uses ink. */
		tier: Tier;
		/** Accessible label and tooltip text. Defaults to "Official" / "Verified". */
		label?: string;
	}

	let { tier, label }: Props = $props();

	// The X-style checkmark seal next to an author handle. Accent red = official
	// (first-party), neutral ink = verified (team-curated). Tier precedence is
	// decided upstream; this component only renders.
	const text = $derived(label ?? (tier === 'official' ? 'Official' : 'Verified'));
</script>

<Tooltip {text}>
	<svg class="pn-seal" data-tier={tier} viewBox="0 0 24 24" role="img" aria-label={text}>
		<path
			class="bg"
			d="M22.25 12c0-1.43-.88-2.67-2.19-3.34.46-1.39.2-2.9-.81-3.91s-2.52-1.27-3.91-.81c-.66-1.31-1.91-2.19-3.34-2.19s-2.67.88-3.33 2.19c-1.4-.46-2.91-.2-3.92.81s-1.26 2.52-.8 3.91c-1.31.67-2.2 1.91-2.2 3.34s.89 2.67 2.2 3.34c-.46 1.39-.21 2.9.8 3.91s2.52 1.26 3.91.81c.67 1.31 1.91 2.19 3.34 2.19s2.68-.88 3.34-2.19c1.39.45 2.9.2 3.91-.81s1.27-2.52.81-3.91c1.31-.67 2.19-1.91 2.19-3.34z"
		/>
		<path class="check" d="M8.4 12.4l2.5 2.5 4.7-5.2" fill="none" />
	</svg>
</Tooltip>

<style>
	.pn-seal {
		width: 1em;
		height: 1em;
		vertical-align: -0.15em;
		display: inline-block;
	}
	.check {
		stroke-width: 2;
		stroke-linecap: round;
		stroke-linejoin: round;
	}
	.pn-seal[data-tier='official'] .bg {
		fill: var(--pn-accent);
	}
	.pn-seal[data-tier='official'] .check {
		stroke: #fff;
	}
	/* Theme-aware "white": light seal on the dark machine theme, inverts to ink on
	   samaritan — a literal white would vanish on the light theme. */
	.pn-seal[data-tier='verified'] .bg {
		fill: var(--pn-ink);
	}
	.pn-seal[data-tier='verified'] .check {
		stroke: var(--pn-surface-base);
	}
</style>
