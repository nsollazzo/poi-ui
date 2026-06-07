<script lang="ts">
	import type { Snippet } from 'svelte';
	import DesignationTag from './DesignationTag.svelte';

	interface Props {
		/** Optional designation, shown as a tag straddling the top edge. */
		designation?: string;
		/** Tone applied to the brackets and the designation tag. */
		tone?: 'neutral' | 'threat' | 'asset';
		/** Paint a solid surface-base fill so the frame reads cleanly over the <Backdrop> grid. */
		solid?: boolean;
		/** The framed subject. */
		children: Snippet;
	}

	let { designation, tone = 'neutral', solid = false, children }: Props = $props();
</script>

<div class="poi-frame" data-tone={tone} data-solid={solid || undefined}>
	<span class="poi-frame__corner poi-frame__corner--tl" aria-hidden="true"></span>
	<span class="poi-frame__corner poi-frame__corner--tr" aria-hidden="true"></span>
	<span class="poi-frame__corner poi-frame__corner--bl" aria-hidden="true"></span>
	<span class="poi-frame__corner poi-frame__corner--br" aria-hidden="true"></span>
	<span class="poi-frame__reticle" aria-hidden="true"></span>

	{#if designation}
		<span class="poi-frame__designation">
			<DesignationTag label={designation} {tone} />
		</span>
	{/if}

	<div class="poi-frame__body">
		{@render children()}
	</div>
</div>

<style>
	.poi-frame {
		position: relative;
		padding: var(--poi-space-5);
		border: var(--poi-hairline-width) solid var(--poi-frame-edge, transparent);
		border-radius: var(--poi-radius);
		color: var(--poi-ink);
	}

	.poi-frame__corner {
		position: absolute;
		width: 16px;
		height: 16px;
		border: 0 solid var(--poi-ink);
		box-shadow: var(--poi-emphasis-shadow);
		pointer-events: none;
	}
	.poi-frame[data-tone='threat'] .poi-frame__corner {
		border-color: var(--poi-accent);
	}
	.poi-frame[data-tone='asset'] .poi-frame__corner {
		border-color: var(--poi-asset);
	}
	.poi-frame__corner--tl {
		top: -1px;
		left: -1px;
		border-top-width: 2px;
		border-left-width: 2px;
	}
	.poi-frame__corner--tr {
		top: -1px;
		right: -1px;
		border-top-width: 2px;
		border-right-width: 2px;
	}
	.poi-frame__corner--bl {
		bottom: -1px;
		left: -1px;
		border-bottom-width: 2px;
		border-left-width: 2px;
	}
	.poi-frame__corner--br {
		bottom: -1px;
		right: -1px;
		border-bottom-width: 2px;
		border-right-width: 2px;
	}

	/* Crosshair reticle — shown only where --poi-frame-reticle resolves to block. */
	.poi-frame__reticle {
		display: var(--poi-frame-reticle, none);
		position: absolute;
		top: 50%;
		left: 50%;
		width: 24px;
		height: 24px;
		transform: translate(-50%, -50%);
		pointer-events: none;
	}
	.poi-frame__reticle::before,
	.poi-frame__reticle::after {
		content: '';
		position: absolute;
		background: var(--poi-accent);
	}
	.poi-frame__reticle::before {
		top: 50%;
		left: 0;
		width: 100%;
		height: var(--poi-hairline-width);
		transform: translateY(-50%);
	}
	.poi-frame__reticle::after {
		left: 50%;
		top: 0;
		width: var(--poi-hairline-width);
		height: 100%;
		transform: translateX(-50%);
	}

	.poi-frame__designation {
		position: absolute;
		top: 0;
		left: var(--poi-space-3);
		transform: translateY(-50%);
		padding: 0 var(--poi-space-1);
		background: var(--poi-surface-base);
	}
</style>
