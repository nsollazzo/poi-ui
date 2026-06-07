import { render } from 'vitest-browser-svelte';
import { describe, expect, test } from 'vitest';
import ThemedHarness from '../../test-support/ThemedHarness.svelte';
import Separator from './Separator.svelte';

describe('Separator', () => {
	test('is a separator with horizontal orientation by default', async () => {
		const screen = render(ThemedHarness, {
			theme: 'machine',
			Comp: Separator
		});
		const sep = screen.getByRole('separator');
		await expect.element(sep).toBeInTheDocument();
		await expect.element(sep).toHaveAttribute('aria-orientation', 'horizontal');
	});

	test('reflects a vertical orientation', async () => {
		const screen = render(ThemedHarness, {
			theme: 'machine',
			Comp: Separator,
			componentProps: { orientation: 'vertical' }
		});
		await expect
			.element(screen.getByRole('separator'))
			.toHaveAttribute('aria-orientation', 'vertical');
	});

	test('horizontal is a hairline tall, vertical is a hairline wide', () => {
		render(ThemedHarness, {
			theme: 'machine',
			Comp: Separator,
			componentProps: { orientation: 'horizontal' }
		});
		expect(getComputedStyle(document.querySelector('.poi-separator') as HTMLElement).height).toBe(
			'1px'
		);
	});

	test('paints the neutral line color in The Machine', () => {
		render(ThemedHarness, {
			theme: 'machine',
			Comp: Separator
		});
		expect(
			getComputedStyle(document.querySelector('.poi-separator') as HTMLElement).backgroundColor
		).toBe('rgb(170, 163, 163)');
	});

	test('paints the neutral line color in Samaritan', () => {
		render(ThemedHarness, {
			theme: 'samaritan',
			Comp: Separator
		});
		expect(
			getComputedStyle(document.querySelector('.poi-separator') as HTMLElement).backgroundColor
		).toBe('rgba(0, 0, 0, 0.45)');
	});
});
