<script lang="ts">
	interface Props {
		/** Current value. */
		value: number;
		/** Maximum value. */
		max?: number;
		/** Accessible label. */
		label?: string;
		/** Track height. */
		size?: 'sm' | 'md' | 'lg';
	}

	let { value, max = 100, label, size = 'md' }: Props = $props();

	const pct = $derived(Math.max(0, Math.min(100, (value / max) * 100)));
</script>

<div
	class="poi-progress"
	data-size={size}
	role="progressbar"
	aria-valuenow={value}
	aria-valuemin={0}
	aria-valuemax={max}
	aria-label={label}
>
	<div class="poi-progress__fill" style:width="{pct}%"></div>
</div>

<style>
	.poi-progress {
		overflow: hidden;
		background: var(--poi-surface-2);
		border: var(--poi-hairline-width) solid var(--poi-line);
		border-radius: var(--poi-radius);
	}
	.poi-progress[data-size='sm'] {
		height: 0.5rem;
	}
	.poi-progress[data-size='md'] {
		height: 1rem;
	}
	.poi-progress[data-size='lg'] {
		height: 1.5rem;
	}

	.poi-progress__fill {
		height: 100%;
		background: var(--poi-accent);
		box-shadow: var(--poi-emphasis-shadow);
		transition: width 0.3s var(--poi-ease);
	}

	@media (prefers-reduced-motion: reduce) {
		.poi-progress__fill {
			transition: none;
		}
	}
</style>
