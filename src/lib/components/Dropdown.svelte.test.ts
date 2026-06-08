import { render } from 'vitest-browser-svelte';
import { describe, expect, test } from 'vitest';
import ThemedHarness from '../../test-support/ThemedHarness.svelte';
import Dropdown from './Dropdown.svelte';

const options = [
	{ value: 'svelte', label: 'Svelte' },
	{ value: 'react', label: 'React' }
];

const props = (value: string | null = null) => ({ value, options, label: 'Framework' });

describe('Dropdown', () => {
	test('is a collapsed menu trigger with no menu shown', () => {
		render(ThemedHarness, { theme: 'machine', Comp: Dropdown, componentProps: props() });
		const trigger = document.querySelector('.poi-dropdown .poi-chip') as HTMLElement;
		expect(trigger.getAttribute('aria-haspopup')).toBe('menu');
		expect(trigger.getAttribute('aria-expanded')).toBe('false');
		expect(document.querySelector('.poi-dropdown__menu')).toBeNull();
	});

	test('opens the menu on trigger click', async () => {
		const screen = render(ThemedHarness, {
			theme: 'machine',
			Comp: Dropdown,
			componentProps: props()
		});
		await screen.getByRole('button', { name: 'Framework' }).click();
		await expect.poll(() => document.querySelector('.poi-dropdown__menu')).not.toBeNull();
		expect(
			(document.querySelector('.poi-dropdown .poi-chip') as HTMLElement).getAttribute(
				'aria-expanded'
			)
		).toBe('true');
	});

	test('selecting an option sets the value and closes', async () => {
		const screen = render(ThemedHarness, {
			theme: 'machine',
			Comp: Dropdown,
			componentProps: props()
		});
		await screen.getByRole('button', { name: 'Framework' }).click();
		await screen.getByRole('button', { name: 'Svelte' }).click();
		await expect.poll(() => document.querySelector('.poi-dropdown__menu')).toBeNull();
		const trigger = document.querySelector('.poi-dropdown .poi-chip') as HTMLElement;
		expect(trigger.textContent).toContain('Svelte');
		expect(trigger.getAttribute('data-active')).toBe('true'); // a value is held
	});

	test('closes on outside click', async () => {
		const screen = render(ThemedHarness, {
			theme: 'machine',
			Comp: Dropdown,
			componentProps: props()
		});
		await screen.getByRole('button', { name: 'Framework' }).click();
		await expect.poll(() => document.querySelector('.poi-dropdown__menu')).not.toBeNull();
		document.body.dispatchEvent(new MouseEvent('click', { bubbles: true }));
		await expect.poll(() => document.querySelector('.poi-dropdown__menu')).toBeNull();
	});

	test('closes on Escape', async () => {
		const screen = render(ThemedHarness, {
			theme: 'machine',
			Comp: Dropdown,
			componentProps: props()
		});
		await screen.getByRole('button', { name: 'Framework' }).click();
		await expect.poll(() => document.querySelector('.poi-dropdown__menu')).not.toBeNull();
		window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
		await expect.poll(() => document.querySelector('.poi-dropdown__menu')).toBeNull();
	});
});
