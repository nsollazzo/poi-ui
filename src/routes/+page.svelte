<script lang="ts">
	import { ThemeProvider, type PoiTheme } from '$lib/index.js';

	let interactive = $state<PoiTheme>('machine');
</script>

<svelte:head>
	<title>POI-UI — Kitchen Sink</title>
</svelte:head>

{#snippet kitchenSink()}
	<div class="sink">
		<p class="eyebrow">Surfaces</p>
		<div class="row">
			<span class="swatch s1">surface-1</span>
			<span class="swatch s2">surface-2</span>
			<span class="swatch s3">surface-3</span>
		</div>
		<p class="eyebrow">Accent / line / ink</p>
		<div class="row">
			<span class="swatch accent">accent</span>
			<span class="swatch line">line</span>
			<span class="swatch ink">ink</span>
		</div>
		<p class="note">Components land here, milestone by milestone.</p>
	</div>
{/snippet}

<header class="page-head">
	<h1>POI-UI</h1>
	<p>One component set, two themes — The Machine (dark) and Samaritan (light).</p>
</header>

<section class="side-by-side" aria-label="Both themes, side by side">
	<ThemeProvider theme="machine">
		<div class="panel">
			<h2>The Machine</h2>
			{@render kitchenSink()}
		</div>
	</ThemeProvider>
	<ThemeProvider theme="samaritan">
		<div class="panel">
			<h2>Samaritan</h2>
			{@render kitchenSink()}
		</div>
	</ThemeProvider>
</section>

<section class="interactive" aria-label="Interactive theme switcher">
	<div class="controls">
		<button
			type="button"
			aria-pressed={interactive === 'machine'}
			onclick={() => (interactive = 'machine')}
		>
			Machine
		</button>
		<button
			type="button"
			aria-pressed={interactive === 'samaritan'}
			onclick={() => (interactive = 'samaritan')}
		>
			Samaritan
		</button>
	</div>
	<ThemeProvider bind:theme={interactive}>
		<div class="panel">
			<h2>Interactive — {interactive}</h2>
			{@render kitchenSink()}
		</div>
	</ThemeProvider>
</section>

<style>
	:global(body) {
		margin: 0;
	}

	.page-head {
		padding: 1.5rem;
		font-family: system-ui, sans-serif;
	}
	.page-head h1 {
		margin: 0 0 0.25rem;
	}
	.page-head p {
		margin: 0;
		color: #666;
	}

	.side-by-side {
		display: grid;
		grid-template-columns: 1fr 1fr;
	}
	@media (max-width: 720px) {
		.side-by-side {
			grid-template-columns: 1fr;
		}
	}

	.controls {
		display: flex;
		gap: 0.5rem;
		padding: 1rem 1.5rem;
		font-family: system-ui, sans-serif;
	}

	/* Content below reads themed tokens from the enclosing <ThemeProvider> root. */
	.panel {
		padding: 1.5rem;
		min-height: 240px;
	}
	.panel h2 {
		margin: 0 0 1rem;
		text-transform: uppercase;
		letter-spacing: var(--poi-tracking-display);
	}
	.eyebrow {
		margin: 1rem 0 0.5rem;
		text-transform: uppercase;
		font-size: var(--poi-font-size-1);
		letter-spacing: 0.1em;
		color: var(--poi-ink-dim);
	}
	.row {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
	}
	.swatch {
		padding: 0.5rem 0.75rem;
		font-family: var(--poi-font-mono);
		font-size: var(--poi-font-size-1);
		border: var(--poi-hairline-width) solid var(--poi-line);
		border-radius: var(--poi-radius);
	}
	.s1 {
		background: var(--poi-surface-1);
	}
	.s2 {
		background: var(--poi-surface-2);
	}
	.s3 {
		background: var(--poi-surface-3);
	}
	.accent {
		background: var(--poi-accent);
		color: var(--poi-accent-ink);
		box-shadow: var(--poi-emphasis-shadow);
		border-color: transparent;
	}
	.ink {
		background: var(--poi-ink);
		color: var(--poi-surface-base);
		border-color: transparent;
	}
	.note {
		margin-top: 1.5rem;
		font-size: var(--poi-font-size-1);
		color: var(--poi-ink-dim);
	}
</style>
