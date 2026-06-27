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
	class="pn-window"
	open={!collapsed}
	ontoggle={(event) => (collapsed = !(event.currentTarget as HTMLDetailsElement).open)}
>
	<summary class="pn-window__bar">
		<span class="pn-window__dots" aria-hidden="true">
			<span class="pn-window__dot pn-window__dot--min"></span>
			<span class="pn-window__dot pn-window__dot--max"></span>
			<span class="pn-window__dot pn-window__dot--close"></span>
		</span>
		<span class="pn-window__title">{title}</span>
	</summary>
	<div class="pn-window__body">
		{@render children()}
	</div>
</details>

<style>
	.pn-window {
		border: var(--pn-hairline-width) solid var(--pn-line);
		border-radius: var(--pn-radius);
		background: var(--pn-surface-base);
		color: var(--pn-ink);
	}

	.pn-window__bar {
		display: flex;
		align-items: center;
		gap: var(--pn-space-3);
		padding: var(--pn-space-2) var(--pn-space-3);
		background: var(--pn-window-bar-bg);
		color: var(--pn-window-bar-ink);
		border-bottom: var(--pn-hairline-width) solid var(--pn-line);
		cursor: pointer;
		list-style: none;
		user-select: none;
	}
	.pn-window__bar::-webkit-details-marker {
		display: none;
	}
	.pn-window__bar:focus-visible {
		outline: none;
		box-shadow: var(--pn-focus-ring);
	}

	.pn-window__title {
		font-family: var(--pn-font-display);
		text-transform: uppercase;
		letter-spacing: var(--pn-tracking-display);
		font-size: var(--pn-font-size-2);
	}

	.pn-window__dots {
		display: var(--pn-window-dots);
		gap: var(--pn-space-1);
	}
	.pn-window__dot {
		width: 0.7rem;
		height: 0.7rem;
		border-radius: 50%;
		opacity: 0.3;
		transition: opacity 0.15s var(--pn-ease);
	}
	.pn-window__dot--min {
		background: rgb(27, 201, 60);
	}
	.pn-window__dot--max {
		background: rgb(254, 190, 0);
	}
	.pn-window__dot--close {
		background: rgb(255, 93, 80);
	}
	.pn-window__bar:hover .pn-window__dot {
		opacity: 1;
	}

	.pn-window__body {
		padding: var(--pn-space-4);
	}

	@media (prefers-reduced-motion: reduce) {
		.pn-window__dot {
			transition: none;
		}
	}
</style>
