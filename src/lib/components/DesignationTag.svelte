<script lang="ts">
	interface Props {
		/** Designation text, e.g. "THREAT", "PRIMARY ASSET", "DEVIANT". */
		label: string;
		/** Visual tone. 'threat' uses the accent; 'asset' uses the asset token. */
		tone?: 'neutral' | 'threat' | 'asset';
	}

	let { label, tone = 'neutral' }: Props = $props();
</script>

<span class="poi-designation" data-tone={tone}>{label}</span>

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
