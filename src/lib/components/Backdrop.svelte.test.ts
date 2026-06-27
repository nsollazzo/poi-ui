import { render } from 'vitest-browser-svelte';
import { createRawSnippet } from 'svelte';
import { describe, expect, test } from 'vitest';
import ThemedHarness from '../../test-support/ThemedHarness.svelte';
import Backdrop from './Backdrop.svelte';

const body = createRawSnippet(() => ({
	render: () => `<p data-testid="bd-body">SURVEILLANCE</p>`
}));

function layer(): HTMLElement {
	const el = document.querySelector<HTMLElement>('.pn-backdrop__layer');
	if (!el) throw new Error('.pn-backdrop__layer not found');
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
		expect(document.querySelector('.pn-backdrop__content')).not.toBeNull();
		expect(document.querySelector('.pn-backdrop__layer')).not.toBeNull();
	});

	test('fills the viewport (does not collapse to content height)', () => {
		render(ThemedHarness, {
			theme: 'samaritan',
			Comp: Backdrop,
			componentProps: { children: body }
		});
		const root = document.querySelector<HTMLElement>('.pn-backdrop');
		if (!root) throw new Error('.pn-backdrop not found');
		// With short content, min-height:100dvh makes the backdrop at least fill the
		// viewport. (The old min-height:100% computed to 0 because .pn-root has no
		// height, collapsing the backdrop to its content — a mere >0 check missed that.)
		expect(root.getBoundingClientRect().height).toBeGreaterThanOrEqual(window.innerHeight);
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

	test('major grid lines are heavier (2px) than minor (1px)', () => {
		render(ThemedHarness, {
			theme: 'samaritan',
			Comp: Backdrop,
			componentProps: { children: body }
		});
		// The every-5th major stroke is thicker than the minor stroke, so the heavier
		// engineering-paper rhythm reads as more than an alpha difference.
		const bg = getComputedStyle(layer()).backgroundImage;
		expect(bg).toContain('2px'); // major line width
		expect(bg).toContain('1px'); // minor line width
	});

	test('Samaritan grid lines are faint black', () => {
		render(ThemedHarness, {
			theme: 'samaritan',
			Comp: Backdrop,
			componentProps: { children: body }
		});
		// Black with fractional alpha — a real faint line. NOT the transparent gradient
		// stops, which serialize to `rgba(0, 0, 0, 0)` and would satisfy a naive
		// `toContain('rgba(0, 0, 0,')` even if the line tokens were broken.
		expect(getComputedStyle(layer()).backgroundImage).toMatch(/rgba\(0, 0, 0, 0\.\d+\)/);
	});

	test('The Machine grid lines are faint white (theme-aware)', () => {
		render(ThemedHarness, { theme: 'machine', Comp: Backdrop, componentProps: { children: body } });
		expect(getComputedStyle(layer()).backgroundImage).toMatch(/rgba\(255, 255, 255, 0\.\d+\)/);
	});

	test('grid layer is non-interactive', () => {
		render(ThemedHarness, { theme: 'machine', Comp: Backdrop, componentProps: { children: body } });
		expect(getComputedStyle(layer()).pointerEvents).toBe('none');
	});
});
