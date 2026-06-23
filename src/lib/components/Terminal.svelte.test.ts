import { render } from 'vitest-browser-svelte';
import { createRawSnippet } from 'svelte';
import { describe, expect, test, vi } from 'vitest';
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

	test('copies the command text — without the prompt sigil — to the clipboard', async () => {
		// The browser test env is a secure context, so navigator.clipboard exists; spy on it
		// (the spy auto-restores, so no global state leaks into the other tests).
		const writeText = vi.spyOn(navigator.clipboard, 'writeText').mockResolvedValue(undefined);

		const screen = render(ThemedHarness, {
			theme: 'machine',
			Comp: Terminal,
			componentProps: { prompt: '$', children: content }
		});
		await screen.getByRole('button', { name: 'Copy command' }).click();

		// The copy payload is the command only — the red "$" sigil must never leak in.
		await vi.waitFor(() => expect(writeText).toHaveBeenCalledWith('ACCESS GRANTED'));
		writeText.mockRestore();
	});

	test('shows no copy button when there is no command', () => {
		render(ThemedHarness, {
			theme: 'machine',
			Comp: Terminal,
			componentProps: { prompt: '$' }
		});
		expect(document.querySelector('.poi-terminal__copy')).toBeNull();
	});

	test('omits the cursor when cursor={false}', () => {
		render(ThemedHarness, {
			theme: 'machine',
			Comp: Terminal,
			componentProps: { children: content, cursor: false }
		});
		expect(document.querySelector('.poi-terminal__cursor')).toBeNull();
	});
});
