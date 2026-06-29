import { render } from 'vitest-browser-svelte';
import { createRawSnippet } from 'svelte';
import { describe, expect, test } from 'vitest';
import ThemedHarness from '../../test-support/ThemedHarness.svelte';
import Button from './Button.svelte';

const label = (text: string) => createRawSnippet(() => ({ render: () => `<span>${text}</span>` }));

describe('Button', () => {
	test('renders a real <button> with an accessible name', async () => {
		const screen = render(ThemedHarness, {
			theme: 'machine',
			Comp: Button,
			componentProps: { children: label('ACQUIRE') }
		});
		await expect.element(screen.getByRole('button', { name: 'ACQUIRE' })).toBeInTheDocument();
	});

	test('calls onclick when activated', async () => {
		let clicks = 0;
		const screen = render(ThemedHarness, {
			theme: 'machine',
			Comp: Button,
			componentProps: { onclick: () => (clicks += 1), children: label('GO') }
		});
		await screen.getByRole('button', { name: 'GO' }).click();
		expect(clicks).toBe(1);
	});

	test('is genuinely disabled when disabled', () => {
		render(ThemedHarness, {
			theme: 'machine',
			Comp: Button,
			componentProps: { disabled: true, children: label('NO') }
		});
		const btn = document.querySelector<HTMLButtonElement>('button.pn-button');
		expect(btn?.disabled).toBe(true);
	});

	test('threat tone uses the accent (full red in The Machine)', () => {
		render(ThemedHarness, {
			theme: 'machine',
			Comp: Button,
			componentProps: { tone: 'threat', children: label('THREAT') }
		});
		expect(getComputedStyle(document.querySelector('.pn-button') as HTMLElement).color).toBe(
			'rgb(255, 0, 0)'
		);
	});

	// `solid` covers the Backdrop grid with the theme's base surface (white/black).
	test('solid paints a white fill in Samaritan', () => {
		render(ThemedHarness, {
			theme: 'samaritan',
			Comp: Button,
			componentProps: { solid: true, children: label('SOLID') }
		});
		expect(
			getComputedStyle(document.querySelector('.pn-button') as HTMLElement).backgroundColor
		).toBe('rgb(255, 255, 255)');
	});

	test('solid paints a black fill in The Machine', () => {
		render(ThemedHarness, {
			theme: 'machine',
			Comp: Button,
			componentProps: { solid: true, children: label('SOLID') }
		});
		expect(
			getComputedStyle(document.querySelector('.pn-button') as HTMLElement).backgroundColor
		).toBe('rgb(0, 0, 0)');
	});
});
