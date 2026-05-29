import { render } from 'vitest-browser-svelte';
import { createRawSnippet } from 'svelte';
import { describe, expect, test } from 'vitest';
import ThemedHarness from '../../test-support/ThemedHarness.svelte';
import Terminal from './Terminal.svelte';

const content = createRawSnippet(() => ({
	render: () => `<span data-testid="term">ACCESS GRANTED</span>`
}));

describe('Terminal', () => {
	test('renders its content and prompt sigil', async () => {
		const screen = render(ThemedHarness, {
			theme: 'machine',
			Comp: Terminal,
			componentProps: { prompt: '$', children: content }
		});
		await expect.element(screen.getByTestId('term')).toBeInTheDocument();
		await expect.element(screen.getByText('$')).toBeInTheDocument();
	});

	test('uses a monospace font and a blinking cursor', () => {
		render(ThemedHarness, {
			theme: 'machine',
			Comp: Terminal,
			componentProps: { children: content }
		});
		const term = getComputedStyle(document.querySelector('.poi-terminal') as HTMLElement);
		expect(term.fontFamily.toLowerCase()).toContain('jetbrains mono');
		const cursor = getComputedStyle(document.querySelector('.poi-terminal__cursor') as HTMLElement);
		expect(cursor.animationName).not.toBe('none');
	});
});
