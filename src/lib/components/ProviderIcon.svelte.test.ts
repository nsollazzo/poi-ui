import { render } from 'vitest-browser-svelte';
import { describe, expect, test } from 'vitest';
import ThemedHarness from '../../test-support/ThemedHarness.svelte';
import ProviderIcon from './ProviderIcon.svelte';

function svg(): SVGSVGElement {
	const el = document.querySelector<SVGSVGElement>('svg');
	if (!el) throw new Error('svg not found');
	return el;
}

describe('ProviderIcon', () => {
	// Every provider branch must render its inline mark — covers all four #if arms.
	for (const provider of ['github', 'google', 'twitter', 'apple'] as const) {
		test(`renders an <svg> for ${provider}`, () => {
			render(ThemedHarness, {
				theme: 'machine',
				Comp: ProviderIcon,
				componentProps: { provider }
			});
			expect(svg().tagName.toLowerCase()).toBe('svg');
		});
	}

	// A monochrome mark inherits the themed ink via currentColor — assert both polarities,
	// since this is the whole reason GitHub/Apple aren't hard-coded.
	test('github inherits currentColor (white ink) in The Machine', () => {
		render(ThemedHarness, {
			theme: 'machine',
			Comp: ProviderIcon,
			componentProps: { provider: 'github' }
		});
		expect(getComputedStyle(svg()).fill).toBe('rgb(255, 255, 255)');
	});

	test('github inherits currentColor (black ink) in Samaritan', () => {
		render(ThemedHarness, {
			theme: 'samaritan',
			Comp: ProviderIcon,
			componentProps: { provider: 'github' }
		});
		expect(getComputedStyle(svg()).fill).toBe('rgb(0, 0, 0)');
	});

	test('apple inherits currentColor too', () => {
		render(ThemedHarness, {
			theme: 'machine',
			Comp: ProviderIcon,
			componentProps: { provider: 'apple' }
		});
		expect(getComputedStyle(svg()).fill).toBe('rgb(255, 255, 255)');
	});

	test('google keeps its fixed multicolor brand fill, not currentColor', () => {
		render(ThemedHarness, {
			theme: 'machine',
			Comp: ProviderIcon,
			componentProps: { provider: 'google' }
		});
		const blue = document.querySelector<SVGPathElement>('svg path[fill="#4285F4"]');
		const green = document.querySelector<SVGPathElement>('svg path[fill="#34A853"]');
		if (!blue || !green) throw new Error('google brand paths not found');
		// Brand blue, untouched by the white machine ink (so NOT currentColor).
		expect(getComputedStyle(blue).fill).toBe('rgb(66, 133, 244)');
		// A second, different fill proves the mark stays multicolor.
		expect(getComputedStyle(green).fill).toBe('rgb(52, 168, 83)');
	});

	test('size drives the svg width and height', () => {
		render(ThemedHarness, {
			theme: 'machine',
			Comp: ProviderIcon,
			componentProps: { provider: 'twitter', size: 32 }
		});
		expect(svg().getAttribute('width')).toBe('32');
		expect(svg().getAttribute('height')).toBe('32');
	});
});
