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

<span class="poi-designation" data-tone={tone} data-solid={solid || undefined}>{label}</span>

<style>
	.poi-designation {
		display: inline-flex;
		align-items: center;
		padding: 0 var(--poi-space-2);
		border: var(--poi-hairline-width) solid var(--poi-line);
		border-radius: var(--poi-radius);
		color: var(--poi-ink);
		font-family: var(--poi-font-display);
		font-size: var(--poi-font-size-1);
		text-transform: uppercase;
		letter-spacing: var(--poi-tracking-display);
		line-height: 1.7;
		white-space: nowrap;
	}

	.poi-designation[data-solid] {
		background-color: var(--poi-surface-base);
	}

	.poi-designation[data-tone='threat'] {
		color: var(--poi-accent);
		border-color: var(--poi-accent);
		text-shadow: var(--poi-emphasis-text-shadow);
	}

	.poi-designation[data-tone='asset'] {
		color: var(--poi-asset);
		border-color: var(--poi-asset);
	}
</style>
