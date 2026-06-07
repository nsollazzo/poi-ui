import { render } from 'vitest-browser-svelte';
import { createRawSnippet } from 'svelte';
import { describe, expect, test } from 'vitest';
import ThemedHarness from '../../test-support/ThemedHarness.svelte';
import Backdrop from './Backdrop.svelte';

const body = createRawSnippet(() => ({
	render: () => `<p data-testid="bd-body">SURVEILLANCE</p>`
}));

function layer(): HTMLElement {
	const el = document.querySelector<HTMLElement>('.poi-backdrop__layer');
	if (!el) throw new Error('.poi-backdrop__layer not found');
	return el;
}

describe('Backdrop', () => {
	test('renders content above the grid layer', async () => {
		const screen = render(ThemedHarness, {
			theme: 'samaritan',
			Comp: Backdrop,
			componentProps: { children: body }
		});
		await expect.element(screen.getByTestId('bd-body')).toBeInTheDocument();
		expect(document.querySelector('.poi-backdrop__content')).not.toBeNull();
		expect(document.querySelector('.poi-backdrop__layer')).not.toBeNull();
	});

	test('fills the viewport (does not collapse to content height)', () => {
		render(ThemedHarness, {
			theme: 'samaritan',
			Comp: Backdrop,
			componentProps: { children: body }
		});
		const root = document.querySelector<HTMLElement>('.poi-backdrop');
		if (!root) throw new Error('.poi-backdrop not found');
		// 100dvh resolves to a positive px height; the old min-height:100% computed to 0.
		expect(parseFloat(getComputedStyle(root).minHeight)).toBeGreaterThan(0);
	});

	test('paints a four-layer graph-paper grid', () => {
		render(ThemedHarness, {
			theme: 'samaritan',
			Comp: Backdrop,
			componentProps: { children: body }
		});
		const bg = getComputedStyle(layer()).backgroundImage;
		expect(bg).not.toBe('none');
		expect(bg.match(/linear-gradient/g)?.length).toBe(4); // 2 major + 2 minor
	});

	test('major grid repeats at 5x the minor cell', () => {
		render(ThemedHarness, {
			theme: 'samaritan',
			Comp: Backdrop,
			componentProps: { children: body }
		});
		const size = getComputedStyle(layer()).backgroundSize;
		expect(size).toContain('120px 120px'); // 24 * 5
		expect(size).toContain('24px 24px');
	});

	test('Samaritan grid lines are faint black', () => {
		render(ThemedHarness, {
			theme: 'samaritan',
			Comp: Backdrop,
			componentProps: { children: body }
		});
		expect(getComputedStyle(layer()).backgroundImage).toContain('rgba(0, 0, 0,');
	});

	test('The Machine grid lines are faint white (theme-aware)', () => {
		render(ThemedHarness, { theme: 'machine', Comp: Backdrop, componentProps: { children: body } });
		expect(getComputedStyle(layer()).backgroundImage).toContain('rgba(255, 255, 255,');
	});

	test('grid layer is non-interactive', () => {
		render(ThemedHarness, { theme: 'machine', Comp: Backdrop, componentProps: { children: body } });
		expect(getComputedStyle(layer()).pointerEvents).toBe('none');
	});
});
