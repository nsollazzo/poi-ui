import { render } from 'vitest-browser-svelte';
import { createRawSnippet } from 'svelte';
import { describe, expect, test } from 'vitest';
import ThemeProvider from './ThemeProvider.svelte';

const child = createRawSnippet(() => ({
	render: () => `<p data-testid="poi-child">ACQUIRING</p>`
}));

function root(): HTMLElement {
	const el = document.querySelector<HTMLElement>('.poi-root');
	if (!el) throw new Error('.poi-root not found');
	return el;
}

describe('ThemeProvider', () => {
	test('renders its children', async () => {
		const screen = render(ThemeProvider, { theme: 'machine', children: child });
		await expect.element(screen.getByTestId('poi-child')).toBeInTheDocument();
	});

	test('marks the active theme with a data-theme attribute', () => {
		render(ThemeProvider, { theme: 'samaritan', children: child });
		expect(root().dataset.theme).toBe('samaritan');
	});

	// Why these assert computed colors, not class names: the whole point of the
	// library is that one [data-theme] flip re-skins everything. If the token
	// layer regresses, these fail.
	test('The Machine is dark — black surface, white ink', () => {
		render(ThemeProvider, { theme: 'machine', children: child });
		const cs = getComputedStyle(root());
		expect(cs.backgroundColor).toBe('rgb(0, 0, 0)');
		expect(cs.color).toBe('rgb(255, 255, 255)');
	});

	test('Samaritan is light — white surface, black ink (the deliberate inversion)', () => {
		render(ThemeProvider, { theme: 'samaritan', children: child });
		const cs = getComputedStyle(root());
		expect(cs.backgroundColor).toBe('rgb(255, 255, 255)');
		expect(cs.color).toBe('rgb(0, 0, 0)');
	});
});
