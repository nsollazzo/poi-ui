import { render } from 'vitest-browser-svelte';
import { describe, expect, test } from 'vitest';
import ThemedHarness from '../../test-support/ThemedHarness.svelte';
import ThemeConsumer from '../../test-support/ThemeConsumer.svelte';

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
});
