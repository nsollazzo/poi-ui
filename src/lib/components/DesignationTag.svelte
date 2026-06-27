<script lang="ts">
	interface Props {
		/** Designation text, e.g. "THREAT", "PRIMARY ASSET", "DEVIANT". */
		label: string;
		/** Visual tone. 'threat' uses the accent; 'asset' uses the asset token. */
		tone?: 'neutral' | 'threat' | 'asset';
		/** Paint a solid surface-base fill so the tag reads cleanly over the <Backdrop> grid. */
		solid?: boolean;
	}

	let { label, tone = 'neutral', solid = false }: Props = $props();
</script>

<span class="pn-designation" data-tone={tone} data-solid={solid || undefined}>{label}</span>

<style>
	.pn-designation {
		display: inline-flex;
		align-items: center;
		padding: 0 var(--pn-space-2);
		border: var(--pn-hairline-width) solid var(--pn-line);
		border-radius: var(--pn-radius);
		color: var(--pn-ink);
		font-family: var(--pn-font-display);
		font-size: var(--pn-font-size-1);
		text-transform: uppercase;
		letter-spacing: var(--pn-tracking-display);
		line-height: 1.7;
		white-space: nowrap;
	}

	.pn-designation[data-tone='threat'] {
		color: var(--pn-accent);
		border-color: var(--pn-accent);
		text-shadow: var(--pn-emphasis-text-shadow);
	}

	.pn-designation[data-tone='asset'] {
		color: var(--pn-asset);
		border-color: var(--pn-asset);
	}
</style>
