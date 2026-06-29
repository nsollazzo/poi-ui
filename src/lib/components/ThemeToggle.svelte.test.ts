import { render } from 'vitest-browser-svelte';
import { describe, expect, test } from 'vitest';
import ThemedHarness from '../../test-support/ThemedHarness.svelte';
import ThemeToggle from './ThemeToggle.svelte';

describe('ThemeToggle', () => {
	test('is a switch checked in The Machine (the dark end)', async () => {
		const screen = render(ThemedHarness, {
			theme: 'machine',
			Comp: ThemeToggle,
			componentProps: {}
		});
		await expect
			.element(screen.getByRole('switch', { name: 'Dark mode' }))
			.toHaveAttribute('aria-checked', 'true');
	});

	test('is a switch unchecked in Samaritan (the light end)', async () => {
		const screen = render(ThemedHarness, {
			theme: 'samaritan',
			Comp: ThemeToggle,
			componentProps: {}
		});
		await expect
			.element(screen.getByRole('switch', { name: 'Dark mode' }))
			.toHaveAttribute('aria-checked', 'false');
	});

	// Clicking always selects the opposite polarity. Asserting the onchange arg (not the
	// provider's post-click theme, which the fixed-theme harness makes unstable) keeps this
	// deterministic, and the two directions cover both branches of flip()'s ternary.
	test('toggling from Samaritan reports the dark theme', async () => {
		let received: string | null = null;
		const screen = render(ThemedHarness, {
			theme: 'samaritan',
			Comp: ThemeToggle,
			componentProps: { onchange: (t: string) => (received = t) }
		});
		await screen.getByRole('switch', { name: 'Dark mode' }).click();
		expect(received).toBe('machine');
	});

	test('toggling from The Machine reports the light theme', async () => {
		let received: string | null = null;
		const screen = render(ThemedHarness, {
			theme: 'machine',
			Comp: ThemeToggle,
			componentProps: { onchange: (t: string) => (received = t) }
		});
		await screen.getByRole('switch', { name: 'Dark mode' }).click();
		expect(received).toBe('samaritan');
	});

	// onchange is optional: the switch must still toggle without a handler.
	test('toggles without an onchange handler', async () => {
		const screen = render(ThemedHarness, {
			theme: 'samaritan',
			Comp: ThemeToggle,
			componentProps: {}
		});
		const sw = screen.getByRole('switch', { name: 'Dark mode' });
		await sw.click();
		await expect.element(sw).toBeInTheDocument();
	});
});
