<script lang="ts">
	import {
		ThemeProvider,
		SubjectFrame,
		DesignationTag,
		StatusRow,
		Block,
		Card,
		Box,
		Button,
		ProgressBar,
		RecDot,
		Terminal,
		Banner,
		Loading,
		Window,
		type PoiTheme
	} from '$lib/index.js';

	let interactive = $state<PoiTheme>('machine');
</script>

<svelte:head>
	<title>POI-UI — Kitchen Sink</title>
</svelte:head>

{#snippet kitchenSink()}
	<div class="sink">
		<Banner text="Threat detected" />

		<SubjectFrame designation="Primary Asset" tone="asset">
			<StatusRow label="Name" value="John Reese" />
			<StatusRow label="Status">
				<RecDot label="Recording" />
			</StatusRow>
			<StatusRow label="Relevance" value="HIGH" accent />
		</SubjectFrame>

		<div class="tags">
			<DesignationTag label="Admin" />
			<DesignationTag label="Asset" tone="asset" />
			<DesignationTag label="Threat" tone="threat" />
		</div>

		<Block title="Block">
			<StatusRow label="Density" value="ROOMY" />
		</Block>
		<Card title="Card">
			<StatusRow label="Density" value="MEDIUM" />
		</Card>
		<Box title="Box" tone="threat">
			<StatusRow label="Density" value="TIGHT" accent />
		</Box>

		<ProgressBar value={68} label="Acquiring target" />
		<ProgressBar value={32} size="lg" label="System relevance" />

		<div class="buttons">
			<Button>Acquire</Button>
			<Button tone="threat">Engage</Button>
			<Button disabled>Offline</Button>
		</div>

		<Window title="Surveillance Feed">
			<StatusRow label="Camera" value="42ND ST" />
			<StatusRow label="Status" value="LIVE" accent />
		</Window>

		<Terminal prompt="root@poi:~#">access --override</Terminal>

		<div class="loader"><Loading label="Acquiring" /></div>
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
	@media (max-width: 860px) {
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

	.panel {
		padding: 1.5rem;
	}
	.panel h2 {
		margin: 0 0 1rem;
		text-transform: uppercase;
		letter-spacing: var(--poi-tracking-display);
	}

	.sink {
		display: grid;
		gap: 1.25rem;
	}
	.tags {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
	}
	.buttons {
		display: flex;
		flex-wrap: wrap;
		gap: 0.75rem;
	}
	.loader {
		display: flex;
		justify-content: center;
		padding: 1rem 0;
	}
</style>
