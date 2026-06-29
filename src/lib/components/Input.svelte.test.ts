import { render } from 'vitest-browser-svelte';
import { describe, expect, test } from 'vitest';
import ThemedHarness from '../../test-support/ThemedHarness.svelte';
import Input from './Input.svelte';

describe('Input', () => {
	test('renders a real <input> with an accessible name', async () => {
		const screen = render(ThemedHarness, {
			theme: 'machine',
			Comp: Input,
			componentProps: { 'aria-label': 'Designation' }
		});
		await expect.element(screen.getByRole('textbox', { name: 'Designation' })).toBeInTheDocument();
	});

	test('reflects the provided value', () => {
		render(ThemedHarness, {
			theme: 'machine',
			Comp: Input,
			componentProps: { 'aria-label': 'x', value: 'ROOT' }
		});
		expect((document.querySelector('input.pn-input') as HTMLInputElement).value).toBe('ROOT');
	});

	test('passes through native attributes via {...rest}', () => {
		render(ThemedHarness, {
			theme: 'machine',
			Comp: Input,
			componentProps: { 'aria-label': 'Email', type: 'email', placeholder: 'you@example.com' }
		});
		const el = document.querySelector('input.pn-input') as HTMLInputElement;
		expect(el.type).toBe('email');
		expect(el.placeholder).toBe('you@example.com');
	});

	test('aria-invalid turns the border to the accent (full red in The Machine)', () => {
		render(ThemedHarness, {
			theme: 'machine',
			Comp: Input,
			componentProps: { 'aria-label': 'x', 'aria-invalid': true }
		});
		expect(
			getComputedStyle(document.querySelector('.pn-input') as HTMLElement).borderTopColor
		).toBe('rgb(255, 0, 0)');
	});

	test('is genuinely disabled and dimmed when disabled', () => {
		render(ThemedHarness, {
			theme: 'machine',
			Comp: Input,
			componentProps: { 'aria-label': 'x', disabled: true }
		});
		const el = document.querySelector('input.pn-input') as HTMLInputElement;
		expect(el.disabled).toBe(true);
		expect(getComputedStyle(el).opacity).toBe('0.4');
	});

	test('uses the subtle surface-1 fill in Samaritan', () => {
		render(ThemedHarness, {
			theme: 'samaritan',
			Comp: Input,
			componentProps: { 'aria-label': 'x' }
		});
		expect(
			getComputedStyle(document.querySelector('.pn-input') as HTMLElement).backgroundColor
		).toBe('rgba(0, 0, 0, 0.04)');
	});
});
