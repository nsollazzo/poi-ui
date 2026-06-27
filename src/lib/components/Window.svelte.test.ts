import { render } from 'vitest-browser-svelte';
import { createRawSnippet } from 'svelte';
import { describe, expect, test } from 'vitest';
import ThemedHarness from '../../test-support/ThemedHarness.svelte';
import Window from './Window.svelte';

const body = createRawSnippet(() => ({ render: () => `<p data-testid="win-body">ONLINE</p>` }));

function details(): HTMLDetailsElement {
	const el = document.querySelector<HTMLDetailsElement>('details.pn-window');
	if (!el) throw new Error('details.pn-window not found');
	return el;
}

describe('Window', () => {
	test('renders its title and body, open by default', async () => {
		const screen = render(ThemedHarness, {
			theme: 'machine',
			Comp: Window,
			componentProps: { title: 'System', children: body }
		});
		await expect.element(screen.getByText('System')).toBeInTheDocument();
		await expect.element(screen.getByTestId('win-body')).toBeInTheDocument();
		expect(details().open).toBe(true);
	});

	test('collapses when the title bar is activated', async () => {
		const screen = render(ThemedHarness, {
			theme: 'machine',
			Comp: Window,
			componentProps: { title: 'System', children: body }
		});
		await screen.getByText('System').click();
		expect(details().open).toBe(false);
	});

	// Theme-driven chrome: The Machine has traffic-light dots; Samaritan a red bar.
	test('The Machine shows traffic-light dots', () => {
		render(ThemedHarness, {
			theme: 'machine',
			Comp: Window,
			componentProps: { title: 'S', children: body }
		});
		// Visible (the exact flex/inline-flex value is blockified as a flex item).
		expect(
			getComputedStyle(document.querySelector('.pn-window__dots') as HTMLElement).display
		).not.toBe('none');
	});

	test('Samaritan hides the dots and uses a red title bar', () => {
		render(ThemedHarness, {
			theme: 'samaritan',
			Comp: Window,
			componentProps: { title: 'S', children: body }
		});
		expect(
			getComputedStyle(document.querySelector('.pn-window__dots') as HTMLElement).display
		).toBe('none');
		expect(
			getComputedStyle(document.querySelector('.pn-window__bar') as HTMLElement).backgroundColor
		).toBe('rgb(232, 0, 13)');
	});
});
