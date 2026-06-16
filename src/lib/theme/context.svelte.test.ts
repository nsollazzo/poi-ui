import { render } from 'vitest-browser-svelte';
import { describe, expect, test } from 'vitest';
import ThemedHarness from '../../test-support/ThemedHarness.svelte';
import ThemeConsumer from '../../test-support/ThemeConsumer.svelte';
import OptionalThemeConsumer from '../../test-support/OptionalThemeConsumer.svelte';
import { oppositeTheme } from './context.js';

describe('theme context', () => {
	test('useTheme exposes the active theme and setTheme switches it', async () => {
		const screen = render(ThemedHarness, {
			theme: 'machine',
			Comp: ThemeConsumer,
			componentProps: {}
		});
		const btn = screen.getByRole('button', { name: 'theme:machine' });
		await expect.element(btn).toBeInTheDocument();
		await btn.click();
		await expect
			.element(screen.getByRole('button', { name: 'theme:samaritan' }))
			.toBeInTheDocument();
	});

	test('useTheme throws when used outside a ThemeProvider', () => {
		expect(() => render(ThemeConsumer, {})).toThrow(/ThemeProvider/);
	});

	test('oppositeTheme maps each theme to the other polarity', () => {
		expect(oppositeTheme('machine')).toBe('samaritan');
		expect(oppositeTheme('samaritan')).toBe('machine');
	});

	test('useThemeOptional resolves the context inside a ThemeProvider', async () => {
		const screen = render(ThemedHarness, {
			theme: 'samaritan',
			Comp: OptionalThemeConsumer,
			componentProps: {}
		});
		await expect.element(screen.getByText('theme:samaritan')).toBeInTheDocument();
	});

	test('useThemeOptional returns undefined (no throw) outside a ThemeProvider', async () => {
		const screen = render(OptionalThemeConsumer, {});
		await expect.element(screen.getByText('theme:none')).toBeInTheDocument();
	});
});
