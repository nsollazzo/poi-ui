import { render } from 'vitest-browser-svelte';
import { describe, expect, test } from 'vitest';
import ThemedHarness from '../../test-support/ThemedHarness.svelte';
import ProgressBar from './ProgressBar.svelte';

function bar(): HTMLElement {
	const el = document.querySelector<HTMLElement>('.poi-progress');
	if (!el) throw new Error('.poi-progress not found');
	return el;
}
function fill(): HTMLElement {
	const el = document.querySelector<HTMLElement>('.poi-progress__fill');
	if (!el) throw new Error('.poi-progress__fill not found');
	return el;
}

describe('ProgressBar', () => {
	test('exposes progressbar semantics with the current value', async () => {
		const screen = render(ThemedHarness, {
			theme: 'machine',
			Comp: ProgressBar,
			componentProps: { value: 42, label: 'Acquiring' }
		});
		await expect
			.element(screen.getByRole('progressbar', { name: 'Acquiring' }))
			.toBeInTheDocument();
		expect(bar().getAttribute('aria-valuenow')).toBe('42');
	});

	test('fill width reflects value/max', () => {
		render(ThemedHarness, {
			theme: 'machine',
			Comp: ProgressBar,
			componentProps: { value: 25, max: 100 }
		});
		expect(fill().style.width).toBe('25%');
	});

	test('clamps out-of-range values', () => {
		render(ThemedHarness, {
			theme: 'machine',
			Comp: ProgressBar,
			componentProps: { value: 250, max: 100 }
		});
		expect(fill().style.width).toBe('100%');
	});

	test('fill uses the accent — full red in The Machine', () => {
		render(ThemedHarness, { theme: 'machine', Comp: ProgressBar, componentProps: { value: 50 } });
		expect(getComputedStyle(fill()).backgroundColor).toBe('rgb(255, 0, 0)');
	});
});
