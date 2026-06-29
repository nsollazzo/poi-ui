import { render } from 'vitest-browser-svelte';
import { describe, expect, test } from 'vitest';
import ThemedHarness from '../../test-support/ThemedHarness.svelte';
import Rain from './Rain.svelte';

function dropCount(): number {
	return document.querySelectorAll('.poi-rain__drop').length;
}

describe('Rain', () => {
	test('defaults to steady density (80 drops)', () => {
		render(ThemedHarness, { theme: 'machine', Comp: Rain });
		expect(dropCount()).toBe(80);
	});

	test('drizzle density renders 40 drops', () => {
		render(ThemedHarness, { theme: 'machine', Comp: Rain, componentProps: { density: 'drizzle' } });
		expect(dropCount()).toBe(40);
	});

	test('downpour density renders 140 drops', () => {
		render(ThemedHarness, {
			theme: 'machine',
			Comp: Rain,
			componentProps: { density: 'downpour' }
		});
		expect(dropCount()).toBe(140);
	});

	test('layer is non-interactive and hidden from assistive tech', () => {
		render(ThemedHarness, { theme: 'machine', Comp: Rain });
		const layer = document.querySelector<HTMLElement>('.poi-rain');
		if (!layer) throw new Error('.poi-rain not found');
		expect(layer.getAttribute('aria-hidden')).toBe('true');
		expect(getComputedStyle(layer).pointerEvents).toBe('none');
	});

	// The rain is now monochrome — all the red in the storm lives in the lightning.
	test('rain is monochrome: no accent (red) drops', () => {
		render(ThemedHarness, { theme: 'machine', Comp: Rain });
		expect(document.querySelector('.poi-rain__drop[data-accent]')).toBeNull();
	});

	test('The Machine: drops are white ink', () => {
		render(ThemedHarness, { theme: 'machine', Comp: Rain });
		const drop = document.querySelector<HTMLElement>('.poi-rain__drop');
		if (!drop) throw new Error('no drop found');
		expect(getComputedStyle(drop).backgroundImage).toContain('rgb(255, 255, 255)');
	});

	test('Samaritan: drops are black ink (theme-aware)', () => {
		render(ThemedHarness, { theme: 'samaritan', Comp: Rain });
		const drop = document.querySelector<HTMLElement>('.poi-rain__drop');
		if (!drop) throw new Error('no drop found');
		expect(getComputedStyle(drop).backgroundImage).toContain('rgb(0, 0, 0)');
	});
});
