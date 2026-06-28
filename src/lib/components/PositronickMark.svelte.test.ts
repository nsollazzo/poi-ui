import { render } from 'vitest-browser-svelte';
import { describe, expect, test } from 'vitest';
import ThemedHarness from '../../test-support/ThemedHarness.svelte';
import PositronickMark from './PositronickMark.svelte';

/** The brand red, as `getComputedStyle().fill` reports `#E33231`. */
const BRAND_RED = 'rgb(227, 50, 49)';

function mark(): SVGSVGElement {
	const el = document.querySelector<SVGSVGElement>('.pn-mark svg');
	if (!el) throw new Error('.pn-mark svg not found');
	return el;
}

/** The first path is the orbital ring. */
function ring(): SVGPathElement {
	const el = mark().querySelector<SVGPathElement>('path');
	if (!el) throw new Error('ring path not found');
	return el;
}

/** The second path is the plus. */
function plus(): SVGPathElement {
	const el = mark().querySelectorAll<SVGPathElement>('path')[1];
	if (!el) throw new Error('plus path not found');
	return el;
}

describe('PositronickMark', () => {
	test('renders an <svg> sized to the default size', () => {
		render(ThemedHarness, { theme: 'machine', Comp: PositronickMark, componentProps: {} });
		expect(mark()).toBeInstanceOf(SVGSVGElement);
		expect(getComputedStyle(mark()).width).toBe('34px');
	});

	test('the size prop drives the rendered width', () => {
		render(ThemedHarness, {
			theme: 'samaritan',
			Comp: PositronickMark,
			componentProps: { size: 48 }
		});
		expect(getComputedStyle(mark()).width).toBe('48px');
	});

	test('default (mono=false) paints the orbital ring brand red', () => {
		render(ThemedHarness, { theme: 'machine', Comp: PositronickMark, componentProps: {} });
		expect(getComputedStyle(ring()).fill).toBe(BRAND_RED);
	});

	test('mono=true tints the ring with currentColor, not the brand red', () => {
		render(ThemedHarness, {
			theme: 'machine',
			Comp: PositronickMark,
			componentProps: { mono: true }
		});
		const fill = getComputedStyle(ring()).fill;
		// currentColor inherits --pn-ink (white in The Machine), so it must NOT be red.
		expect(fill).not.toBe(BRAND_RED);
		expect(fill).toBe('rgb(255, 255, 255)');
	});

	test('the plus follows currentColor (= ink) — white in The Machine', () => {
		render(ThemedHarness, { theme: 'machine', Comp: PositronickMark, componentProps: {} });
		expect(getComputedStyle(plus()).fill).toBe('rgb(255, 255, 255)');
	});

	test('the plus follows currentColor (= ink) — near-black in Samaritan', () => {
		render(ThemedHarness, { theme: 'samaritan', Comp: PositronickMark, componentProps: {} });
		expect(getComputedStyle(plus()).fill).toBe('rgb(0, 0, 0)');
	});
});
