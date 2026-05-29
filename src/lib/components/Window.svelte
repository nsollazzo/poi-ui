<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		/** Title bar text. */
		title: string;
		/** Whether the window starts collapsed. Bindable. */
		collapsed?: boolean;
		children: Snippet;
	}

	let { title, collapsed = $bindable(false), children }: Props = $props();
</script>

<details
	class="poi-window"
	open={!collapsed}
	ontoggle={(event) => (collapsed = !(event.currentTarget as HTMLDetailsElement).open)}
>
	<summary class="poi-window__bar">
		<span class="poi-window__dots" aria-hidden="true">
			<span class="poi-window__dot poi-window__dot--min"></span>
			<span class="poi-window__dot poi-window__dot--max"></span>
			<span class="poi-window__dot poi-window__dot--close"></span>
		</span>
		<span class="poi-window__title">{title}</span>
	</summary>
	<div class="poi-window__body">
		{@render children()}
	</div>
</details>

<style>
	.poi-window {
		border: var(--poi-hairline-width) solid var(--poi-line);
		border-radius: var(--poi-radius);
		background: var(--poi-surface-base);
		color: var(--poi-ink);
	}

	.poi-window__bar {
		display: flex;
		align-items: center;
		gap: var(--poi-space-3);
		padding: var(--poi-space-2) var(--poi-space-3);
		background: var(--poi-window-bar-bg);
		color: var(--poi-window-bar-ink);
		border-bottom: var(--poi-hairline-width) solid var(--poi-line);
		cursor: pointer;
		list-style: none;
		user-select: none;
	}
	.poi-window__bar::-webkit-details-marker {
		display: none;
	}
	.poi-window__bar:focus-visible {
		outline: none;
		box-shadow: var(--poi-focus-ring);
	}

	.poi-window__title {
		font-family: var(--poi-font-display);
		text-transform: uppercase;
		letter-spacing: var(--poi-tracking-display);
		font-size: var(--poi-font-size-2);
	}

	.poi-window__dots {
		display: var(--poi-window-dots);
		gap: var(--poi-space-1);
	}
	.poi-window__dot {
		width: 0.7rem;
		height: 0.7rem;
		border-radius: 50%;
		opacity: 0.3;
		transition: opacity 0.15s var(--poi-ease);
	}
	.poi-window__dot--min {
		background: rgb(27, 201, 60);
	}
	.poi-window__dot--max {
		background: rgb(254, 190, 0);
	}
	.poi-window__dot--close {
		background: rgb(255, 93, 80);
	}
	.poi-window__bar:hover .poi-window__dot {
		opacity: 1;
	}

	.poi-window__body {
		padding: var(--poi-space-4);
	}

	@media (prefers-reduced-motion: reduce) {
		.poi-window__dot {
			transition: none;
		}
	}
</style>
