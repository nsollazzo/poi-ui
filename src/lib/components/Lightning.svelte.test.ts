import { render } from 'vitest-browser-svelte';
import { describe, expect, test } from 'vitest';
import ThemedHarness from '../../test-support/ThemedHarness.svelte';
import Lightning from './Lightning.svelte';

function bolt(): SVGPolylineElement {
	const el = document.querySelector<SVGPolylineElement>('.poi-lightning__bolt polyline');
	if (!el) throw new Error('.poi-lightning__bolt polyline not found');
	return el;
}

describe('Lightning', () => {
	test('renders bolt + flash strikes', () => {
		render(ThemedHarness, { theme: 'machine', Comp: Lightning });
		expect(document.querySelectorAll('.poi-lightning__bolt').length).toBeGreaterThan(0);
		expect(document.querySelectorAll('.poi-lightning__flash').length).toBeGreaterThan(0);
	});

	test('layer is non-interactive and hidden from assistive tech', () => {
		render(ThemedHarness, { theme: 'machine', Comp: Lightning });
		const layer = document.querySelector<HTMLElement>('.poi-lightning');
		if (!layer) throw new Error('.poi-lightning not found');
		expect(layer.getAttribute('aria-hidden')).toBe('true');
		expect(getComputedStyle(layer).pointerEvents).toBe('none');
	});

	// The whole point of this change: the lightning is always red, regardless of
	// theme (red is the one shared cross-theme accent).
	test('The Machine: bolt is accent red', () => {
		render(ThemedHarness, { theme: 'machine', Comp: Lightning });
		expect(getComputedStyle(bolt()).stroke).toBe('rgb(255, 0, 0)');
	});

	test('Samaritan: bolt is accent red too (theme-independent)', () => {
		render(ThemedHarness, { theme: 'samaritan', Comp: Lightning });
		expect(getComputedStyle(bolt()).stroke).toBe('rgb(232, 0, 13)'); // #e8000d
	});

	test('intensity is configurable and reflected on the layer', () => {
		render(ThemedHarness, {
			theme: 'machine',
			Comp: Lightning,
			componentProps: { intensity: 'dramatic' }
		});
		expect(document.querySelector('.poi-lightning')?.getAttribute('data-intensity')).toBe(
			'dramatic'
		);
	});

	test('defaults to restrained intensity', () => {
		render(ThemedHarness, { theme: 'machine', Comp: Lightning });
		expect(document.querySelector('.poi-lightning')?.getAttribute('data-intensity')).toBe(
			'restrained'
		);
	});
});
