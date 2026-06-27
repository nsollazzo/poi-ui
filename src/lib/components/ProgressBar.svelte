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
		/** Paint a solid surface-base track so the bar reads cleanly over the <Backdrop> grid. */
		solid?: boolean;
	}

	let { value, max = 100, label, size = 'md', solid = false }: Props = $props();

	const pct = $derived(Math.max(0, Math.min(100, (value / max) * 100)));
</script>

<div
	class="pn-progress"
	data-size={size}
	data-solid={solid || undefined}
	role="progressbar"
	aria-valuenow={value}
	aria-valuemin={0}
	aria-valuemax={max}
	aria-label={label}
>
	<div class="pn-progress__fill" style:width="{pct}%"></div>
</div>

<style>
	.pn-progress {
		overflow: hidden;
		background: var(--pn-surface-2);
		border: var(--pn-hairline-width) solid var(--pn-line);
		border-radius: var(--pn-radius);
	}
	.pn-progress[data-size='sm'] {
		height: 0.5rem;
	}
	.pn-progress[data-size='md'] {
		height: 1rem;
	}
	.pn-progress[data-size='lg'] {
		height: 1.5rem;
	}

	.pn-progress__fill {
		height: 100%;
		background: var(--pn-accent);
		box-shadow: var(--pn-emphasis-shadow);
		transition: width 0.3s var(--pn-ease);
	}

	@media (prefers-reduced-motion: reduce) {
		.pn-progress__fill {
			transition: none;
		}
	}
</style>
