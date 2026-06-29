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

<div class="pn-frame" data-tone={tone} data-solid={solid || undefined}>
	<span class="pn-frame__corner pn-frame__corner--tl" aria-hidden="true"></span>
	<span class="pn-frame__corner pn-frame__corner--tr" aria-hidden="true"></span>
	<span class="pn-frame__corner pn-frame__corner--bl" aria-hidden="true"></span>
	<span class="pn-frame__corner pn-frame__corner--br" aria-hidden="true"></span>
	<span class="pn-frame__reticle" aria-hidden="true"></span>

	{#if designation}
		<span class="pn-frame__designation">
			<DesignationTag label={designation} {tone} />
		</span>
	{/if}

	<div class="pn-frame__body">
		{@render children()}
	</div>
</div>

<style>
	.pn-frame {
		position: relative;
		padding: var(--pn-space-5);
		border: var(--pn-hairline-width) solid var(--pn-frame-edge, transparent);
		border-radius: var(--pn-radius);
		color: var(--pn-ink);
	}

	.pn-frame__corner {
		position: absolute;
		width: 16px;
		height: 16px;
		border: 0 solid var(--pn-ink);
		box-shadow: var(--pn-emphasis-shadow);
		pointer-events: none;
	}
	.pn-frame[data-tone='threat'] .pn-frame__corner {
		border-color: var(--pn-accent);
	}
	.pn-frame[data-tone='asset'] .pn-frame__corner {
		border-color: var(--pn-asset);
	}
	.pn-frame__corner--tl {
		top: -1px;
		left: -1px;
		border-top-width: 2px;
		border-left-width: 2px;
	}
	.pn-frame__corner--tr {
		top: -1px;
		right: -1px;
		border-top-width: 2px;
		border-right-width: 2px;
	}
	.pn-frame__corner--bl {
		bottom: -1px;
		left: -1px;
		border-bottom-width: 2px;
		border-left-width: 2px;
	}
	.pn-frame__corner--br {
		bottom: -1px;
		right: -1px;
		border-bottom-width: 2px;
		border-right-width: 2px;
	}

	/* Crosshair reticle — shown only where --pn-frame-reticle resolves to block. */
	.pn-frame__reticle {
		display: var(--pn-frame-reticle, none);
		position: absolute;
		top: 50%;
		left: 50%;
		width: 24px;
		height: 24px;
		transform: translate(-50%, -50%);
		pointer-events: none;
	}
	.pn-frame__reticle::before,
	.pn-frame__reticle::after {
		content: '';
		position: absolute;
		background: var(--pn-accent);
	}
	.pn-frame__reticle::before {
		top: 50%;
		left: 0;
		width: 100%;
		height: var(--pn-hairline-width);
		transform: translateY(-50%);
	}
	.pn-frame__reticle::after {
		left: 50%;
		top: 0;
		width: var(--pn-hairline-width);
		height: 100%;
		transform: translateX(-50%);
	}

	.pn-frame__designation {
		position: absolute;
		top: 0;
		left: var(--pn-space-3);
		transform: translateY(-50%);
		padding: 0 var(--pn-space-1);
		background: var(--pn-surface-base);
	}
</style>
