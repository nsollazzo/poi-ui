import { render } from 'vitest-browser-svelte';
import { describe, expect, test } from 'vitest';
import ThemedHarness from '../../test-support/ThemedHarness.svelte';
import ProgressBar from './ProgressBar.svelte';

function bar(): HTMLElement {
	const el = document.querySelector<HTMLElement>('.pn-progress');
	if (!el) throw new Error('.pn-progress not found');
	return el;
}
function fill(): HTMLElement {
	const el = document.querySelector<HTMLElement>('.pn-progress__fill');
	if (!el) throw new Error('.pn-progress__fill not found');
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

	// `solid` overrides the translucent track with the theme's base surface — white in
	// Samaritan, black in The Machine (where the empty track then matches the page base,
	// delineated by its border; this pins that intentional dark-theme behavior).
	test('solid paints a white track in Samaritan', () => {
		render(ThemedHarness, {
			theme: 'samaritan',
			Comp: ProgressBar,
			componentProps: { value: 50, solid: true }
		});
		expect(getComputedStyle(bar()).backgroundColor).toBe('rgb(255, 255, 255)');
	});

	test('solid paints a black track in The Machine', () => {
		render(ThemedHarness, {
			theme: 'machine',
			Comp: ProgressBar,
			componentProps: { value: 50, solid: true }
		});
		expect(getComputedStyle(bar()).backgroundColor).toBe('rgb(0, 0, 0)');
	});
});
